// services/consentAuditService.ts
// Consent audit logging service for GDPR/CCPA compliance

import {
    addDoc,
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    Timestamp,
    where
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface ConsentAuditLog {
  id?: string;
  userId: string;
  action: 'granted' | 'revoked' | 'updated' | 'initial_consent' | 're_consent';
  consentType: string;
  previousValue?: boolean;
  newValue: boolean;
  timestamp: any;
  consentVersion: string;
  userRegion: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: {
    [key: string]: any;
  };
}

export interface ConsentSummary {
  userId: string;
  totalEvents: number;
  firstConsentDate: string;
  lastUpdateDate: string;
  currentConsents: {
    [key: string]: boolean;
  };
  consentChanges: number;
}

class ConsentAuditService {
  /**
   * Log a consent event for compliance audit trail
   * This creates a permanent, immutable record of the user's consent decision
   */
  async logConsentEvent(
    userId: string,
    action: 'granted' | 'revoked' | 'updated' | 'initial_consent' | 're_consent',
    consentType: string,
    newValue: boolean,
    consentVersion: string,
    userRegion: string,
    previousValue?: boolean,
    metadata?: any
  ): Promise<string> {
    try {
      const auditLog: ConsentAuditLog = {
        userId,
        action,
        consentType,
        previousValue,
        newValue,
        timestamp: Timestamp.now(),
        consentVersion,
        userRegion,
        metadata: metadata || {}
      };

      const docRef = await addDoc(collection(db, 'consent_audit'), auditLog);
      
      console.log(`📝 Consent audit log created: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error('❌ Error logging consent event:', error);
      throw new Error(`Failed to log consent event: ${error}`);
    }
  }

  /**
   * Log initial consent when user first agrees to terms
   */
  async logInitialConsent(
    userId: string,
    consents: { [key: string]: boolean },
    consentVersion: string,
    userRegion: string
  ): Promise<void> {
    try {
      const promises = Object.entries(consents).map(([consentType, value]) =>
        this.logConsentEvent(
          userId,
          'initial_consent',
          consentType,
          value,
          consentVersion,
          userRegion,
          undefined,
          {
            allConsents: consents,
            note: 'Initial consent provided during onboarding'
          }
        )
      );

      await Promise.all(promises);
      console.log(`✅ Logged initial consent for ${Object.keys(consents).length} consent types`);
    } catch (error) {
      console.error('❌ Error logging initial consent:', error);
      throw error;
    }
  }

  /**
   * Log consent update when user changes their preferences
   */
  async logConsentUpdate(
    userId: string,
    consentType: string,
    previousValue: boolean,
    newValue: boolean,
    consentVersion: string,
    userRegion: string,
    metadata?: any
  ): Promise<string> {
    const action = newValue ? 'granted' : 'revoked';
    
    return this.logConsentEvent(
      userId,
      action,
      consentType,
      newValue,
      consentVersion,
      userRegion,
      previousValue,
      {
        ...metadata,
        changedVia: 'settings',
        note: `User ${action} ${consentType} consent`
      }
    );
  }

  /**
   * Log batch consent updates (when user clicks "Accept All" or "Reject All")
   */
  async logBatchConsentUpdate(
    userId: string,
    changes: { [consentType: string]: { previous: boolean; new: boolean } },
    consentVersion: string,
    userRegion: string,
    batchAction: 'accept_all' | 'reject_all' | 'custom'
  ): Promise<void> {
    try {
      const promises = Object.entries(changes).map(([consentType, values]) =>
        this.logConsentUpdate(
          userId,
          consentType,
          values.previous,
          values.new,
          consentVersion,
          userRegion,
          {
            batchAction,
            note: `Batch update via ${batchAction.replace('_', ' ')}`
          }
        )
      );

      await Promise.all(promises);
      console.log(`✅ Logged batch consent update for ${Object.keys(changes).length} consent types`);
    } catch (error) {
      console.error('❌ Error logging batch consent update:', error);
      throw error;
    }
  }

  /**
   * Log re-consent after policy update
   */
  async logReConsent(
    userId: string,
    consents: { [key: string]: boolean },
    previousVersion: string,
    newVersion: string,
    userRegion: string
  ): Promise<void> {
    try {
      const promises = Object.entries(consents).map(([consentType, value]) =>
        this.logConsentEvent(
          userId,
          're_consent',
          consentType,
          value,
          newVersion,
          userRegion,
          undefined,
          {
            previousVersion,
            newVersion,
            allConsents: consents,
            note: `Re-consent required due to policy update from v${previousVersion} to v${newVersion}`
          }
        )
      );

      await Promise.all(promises);
      console.log(`✅ Logged re-consent for policy update to v${newVersion}`);
    } catch (error) {
      console.error('❌ Error logging re-consent:', error);
      throw error;
    }
  }

  /**
   * Get all consent events for a user
   */
  async getUserConsentHistory(
    userId: string,
    limitCount: number = 100
  ): Promise<ConsentAuditLog[]> {
    try {
      const auditQuery = query(
        collection(db, 'consent_audit'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(auditQuery);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || doc.data().timestamp
      } as ConsentAuditLog));
    } catch (error) {
      console.error('❌ Error retrieving consent history:', error);
      throw new Error(`Failed to retrieve consent history: ${error}`);
    }
  }

  /**
   * Get consent events by type (e.g., all "analytics" consent changes)
   */
  async getConsentHistoryByType(
    userId: string,
    consentType: string
  ): Promise<ConsentAuditLog[]> {
    try {
      const auditQuery = query(
        collection(db, 'consent_audit'),
        where('userId', '==', userId),
        where('consentType', '==', consentType),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(auditQuery);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || doc.data().timestamp
      } as ConsentAuditLog));
    } catch (error) {
      console.error('❌ Error retrieving consent history by type:', error);
      throw new Error(`Failed to retrieve consent history: ${error}`);
    }
  }

  /**
   * Get summary of user's consent activity
   */
  async getConsentSummary(userId: string): Promise<ConsentSummary> {
    try {
      const history = await this.getUserConsentHistory(userId, 1000);

      if (history.length === 0) {
        return {
          userId,
          totalEvents: 0,
          firstConsentDate: 'Never',
          lastUpdateDate: 'Never',
          currentConsents: {},
          consentChanges: 0
        };
      }

      // Get current state of each consent type
      const currentConsents: { [key: string]: boolean } = {};
      const consentTypes = new Set(history.map(log => log.consentType));
      
      consentTypes.forEach(type => {
        const latestForType = history.find(log => log.consentType === type);
        if (latestForType) {
          currentConsents[type] = latestForType.newValue;
        }
      });

      // Count changes (exclude initial_consent and re_consent)
      const consentChanges = history.filter(
        log => log.action === 'granted' || log.action === 'revoked'
      ).length;

      return {
        userId,
        totalEvents: history.length,
        firstConsentDate: history[history.length - 1].timestamp,
        lastUpdateDate: history[0].timestamp,
        currentConsents,
        consentChanges
      };
    } catch (error) {
      console.error('❌ Error getting consent summary:', error);
      throw new Error(`Failed to get consent summary: ${error}`);
    }
  }

  /**
   * Verify consent was given for a specific purpose
   * This can be used to prove consent in case of regulatory inquiry
   */
  async verifyConsent(
    userId: string,
    consentType: string
  ): Promise<{
    hasConsent: boolean;
    consentDate: string | null;
    consentVersion: string | null;
    evidence: ConsentAuditLog | null;
  }> {
    try {
      const history = await this.getConsentHistoryByType(userId, consentType);

      if (history.length === 0) {
        return {
          hasConsent: false,
          consentDate: null,
          consentVersion: null,
          evidence: null
        };
      }

      // Get most recent event
      const latestEvent = history[0];
      
      return {
        hasConsent: latestEvent.newValue,
        consentDate: latestEvent.timestamp,
        consentVersion: latestEvent.consentVersion,
        evidence: latestEvent
      };
    } catch (error) {
      console.error('❌ Error verifying consent:', error);
      throw new Error(`Failed to verify consent: ${error}`);
    }
  }

  /**
   * Generate a compliance report for regulatory requests
   */
  async generateComplianceReport(userId: string): Promise<string> {
    try {
      const summary = await this.getConsentSummary(userId);
      const history = await this.getUserConsentHistory(userId, 1000);

      const lines: string[] = [];
      
      lines.push('='.repeat(60));
      lines.push('CONSENT COMPLIANCE REPORT');
      lines.push('='.repeat(60));
      lines.push('');
      lines.push(`User ID: ${userId}`);
      lines.push(`Report Generated: ${new Date().toISOString()}`);
      lines.push('');
      lines.push('CONSENT SUMMARY:');
      lines.push(`  Total Consent Events: ${summary.totalEvents}`);
      lines.push(`  First Consent Date: ${summary.firstConsentDate}`);
      lines.push(`  Last Update Date: ${summary.lastUpdateDate}`);
      lines.push(`  Total Consent Changes: ${summary.consentChanges}`);
      lines.push('');
      lines.push('CURRENT CONSENT STATUS:');
      Object.entries(summary.currentConsents).forEach(([type, value]) => {
        lines.push(`  ${type}: ${value ? 'GRANTED' : 'REVOKED'}`);
      });
      lines.push('');
      lines.push('CONSENT HISTORY (Most Recent First):');
      lines.push('-'.repeat(60));
      
      history.slice(0, 50).forEach((log, index) => {
        lines.push(`${index + 1}. ${log.timestamp}`);
        lines.push(`   Action: ${log.action.toUpperCase()}`);
        lines.push(`   Type: ${log.consentType}`);
        lines.push(`   Value: ${log.newValue ? 'GRANTED' : 'REVOKED'}`);
        lines.push(`   Version: ${log.consentVersion}`);
        lines.push(`   Region: ${log.userRegion}`);
        if (log.metadata?.note) {
          lines.push(`   Note: ${log.metadata.note}`);
        }
        lines.push('');
      });
      
      if (history.length > 50) {
        lines.push(`... and ${history.length - 50} more events`);
        lines.push('');
      }
      
      lines.push('='.repeat(60));
      lines.push('This report provides evidence of user consent for regulatory compliance.');
      lines.push('All timestamps are in ISO 8601 format (UTC).');
      lines.push('='.repeat(60));
      
      return lines.join('\n');
    } catch (error) {
      console.error('❌ Error generating compliance report:', error);
      throw new Error(`Failed to generate compliance report: ${error}`);
    }
  }

  /**
   * Clean up old consent logs (retention policy)
   * GDPR requires keeping logs for 7 years for compliance
   * Use with caution - only delete logs older than legal retention period
   */
  async cleanupOldLogs(daysToKeep: number = 2555): Promise<number> {
    console.warn(`⚠️  Cleaning up consent logs older than ${daysToKeep} days`);
    
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
      
      const oldLogsQuery = query(
        collection(db, 'consent_audit'),
        where('timestamp', '<', Timestamp.fromDate(cutoffDate))
      );

      const snapshot = await getDocs(oldLogsQuery);
      
      console.log(`Found ${snapshot.docs.length} logs to clean up`);
      
      // Note: Actual deletion would require batch operations
      // For safety, this just returns the count
      // Implement actual deletion only if legally required
      
      return snapshot.docs.length;
    } catch (error) {
      console.error('❌ Error cleaning up old logs:', error);
      throw new Error(`Failed to cleanup old logs: ${error}`);
    }
  }
}

export default new ConsentAuditService();
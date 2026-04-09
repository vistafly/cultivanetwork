// SECURITY_FIX #11: Unicode-safe input sanitization utility
// Preserves all valid Unicode characters (EN, ES, AR, ZH) while stripping
// dangerous control characters, null bytes, and excessive whitespace.

/**
 * Strips ASCII control characters (except \t, \n, \r) and null bytes.
 * Preserves ALL Unicode letters, numbers, punctuation, and symbols including:
 * - Spanish: n, a, e, i, o, u, u
 * - Arabic: U+0600-U+06FF and extended ranges
 * - Chinese/CJK: U+4E00-U+9FFF and extensions
 * - Emoji and other Unicode symbols
 */
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_REGEX = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

/**
 * Sanitize general text input (comments, posts, profile fields).
 * - Strips ASCII control characters (keeps \t, \n, \r)
 * - Trims leading/trailing whitespace
 * - Collapses excessive consecutive newlines (max 3)
 * - Preserves all valid multilingual Unicode characters
 */
export function sanitizeTextInput(text: string): string {
  if (!text) return '';

  return text
    .replace(CONTROL_CHARS_REGEX, '') // Strip control chars (preserves \t \n \r)
    .replace(/\n{4,}/g, '\n\n\n')    // Collapse excessive newlines (max 3)
    .trim();
}

/**
 * Sanitize search input with additional length limit.
 * - All sanitizeTextInput rules apply
 * - Strips newlines (search is single-line)
 * - Limits length to maxLength (default 200)
 */
export function sanitizeSearchInput(text: string, maxLength: number = 200): string {
  if (!text) return '';

  return text
    .replace(CONTROL_CHARS_REGEX, '') // Strip control chars
    .replace(/[\n\r\t]/g, ' ')       // Replace whitespace chars with spaces
    .replace(/\s{2,}/g, ' ')         // Collapse multiple spaces
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitize file names for upload.
 * - Strips path traversal characters (../ ..\)
 * - Removes null bytes
 * - Replaces problematic characters with underscores
 * - Preserves file extension
 * - Limits length to 255 characters
 */
export function sanitizeFileName(name: string): string {
  if (!name) return 'unnamed';

  return name
    .replace(/\.\.[/\\]/g, '')        // Strip path traversal
    .replace(/[/\\:*?"<>|]/g, '_')    // Replace filesystem-unsafe chars
    .replace(CONTROL_CHARS_REGEX, '') // Strip control chars
    .trim()
    .slice(0, 255) || 'unnamed';
}

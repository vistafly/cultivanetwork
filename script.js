// Device detection and app store redirect
(function() {
    // Configure your app store URLs here
    const APP_STORE_URLS = {
        ios: 'https://apps.apple.com/app/your-app-id',
        android: 'https://play.google.com/store/apps/details?id=your.package.name'
    };

    // Contact email
    const CONTACT_EMAIL = 'cultivanetwork@outlook.com';

    // Enhanced device detection
    function detectDevice() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Check if it's a mobile device first
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        
        if (!isMobile) {
            return 'desktop';
        }
        
        // iOS detection
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return 'ios';
        }
        
        // Android detection
        if (/android/i.test(userAgent)) {
            return 'android';
        }
        
        // Fallback for other mobile devices
        return 'ios';
    }

    // Check if device has touch capability
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }

    // Contact button functionality
    function setupContactButton() {
        const contactBtn = document.getElementById('contactBtn');
        
        if (contactBtn) {
            console.log('Contact button found, setting up event listener');
            
            contactBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Contact button clicked');
                
                // Create mailto link
                const subject = encodeURIComponent('CultivaNetwork - Contact Inquiry');
                const body = encodeURIComponent('Hello CultivaNetwork team,\n\nI would like to get in touch regarding...\n\nBest regards');
                const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
                
                console.log('Opening mailto link:', mailtoLink);
                
                // Try to open email client
                try {
                    // Use window.open for better compatibility
                    const emailWindow = window.open(mailtoLink, '_self');
                    
                    // Fallback after a short delay if window.open doesn't work
                    setTimeout(() => {
                        if (navigator.clipboard && window.isSecureContext) {
                            navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
                                alert(`Email client not available. Email address copied to clipboard: ${CONTACT_EMAIL}`);
                            }).catch(() => {
                                alert(`Please contact us at: ${CONTACT_EMAIL}`);
                            });
                        } else {
                            // Manual fallback for older browsers
                            const textArea = document.createElement('textarea');
                            textArea.value = CONTACT_EMAIL;
                            document.body.appendChild(textArea);
                            textArea.select();
                            try {
                                document.execCommand('copy');
                                alert(`Email address copied to clipboard: ${CONTACT_EMAIL}`);
                            } catch (err) {
                                alert(`Please contact us at: ${CONTACT_EMAIL}`);
                            }
                            document.body.removeChild(textArea);
                        }
                    }, 1000);
                    
                } catch (error) {
                    console.error('Error opening email client:', error);
                    alert(`Please contact us at: ${CONTACT_EMAIL}`);
                }
            });
            
            // Add additional debugging
            contactBtn.addEventListener('mouseenter', function() {
                console.log('Contact button hover detected');
            });
        } else {
            console.error('Contact button not found');
        }
    }

    // Update UI based on device
    function updateUI(device) {
        const ctaMobile = document.getElementById('ctaMobile');
        const ctaDesktop = document.getElementById('ctaDesktop');
        const storeIcon = document.getElementById('storeIcon');
        const storeName = document.getElementById('storeName');
        const downloadBtn = document.getElementById('downloadBtn');
        const appStoreBtn = document.getElementById('appStoreBtn');
        const playStoreBtn = document.getElementById('playStoreBtn');
        
        if (device === 'desktop') {
            // Show both buttons for desktop
            ctaMobile.style.display = 'none';
            ctaDesktop.style.display = 'flex';
            
            // Set up click handlers for both stores
            appStoreBtn.addEventListener('click', () => {
                window.location.href = APP_STORE_URLS.ios;
            });
            
            playStoreBtn.addEventListener('click', () => {
                window.location.href = APP_STORE_URLS.android;
            });
        } else {
            // Show single button for mobile
            ctaMobile.style.display = 'flex';
            ctaDesktop.style.display = 'none';
            
            if (device === 'ios') {
                storeIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/></svg>';
                const btnLabel = downloadBtn.querySelector('.btn-label');
                btnLabel.textContent = 'Download on the';
                storeName.textContent = 'App Store';
                downloadBtn.setAttribute('aria-label', 'Download on the App Store');
            } else {
                storeIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>';
                const btnLabel = downloadBtn.querySelector('.btn-label');
                btnLabel.textContent = 'GET IT ON';
                storeName.textContent = 'Google Play';
                downloadBtn.setAttribute('aria-label', 'Get it on Google Play');
            }
            
            // Set click handler for mobile
            downloadBtn.addEventListener('click', () => {
                window.location.href = APP_STORE_URLS[device];
            });
        }
    }

    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const device = detectDevice();
        updateUI(device);
        setupContactButton();
        
        // Log device info for debugging
        console.log(`Detected device: ${device}`);
        console.log(`Touch capable: ${isTouchDevice()}`);
        console.log(`User agent: ${navigator.userAgent}`);
    });

    // Handle logo loading errors
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('error', () => {
            console.warn('Logo failed to load. Please ensure /images/logo.png exists');
            // Fallback: create a minimal placeholder
            const appName = document.querySelector('.app-name').textContent;
            logo.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.textContent = appName.charAt(0);
            fallback.style.cssText = `
                width: 96px;
                height: 96px;
                border-radius: 22px;
                background: var(--text-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                font-weight: 600;
                color: var(--bg-primary);
                border: 1px solid rgba(255, 255, 255, 0.1);
            `;
            logo.parentElement.appendChild(fallback);
        });
    }
})();
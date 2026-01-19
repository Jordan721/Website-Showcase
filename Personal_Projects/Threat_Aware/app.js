// ==================== STATE MANAGEMENT ====================
const gameState = {
    securityScore: 0,
    modulesCompleted: 0,
    threatsIdentified: 0,
    defensesLearned: 0,
    completedConcepts: [],
    completedQuizzes: {},
    phishingScore: 0,
    phishingStreak: 0,
    currentPhishingIndex: 0,
    defenseChecks: {}
};

// ==================== MATRIX BACKGROUND - RED/ORANGE THEME ====================
function initMatrixBackground() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Security/hacker themed characters
    const chars = '01!@#$%^&*SECURITYHACKDEFENDPROTECT<>{}[]|/\\';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    function draw() {
        ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Red/orange gradient effect - alternate between colors
        const colors = ['#ff4d4d', '#ff6633', '#ff8c00'];

        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 60);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==================== SECURITY CONCEPTS DATA ====================
const conceptsData = {
    passwords: {
        title: 'Password Security',
        icon: 'fa-key',
        content: `
            <div class="concept-modal-header">
                <div class="concept-modal-icon"><i class="fas fa-key"></i></div>
                <h3>Password Security</h3>
            </div>
            <div class="concept-modal-body">
                <p>Passwords are your first line of defense against unauthorized access. A strong password can mean the difference between security and a breach.</p>

                <h4>What Makes a Strong Password?</h4>
                <ul>
                    <li>At least 12-16 characters long</li>
                    <li>Mix of uppercase and lowercase letters</li>
                    <li>Include numbers and special characters</li>
                    <li>Avoid personal information (birthdays, names)</li>
                    <li>Don't use common words or patterns</li>
                </ul>

                <h4>Password Manager Benefits</h4>
                <p>Password managers generate, store, and autofill complex passwords so you only need to remember one master password.</p>
                <ul>
                    <li>Generate unique passwords for every account</li>
                    <li>Encrypted storage for all credentials</li>
                    <li>Sync across all your devices</li>
                    <li>Alert you to compromised passwords</li>
                </ul>

                <div class="tip-box">
                    <strong>Pro Tip:</strong> Consider using a passphrase - a series of random words like "correct-horse-battery-staple" is both strong and memorable!
                </div>
            </div>
        `
    },
    '2fa': {
        title: 'Two-Factor Authentication',
        icon: 'fa-mobile-screen',
        content: `
            <div class="concept-modal-header">
                <div class="concept-modal-icon"><i class="fas fa-mobile-screen"></i></div>
                <h3>Two-Factor Authentication</h3>
            </div>
            <div class="concept-modal-body">
                <p>Two-Factor Authentication (2FA) adds an extra layer of security by requiring two different types of verification before granting access.</p>

                <h4>The Three Factors</h4>
                <ul>
                    <li><strong>Something you know</strong> - Password, PIN, security question</li>
                    <li><strong>Something you have</strong> - Phone, security key, smart card</li>
                    <li><strong>Something you are</strong> - Fingerprint, face, voice</li>
                </ul>

                <h4>2FA Methods (Best to Worst)</h4>
                <ul>
                    <li><strong>Hardware keys (YubiKey)</strong> - Most secure, phishing-resistant</li>
                    <li><strong>Authenticator apps</strong> - Google/Microsoft Authenticator, Authy</li>
                    <li><strong>Push notifications</strong> - Approve login from your phone</li>
                    <li><strong>SMS codes</strong> - Better than nothing, but vulnerable to SIM swapping</li>
                </ul>

                <div class="tip-box">
                    <strong>Pro Tip:</strong> Enable 2FA on your most important accounts first: email, banking, and social media. If hackers get your email, they can reset passwords everywhere else.
                </div>
            </div>
        `
    },
    encryption: {
        title: 'Encryption Basics',
        icon: 'fa-lock',
        content: `
            <div class="concept-modal-header">
                <div class="concept-modal-icon"><i class="fas fa-lock"></i></div>
                <h3>Encryption Basics</h3>
            </div>
            <div class="concept-modal-body">
                <p>Encryption transforms readable data into an unreadable format that can only be decoded with the correct key. It's essential for protecting sensitive information.</p>

                <h4>Types of Encryption</h4>
                <ul>
                    <li><strong>Symmetric</strong> - Same key encrypts and decrypts (AES)</li>
                    <li><strong>Asymmetric</strong> - Public key encrypts, private key decrypts (RSA)</li>
                    <li><strong>End-to-End</strong> - Only sender and recipient can read messages</li>
                </ul>

                <h4>Where You See Encryption</h4>
                <ul>
                    <li><strong>HTTPS</strong> - The padlock in your browser</li>
                    <li><strong>WhatsApp/Signal</strong> - End-to-end encrypted messaging</li>
                    <li><strong>FileVault/BitLocker</strong> - Full disk encryption</li>
                    <li><strong>VPNs</strong> - Encrypted tunnel for your internet traffic</li>
                </ul>

                <div class="tip-box">
                    <strong>Pro Tip:</strong> Always check for HTTPS (padlock icon) before entering sensitive information on a website. Without it, your data travels in plain text!
                </div>
            </div>
        `
    },
    privacy: {
        title: 'Online Privacy',
        icon: 'fa-eye-slash',
        content: `
            <div class="concept-modal-header">
                <div class="concept-modal-icon"><i class="fas fa-eye-slash"></i></div>
                <h3>Online Privacy</h3>
            </div>
            <div class="concept-modal-body">
                <p>Every click, search, and scroll leaves a digital footprint. Understanding how your data is collected and used is the first step to protecting your privacy.</p>

                <h4>Who's Tracking You?</h4>
                <ul>
                    <li><strong>Websites</strong> - Cookies, analytics, tracking pixels</li>
                    <li><strong>Advertisers</strong> - Building profiles across sites</li>
                    <li><strong>Social media</strong> - Even "Share" buttons track you</li>
                    <li><strong>ISPs</strong> - Can see all unencrypted traffic</li>
                    <li><strong>Apps</strong> - Location, contacts, usage data</li>
                </ul>

                <h4>Privacy Protection Steps</h4>
                <ul>
                    <li>Use privacy-focused browsers (Firefox, Brave)</li>
                    <li>Install ad/tracker blockers (uBlock Origin)</li>
                    <li>Review app permissions regularly</li>
                    <li>Use a VPN on public networks</li>
                    <li>Opt out of data collection when possible</li>
                </ul>

                <div class="tip-box">
                    <strong>Pro Tip:</strong> Search yourself online periodically. You might be surprised what personal information is publicly available. Many sites let you request removal.
                </div>
            </div>
        `
    }
};

// ==================== THREAT DATA ====================
const threatData = {
    phishing: {
        title: 'Phishing Attacks',
        icon: 'fa-fish',
        iconClass: 'danger',
        content: `
            <div class="threat-modal-header">
                <div class="threat-modal-icon danger" style="background: rgba(255, 68, 68, 0.15); color: #ff4444;">
                    <i class="fas fa-fish"></i>
                </div>
                <h3>Phishing Attacks</h3>
            </div>
            <div class="threat-modal-body">
                <p>Phishing is a social engineering attack where criminals impersonate trusted entities to steal sensitive information like passwords, credit card numbers, or personal data.</p>

                <h4>Common Phishing Tactics</h4>
                <ul>
                    <li>Urgent messages creating fear or excitement</li>
                    <li>Fake login pages that look identical to real ones</li>
                    <li>Spoofed email addresses and domains</li>
                    <li>Attachments containing malware</li>
                    <li>Phone calls pretending to be tech support</li>
                </ul>

                <h4>Red Flags to Watch For</h4>
                <ul>
                    <li>Misspelled URLs (g00gle.com, arnazon.com)</li>
                    <li>Generic greetings ("Dear Customer")</li>
                    <li>Grammar and spelling errors</li>
                    <li>Requests for sensitive information</li>
                    <li>Threats or unusual urgency</li>
                </ul>

                <h4>How to Protect Yourself</h4>
                <ul>
                    <li>Hover over links before clicking</li>
                    <li>Go directly to websites instead of clicking email links</li>
                    <li>Verify requests through official channels</li>
                    <li>Use email filtering and anti-phishing tools</li>
                </ul>
            </div>
        `
    },
    malware: {
        title: 'Malware',
        icon: 'fa-bug',
        iconClass: 'danger',
        content: `
            <div class="threat-modal-header">
                <div class="threat-modal-icon danger" style="background: rgba(255, 68, 68, 0.15); color: #ff4444;">
                    <i class="fas fa-bug"></i>
                </div>
                <h3>Malware</h3>
            </div>
            <div class="threat-modal-body">
                <p>Malware (malicious software) is any program designed to harm, exploit, or compromise computers and networks. It comes in many forms, each with different goals.</p>

                <h4>Types of Malware</h4>
                <ul>
                    <li><strong>Viruses</strong> - Attach to files and spread when executed</li>
                    <li><strong>Trojans</strong> - Disguised as legitimate software</li>
                    <li><strong>Ransomware</strong> - Encrypts files and demands payment</li>
                    <li><strong>Spyware</strong> - Secretly monitors your activity</li>
                    <li><strong>Worms</strong> - Self-replicating across networks</li>
                    <li><strong>Keyloggers</strong> - Record everything you type</li>
                </ul>

                <h4>How Malware Spreads</h4>
                <ul>
                    <li>Email attachments and malicious links</li>
                    <li>Infected software downloads</li>
                    <li>Compromised websites (drive-by downloads)</li>
                    <li>Infected USB drives</li>
                    <li>Exploiting unpatched vulnerabilities</li>
                </ul>

                <h4>Protection Strategies</h4>
                <ul>
                    <li>Keep all software up to date</li>
                    <li>Use reputable antivirus software</li>
                    <li>Only download from trusted sources</li>
                    <li>Be cautious with email attachments</li>
                    <li>Regular backups (3-2-1 rule)</li>
                </ul>
            </div>
        `
    },
    social: {
        title: 'Social Engineering',
        icon: 'fa-masks-theater',
        iconClass: 'warning',
        content: `
            <div class="threat-modal-header">
                <div class="threat-modal-icon warning" style="background: rgba(255, 170, 0, 0.15); color: #ffaa00;">
                    <i class="fas fa-masks-theater"></i>
                </div>
                <h3>Social Engineering</h3>
            </div>
            <div class="threat-modal-body">
                <p>Social engineering exploits human psychology rather than technical vulnerabilities. Attackers manipulate people into giving up confidential information or taking harmful actions.</p>

                <h4>Common Techniques</h4>
                <ul>
                    <li><strong>Pretexting</strong> - Creating a fabricated scenario to gain trust</li>
                    <li><strong>Baiting</strong> - Offering something enticing (free USB drives)</li>
                    <li><strong>Quid pro quo</strong> - Offering help in exchange for information</li>
                    <li><strong>Tailgating</strong> - Following someone into a secure area</li>
                    <li><strong>Vishing</strong> - Voice phishing over phone calls</li>
                </ul>

                <h4>Psychological Triggers Used</h4>
                <ul>
                    <li>Authority - Pretending to be IT, police, or executives</li>
                    <li>Urgency - Creating time pressure</li>
                    <li>Fear - Threatening consequences</li>
                    <li>Helpfulness - Exploiting desire to assist</li>
                    <li>Social proof - "Everyone else is doing it"</li>
                </ul>

                <h4>Defense Strategies</h4>
                <ul>
                    <li>Verify identities through official channels</li>
                    <li>Be skeptical of unsolicited contacts</li>
                    <li>Take time to think before acting</li>
                    <li>Know your organization's security policies</li>
                </ul>
            </div>
        `
    },
    mitm: {
        title: 'Man-in-the-Middle Attacks',
        icon: 'fa-user-secret',
        iconClass: 'warning',
        content: `
            <div class="threat-modal-header">
                <div class="threat-modal-icon warning" style="background: rgba(255, 170, 0, 0.15); color: #ffaa00;">
                    <i class="fas fa-user-secret"></i>
                </div>
                <h3>Man-in-the-Middle Attacks</h3>
            </div>
            <div class="threat-modal-body">
                <p>In a Man-in-the-Middle (MITM) attack, an attacker secretly intercepts and possibly alters communications between two parties who believe they're communicating directly.</p>

                <h4>How MITM Attacks Work</h4>
                <ul>
                    <li>Attacker positions themselves between you and the server</li>
                    <li>All traffic passes through the attacker</li>
                    <li>Can read, modify, or inject data</li>
                    <li>Often undetectable without proper security</li>
                </ul>

                <h4>Common MITM Scenarios</h4>
                <ul>
                    <li><strong>Evil twin WiFi</strong> - Fake hotspots mimicking legitimate ones</li>
                    <li><strong>ARP spoofing</strong> - Redirecting network traffic</li>
                    <li><strong>DNS spoofing</strong> - Redirecting to fake websites</li>
                    <li><strong>SSL stripping</strong> - Downgrading HTTPS to HTTP</li>
                </ul>

                <h4>Protection Measures</h4>
                <ul>
                    <li>Only use HTTPS websites (check for padlock)</li>
                    <li>Avoid sensitive tasks on public WiFi</li>
                    <li>Use a VPN on untrusted networks</li>
                    <li>Enable HTTPS-Only mode in your browser</li>
                    <li>Watch for certificate warnings</li>
                </ul>
            </div>
        `
    },
    bruteforce: {
        title: 'Brute Force Attacks',
        icon: 'fa-hammer',
        iconClass: 'caution',
        content: `
            <div class="threat-modal-header">
                <div class="threat-modal-icon caution" style="background: rgba(0, 212, 255, 0.15); color: #00d4ff;">
                    <i class="fas fa-hammer"></i>
                </div>
                <h3>Brute Force Attacks</h3>
            </div>
            <div class="threat-modal-body">
                <p>Brute force attacks systematically try every possible combination of passwords or encryption keys until finding the correct one. Modern computers can try billions of combinations per second.</p>

                <h4>Types of Brute Force</h4>
                <ul>
                    <li><strong>Simple brute force</strong> - Try every combination (aaa, aab, aac...)</li>
                    <li><strong>Dictionary attacks</strong> - Try common words and variations</li>
                    <li><strong>Credential stuffing</strong> - Use leaked username/password pairs</li>
                    <li><strong>Rainbow tables</strong> - Pre-computed hash lookups</li>
                </ul>

                <h4>Time to Crack (Examples)</h4>
                <ul>
                    <li>6 lowercase letters: Instant</li>
                    <li>8 mixed case + numbers: 1 hour</li>
                    <li>12 characters with symbols: 34,000 years</li>
                    <li>16 character passphrase: Millions of years</li>
                </ul>

                <h4>How Services Protect Against This</h4>
                <ul>
                    <li>Account lockouts after failed attempts</li>
                    <li>CAPTCHA challenges</li>
                    <li>Rate limiting login attempts</li>
                    <li>Multi-factor authentication</li>
                </ul>
            </div>
        `
    },
    wifi: {
        title: 'WiFi Attacks',
        icon: 'fa-wifi',
        iconClass: 'warning',
        content: `
            <div class="threat-modal-header">
                <div class="threat-modal-icon warning" style="background: rgba(255, 170, 0, 0.15); color: #ffaa00;">
                    <i class="fas fa-wifi"></i>
                </div>
                <h3>WiFi Security Threats</h3>
            </div>
            <div class="threat-modal-body">
                <p>Wireless networks are convenient but introduce unique security risks. Attackers can intercept wireless signals without physical access to your network.</p>

                <h4>Common WiFi Threats</h4>
                <ul>
                    <li><strong>Evil Twin</strong> - Fake access points with legitimate-looking names</li>
                    <li><strong>Packet sniffing</strong> - Capturing unencrypted network traffic</li>
                    <li><strong>Deauth attacks</strong> - Forcing disconnection to capture handshakes</li>
                    <li><strong>Rogue access points</strong> - Unauthorized APs on corporate networks</li>
                </ul>

                <h4>Public WiFi Dangers</h4>
                <ul>
                    <li>No way to verify the network is legitimate</li>
                    <li>Other users can potentially see your traffic</li>
                    <li>Easy for attackers to set up fake networks</li>
                    <li>Often no encryption between you and the router</li>
                </ul>

                <h4>Staying Safe on WiFi</h4>
                <ul>
                    <li>Use WPA3 or WPA2 encryption at home</li>
                    <li>Change default router passwords</li>
                    <li>Use a VPN on public networks</li>
                    <li>Disable auto-connect to open networks</li>
                    <li>Forget networks you no longer use</li>
                    <li>Use mobile data for sensitive transactions</li>
                </ul>
            </div>
        `
    }
};

// ==================== PHISHING EMAILS DATA ====================
const phishingEmails = [
    {
        from: 'security@paypa1.com',
        subject: 'Urgent: Your Account Has Been Compromised!',
        body: 'Dear Valued Customer,\n\nWe have detected suspicious activity on your account. Your account has been temporarily limited. Please verify your information within 24 hours or your account will be permanently suspended.\n\nClick the link below to verify your identity:',
        link: 'http://paypa1-secure.verify-account.com/login',
        isPhishing: true,
        explanation: 'This is phishing! Notice "paypa1" (with number 1) instead of "paypal", the generic greeting, urgency tactics, and the suspicious link domain.'
    },
    {
        from: 'noreply@amazon.com',
        subject: 'Your Amazon.com order #112-4567890-1234567',
        body: 'Hello,\n\nYour order has shipped! Track your package using the link in your account.\n\nOrder Details:\n- Wireless Headphones\n- Estimated delivery: Tuesday\n\nThank you for shopping with us.',
        link: 'https://www.amazon.com/gp/your-orders',
        isPhishing: false,
        explanation: 'This appears legitimate. The email domain is correct, it references a specific order number, and the link goes to the official Amazon domain.'
    },
    {
        from: 'IT-Support@yourcompany-helpdesk.com',
        subject: 'Password Expiring - Action Required',
        body: 'Your corporate password will expire in 2 hours. To avoid being locked out of all company systems, you must update your password immediately using the secure portal below.\n\nFailure to comply will result in account suspension.',
        link: 'http://yourcompany-password-reset.com/update',
        isPhishing: true,
        explanation: 'Phishing! Legitimate IT departments use official company domains, not "yourcompany-helpdesk.com". The extreme urgency and threat of suspension are red flags.'
    },
    {
        from: 'notifications@linkedin.com',
        subject: 'You have 3 new connection requests',
        body: 'Hi there,\n\nYou have pending connection requests on LinkedIn:\n\n- Sarah Johnson, Marketing Manager\n- Michael Chen, Software Engineer\n- Lisa Williams, HR Director\n\nView and respond to these requests in your LinkedIn inbox.',
        link: 'https://www.linkedin.com/mynetwork/invitation-manager/',
        isPhishing: false,
        explanation: 'This looks legitimate. The sender domain is correct, content is typical for LinkedIn, and the link points to the official LinkedIn domain.'
    },
    {
        from: 'apple.support@icloud-verify.com',
        subject: 'Your Apple ID was used to sign in to iCloud',
        body: 'Your Apple ID (j***@email.com) was used to sign in to iCloud on a new device.\n\nIf this wasn\'t you, someone may have access to your account. Secure your account immediately:',
        link: 'http://appleid.icloud-verify.com/secure',
        isPhishing: true,
        explanation: 'Phishing! Apple emails come from @apple.com or @email.apple.com, not "icloud-verify.com". Always check the actual sender domain carefully.'
    },
    {
        from: 'no-reply@accounts.google.com',
        subject: 'Security alert: New sign-in from Windows',
        body: 'A new sign-in on Windows\n\nWe noticed a new sign-in to your Google Account on a Windows device. If this was you, you don\'t need to do anything. If not, we\'ll help you secure your account.\n\nCheck activity',
        link: 'https://myaccount.google.com/notifications',
        isPhishing: false,
        explanation: 'This appears legitimate. Google security alerts come from accounts.google.com, and the link points to the official Google account page.'
    },
    {
        from: 'netflix-billing@account-update.net',
        subject: 'Payment Failed - Update Required',
        body: 'We were unable to process your payment for the current billing period. Your subscription will be canceled within 48 hours unless you update your payment method.\n\nUpdate Payment Now to continue enjoying Netflix.',
        link: 'http://netflix-billing.account-update.net/payment',
        isPhishing: true,
        explanation: 'Phishing! Netflix emails come from @netflix.com. The domain "account-update.net" is suspicious, and the urgency is a classic phishing tactic.'
    },
    {
        from: 'donotreply@github.com',
        subject: '[GitHub] A third-party OAuth application has been added',
        body: 'Hey username,\n\nA third-party OAuth application (VS Code) was recently authorized to access your GitHub account.\n\nIf you did not authorize this application, please review your authorized applications and revoke access immediately.',
        link: 'https://github.com/settings/applications',
        isPhishing: false,
        explanation: 'This looks legitimate. The sender is from github.com, the content matches typical GitHub notifications, and the link goes to official GitHub settings.'
    },
    {
        from: 'winner@lottery-international.org',
        subject: 'CONGRATULATIONS! You\'ve Won $1,500,000!',
        body: 'CONGRATULATIONS!!!\n\nYour email was randomly selected in our international lottery draw. You have won $1,500,000 USD!\n\nTo claim your prize, reply with your full name, address, phone number, and bank details for the wire transfer.',
        link: 'mailto:claims@lottery-international.org',
        isPhishing: true,
        explanation: 'Classic scam! You can\'t win a lottery you didn\'t enter. Requests for personal and banking information are major red flags. Delete immediately.'
    },
    {
        from: 'support@spotify.com',
        subject: 'Your Spotify Premium subscription',
        body: 'Thanks for being a Premium subscriber!\n\nYour next billing date is March 15, 2024. You\'ll be charged $9.99 for your monthly subscription.\n\nManage your subscription anytime in your account settings.',
        link: 'https://www.spotify.com/account',
        isPhishing: false,
        explanation: 'This appears legitimate. The email is from spotify.com, contains expected subscription information, and links to the official Spotify website.'
    }
];

// ==================== QUIZ DATA ====================
const quizData = {
    basics: {
        title: 'Security Basics',
        questions: [
            {
                question: 'What is the minimum recommended length for a strong password?',
                options: ['6 characters', '8 characters', '12 characters', '4 characters'],
                correct: 2,
                explanation: '12 characters or more is recommended. Longer passwords are exponentially harder to crack.'
            },
            {
                question: 'What does HTTPS indicate about a website?',
                options: ['It\'s a government site', 'The connection is encrypted', 'The site is free', 'It loads faster'],
                correct: 1,
                explanation: 'HTTPS means the connection between your browser and the website is encrypted, protecting data in transit.'
            },
            {
                question: 'What is two-factor authentication (2FA)?',
                options: ['Using two passwords', 'Logging in twice', 'Using two different verification methods', 'Having two accounts'],
                correct: 2,
                explanation: '2FA requires two different types of verification (like password + phone code), making accounts much more secure.'
            },
            {
                question: 'Which is the safest place to store passwords?',
                options: ['Written on a sticky note', 'In a password manager', 'In a text file on your desktop', 'Same password everywhere'],
                correct: 1,
                explanation: 'Password managers encrypt and securely store all your passwords, generating unique strong passwords for each account.'
            },
            {
                question: 'What should you do if a website\'s security certificate has expired?',
                options: ['Ignore it and continue', 'Leave the site immediately', 'Refresh the page', 'Clear your cookies'],
                correct: 1,
                explanation: 'Certificate warnings can indicate a man-in-the-middle attack. Don\'t enter any sensitive information.'
            }
        ]
    },
    threats: {
        title: 'Threat Recognition',
        questions: [
            {
                question: 'What is phishing?',
                options: ['A type of malware', 'Fraudulent attempts to steal information', 'A network attack', 'A fishing video game'],
                correct: 1,
                explanation: 'Phishing uses deceptive emails, websites, or messages to trick people into revealing sensitive information.'
            },
            {
                question: 'Which is a sign of a phishing email?',
                options: ['Specific greeting with your name', 'Misspelled company URL', 'Consistent branding', 'Expected content'],
                correct: 1,
                explanation: 'Misspelled URLs (like "arnazon.com") are a major red flag. Always check links carefully before clicking.'
            },
            {
                question: 'What is ransomware?',
                options: ['Software that speeds up your computer', 'Malware that encrypts files and demands payment', 'A type of antivirus', 'Free software'],
                correct: 1,
                explanation: 'Ransomware encrypts your files and demands payment (usually cryptocurrency) for the decryption key.'
            },
            {
                question: 'What is social engineering?',
                options: ['Building social media platforms', 'Manipulating people to reveal information', 'Engineering social events', 'Creating online profiles'],
                correct: 1,
                explanation: 'Social engineering exploits human psychology to manipulate people into making security mistakes.'
            },
            {
                question: 'What is an "evil twin" attack?',
                options: ['A virus that clones itself', 'A fake WiFi network mimicking a legitimate one', 'Two hackers working together', 'A backup system'],
                correct: 1,
                explanation: 'Evil twin attacks create fake WiFi hotspots that look like legitimate networks to intercept your traffic.'
            }
        ]
    },
    defense: {
        title: 'Defense Strategies',
        questions: [
            {
                question: 'What is the best defense against phishing?',
                options: ['Antivirus software only', 'Verifying requests through official channels', 'Faster internet', 'Using public WiFi'],
                correct: 1,
                explanation: 'Always verify unexpected requests by contacting the company directly through their official website or phone number.'
            },
            {
                question: 'How often should you update your software?',
                options: ['Never', 'Only when it stops working', 'As soon as updates are available', 'Once a year'],
                correct: 2,
                explanation: 'Security patches fix known vulnerabilities. Update promptly to protect against known exploits.'
            },
            {
                question: 'What should you do on public WiFi?',
                options: ['Do online banking', 'Use a VPN', 'Share sensitive files', 'Disable your firewall'],
                correct: 1,
                explanation: 'A VPN encrypts your traffic, protecting it from potential eavesdroppers on public networks.'
            },
            {
                question: 'What is the 3-2-1 backup rule?',
                options: ['3 passwords, 2 emails, 1 phone', '3 copies, 2 different media, 1 offsite', '3 users, 2 admins, 1 guest', '3 days, 2 weeks, 1 month'],
                correct: 1,
                explanation: 'Keep 3 copies of data, on 2 different types of media, with 1 copy stored offsite (or in the cloud).'
            },
            {
                question: 'Why should you use unique passwords for each account?',
                options: ['It\'s more fun', 'If one is compromised, others stay safe', 'Websites require it', 'They\'re easier to remember'],
                correct: 1,
                explanation: 'If a service is breached and you reuse passwords, attackers can access all your other accounts too.'
            }
        ]
    },
    advanced: {
        title: 'Advanced Security',
        questions: [
            {
                question: 'What is a zero-day vulnerability?',
                options: ['A bug fixed on day one', 'A flaw unknown to the vendor', 'A virus that activates at midnight', 'An expired security certificate'],
                correct: 1,
                explanation: 'Zero-day vulnerabilities are unknown to the software vendor, giving them "zero days" to fix it before exploitation.'
            },
            {
                question: 'What is the purpose of salting passwords?',
                options: ['Making them taste better', 'Adding random data before hashing', 'Encrypting them twice', 'Shortening them'],
                correct: 1,
                explanation: 'Salting adds random data to passwords before hashing, preventing rainbow table attacks and making identical passwords hash differently.'
            },
            {
                question: 'What is defense in depth?',
                options: ['Deep web security', 'Multiple layers of security controls', 'Underground bunkers', 'Very long passwords'],
                correct: 1,
                explanation: 'Defense in depth uses multiple security layers so if one fails, others still protect the system.'
            },
            {
                question: 'What does a firewall do?',
                options: ['Prevents computer fires', 'Monitors and filters network traffic', 'Speeds up internet', 'Stores passwords'],
                correct: 1,
                explanation: 'Firewalls monitor incoming and outgoing network traffic, blocking unauthorized connections based on security rules.'
            },
            {
                question: 'What is the principle of least privilege?',
                options: ['Giving users minimal necessary access', 'Using the cheapest security tools', 'Having few administrators', 'Limiting internet time'],
                correct: 0,
                explanation: 'Users should only have the minimum access needed for their role, limiting damage from compromised accounts.'
            }
        ]
    }
};

// ==================== DOM INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initMatrixBackground();
    initNavigation();
    initModals();
    initConceptCards();
    initThreatCards();
    initPasswordChecker();
    initPhishingGame();
    initDefenseChecklist();
    initResourceTabs();
    initQuizzes();
    loadGameState();
    updateUI();
});

// ==================== NAVIGATION ====================
function initNavigation() {
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==================== MODALS ====================
function initModals() {
    // About Modal
    const aboutBtn = document.getElementById('aboutBtn');
    const aboutModal = document.getElementById('aboutModal');
    const closeAboutModal = document.getElementById('closeAboutModal');

    aboutBtn.addEventListener('click', () => openModal(aboutModal));
    closeAboutModal.addEventListener('click', () => closeModal(aboutModal));

    // Quiz Modal
    const quizModal = document.getElementById('quizModal');
    const closeQuizModal = document.getElementById('closeQuizModal');
    closeQuizModal.addEventListener('click', () => closeModal(quizModal));

    // Threat Modal
    const threatModal = document.getElementById('threatModal');
    const closeThreatModal = document.getElementById('closeThreatModal');
    closeThreatModal.addEventListener('click', () => closeModal(threatModal));

    // Concept Modal
    const conceptModal = document.getElementById('conceptModal');
    const closeConceptModal = document.getElementById('closeConceptModal');
    closeConceptModal.addEventListener('click', () => closeModal(conceptModal));

    // Close modals on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => closeModal(modal));
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ==================== CONCEPT CARDS ====================
function initConceptCards() {
    document.querySelectorAll('.concept-card').forEach(card => {
        card.addEventListener('click', () => {
            const concept = card.dataset.concept;
            const data = conceptsData[concept];

            if (data) {
                const modal = document.getElementById('conceptModal');
                const content = document.getElementById('conceptModalContent');
                content.innerHTML = data.content;
                openModal(modal);

                // Mark as learned
                if (!gameState.completedConcepts.includes(concept)) {
                    gameState.completedConcepts.push(concept);
                    gameState.modulesCompleted++;
                    gameState.securityScore += 15;
                    updateUI();
                    showScoreNotification('+15 Security IQ');
                    saveGameState();

                    // Update card status
                    card.querySelector('.concept-status').textContent = 'Completed';
                    card.querySelector('.progress-fill').style.width = '100%';
                }
            }
        });
    });
}

// ==================== THREAT CARDS ====================
function initThreatCards() {
    document.querySelectorAll('.threat-card .learn-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.threat-card');
            const threat = card.dataset.threat;
            const data = threatData[threat];

            if (data) {
                const modal = document.getElementById('threatModal');
                const content = document.getElementById('threatModalContent');
                content.innerHTML = data.content;
                openModal(modal);

                // Count as threat identified
                if (!gameState[`threat_${threat}`]) {
                    gameState[`threat_${threat}`] = true;
                    gameState.threatsIdentified++;
                    gameState.securityScore += 10;
                    updateUI();
                    showScoreNotification('+10 Security IQ');
                    saveGameState();
                }
            }
        });
    });
}

// ==================== PASSWORD CHECKER ====================
function initPasswordChecker() {
    const input = document.getElementById('passwordInput');
    const toggle = document.getElementById('togglePassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');
    const crackTime = document.getElementById('crackTime');

    const feedbackItems = {
        length: document.getElementById('feedbackLength'),
        upper: document.getElementById('feedbackUpper'),
        lower: document.getElementById('feedbackLower'),
        number: document.getElementById('feedbackNumber'),
        special: document.getElementById('feedbackSpecial')
    };

    toggle.addEventListener('click', () => {
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        toggle.innerHTML = type === 'password'
            ? '<i class="fas fa-eye"></i>'
            : '<i class="fas fa-eye-slash"></i>';
    });

    input.addEventListener('input', () => {
        const password = input.value;
        const analysis = analyzePassword(password);

        // Update strength bar
        strengthBar.style.width = analysis.score + '%';
        strengthBar.style.background = analysis.color;

        // Update label
        strengthLabel.textContent = analysis.label;
        strengthLabel.style.color = analysis.color;

        // Update feedback items
        feedbackItems.length.classList.toggle('valid', password.length >= 12);
        feedbackItems.upper.classList.toggle('valid', /[A-Z]/.test(password));
        feedbackItems.lower.classList.toggle('valid', /[a-z]/.test(password));
        feedbackItems.number.classList.toggle('valid', /[0-9]/.test(password));
        feedbackItems.special.classList.toggle('valid', /[^A-Za-z0-9]/.test(password));

        // Update crack time
        if (password.length > 0) {
            crackTime.innerHTML = `Estimated crack time: <strong>${analysis.crackTime}</strong>`;
        } else {
            crackTime.innerHTML = '';
        }
    });
}

function analyzePassword(password) {
    let score = 0;
    let crackTime = 'Instant';

    if (password.length === 0) {
        return { score: 0, label: 'Enter a password to check', color: '#5a7a66', crackTime: 'N/A' };
    }

    // Length scoring
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 20;
    if (password.length >= 16) score += 10;

    // Character variety
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;

    // Estimate crack time
    const charsetSize =
        (/[a-z]/.test(password) ? 26 : 0) +
        (/[A-Z]/.test(password) ? 26 : 0) +
        (/[0-9]/.test(password) ? 10 : 0) +
        (/[^A-Za-z0-9]/.test(password) ? 32 : 0);

    const combinations = Math.pow(charsetSize, password.length);
    const guessesPerSecond = 10000000000; // 10 billion
    const seconds = combinations / guessesPerSecond / 2;

    if (seconds < 1) crackTime = 'Instant';
    else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`;
    else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`;
    else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`;
    else if (seconds < 31536000) crackTime = `${Math.round(seconds / 86400)} days`;
    else if (seconds < 31536000 * 1000) crackTime = `${Math.round(seconds / 31536000)} years`;
    else if (seconds < 31536000 * 1000000) crackTime = `${Math.round(seconds / 31536000 / 1000)} thousand years`;
    else crackTime = 'Millions of years';

    // Determine label and color
    let label, color;
    if (score < 30) {
        label = 'Very Weak';
        color = '#ff4444';
    } else if (score < 50) {
        label = 'Weak';
        color = '#ff6644';
    } else if (score < 70) {
        label = 'Fair';
        color = '#ffaa00';
    } else if (score < 90) {
        label = 'Strong';
        color = '#88cc00';
    } else {
        label = 'Very Strong';
        color = '#00ff88';
    }

    return { score, label, color, crackTime };
}

// ==================== PHISHING GAME ====================
function initPhishingGame() {
    const btnLegit = document.getElementById('btnLegit');
    const btnPhish = document.getElementById('btnPhish');

    loadPhishingEmail();

    btnLegit.addEventListener('click', () => checkPhishingAnswer(false));
    btnPhish.addEventListener('click', () => checkPhishingAnswer(true));
}

function loadPhishingEmail() {
    const email = phishingEmails[gameState.currentPhishingIndex];

    document.getElementById('emailFrom').textContent = email.from;
    document.getElementById('emailSubject').textContent = email.subject;
    document.getElementById('emailBody').textContent = email.body;
    document.getElementById('emailLink').textContent = email.link;

    document.getElementById('gameFeedback').textContent = '';
    document.getElementById('gameFeedback').className = 'game-feedback';
}

function checkPhishingAnswer(guessedPhishing) {
    const email = phishingEmails[gameState.currentPhishingIndex];
    const correct = guessedPhishing === email.isPhishing;
    const feedback = document.getElementById('gameFeedback');

    if (correct) {
        feedback.textContent = '✓ Correct! ' + email.explanation;
        feedback.className = 'game-feedback correct';
        gameState.phishingScore++;
        gameState.phishingStreak++;
        gameState.securityScore += 5;
        showScoreNotification('+5 Security IQ');
    } else {
        feedback.textContent = '✗ Incorrect. ' + email.explanation;
        feedback.className = 'game-feedback incorrect';
        gameState.phishingStreak = 0;
    }

    document.getElementById('phishScore').textContent = gameState.phishingScore;
    document.getElementById('phishStreak').textContent = gameState.phishingStreak;

    // Check for achievements
    if (gameState.phishingStreak === 5) {
        showAchievement('Phishing Expert - 5 correct in a row!');
    }

    // Move to next email after delay
    setTimeout(() => {
        gameState.currentPhishingIndex = (gameState.currentPhishingIndex + 1) % phishingEmails.length;
        loadPhishingEmail();
    }, 3000);

    updateUI();
    saveGameState();
}

// ==================== DEFENSE CHECKLIST ====================
function initDefenseChecklist() {
    document.querySelectorAll('.defense-check').forEach(checkbox => {
        // Load saved state
        const defense = checkbox.dataset.defense;
        if (gameState.defenseChecks[defense]) {
            checkbox.checked = true;
        }

        checkbox.addEventListener('change', () => {
            gameState.defenseChecks[defense] = checkbox.checked;

            if (checkbox.checked) {
                gameState.defensesLearned++;
                gameState.securityScore += 3;
                showScoreNotification('+3 Security IQ');
            } else {
                gameState.defensesLearned--;
                gameState.securityScore -= 3;
            }

            updateDefenseScore();
            updateUI();
            saveGameState();
        });
    });
}

function updateDefenseScore() {
    const categories = {
        personal: ['unique-passwords', 'password-manager', '2fa-enabled', 'security-questions'],
        device: ['updates', 'antivirus', 'firewall', 'encryption'],
        online: ['https', 'links', 'public-wifi', 'vpn'],
        data: ['backups', 'privacy-settings', 'data-sharing', 'secure-delete']
    };

    let totalChecked = 0;
    const totalItems = 16;

    // Calculate per-category scores
    Object.entries(categories).forEach(([category, items]) => {
        let categoryChecked = 0;
        items.forEach(item => {
            if (gameState.defenseChecks[item]) {
                categoryChecked++;
                totalChecked++;
            }
        });

        const percentage = (categoryChecked / items.length) * 100;
        const fillId = category === 'personal' ? 'personalFill' :
                       category === 'device' ? 'deviceFill' :
                       category === 'online' ? 'onlineFill' : 'dataFill';

        document.getElementById(fillId).style.width = percentage + '%';
    });

    // Update main score
    const overallPercentage = Math.round((totalChecked / totalItems) * 100);
    document.getElementById('defenseScore').textContent = overallPercentage;

    // Update circular progress
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (overallPercentage / 100) * circumference;
    document.getElementById('scoreProgress').style.strokeDasharray = `${circumference - offset} ${circumference}`;
}

// ==================== RESOURCE TABS ====================
function initResourceTabs() {
    document.querySelectorAll('.resource-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            document.querySelectorAll('.resource-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active panel
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.resource-panel').forEach(p => p.classList.remove('active'));
            document.getElementById(`${tabName}-panel`).classList.add('active');
        });
    });
}

// ==================== QUIZZES ====================
let currentQuiz = null;
let currentQuestion = 0;
let quizScore = 0;

function initQuizzes() {
    document.querySelectorAll('.quiz-start-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.quiz-card');
            const quizName = card.dataset.quiz;
            startQuiz(quizName);
        });
    });

    document.getElementById('quizNextBtn').addEventListener('click', nextQuestion);
    document.getElementById('retryQuiz').addEventListener('click', () => startQuiz(currentQuiz));
    document.getElementById('closeResults').addEventListener('click', () => {
        closeModal(document.getElementById('quizModal'));
    });
}

function startQuiz(quizName) {
    currentQuiz = quizName;
    currentQuestion = 0;
    quizScore = 0;

    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';

    openModal(document.getElementById('quizModal'));
    loadQuestion();
}

function loadQuestion() {
    const quiz = quizData[currentQuiz];
    const question = quiz.questions[currentQuestion];

    document.getElementById('quizProgress').textContent =
        `Question ${currentQuestion + 1} of ${quiz.questions.length}`;
    document.getElementById('quizProgressFill').style.width =
        `${((currentQuestion + 1) / quiz.questions.length) * 100}%`;

    document.getElementById('quizQuestion').textContent = question.question;

    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option;
        btn.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(btn);
    });

    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('quizFeedback').className = 'quiz-feedback';
    document.getElementById('quizNextBtn').style.display = 'none';
}

function selectAnswer(index) {
    const quiz = quizData[currentQuiz];
    const question = quiz.questions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quizFeedback');

    // Disable all options
    options.forEach(opt => opt.style.pointerEvents = 'none');

    // Mark selected answer
    options[index].classList.add('selected');

    if (index === question.correct) {
        options[index].classList.remove('selected');
        options[index].classList.add('correct');
        feedback.textContent = '✓ Correct! ' + question.explanation;
        feedback.className = 'quiz-feedback correct';
        quizScore++;
        gameState.securityScore += 5;
    } else {
        options[index].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        feedback.textContent = '✗ Incorrect. ' + question.explanation;
        feedback.className = 'quiz-feedback incorrect';
    }

    document.getElementById('quizNextBtn').style.display = 'inline-block';
    document.getElementById('quizNextBtn').textContent =
        currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'See Results';
}

function nextQuestion() {
    const quiz = quizData[currentQuiz];

    if (currentQuestion < quiz.questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    const quiz = quizData[currentQuiz];
    const percentage = Math.round((quizScore / quiz.questions.length) * 100);

    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';

    let message = '';
    if (percentage === 100) {
        message = `Perfect score! You got ${quizScore}/${quiz.questions.length} questions correct. You're a cybersecurity expert!`;
        showAchievement(`${quiz.title} Master - Perfect Score!`);
    } else if (percentage >= 80) {
        message = `Great job! You got ${quizScore}/${quiz.questions.length} questions correct. You have strong security knowledge!`;
    } else if (percentage >= 60) {
        message = `Good effort! You got ${quizScore}/${quiz.questions.length} questions correct. Keep learning to improve!`;
    } else {
        message = `You got ${quizScore}/${quiz.questions.length} questions correct. Review the material and try again!`;
    }

    document.getElementById('quizResultText').textContent = message;

    // Update quiz score display
    const scoreElement = document.getElementById(`${currentQuiz}-score`);
    if (scoreElement) {
        scoreElement.textContent = `${percentage}%`;
    }

    // Save completion
    gameState.completedQuizzes[currentQuiz] = percentage;
    updateUI();
    saveGameState();
}

// ==================== NOTIFICATIONS ====================
function showScoreNotification(text) {
    const notification = document.getElementById('scoreNotification');
    document.getElementById('scoreAmount').textContent = text;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2500);
}

function showAchievement(name) {
    const popup = document.getElementById('achievementPopup');
    document.getElementById('achievementName').textContent = name;
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 4000);
}

// ==================== UI UPDATES ====================
function updateUI() {
    // Update nav score ring
    const maxScore = 200;
    const percentage = Math.min((gameState.securityScore / maxScore) * 100, 100);
    document.getElementById('scoreFill').setAttribute('stroke-dasharray', `${percentage}, 100`);
    document.getElementById('securityScore').textContent = gameState.securityScore;

    // Update hero stats
    document.getElementById('modulesCompleted').textContent = gameState.modulesCompleted;
    document.getElementById('threatsIdentified').textContent = gameState.threatsIdentified;
    document.getElementById('defensesLearned').textContent = Object.values(gameState.defenseChecks).filter(v => v).length;

    // Update phishing scores
    document.getElementById('phishScore').textContent = gameState.phishingScore;
    document.getElementById('phishStreak').textContent = gameState.phishingStreak;

    // Update defense score
    updateDefenseScore();

    // Update concept cards
    gameState.completedConcepts.forEach(concept => {
        const card = document.querySelector(`.concept-card[data-concept="${concept}"]`);
        if (card) {
            card.querySelector('.concept-status').textContent = 'Completed';
            card.querySelector('.progress-fill').style.width = '100%';
        }
    });

    // Update quiz scores
    Object.entries(gameState.completedQuizzes).forEach(([quiz, score]) => {
        const scoreElement = document.getElementById(`${quiz}-score`);
        if (scoreElement) {
            scoreElement.textContent = `${score}%`;
        }
    });
}

// ==================== GAME STATE PERSISTENCE ====================
function saveGameState() {
    localStorage.setItem('hackingAndU_gameState', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('hackingAndU_gameState');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(gameState, parsed);

        // Restore checkbox states
        Object.entries(gameState.defenseChecks).forEach(([defense, checked]) => {
            const checkbox = document.querySelector(`[data-defense="${defense}"]`);
            if (checkbox) checkbox.checked = checked;
        });
    }
}

// ==================== SMOOTH ANIMATIONS ====================
// Animate numbers on scroll
const observerOptions = {
    threshold: 0.5
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.info-stat').forEach(stat => {
    animateOnScroll.observe(stat);
});

// ==================== RECOVERY CHECKLIST PROGRESS ====================
function initRecoveryChecklist() {
    const recoveryChecks = document.querySelectorAll('.recovery-check');
    const totalSteps = recoveryChecks.length;

    // Load saved state
    const savedRecovery = localStorage.getItem('threataware_recovery');
    if (savedRecovery) {
        const checked = JSON.parse(savedRecovery);
        checked.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) checkbox.checked = true;
        });
    }

    function updateRecoveryProgress() {
        const checked = document.querySelectorAll('.recovery-check:checked').length;
        const percentage = Math.round((checked / totalSteps) * 100);

        // Update progress ring
        const progressCircle = document.getElementById('recoveryProgress');
        const percentText = document.getElementById('recoveryPercent');

        if (progressCircle && percentText) {
            const circumference = 2 * Math.PI * 45; // radius = 45
            const offset = circumference - (percentage / 100) * circumference;
            progressCircle.style.strokeDasharray = `${circumference - offset} ${circumference}`;
            percentText.textContent = percentage + '%';
        }

        // Save state
        const checkedIds = Array.from(document.querySelectorAll('.recovery-check:checked'))
            .map(cb => cb.id);
        localStorage.setItem('threataware_recovery', JSON.stringify(checkedIds));
    }

    recoveryChecks.forEach(check => {
        check.addEventListener('change', updateRecoveryProgress);
    });

    // Initial update
    updateRecoveryProgress();
}

// Initialize recovery checklist when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRecoveryChecklist);
} else {
    initRecoveryChecklist();
}

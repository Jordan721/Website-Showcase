// Theme state
let isDarkMode = false;

// Stats tracking
let stats = {
    toggleCount: 0,
    colorChanges: 0,
    achievementsUnlocked: 0
};

// Achievements definition
const achievements = [
    { id: 'first-toggle', name: 'First Steps', description: 'Toggle dark mode for the first time', icon: '🌙', unlocked: false, condition: () => stats.toggleCount >= 1 },
    { id: 'toggle-master', name: 'Toggle Master', description: 'Toggle theme 10 times', icon: '🔄', unlocked: false, condition: () => stats.toggleCount >= 10 },
    { id: 'color-artist', name: 'Color Artist', description: 'Customize 5 colors', icon: '🎨', unlocked: false, condition: () => stats.colorChanges >= 5 },
    { id: 'theme-creator', name: 'Theme Creator', description: 'Create a custom theme', icon: '✨', unlocked: false, condition: () => stats.colorChanges >= 1 },
    { id: 'explorer', name: 'Explorer', description: 'Use the comparison slider', icon: '🔍', unlocked: false, condition: () => localStorage.getItem('used-slider') === 'true' },
    { id: 'share-master', name: 'Share Master', description: 'Share your custom theme', icon: '🔗', unlocked: false, condition: () => localStorage.getItem('shared-theme') === 'true' },
    { id: 'time-traveler', name: 'Time Traveler', description: 'Enable auto-switching', icon: '⏰', unlocked: false, condition: () => localStorage.getItem('auto-schedule') === 'true' },
    { id: 'historian', name: 'Historian', description: 'Use theme history', icon: '📜', unlocked: false, condition: () => localStorage.getItem('used-history') === 'true' }
];

// Theme history
let themeHistory = [];

// Get modal elements
const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const modalClose = document.getElementById('modal-close');

// Get all toggle elements
const btnToggle = document.getElementById('btn-toggle');
const switchToggle = document.getElementById('switch-toggle');
const checkboxToggle = document.getElementById('checkbox-toggle');
const iconToggle = document.getElementById('icon-toggle');
const dropdownToggle = document.getElementById('dropdown-toggle');
const radioLight = document.getElementById('radio-light');
const radioDark = document.getElementById('radio-dark');

// Get color inputs
const lightBgInput = document.getElementById('light-bg');
const lightTextInput = document.getElementById('light-text');
const lightAccentInput = document.getElementById('light-accent');
const darkBgInput = document.getElementById('dark-bg');
const darkTextInput = document.getElementById('dark-text');
const darkAccentInput = document.getElementById('dark-accent');

// Get info display elements
const currentModeDisplay = document.getElementById('current-mode');
const currentBgDisplay = document.getElementById('current-bg');
const currentTextDisplay = document.getElementById('current-text');
const currentAccentDisplay = document.getElementById('current-accent');

// Initialize theme from localStorage or default to light
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const savedColors = localStorage.getItem('themeColors');
    const savedStats = localStorage.getItem('stats');
    const savedHistory = localStorage.getItem('themeHistory');
    const savedAchievements = localStorage.getItem('achievements');

    // Load stats
    if (savedStats) {
        stats = JSON.parse(savedStats);
        updateStatsDisplay();
    }

    // Load theme history
    if (savedHistory) {
        themeHistory = JSON.parse(savedHistory);
        renderThemeHistory();
    }

    // Load achievements
    if (savedAchievements) {
        const saved = JSON.parse(savedAchievements);
        achievements.forEach((ach, index) => {
            if (saved[index]) {
                ach.unlocked = saved[index].unlocked;
            }
        });
    }

    // Check for URL parameters (shared theme)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('theme')) {
        try {
            const themeData = JSON.parse(atob(urlParams.get('theme')));
            applyCustomColors(themeData);
            updateColorInputs(themeData);
            if (themeData.mode === 'dark') {
                setDarkMode(true);
            }
        } catch (e) {
            console.error('Invalid theme URL');
        }
    } else if (savedColors) {
        const colors = JSON.parse(savedColors);
        applyCustomColors(colors);
        updateColorInputs(colors);
    }

    if (savedTheme === 'dark') {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    updateInfoPanel();
    updateLiveCode();
    renderAchievements();
    checkAchievements();
    initializeComparison();
    initializeAutoSchedule();
}

// Set dark mode state
function setDarkMode(enabled) {
    isDarkMode = enabled;

    if (enabled) {
        document.body.classList.add('dark-mode');
        btnToggle.innerHTML = '<span class="toggle-icon">☀️</span><span class="toggle-text">Light Mode</span>';
        switchToggle.checked = true;
        checkboxToggle.checked = true;
        iconToggle.classList.add('active');
        dropdownToggle.value = 'dark';
        radioDark.checked = true;
        currentModeDisplay.textContent = 'Dark';
    } else {
        document.body.classList.remove('dark-mode');
        btnToggle.innerHTML = '<span class="toggle-icon">🌙</span><span class="toggle-text">Dark Mode</span>';
        switchToggle.checked = false;
        checkboxToggle.checked = false;
        iconToggle.classList.remove('active');
        dropdownToggle.value = 'light';
        radioLight.checked = true;
        currentModeDisplay.textContent = 'Light';
    }

    localStorage.setItem('theme', enabled ? 'dark' : 'light');
    updateInfoPanel();
}

// Toggle theme
function toggleTheme(event) {
    // Create ripple effect
    if (event && event.clientX && event.clientY) {
        createRipple(event.clientX, event.clientY);
    }

    // Create wave effect
    createWave();

    setDarkMode(!isDarkMode);

    // Update stats
    stats.toggleCount++;
    saveStats();
    updateStatsDisplay();
    checkAchievements();

    // Save to history
    saveToHistory();
}

// Create ripple effect
function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Create wave effect
function createWave() {
    const wave = document.createElement('div');
    wave.className = 'color-wave';
    document.body.appendChild(wave);

    setTimeout(() => {
        wave.remove();
    }, 1000);
}

// Apply custom colors to CSS variables
function applyCustomColors(colors) {
    const root = document.documentElement;

    // Apply colors directly without any adjustment
    root.style.setProperty('--light-bg', colors.lightBg);
    root.style.setProperty('--light-text', colors.lightText);
    root.style.setProperty('--light-accent', colors.lightAccent);
    root.style.setProperty('--dark-bg', colors.darkBg);
    root.style.setProperty('--dark-text', colors.darkText);
    root.style.setProperty('--dark-accent', colors.darkAccent);

    // Update card backgrounds and borders based on main colors
    const lightCardBg = adjustColor(colors.lightBg, -10);
    const darkCardBg = adjustColor(colors.darkBg, 20);
    const lightBorder = adjustColor(colors.lightBg, -20);
    const darkBorder = adjustColor(colors.darkBg, 30);

    root.style.setProperty('--light-card-bg', lightCardBg);
    root.style.setProperty('--dark-card-bg', darkCardBg);
    root.style.setProperty('--light-border', lightBorder);
    root.style.setProperty('--dark-border', darkBorder);
}

// Update color inputs to match current colors
function updateColorInputs(colors) {
    lightBgInput.value = colors.lightBg;
    lightTextInput.value = colors.lightText;
    lightAccentInput.value = colors.lightAccent;
    darkBgInput.value = colors.darkBg;
    darkTextInput.value = colors.darkText;
    darkAccentInput.value = colors.darkAccent;
}

// Get current colors from inputs
function getCurrentColors() {
    return {
        lightBg: lightBgInput.value,
        lightText: lightTextInput.value,
        lightAccent: lightAccentInput.value,
        darkBg: darkBgInput.value,
        darkText: darkTextInput.value,
        darkAccent: darkAccentInput.value
    };
}

// Update info panel with current colors
function updateInfoPanel() {
    const computedStyle = getComputedStyle(document.documentElement);
    const bg = computedStyle.getPropertyValue('--bg').trim();
    const text = computedStyle.getPropertyValue('--text').trim();
    const accent = computedStyle.getPropertyValue('--accent').trim();

    currentBgDisplay.textContent = bg;
    currentTextDisplay.textContent = text;
    currentAccentDisplay.textContent = accent;
}

// Calculate relative luminance for contrast checking
function getLuminance(color) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const [rs, gs, bs] = [r, g, b].map(c => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Get contrast ratio between two colors
function getContrastRatio(color1, color2) {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
}

// Ensure text color has good contrast with background
function ensureContrast(bgColor, textColor, minRatio = 3.0) {
    let currentTextColor = textColor;
    let contrast = getContrastRatio(bgColor, currentTextColor);

    // Only adjust if contrast is VERY poor (below 3.0)
    // This allows user choices while preventing invisible text
    if (contrast < minRatio) {
        const bgLuminance = getLuminance(bgColor);
        // If background is dark, use white text; if light, use black text
        currentTextColor = bgLuminance > 0.5 ? '#1a1a1a' : '#f5f5f5';
    }

    return currentTextColor;
}

// Adjust color brightness (helper function)
function adjustColor(color, amount) {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Adjust brightness
    const newR = Math.min(255, Math.max(0, r + amount));
    const newG = Math.min(255, Math.max(0, g + amount));
    const newB = Math.min(255, Math.max(0, b + amount));

    // Convert back to hex
    return '#' +
        newR.toString(16).padStart(2, '0') +
        newG.toString(16).padStart(2, '0') +
        newB.toString(16).padStart(2, '0');
}

// Save and apply color changes
function handleColorChange() {
    const colors = getCurrentColors();
    applyCustomColors(colors);
    localStorage.setItem('themeColors', JSON.stringify(colors));

    // Update stats
    stats.colorChanges++;
    saveStats();
    updateStatsDisplay();
    checkAchievements();

    // Update info panel after a brief delay to allow CSS to update
    setTimeout(updateInfoPanel, 100);
    updateLiveCode();
    saveToHistory();
}

// Event Listeners for Toggle Methods
btnToggle.addEventListener('click', toggleTheme);
switchToggle.addEventListener('change', toggleTheme);
checkboxToggle.addEventListener('change', toggleTheme);
iconToggle.addEventListener('click', toggleTheme);

dropdownToggle.addEventListener('change', (e) => {
    if (e.target.value === 'dark') {
        setDarkMode(true);
    } else if (e.target.value === 'light') {
        setDarkMode(false);
    } else if (e.target.value === 'auto') {
        // Auto mode: detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
    }
});

radioLight.addEventListener('change', () => {
    if (radioLight.checked) {
        setDarkMode(false);
    }
});

radioDark.addEventListener('change', () => {
    if (radioDark.checked) {
        setDarkMode(true);
    }
});

// Event Listeners for Color Inputs
lightBgInput.addEventListener('input', handleColorChange);
lightTextInput.addEventListener('input', handleColorChange);
lightAccentInput.addEventListener('input', handleColorChange);
darkBgInput.addEventListener('input', handleColorChange);
darkTextInput.addEventListener('input', handleColorChange);
darkAccentInput.addEventListener('input', handleColorChange);

// Listen for system theme changes when in auto mode
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (dropdownToggle.value === 'auto') {
        setDarkMode(e.matches);
    }
});

// Keyboard shortcut: Ctrl/Cmd + Shift + D to toggle dark mode
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleTheme();
    }
});

// Initialize on page load
initializeTheme();

// Add smooth transition class after initial load to prevent flash
setTimeout(() => {
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}, 100);

// Modal functionality
aboutBtn.addEventListener('click', () => {
    aboutModal.classList.add('active');
});

modalClose.addEventListener('click', () => {
    aboutModal.classList.remove('active');
});

// Close modal when clicking outside
aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        aboutModal.classList.remove('active');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutModal.classList.contains('active')) {
        aboutModal.classList.remove('active');
    }
});

// ============ NEW INTERACTIVE FEATURES ============

// Stats Management
function saveStats() {
    localStorage.setItem('stats', JSON.stringify(stats));
}

function updateStatsDisplay() {
    document.getElementById('toggle-count').textContent = stats.toggleCount;
    document.getElementById('color-changes').textContent = stats.colorChanges;
    document.getElementById('achievements-unlocked').textContent = stats.achievementsUnlocked;
}

// Live Code Editor
function updateLiveCode() {
    const computedStyle = getComputedStyle(document.documentElement);
    const bg = computedStyle.getPropertyValue('--bg').trim();
    const text = computedStyle.getPropertyValue('--text').trim();
    const accent = computedStyle.getPropertyValue('--accent').trim();

    document.getElementById('code-bg').textContent = bg;
    document.getElementById('code-text').textContent = text;
    document.getElementById('code-accent').textContent = accent;

    // Add highlight effect
    const codeValues = document.querySelectorAll('#code-display .code-value');
    codeValues.forEach(val => {
        val.classList.add('code-highlight');
        setTimeout(() => val.classList.remove('code-highlight'), 1500);
    });
}

// Achievements System
function renderAchievements() {
    const grid = document.getElementById('achievements-grid');
    grid.innerHTML = '';

    achievements.forEach(achievement => {
        const card = document.createElement('div');
        card.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <span class="achievement-icon">${achievement.icon}</span>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
        `;
        grid.appendChild(card);
    });
}

function checkAchievements() {
    let newUnlocks = false;

    achievements.forEach(achievement => {
        if (!achievement.unlocked && achievement.condition()) {
            achievement.unlocked = true;
            newUnlocks = true;
            showAchievementBanner(achievement);
            stats.achievementsUnlocked++;
        }
    });

    if (newUnlocks) {
        renderAchievements();
        localStorage.setItem('achievements', JSON.stringify(achievements));
        saveStats();
        updateStatsDisplay();
    }
}

function showAchievementBanner(achievement) {
    const banner = document.createElement('div');
    banner.className = 'achievement-unlocked-banner';
    banner.innerHTML = `
        <span class="achievement-icon">${achievement.icon}</span>
        <div class="achievement-unlocked-content">
            <h4>Achievement Unlocked!</h4>
            <p>${achievement.name}</p>
        </div>
    `;
    document.body.appendChild(banner);

    setTimeout(() => {
        banner.remove();
    }, 4000);
}

// Comparison Slider
function initializeComparison() {
    const container = document.getElementById('comparison-container');
    const slider = document.getElementById('comparison-slider');
    const darkSide = document.getElementById('dark-side');

    let isDragging = false;

    slider.addEventListener('mousedown', () => {
        isDragging = true;
        localStorage.setItem('used-slider', 'true');
        checkAchievements();
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const rect = container.getBoundingClientRect();
        let x = e.clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));

        const percentage = (x / rect.width) * 100;

        slider.style.left = percentage + '%';
        darkSide.style.clipPath = `inset(0 0 0 ${percentage}%)`;
    });

    // Touch support for mobile
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        localStorage.setItem('used-slider', 'true');
        checkAchievements();
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const rect = container.getBoundingClientRect();
        let x = e.touches[0].clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));

        const percentage = (x / rect.width) * 100;

        slider.style.left = percentage + '%';
        darkSide.style.clipPath = `inset(0 0 0 ${percentage}%)`;
    });
}

// Share Theme Feature
document.getElementById('generate-link-btn').addEventListener('click', () => {
    const colors = getCurrentColors();
    const themeData = {
        ...colors,
        mode: isDarkMode ? 'dark' : 'light'
    };

    const encoded = btoa(JSON.stringify(themeData));
    const url = window.location.origin + window.location.pathname + '?theme=' + encoded;

    document.getElementById('share-url').value = url;
    localStorage.setItem('shared-theme', 'true');
    checkAchievements();
});

document.getElementById('copy-link-btn').addEventListener('click', () => {
    const urlInput = document.getElementById('share-url');
    urlInput.select();
    document.execCommand('copy');

    const successMsg = document.getElementById('copy-success');
    successMsg.style.display = 'inline';

    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 2000);
});

// Theme History
function saveToHistory() {
    const colors = getCurrentColors();
    const historyItem = {
        ...colors,
        mode: isDarkMode ? 'dark' : 'light',
        timestamp: new Date().toLocaleString()
    };

    themeHistory.unshift(historyItem);

    // Keep only last 12 items
    if (themeHistory.length > 12) {
        themeHistory = themeHistory.slice(0, 12);
    }

    localStorage.setItem('themeHistory', JSON.stringify(themeHistory));
    renderThemeHistory();
}

function renderThemeHistory() {
    const grid = document.getElementById('history-grid');
    grid.innerHTML = '';

    themeHistory.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-preview">
                <div class="history-half" style="background: ${item.mode === 'dark' ? item.darkBg : item.lightBg}"></div>
                <div class="history-half" style="background: ${item.mode === 'dark' ? item.darkText : item.lightText}"></div>
            </div>
            <div class="history-timestamp">${item.timestamp}</div>
        `;

        historyItem.addEventListener('click', () => {
            applyCustomColors(item);
            updateColorInputs(item);
            setDarkMode(item.mode === 'dark');
            updateInfoPanel();
            updateLiveCode();
            localStorage.setItem('used-history', 'true');
            checkAchievements();
        });

        grid.appendChild(historyItem);
    });
}

// Auto Schedule Feature
let scheduleInterval = null;

function initializeAutoSchedule() {
    const autoToggle = document.getElementById('auto-schedule-toggle');
    const scheduleStatus = document.getElementById('schedule-status');
    const lightStartInput = document.getElementById('light-start-time');
    const darkStartInput = document.getElementById('dark-start-time');

    // Load saved schedule settings
    const savedSchedule = localStorage.getItem('schedule-settings');
    if (savedSchedule) {
        const settings = JSON.parse(savedSchedule);
        lightStartInput.value = settings.lightStart;
        darkStartInput.value = settings.darkStart;

        if (settings.enabled) {
            autoToggle.checked = true;
            scheduleStatus.style.display = 'inline-block';
            startSchedule(settings.lightStart, settings.darkStart);
        }
    }

    autoToggle.addEventListener('change', () => {
        if (autoToggle.checked) {
            const lightStart = lightStartInput.value;
            const darkStart = darkStartInput.value;

            scheduleStatus.style.display = 'inline-block';
            startSchedule(lightStart, darkStart);

            localStorage.setItem('schedule-settings', JSON.stringify({
                enabled: true,
                lightStart,
                darkStart
            }));

            localStorage.setItem('auto-schedule', 'true');
            checkAchievements();
        } else {
            scheduleStatus.style.display = 'none';
            stopSchedule();

            localStorage.setItem('schedule-settings', JSON.stringify({
                enabled: false,
                lightStart: lightStartInput.value,
                darkStart: darkStartInput.value
            }));
        }
    });

    // Update schedule when time inputs change
    [lightStartInput, darkStartInput].forEach(input => {
        input.addEventListener('change', () => {
            if (autoToggle.checked) {
                stopSchedule();
                startSchedule(lightStartInput.value, darkStartInput.value);

                localStorage.setItem('schedule-settings', JSON.stringify({
                    enabled: true,
                    lightStart: lightStartInput.value,
                    darkStart: darkStartInput.value
                }));
            }
        });
    });
}

function startSchedule(lightStart, darkStart) {
    checkSchedule(lightStart, darkStart);

    // Check every minute
    scheduleInterval = setInterval(() => {
        checkSchedule(lightStart, darkStart);
    }, 60000);
}

function stopSchedule() {
    if (scheduleInterval) {
        clearInterval(scheduleInterval);
        scheduleInterval = null;
    }
}

function checkSchedule(lightStart, darkStart) {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    const [lightHour, lightMin] = lightStart.split(':').map(Number);
    const [darkHour, darkMin] = darkStart.split(':').map(Number);

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const lightMinutes = lightHour * 60 + lightMin;
    const darkMinutes = darkHour * 60 + darkMin;

    let shouldBeDark;

    if (lightMinutes < darkMinutes) {
        // Normal case: light mode during day, dark at night
        shouldBeDark = currentMinutes >= darkMinutes || currentMinutes < lightMinutes;
    } else {
        // Reversed case
        shouldBeDark = currentMinutes >= darkMinutes && currentMinutes < lightMinutes;
    }

    if (shouldBeDark !== isDarkMode) {
        setDarkMode(shouldBeDark);
    }
}

// Double-click background to toggle
let lastClickTime = 0;
document.body.addEventListener('click', (e) => {
    // Only toggle if clicking on body background, not on interactive elements
    if (e.target === document.body || e.target.classList.contains('container') ||
        e.target.classList.contains('floating-shapes') || e.target.classList.contains('shape')) {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastClickTime;

        if (timeDiff < 300 && timeDiff > 0) {
            toggleTheme(e);
        }

        lastClickTime = currentTime;
    }
});

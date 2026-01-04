// Theme state
let isDarkMode = false;

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

    if (savedColors) {
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
function toggleTheme() {
    setDarkMode(!isDarkMode);
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

    // Update info panel after a brief delay to allow CSS to update
    setTimeout(updateInfoPanel, 100);
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

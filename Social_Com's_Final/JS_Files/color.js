// Modern Theme Customization JavaScript with ES6

// Background Color Picker
const bgColorPicker = document.getElementById('bgColor');
const bgColorValue = document.getElementById('bgColorValue');
const textColorPicker = document.getElementById('textColor');
const textColorValue = document.getElementById('textColorValue');
const accentColorPicker = document.getElementById('accentColor');
const accentColorValue = document.getElementById('accentColorValue');

// Update background color
if (bgColorPicker) {
    bgColorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        document.body.style.background = `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -20)} 100%)`;
        if (bgColorValue) bgColorValue.textContent = color;
        saveTheme();
    });
}

// Update text color
if (textColorPicker) {
    textColorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        document.documentElement.style.setProperty('--text-dark', color);
        if (textColorValue) textColorValue.textContent = color;
        saveTheme();
    });
}

// Update accent color
if (accentColorPicker) {
    accentColorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        document.documentElement.style.setProperty('--primary-color', color);
        if (accentColorValue) accentColorValue.textContent = color;
        saveTheme();
    });
}

// Preset theme buttons
const presetButtons = document.querySelectorAll('.preset-btn');
presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const bgColor = btn.getAttribute('data-bg');
        const textColor = btn.getAttribute('data-text');
        const accentColor = btn.getAttribute('data-accent');

        applyTheme(bgColor, textColor, accentColor);
    });
});

// Reset theme button
const resetBtn = document.getElementById('resetTheme');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        applyTheme('#667eea', '#1e293b', '#6366f1');
    });
}

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            applyTheme('#1e293b', '#f8fafc', '#6366f1');
        } else {
            applyTheme('#667eea', '#1e293b', '#6366f1');
        }
    });
}

// File upload functionality
const fileUploadArea = document.getElementById('fileUploadArea');
const fileInput = document.getElementById('eventFileInput');
const fileList = document.getElementById('fileList');

if (fileUploadArea && fileInput) {
    fileUploadArea.addEventListener('click', () => fileInput.click());

    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#6366f1';
    });

    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.style.borderColor = '';
    });

    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = '';
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

// Helper Functions
function applyTheme(bgColor, textColor, accentColor) {
    document.body.style.background = `linear-gradient(135deg, ${bgColor} 0%, ${adjustColor(bgColor, -20)} 100%)`;
    document.documentElement.style.setProperty('--text-dark', textColor);
    document.documentElement.style.setProperty('--primary-color', accentColor);

    if (bgColorPicker) bgColorPicker.value = bgColor;
    if (bgColorValue) bgColorValue.textContent = bgColor;
    if (textColorPicker) textColorPicker.value = textColor;
    if (textColorValue) textColorValue.textContent = textColor;
    if (accentColorPicker) accentColorPicker.value = accentColor;
    if (accentColorValue) accentColorValue.textContent = accentColor;

    saveTheme();
}

function adjustColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
}

function saveTheme() {
    const theme = {
        bgColor: bgColorPicker?.value,
        textColor: textColorPicker?.value,
        accentColor: accentColorPicker?.value
    };
    localStorage.setItem('socialComsTheme', JSON.stringify(theme));
}

function loadTheme() {
    const savedTheme = localStorage.getItem('socialComsTheme');
    if (savedTheme) {
        const theme = JSON.parse(savedTheme);
        applyTheme(theme.bgColor, theme.textColor, theme.accentColor);
    }
}

function handleFiles(files) {
    if (!fileList) return;

    Array.from(files).forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div style="display: flex; align-items: center;">
                <i class="fas fa-file"></i>
                <span>${file.name}</span>
            </div>
            <i class="fas fa-times file-remove"></i>
        `;

        fileItem.querySelector('.file-remove').addEventListener('click', () => {
            fileItem.remove();
        });

        fileList.appendChild(fileItem);
    });
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', loadTheme);

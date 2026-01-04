// Modern Text Color Customization with ES6

const defaultTextColor = "#1e293b";

// Initialize text color picker
document.addEventListener('DOMContentLoaded', () => {
    const textColorPicker = document.getElementById('textColor');

    if (textColorPicker) {
        // Load saved color or use default
        const savedColor = localStorage.getItem('textColor') || defaultTextColor;
        textColorPicker.value = savedColor;

        // Apply saved color
        updateAllText(savedColor);

        // Listen for color changes
        textColorPicker.addEventListener('input', (event) => {
            updateAllText(event.target.value);
        });

        textColorPicker.addEventListener('change', (event) => {
            const color = event.target.value;
            updateAllText(color);
            localStorage.setItem('textColor', color);
        });
    }
});

/**
 * Updates all paragraph text colors
 * @param {string} color - Hex color value
 */
function updateAllText(color) {
    document.querySelectorAll('p').forEach(p => {
        p.style.color = color;
    });

    // Update CSS variable for consistent theming
    document.documentElement.style.setProperty('--text-dark', color);
}

/**
 * Reset text color to default
 */
function resetTextColor() {
    const textColorPicker = document.getElementById('textColor');
    if (textColorPicker) {
        textColorPicker.value = defaultTextColor;
        updateAllText(defaultTextColor);
        localStorage.setItem('textColor', defaultTextColor);
    }
}

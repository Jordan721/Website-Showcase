# 🦸 Habit Hero

A fun, feature-rich habit tracking application with data visualization and streak tracking. Built with vanilla JavaScript, HTML, and CSS. 🚀

## ✨ Features

### 🎯 Core Functionality
- **Create & Manage Habits** - Add, edit, archive, and delete habits
- **Daily Tracking** - Mark habits as complete with customizable daily goals
- **🔥 Streak Tracking** - Automatic calculation of consecutive completion days
- **📈 Progress Visualization** - Real-time progress bars for each habit

### 📊 Data & Analytics
- **Interactive Statistics Dashboard** - View completion rates, total streaks, and more
- **Chart.js Integration** - Beautiful weekly progress and habit distribution charts
- **📅 30-Day Calendar View** - Visual representation of completion history
- **💯 Success Rate Calculation** - Track your consistency over time

### 🎨 User Experience
- **🌙 Dark Mode** - Toggle between light and dark themes (persists across sessions)
- **💾 LocalStorage** - All data saved locally in your browser
- **📱 Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **✨ Glass Morphism UI** - Modern, beautiful design with smooth animations
- **🎨 Custom Icons & Colors** - 12 icons and 10 colors to choose from

### ⚡ Advanced Features
- **🔍 Filter System** - View all, active, or archived habits
- **📦 Habit Archiving** - Archive completed or paused habits without deleting
- **📊 Detailed Analytics** - Per-habit statistics and historical data
- **💡 Smart Empty States** - Helpful guidance when no habits exist

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Modern vanilla JS
- **Chart.js** - Data visualization
- **Font Awesome** - Icons
- **LocalStorage API** - Data persistence

## 🚀 How to Use

1. **Open** `index.html` in any modern web browser
2. **Click "Add New Habit"** ➕ to create your first habit
3. **Choose** an icon 🎯, color 🎨, name, and daily goal
4. **Track Progress** ✅ by clicking "Complete" each day
5. **View Statistics** 📊 to see your overall progress
6. **Click on habits** 👆 to see detailed analytics and 30-day calendar

## 📁 Project Structure

```
Habit-Hero/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Application logic and state management
└── README.md           # Project documentation
```

## 💡 Key Features Explained

### 🔥 Streak Calculation
Streaks are automatically calculated based on consecutive days of completion. The algorithm checks:
- ✅ If today's goal is met
- ✅ If yesterday's goal was met (and continues backwards)
- 🏆 Shows current active streak on each habit card

### 💾 Data Persistence
All habit data is stored in browser LocalStorage:
- 📌 Habits persist across browser sessions
- 🌙 Theme preference is saved
- 📜 Complete history of all completions

### 📱 Responsive Design
Fully responsive with breakpoints for:
- 📱 Mobile (< 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (> 1024px)

## 🌐 Browser Support

Works on all modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🔮 Future Enhancement Ideas

- 📤 Export data to CSV/JSON
- 📥 Import/Export habits
- 🏷️ Habit categories and tags
- 📆 Weekly/Monthly goals
- 🔔 Reminders and notifications
- 🌐 Social sharing features
- ☁️ Backend integration with user accounts

## 👨‍💻 Author

**Jordan Alexis**
- 🌐 Portfolio: [jordan721.github.io/Jordan_Alexis](https://jordan721.github.io/Jordan_Alexis/)
- 💻 GitHub: [Jordan721](https://github.com/Jordan721)

## 📄 License

This project is open source and available for personal and educational use. ✨

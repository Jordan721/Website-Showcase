# 🎮 Console Chronicles - Interactive SQL Learning Platform

An educational web application that teaches SQL (DQL - Data Query Language) through the fascinating history of gaming consoles and their companies. Learn database querying while exploring 50+ years of gaming history!

## Features

### 📚 Interactive SQL Tutorial System
- **Beginner Lessons**: SELECT, WHERE, ORDER BY, LIMIT
- **Intermediate Lessons**: Aggregate functions, GROUP BY, JOINs, Multiple conditions
- **Advanced Lessons**: Complex JOINs, HAVING, Subqueries, Analytics
- **12 Progressive Lessons** with examples and challenges

### 💻 Live SQL Query Editor
- Real-time SQL query execution using sql.js (SQLite in the browser)
- Instant result visualization in formatted tables
- Syntax error detection with helpful debugging info
- Example queries with one-click loading
- Keyboard shortcut support (Ctrl+Enter to run)
- Query history tracking

### 📊 Interactive Data Visualizations
- **Timeline Chart**: Console releases and sales over time (scatter plot)
- **Sales Comparison**: Top-selling consoles of all time (bar chart)
- **Company Analysis**: Market share by manufacturer (pie chart)
- **Generation Trends**: Performance across console generations (line chart)
- **Your Favorites**: Personalized chart of your saved consoles and games

### 🏆 Achievement System
Gamified learning with 15 unlockable achievements:
- Track your SQL learning progress
- Unlock badges for milestones (first query, JOIN expert, etc.)
- Animated notifications when achievements are earned
- View all achievements in dedicated modal
- Achievements stored locally in browser

### 💾 Share Your Favorites
- Save your favorite consoles and games
- Add personal gaming memories
- Visualize your preferences in charts
- Delete and manage saved favorites
- Data visualization of your most-picked items

### 🎨 Customizable Visual Styles
- **Retro Mode**: Neon cyberpunk aesthetic with glowing effects, CRT scanlines, and arcade-style buttons
- **Classic Mode**: Clean, professional interface with subtle animations
- Toggle between styles with a single click
- Preference saved in browser localStorage

### 🗂️ Comprehensive Database
Three interconnected tables with real historical data:

**consoles** - 27 gaming consoles from 1972-2020
- Name, company, release year, generation, units sold, launch price

**companies** - 8 major gaming companies
- Nintendo, Sony, Microsoft, Sega, Atari, NEC, SNK, 3DO

**games** - 30 best-selling games across all platforms
- Title, console, release year, copies sold

## Learning Objectives

Users will learn:
1. **SQL Fundamentals**: SELECT, WHERE, ORDER BY, LIMIT
2. **Data Aggregation**: COUNT, SUM, AVG, MAX, MIN
3. **Grouping Data**: GROUP BY, HAVING
4. **Table Relations**: JOINs, Foreign Keys
5. **Advanced Queries**: Subqueries, Complex analytics

While simultaneously learning:
- Gaming console history from 1972 to present
- Evolution of gaming companies
- Best-selling consoles and games
- Market trends across console generations

## Technology Stack

- **SQL.js**: SQLite compiled to WebAssembly for in-browser SQL execution
- **Chart.js**: Interactive data visualizations (5 different chart types)
- **Vanilla JavaScript**: No framework dependencies, pure ES6+
- **CSS3**: Modern dark theme with dual visual modes (retro/classic) and advanced animations
- **LocalStorage API**: Persistent data for favorites, achievements, and style preferences
- **Font Awesome**: Icon library for UI elements

## Example Queries

### Beginner
```sql
SELECT * FROM consoles WHERE year > 2000;
```

### Intermediate
```sql
SELECT co.name, SUM(c.units_sold) as total_sales
FROM consoles c
JOIN companies co ON c.company_id = co.id
GROUP BY co.name
ORDER BY total_sales DESC;
```

### Advanced
```sql
SELECT g.title, c.name as console, co.name as company, g.copies_sold
FROM games g
JOIN consoles c ON g.console_id = c.id
JOIN companies co ON c.company_id = co.id
WHERE g.copies_sold > (SELECT AVG(copies_sold) FROM games)
ORDER BY g.copies_sold DESC;
```

## How to Use

1. Open `index.html` in a modern web browser
2. Choose your visual style using the Retro Style toggle in the header
3. Start with the beginner tutorials to learn SQL basics
4. Try the example queries in the editor (or load them with one click)
5. Experiment with your own queries and unlock achievements
6. Explore all 5 data visualizations to see gaming trends
7. Save your favorite consoles and games
8. Track your progress through the achievements system
9. Complete tutorial challenges to master SQL

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Requires JavaScript enabled and WebAssembly support.

## Key Features Summary

✅ **Desktop Optimized** - Best experience on desktop browsers (1024px+)
✅ **No Backend Required** - Runs entirely in the browser
✅ **Offline Capable** - Works without internet after initial load
✅ **Dual Visual Modes** - Choose between retro cyberpunk or clean classic style
✅ **Progress Tracking** - LocalStorage saves your achievements, favorites, and preferences
✅ **Gamified Learning** - 15 achievements make SQL fun
✅ **Real Data** - Actual console sales figures and gaming history

## Educational Value

This project is perfect for:
- Students learning SQL for the first time
- Gaming enthusiasts interested in console history
- Educators teaching database concepts
- Anyone wanting to practice SQL in an engaging way
- Bootcamp students learning data analysis
- Self-learners exploring database fundamentals

## Project Structure

```
Games-O-Years/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── database.js         # Console/company/game data
├── tutorials.js        # 12 SQL tutorial lessons
├── achievements.js     # Achievement system logic
├── app.js              # Main application logic
└── README.md           # Project documentation
```

## Data Sources

Console sales data compiled from publicly available industry reports, manufacturer announcements, and gaming industry databases. Data reflects lifetime sales through 2024.

---

**Built with ❤️ for gamers and data enthusiasts**
*Making SQL education fun, one query at a time!*

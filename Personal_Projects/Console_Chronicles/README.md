# Console Chronicles

An interactive web platform for learning SQL through the history of gaming consoles.

## About

Console Chronicles combines SQL education with gaming history to create an engaging learning experience. Instead of learning database queries with boring sample data, you explore real information about your favorite gaming systems, companies, and best-selling games.

## Features

### SQL Tutorial
- **Beginner** - SELECT, WHERE, ORDER BY, LIMIT
- **Intermediate** - Aggregate functions, GROUP BY, JOINs
- **Advanced** - Subqueries, complex analytics, HAVING

### Live Query Editor
- Real-time SQL execution in the browser
- Formatted result tables
- Error handling with helpful messages
- Example queries to get started

### Data Visualizations
- Timeline of console releases
- Sales comparisons
- Company market share
- Generation trends
- Your favorites chart

### Achievement System
- 15 unlockable badges
- Progress tracking
- Animated notifications

### Share Your Favorites
- Save favorite consoles and games
- Add personal gaming memories
- View your picks in charts

## Database

Three tables with real historical data:

- **consoles** - 27 gaming systems (1972-2020)
- **companies** - 8 major manufacturers
- **games** - 30 best-selling titles

## Technologies

- HTML5, CSS3, JavaScript
- SQL.js (SQLite in browser)
- Chart.js for visualizations
- LocalStorage for progress

## Getting Started

Open `index.html` in a browser and start with the beginner tutorials.

## Project Structure

```
Console_Chronicles/
├── index.html      # Main structure
├── styles.css      # Styling
├── database.js     # Game data
├── tutorials.js    # SQL lessons
├── achievements.js # Badge system
├── app.js          # App logic
└── README.md
```

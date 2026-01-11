// Main Application Logic
let db = null;
let currentChart = null;

// Initialize SQL.js and create database
async function initDatabase() {
    try {
        const SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        db = new SQL.Database();

        // Create tables
        db.run(`
            CREATE TABLE companies (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                founded INTEGER,
                country TEXT
            );
        `);

        db.run(`
            CREATE TABLE consoles (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                company_id INTEGER,
                year INTEGER,
                generation INTEGER,
                units_sold REAL,
                price REAL,
                FOREIGN KEY (company_id) REFERENCES companies(id)
            );
        `);

        db.run(`
            CREATE TABLE games (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                console_id INTEGER,
                year INTEGER,
                copies_sold REAL,
                FOREIGN KEY (console_id) REFERENCES consoles(id)
            );
        `);

        // Insert data
        consoleData.companies.forEach(company => {
            db.run(`INSERT INTO companies VALUES (?, ?, ?, ?)`,
                [company.id, company.name, company.founded, company.country]);
        });

        consoleData.consoles.forEach(console => {
            db.run(`INSERT INTO consoles VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [console.id, console.name, console.company_id, console.year,
                 console.generation, console.units_sold, console.price]);
        });

        consoleData.games.forEach(game => {
            db.run(`INSERT INTO games VALUES (?, ?, ?, ?, ?)`,
                [game.id, game.title, game.console_id, game.year, game.copies_sold]);
        });

        console.log('Database initialized successfully!');
        showWelcomeQuery();
    } catch (error) {
        console.error('Error initializing database:', error);
        showError('Failed to initialize database: ' + error.message);
    }
}

// Execute SQL query
function executeQuery(sql) {
    const resultContainer = document.getElementById('queryResult');
    const resultTable = document.getElementById('resultTable');
    const resultCount = document.getElementById('resultCount');
    const errorDiv = document.getElementById('queryError');

    // Clear previous results
    resultTable.innerHTML = '';
    errorDiv.classList.remove('show');
    errorDiv.textContent = '';

    try {
        const results = db.exec(sql);

        if (results.length === 0) {
            resultTable.innerHTML = '<p style="padding: 20px; text-align: center;">Query executed successfully. No results to display.</p>';
            resultCount.textContent = '';
            resultContainer.classList.add('show');
            trackQuery(sql, true); // Track successful query
            return;
        }

        const result = results[0];
        const columns = result.columns;
        const values = result.values;

        // Create table
        let html = '<table><thead><tr>';
        columns.forEach(col => {
            html += `<th>${col}</th>`;
        });
        html += '</tr></thead><tbody>';

        values.forEach(row => {
            html += '<tr>';
            row.forEach(cell => {
                html += `<td>${cell !== null ? cell : 'NULL'}</td>`;
            });
            html += '</tr>';
        });

        html += '</tbody></table>';
        resultTable.innerHTML = html;
        resultCount.textContent = `${values.length} row${values.length !== 1 ? 's' : ''}`;
        resultContainer.classList.add('show');

        // Track successful query
        trackQuery(sql, true);

    } catch (error) {
        showError(error.message);
        trackQuery(sql, false); // Track failed query
    }
}

function showError(message) {
    const errorDiv = document.getElementById('queryError');
    errorDiv.textContent = '❌ Error: ' + message;
    errorDiv.classList.add('show');
    document.getElementById('queryResult').classList.remove('show');
}

function showWelcomeQuery() {
    document.getElementById('sqlEditor').value =
        "-- Welcome to Console Chronicles!\n-- Try this query to see all consoles:\n\nSELECT c.name, co.name as company, c.year, c.units_sold \nFROM consoles c \nJOIN companies co ON c.company_id = co.id \nORDER BY c.units_sold DESC \nLIMIT 10;";
}

// Chart.js visualizations
function createChart(type) {
    const canvas = document.getElementById('mainChart');
    const ctx = canvas.getContext('2d');
    const favoritesStats = document.getElementById('favoritesStats');

    if (currentChart) {
        currentChart.destroy();
    }

    // Hide favorites stats by default
    favoritesStats.classList.remove('show');
    canvas.style.display = 'block';

    let chartConfig;

    switch(type) {
        case 'timeline':
            chartConfig = createTimelineChart();
            break;
        case 'sales':
            chartConfig = createSalesChart();
            break;
        case 'companies':
            chartConfig = createCompanyChart();
            break;
        case 'generations':
            chartConfig = createGenerationChart();
            break;
        case 'favorites':
            createFavoritesVisualization();
            return;
        default:
            chartConfig = createTimelineChart();
    }

    currentChart = new Chart(ctx, chartConfig);

    // Track chart view for achievements
    trackChartView(type);
}

function createFavoritesVisualization() {
    const canvas = document.getElementById('mainChart');
    const favoritesStats = document.getElementById('favoritesStats');
    const favorites = JSON.parse(localStorage.getItem('consoleFavorites')) || [];

    if (favorites.length === 0) {
        canvas.style.display = 'block';
        favoritesStats.innerHTML = '';
        favoritesStats.classList.remove('show');

        const ctx = canvas.getContext('2d');
        if (currentChart) {
            currentChart.destroy();
            currentChart = null;
        }

        // Show message on canvas area
        const chartContainer = canvas.parentElement;
        chartContainer.innerHTML = `
            <div class="no-favorites-chart">
                <i class="fas fa-heart-broken"></i>
                <p>No favorites saved yet!</p>
                <p style="font-size: 0.9em; opacity: 0.7;">Share your favorite consoles and games below to see them visualized here.</p>
            </div>
        `;
        setTimeout(() => {
            chartContainer.innerHTML = '<canvas id="mainChart"></canvas>';
        }, 100);
        return;
    }

    // Count console and game occurrences
    const consoleCounts = {};
    const gameCounts = {};

    favorites.forEach(fav => {
        const console = fav.console.trim();
        const game = fav.game.trim();

        consoleCounts[console] = (consoleCounts[console] || 0) + 1;
        gameCounts[game] = (gameCounts[game] || 0) + 1;
    });

    // Get top picks
    const topConsoles = Object.entries(consoleCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const topGames = Object.entries(gameCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // Create chart
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');

    const chartData = {
        labels: topConsoles.map(c => c[0]),
        datasets: [{
            label: 'Times Picked',
            data: topConsoles.map(c => c[1]),
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(139, 92, 246, 0.8)'
            ],
            borderWidth: 2,
            borderColor: '#1e293b'
        }]
    };

    currentChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Your Most Picked Consoles',
                    color: '#f1f5f9',
                    font: { size: 16 }
                },
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(71, 85, 105, 0.3)' }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#cbd5e1',
                        stepSize: 1
                    },
                    grid: { color: 'rgba(71, 85, 105, 0.3)' }
                }
            }
        }
    });

    // Show stats
    favoritesStats.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <h4>Total Favorites</h4>
                <div class="stat-value">${favorites.length}</div>
            </div>
            <div class="stat-card">
                <h4>Unique Consoles</h4>
                <div class="stat-value">${Object.keys(consoleCounts).length}</div>
            </div>
            <div class="stat-card">
                <h4>Unique Games</h4>
                <div class="stat-value">${Object.keys(gameCounts).length}</div>
            </div>
        </div>

        ${topGames.length > 0 ? `
            <div class="top-picks">
                <h4>🎮 Your Top Games</h4>
                ${topGames.map(([game, count]) => `
                    <div class="top-pick-item">
                        <span class="name">${escapeHtml(game)}</span>
                        <span class="count">${count}x</span>
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;
    favoritesStats.classList.add('show');
}

function createTimelineChart() {
    const consoles = consoleData.consoles.filter(c => c.units_sold > 20);
    const companies = consoleData.companies;

    const data = consoles.map(c => {
        const company = companies.find(co => co.id === c.company_id);
        return {
            x: c.year,
            y: c.units_sold,
            label: c.name,
            company: company.name
        };
    });

    return {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Console Sales Over Time',
                data: data,
                backgroundColor: 'rgba(99, 102, 241, 0.6)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2,
                pointRadius: 8,
                pointHoverRadius: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = context.raw;
                            return [
                                point.label,
                                `Company: ${point.company}`,
                                `Year: ${point.x}`,
                                `Sales: ${point.y}M units`
                            ];
                        }
                    }
                },
                legend: {
                    labels: { color: '#f1f5f9' }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Release Year', color: '#f1f5f9' },
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(71, 85, 105, 0.3)' }
                },
                y: {
                    title: { display: true, text: 'Units Sold (Millions)', color: '#f1f5f9' },
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(71, 85, 105, 0.3)' }
                }
            }
        }
    };
}

function createSalesChart() {
    const topConsoles = [...consoleData.consoles]
        .sort((a, b) => b.units_sold - a.units_sold)
        .slice(0, 10);

    return {
        type: 'bar',
        data: {
            labels: topConsoles.map(c => c.name),
            datasets: [{
                label: 'Units Sold (Millions)',
                data: topConsoles.map(c => c.units_sold),
                backgroundColor: 'rgba(236, 72, 153, 0.6)',
                borderColor: 'rgba(236, 72, 153, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f1f5f9' } }
            },
            scales: {
                x: {
                    ticks: { color: '#cbd5e1', maxRotation: 45, minRotation: 45 },
                    grid: { color: 'rgba(71, 85, 105, 0.3)' }
                },
                y: {
                    title: { display: true, text: 'Units Sold (Millions)', color: '#f1f5f9' },
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(71, 85, 105, 0.3)' }
                }
            }
        }
    };
}

function createCompanyChart() {
    const companySales = {};

    consoleData.consoles.forEach(console => {
        const company = consoleData.companies.find(c => c.id === console.company_id);
        if (company) {
            if (!companySales[company.name]) {
                companySales[company.name] = 0;
            }
            companySales[company.name] += console.units_sold;
        }
    });

    const sortedCompanies = Object.entries(companySales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    return {
        type: 'pie',
        data: {
            labels: sortedCompanies.map(c => c[0]),
            datasets: [{
                data: sortedCompanies.map(c => c[1]),
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#1e293b'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#f1f5f9', padding: 15 }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed.toFixed(2)}M units`;
                        }
                    }
                }
            }
        }
    };
}

function createGenerationChart() {
    const generationData = {};

    consoleData.consoles.forEach(console => {
        if (!generationData[console.generation]) {
            generationData[console.generation] = {
                count: 0,
                totalSales: 0,
                avgSales: 0
            };
        }
        generationData[console.generation].count++;
        generationData[console.generation].totalSales += console.units_sold;
    });

    Object.keys(generationData).forEach(gen => {
        generationData[gen].avgSales =
            generationData[gen].totalSales / generationData[gen].count;
    });

    const generations = Object.keys(generationData).sort((a, b) => a - b);

    return {
        type: 'line',
        data: {
            labels: generations.map(g => `Gen ${g}`),
            datasets: [
                {
                    label: 'Total Sales',
                    data: generations.map(g => generationData[g].totalSales),
                    borderColor: 'rgba(99, 102, 241, 1)',
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Average Sales per Console',
                    data: generations.map(g => generationData[g].avgSales),
                    borderColor: 'rgba(236, 72, 153, 1)',
                    backgroundColor: 'rgba(236, 72, 153, 0.2)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f1f5f9' } }
            },
            scales: {
                x: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(71, 85, 105, 0.3)' }
                },
                y: {
                    title: { display: true, text: 'Units (Millions)', color: '#f1f5f9' },
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(71, 85, 105, 0.3)' }
                }
            }
        }
    };
}

// Favorites functionality
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('consoleFavorites')) || [];
    const favoritesList = document.getElementById('favoritesList');

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="no-favorites">No favorites saved yet. Share yours above!</p>';
        return;
    }

    favoritesList.innerHTML = favorites.map((fav, index) => `
        <div class="favorite-item">
            <div class="favorite-item-header">
                <div class="favorite-item-info">
                    <p><strong>Console:</strong> ${escapeHtml(fav.console)}</p>
                    <p><strong>Game:</strong> ${escapeHtml(fav.game)}</p>
                    ${fav.memory ? `<div class="favorite-item-memory">"${escapeHtml(fav.memory)}"</div>` : ''}
                    <div class="favorite-timestamp">${new Date(fav.timestamp).toLocaleDateString()}</div>
                </div>
                <button class="delete-favorite" onclick="deleteFavorite(${index})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function saveFavorite() {
    const console = document.getElementById('favConsole').value.trim();
    const game = document.getElementById('favGame').value.trim();
    const memory = document.getElementById('favMemory').value.trim();

    if (!console || !game) {
        alert('Please enter both your favorite console and game!');
        return;
    }

    const favorites = JSON.parse(localStorage.getItem('consoleFavorites')) || [];
    favorites.unshift({
        console: console,
        game: game,
        memory: memory,
        timestamp: new Date().toISOString()
    });

    localStorage.setItem('consoleFavorites', JSON.stringify(favorites));

    // Clear form
    document.getElementById('favConsole').value = '';
    document.getElementById('favGame').value = '';
    document.getElementById('favMemory').value = '';

    // Reload display
    loadFavorites();

    // Update favorites chart if it's currently displayed
    const activeTab = document.querySelector('.viz-tab-btn.active');
    if (activeTab && activeTab.dataset.chart === 'favorites') {
        createFavoritesVisualization();
    }

    // Show success message
    showSuccessMessage();
}

function deleteFavorite(index) {
    if (!confirm('Are you sure you want to delete this favorite?')) {
        return;
    }

    const favorites = JSON.parse(localStorage.getItem('consoleFavorites')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('consoleFavorites', JSON.stringify(favorites));
    loadFavorites();

    // Update favorites chart if it's currently displayed
    const activeTab = document.querySelector('.viz-tab-btn.active');
    if (activeTab && activeTab.dataset.chart === 'favorites') {
        createFavoritesVisualization();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showSuccessMessage() {
    const button = document.getElementById('submitFavorites');
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Saved!';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
    }, 2000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize database
    initDatabase();

    // Load saved favorites
    loadFavorites();

    // Initialize and load achievements
    initSQLStats();
    loadAchievements();
    checkAchievements(); // Check for any achievements that should already be unlocked

    // About modal functionality
    const aboutBtn = document.getElementById('aboutBtn');
    const aboutModal = document.getElementById('aboutModal');
    const closeBtn = document.querySelector('.close');

    aboutBtn.addEventListener('click', function() {
        aboutModal.classList.add('show');
    });

    closeBtn.addEventListener('click', function() {
        aboutModal.classList.remove('show');
    });

    window.addEventListener('click', function(event) {
        if (event.target === aboutModal) {
            aboutModal.classList.remove('show');
        }
    });

    // Achievements modal functionality
    const achievementsBtn = document.getElementById('achievementsBtn');
    const achievementsModal = document.getElementById('achievementsModal');
    const closeAchievements = document.getElementById('closeAchievements');

    achievementsBtn.addEventListener('click', function() {
        loadAllAchievements();
        achievementsModal.classList.add('show');
    });

    closeAchievements.addEventListener('click', function() {
        achievementsModal.classList.remove('show');
    });

    window.addEventListener('click', function(event) {
        if (event.target === achievementsModal) {
            achievementsModal.classList.remove('show');
        }
    });

    // Favorites form submission
    document.getElementById('submitFavorites').addEventListener('click', saveFavorite);

    // Run Query button
    document.getElementById('runQuery').addEventListener('click', function() {
        const sql = document.getElementById('sqlEditor').value.trim();
        if (sql) {
            executeQuery(sql);
        }
    });

    // Clear Query button
    document.getElementById('clearQuery').addEventListener('click', function() {
        document.getElementById('sqlEditor').value = '';
        document.getElementById('queryResult').classList.remove('show');
        document.getElementById('queryError').classList.remove('show');
    });

    // Example Query button
    document.getElementById('exampleQuery').addEventListener('click', function() {
        const randomQuery = exampleQueries[Math.floor(Math.random() * exampleQueries.length)];
        document.getElementById('sqlEditor').value = randomQuery;
    });

    // Tutorial tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const level = parseInt(this.dataset.level);

            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            currentLesson.level = level;
            currentLesson.index = 0;

            const lessons = getTutorial(level);
            const tutorialContent = document.querySelector('.tutorial-content');
            tutorialContent.innerHTML = `<div class="lesson active">${loadLesson(lessons[0])}</div>`;
        });
    });

    // Visualization tabs
    document.querySelectorAll('.viz-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const chartType = this.dataset.chart;

            document.querySelectorAll('.viz-tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            createChart(chartType);
        });
    });

    // Initialize first chart
    createChart('timeline');

    // Load first tutorial
    const firstLesson = getTutorial(1)[0];
    document.querySelector('.tutorial-content').innerHTML =
        `<div class="lesson active">${loadLesson(firstLesson)}</div>`;

    // Allow Enter key to run query (Ctrl+Enter)
    document.getElementById('sqlEditor').addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            document.getElementById('runQuery').click();
        }
    });
});

// Achievements System

const achievements = [
    {
        id: 'first_query',
        name: 'First Steps',
        description: 'Run your first SQL query',
        icon: '🎯',
        condition: () => {
            const stats = JSON.parse(localStorage.getItem('sqlStats')) || {};
            return stats.queriesRun >= 1;
        }
    },
    {
        id: 'query_master',
        name: 'Query Master',
        description: 'Run 10 SQL queries',
        icon: '💪',
        condition: () => {
            const stats = JSON.parse(localStorage.getItem('sqlStats')) || {};
            return stats.queriesRun >= 10;
        }
    },
    {
        id: 'sql_veteran',
        name: 'SQL Veteran',
        description: 'Run 50 SQL queries',
        icon: '🔥',
        condition: () => {
            const stats = JSON.parse(localStorage.getItem('sqlStats')) || {};
            return stats.queriesRun >= 50;
        }
    },
    {
        id: 'join_expert',
        name: 'Join Expert',
        description: 'Successfully execute a JOIN query',
        icon: '🔗',
        condition: () => {
            const stats = JSON.parse(localStorage.getItem('sqlStats')) || {};
            return stats.joinQueries >= 1;
        }
    },
    {
        id: 'aggregator',
        name: 'Aggregator',
        description: 'Use aggregate functions (COUNT, SUM, AVG)',
        icon: '📊',
        condition: () => {
            const stats = JSON.parse(localStorage.getItem('sqlStats')) || {};
            return stats.aggregateQueries >= 1;
        }
    },
    {
        id: 'chart_explorer',
        name: 'Chart Explorer',
        description: 'View all 4 data visualizations',
        icon: '📈',
        condition: () => {
            const stats = JSON.parse(localStorage.getItem('sqlStats')) || {};
            return (stats.chartsViewed || []).length >= 4;
        }
    },
    {
        id: 'favorite_fan',
        name: 'Favorite Fan',
        description: 'Save your first favorite console & game',
        icon: '❤️',
        condition: () => {
            const favorites = JSON.parse(localStorage.getItem('consoleFavorites')) || [];
            return favorites.length >= 1;
        }
    },
    {
        id: 'collector',
        name: 'Collector',
        description: 'Save 5 different favorites',
        icon: '🎮',
        condition: () => {
            const favorites = JSON.parse(localStorage.getItem('consoleFavorites')) || [];
            return favorites.length >= 5;
        }
    },
    {
        id: 'completionist',
        name: 'Completionist',
        description: 'Save 10 different favorites',
        icon: '🏅',
        condition: () => {
            const favorites = JSON.parse(localStorage.getItem('consoleFavorites')) || [];
            return favorites.length >= 10;
        }
    },
    {
        id: 'error_handler',
        name: 'Learning from Mistakes',
        description: 'Encounter and fix 5 SQL errors',
        icon: '🐛',
        condition: () => {
            const stats = JSON.parse(localStorage.getItem('sqlStats')) || {};
            return stats.errorsEncountered >= 5;
        }
    },
    {
        id: 'tutorial_student',
        name: 'Eager Student',
        description: 'Complete a tutorial lesson',
        icon: '📚',
        condition: () => {
            const stats = JSON.parse(localStorage.getItem('sqlStats')) || {};
            return stats.tutorialsCompleted >= 1;
        }
    },
    {
        id: 'data_analyst',
        name: 'Data Analyst',
        description: 'Use GROUP BY in a query',
        icon: '🔍',
        condition: () => {
            const stats = JSON.parse(localStorage.getItem('sqlStats')) || {};
            return stats.groupByQueries >= 1;
        }
    },
    {
        id: 'night_owl',
        name: 'Night Owl',
        description: 'Use the site between midnight and 5am',
        icon: '🦉',
        condition: () => {
            const hour = new Date().getHours();
            return hour >= 0 && hour < 5;
        }
    },
    {
        id: 'speedrunner',
        name: 'Speedrunner',
        description: 'Run 5 queries in under a minute',
        icon: '⚡',
        condition: () => {
            const stats = JSON.parse(localStorage.getItem('sqlStats')) || {};
            return stats.speedrunCompleted || false;
        }
    },
    {
        id: 'explorer',
        name: 'Database Explorer',
        description: 'Query all three tables (consoles, companies, games)',
        icon: '🗺️',
        condition: () => {
            const stats = JSON.parse(localStorage.getItem('sqlStats')) || {};
            const tables = stats.tablesQueried || [];
            return tables.includes('consoles') && tables.includes('companies') && tables.includes('games');
        }
    }
];

// Initialize SQL stats if not exists
function initSQLStats() {
    if (!localStorage.getItem('sqlStats')) {
        localStorage.setItem('sqlStats', JSON.stringify({
            queriesRun: 0,
            joinQueries: 0,
            aggregateQueries: 0,
            groupByQueries: 0,
            errorsEncountered: 0,
            tutorialsCompleted: 0,
            chartsViewed: [],
            tablesQueried: [],
            queryTimestamps: [],
            speedrunCompleted: false
        }));
    }
}

// Track query execution
function trackQuery(sql, success) {
    initSQLStats();
    const stats = JSON.parse(localStorage.getItem('sqlStats'));

    if (success) {
        stats.queriesRun++;
        stats.queryTimestamps.push(Date.now());

        // Check for speedrun (5 queries in under a minute)
        const recentQueries = stats.queryTimestamps.filter(ts => Date.now() - ts < 60000);
        if (recentQueries.length >= 5 && !stats.speedrunCompleted) {
            stats.speedrunCompleted = true;
        }

        const sqlUpper = sql.toUpperCase();

        // Track JOIN queries
        if (sqlUpper.includes('JOIN')) {
            stats.joinQueries++;
        }

        // Track aggregate functions
        if (sqlUpper.match(/COUNT|SUM|AVG|MAX|MIN/)) {
            stats.aggregateQueries++;
        }

        // Track GROUP BY
        if (sqlUpper.includes('GROUP BY')) {
            stats.groupByQueries++;
        }

        // Track tables queried
        ['consoles', 'companies', 'games'].forEach(table => {
            if (sqlUpper.includes(table.toUpperCase()) && !stats.tablesQueried.includes(table)) {
                stats.tablesQueried.push(table);
            }
        });
    } else {
        stats.errorsEncountered++;
    }

    localStorage.setItem('sqlStats', JSON.stringify(stats));
    checkAchievements();
}

// Track chart views
function trackChartView(chartType) {
    initSQLStats();
    const stats = JSON.parse(localStorage.getItem('sqlStats'));

    if (!stats.chartsViewed) stats.chartsViewed = [];
    if (!stats.chartsViewed.includes(chartType)) {
        stats.chartsViewed.push(chartType);
    }

    localStorage.setItem('sqlStats', JSON.stringify(stats));
    checkAchievements();
}

// Get unlocked achievements
function getUnlockedAchievements() {
    const unlocked = JSON.parse(localStorage.getItem('unlockedAchievements')) || [];
    return unlocked;
}

// Check and unlock achievements
function checkAchievements() {
    const unlocked = getUnlockedAchievements();

    achievements.forEach(achievement => {
        if (!unlocked.find(a => a.id === achievement.id) && achievement.condition()) {
            unlockAchievement(achievement);
        }
    });
}

// Unlock an achievement
function unlockAchievement(achievement) {
    const unlocked = getUnlockedAchievements();

    unlocked.push({
        id: achievement.id,
        unlockedAt: new Date().toISOString()
    });

    localStorage.setItem('unlockedAchievements', JSON.stringify(unlocked));
    showAchievementNotification(achievement);
    loadAchievements(); // Refresh display
}

// Show achievement notification
function showAchievementNotification(achievement) {
    const notification = document.getElementById('achievementNotification');
    const nameSpan = document.getElementById('achievementNotificationName');

    nameSpan.textContent = `${achievement.icon} ${achievement.name}`;

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Load and display achievements
function loadAchievements() {
    const grid = document.getElementById('achievementsGrid');
    const unlocked = getUnlockedAchievements();

    // Show only first 5 achievements in the grid (unlocked ones first)
    const sortedAchievements = [...achievements].sort((a, b) => {
        const aUnlocked = unlocked.find(u => u.id === a.id);
        const bUnlocked = unlocked.find(u => u.id === b.id);
        if (aUnlocked && !bUnlocked) return -1;
        if (!aUnlocked && bUnlocked) return 1;
        return 0;
    });

    grid.innerHTML = sortedAchievements.slice(0, 5).map(achievement => {
        const unlockedData = unlocked.find(u => u.id === achievement.id);
        const isUnlocked = !!unlockedData;

        return `
            <div class="achievement-badge ${isUnlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
                ${isUnlocked ? `<div class="achievement-date">Unlocked ${new Date(unlockedData.unlockedAt).toLocaleDateString()}</div>` : ''}
            </div>
        `;
    }).join('');
}

// Load all achievements in modal
function loadAllAchievements() {
    const list = document.getElementById('allAchievementsList');
    const unlocked = getUnlockedAchievements();

    // Sort: unlocked first
    const sortedAchievements = [...achievements].sort((a, b) => {
        const aUnlocked = unlocked.find(u => u.id === a.id);
        const bUnlocked = unlocked.find(u => u.id === b.id);
        if (aUnlocked && !bUnlocked) return -1;
        if (!aUnlocked && bUnlocked) return 1;
        return 0;
    });

    list.innerHTML = sortedAchievements.map(achievement => {
        const unlockedData = unlocked.find(u => u.id === achievement.id);
        const isUnlocked = !!unlockedData;

        return `
            <div class="achievement-badge-large ${isUnlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
                ${isUnlocked ? `<div class="achievement-date">Unlocked ${new Date(unlockedData.unlockedAt).toLocaleDateString()}</div>` : '<div class="achievement-date" style="color: var(--text-secondary);">🔒 Locked</div>'}
            </div>
        `;
    }).join('');
}

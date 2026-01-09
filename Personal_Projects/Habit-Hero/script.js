/* ========================================
   Habit Tracker Application
   Author: Jordan Alexis
======================================== */

// ========================================
// State Management
// ========================================
let habits = [];
let currentFilter = 'all';
let editingHabitId = null;
let viewingHabitId = null;
let weeklyChart = null;
let habitChart = null;

// ========================================
// Initialization
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    loadHabits();
    initializeEventListeners();
    initializeTheme();
    renderHabits();
    updateHeaderStats();
});

// ========================================
// Local Storage Functions
// ========================================
function loadHabits() {
    const stored = localStorage.getItem('habits');
    habits = stored ? JSON.parse(stored) : [];
}

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

// ========================================
// Theme Management
// ========================================
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('themeToggle').innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
}

// ========================================
// Event Listeners
// ========================================
function initializeEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Modal controls
    document.getElementById('addHabitBtn').addEventListener('click', openHabitModal);
    document.getElementById('closeModalBtn').addEventListener('click', closeHabitModal);
    document.getElementById('cancelBtn').addEventListener('click', closeHabitModal);
    document.getElementById('habitForm').addEventListener('submit', handleHabitSubmit);

    // Detail modal
    document.getElementById('closeDetailBtn').addEventListener('click', closeDetailModal);
    document.getElementById('editHabitBtn').addEventListener('click', handleEditFromDetail);
    document.getElementById('deleteHabitBtn').addEventListener('click', handleDeleteHabit);
    document.getElementById('archiveHabitBtn').addEventListener('click', handleArchiveHabit);

    // Statistics
    document.getElementById('viewStatsBtn').addEventListener('click', showStatistics);
    document.getElementById('closeStatsBtn').addEventListener('click', hideStatistics);

    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderHabits();
        });
    });

    // Icon picker
    document.querySelectorAll('.icon-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.icon-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('habitIconInput').value = btn.dataset.icon;
        });
    });

    // Color picker
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.color-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('habitColorInput').value = btn.dataset.color;
        });
    });

    // About modal
    document.getElementById('aboutBtn').addEventListener('click', openAboutModal);
    document.getElementById('closeAboutBtn').addEventListener('click', closeAboutModal);

    // Close modal when clicking outside
    document.getElementById('habitModal').addEventListener('click', (e) => {
        if (e.target.id === 'habitModal') closeHabitModal();
    });
    document.getElementById('habitDetailModal').addEventListener('click', (e) => {
        if (e.target.id === 'habitDetailModal') closeDetailModal();
    });
    document.getElementById('aboutModal').addEventListener('click', (e) => {
        if (e.target.id === 'aboutModal') closeAboutModal();
    });
}

// ========================================
// Habit CRUD Operations
// ========================================
function createHabit(habitData) {
    const habit = {
        id: Date.now().toString(),
        name: habitData.name,
        icon: habitData.icon,
        color: habitData.color,
        goal: parseInt(habitData.goal),
        createdAt: new Date().toISOString(),
        completions: [],
        archived: false
    };
    habits.push(habit);
    saveHabits();
    return habit;
}

function updateHabit(id, habitData) {
    const index = habits.findIndex(h => h.id === id);
    if (index !== -1) {
        habits[index] = {
            ...habits[index],
            name: habitData.name,
            icon: habitData.icon,
            color: habitData.color,
            goal: parseInt(habitData.goal)
        };
        saveHabits();
    }
}

function deleteHabit(id) {
    habits = habits.filter(h => h.id !== id);
    saveHabits();
}

function archiveHabit(id) {
    const habit = habits.find(h => h.id === id);
    if (habit) {
        habit.archived = !habit.archived;
        saveHabits();
    }
}

// ========================================
// Habit Completion Functions
// ========================================
function completeHabit(id) {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const today = getTodayString();
    const todayCompletion = habit.completions.find(c => c.date === today);

    if (!todayCompletion) {
        habit.completions.push({
            date: today,
            count: 1,
            timestamp: new Date().toISOString()
        });
    } else if (todayCompletion.count < habit.goal) {
        todayCompletion.count++;
    }

    saveHabits();
    renderHabits();
    updateHeaderStats();
}

function getTodayCompletion(habit) {
    const today = getTodayString();
    const completion = habit.completions.find(c => c.date === today);
    return completion ? completion.count : 0;
}

function isCompletedToday(habit) {
    return getTodayCompletion(habit) >= habit.goal;
}

// ========================================
// Streak Calculation
// ========================================
function calculateStreak(habit) {
    if (habit.completions.length === 0) return 0;

    const sortedCompletions = [...habit.completions]
        .filter(c => c.count >= habit.goal)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sortedCompletions.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedCompletions.length; i++) {
        const completionDate = new Date(sortedCompletions[i].date);
        completionDate.setHours(0, 0, 0, 0);

        const daysDiff = Math.floor((currentDate - completionDate) / (1000 * 60 * 60 * 24));

        if (daysDiff === streak) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (daysDiff === streak + 1) {
            // Allow for today not being completed yet
            if (i === 0 && daysDiff === 1) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        } else {
            break;
        }
    }

    return streak;
}

function getCompletionRate(habit) {
    const daysSinceCreation = Math.ceil(
        (new Date() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24)
    );
    const completedDays = habit.completions.filter(c => c.count >= habit.goal).length;
    return Math.round((completedDays / Math.max(daysSinceCreation, 1)) * 100);
}

// ========================================
// Render Functions
// ========================================
function renderHabits() {
    const grid = document.getElementById('habitsGrid');
    const filteredHabits = habits.filter(habit => {
        if (currentFilter === 'active') return !habit.archived;
        if (currentFilter === 'archived') return habit.archived;
        return true;
    });

    if (filteredHabits.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-seedling"></i>
                <h3>No habits ${currentFilter !== 'all' ? currentFilter : 'yet'}</h3>
                <p>${currentFilter === 'all'
                    ? 'Start building better habits by adding your first one!'
                    : `No ${currentFilter} habits to show.`}</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredHabits.map(habit => {
        const todayCount = getTodayCompletion(habit);
        const completed = isCompletedToday(habit);
        const streak = calculateStreak(habit);
        const progress = (todayCount / habit.goal) * 100;

        return `
            <div class="habit-card" style="--habit-color: ${habit.color}">
                <div class="habit-card-header">
                    <div class="habit-icon" style="background: linear-gradient(135deg, ${habit.color}, ${habit.color}88);">
                        <i class="fas ${habit.icon}"></i>
                    </div>
                    <div class="habit-info">
                        <h3>${habit.name}</h3>
                        <div class="streak">
                            <i class="fas fa-fire"></i>
                            <span>${streak} day${streak !== 1 ? 's' : ''}</span>
                        </div>
                    </div>
                </div>
                <div class="habit-progress">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span style="font-size: 0.875rem; color: var(--text-secondary);">Today's Progress</span>
                        <span style="font-weight: 600; color: var(--text-primary);">${todayCount}/${habit.goal}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%; background: linear-gradient(90deg, ${habit.color}, ${habit.color}dd);"></div>
                    </div>
                </div>
                <div class="habit-actions">
                    <button class="habit-btn ${completed ? 'completed' : 'complete'}"
                            onclick="event.stopPropagation(); ${completed ? '' : `completeHabit('${habit.id}')`}"
                            ${completed ? 'disabled' : ''}>
                        <i class="fas ${completed ? 'fa-check-double' : 'fa-check'}"></i>
                        <span>${completed ? 'Completed' : 'Complete'}</span>
                    </button>
                    <button class="habit-btn view-details" onclick="openDetailModal('${habit.id}')">
                        <i class="fas fa-chart-line"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function updateHeaderStats() {
    const totalStreaks = habits.reduce((sum, habit) => sum + calculateStreak(habit), 0);
    const completedToday = habits.filter(h => isCompletedToday(h) && !h.archived).length;

    document.getElementById('totalStreakDays').textContent = totalStreaks;
    document.getElementById('completedToday').textContent = completedToday;
}

// ========================================
// Modal Functions
// ========================================
function openHabitModal(editId = null) {
    const modal = document.getElementById('habitModal');
    const form = document.getElementById('habitForm');
    const title = document.getElementById('modalTitle');

    form.reset();
    editingHabitId = editId;

    if (editId) {
        const habit = habits.find(h => h.id === editId);
        if (habit) {
            title.textContent = 'Edit Habit';
            document.getElementById('habitName').value = habit.name;
            document.getElementById('habitIconInput').value = habit.icon;
            document.getElementById('habitColorInput').value = habit.color;
            document.getElementById('habitGoal').value = habit.goal;

            // Update icon picker
            document.querySelectorAll('.icon-option').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.icon === habit.icon);
            });

            // Update color picker
            document.querySelectorAll('.color-option').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.color === habit.color);
            });
        }
    } else {
        title.textContent = 'Add New Habit';
        document.querySelectorAll('.icon-option')[0].classList.add('active');
        document.querySelectorAll('.color-option')[0].classList.add('active');
    }

    modal.classList.add('active');
}

function closeHabitModal() {
    document.getElementById('habitModal').classList.remove('active');
    editingHabitId = null;
}

function handleHabitSubmit(e) {
    e.preventDefault();

    const habitData = {
        name: document.getElementById('habitName').value.trim(),
        icon: document.getElementById('habitIconInput').value,
        color: document.getElementById('habitColorInput').value,
        goal: document.getElementById('habitGoal').value
    };

    console.log('Submitting habit:', habitData);

    if (editingHabitId) {
        updateHabit(editingHabitId, habitData);
    } else {
        const newHabit = createHabit(habitData);
        console.log('Created habit:', newHabit);
    }

    console.log('All habits:', habits);
    renderHabits();
    updateHeaderStats();
    closeHabitModal();
}

// ========================================
// Detail Modal Functions
// ========================================
function openDetailModal(habitId) {
    viewingHabitId = habitId;
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const modal = document.getElementById('habitDetailModal');
    const streak = calculateStreak(habit);
    const totalCompletions = habit.completions.reduce((sum, c) => sum + c.count, 0);
    const completionRate = getCompletionRate(habit);

    document.getElementById('detailHabitName').textContent = habit.name;
    document.getElementById('detailStreak').textContent = streak;
    document.getElementById('detailTotal').textContent = totalCompletions;
    document.getElementById('detailRate').textContent = `${completionRate}%`;

    renderCalendar(habit);

    // Update archive button text
    const archiveBtn = document.getElementById('archiveHabitBtn');
    archiveBtn.innerHTML = habit.archived
        ? '<i class="fas fa-undo"></i><span>Unarchive</span>'
        : '<i class="fas fa-archive"></i><span>Archive</span>';

    modal.classList.add('active');
}

function closeDetailModal() {
    document.getElementById('habitDetailModal').classList.remove('active');
    viewingHabitId = null;
}

function renderCalendar(habit) {
    const grid = document.getElementById('calendarGrid');
    const days = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);

        const dateString = date.toISOString().split('T')[0];
        const completion = habit.completions.find(c => c.date === dateString);
        const isCompleted = completion && completion.count >= habit.goal;
        const isToday = i === 0;

        days.push(`
            <div class="calendar-day ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''}"
                 title="${dateString}${isCompleted ? ' - Completed' : ''}">
                ${date.getDate()}
            </div>
        `);
    }

    grid.innerHTML = days.join('');
}

function handleEditFromDetail() {
    closeDetailModal();
    openHabitModal(viewingHabitId);
}

function handleDeleteHabit() {
    if (confirm('Are you sure you want to delete this habit? This action cannot be undone.')) {
        deleteHabit(viewingHabitId);
        closeDetailModal();
        renderHabits();
        updateHeaderStats();
    }
}

function handleArchiveHabit() {
    archiveHabit(viewingHabitId);
    closeDetailModal();
    renderHabits();
    updateHeaderStats();
}

// ========================================
// Statistics Functions
// ========================================
function showStatistics() {
    const section = document.getElementById('statsSection');
    section.classList.remove('hidden');
    updateStatistics();
    renderCharts();

    // Scroll to stats
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideStatistics() {
    document.getElementById('statsSection').classList.add('hidden');
}

function updateStatistics() {
    const activeHabits = habits.filter(h => !h.archived);

    // Total habits
    document.getElementById('totalHabits').textContent = activeHabits.length;

    // Completion rate
    const totalPossibleCompletions = activeHabits.length * 7; // Last 7 days
    const actualCompletions = calculateWeekCompletions(activeHabits);
    const completionRate = totalPossibleCompletions > 0
        ? Math.round((actualCompletions / totalPossibleCompletions) * 100)
        : 0;
    document.getElementById('completionRate').textContent = `${completionRate}%`;

    // Longest streak
    const longestStreak = Math.max(0, ...activeHabits.map(h => calculateStreak(h)));
    document.getElementById('longestStreak').textContent = longestStreak;

    // Total completions
    const totalCompletions = activeHabits.reduce((sum, habit) =>
        sum + habit.completions.reduce((s, c) => s + c.count, 0), 0
    );
    document.getElementById('totalCompletions').textContent = totalCompletions;
}

function calculateWeekCompletions(habits) {
    let count = 0;
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];

        habits.forEach(habit => {
            const completion = habit.completions.find(c => c.date === dateString);
            if (completion && completion.count >= habit.goal) {
                count++;
            }
        });
    }

    return count;
}

// ========================================
// Chart Functions
// ========================================
function renderCharts() {
    renderWeeklyChart();
    renderHabitChart();
}

function renderWeeklyChart() {
    const ctx = document.getElementById('weeklyChart').getContext('2d');
    const labels = [];
    const data = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];

        labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));

        const dayCompletions = habits.filter(habit => {
            const completion = habit.completions.find(c => c.date === dateString);
            return completion && completion.count >= habit.goal;
        }).length;

        data.push(dayCompletions);
    }

    if (weeklyChart) {
        weeklyChart.destroy();
    }

    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#cbd5e1' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    weeklyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Completed Habits',
                data: data,
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        color: textColor
                    },
                    grid: {
                        color: gridColor
                    }
                },
                x: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function renderHabitChart() {
    const ctx = document.getElementById('habitChart').getContext('2d');
    const activeHabits = habits.filter(h => !h.archived);

    if (activeHabits.length === 0) {
        if (habitChart) {
            habitChart.destroy();
        }
        ctx.canvas.parentElement.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No habits to display</p>';
        return;
    }

    const labels = activeHabits.map(h => h.name.length > 15 ? h.name.substring(0, 15) + '...' : h.name);
    const data = activeHabits.map(h => h.completions.filter(c => c.count >= h.goal).length);
    const colors = activeHabits.map(h => h.color);

    if (habitChart) {
        habitChart.destroy();
    }

    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#cbd5e1' : '#64748b';

    habitChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: isDark ? '#1e293b' : '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        color: textColor,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// ========================================
// About Modal Functions
// ========================================
function openAboutModal() {
    document.getElementById('aboutModal').classList.add('active');
}

function closeAboutModal() {
    document.getElementById('aboutModal').classList.remove('active');
}

// ========================================
// Utility Functions
// ========================================
function getTodayString() {
    return new Date().toISOString().split('T')[0];
}

// ========================================
// Demo Data (Optional - for testing)
// ========================================
function addDemoData() {
    if (habits.length === 0) {
        const demoHabits = [
            {
                id: Date.now().toString(),
                name: 'Drink 8 Glasses of Water',
                icon: 'fa-water',
                color: '#3b82f6',
                goal: 8,
                createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                completions: generateDemoCompletions(15, 8),
                archived: false
            },
            {
                id: (Date.now() + 1).toString(),
                name: 'Exercise for 30 Minutes',
                icon: 'fa-running',
                color: '#22c55e',
                goal: 1,
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                completions: generateDemoCompletions(10, 1),
                archived: false
            },
            {
                id: (Date.now() + 2).toString(),
                name: 'Read for 30 Minutes',
                icon: 'fa-book',
                color: '#ec4899',
                goal: 1,
                createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
                completions: generateDemoCompletions(20, 1),
                archived: false
            }
        ];
        habits = demoHabits;
        saveHabits();
    }
}

function generateDemoCompletions(days, goal) {
    const completions = [];
    for (let i = 0; i < days; i++) {
        // Random completion (80% chance of completing)
        if (Math.random() > 0.2) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            completions.push({
                date: date.toISOString().split('T')[0],
                count: goal,
                timestamp: date.toISOString()
            });
        }
    }
    return completions;
}

// Uncomment to add demo data on first load:
// addDemoData();

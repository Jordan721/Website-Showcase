// SQL Tutorial Content
const tutorials = {
    beginner: [
        {
            level: 1,
            title: "Lesson 1: SELECT Basics",
            description: "Learn to retrieve data from a database table.",
            content: `
                <p>The SELECT statement is used to query data from a database. The most basic form is:</p>
                <code>SELECT * FROM table_name;</code>
                <p>The asterisk (*) means "all columns". You can also select specific columns:</p>
                <code>SELECT name, year FROM consoles;</code>
            `,
            example: "SELECT * FROM consoles LIMIT 5;",
            challenge: "Find all consoles and display only their names and years of release.",
            solution: "SELECT name, year FROM consoles;"
        },
        {
            level: 1,
            title: "Lesson 2: WHERE Clause",
            description: "Filter results based on conditions.",
            content: `
                <p>The WHERE clause filters records that meet specific conditions:</p>
                <code>SELECT * FROM consoles WHERE year > 2000;</code>
                <p>You can use various comparison operators: =, !=, >, <, >=, <=</p>
                <code>SELECT * FROM consoles WHERE company_id = 1;</code>
            `,
            example: "SELECT name, year FROM consoles WHERE year > 2010;",
            challenge: "Find all consoles released after 2015.",
            solution: "SELECT * FROM consoles WHERE year > 2015;"
        },
        {
            level: 1,
            title: "Lesson 3: ORDER BY",
            description: "Sort your results.",
            content: `
                <p>ORDER BY sorts results by one or more columns:</p>
                <code>SELECT * FROM consoles ORDER BY year;</code>
                <p>Use DESC for descending order (default is ascending):</p>
                <code>SELECT * FROM consoles ORDER BY units_sold DESC;</code>
            `,
            example: "SELECT name, units_sold FROM consoles ORDER BY units_sold DESC LIMIT 10;",
            challenge: "Show all consoles ordered by price from most to least expensive.",
            solution: "SELECT * FROM consoles ORDER BY price DESC;"
        },
        {
            level: 1,
            title: "Lesson 4: LIMIT",
            description: "Control how many results you get.",
            content: `
                <p>LIMIT restricts the number of rows returned:</p>
                <code>SELECT * FROM consoles LIMIT 10;</code>
                <p>Useful for getting top results when combined with ORDER BY:</p>
                <code>SELECT * FROM consoles ORDER BY units_sold DESC LIMIT 5;</code>
            `,
            example: "SELECT name, year FROM consoles ORDER BY year DESC LIMIT 3;",
            challenge: "Find the top 5 best-selling games of all time.",
            solution: "SELECT * FROM games ORDER BY copies_sold DESC LIMIT 5;"
        }
    ],

    intermediate: [
        {
            level: 2,
            title: "Lesson 5: Aggregate Functions",
            description: "Perform calculations on data.",
            content: `
                <p>SQL provides functions to calculate values across rows:</p>
                <code>SELECT COUNT(*) FROM consoles;</code>
                <p>Common aggregate functions: COUNT, SUM, AVG, MAX, MIN</p>
                <code>SELECT AVG(units_sold) FROM consoles;</code>
                <code>SELECT MAX(price) FROM consoles;</code>
            `,
            example: "SELECT COUNT(*) as total_consoles, AVG(units_sold) as avg_sales FROM consoles;",
            challenge: "Calculate the total number of console units sold across all generations.",
            solution: "SELECT SUM(units_sold) as total_sales FROM consoles;"
        },
        {
            level: 2,
            title: "Lesson 6: GROUP BY",
            description: "Group rows that have the same values.",
            content: `
                <p>GROUP BY groups rows with the same values in specified columns:</p>
                <code>SELECT generation, COUNT(*) FROM consoles GROUP BY generation;</code>
                <p>Often used with aggregate functions to get statistics per group:</p>
                <code>SELECT generation, AVG(units_sold) FROM consoles GROUP BY generation;</code>
            `,
            example: "SELECT company_id, COUNT(*) as console_count FROM consoles GROUP BY company_id;",
            challenge: "Find the average units sold for each console generation.",
            solution: "SELECT generation, AVG(units_sold) FROM consoles GROUP BY generation;"
        },
        {
            level: 2,
            title: "Lesson 7: JOIN Operations",
            description: "Combine data from multiple tables.",
            content: `
                <p>JOIN combines rows from two or more tables based on a related column:</p>
                <code>SELECT c.name, co.name FROM consoles c JOIN companies co ON c.company_id = co.id;</code>
                <p>This links consoles with their company information.</p>
            `,
            example: "SELECT c.name as console, co.name as company FROM consoles c JOIN companies co ON c.company_id = co.id LIMIT 10;",
            challenge: "Show all consoles with their company names, sorted by year.",
            solution: "SELECT c.name, co.name, c.year FROM consoles c JOIN companies co ON c.company_id = co.id ORDER BY c.year;"
        },
        {
            level: 2,
            title: "Lesson 8: Multiple Conditions",
            description: "Combine multiple filters.",
            content: `
                <p>Use AND to require all conditions be true:</p>
                <code>SELECT * FROM consoles WHERE year > 2000 AND units_sold > 50;</code>
                <p>Use OR to require any condition be true:</p>
                <code>SELECT * FROM consoles WHERE company_id = 1 OR company_id = 2;</code>
            `,
            example: "SELECT * FROM consoles WHERE year >= 2010 AND units_sold > 30;",
            challenge: "Find consoles made by Nintendo (company_id = 1) that sold more than 50 million units.",
            solution: "SELECT * FROM consoles WHERE company_id = 1 AND units_sold > 50;"
        }
    ],

    advanced: [
        {
            level: 3,
            title: "Lesson 9: Complex JOINs",
            description: "Master multi-table queries.",
            content: `
                <p>Join multiple tables to get comprehensive data:</p>
                <code>SELECT g.title, c.name, co.name
                FROM games g
                JOIN consoles c ON g.console_id = c.id
                JOIN companies co ON c.company_id = co.id;</code>
            `,
            example: "SELECT g.title, c.name as console, g.copies_sold FROM games g JOIN consoles c ON g.console_id = c.id ORDER BY g.copies_sold DESC LIMIT 5;",
            challenge: "Show all games with their console and company names.",
            solution: "SELECT g.title, c.name as console, co.name as company FROM games g JOIN consoles c ON g.console_id = c.id JOIN companies co ON c.company_id = co.id;"
        },
        {
            level: 3,
            title: "Lesson 10: HAVING Clause",
            description: "Filter grouped results.",
            content: `
                <p>HAVING filters groups (used with GROUP BY):</p>
                <code>SELECT company_id, COUNT(*) as count
                FROM consoles
                GROUP BY company_id
                HAVING count > 5;</code>
                <p>WHERE filters rows before grouping, HAVING filters after.</p>
            `,
            example: "SELECT generation, AVG(units_sold) as avg FROM consoles GROUP BY generation HAVING avg > 40;",
            challenge: "Find companies that have made more than 3 consoles.",
            solution: "SELECT co.name, COUNT(*) as count FROM consoles c JOIN companies co ON c.company_id = co.id GROUP BY co.name HAVING count > 3;"
        },
        {
            level: 3,
            title: "Lesson 11: Subqueries",
            description: "Queries within queries.",
            content: `
                <p>Use a query's result as input to another query:</p>
                <code>SELECT * FROM consoles
                WHERE units_sold > (SELECT AVG(units_sold) FROM consoles);</code>
                <p>Find consoles that sold better than average!</p>
            `,
            example: "SELECT name, units_sold FROM consoles WHERE units_sold > (SELECT AVG(units_sold) FROM consoles);",
            challenge: "Find games that sold more copies than the average game.",
            solution: "SELECT * FROM games WHERE copies_sold > (SELECT AVG(copies_sold) FROM games);"
        },
        {
            level: 3,
            title: "Lesson 12: Advanced Analytics",
            description: "Complex analysis queries.",
            content: `
                <p>Combine everything you've learned for powerful insights:</p>
                <code>SELECT co.name,
                       COUNT(c.id) as consoles,
                       SUM(c.units_sold) as total_sales,
                       AVG(c.units_sold) as avg_sales
                FROM companies co
                JOIN consoles c ON co.id = c.company_id
                GROUP BY co.name
                ORDER BY total_sales DESC;</code>
            `,
            example: "SELECT generation, COUNT(*) as consoles, SUM(units_sold) as total FROM consoles GROUP BY generation ORDER BY generation;",
            challenge: "Create a comprehensive report showing each company's performance: total consoles made, total units sold, and average price.",
            solution: "SELECT co.name, COUNT(c.id) as total_consoles, SUM(c.units_sold) as total_sales, AVG(c.price) as avg_price FROM companies co JOIN consoles c ON co.id = c.company_id GROUP BY co.name ORDER BY total_sales DESC;"
        }
    ]
};

// Current lesson tracking
let currentLesson = { level: 1, index: 0 };

function getTutorial(level) {
    const levelMap = {
        1: 'beginner',
        2: 'intermediate',
        3: 'advanced'
    };
    return tutorials[levelMap[level]] || tutorials.beginner;
}

function getCurrentLesson() {
    const lessons = getTutorial(currentLesson.level);
    return lessons[currentLesson.index] || lessons[0];
}

function loadLesson(lesson) {
    return `
        <h3>${lesson.title}</h3>
        <p>${lesson.description}</p>
        ${lesson.content}
        <div class="example">
            <strong>Example Query:</strong>
            <code>${lesson.example}</code>
            <button class="btn-secondary" onclick="loadExampleToEditor('${lesson.example.replace(/'/g, "\\'")}')">Try This Example</button>
        </div>
        <div class="challenge">
            <strong>Challenge:</strong> ${lesson.challenge}
            <br><br>
            <button class="btn-secondary" onclick="showSolution('${lesson.solution.replace(/'/g, "\\'")}')">Show Solution</button>
        </div>
    `;
}

function loadExampleToEditor(query) {
    document.getElementById('sqlEditor').value = query;
}

function showSolution(solution) {
    alert('Solution:\\n\\n' + solution);
}

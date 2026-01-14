// Bagel Byte Academy - Interactive Learning Platform

// ==================== DATA ====================

const hardwareData = {
    cpu: {
        name: "CPU (Central Processing Unit)",
        desc: "The brain of the computer that executes all instructions and calculations. Modern CPUs have multiple cores for parallel processing.",
        facts: [
            "Clock speed measured in GHz (billions of cycles/second)",
            "Multiple cores allow simultaneous task processing",
            "Cache memory stores frequently used data for quick access",
            "Executes billions of instructions every second"
        ]
    },
    gpu: {
        name: "GPU (Graphics Processing Unit)",
        desc: "Specialized processor for rendering graphics and parallel computations. Essential for gaming, video editing, and AI workloads.",
        facts: [
            "Thousands of smaller cores optimized for parallel tasks",
            "Handles all visual rendering for your display",
            "Used in AI/ML training due to parallel processing power",
            "VRAM stores textures and graphics data"
        ]
    },
    ram: {
        name: "RAM (Random Access Memory)",
        desc: "Ultra-fast temporary storage for data your computer is actively using. Data is lost when power is turned off.",
        facts: [
            "Much faster than storage drives (SSDs/HDDs)",
            "Volatile - loses data without power",
            "Measured in GB (typically 8-64GB in modern PCs)",
            "DDR5 is the latest generation standard"
        ]
    },
    storage: {
        name: "Storage (SSD/HDD)",
        desc: "Permanent storage for your files, programs, and operating system. Data persists even when the computer is off.",
        facts: [
            "SSD: Fast, no moving parts, uses flash memory",
            "HDD: Cheaper per GB, spinning magnetic disks",
            "NVMe SSDs connect directly to PCIe for max speed",
            "Measured in GB or TB of capacity"
        ]
    },
    mobo: {
        name: "Motherboard",
        desc: "The main circuit board connecting all components. Contains slots, ports, and pathways for data transfer.",
        facts: [
            "Houses the CPU socket, RAM slots, and PCIe lanes",
            "Contains BIOS/UEFI firmware for startup",
            "Chipset determines compatible CPUs and features",
            "Provides USB, audio, network, and other I/O"
        ]
    },
    psu: {
        name: "PSU (Power Supply Unit)",
        desc: "Converts AC power from your outlet to DC power for computer components. Critical for stable operation.",
        facts: [
            "Converts 110/220V AC to 12V, 5V, 3.3V DC",
            "Wattage rating indicates max power delivery",
            "80+ ratings indicate power efficiency level",
            "Modular PSUs allow cleaner cable management"
        ]
    }
};

const codingConcepts = {
    variables: {
        title: "Variables - Storing Data",
        content: `
            <p>Variables are containers that store data values. Think of them as labeled boxes where you can put things and retrieve them later.</p>
            <div class="code-example">
                <span class="comment">// Declaring variables in JavaScript</span><br>
                <span class="keyword">let</span> playerName = <span class="string">"Alex"</span>;<br>
                <span class="keyword">let</span> score = <span class="number">100</span>;<br>
                <span class="keyword">let</span> isAlive = <span class="keyword">true</span>;<br><br>
                <span class="comment">// Using variables</span><br>
                console.log(playerName); <span class="comment">// Output: Alex</span><br>
                score = score + <span class="number">50</span>; <span class="comment">// Now score is 150</span>
            </div>
            <p><strong>Data Types:</strong></p>
            <ul>
                <li><strong>String:</strong> Text data like "Hello"</li>
                <li><strong>Number:</strong> Numeric values like 42 or 3.14</li>
                <li><strong>Boolean:</strong> true or false</li>
                <li><strong>Array:</strong> Lists of values [1, 2, 3]</li>
            </ul>
        `
    },
    conditions: {
        title: "Conditions - Making Decisions",
        content: `
            <p>Conditional statements let your code make decisions. If something is true, do one thing; otherwise, do something else.</p>
            <div class="code-example">
                <span class="keyword">let</span> temperature = <span class="number">75</span>;<br><br>
                <span class="keyword">if</span> (temperature > <span class="number">80</span>) {<br>
                &nbsp;&nbsp;console.log(<span class="string">"It's hot!"</span>);<br>
                } <span class="keyword">else if</span> (temperature > <span class="number">60</span>) {<br>
                &nbsp;&nbsp;console.log(<span class="string">"Nice weather!"</span>);<br>
                } <span class="keyword">else</span> {<br>
                &nbsp;&nbsp;console.log(<span class="string">"It's cold!"</span>);<br>
                }
            </div>
            <p><strong>Comparison Operators:</strong></p>
            <ul>
                <li><code>===</code> Equal to</li>
                <li><code>!==</code> Not equal to</li>
                <li><code>&gt;</code> Greater than</li>
                <li><code>&lt;</code> Less than</li>
                <li><code>&gt;=</code> Greater or equal</li>
            </ul>
        `
    },
    loops: {
        title: "Loops - Repeating Actions",
        content: `
            <p>Loops allow you to repeat code multiple times without writing it over and over. They're essential for processing lists and automating repetitive tasks.</p>
            <div class="code-example">
                <span class="comment">// For loop - repeat 5 times</span><br>
                <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">1</span>; i <= <span class="number">5</span>; i++) {<br>
                &nbsp;&nbsp;console.log(<span class="string">"Count: "</span> + i);<br>
                }<br><br>
                <span class="comment">// While loop - repeat while condition is true</span><br>
                <span class="keyword">let</span> lives = <span class="number">3</span>;<br>
                <span class="keyword">while</span> (lives > <span class="number">0</span>) {<br>
                &nbsp;&nbsp;console.log(<span class="string">"Lives remaining: "</span> + lives);<br>
                &nbsp;&nbsp;lives--;<br>
                }
            </div>
            <p><strong>Loop Types:</strong></p>
            <ul>
                <li><strong>for:</strong> When you know how many times to repeat</li>
                <li><strong>while:</strong> When you repeat until a condition changes</li>
                <li><strong>forEach:</strong> For iterating through arrays</li>
            </ul>
        `
    },
    functions: {
        title: "Functions - Reusable Code",
        content: `
            <p>Functions are reusable blocks of code that perform a specific task. They help organize code and avoid repetition.</p>
            <div class="code-example">
                <span class="comment">// Define a function</span><br>
                <span class="keyword">function</span> greet(name) {<br>
                &nbsp;&nbsp;<span class="keyword">return</span> <span class="string">"Hello, "</span> + name + <span class="string">"!"</span>;<br>
                }<br><br>
                <span class="comment">// Call the function</span><br>
                <span class="keyword">let</span> message = greet(<span class="string">"Sarah"</span>);<br>
                console.log(message); <span class="comment">// Output: Hello, Sarah!</span><br><br>
                <span class="comment">// Arrow function (modern syntax)</span><br>
                <span class="keyword">const</span> add = (a, b) => a + b;<br>
                console.log(add(<span class="number">5</span>, <span class="number">3</span>)); <span class="comment">// Output: 8</span>
            </div>
            <p><strong>Benefits:</strong></p>
            <ul>
                <li>Write once, use many times</li>
                <li>Makes code easier to read and maintain</li>
                <li>Can accept inputs (parameters) and return outputs</li>
            </ul>
        `
    }
};

const networkingConcepts = {
    ip: {
        title: "IP Addresses",
        content: `
            <h3>IP Addresses - Device Identifiers</h3>
            <p>Every device on a network has a unique IP address, like a home address for the internet.</p>
            <p><strong>IPv4:</strong> <code>192.168.1.100</code> (4 numbers, 0-255 each)</p>
            <p><strong>IPv6:</strong> <code>2001:0db8:85a3::8a2e:0370:7334</code> (longer, more addresses)</p>
            <p><strong>Private IPs</strong> are used within your home network (192.168.x.x, 10.x.x.x)</p>
            <p><strong>Public IPs</strong> are visible on the internet and assigned by your ISP.</p>
        `
    },
    dns: {
        title: "DNS - Domain Name System",
        content: `
            <h3>DNS - The Internet's Phone Book</h3>
            <p>DNS translates human-readable domain names into IP addresses that computers understand.</p>
            <p>When you type <code>google.com</code>, DNS looks up the IP address <code>142.250.80.46</code></p>
            <p><strong>How it works:</strong></p>
            <ol>
                <li>You type a URL in your browser</li>
                <li>Your computer asks a DNS server for the IP</li>
                <li>DNS returns the IP address</li>
                <li>Your browser connects to that IP</li>
            </ol>
        `
    },
    packets: {
        title: "Packets - Data Chunks",
        content: `
            <h3>Network Packets</h3>
            <p>Data is broken into small pieces called packets for transmission across networks.</p>
            <p><strong>Why packets?</strong></p>
            <ul>
                <li>Multiple conversations can share one connection</li>
                <li>If one packet is lost, only that piece is resent</li>
                <li>Packets can take different routes to destination</li>
            </ul>
            <p><strong>A packet contains:</strong></p>
            <ul>
                <li>Source address (where it came from)</li>
                <li>Destination address (where it's going)</li>
                <li>Sequence number (to reassemble in order)</li>
                <li>Payload (the actual data)</li>
            </ul>
        `
    },
    protocols: {
        title: "Protocols - Communication Rules",
        content: `
            <h3>Network Protocols</h3>
            <p>Protocols are standardized rules that define how data is transmitted and received.</p>
            <p><strong>Common Protocols:</strong></p>
            <ul>
                <li><strong>HTTP/HTTPS:</strong> Web pages (port 80/443)</li>
                <li><strong>FTP:</strong> File transfers (port 21)</li>
                <li><strong>SSH:</strong> Secure remote access (port 22)</li>
                <li><strong>SMTP:</strong> Sending email (port 25)</li>
                <li><strong>DNS:</strong> Domain lookups (port 53)</li>
            </ul>
            <p><strong>TCP vs UDP:</strong></p>
            <ul>
                <li><strong>TCP:</strong> Reliable, ordered delivery (web, email)</li>
                <li><strong>UDP:</strong> Fast, no guarantee (gaming, streaming)</li>
            </ul>
        `
    }
};

const challenges = {
    hello: {
        name: "Hello World",
        description: "Print 'Hello, World!' to the console",
        hint: "Use console.log() to print text",
        check: (output) => output.includes("Hello, World!"),
        xp: 10
    },
    sum: {
        name: "Sum Two Numbers",
        description: "Create variables a=5 and b=10, then print their sum (15)",
        hint: "Add two numbers with + and use console.log()",
        check: (output) => output.includes("15"),
        xp: 15
    },
    loop: {
        name: "Count to 10",
        description: "Use a loop to print numbers 1 through 10",
        hint: "Use a for loop: for(let i = 1; i <= 10; i++)",
        check: (output) => {
            for (let i = 1; i <= 10; i++) {
                if (!output.includes(String(i))) return false;
            }
            return true;
        },
        xp: 25
    },
    fizzbuzz: {
        name: "FizzBuzz",
        description: "Print 1-15. For multiples of 3 print 'Fizz', multiples of 5 print 'Buzz', both print 'FizzBuzz'",
        hint: "Use modulo (%) to check divisibility",
        check: (output) => output.includes("Fizz") && output.includes("Buzz") && output.includes("FizzBuzz"),
        xp: 50
    }
};

const quizzes = {
    hardware: {
        title: "Hardware Basics",
        questions: [
            {
                q: "What does CPU stand for?",
                options: ["Central Processing Unit", "Computer Power Unit", "Core Processing Utility", "Central Power Unit"],
                correct: 0
            },
            {
                q: "Which component is 'volatile' and loses data when power is off?",
                options: ["SSD", "RAM", "HDD", "CPU"],
                correct: 1
            },
            {
                q: "What connects all computer components together?",
                options: ["CPU", "PSU", "Motherboard", "GPU"],
                correct: 2
            },
            {
                q: "Which storage type has no moving parts?",
                options: ["HDD", "DVD", "SSD", "Floppy Disk"],
                correct: 2
            },
            {
                q: "What does GPU stand for?",
                options: ["General Processing Unit", "Graphics Processing Unit", "Game Power Unit", "Graphics Power Utility"],
                correct: 1
            }
        ]
    },
    binary: {
        title: "Binary & Data",
        questions: [
            {
                q: "What is a single binary digit (0 or 1) called?",
                options: ["Byte", "Bit", "Word", "Nibble"],
                correct: 1
            },
            {
                q: "How many bits are in a byte?",
                options: ["4", "8", "16", "32"],
                correct: 1
            },
            {
                q: "What is 1010 in decimal?",
                options: ["8", "10", "12", "1010"],
                correct: 1
            },
            {
                q: "What is the maximum decimal value of an 8-bit number?",
                options: ["128", "255", "256", "512"],
                correct: 1
            },
            {
                q: "Why do computers use binary?",
                options: ["It's easier for humans", "Circuits easily represent 2 states", "It uses less power", "It was invented first"],
                correct: 1
            }
        ]
    },
    coding: {
        title: "Coding Concepts",
        questions: [
            {
                q: "What keyword declares a variable that can be reassigned?",
                options: ["const", "let", "var", "int"],
                correct: 1
            },
            {
                q: "Which loop is best when you know exactly how many times to repeat?",
                options: ["while", "do-while", "for", "foreach"],
                correct: 2
            },
            {
                q: "What does a function 'return'?",
                options: ["An error", "A value back to the caller", "To the previous line", "Nothing"],
                correct: 1
            },
            {
                q: "What operator checks if two values are equal?",
                options: ["=", "==", "!=", ":="],
                correct: 1
            },
            {
                q: "What is an array?",
                options: ["A single value", "A function", "A list of values", "A loop"],
                correct: 2
            }
        ]
    },
    networking: {
        title: "Networking",
        questions: [
            {
                q: "What does DNS stand for?",
                options: ["Domain Name System", "Data Network Service", "Digital Name Server", "Domain Network System"],
                correct: 0
            },
            {
                q: "What is a packet?",
                options: ["A type of cable", "A small unit of data", "A network device", "A protocol"],
                correct: 1
            },
            {
                q: "Which port is typically used for HTTPS?",
                options: ["80", "21", "443", "22"],
                correct: 2
            },
            {
                q: "What protocol is reliable and guarantees delivery?",
                options: ["UDP", "TCP", "IP", "ICMP"],
                correct: 1
            },
            {
                q: "What does an IP address identify?",
                options: ["A website name", "A device on a network", "A type of data", "A cable type"],
                correct: 1
            }
        ]
    }
};

// ==================== STATE ====================

const state = {
    xp: 0,
    level: 1,
    topicsExplored: new Set(),
    challengesCompleted: new Set(),
    quizScores: {},
    viewedConcepts: new Set(),
    currentLang: 'javascript',
    currentChallenge: null,
    currentQuiz: null,
    quizQuestion: 0,
    quizCorrect: 0
};

// File system for terminal
const fileSystem = {
    '~': {
        type: 'dir',
        contents: {
            'documents': {
                type: 'dir',
                contents: {
                    'readme.txt': { type: 'file', content: 'Welcome to Bagel Byte Academy!\nLearn coding and networking fundamentals.' },
                    'notes.txt': { type: 'file', content: 'Remember: Practice makes perfect!' }
                }
            },
            'projects': {
                type: 'dir',
                contents: {
                    'hello.js': { type: 'file', content: 'console.log("Hello, World!");' },
                    'secret': {
                        type: 'dir',
                        contents: {
                            'treasure.txt': { type: 'file', content: 'You found the secret folder! +20 XP' }
                        }
                    }
                }
            },
            'config.txt': { type: 'file', content: 'user=bagelbyte\ntheme=dark' }
        }
    }
};

let currentPath = '~';
let commandHistory = [];
let historyIndex = -1;
let terminalType = 'linux'; // 'linux', 'windows', 'powershell'

// Terminal type configurations
const terminalConfigs = {
    linux: {
        prompt: (path) => `bagelbyte:${path}$`,
        title: 'Linux/Bash',
        commands: {
            list: 'ls',
            changeDir: 'cd',
            printDir: 'pwd',
            readFile: 'cat',
            makeDir: 'mkdir',
            clear: 'clear',
            network: 'ifconfig',
            user: 'whoami',
            print: 'echo',
            history: 'history',
            help: 'help',
            ping: 'ping'
        },
        helpText: `Available commands:
  ls        - List directory contents
  cd <dir>  - Change directory
  pwd       - Print working directory
  cat <file> - View file contents
  mkdir <dir> - Create directory
  clear     - Clear terminal
  ping <host> - Ping a host
  ifconfig  - Show network info
  whoami    - Display current user
  echo <text> - Print text
  history   - Show command history`
    },
    windows: {
        prompt: (path) => `C:\\Users\\bagelbyte${path === '~' ? '' : path.replace('~', '').replace(/\//g, '\\')}> `,
        title: 'Command Prompt',
        commands: {
            list: 'dir',
            changeDir: 'cd',
            printDir: 'cd',
            readFile: 'type',
            makeDir: 'mkdir',
            clear: 'cls',
            network: 'ipconfig',
            user: 'whoami',
            print: 'echo',
            history: 'doskey /history',
            help: 'help',
            ping: 'ping'
        },
        helpText: `Available commands:
  dir       - List directory contents
  cd <dir>  - Change directory
  cd        - Print working directory
  type <file> - View file contents
  mkdir <dir> - Create directory
  cls       - Clear terminal
  ping <host> - Ping a host
  ipconfig  - Show network info
  whoami    - Display current user
  echo <text> - Print text
  doskey /history - Show command history`
    },
    powershell: {
        prompt: (path) => `PS C:\\Users\\bagelbyte${path === '~' ? '' : path.replace('~', '').replace(/\//g, '\\')}> `,
        title: 'Windows PowerShell',
        commands: {
            list: 'Get-ChildItem',
            listAlias: 'ls',
            changeDir: 'Set-Location',
            changeDirAlias: 'cd',
            printDir: 'Get-Location',
            printDirAlias: 'pwd',
            readFile: 'Get-Content',
            readFileAlias: 'cat',
            makeDir: 'New-Item',
            makeDirAlias: 'mkdir',
            clear: 'Clear-Host',
            clearAlias: 'cls',
            network: 'Get-NetIPConfiguration',
            user: 'whoami',
            print: 'Write-Output',
            printAlias: 'echo',
            history: 'Get-History',
            help: 'Get-Help',
            ping: 'Test-Connection'
        },
        helpText: `Available commands (PowerShell):
  Get-ChildItem (ls, dir) - List directory contents
  Set-Location (cd)       - Change directory
  Get-Location (pwd)      - Print working directory
  Get-Content (cat, type) - View file contents
  New-Item (mkdir)        - Create directory
  Clear-Host (cls)        - Clear terminal
  Test-Connection (ping)  - Ping a host
  Get-NetIPConfiguration  - Show network info
  whoami                  - Display current user
  Write-Output (echo)     - Print text
  Get-History             - Show command history`
    }
};

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    initHardware();
    initBinary();
    initCoding();
    initNetworking();
    initTerminal();
    initQuiz();
    initAboutModal();
    updateStats();
    updateLineNumbers();
});

// ==================== ABOUT MODAL ====================

function initAboutModal() {
    const aboutBtn = document.getElementById('aboutBtn');
    const aboutModal = document.getElementById('aboutModal');
    const closeAboutModal = document.getElementById('closeAboutModal');

    aboutBtn.addEventListener('click', () => {
        aboutModal.classList.add('show');
    });

    closeAboutModal.addEventListener('click', () => {
        aboutModal.classList.remove('show');
    });

    aboutModal.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.classList.remove('show');
        }
    });
}

function loadProgress() {
    const saved = localStorage.getItem('bagelbyteProgress');
    if (saved) {
        const data = JSON.parse(saved);
        state.xp = data.xp || 0;
        state.level = data.level || 1;
        state.topicsExplored = new Set(data.topicsExplored || []);
        state.challengesCompleted = new Set(data.challengesCompleted || []);
        state.quizScores = data.quizScores || {};
        state.viewedConcepts = new Set(data.viewedConcepts || []);
    }
}

function saveProgress() {
    const data = {
        xp: state.xp,
        level: state.level,
        topicsExplored: Array.from(state.topicsExplored),
        challengesCompleted: Array.from(state.challengesCompleted),
        quizScores: state.quizScores,
        viewedConcepts: Array.from(state.viewedConcepts)
    };
    localStorage.setItem('bagelbyteProgress', JSON.stringify(data));
}

// ==================== XP SYSTEM ====================

function addXP(amount) {
    state.xp += amount;
    const xpForNextLevel = state.level * 100;

    if (state.xp >= xpForNextLevel) {
        state.xp -= xpForNextLevel;
        state.level++;
        showAchievement(`Level ${state.level} Reached!`);
    }

    updateStats();
    showXPNotification(amount);
    saveProgress();
}

function showXPNotification(amount) {
    const notification = document.getElementById('xpNotification');
    document.getElementById('xpAmount').textContent = `+${amount} XP`;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2000);
}

function showAchievement(name) {
    const popup = document.getElementById('achievementPopup');
    document.getElementById('achievementName').textContent = name;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 3000);
}

function updateStats() {
    document.getElementById('userLevel').textContent = state.level;
    document.getElementById('topicsCount').textContent = state.topicsExplored.size;
    document.getElementById('challengesCount').textContent = state.challengesCompleted.size;
    document.getElementById('xpTotal').textContent = state.level * 100 - 100 + state.xp;

    const xpForNextLevel = state.level * 100;
    const xpPercent = (state.xp / xpForNextLevel) * 100;
    document.getElementById('xpFill').style.width = `${xpPercent}%`;
}

// ==================== HARDWARE ====================

function initHardware() {
    document.querySelectorAll('.pc-component').forEach(comp => {
        comp.addEventListener('click', () => {
            const part = comp.dataset.part;
            showComponentInfo(part);

            document.querySelectorAll('.pc-component').forEach(c => c.classList.remove('active'));
            comp.classList.add('active');
        });
    });
}

function showComponentInfo(part) {
    const data = hardwareData[part];
    if (!data) return;

    const detail = document.getElementById('componentDetail');
    detail.innerHTML = `
        <div class="component-info-content">
            <h3>${data.name}</h3>
            <p>${data.desc}</p>
            <ul>
                ${data.facts.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </div>
    `;

    if (!state.topicsExplored.has(`hw-${part}`)) {
        state.topicsExplored.add(`hw-${part}`);
        addXP(5);
    }
}

// ==================== BINARY ====================

function initBinary() {
    const decimalInput = document.getElementById('decimalNum');
    const binaryInput = document.getElementById('binaryNum');

    decimalInput.addEventListener('input', () => {
        let val = parseInt(decimalInput.value) || 0;
        if (val > 255) val = 255;
        if (val < 0) val = 0;
        decimalInput.value = val;
        binaryInput.value = val.toString(2).padStart(8, '0');
        updateBitGrid(val);
        trackBinaryUse();
    });

    binaryInput.addEventListener('input', () => {
        let binary = binaryInput.value.replace(/[^01]/g, '').slice(0, 8);
        binaryInput.value = binary;
        const val = parseInt(binary, 2) || 0;
        decimalInput.value = val;
        updateBitGrid(val);
        trackBinaryUse();
    });

    document.querySelectorAll('.bit-box').forEach(box => {
        box.addEventListener('click', () => {
            const pos = parseInt(box.dataset.pos);
            let currentVal = parseInt(decimalInput.value) || 0;
            currentVal ^= (1 << pos);
            decimalInput.value = currentVal;
            binaryInput.value = currentVal.toString(2).padStart(8, '0');
            updateBitGrid(currentVal);
            trackBinaryUse();
        });
    });
}

function updateBitGrid(value) {
    const binary = value.toString(2).padStart(8, '0');
    document.querySelectorAll('.bit-box').forEach(box => {
        const pos = parseInt(box.dataset.pos);
        const bitVal = binary[7 - pos];
        box.querySelector('.bit-val').textContent = bitVal;
        box.classList.toggle('active', bitVal === '1');
    });

    const activeBits = [];
    for (let i = 7; i >= 0; i--) {
        if ((value >> i) & 1) activeBits.push(Math.pow(2, i));
    }

    const explanation = document.getElementById('binaryExplanation');
    if (activeBits.length === 0) {
        explanation.textContent = 'Click the bits above to toggle them on/off';
    } else {
        explanation.textContent = `${activeBits.join(' + ')} = ${value}`;
    }
}

let binaryTracked = false;
function trackBinaryUse() {
    if (!binaryTracked) {
        binaryTracked = true;
        if (!state.topicsExplored.has('binary')) {
            state.topicsExplored.add('binary');
            addXP(10);
        }
    }
}

// ==================== CODING ====================

function initCoding() {
    // Concept cards
    document.querySelectorAll('.concept-card').forEach(card => {
        card.addEventListener('click', () => {
            const concept = card.dataset.concept;
            showConcept(concept);
            card.classList.add('viewed');
        });
    });

    document.getElementById('closeConceptPanel').addEventListener('click', () => {
        document.getElementById('conceptPanel').classList.remove('show');
    });

    // Language tabs
    document.querySelectorAll('.lang-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.currentLang = tab.dataset.lang;
            document.querySelector('.file-name').textContent = state.currentLang === 'javascript' ? 'script.js' : 'script.py';
        });
    });

    // Code editor
    document.getElementById('runCode').addEventListener('click', runCode);
    document.getElementById('resetCode').addEventListener('click', resetCode);
    document.getElementById('clearOutput').addEventListener('click', clearOutput);

    document.getElementById('codeInput').addEventListener('input', updateLineNumbers);
    document.getElementById('codeInput').addEventListener('scroll', syncScroll);

    // Challenges
    document.querySelectorAll('.challenge-item').forEach(item => {
        item.addEventListener('click', () => {
            const challenge = item.dataset.challenge;
            loadChallenge(challenge);
        });

        if (state.challengesCompleted.has(item.dataset.challenge)) {
            item.classList.add('completed');
        }
    });
}

function showConcept(concept) {
    const data = codingConcepts[concept];
    if (!data) return;

    document.getElementById('conceptContent').innerHTML = `<h3>${data.title}</h3>${data.content}`;
    document.getElementById('conceptPanel').classList.add('show');

    if (!state.viewedConcepts.has(concept)) {
        state.viewedConcepts.add(concept);
        state.topicsExplored.add(`code-${concept}`);
        addXP(10);
    }
}

function updateLineNumbers() {
    const code = document.getElementById('codeInput').value;
    const lines = code.split('\n').length;
    const lineNumbers = document.getElementById('lineNumbers');
    lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}

function syncScroll() {
    const codeInput = document.getElementById('codeInput');
    const lineNumbers = document.getElementById('lineNumbers');
    lineNumbers.scrollTop = codeInput.scrollTop;
}

function runCode() {
    const code = document.getElementById('codeInput').value;
    const output = document.getElementById('outputConsole');
    output.innerHTML = '';

    const logs = [];
    const originalLog = console.log;
    console.log = (...args) => {
        logs.push(args.join(' '));
    };

    try {
        if (state.currentLang === 'javascript') {
            eval(code);
        } else {
            output.innerHTML = '<p class="output-line">Python execution is simulated. Use JavaScript for real execution.</p>';
            console.log = originalLog;
            return;
        }

        if (logs.length === 0) {
            output.innerHTML = '<p class="output-line">Code executed successfully (no output)</p>';
        } else {
            output.innerHTML = logs.map(log => `<p class="output-line">${escapeHtml(log)}</p>`).join('');
        }

        // Check challenge completion
        if (state.currentChallenge) {
            const challenge = challenges[state.currentChallenge];
            if (challenge.check(logs.join('\n'))) {
                if (!state.challengesCompleted.has(state.currentChallenge)) {
                    state.challengesCompleted.add(state.currentChallenge);
                    addXP(challenge.xp);
                    showAchievement(`Challenge Complete: ${challenge.name}`);
                    document.querySelector(`[data-challenge="${state.currentChallenge}"]`).classList.add('completed');
                    saveProgress();
                }
                output.innerHTML += '<p class="output-line success">Challenge completed!</p>';
            }
        }
    } catch (error) {
        output.innerHTML = `<p class="output-line error">Error: ${escapeHtml(error.message)}</p>`;
    }

    console.log = originalLog;

    if (!state.topicsExplored.has('code-run')) {
        state.topicsExplored.add('code-run');
        addXP(5);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function resetCode() {
    document.getElementById('codeInput').value = `// Welcome to the Code Playground!
// Try writing some code and click Run

let message = "Hello, World!";
console.log(message);

// Try a loop:
for (let i = 1; i <= 5; i++) {
    console.log("Count: " + i);
}`;
    state.currentChallenge = null;
    updateLineNumbers();
}

function clearOutput() {
    document.getElementById('outputConsole').innerHTML = '<p class="output-hint">Click "Run" to see output here...</p>';
}

function loadChallenge(challengeId) {
    const challenge = challenges[challengeId];
    if (!challenge) return;

    state.currentChallenge = challengeId;
    document.getElementById('codeInput').value = `// Challenge: ${challenge.name}
// ${challenge.description}
// Hint: ${challenge.hint}

// Write your code below:

`;
    updateLineNumbers();
    document.getElementById('outputConsole').innerHTML = `<p class="output-hint">Complete the challenge and click Run!</p>`;
}

// ==================== NETWORKING ====================

function initNetworking() {
    // Network concepts
    document.querySelectorAll('.net-concept').forEach(concept => {
        concept.addEventListener('click', () => {
            const net = concept.dataset.net;
            showNetConcept(net);
            concept.classList.add('viewed');
        });
    });

    // Network simulator
    document.getElementById('sendRequest').addEventListener('click', sendNetworkRequest);

    // Packet inspector
    document.querySelectorAll('.packet-layer').forEach(layer => {
        layer.addEventListener('click', () => {
            layer.classList.toggle('expanded');
        });
    });
}

function showNetConcept(concept) {
    const data = networkingConcepts[concept];
    if (!data) return;

    document.getElementById('netDetailContent').innerHTML = data.content;
    document.getElementById('netDetailPanel').classList.add('show');

    if (!state.topicsExplored.has(`net-${concept}`)) {
        state.topicsExplored.add(`net-${concept}`);
        addXP(10);
    }
}

async function sendNetworkRequest() {
    const requestType = document.getElementById('requestType').value;
    const nodes = document.querySelectorAll('.net-node');
    const packets = document.querySelectorAll('.packet-dot');
    const simLog = document.getElementById('simLog');

    // Reset
    nodes.forEach(n => n.classList.remove('active'));
    packets.forEach(p => p.classList.remove('animate'));
    simLog.innerHTML = '';

    const messages = {
        http: [
            "Initiating HTTP request to server...",
            "Packet reaches local router...",
            "ISP routes packet to internet backbone...",
            "Packet traverses multiple networks...",
            "Web server receives request, sending response..."
        ],
        https: [
            "Initiating secure HTTPS connection...",
            "TLS handshake through router...",
            "Encrypted packet sent to ISP...",
            "Encrypted data travels across internet...",
            "Server decrypts and processes request..."
        ],
        dns: [
            "DNS query: Looking up domain name...",
            "Query sent through router...",
            "ISP forwards to DNS resolver...",
            "Resolver checks root DNS servers...",
            "IP address found and returned!"
        ],
        ping: [
            "ICMP Echo Request sent...",
            "Ping packet reaches router...",
            "ISP forwards ping request...",
            "Packet travels to destination...",
            "Echo Reply received! Server is alive."
        ]
    };

    const logs = messages[requestType];

    for (let i = 0; i < 5; i++) {
        nodes[i].classList.add('active');

        const time = new Date().toLocaleTimeString();
        simLog.innerHTML += `<p class="log-entry"><span class="time">[${time}]</span> <span class="action">${logs[i]}</span></p>`;
        simLog.scrollTop = simLog.scrollHeight;

        if (i < 4) {
            packets[i].classList.add('animate');
            await sleep(500);
            packets[i].classList.remove('animate');
        }

        await sleep(300);
    }

    if (!state.topicsExplored.has('net-sim')) {
        state.topicsExplored.add('net-sim');
        addXP(15);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==================== TERMINAL ====================

function initTerminal() {
    const input = document.getElementById('terminalInput');
    const terminalTypeSelect = document.getElementById('terminalType');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            processCommand(input.value);
            commandHistory.push(input.value);
            historyIndex = commandHistory.length;
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        }
    });

    // Terminal type selector
    terminalTypeSelect.addEventListener('change', (e) => {
        terminalType = e.target.value;
        switchTerminalType();
    });

    // Terminal challenges
    document.querySelectorAll('.term-challenge').forEach(challenge => {
        challenge.addEventListener('click', () => {
            const tchallenge = challenge.dataset.tchallenge;
            const hints = {
                linux: {
                    navigate: 'Try: cd projects/secret',
                    create: 'Try: mkdir myproject',
                    network: 'Try: ifconfig'
                },
                windows: {
                    navigate: 'Try: cd projects\\secret',
                    create: 'Try: mkdir myproject',
                    network: 'Try: ipconfig'
                },
                powershell: {
                    navigate: 'Try: Set-Location projects/secret',
                    create: 'Try: New-Item -ItemType Directory myproject',
                    network: 'Try: Get-NetIPConfiguration'
                }
            };
            printOutput(`Challenge: ${hints[terminalType][tchallenge]}`, 'info');
        });
    });
}

function switchTerminalType() {
    const config = terminalConfigs[terminalType];
    const output = document.getElementById('terminalOutput');
    const title = document.getElementById('terminalTitle');

    // Clear terminal
    output.innerHTML = '';

    // Update title
    title.textContent = config.title;

    // Reset path
    currentPath = '~';

    // Show welcome message
    const welcomeMessages = {
        linux: 'Welcome to Bash Terminal!\nType "help" to see available commands.',
        windows: 'Microsoft Windows [Version 10.0]\nType "help" to see available commands.',
        powershell: 'Windows PowerShell\nCopyright (C) Microsoft Corporation.\nType "Get-Help" to see available commands.'
    };

    printOutput(welcomeMessages[terminalType], 'info');
    updatePrompt();
}

function getDir(path) {
    const parts = path.split('/').filter(p => p);
    let current = fileSystem['~'];

    for (const part of parts) {
        if (part === '~') continue;
        if (current.contents && current.contents[part]) {
            current = current.contents[part];
        } else {
            return null;
        }
    }
    return current;
}

function processCommand(cmd) {
    const output = document.getElementById('terminalOutput');
    const parts = cmd.trim().split(/\s+/);
    const rawCommand = parts[0];
    const command = rawCommand.toLowerCase();
    const args = parts.slice(1);
    const config = terminalConfigs[terminalType];

    // Print command with appropriate prompt
    printOutput(`${config.prompt(currentPath)} ${cmd}`, 'command');

    // Normalize command across terminal types
    const normalizedCmd = normalizeCommand(command);

    switch (normalizedCmd) {
        case '':
            break;

        case 'help':
            printOutput(config.helpText, 'success');
            break;

        case 'list':
            const listDir = getDir(currentPath);
            if (listDir && listDir.type === 'dir') {
                const items = Object.keys(listDir.contents).map(name => {
                    const item = listDir.contents[name];
                    if (terminalType === 'windows') {
                        return item.type === 'dir' ? `<DIR>  ${name}` : `       ${name}`;
                    } else if (terminalType === 'powershell') {
                        return item.type === 'dir' ? `d----  ${name}` : `-a---  ${name}`;
                    }
                    return item.type === 'dir' ? `${name}/` : name;
                });
                if (terminalType === 'windows' || terminalType === 'powershell') {
                    printOutput(items.join('\n') || '(empty)', 'success');
                } else {
                    printOutput(items.join('  ') || '(empty)', 'success');
                }
            }
            break;

        case 'cd':
            // Handle Windows path separators
            let targetPath = args[0] ? args[0].replace(/\\/g, '/') : null;

            if (!targetPath || targetPath === '~' || targetPath === '\\' || targetPath === '/') {
                currentPath = '~';
            } else if (targetPath === '..' || targetPath === '..\\' || targetPath === '../') {
                const pathParts = currentPath.split('/');
                if (pathParts.length > 1) {
                    pathParts.pop();
                    currentPath = pathParts.join('/') || '~';
                }
            } else {
                const newPath = currentPath === '~' ? `~/${targetPath}` : `${currentPath}/${targetPath}`;
                const target = getDir(newPath);
                if (target && target.type === 'dir') {
                    currentPath = newPath;

                    // Check for secret folder challenge
                    if (newPath.includes('secret') && !state.challengesCompleted.has('term-navigate')) {
                        state.challengesCompleted.add('term-navigate');
                        addXP(20);
                        showAchievement('Terminal: File Navigator');
                    }
                } else {
                    const errMsg = terminalType === 'windows' ?
                        `The system cannot find the path specified.` :
                        terminalType === 'powershell' ?
                        `Set-Location : Cannot find path '${args[0]}'` :
                        `cd: ${args[0]}: No such directory`;
                    printOutput(errMsg, 'error');
                }
            }
            updatePrompt();
            break;

        case 'pwd':
            if (terminalType === 'windows') {
                printOutput(`C:\\Users\\bagelbyte${currentPath === '~' ? '' : currentPath.replace('~', '').replace(/\//g, '\\')}`, 'success');
            } else if (terminalType === 'powershell') {
                printOutput(`Path\n----\nC:\\Users\\bagelbyte${currentPath === '~' ? '' : currentPath.replace('~', '').replace(/\//g, '\\')}`, 'success');
            } else {
                printOutput(currentPath.replace('~', '/home/bagelbyte'), 'success');
            }
            break;

        case 'read':
            if (!args[0]) {
                const errMsg = terminalType === 'windows' ?
                    'The syntax of the command is incorrect.' :
                    terminalType === 'powershell' ?
                    'Get-Content : Cannot bind argument to parameter \'Path\'' :
                    'cat: missing file operand';
                printOutput(errMsg, 'error');
            } else {
                const fileName = args[0].replace(/\\/g, '/');
                const filePath = currentPath === '~' ? `~/${fileName}` : `${currentPath}/${fileName}`;
                const file = getDir(filePath);
                if (file && file.type === 'file') {
                    printOutput(file.content, 'success');
                } else {
                    const errMsg = terminalType === 'windows' ?
                        `The system cannot find the file specified.` :
                        terminalType === 'powershell' ?
                        `Get-Content : Cannot find path '${args[0]}'` :
                        `cat: ${args[0]}: No such file`;
                    printOutput(errMsg, 'error');
                }
            }
            break;

        case 'mkdir':
            let dirName = args[0];
            // Handle PowerShell New-Item syntax
            if (terminalType === 'powershell' && args.includes('-ItemType')) {
                const nameIndex = args.findIndex(a => a !== '-ItemType' && a !== 'Directory');
                dirName = args[nameIndex];
            }

            if (!dirName) {
                const errMsg = terminalType === 'windows' ?
                    'The syntax of the command is incorrect.' :
                    terminalType === 'powershell' ?
                    'New-Item : Missing required parameter' :
                    'mkdir: missing operand';
                printOutput(errMsg, 'error');
            } else {
                const parentDir = getDir(currentPath);
                if (parentDir && parentDir.type === 'dir') {
                    parentDir.contents[dirName] = { type: 'dir', contents: {} };
                    if (terminalType === 'powershell') {
                        printOutput(`    Directory: C:\\Users\\bagelbyte${currentPath === '~' ? '' : currentPath.replace('~', '').replace(/\//g, '\\')}\n\nMode    Name\n----    ----\nd----   ${dirName}`, 'success');
                    } else {
                        printOutput(`Created directory: ${dirName}`, 'success');
                    }

                    if (dirName === 'myproject' && !state.challengesCompleted.has('term-create')) {
                        state.challengesCompleted.add('term-create');
                        addXP(25);
                        showAchievement('Terminal: File Creator');
                    }
                }
            }
            break;

        case 'clear':
            output.innerHTML = '';
            break;

        case 'ping':
            if (!args[0]) {
                printOutput(terminalType === 'powershell' ?
                    'Test-Connection : Missing required parameter' :
                    'ping: missing host', 'error');
            } else {
                if (terminalType === 'powershell') {
                    printOutput(`Source        Destination     IPV4Address      Bytes    Time(ms)`, 'success');
                    printOutput(`------        -----------     -----------      -----    --------`, 'success');
                    printOutput(`DESKTOP       ${args[0]}      93.184.216.34    32       12`, 'success');
                    printOutput(`DESKTOP       ${args[0]}      93.184.216.34    32       11`, 'success');
                } else {
                    printOutput(`PING ${args[0]}`, 'success');
                    printOutput('64 bytes from server: icmp_seq=1 ttl=64 time=12.3ms', 'success');
                    printOutput('64 bytes from server: icmp_seq=2 ttl=64 time=11.8ms', 'success');
                    printOutput('--- ping statistics ---', 'success');
                    printOutput('2 packets transmitted, 2 received, 0% packet loss', 'success');
                }
            }
            break;

        case 'network':
            if (terminalType === 'powershell') {
                printOutput(`InterfaceAlias       : Ethernet
InterfaceIndex       : 12
IPv4Address          : 192.168.1.100
IPv4DefaultGateway   : 192.168.1.1
DNSServer            : 8.8.8.8, 8.8.4.4`, 'success');
            } else if (terminalType === 'windows') {
                printOutput(`Windows IP Configuration

Ethernet adapter Ethernet:
   IPv4 Address. . . . . . . . . . : 192.168.1.100
   Subnet Mask . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . : 192.168.1.1`, 'success');
            } else {
                printOutput(`eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::1  prefixlen 64  scopeid 0x20<link>
        ether 00:1a:2b:3c:4d:5e  txqueuelen 1000`, 'success');
            }

            if (!state.challengesCompleted.has('term-network')) {
                state.challengesCompleted.add('term-network');
                addXP(30);
                showAchievement('Terminal: Network Explorer');
            }
            break;

        case 'user':
            if (terminalType === 'windows' || terminalType === 'powershell') {
                printOutput('DESKTOP\\bagelbyte', 'success');
            } else {
                printOutput('bagelbyte', 'success');
            }
            break;

        case 'echo':
            printOutput(args.join(' '), 'success');
            break;

        case 'history':
            if (terminalType === 'powershell') {
                printOutput('  Id CommandLine\n  -- -----------', 'success');
                commandHistory.forEach((cmd, i) => {
                    printOutput(`  ${i + 1}  ${cmd}`, 'success');
                });
            } else {
                commandHistory.forEach((cmd, i) => {
                    printOutput(`  ${i + 1}  ${cmd}`, 'success');
                });
            }
            break;

        default:
            const errMsg = terminalType === 'windows' ?
                `'${rawCommand}' is not recognized as an internal or external command.` :
                terminalType === 'powershell' ?
                `${rawCommand} : The term '${rawCommand}' is not recognized as a cmdlet, function, or script.` :
                `Command not found: ${command}. Type 'help' for available commands.`;
            printOutput(errMsg, 'error');
    }

    if (!state.topicsExplored.has('terminal')) {
        state.topicsExplored.add('terminal');
        addXP(10);
    }
}

// Normalize commands across different terminal types
function normalizeCommand(cmd) {
    const cmdLower = cmd.toLowerCase();

    // Help commands
    if (cmdLower === 'help' || cmdLower === 'get-help') return 'help';

    // List commands
    if (cmdLower === 'ls' || cmdLower === 'dir' || cmdLower === 'get-childitem') return 'list';

    // Change directory
    if (cmdLower === 'cd' || cmdLower === 'set-location') return 'cd';

    // Print directory
    if (cmdLower === 'pwd' || cmdLower === 'get-location') return 'pwd';

    // Read file
    if (cmdLower === 'cat' || cmdLower === 'type' || cmdLower === 'get-content') return 'read';

    // Make directory
    if (cmdLower === 'mkdir' || cmdLower === 'new-item') return 'mkdir';

    // Clear
    if (cmdLower === 'clear' || cmdLower === 'cls' || cmdLower === 'clear-host') return 'clear';

    // Network info
    if (cmdLower === 'ipconfig' || cmdLower === 'ifconfig' || cmdLower === 'get-netipconfiguration') return 'network';

    // User
    if (cmdLower === 'whoami') return 'user';

    // Echo
    if (cmdLower === 'echo' || cmdLower === 'write-output') return 'echo';

    // History
    if (cmdLower === 'history' || cmdLower === 'get-history' || cmd === 'doskey') return 'history';

    // Ping
    if (cmdLower === 'ping' || cmdLower === 'test-connection') return 'ping';

    return cmdLower;
}

function printOutput(text, type = 'normal') {
    const output = document.getElementById('terminalOutput');
    const p = document.createElement('p');
    p.textContent = text;
    p.style.whiteSpace = 'pre-wrap';

    if (type === 'error') p.style.color = '#ff4757';
    else if (type === 'success') p.style.color = '#00ff88';
    else if (type === 'command') p.style.color = '#00d4ff';
    else if (type === 'info') p.style.color = '#ffaa00';

    output.appendChild(p);

    const body = document.getElementById('terminalBody');
    body.scrollTop = body.scrollHeight;
}

function updatePrompt() {
    const config = terminalConfigs[terminalType];
    document.getElementById('terminalPrompt').textContent = config.prompt(currentPath);
}

// ==================== QUIZ ====================

function initQuiz() {
    document.querySelectorAll('.quiz-start-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.quiz-card');
            startQuiz(card.dataset.quiz);
        });
    });

    document.getElementById('closeQuizModal').addEventListener('click', closeQuiz);
    document.getElementById('quizNextBtn').addEventListener('click', nextQuestion);
    document.getElementById('retryQuiz').addEventListener('click', () => startQuiz(state.currentQuiz));
    document.getElementById('closeResults').addEventListener('click', closeQuiz);

    // Update quiz scores
    Object.keys(state.quizScores).forEach(quizId => {
        updateQuizScore(quizId);
    });
}

function startQuiz(quizId) {
    const quiz = quizzes[quizId];
    if (!quiz) return;

    state.currentQuiz = quizId;
    state.quizQuestion = 0;
    state.quizCorrect = 0;

    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizModal').classList.add('show');

    showQuestion();
}

function showQuestion() {
    const quiz = quizzes[state.currentQuiz];
    const q = quiz.questions[state.quizQuestion];

    document.getElementById('quizProgress').textContent = `Question ${state.quizQuestion + 1} of ${quiz.questions.length}`;
    document.getElementById('quizProgressFill').style.width = `${((state.quizQuestion) / quiz.questions.length) * 100}%`;
    document.getElementById('quizQuestion').textContent = q.q;

    const optionsDiv = document.getElementById('quizOptions');
    optionsDiv.innerHTML = q.options.map((opt, i) => `
        <div class="quiz-option" data-index="${i}">${opt}</div>
    `).join('');

    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', selectAnswer);
    });

    document.getElementById('quizFeedback').className = 'quiz-feedback';
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('quizNextBtn').style.display = 'none';
}

function selectAnswer(e) {
    const quiz = quizzes[state.currentQuiz];
    const q = quiz.questions[state.quizQuestion];
    const selected = parseInt(e.target.dataset.index);

    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.add('disabled');
        const idx = parseInt(opt.dataset.index);
        if (idx === q.correct) opt.classList.add('correct');
    });

    const feedback = document.getElementById('quizFeedback');

    if (selected === q.correct) {
        e.target.classList.add('correct');
        feedback.textContent = 'Correct!';
        feedback.className = 'quiz-feedback show correct';
        state.quizCorrect++;
    } else {
        e.target.classList.add('wrong');
        feedback.textContent = `Incorrect. The answer was: ${q.options[q.correct]}`;
        feedback.className = 'quiz-feedback show wrong';
    }

    document.getElementById('quizNextBtn').style.display = 'block';
    document.getElementById('quizNextBtn').textContent =
        state.quizQuestion < quiz.questions.length - 1 ? 'Next Question' : 'See Results';
}

function nextQuestion() {
    const quiz = quizzes[state.currentQuiz];

    if (state.quizQuestion < quiz.questions.length - 1) {
        state.quizQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quiz = quizzes[state.currentQuiz];
    const score = Math.round((state.quizCorrect / quiz.questions.length) * 100);

    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    document.getElementById('quizResultText').textContent =
        `You scored ${state.quizCorrect}/${quiz.questions.length} (${score}%)`;

    // Save best score
    if (!state.quizScores[state.currentQuiz] || score > state.quizScores[state.currentQuiz]) {
        state.quizScores[state.currentQuiz] = score;
        saveProgress();
    }

    updateQuizScore(state.currentQuiz);

    // Award XP
    if (score >= 60) {
        addXP(20 + Math.floor(score / 10) * 5);
    }

    if (score === 100) {
        showAchievement('Perfect Quiz Score!');
    }
}

function updateQuizScore(quizId) {
    const scoreMap = {
        hardware: 'hw-score',
        binary: 'bin-score',
        coding: 'code-score',
        networking: 'net-score'
    };

    const scoreEl = document.getElementById(scoreMap[quizId]);
    if (scoreEl && state.quizScores[quizId] !== undefined) {
        scoreEl.textContent = `Best: ${state.quizScores[quizId]}%`;
        if (state.quizScores[quizId] >= 60) {
            scoreEl.classList.add('passed');
        }
    }
}

function closeQuiz() {
    document.getElementById('quizModal').classList.remove('show');
}

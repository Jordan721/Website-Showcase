// ---------- CONFIGURATION ----------
const CONFIG = {
    speed: {
        slow: {
            baseDelay: 200,
            terminalDelay: 100,
            stageDelay: 2500
        },
        normal: {
            baseDelay: 80,
            terminalDelay: 50,
            stageDelay: 1200
        },
        fast: {
            baseDelay: 20,
            terminalDelay: 15,
            stageDelay: 400
        }
    },
    currentSpeed: 'normal',
    maxTableRows: 50,
    terminalMaxLines: 500
};

// ---------- SAMPLE DATA ----------
const SAMPLE_DATA = {
    trades: {
        format: 'csv',
        name: 'Trade Records',
        description: 'Q4 2024 equity trade executions from multiple desks',
        raw: `trade_id,date,ticker,side,quantity,price,desk,trader,status,notes
TRD-001,2024-10-01,AAPL,BUY,500,174.55,EQ-NA,jsmith,FILLED,
TRD-002,2024-10-01,MSFT,SELL,1200,331.20,EQ-NA,jsmith,FILLED,
TRD-003,10/02/2024,GOOGL,BUY,300,,EQ-NA,arao,PARTIAL,missing price at execution
TRD-004,2024-10-02,AMZN,BUY,750,127.74,EQ-NA,arao,FILLED,
TRD-005,2024-10-03,TSLA,sell,0,242.68,EQ-TECH,mwilson,REJECTED,zero quantity error
TRD-006,2024/10/03,META,BUY,400,304.19,,mwilson,FILLED,desk field missing
TRD-007,2024-10-04,NVDA,BUY,250,457.32,EQ-TECH,mwilson,FILLED,
TRD-008,2024-10-04,JPM,SELL,800,147.63,EQ-FIN,N/A,FILLED,trader unknown
TRD-009,2024-10-05,BAC,BUY,1500,27.41,EQ-FIN,cpark,FILLED,
TRD-010,2024-10-05,GS,SELL,200,339.87,EQ-FIN,cpark,filled,
TRD-011,2024-10-07,AAPL,BUY,999999,174.92,EQ-NA,jsmith,FILLED,suspicious quantity
TRD-012,2024-10-07,MSFT,SELL,600,-331.50,EQ-NA,jsmith,FILLED,negative price
TRD-013,2024-10-08,NFLX,BUY,350,398.44,EQ-TECH,arao,FILLED,
TRD-014,2024-10-08,DIS,BUY,450,84.77,EQ-MEDIA,,FILLED,trader blank
TRD-015,2024-10-09,V,SELL,300,232.15,EQ-FIN,cpark,CANCELLED,client cancelled
TRD-016,2024-13-10,MA,BUY,500,381.20,EQ-FIN,cpark,FILLED,invalid month in date
TRD-017,2024-10-10,WMT,BUY,700,163.28,EQ-RETAIL,jlee,FILLED,
TRD-018,2024-10-10,COST,SELL,150,567.90,EQ-RETAIL,jlee,FILLED,
TRD-019,2024-10-11,CRM,BUY,400,212.33,EQ-TECH,mwilson,FILLED,
TRD-020,2024-10-11,,SELL,250,89.45,EQ-NA,jsmith,FILLED,missing ticker`,
        schema: {
            trade_id: {
                type: 'string',
                required: true,
                pattern: /^TRD-\d{3,}$/
            },
            date: {
                type: 'date',
                required: true
            },
            ticker: {
                type: 'string',
                required: true
            },
            side: {
                type: 'enum',
                required: true,
                values: ['BUY', 'SELL']
            },
            quantity: {
                type: 'integer',
                required: true,
                min: 1,
                max: 100000
            },
            price: {
                type: 'float',
                required: true,
                min: 0.01
            },
            desk: {
                type: 'string',
                required: false,
                default: 'UNKNOWN'
            },
            trader: {
                type: 'string',
                required: false,
                default: 'UNASSIGNED'
            },
            status: {
                type: 'enum',
                required: true,
                values: ['FILLED', 'PARTIAL', 'REJECTED', 'CANCELLED']
            },
            notes: {
                type: 'string',
                required: false,
                default: ''
            }
        }
    },

    clients: {
        format: 'json',
        name: 'Client Accounts',
        description: 'Institutional client account records with compliance data',
        raw: JSON.stringify([{
                acct_id: "ACC-10001",
                name: "Meridian Capital Partners",
                type: "INST",
                aum: 2400000000,
                region: "NA",
                risk_rating: "MODERATE",
                kyc_complete: true,
                last_review: "2024-06-15"
            },
            {
                acct_id: "ACC-10002",
                name: "Pinnacle Wealth Mgmt",
                type: "inst",
                aum: "890M",
                region: "NA",
                risk_rating: "LOW",
                kyc_complete: true,
                last_review: "2024-08-22"
            },
            {
                acct_id: "ACC-10003",
                name: "",
                type: "HF",
                aum: 5100000000,
                region: "EMEA",
                risk_rating: "HIGH",
                kyc_complete: false,
                last_review: "2023-01-10"
            },
            {
                acct_id: "ACC-10004",
                name: "Nordic Pension Fund",
                type: "PENS",
                aum: 12000000000,
                region: null,
                risk_rating: "LOW",
                kyc_complete: true,
                last_review: "2024-09-01"
            },
            {
                acct_id: null,
                name: "Sakura Asset Management",
                type: "INST",
                aum: 3200000000,
                region: "APAC",
                risk_rating: "MODERATE",
                kyc_complete: true,
                last_review: "2024-07-18"
            },
            {
                acct_id: "ACC-10006",
                name: "Granite Point Capital",
                type: "HF",
                aum: -500000000,
                region: "NA",
                risk_rating: "EXTREME",
                kyc_complete: true,
                last_review: "2024-10-05"
            },
            {
                acct_id: "ACC-10007",
                name: "Evergreen Endowment",
                type: "ENDOW",
                aum: 750000000,
                region: "NA",
                risk_rating: "LOW",
                kyc_complete: true,
                last_review: "2024-04-30"
            },
            {
                acct_id: "ACC-10008",
                name: "Atlas Global Macro Fund",
                type: "HF",
                aum: 8900000000,
                region: "EMEA",
                risk_rating: "HIGH",
                kyc_complete: true,
                last_review: "2024-11-01"
            }
        ], null, 2),
        schema: {
            acct_id: {
                type: 'string',
                required: true,
                pattern: /^ACC-\d{5}$/
            },
            name: {
                type: 'string',
                required: true
            },
            type: {
                type: 'enum',
                required: true,
                values: ['INST', 'HF', 'PENS', 'ENDOW', 'RETAIL']
            },
            aum: {
                type: 'float',
                required: true,
                min: 0
            },
            region: {
                type: 'enum',
                required: true,
                values: ['NA', 'EMEA', 'APAC', 'LATAM']
            },
            risk_rating: {
                type: 'enum',
                required: true,
                values: ['LOW', 'MODERATE', 'HIGH']
            },
            kyc_complete: {
                type: 'boolean',
                required: true
            },
            last_review: {
                type: 'date',
                required: true
            }
        }
    },

    logs: {
        format: 'text',
        name: 'Server Logs',
        description: 'Application server logs from trading platform VM',
        raw: `2024-10-01 08:00:01 INFO  [main] Application startup initiated
2024-10-01 08:00:03 INFO  [main] Connected to database cluster db-prod-east-1
2024-10-01 08:00:04 WARN  [pool] Connection pool size below threshold: 3/10
2024-10-01 08:00:15 INFO  [auth] User jsmith authenticated via SSO
2024-10-01 08:00:16 ERROR [trade] Failed to route order ORD-44210: timeout after 30000ms
2024-10-01 08:00:16 INFO  [trade] Retrying order ORD-44210 (attempt 2/3)
2024-10-01 08:00:17 INFO  [trade] Order ORD-44210 routed successfully
2024-10-01 08:00:30 INFO  [market] Price feed connected: NYSE, NASDAQ
2024-10-01 08:00:31 WARN  [market] LSE price feed delayed: latency 450ms
2024-10-01 08:01:00 INFO  [scheduler] Batch job RECON-DAILY started
2024-10-01 08:01:45 INFO  [scheduler] Batch job RECON-DAILY completed: 12,847 records processed
2024-10-01 08:02:00 ERROR [report] Report generation failed: OutOfMemoryError
2024-10-01 08:02:01 WARN  [monitor] Heap usage at 89% — consider scaling
2024-10-01 08:02:10 INFO  [gc] Full GC completed: freed 2.1GB in 340ms
2024-10-01 08:02:15 INFO  [report] Report generation retried: success`,
        schema: {
            timestamp: {
                type: 'datetime',
                required: true
            },
            level: {
                type: 'enum',
                required: true,
                values: ['INFO', 'WARN', 'ERROR', 'DEBUG']
            },
            component: {
                type: 'string',
                required: true
            },
            message: {
                type: 'string',
                required: true
            }
        }
    },

    custom: {
        format: 'csv',
        name: 'Custom File',
        description: 'User-uploaded data file',
        raw: '',
        schema: {}
    }
};

// ---------- STATE ----------
const AppState = {
    isRunning: false,
    currentStage: null,
    selectedDataSource: 'trades',
    rawData: null,
    parsedData: null,
    parsedHeaders: null,
    cleanedData: null,
    transformedData: null,
    errors: [],
    warnings: [],
    stats: {
        totalRecords: 0,
        cleanedRecords: 0,
        errorCount: 0,
        warningCount: 0,
        startTime: null,
        endTime: null
    },
    stageTiming: {},
    userUploadedData: null,
    isCustomData: false,

    reset() {
        this.isRunning = false;
        this.currentStage = null;
        this.rawData = null;
        this.parsedData = null;
        this.parsedHeaders = null;
        this.cleanedData = null;
        this.transformedData = null;
        this.errors = [];
        this.warnings = [];
        this.stats = {
            totalRecords: 0,
            cleanedRecords: 0,
            errorCount: 0,
            warningCount: 0,
            startTime: null,
            endTime: null
        };
        this.stageTiming = {};
        this.userUploadedData = null;
        this.isCustomData = false;
    }
};

// ---------- DOM REFERENCES ----------
const DOM = {
    init() {
        this.runBtn = document.getElementById('run-pipeline-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.dataSourceSelect = document.getElementById('data-source-select');
        this.terminalBody = document.getElementById('terminal-body');
        this.outputTableHead = document.getElementById('output-table-head');
        this.outputTableBody = document.getElementById('output-table-body');
        this.exportCsvBtn = document.getElementById('export-csv-btn');
        this.exportXlsxBtn = document.getElementById('export-xlsx-btn');
        this.dropZone = document.getElementById('drop-zone');
        this.fileInput = document.getElementById('file-input');
        this.jsonOutput = document.getElementById('json-output');
        this.statsGrid = document.getElementById('stats-grid');
        this.rawPreview = document.getElementById('raw-data-preview');
        this.processedPreview = document.getElementById('processed-data-preview');
        this.stages = {
            input: document.getElementById('stage-input'),
            parse: document.getElementById('stage-parse'),
            clean: document.getElementById('stage-clean'),
            transform: document.getElementById('stage-transform'),
            output: document.getElementById('stage-output')
        };
        this.statRecords = document.getElementById('stat-records');
        this.statCleaned = document.getElementById('stat-cleaned');
        this.statErrors = document.getElementById('stat-errors');
        this.statTime = document.getElementById('stat-time');
    }
};

// ---------- UTILITIES ----------
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function timestamp() {
    const now = new Date();
    return now.toTimeString().substring(0, 8) + '.' + String(now.getMilliseconds()).padStart(3, '0');
}

function formatDuration(ms) {
    if (ms < 1000) return ms + 'ms';
    return (ms / 1000).toFixed(2) + 's';
}

function progressBar(percent, width) {
    width = width || 30;
    const filled = Math.round((percent / 100) * width);
    const empty = width - filled;
    const bar = '\u2588'.repeat(filled) + '\u2591'.repeat(empty);
    return '[' + bar + '] ' + percent.toFixed(0) + '%';
}

function detectDelimiter(text) {
    var candidates = ['\t', ',', ';', '|'];
    var lines = text.trim().split('\n').slice(0, 10);
    if (lines.length === 0) return ',';

    var best = ',';
    var bestScore = -1;

    for (var c = 0; c < candidates.length; c++) {
        var delim = candidates[c];
        var headerCount = lines[0].split(delim).length;
        if (headerCount < 2) continue;

        // Score = header column count, penalized by inconsistency across rows
        var consistent = 0;
        for (var i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            var colCount = lines[i].split(delim).length;
            if (colCount === headerCount) consistent++;
        }
        var dataLines = lines.length - 1;
        var score = headerCount * 10 + (dataLines > 0 ? (consistent / dataLines) * 100 : 0);

        if (score > bestScore) {
            bestScore = score;
            best = delim;
        }
    }
    return best;
}

function parseCSV(text) {
    var delimiter = detectDelimiter(text);
    const lines = text.trim().split('\n');
    const headers = lines[0].split(delimiter).map(function (h) {
        return h.trim();
    });
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const values = lines[i].split(delimiter);
        const row = {};
        headers.forEach(function (h, idx) {
            row[h] = (values[idx] !== undefined ? values[idx] : '').trim();
        });
        rows.push(row);
    }
    return {
        headers: headers,
        rows: rows
    };
}

function parseJSON(text) {
    const data = JSON.parse(text);
    const arr = Array.isArray(data) ? data : [data];
    const headers = Object.keys(arr[0] || {});
    return {
        headers: headers,
        rows: arr
    };
}

function parseLogText(text) {
    const lines = text.trim().split('\n');
    const rows = lines.map(function (line) {
        const match = line.match(/^(\S+ \S+)\s+(\w+)\s+\[(\w+)\]\s+(.+)$/);
        if (match) {
            return {
                timestamp: match[1],
                level: match[2],
                component: match[3],
                message: match[4]
            };
        }
        return {
            timestamp: '',
            level: 'UNKNOWN',
            component: 'unknown',
            message: line
        };
    });
    return {
        headers: ['timestamp', 'level', 'component', 'message'],
        rows: rows
    };
}

function normalizeDateString(str) {
    if (!str || typeof str !== 'string') return null;

    // YYYY-MM-DD
    let match = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
        const m = parseInt(match[2], 10);
        const d = parseInt(match[3], 10);
        if (m < 1 || m > 12 || d < 1 || d > 31) return null;
        return match[1] + '-' + match[2] + '-' + match[3];
    }

    // MM/DD/YYYY
    match = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (match) {
        const m = parseInt(match[1], 10);
        const d = parseInt(match[2], 10);
        if (m < 1 || m > 12 || d < 1 || d > 31) return null;
        return match[3] + '-' + match[1] + '-' + match[2];
    }

    // YYYY/MM/DD
    match = str.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
    if (match) {
        const m = parseInt(match[2], 10);
        const d = parseInt(match[3], 10);
        if (m < 1 || m > 12 || d < 1 || d > 31) return null;
        return match[1] + '-' + match[2] + '-' + match[3];
    }

    return null;
}

function buildDynamicSchema(headers, rows) {
    var schema = {};
    headers.forEach(function (h) {
        var numericCount = 0;
        var dateCount = 0;
        var sampleCount = 0;

        for (var i = 0; i < Math.min(rows.length, 10); i++) {
            var val = rows[i][h];
            if (val === null || val === undefined || String(val).trim() === '') continue;
            sampleCount++;
            var strVal = String(val).trim();
            if (!isNaN(Number(strVal))) numericCount++;
            if (normalizeDateString(strVal)) dateCount++;
        }

        if (sampleCount === 0) {
            schema[h] = {
                type: 'string',
                required: false,
                default: ''
            };
        } else if (numericCount === sampleCount) {
            schema[h] = {
                type: 'float',
                required: false
            };
        } else if (dateCount === sampleCount) {
            schema[h] = {
                type: 'date',
                required: false
            };
        } else {
            schema[h] = {
                type: 'string',
                required: false
            };
        }
    });
    return schema;
}

// ---------- TERMINAL ENGINE ----------
const Terminal = {
    lineCount: 0,

    clear() {
        DOM.terminalBody.innerHTML = '';
        this.lineCount = 0;
    },

    async print(text, colorClass, options) {
        colorClass = colorClass || '';
        options = options || {};
        const noTimestamp = options.noTimestamp || false;
        const indent = options.indent || 0;

        const line = document.createElement('div');
        line.className = 'terminal-line ' + colorClass;

        const prefix = noTimestamp ? '' : '[' + timestamp() + '] ';
        const indentStr = ' '.repeat(indent);
        line.textContent = prefix + indentStr + text;

        DOM.terminalBody.appendChild(line);
        this.lineCount++;

        if (this.lineCount > CONFIG.terminalMaxLines) {
            DOM.terminalBody.removeChild(DOM.terminalBody.firstChild);
            this.lineCount--;
        }

        DOM.terminalBody.scrollTop = DOM.terminalBody.scrollHeight;

        const speed = CONFIG.speed[CONFIG.currentSpeed];
        await delay(speed.terminalDelay);
    },

    async blank() {
        await this.print('', '', {
            noTimestamp: true
        });
    },

    async info(text, opts) {
        await this.print('INFO    ' + text, 't-blue', opts);
    },
    async success(text, opts) {
        await this.print('SUCCESS ' + text, 't-green', opts);
    },
    async warn(text, opts) {
        await this.print('WARN    ' + text, 't-yellow', opts);
    },
    async error(text, opts) {
        await this.print('ERROR   ' + text, 't-red', opts);
    },

    async header(text) {
        await this.blank();
        await this.print('='.repeat(60), 't-muted', {
            noTimestamp: true
        });
        await this.print('  ' + text, 't-bold', {
            noTimestamp: true
        });
        await this.print('='.repeat(60), 't-muted', {
            noTimestamp: true
        });
    },

    async progressBarAnim(label, durationMs) {
        const steps = 20;
        const line = document.createElement('div');
        line.className = 'terminal-line t-blue';
        DOM.terminalBody.appendChild(line);
        DOM.terminalBody.scrollTop = DOM.terminalBody.scrollHeight;

        const stepDelay = durationMs / steps;
        for (let i = 0; i <= steps; i++) {
            const pct = (i / steps) * 100;
            line.textContent = '[' + timestamp() + '] ' + label + ' ' + progressBar(pct);
            await delay(stepDelay);
            DOM.terminalBody.scrollTop = DOM.terminalBody.scrollHeight;
        }
    },

    async table(headers, rows, maxRows) {
        maxRows = maxRows || 5;
        const display = rows.slice(0, maxRows);

        // Calculate column widths
        const colWidths = headers.map(function (h, idx) {
            let maxW = h.length;
            display.forEach(function (row) {
                const val = String(row[h] !== undefined ? row[h] : '');
                if (val.length > maxW) maxW = val.length;
            });
            return Math.min(Math.max(maxW, 6), 20);
        });

        function formatRow(vals) {
            return '| ' + vals.map(function (v, i) {
                const s = String(v);
                if (s.length > colWidths[i]) return s.substring(0, colWidths[i] - 1) + '\u2026';
                return s + ' '.repeat(colWidths[i] - s.length);
            }).join(' | ') + ' |';
        }

        const sep = '+' + colWidths.map(function (w) {
            return '-'.repeat(w + 2);
        }).join('+') + '+';

        await this.print(sep, 't-muted', {
            noTimestamp: true
        });
        await this.print(formatRow(headers), 't-blue', {
            noTimestamp: true
        });
        await this.print(sep, 't-muted', {
            noTimestamp: true
        });

        for (const row of display) {
            const vals = headers.map(function (h) {
                return row[h] !== undefined ? row[h] : '';
            });
            await this.print(formatRow(vals), '', {
                noTimestamp: true
            });
        }

        if (rows.length > maxRows) {
            await this.print('  ... and ' + (rows.length - maxRows) + ' more rows', 't-muted', {
                noTimestamp: true
            });
        }
        await this.print(sep, 't-muted', {
            noTimestamp: true
        });
    }
};

// ---------- PIPELINE ENGINE ----------
const Pipeline = {
    stageOrder: ['input', 'parse', 'clean', 'transform', 'output'],

    setStageState(stageName, state) {
        const el = DOM.stages[stageName];
        if (!el) return;
        el.setAttribute('data-state', state);

        const statusEl = el.querySelector('.stage-status');
        const statusMap = {
            idle: 'Idle',
            active: 'Processing...',
            complete: 'Complete',
            error: 'Error'
        };
        if (statusEl) statusEl.textContent = statusMap[state] || state;
    },

    activateConnector(index) {
        const connectors = document.querySelectorAll('.pipeline-connector .connector-line');
        if (connectors[index]) {
            connectors[index].classList.remove('active');
            // Force reflow to restart animation
            void connectors[index].offsetWidth;
            connectors[index].classList.add('active');
        }
    },

    resetAll() {
        this.stageOrder.forEach(function (name) {
            Pipeline.setStageState(name, 'idle');
        });
        document.querySelectorAll('.connector-line').forEach(function (el) {
            el.classList.remove('active');
        });
    },

    async runStage(stageName, fn) {
        AppState.currentStage = stageName;
        this.setStageState(stageName, 'active');

        const idx = this.stageOrder.indexOf(stageName);
        if (idx > 0) this.activateConnector(idx - 1);

        const stageStart = Date.now();
        try {
            await fn();
            this.setStageState(stageName, 'complete');
        } catch (err) {
            this.setStageState(stageName, 'error');
            throw err;
        }
        AppState.stageTiming[stageName] = Date.now() - stageStart;

        const speed = CONFIG.speed[CONFIG.currentSpeed];
        await delay(speed.baseDelay * 3);
    },

    async run() {
        if (AppState.isRunning) return;
        AppState.isRunning = true;
        AppState.stats.startTime = Date.now();

        // UI updates
        DOM.runBtn.classList.add('running');
        DOM.runBtn.textContent = 'Running...';
        DOM.resetBtn.disabled = true;
        DOM.exportCsvBtn.disabled = true;
        DOM.exportXlsxBtn.disabled = true;
        var demoEl = document.getElementById('demo-btn');
        if (demoEl) demoEl.disabled = true;

        this.resetAll();
        Terminal.clear();

        const speed = CONFIG.speed[CONFIG.currentSpeed];
        const source = SAMPLE_DATA[AppState.selectedDataSource];

        try {
            // Startup
            await Terminal.print('$ python pipeline_runner.py --source ' + source.name.toLowerCase().replace(/ /g, '_') + ' --verbose', 't-green', {
                noTimestamp: true
            });
            await Terminal.blank();
            await Terminal.info('Pipeline Engine v3.2.1 initialized');
            await Terminal.info('Runtime: Browser simulation | Speed: ' + CONFIG.currentSpeed);
            await Terminal.info('Data source: ' + source.name + ' (' + source.format.toUpperCase() + ')');
            await Terminal.blank();

            // ===== STAGE 1: INPUT =====
            await this.runStage('input', async function () {
                await Terminal.header('STAGE 1: INPUT \u2014 File Ingestion');

                if (AppState.selectedDataSource === 'custom' && !AppState.userUploadedData) {
                    await Terminal.error('No file uploaded. Please drop a file in the upload area first.');
                    throw new Error('No file uploaded for custom data source');
                }

                AppState.rawData = AppState.userUploadedData || source.raw;

                await Terminal.info('Loading data source: ' + source.name);
                await Terminal.info('Format detected: ' + source.format.toUpperCase());
                await Terminal.info('Raw size: ' + AppState.rawData.length + ' bytes');
                await Terminal.progressBarAnim('Reading file', speed.stageDelay * 0.5);
                await Terminal.success('File loaded successfully');

                // Show raw preview
                const preview = AppState.rawData.substring(0, 600);
                DOM.rawPreview.textContent = preview + (AppState.rawData.length > 600 ? '\n...' : '');

                const lineCount = AppState.rawData.trim().split('\n').length;
                AppState.stats.totalRecords = source.format === 'csv' ? lineCount - 1 : lineCount;
                DOM.statRecords.textContent = AppState.stats.totalRecords;
            });

            // ===== STAGE 2: PARSE =====
            await this.runStage('parse', async function () {
                await Terminal.header('STAGE 2: PARSE \u2014 Structure Extraction');

                await Terminal.info('Parsing ' + source.format.toUpperCase() + ' format...');

                let result;
                if (source.format === 'csv') result = parseCSV(AppState.rawData);
                else if (source.format === 'json') result = parseJSON(AppState.rawData);
                else result = parseLogText(AppState.rawData);

                AppState.parsedData = result.rows;
                AppState.parsedHeaders = result.headers;
                AppState.stats.totalRecords = result.rows.length;

                await Terminal.info('Detected ' + result.headers.length + ' columns: ' + result.headers.join(', '));
                await Terminal.progressBarAnim('Parsing records', speed.stageDelay * 0.6);
                await Terminal.info('Parsed ' + result.rows.length + ' records');
                await Terminal.blank();
                await Terminal.info('Sample parsed records:');
                await Terminal.table(result.headers, result.rows, 3);
                await Terminal.success('Parse stage complete');

                DOM.statRecords.textContent = result.rows.length;
            });

            // ===== STAGE 3: CLEAN =====
            await this.runStage('clean', async function () {
                await Terminal.header('STAGE 3: CLEAN \u2014 Validation & Repair');

                let schema = source.schema;

                if (AppState.selectedDataSource === 'custom') {
                    AppState.isCustomData = true;
                    schema = buildDynamicSchema(AppState.parsedHeaders || [], AppState.parsedData);
                    await Terminal.info('Custom data detected \u2014 using dynamic schema');
                } else if (AppState.userUploadedData) {
                    // User uploaded a file but selected a preset source — check header match
                    const presetFields = Object.keys(source.schema);
                    const parsedFields = AppState.parsedHeaders || [];
                    const matchCount = parsedFields.filter(function (f) {
                        return presetFields.includes(f);
                    }).length;
                    if (matchCount < presetFields.length * 0.5) {
                        AppState.isCustomData = true;
                        schema = buildDynamicSchema(parsedFields, AppState.parsedData);
                        await Terminal.info('Custom data detected \u2014 using dynamic schema');
                    }
                }

                const schemaFields = Object.keys(schema);
                const cleaned = [];
                let warningCount = 0;
                let errorCount = 0;

                await Terminal.info('Applying schema validation rules...');
                await Terminal.info('Schema: ' + schemaFields.length + ' field definitions loaded');
                await Terminal.blank();

                for (let i = 0; i < AppState.parsedData.length; i++) {
                    const row = {};
                    // Copy all original fields
                    Object.keys(AppState.parsedData[i]).forEach(function (k) {
                        row[k] = AppState.parsedData[i][k];
                    });

                    let rowHasError = false;

                    for (const [field, rules] of Object.entries(schema)) {
                        let value = row[field];

                        // Normalize null-like values
                        if (value === null || value === undefined) value = '';
                        if (typeof value === 'string') value = value.trim();
                        const isEmpty = value === '' || value === 'N/A' || value === 'null' || value === 'undefined';

                        // Required + missing check
                        if (rules.required && isEmpty) {
                            if (rules.default !== undefined) {
                                row[field] = rules.default;
                                AppState.warnings.push({
                                    row: i + 1,
                                    field: field,
                                    message: 'Missing value replaced with default: ' + rules.default
                                });
                                warningCount++;
                                await Terminal.warn('Row ' + (i + 1) + ': ' + field + ' missing \u2014 defaulted to "' + rules.default+'"');
                            } else {
                                AppState.errors.push({
                                    row: i + 1,
                                    field: field,
                                    message: 'Required field missing'
                                });
                                errorCount++;
                                rowHasError = true;
                                await Terminal.error('Row ' + (i + 1) + ': ' + field + ' is required but missing');
                            }
                            continue;
                        }

                        if (isEmpty) continue;

                        // Enum normalization
                        if (rules.type === 'enum') {
                            const upper = String(value).toUpperCase();
                            if (rules.values && !rules.values.includes(upper)) {
                                AppState.errors.push({
                                    row: i + 1,
                                    field: field,
                                    message: 'Invalid enum value: ' + value
                                });
                                errorCount++;
                                rowHasError = true;
                                await Terminal.error('Row ' + (i + 1) + ': ' + field + '="' + value + '" not in [' + rules.values.join(', ') + ']');
                            } else {
                                if (String(value) !== upper) {
                                    await Terminal.warn('Row ' + (i + 1) + ': ' + field + ' normalized "' + value + '" \u2192 "' + upper + '"');
                                    warningCount++;
                                    AppState.warnings.push({
                                        row: i + 1,
                                        field: field,
                                        message: 'Normalized to ' + upper
                                    });
                                }
                                row[field] = upper;
                            }
                        }

                        // Date normalization
                        if (rules.type === 'date') {
                            const normalized = normalizeDateString(String(value));
                            if (!normalized) {
                                AppState.errors.push({
                                    row: i + 1,
                                    field: field,
                                    message: 'Invalid date: ' + value
                                });
                                errorCount++;
                                rowHasError = true;
                                await Terminal.error('Row ' + (i + 1) + ': ' + field + '="' + value + '" is not a valid date');
                            } else if (normalized !== String(value)) {
                                await Terminal.warn('Row ' + (i + 1) + ': ' + field + ' normalized "' + value + '" \u2192 "' + normalized + '"');
                                warningCount++;
                                AppState.warnings.push({
                                    row: i + 1,
                                    field: field,
                                    message: 'Date normalized'
                                });
                                row[field] = normalized;
                            }
                        }

                        // Numeric range checks
                        if (rules.type === 'integer' || rules.type === 'float') {
                            const num = Number(value);
                            if (isNaN(num)) {
                                AppState.errors.push({
                                    row: i + 1,
                                    field: field,
                                    message: 'Not a valid number: ' + value
                                });
                                errorCount++;
                                rowHasError = true;
                                await Terminal.error('Row ' + (i + 1) + ': ' + field + '="' + value + '" is not numeric');
                            } else {
                                if (rules.min !== undefined && num < rules.min) {
                                    AppState.errors.push({
                                        row: i + 1,
                                        field: field,
                                        message: 'Value ' + num + ' below minimum ' + rules.min
                                    });
                                    errorCount++;
                                    rowHasError = true;
                                    await Terminal.error('Row ' + (i + 1) + ': ' + field + '=' + num + ' below min ' + rules.min);
                                }
                                if (rules.max !== undefined && num > rules.max) {
                                    AppState.errors.push({
                                        row: i + 1,
                                        field: field,
                                        message: 'Value ' + num + ' exceeds maximum ' + rules.max
                                    });
                                    errorCount++;
                                    rowHasError = true;
                                    await Terminal.error('Row ' + (i + 1) + ': ' + field + '=' + num + ' exceeds max ' + rules.max);
                                }
                                row[field] = num;
                            }
                        }

                        // Boolean normalization
                        if (rules.type === 'boolean') {
                            if (typeof value === 'string') {
                                row[field] = value.toLowerCase() === 'true';
                            }
                        }

                        // Pattern check
                        if (rules.pattern && typeof value === 'string' && value !== '' && !rules.pattern.test(value)) {
                            AppState.warnings.push({
                                row: i + 1,
                                field: field,
                                message: 'Value does not match expected pattern'
                            });
                            warningCount++;
                            await Terminal.warn('Row ' + (i + 1) + ': ' + field + '="' + value + '" does not match expected pattern');
                        }
                    }

                    row._hasError = rowHasError;
                    row._rowIndex = i + 1;
                    cleaned.push(row);
                }

                AppState.cleanedData = cleaned;
                AppState.stats.errorCount = errorCount;
                AppState.stats.warningCount = warningCount;
                AppState.stats.cleanedRecords = cleaned.filter(function (r) {
                    return !r._hasError;
                }).length;

                await Terminal.blank();
                await Terminal.info('Cleaning summary:');
                await Terminal.success('  Valid records: ' + AppState.stats.cleanedRecords);
                await Terminal.warn('  Warnings: ' + warningCount);
                await Terminal.error('  Errors: ' + errorCount);
                await Terminal.success('Clean stage complete');

                DOM.statCleaned.textContent = AppState.stats.cleanedRecords;
                DOM.statErrors.textContent = errorCount;
            });

            // ===== STAGE 4: TRANSFORM =====
            await this.runStage('transform', async function () {
                await Terminal.header('STAGE 4: TRANSFORM \u2014 Schema Mapping & Enrichment');

                const validRows = AppState.cleanedData.filter(function (r) {
                    return !r._hasError;
                });
                await Terminal.info('Transforming ' + validRows.length + ' valid records...');

                const transformed = [];
                const deskMap = {
                    'EQ-NA': 'Equities - North America',
                    'EQ-TECH': 'Equities - Technology',
                    'EQ-FIN': 'Equities - Financials',
                    'EQ-MEDIA': 'Equities - Media & Entertainment',
                    'EQ-RETAIL': 'Equities - Retail',
                    'UNKNOWN': 'Unassigned Desk'
                };

                for (let i = 0; i < validRows.length; i++) {
                    const row = {};
                    Object.keys(validRows[i]).forEach(function (k) {
                        if (k !== '_hasError' && k !== '_rowIndex') {
                            row[k] = validRows[i][k];
                        }
                    });

                    const rowIdx = validRows[i]._rowIndex;

                    // Trade-specific computed fields
                    if (row.quantity !== undefined && row.price !== undefined) {
                        const qty = Number(row.quantity);
                        const prc = Number(row.price);
                        if (!isNaN(qty) && !isNaN(prc)) {
                            row.total_value = (qty * prc).toFixed(2);
                        }
                    }

                    // Desk full name
                    if (row.desk) {
                        row.desk_full = deskMap[row.desk] || row.desk;
                    }

                    // AUM formatting for client data
                    if (row.aum !== undefined) {
                        const aum = Number(row.aum);
                        if (!isNaN(aum) && aum >= 1e9) {
                            row.aum_display = '$' + (aum / 1e9).toFixed(1) + 'B';
                        } else if (!isNaN(aum) && aum >= 1e6) {
                            row.aum_display = '$' + (aum / 1e6).toFixed(0) + 'M';
                        }
                    }

                    // Data quality score
                    let score = 100;
                    const rowWarnings = AppState.warnings.filter(function (w) {
                        return w.row === rowIdx;
                    });
                    score -= rowWarnings.length * 15;
                    row.data_quality = Math.max(0, score);

                    transformed.push(row);
                }

                AppState.transformedData = transformed;

                await Terminal.progressBarAnim('Applying transformations', speed.stageDelay * 0.6);

                // Report what was added
                const addedCols = [];
                if (transformed[0]) {
                    if (transformed[0].total_value !== undefined) addedCols.push('total_value');
                    if (transformed[0].desk_full !== undefined) addedCols.push('desk_full');
                    if (transformed[0].aum_display !== undefined) addedCols.push('aum_display');
                    addedCols.push('data_quality');
                }
                await Terminal.info('Added computed columns: ' + addedCols.join(', '));

                await Terminal.blank();
                await Terminal.info('Sample transformed records:');
                const displayHeaders = Object.keys(transformed[0] || {}).slice(0, 6);
                await Terminal.table(displayHeaders, transformed, 3);
                await Terminal.success('Transform stage complete');
            });

            // ===== STAGE 5: OUTPUT =====
            await this.runStage('output', async function () {
                await Terminal.header('STAGE 5: OUTPUT \u2014 Export & Delivery');

                await Terminal.info('Generating output table...');
                Output.renderTable(AppState.transformedData);

                await Terminal.info('Preparing JSON output...');
                Output.renderJSON(AppState.transformedData);

                await Terminal.info('Computing statistics...');
                Output.renderStats(AppState.transformedData);

                // Processed preview
                DOM.processedPreview.textContent = JSON.stringify(AppState.transformedData.slice(0, 3), null, 2);

                await Terminal.progressBarAnim('Finalizing output', speed.stageDelay * 0.4);
                await Terminal.info('Output ready: ' + AppState.transformedData.length + ' records');

                DOM.exportCsvBtn.disabled = false;
                DOM.exportXlsxBtn.disabled = false;

                await Terminal.success('Output stage complete');
            });

            // ===== FINAL SUMMARY =====
            AppState.stats.endTime = Date.now();
            const duration = AppState.stats.endTime - AppState.stats.startTime;

            await Terminal.header('PIPELINE COMPLETE');
            await Terminal.success('Total records processed: ' + AppState.stats.totalRecords);
            await Terminal.success('Valid output records: ' + AppState.transformedData.length);
            await Terminal.warn('Warnings encountered: ' + AppState.stats.warningCount);
            if (AppState.stats.errorCount > 0) {
                await Terminal.error('Errors encountered: ' + AppState.stats.errorCount);
            }
            await Terminal.success('Total duration: ' + formatDuration(duration));
            await Terminal.blank();
            await Terminal.print('Pipeline exited with code 0', 't-green');

            DOM.statTime.textContent = formatDuration(duration);

            // Render analytics charts
            Charts.renderAll();

        } catch (err) {
            await Terminal.error('FATAL: ' + err.message);
            await Terminal.print('Pipeline exited with code 1', 't-red');
            console.error(err);
        } finally {
            AppState.isRunning = false;
            DOM.runBtn.classList.remove('running');
            DOM.runBtn.innerHTML = '<span class="btn-icon">&#9654;</span> Run Pipeline';
            DOM.resetBtn.disabled = false;
            var demoEl = document.getElementById('demo-btn');
            if (demoEl) demoEl.disabled = false;
        }
    }
};

// ---------- OUTPUT & EXPORT ----------
const Output = {
    renderTable(data) {
        if (!data || data.length === 0) return;

        const headers = Object.keys(data[0]);
        DOM.outputTableHead.innerHTML = '<tr>' +
            headers.map(function (h) {
                return '<th>' + h + '</th>';
            }).join('') + '</tr>';

        const rows = data.slice(0, CONFIG.maxTableRows);
        DOM.outputTableBody.innerHTML = rows.map(function (row, idx) {
            return '<tr style="animation-delay:' + (idx * 0.03) + 's">' +
                headers.map(function (h) {
                    const val = row[h] !== undefined ? row[h] : '';
                    return '<td>' + escapeHtml(String(val)) + '</td>';
                }).join('') + '</tr>';
        }).join('');

        document.getElementById('row-count').textContent = data.length + ' rows' +
            (data.length > CONFIG.maxTableRows ? ' (showing first ' + CONFIG.maxTableRows + ')' : '');
    },

    renderJSON(data) {
        DOM.jsonOutput.textContent = JSON.stringify(data, null, 2);
    },

    renderStats(data) {
        if (!data || data.length === 0) return;

        const stats = [];
        stats.push({
            label: 'Total Output Records',
            value: data.length
        });

        // Trade-specific stats
        if (data[0].total_value !== undefined) {
            const totalValue = data.reduce(function (sum, r) {
                return sum + Number(r.total_value || 0);
            }, 0);
            stats.push({
                label: 'Total Trade Value',
                value: '$' + totalValue.toLocaleString(undefined, {
                    maximumFractionDigits: 0
                })
            });

            const tickers = new Set(data.map(function (r) {
                return r.ticker;
            }).filter(Boolean));
            stats.push({
                label: 'Unique Instruments',
                value: tickers.size
            });

            const desks = new Set(data.map(function (r) {
                return r.desk_full || r.desk;
            }).filter(Boolean));
            stats.push({
                label: 'Active Desks',
                value: desks.size
            });

            const buys = data.filter(function (r) {
                return r.side === 'BUY';
            }).length;
            const sells = data.filter(function (r) {
                return r.side === 'SELL';
            }).length;
            stats.push({
                label: 'Buy / Sell',
                value: buys + ' / ' + sells
            });
        }

        // Client-specific stats
        if (data[0].aum !== undefined) {
            const totalAum = data.reduce(function (sum, r) {
                return sum + Number(r.aum || 0);
            }, 0);
            stats.push({
                label: 'Total AUM',
                value: '$' + (totalAum / 1e9).toFixed(1) + 'B'
            });

            const regions = new Set(data.map(function (r) {
                return r.region;
            }).filter(Boolean));
            stats.push({
                label: 'Regions',
                value: regions.size
            });
        }

        // Log-specific stats
        if (data[0].level !== undefined) {
            const levels = {};
            data.forEach(function (r) {
                levels[r.level] = (levels[r.level] || 0) + 1;
            });
            Object.entries(levels).forEach(function (entry) {
                stats.push({
                    label: entry[0] + ' Entries',
                    value: entry[1]
                });
            });
        }

        // Common stats
        const avgQuality = data.reduce(function (sum, r) {
            return sum + (r.data_quality || 0);
        }, 0) / data.length;
        stats.push({
            label: 'Avg Data Quality',
            value: avgQuality.toFixed(0) + '%'
        });
        stats.push({
            label: 'Errors Caught',
            value: AppState.stats.errorCount
        });
        stats.push({
            label: 'Warnings Issued',
            value: AppState.stats.warningCount
        });

        DOM.statsGrid.innerHTML = stats.map(function (s) {
            return '<div class="stat-card glass-card">' +
                '<div class="stat-card-value">' + s.value + '</div>' +
                '<div class="stat-card-label">' + s.label + '</div>' +
                '</div>';
        }).join('');
    },

    exportCSV(data) {
        if (!data || data.length === 0) return;
        const headers = Object.keys(data[0]);
        const csv = [
            headers.join(','),
            ...data.map(function (row) {
                return headers.map(function (h) {
                    let val = String(row[h] !== undefined ? row[h] : '');
                    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
                        val = '"' + val.replace(/"/g, '""') + '"';
                    }
                    return val;
                }).join(',');
            })
        ].join('\n');

        const blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pipeline_output_' + new Date().toISOString().slice(0, 10) + '.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        Terminal.success('CSV exported: ' + a.download);
    },

    exportXLSX(data) {
        if (!data || data.length === 0) return;

        if (typeof XLSX === 'undefined') {
            Terminal.warn('SheetJS library not loaded \u2014 falling back to CSV export');
            this.exportCSV(data);
            return;
        }

        try {
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Pipeline Output');

            const headers = Object.keys(data[0]);
            ws['!cols'] = headers.map(function (h) {
                return {
                    wch: Math.max(h.length + 2, 15)
                };
            });

            XLSX.writeFile(wb, 'pipeline_output_' + new Date().toISOString().slice(0, 10) + '.xlsx');
            Terminal.success('XLSX exported successfully');
        } catch (err) {
            Terminal.warn('XLSX export failed: ' + err.message + ' \u2014 falling back to CSV');
            this.exportCSV(data);
        }
    }
};

// ---------- CHARTS & ANALYTICS ----------
const Charts = {
    instances: {},
    chartColors: {
        blue: 'rgba(59, 130, 246, 0.8)',
        green: 'rgba(34, 197, 94, 0.8)',
        yellow: 'rgba(234, 179, 8, 0.8)',
        red: 'rgba(239, 68, 68, 0.8)',
        purple: 'rgba(168, 85, 247, 0.8)',
        cyan: 'rgba(6, 182, 212, 0.8)',
        orange: 'rgba(249, 115, 22, 0.8)',
        pink: 'rgba(236, 72, 153, 0.8)',
        teal: 'rgba(20, 184, 166, 0.8)',
        indigo: 'rgba(99, 102, 241, 0.8)',
    },
    borderColors: {
        blue: 'rgba(59, 130, 246, 1)',
        green: 'rgba(34, 197, 94, 1)',
        yellow: 'rgba(234, 179, 8, 1)',
        red: 'rgba(239, 68, 68, 1)',
        purple: 'rgba(168, 85, 247, 1)',
        cyan: 'rgba(6, 182, 212, 1)',
        orange: 'rgba(249, 115, 22, 1)',
        pink: 'rgba(236, 72, 153, 1)',
        teal: 'rgba(20, 184, 166, 1)',
        indigo: 'rgba(99, 102, 241, 1)',
    },

    getColorArray(n) {
        const keys = Object.keys(this.chartColors);
        const bg = [];
        const border = [];
        for (let i = 0; i < n; i++) {
            const k = keys[i % keys.length];
            bg.push(this.chartColors[k]);
            border.push(this.borderColors[k]);
        }
        return {
            bg: bg,
            border: border
        };
    },

    defaultOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#94a3b8',
                        font: {
                            family: "'Segoe UI', system-ui, sans-serif",
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f1f5f9',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(148, 163, 184, 0.08)'
                    }
                },
                y: {
                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(148, 163, 184, 0.08)'
                    }
                }
            }
        };
    },

    destroyAll() {
        Object.keys(this.instances).forEach(function (key) {
            if (Charts.instances[key]) {
                Charts.instances[key].destroy();
                delete Charts.instances[key];
            }
        });
        // Show placeholders, reset heatmap
        ['placeholder-bar', 'placeholder-donut', 'placeholder-heatmap', 'placeholder-waterfall'].forEach(function (id) {
            const el = document.getElementById(id);
            if (el) el.classList.remove('hidden');
        });
        const heatmapContainer = document.getElementById('heatmap-container');
        if (heatmapContainer) {
            const placeholder = document.getElementById('placeholder-heatmap');
            heatmapContainer.innerHTML = '';
            if (placeholder) heatmapContainer.appendChild(placeholder);
        }
    },

    renderAll() {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded — skipping analytics');
            return;
        }

        // Destroy previous instances
        this.destroyAll();

        const data = AppState.transformedData;
        if (!data || data.length === 0) return;

        // Hide placeholders
        ['placeholder-bar', 'placeholder-donut', 'placeholder-heatmap', 'placeholder-waterfall'].forEach(function (id) {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });

        this.renderBarChart(data);
        this.renderDonutChart(data);
        this.renderHeatmap();
        this.renderWaterfallChart();
    },

    // ----- BAR CHART: Value by category -----
    renderBarChart(data) {
        const ctx = document.getElementById('chart-bar');
        if (!ctx) return;

        let labels = [];
        let values = [];
        let chartLabel = '';

        // Trade data: total value by ticker
        if (data[0].total_value !== undefined) {
            const byTicker = {};
            data.forEach(function (r) {
                if (r.ticker) {
                    byTicker[r.ticker] = (byTicker[r.ticker] || 0) + Number(r.total_value || 0);
                }
            });
            const sorted = Object.entries(byTicker).sort(function (a, b) {
                return b[1] - a[1];
            });
            labels = sorted.map(function (e) {
                return e[0];
            });
            values = sorted.map(function (e) {
                return e[1];
            });
            chartLabel = 'Total Trade Value ($)';
        }
        // Client data: AUM by client
        else if (data[0].aum !== undefined) {
            data.forEach(function (r) {
                if (r.name) {
                    labels.push(r.name.length > 20 ? r.name.substring(0, 18) + '..' : r.name);
                    values.push(Number(r.aum || 0) / 1e6);
                }
            });
            chartLabel = 'AUM ($M)';
        }
        // Log data: entries by component
        else if (data[0].component !== undefined) {
            const byComp = {};
            data.forEach(function (r) {
                if (r.component) byComp[r.component] = (byComp[r.component] || 0) + 1;
            });
            const sorted = Object.entries(byComp).sort(function (a, b) {
                return b[1] - a[1];
            });
            labels = sorted.map(function (e) {
                return e[0];
            });
            values = sorted.map(function (e) {
                return e[1];
            });
            chartLabel = 'Log Entries';
        }
        // Generic fallback for custom/uploaded data
        else {
            const headers = Object.keys(data[0]);
            var numericCol = null;
            var categoryCol = null;
            for (var hi = 0; hi < headers.length; hi++) {
                var h = headers[hi];
                if (h === 'data_quality') continue;
                var sample = data[0][h];
                if (numericCol === null && sample !== '' && sample !== null && !isNaN(Number(sample))) {
                    numericCol = h;
                }
                if (categoryCol === null && (sample === '' || sample === null || isNaN(Number(sample)))) {
                    categoryCol = h;
                }
            }
            if (numericCol && categoryCol) {
                var grouped = {};
                data.forEach(function (r) {
                    var key = String(r[categoryCol] || 'Unknown');
                    if (key.length > 25) key = key.substring(0, 23) + '..';
                    grouped[key] = (grouped[key] || 0) + Number(r[numericCol] || 0);
                });
                var sorted = Object.entries(grouped).sort(function (a, b) {
                    return b[1] - a[1];
                });
                labels = sorted.slice(0, 20).map(function (e) {
                    return e[0];
                });
                values = sorted.slice(0, 20).map(function (e) {
                    return e[1];
                });
                chartLabel = numericCol + ' by ' + categoryCol;
            } else if (numericCol) {
                labels = data.slice(0, 30).map(function (r, i) {
                    return 'Row ' + (i + 1);
                });
                values = data.slice(0, 30).map(function (r) {
                    return Number(r[numericCol] || 0);
                });
                chartLabel = numericCol;
            }
        }

        if (labels.length === 0) return;

        const colors = this.getColorArray(labels.length);
        const opts = this.defaultOptions();
        opts.plugins.legend.display = false;
        opts.scales.y.beginAtZero = true;

        this.instances.bar = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: chartLabel,
                    data: values,
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: opts
        });
    },

    // ----- DONUT CHART: Distribution breakdown -----
    renderDonutChart(data) {
        const ctx = document.getElementById('chart-donut');
        if (!ctx) return;

        let labels = [];
        let values = [];

        // Trade data: by side + status
        if (data[0].side !== undefined) {
            const counts = {};
            data.forEach(function (r) {
                const key = (r.side || 'UNKNOWN') + ' / ' + (r.status || 'UNKNOWN');
                counts[key] = (counts[key] || 0) + 1;
            });
            // Also show pipeline result breakdown
            labels = ['Clean Records', 'Errors', 'Warnings'];
            values = [AppState.stats.cleanedRecords, AppState.stats.errorCount, AppState.stats.warningCount];
        }
        // Client data: by type
        else if (data[0].type !== undefined) {
            const byType = {};
            data.forEach(function (r) {
                const t = r.type || 'UNKNOWN';
                byType[t] = (byType[t] || 0) + 1;
            });
            labels = Object.keys(byType);
            values = Object.values(byType);
        }
        // Log data: by level
        else if (data[0].level !== undefined) {
            const byLevel = {};
            data.forEach(function (r) {
                byLevel[r.level] = (byLevel[r.level] || 0) + 1;
            });
            labels = Object.keys(byLevel);
            values = Object.values(byLevel);
        }
        // Generic fallback for custom/uploaded data
        else {
            const headers = Object.keys(data[0]);
            var catCol = null;
            for (var hi = 0; hi < headers.length; hi++) {
                var h = headers[hi];
                if (h === 'data_quality') continue;
                var uniqueVals = new Set(data.map(function (r) {
                    return r[h];
                }));
                if (uniqueVals.size >= 2 && uniqueVals.size <= 15) {
                    catCol = h;
                    break;
                }
            }
            if (catCol) {
                var counts = {};
                data.forEach(function (r) {
                    var key = String(r[catCol] || 'Unknown');
                    counts[key] = (counts[key] || 0) + 1;
                });
                labels = Object.keys(counts);
                values = Object.values(counts);
            }
        }

        if (labels.length === 0) return;

        const donutColors = [
            this.chartColors.green, this.chartColors.red, this.chartColors.yellow,
            this.chartColors.blue, this.chartColors.purple, this.chartColors.cyan,
            this.chartColors.orange, this.chartColors.pink
        ];
        const donutBorders = [
            this.borderColors.green, this.borderColors.red, this.borderColors.yellow,
            this.borderColors.blue, this.borderColors.purple, this.borderColors.cyan,
            this.borderColors.orange, this.borderColors.pink
        ];

        const opts = this.defaultOptions();
        delete opts.scales;
        opts.cutout = '55%';
        opts.plugins.legend.position = 'bottom';

        this.instances.donut = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: donutColors.slice(0, labels.length),
                    borderColor: donutBorders.slice(0, labels.length),
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: opts
        });
    },

    // ----- HEATMAP: Data quality per row/field -----
    renderHeatmap() {
        const container = document.getElementById('heatmap-container');
        if (!container) return;

        const cleaned = AppState.cleanedData;
        if (!cleaned || cleaned.length === 0) return;

        const schemaFields = AppState.isCustomData ?
            (AppState.parsedHeaders || []).filter(function (h) {
                return h !== '_hasError' && h !== '_rowIndex';
            }) :
            Object.keys(SAMPLE_DATA[AppState.selectedDataSource].schema);

        // Build issue lookup: { "row-field": "error"|"warn" }
        const issueMap = {};
        AppState.errors.forEach(function (e) {
            issueMap[e.row + '-' + e.field] = 'error';
        });
        AppState.warnings.forEach(function (w) {
            if (!issueMap[w.row + '-' + w.field]) {
                issueMap[w.row + '-' + w.field] = 'warn';
            }
        });

        // Build HTML
        let html = '<div class="heatmap-grid">';

        // Header row
        html += '<div class="heatmap-header">';
        html += '<div class="heatmap-header-cell row-label">Row</div>';
        schemaFields.forEach(function (f) {
            html += '<div class="heatmap-header-cell">' + f + '</div>';
        });
        html += '</div>';

        // Data rows
        for (let i = 0; i < cleaned.length; i++) {
            const rowNum = i + 1;
            html += '<div class="heatmap-row">';
            html += '<div class="heatmap-row-label">' + rowNum + '</div>';
            schemaFields.forEach(function (field) {
                const key = rowNum + '-' + field;
                let cls = 'quality-good';
                let title = 'Row ' + rowNum + ', ' + field + ': OK';
                if (issueMap[key] === 'error') {
                    cls = 'quality-error';
                    const err = AppState.errors.find(function (e) {
                        return e.row === rowNum && e.field === field;
                    });
                    title = 'Row ' + rowNum + ', ' + field + ': ' + (err ? err.message : 'Error');
                } else if (issueMap[key] === 'warn') {
                    cls = 'quality-warn';
                    const warn = AppState.warnings.find(function (w) {
                        return w.row === rowNum && w.field === field;
                    });
                    title = 'Row ' + rowNum + ', ' + field + ': ' + (warn ? warn.message : 'Warning');
                }
                html += '<div class="heatmap-cell ' + cls + '" title="' + title + '"></div>';
            });
            html += '</div>';
        }

        html += '</div>';

        // Legend
        html += '<div class="heatmap-legend">';
        html += '<div class="heatmap-legend-item"><div class="heatmap-legend-swatch" style="background:var(--accent-green);"></div>Clean</div>';
        html += '<div class="heatmap-legend-item"><div class="heatmap-legend-swatch" style="background:var(--accent-yellow);"></div>Warning</div>';
        html += '<div class="heatmap-legend-item"><div class="heatmap-legend-swatch" style="background:var(--accent-red);"></div>Error</div>';
        html += '</div>';

        container.innerHTML = html;
    },

    // ----- WATERFALL CHART: Pipeline stage timing -----
    renderWaterfallChart() {
        const ctx = document.getElementById('chart-waterfall');
        if (!ctx) return;

        const timing = AppState.stageTiming;
        const stages = Pipeline.stageOrder;
        const labels = stages.map(function (s) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        });
        const durations = stages.map(function (s) {
            return timing[s] || 0;
        });
        const total = durations.reduce(function (a, b) {
            return a + b;
        }, 0);

        // Build cumulative offsets for waterfall effect
        const offsets = [];
        let cumulative = 0;
        durations.forEach(function (d) {
            offsets.push(cumulative);
            cumulative += d;
        });

        // Add total bar
        labels.push('Total');
        durations.push(total);
        offsets.push(0);

        const stageColors = [
            Charts.chartColors.blue,
            Charts.chartColors.cyan,
            Charts.chartColors.yellow,
            Charts.chartColors.purple,
            Charts.chartColors.green,
            Charts.chartColors.orange
        ];
        const stageBorders = [
            Charts.borderColors.blue,
            Charts.borderColors.cyan,
            Charts.borderColors.yellow,
            Charts.borderColors.purple,
            Charts.borderColors.green,
            Charts.borderColors.orange
        ];

        const opts = this.defaultOptions();
        opts.indexAxis = 'y';
        opts.plugins.legend.display = false;
        opts.scales.x.stacked = true;
        opts.scales.y.stacked = true;
        opts.scales.x.title = {
            display: true,
            text: 'Duration (ms)',
            color: '#64748b'
        };
        opts.scales.x.beginAtZero = true;

        this.instances.waterfall = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                        label: 'Offset',
                        data: offsets,
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        barPercentage: 0.6
                    },
                    {
                        label: 'Duration',
                        data: durations,
                        backgroundColor: stageColors,
                        borderColor: stageBorders,
                        borderWidth: 1,
                        borderRadius: 4,
                        barPercentage: 0.6
                    }
                ]
            },
            options: opts
        });
    }
};

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ---------- EVENT LISTENERS ----------
function initEventListeners() {
    // Run Pipeline
    DOM.runBtn.addEventListener('click', function () {
        Pipeline.run();
    });

    // Demo — load sample data and auto-run
    var demoBtn = document.getElementById('demo-btn');
    if (demoBtn) {
        demoBtn.addEventListener('click', function () {
            if (AppState.isRunning) return;
            AppState.userUploadedData = null;
            AppState.selectedDataSource = 'trades';
            DOM.dataSourceSelect.value = 'trades';
            document.querySelector('.drop-zone-text').textContent = 'Drag & drop any data file (auto-detects format)';
            Pipeline.run();
        });
    }

    // Reset
    DOM.resetBtn.addEventListener('click', function () {
        AppState.reset();
        Pipeline.resetAll();
        Terminal.clear();
        DOM.outputTableHead.innerHTML = '';
        DOM.outputTableBody.innerHTML = '';
        DOM.jsonOutput.textContent = '';
        DOM.statsGrid.innerHTML = '';
        DOM.rawPreview.textContent = 'Run the pipeline to see raw data here...';
        DOM.processedPreview.textContent = 'Run the pipeline to see processed data here...';
        Charts.destroyAll();
        DOM.exportCsvBtn.disabled = true;
        DOM.exportXlsxBtn.disabled = true;
        DOM.statRecords.textContent = '--';
        DOM.statCleaned.textContent = '--';
        DOM.statErrors.textContent = '--';
        DOM.statTime.textContent = '--';
        document.getElementById('row-count').textContent = '0 rows';
        Terminal.print('System reset. Ready for next run.', 't-muted', {
            noTimestamp: true
        });
    });

    // Data source selection
    DOM.dataSourceSelect.addEventListener('change', function (e) {
        AppState.selectedDataSource = e.target.value;
        AppState.userUploadedData = null;
        // Reset drop zone text
        document.querySelector('.drop-zone-text').textContent = 'Drag & drop a .csv, .json, or .txt file';
    });

    // Speed toggle
    document.querySelectorAll('.speed-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (AppState.isRunning) return;
            document.querySelectorAll('.speed-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            CONFIG.currentSpeed = btn.dataset.speed;
        });
    });

    // Export buttons
    DOM.exportCsvBtn.addEventListener('click', function () {
        Output.exportCSV(AppState.transformedData);
    });
    DOM.exportXlsxBtn.addEventListener('click', function () {
        Output.exportXLSX(AppState.transformedData);
    });

    // Output tabs
    document.querySelectorAll('.output-tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.output-tab').forEach(function (t) {
                t.classList.remove('active');
            });
            document.querySelectorAll('.output-tab-content').forEach(function (c) {
                c.classList.remove('active');
            });
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
        });
    });

    // File drag and drop
    DOM.dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        DOM.dropZone.classList.add('drag-over');
    });

    DOM.dropZone.addEventListener('dragleave', function () {
        DOM.dropZone.classList.remove('drag-over');
    });

    DOM.dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        DOM.dropZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) handleFileUpload(file);
    });

    DOM.dropZone.addEventListener('click', function () {
        DOM.fileInput.click();
    });
    DOM.fileInput.addEventListener('change', function (e) {
        if (e.target.files[0]) handleFileUpload(e.target.files[0]);
    });

    // Terminal clear / copy
    document.getElementById('terminal-clear-btn').addEventListener('click', function () {
        Terminal.clear();
    });
    document.getElementById('terminal-copy-btn').addEventListener('click', function () {
        const text = DOM.terminalBody.innerText;
        navigator.clipboard.writeText(text).then(function () {
            Terminal.info('Console output copied to clipboard');
        }).catch(function () {
            Terminal.warn('Failed to copy — try selecting text manually');
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Documentation sidebar scroll tracking
    const docArticles = document.querySelectorAll('.docs-content article');
    const docLinks = document.querySelectorAll('.docs-link');
    if (docArticles.length && docLinks.length) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    docLinks.forEach(function (link) {
                        link.classList.remove('active');
                    });
                    const activeLink = document.querySelector('.docs-link[href="#' + entry.target.id + '"]');
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px 0px 0px'
        });

        docArticles.forEach(function (article) {
            observer.observe(article);
        });
    }

    // About modal
    var aboutModal = document.getElementById('about-modal');
    var aboutBtn = document.getElementById('about-btn');
    var aboutClose = document.getElementById('about-modal-close');

    if (aboutBtn && aboutModal) {
        aboutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            aboutModal.classList.add('active');
        });

        aboutClose.addEventListener('click', function () {
            aboutModal.classList.remove('active');
        });

        aboutModal.addEventListener('click', function (e) {
            if (e.target === aboutModal) {
                aboutModal.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && aboutModal.classList.contains('active')) {
                aboutModal.classList.remove('active');
            }
        });
    }
}

function detectFileFormat(content, fileName) {
    // 1. Try JSON: starts with [ or { after trimming
    var trimmed = content.trim();
    if (trimmed.charAt(0) === '[' || trimmed.charAt(0) === '{') {
        try {
            JSON.parse(trimmed);
            return 'json';
        } catch (e) {
            /* not valid JSON, continue */ }
    }

    // 2. Try log format: lines matching "TIMESTAMP LEVEL [component] message"
    var lines = trimmed.split('\n');
    var logPattern = /^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\s+(INFO|WARN|ERROR|DEBUG)\s+\[/;
    var logMatches = 0;
    for (var i = 0; i < Math.min(lines.length, 5); i++) {
        if (logPattern.test(lines[i])) logMatches++;
    }
    if (logMatches >= 2) return 'text';

    // 3. Try extension hints as a tiebreaker
    if (fileName) {
        var ext = fileName.split('.').pop().toLowerCase();
        if (ext === 'json') return 'json';
        if (ext === 'txt' || ext === 'log') return 'text';
    }

    // 4. Default: treat as CSV (comma-separated)
    return 'csv';
}

function handleFileUpload(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        AppState.userUploadedData = e.target.result;

        var format = detectFileFormat(e.target.result, file.name);
        SAMPLE_DATA.custom.format = format;
        AppState.selectedDataSource = 'custom';
        DOM.dataSourceSelect.value = 'custom';

        var formatLabel = {
            csv: 'CSV',
            json: 'JSON',
            text: 'Log/Text'
        } [format];

        document.querySelector('.drop-zone-text').textContent =
            'Loaded: ' + file.name + ' (' + file.size.toLocaleString() + ' bytes)';
        Terminal.info('User file uploaded: ' + file.name + ' (' + file.size.toLocaleString() + ' bytes)');
        Terminal.info('Auto-detected format: ' + formatLabel);
    };
    reader.readAsText(file);
}

// ---------- INIT ----------
function init() {
    DOM.init();
    initEventListeners();
    Pipeline.resetAll();
}

document.addEventListener('DOMContentLoaded', init);
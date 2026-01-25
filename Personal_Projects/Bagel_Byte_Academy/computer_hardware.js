// 3D Computer Lab - Bagel Byte Academy
// Interactive 3D PC exploration experience

// Component Data
const componentData = {
    cpu: {
        name: "CPU (Central Processing Unit)",
        icon: "fa-microchip",
        description: "The CPU is the brain of the computer. It executes instructions from programs, performs calculations, and coordinates all other components. Modern CPUs contain billions of transistors and can perform billions of operations per second.",
        specs: {
            "Cores": "4-64 cores",
            "Clock Speed": "3.0-5.5 GHz",
            "Cache": "8-64 MB",
            "TDP": "65-250W"
        },
        timeline: [
            { year: "1971", title: "Intel 4004", desc: "First commercial microprocessor with 2,300 transistors" },
            { year: "1978", title: "Intel 8086", desc: "Birth of x86 architecture still used today" },
            { year: "1993", title: "Intel Pentium", desc: "Superscalar architecture with 3.1 million transistors" },
            { year: "2006", title: "Intel Core", desc: "Multi-core processors become mainstream" },
            { year: "2017", title: "AMD Ryzen", desc: "Chiplet design revolutionizes CPU manufacturing" },
            { year: "2023", title: "Modern Era", desc: "3nm process with 100+ billion transistors" }
        ],
        facts: [
            "The first CPU, Intel 4004, had the same computing power as ENIAC but was 1/100th the size",
            "A modern CPU can execute over 100 billion instructions per second",
            "CPUs generate so much heat that without cooling, they would melt within seconds",
            "The transistors in modern CPUs are smaller than the COVID-19 virus"
        ],
        usage: [
            { icon: "fa-gamepad", label: "Gaming" },
            { icon: "fa-video", label: "Video Editing" },
            { icon: "fa-code", label: "Programming" },
            { icon: "fa-robot", label: "AI/ML" }
        ],
        color: 0x00d4ff
    },
    gpu: {
        name: "GPU (Graphics Processing Unit)",
        icon: "fa-display",
        description: "The GPU specializes in rendering graphics and parallel processing. Originally designed for gaming, GPUs now power AI, cryptocurrency mining, and scientific simulations. They contain thousands of smaller cores optimized for simultaneous calculations.",
        specs: {
            "CUDA Cores": "2,000-16,000",
            "VRAM": "8-24 GB",
            "Memory Bus": "128-384 bit",
            "Power": "150-450W"
        },
        timeline: [
            { year: "1999", title: "NVIDIA GeForce 256", desc: "First GPU with hardware T&L" },
            { year: "2006", title: "CUDA Launch", desc: "GPUs become programmable for general computing" },
            { year: "2012", title: "Kepler Architecture", desc: "Energy-efficient design enables mobile GPUs" },
            { year: "2018", title: "RTX Series", desc: "Real-time ray tracing becomes reality" },
            { year: "2022", title: "Ada Lovelace", desc: "AI-enhanced graphics with DLSS 3" }
        ],
        facts: [
            "A single GPU can have more transistors than 1,000 original Pentium CPUs combined",
            "GPUs are 100x faster than CPUs for parallel tasks like AI training",
            "The term 'GPU' was coined by NVIDIA in 1999",
            "Modern GPUs can render over 100 billion pixels per second"
        ],
        usage: [
            { icon: "fa-cube", label: "3D Rendering" },
            { icon: "fa-brain", label: "AI Training" },
            { icon: "fa-film", label: "Video Production" },
            { icon: "fa-vr-cardboard", label: "VR/AR" }
        ],
        color: 0x7c3aed
    },
    ram: {
        name: "RAM (Random Access Memory)",
        icon: "fa-memory",
        description: "RAM is your computer's short-term memory. It temporarily stores data that the CPU needs quick access to, allowing for fast read and write operations. When you open a program, it loads from storage into RAM for faster access.",
        specs: {
            "Capacity": "8-128 GB",
            "Speed": "3200-7200 MHz",
            "Type": "DDR4/DDR5",
            "Latency": "CL14-CL40"
        },
        timeline: [
            { year: "1947", title: "Williams Tube", desc: "First form of electronic memory" },
            { year: "1968", title: "DRAM Invented", desc: "Robert Dennard invents dynamic RAM" },
            { year: "1993", title: "SDRAM", desc: "Synchronous DRAM syncs with CPU clock" },
            { year: "2000", title: "DDR SDRAM", desc: "Double data rate doubles bandwidth" },
            { year: "2020", title: "DDR5", desc: "Doubled bandwidth and improved efficiency" }
        ],
        facts: [
            "RAM is volatile - it loses all data when power is cut",
            "The first RAM chips could store only 1 kilobit of data",
            "DDR5 RAM can transfer data at over 50 GB per second",
            "RAM modules are designed to only fit one way to prevent incorrect installation"
        ],
        usage: [
            { icon: "fa-window-restore", label: "Multitasking" },
            { icon: "fa-database", label: "Databases" },
            { icon: "fa-image", label: "Photo Editing" },
            { icon: "fa-server", label: "Servers" }
        ],
        color: 0x00ff88
    },
    motherboard: {
        name: "Motherboard",
        icon: "fa-server",
        description: "The motherboard is the central hub connecting all components. It provides power distribution, communication pathways (buses), and houses the chipset that manages data flow. Every component plugs into or communicates through the motherboard.",
        specs: {
            "Form Factor": "ATX/mATX/ITX",
            "Socket": "AM5/LGA 1700",
            "PCIe Slots": "1-7 slots",
            "M.2 Slots": "2-5 slots"
        },
        timeline: [
            { year: "1981", title: "IBM PC", desc: "First standardized PC motherboard" },
            { year: "1995", title: "ATX Standard", desc: "Intel introduces ATX form factor" },
            { year: "2004", title: "PCIe Launch", desc: "PCI Express replaces AGP and PCI" },
            { year: "2017", title: "AM4 Platform", desc: "AMD's long-lasting socket platform" },
            { year: "2022", title: "DDR5/PCIe 5.0", desc: "Next-gen connectivity standards" }
        ],
        facts: [
            "Motherboards have multiple layers - high-end boards can have 8+ layers",
            "The gold contacts on motherboards are real gold plating",
            "A single motherboard can have over 1,000 individual components",
            "The traces on motherboards are precisely calculated for signal timing"
        ],
        usage: [
            { icon: "fa-plug", label: "Connectivity" },
            { icon: "fa-bolt", label: "Power Delivery" },
            { icon: "fa-microchip", label: "Component Hub" },
            { icon: "fa-usb", label: "I/O Ports" }
        ],
        color: 0x00d4ff
    },
    storage: {
        name: "Storage (SSD/HDD)",
        icon: "fa-hard-drive",
        description: "Storage devices hold your data permanently. HDDs use spinning magnetic disks, while SSDs use flash memory with no moving parts. SSDs are faster and more reliable, while HDDs offer more capacity per dollar.",
        specs: {
            "Capacity": "256GB - 20TB",
            "Read Speed": "Up to 7,000 MB/s",
            "Write Speed": "Up to 6,500 MB/s",
            "Interface": "SATA/NVMe"
        },
        timeline: [
            { year: "1956", title: "IBM 350", desc: "First commercial hard drive (5MB, size of 2 refrigerators)" },
            { year: "1980", title: "5.25\" HDD", desc: "Hard drives fit in desktop computers" },
            { year: "1991", title: "SSD Invented", desc: "SanDisk creates first commercial SSD" },
            { year: "2013", title: "NVMe Standard", desc: "SSDs bypass SATA bottleneck" },
            { year: "2023", title: "PCIe 5.0 SSDs", desc: "10,000+ MB/s read speeds achieved" }
        ],
        facts: [
            "The first hard drive cost $50,000 and stored only 5 megabytes",
            "An SSD can access data 100x faster than a traditional HDD",
            "HDD platters spin at up to 15,000 RPM (250 times per second)",
            "SSDs can withstand drops that would destroy HDDs"
        ],
        usage: [
            { icon: "fa-folder", label: "File Storage" },
            { icon: "fa-download", label: "OS Boot Drive" },
            { icon: "fa-database", label: "Databases" },
            { icon: "fa-cloud", label: "Cloud Storage" }
        ],
        color: 0xffaa00
    },
    psu: {
        name: "PSU (Power Supply Unit)",
        icon: "fa-bolt",
        description: "The PSU converts AC power from your wall outlet to the DC power your components need. It provides multiple voltage rails (12V, 5V, 3.3V) and must be sized appropriately for your system's power consumption.",
        specs: {
            "Wattage": "450-1600W",
            "Efficiency": "80+ Bronze to Titanium",
            "Modularity": "Full/Semi/Non",
            "Rails": "12V, 5V, 3.3V"
        },
        timeline: [
            { year: "1981", title: "AT Power Supply", desc: "Standard for early PCs" },
            { year: "1995", title: "ATX Standard", desc: "Soft power and standby power introduced" },
            { year: "2004", title: "80 Plus Cert", desc: "Energy efficiency certification begins" },
            { year: "2019", title: "ATX 3.0", desc: "New standard for high-power GPUs" },
            { year: "2022", title: "12VHPWR", desc: "New connector for 600W+ GPUs" }
        ],
        facts: [
            "A PSU running at 50% load is typically most efficient",
            "80 Plus Titanium PSUs are over 96% efficient",
            "The 12V rail provides most of the power to modern components",
            "Quality PSUs can last 10+ years with proper use"
        ],
        usage: [
            { icon: "fa-plug", label: "Power Conversion" },
            { icon: "fa-shield", label: "Surge Protection" },
            { icon: "fa-leaf", label: "Efficiency" },
            { icon: "fa-thermometer", label: "Heat Management" }
        ],
        color: 0xff4757
    },
    cooling: {
        name: "Cooling System",
        icon: "fa-fan",
        description: "Cooling systems prevent components from overheating. Air coolers use heatsinks and fans, while liquid cooling uses water or coolant circulated through radiators. Proper cooling extends component lifespan and maintains performance.",
        specs: {
            "Type": "Air/AIO/Custom Loop",
            "Fan Size": "80-200mm",
            "TDP Support": "Up to 350W+",
            "Noise": "20-40 dBA"
        },
        timeline: [
            { year: "1990s", title: "Passive Heatsinks", desc: "Early CPUs cooled without fans" },
            { year: "2000", title: "Tower Coolers", desc: "Large heatsinks with dedicated fans" },
            { year: "2010", title: "AIO Coolers", desc: "Closed-loop liquid cooling goes mainstream" },
            { year: "2020", title: "Push-Pull Configs", desc: "Dual fan setups for maximum airflow" }
        ],
        facts: [
            "CPUs can reach 100°C in less than a second without cooling",
            "Liquid cooling can handle 2-3x more heat than air cooling",
            "Thermal paste improves heat transfer by filling microscopic gaps",
            "Some enthusiasts use liquid nitrogen for extreme overclocking (-196°C)"
        ],
        usage: [
            { icon: "fa-temperature-low", label: "Heat Dissipation" },
            { icon: "fa-volume-off", label: "Noise Reduction" },
            { icon: "fa-gauge-high", label: "Overclocking" },
            { icon: "fa-clock", label: "Longevity" }
        ],
        color: 0x00d4ff
    },
    case: {
        name: "Computer Case",
        icon: "fa-box",
        description: "The case houses and protects all components while providing airflow for cooling. Modern cases offer cable management, tool-less installation, and RGB lighting. Case size determines what components will fit.",
        specs: {
            "Form Factor": "Full/Mid/Mini Tower",
            "Material": "Steel/Aluminum/Glass",
            "Fan Support": "3-10 fans",
            "Drive Bays": "2-6 bays"
        },
        timeline: [
            { year: "1981", title: "Desktop Cases", desc: "Horizontal cases for early PCs" },
            { year: "1990s", title: "Tower Cases", desc: "Vertical cases become standard" },
            { year: "2010", title: "Cable Management", desc: "Cases designed for clean builds" },
            { year: "2015", title: "Tempered Glass", desc: "Side panels showcase components" },
            { year: "2020", title: "Mesh Fronts", desc: "Maximum airflow designs" }
        ],
        facts: [
            "The first IBM PC case weighed over 25 pounds",
            "Some cases cost more than mid-range GPUs",
            "Positive air pressure (more intake than exhaust) reduces dust buildup",
            "Mini-ITX cases can fit full-size GPUs while being smaller than a shoebox"
        ],
        usage: [
            { icon: "fa-shield", label: "Protection" },
            { icon: "fa-wind", label: "Airflow" },
            { icon: "fa-palette", label: "Aesthetics" },
            { icon: "fa-screwdriver", label: "Accessibility" }
        ],
        color: 0x6a6a7a
    }
};

// Easter Eggs
const easterEggs = [
    { trigger: 'floppy', message: 'You found the floppy disk! Save icon origins!' },
    { trigger: 'turbo', message: 'TURBO MODE ACTIVATED! (Just kidding, those buttons never did much)' },
    { trigger: 'bios', message: 'Press DEL to enter BIOS... wait, this is a website!' },
    { trigger: 'rgb', message: 'RGB DETECTED! +500% performance boost!' }
];

// Three.js Setup
let scene, camera, renderer, controls;
let components = {};
let raycaster, mouse;
let selectedComponent = null;
let hoveredComponent = null;
let hoverScale = 1;
let isXrayMode = false;
let isAutoRotate = false;
let currentView = 'modern';

// Initialize
function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);

    // Camera
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(5, 4, 8);

    // Renderer
    const canvas = document.getElementById('computerCanvas');
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 1.5;

    // Raycaster for clicking
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Lighting
    setupLighting();

    // Create computer model
    createComputer();

    // Create environment
    createEnvironment();

    // Event listeners
    setupEventListeners();

    // Start animation
    animate();

    // Hide loading screen
    simulateLoading();
}

function setupLighting() {
    // Ambient light
    const ambient = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambient);

    // Main directional light
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0x00d4ff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Accent light
    const accentLight = new THREE.PointLight(0x7c3aed, 0.5, 10);
    accentLight.position.set(0, 2, 3);
    scene.add(accentLight);

    // Ground reflection
    const groundLight = new THREE.PointLight(0x00ff88, 0.2, 8);
    groundLight.position.set(0, -2, 0);
    scene.add(groundLight);
}

function createComputer() {
    // Computer case (main housing)
    const caseGroup = new THREE.Group();
    caseGroup.name = 'case';

    // Case frame
    const caseGeometry = new THREE.BoxGeometry(3, 4, 2.5);
    const caseMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a25,
        metalness: 0.8,
        roughness: 0.3,
        transparent: true,
        opacity: 0.3
    });
    const caseMesh = new THREE.Mesh(caseGeometry, caseMaterial);
    caseMesh.name = 'case';
    caseMesh.userData = { component: 'case' };
    caseGroup.add(caseMesh);

    // Glass side panel
    const glassGeometry = new THREE.PlaneGeometry(2.4, 3.8);
    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0x88ccff,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.15
    });
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    glassMesh.position.set(1.51, 0, 0);
    glassMesh.rotation.y = Math.PI / 2;
    caseGroup.add(glassMesh);

    scene.add(caseGroup);
    components.case = caseGroup;

    // Motherboard
    const moboGroup = new THREE.Group();
    moboGroup.name = 'motherboard';

    const moboGeometry = new THREE.BoxGeometry(2.2, 2.8, 0.05);
    const moboMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a3a2a,
        metalness: 0.3,
        roughness: 0.7
    });
    const moboMesh = new THREE.Mesh(moboGeometry, moboMaterial);
    moboMesh.name = 'motherboard';
    moboMesh.userData = { component: 'motherboard' };
    moboMesh.position.set(0, 0, -0.9);
    moboGroup.add(moboMesh);

    // PCB traces
    const tracesMaterial = new THREE.MeshStandardMaterial({
        color: 0xc4a000,
        metalness: 0.9,
        roughness: 0.2,
        emissive: 0x3a2a00,
        emissiveIntensity: 0.2
    });

    for (let i = 0; i < 20; i++) {
        const traceGeometry = new THREE.BoxGeometry(
            Math.random() * 0.8 + 0.2,
            0.02,
            0.01
        );
        const trace = new THREE.Mesh(traceGeometry, tracesMaterial);
        trace.position.set(
            (Math.random() - 0.5) * 1.8,
            (Math.random() - 0.5) * 2.4,
            -0.86
        );
        moboGroup.add(trace);
    }

    scene.add(moboGroup);
    components.motherboard = moboGroup;

    // CPU
    const cpuGroup = new THREE.Group();
    cpuGroup.name = 'cpu';

    const cpuGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.08);
    const cpuMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a3a,
        metalness: 0.9,
        roughness: 0.2
    });
    const cpuMesh = new THREE.Mesh(cpuGeometry, cpuMaterial);
    cpuMesh.name = 'cpu';
    cpuMesh.userData = { component: 'cpu' };
    cpuMesh.position.set(-0.3, 0.5, -0.8);
    cpuGroup.add(cpuMesh);

    // CPU IHS (Integrated Heat Spreader)
    const ihsGeometry = new THREE.BoxGeometry(0.45, 0.45, 0.02);
    const ihsMaterial = new THREE.MeshStandardMaterial({
        color: 0x888899,
        metalness: 0.95,
        roughness: 0.1
    });
    const ihs = new THREE.Mesh(ihsGeometry, ihsMaterial);
    ihs.position.set(-0.3, 0.5, -0.74);
    cpuGroup.add(ihs);

    scene.add(cpuGroup);
    components.cpu = cpuGroup;

    // CPU Cooler
    const coolerGroup = new THREE.Group();
    coolerGroup.name = 'cooling';

    // Heatsink fins
    for (let i = 0; i < 8; i++) {
        const finGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.5);
        const finMaterial = new THREE.MeshStandardMaterial({
            color: 0x404050,
            metalness: 0.8,
            roughness: 0.3
        });
        const fin = new THREE.Mesh(finGeometry, finMaterial);
        fin.position.set(-0.3, 0.5 + (i * 0.08), -0.45);
        coolerGroup.add(fin);
    }

    // Fan
    const fanGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.08, 32);
    const fanMaterial = new THREE.MeshStandardMaterial({
        color: 0x202030,
        metalness: 0.5,
        roughness: 0.5
    });
    const fan = new THREE.Mesh(fanGeometry, fanMaterial);
    fan.rotation.x = Math.PI / 2;
    fan.position.set(-0.3, 1.0, -0.2);
    fan.name = 'cooling';
    fan.userData = { component: 'cooling' };
    coolerGroup.add(fan);

    // Fan blades
    for (let i = 0; i < 7; i++) {
        const bladeGeometry = new THREE.BoxGeometry(0.25, 0.02, 0.08);
        const blade = new THREE.Mesh(bladeGeometry, fanMaterial);
        blade.position.set(-0.3, 1.0, -0.2);
        blade.rotation.z = (i / 7) * Math.PI * 2;
        blade.rotation.x = Math.PI / 2;
        coolerGroup.add(blade);
    }

    scene.add(coolerGroup);
    components.cooling = coolerGroup;

    // GPU
    const gpuGroup = new THREE.Group();
    gpuGroup.name = 'gpu';

    const gpuGeometry = new THREE.BoxGeometry(1.8, 0.15, 0.6);
    const gpuMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a2a,
        metalness: 0.7,
        roughness: 0.3
    });
    const gpuMesh = new THREE.Mesh(gpuGeometry, gpuMaterial);
    gpuMesh.name = 'gpu';
    gpuMesh.userData = { component: 'gpu' };
    gpuMesh.position.set(0, -0.3, -0.5);
    gpuGroup.add(gpuMesh);

    // GPU fans
    for (let i = 0; i < 3; i++) {
        const gpuFanGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
        const gpuFan = new THREE.Mesh(gpuFanGeometry, fanMaterial);
        gpuFan.rotation.x = Math.PI / 2;
        gpuFan.position.set(-0.5 + (i * 0.5), -0.3, -0.18);
        gpuGroup.add(gpuFan);
    }

    // GPU backplate
    const backplateGeometry = new THREE.BoxGeometry(1.8, 0.02, 0.55);
    const backplateMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a3a,
        metalness: 0.8,
        roughness: 0.2
    });
    const backplate = new THREE.Mesh(backplateGeometry, backplateMaterial);
    backplate.position.set(0, -0.22, -0.5);
    gpuGroup.add(backplate);

    // RGB strip
    const rgbGeometry = new THREE.BoxGeometry(1.6, 0.03, 0.03);
    const rgbMaterial = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        emissive: 0x00d4ff,
        emissiveIntensity: 0.8
    });
    const rgb = new THREE.Mesh(rgbGeometry, rgbMaterial);
    rgb.position.set(0, -0.35, -0.22);
    gpuGroup.add(rgb);

    scene.add(gpuGroup);
    components.gpu = gpuGroup;

    // RAM
    const ramGroup = new THREE.Group();
    ramGroup.name = 'ram';

    for (let i = 0; i < 4; i++) {
        const ramGeometry = new THREE.BoxGeometry(0.08, 0.8, 0.15);
        const ramMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a2a,
            metalness: 0.6,
            roughness: 0.4
        });
        const ram = new THREE.Mesh(ramGeometry, ramMaterial);
        ram.name = 'ram';
        ram.userData = { component: 'ram' };
        ram.position.set(0.4 + (i * 0.12), 0.5, -0.8);
        ramGroup.add(ram);

        // RAM heatspreader top
        const heatGeometry = new THREE.BoxGeometry(0.08, 0.15, 0.15);
        const heatMaterial = new THREE.MeshStandardMaterial({
            color: i % 2 === 0 ? 0x00d4ff : 0x7c3aed,
            metalness: 0.8,
            roughness: 0.2,
            emissive: i % 2 === 0 ? 0x00d4ff : 0x7c3aed,
            emissiveIntensity: 0.3
        });
        const heat = new THREE.Mesh(heatGeometry, heatMaterial);
        heat.position.set(0.4 + (i * 0.12), 0.95, -0.8);
        ramGroup.add(heat);
    }

    scene.add(ramGroup);
    components.ram = ramGroup;

    // Storage (NVMe SSD)
    const storageGroup = new THREE.Group();
    storageGroup.name = 'storage';

    const ssdGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.03);
    const ssdMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a3a,
        metalness: 0.7,
        roughness: 0.3
    });
    const ssd = new THREE.Mesh(ssdGeometry, ssdMaterial);
    ssd.name = 'storage';
    ssd.userData = { component: 'storage' };
    ssd.position.set(-0.3, -0.5, -0.85);
    storageGroup.add(ssd);

    // SSD label
    const labelGeometry = new THREE.BoxGeometry(0.4, 0.06, 0.01);
    const labelMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff88,
        emissive: 0x00ff88,
        emissiveIntensity: 0.3
    });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(-0.3, -0.5, -0.82);
    storageGroup.add(label);

    scene.add(storageGroup);
    components.storage = storageGroup;

    // PSU
    const psuGroup = new THREE.Group();
    psuGroup.name = 'psu';

    const psuGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.6);
    const psuMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.5,
        roughness: 0.5
    });
    const psu = new THREE.Mesh(psuGeometry, psuMaterial);
    psu.name = 'psu';
    psu.userData = { component: 'psu' };
    psu.position.set(0, -1.5, -0.5);
    psuGroup.add(psu);

    // PSU label
    const psuLabelGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.01);
    const psuLabelMaterial = new THREE.MeshStandardMaterial({
        color: 0xff4757,
        emissive: 0xff4757,
        emissiveIntensity: 0.3
    });
    const psuLabel = new THREE.Mesh(psuLabelGeometry, psuLabelMaterial);
    psuLabel.position.set(0, -1.5, -0.19);
    psuGroup.add(psuLabel);

    // PSU fan grill
    const grillGeometry = new THREE.RingGeometry(0.2, 0.25, 32);
    const grillMaterial = new THREE.MeshStandardMaterial({
        color: 0x303030,
        metalness: 0.8,
        roughness: 0.3
    });
    const grill = new THREE.Mesh(grillGeometry, grillMaterial);
    grill.position.set(0.3, -1.5, -0.19);
    psuGroup.add(grill);

    scene.add(psuGroup);
    components.psu = psuGroup;

    // Add glow effects
    addGlowEffects();
}

function addGlowEffects() {
    // Data flow lines (visible in X-ray mode)
    const dataFlowGroup = new THREE.Group();
    dataFlowGroup.name = 'dataFlow';
    dataFlowGroup.visible = false;

    // CPU to RAM data bus
    const cpuRamPoints = [
        new THREE.Vector3(-0.3, 0.5, -0.75),
        new THREE.Vector3(0.1, 0.5, -0.75),
        new THREE.Vector3(0.4, 0.5, -0.75)
    ];
    const cpuRamCurve = new THREE.CatmullRomCurve3(cpuRamPoints);
    const cpuRamGeometry = new THREE.TubeGeometry(cpuRamCurve, 20, 0.02, 8, false);
    const cpuRamMaterial = new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.8
    });
    const cpuRamLine = new THREE.Mesh(cpuRamGeometry, cpuRamMaterial);
    dataFlowGroup.add(cpuRamLine);

    // CPU to GPU PCIe
    const cpuGpuPoints = [
        new THREE.Vector3(-0.3, 0.5, -0.75),
        new THREE.Vector3(-0.3, 0.1, -0.75),
        new THREE.Vector3(0, -0.3, -0.75)
    ];
    const cpuGpuCurve = new THREE.CatmullRomCurve3(cpuGpuPoints);
    const cpuGpuGeometry = new THREE.TubeGeometry(cpuGpuCurve, 20, 0.02, 8, false);
    const cpuGpuMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.8
    });
    const cpuGpuLine = new THREE.Mesh(cpuGpuGeometry, cpuGpuMaterial);
    dataFlowGroup.add(cpuGpuLine);

    // Power lines
    const powerPoints = [
        new THREE.Vector3(0, -1.5, -0.5),
        new THREE.Vector3(0, -0.5, -0.5),
        new THREE.Vector3(-0.3, 0.5, -0.5)
    ];
    const powerCurve = new THREE.CatmullRomCurve3(powerPoints);
    const powerGeometry = new THREE.TubeGeometry(powerCurve, 20, 0.025, 8, false);
    const powerMaterial = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        transparent: true,
        opacity: 0.8
    });
    const powerLine = new THREE.Mesh(powerGeometry, powerMaterial);
    dataFlowGroup.add(powerLine);

    scene.add(dataFlowGroup);
    components.dataFlow = dataFlowGroup;
}

function createEnvironment() {
    // Grid floor
    const gridHelper = new THREE.GridHelper(20, 40, 0x2a2a3a, 0x1a1a25);
    gridHelper.position.y = -2.5;
    scene.add(gridHelper);

    // Ambient particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 15;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x00d4ff,
        size: 0.02,
        transparent: true,
        opacity: 0.5
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
}

function setupEventListeners() {
    // Window resize
    window.addEventListener('resize', onWindowResize);

    // Mouse events
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.addEventListener('mousemove', onMouseMove);

    // View mode buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            updateView();
        });
    });

    // X-ray toggle
    document.getElementById('xrayToggle').addEventListener('click', toggleXrayMode);

    // Auto rotate toggle
    document.getElementById('autoRotate').addEventListener('click', toggleAutoRotate);

    // Close panel
    document.getElementById('closePanel').addEventListener('click', closeInfoPanel);

    // Quick select buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const componentName = btn.dataset.component;
            selectComponent(componentName);
        });
    });

    // Dismiss instructions
    document.getElementById('dismissInstructions').addEventListener('click', () => {
        document.getElementById('instructions').classList.add('hidden');
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeInfoPanel();
        }
        if (e.key === 'x' || e.key === 'X') {
            toggleXrayMode();
        }
        if (e.key === 'r' || e.key === 'R') {
            toggleAutoRotate();
        }
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    for (const intersect of intersects) {
        const object = intersect.object;
        if (object.userData && object.userData.component) {
            selectComponent(object.userData.component);
            break;
        }
    }
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    // Reset cursor and hovered component
    document.body.style.cursor = 'default';
    const previousHovered = hoveredComponent;
    hoveredComponent = null;

    for (const intersect of intersects) {
        if (intersect.object.userData && intersect.object.userData.component) {
            document.body.style.cursor = 'pointer';
            hoveredComponent = intersect.object.userData.component;
            break;
        }
    }

    // Reset previous hovered component scale
    if (previousHovered && previousHovered !== hoveredComponent && components[previousHovered]) {
        components[previousHovered].scale.setScalar(1);
    }
}

function selectComponent(componentName) {
    const data = componentData[componentName];
    if (!data) return;

    selectedComponent = componentName;

    // Update quick select buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.component === componentName);
    });

    // Focus camera on component
    if (components[componentName]) {
        const target = new THREE.Vector3();
        components[componentName].getWorldPosition(target);

        // Animate camera
        const startPos = camera.position.clone();
        const endPos = target.clone().add(new THREE.Vector3(3, 2, 4));

        let progress = 0;
        const animateCamera = () => {
            progress += 0.02;
            if (progress < 1) {
                camera.position.lerpVectors(startPos, endPos, easeOutCubic(progress));
                controls.target.lerp(target, 0.05);
                requestAnimationFrame(animateCamera);
            }
        };
        animateCamera();
    }

    // Update panel
    showInfoPanel(data);

    // Check for easter eggs
    checkEasterEggs(componentName);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function showInfoPanel(data) {
    const panel = document.getElementById('infoPanel');
    const icon = document.getElementById('panelIcon');
    const title = document.getElementById('panelTitle');
    const content = document.getElementById('panelContent');
    const timelineSection = document.getElementById('timelineSection');
    const timeline = document.getElementById('timeline');
    const factsSection = document.getElementById('factsSection');
    const factsList = document.getElementById('factsList');
    const usageSection = document.getElementById('usageSection');
    const usageGrid = document.getElementById('usageGrid');

    // Update header
    icon.innerHTML = `<i class="fas ${data.icon}"></i>`;
    title.textContent = data.name;

    // Update content
    let specsHtml = `<p class="panel-description">${data.description}</p>`;
    specsHtml += '<div class="specs-grid">';
    for (const [label, value] of Object.entries(data.specs)) {
        specsHtml += `
            <div class="spec-item">
                <div class="spec-label">${label}</div>
                <div class="spec-value">${value}</div>
            </div>
        `;
    }
    specsHtml += '</div>';
    content.innerHTML = specsHtml;

    // Update timeline
    timeline.innerHTML = data.timeline.map(item => `
        <div class="timeline-item">
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-title">${item.title}</div>
            <div class="timeline-desc">${item.desc}</div>
        </div>
    `).join('');
    timelineSection.style.display = 'block';

    // Update facts
    factsList.innerHTML = data.facts.map(fact => `<li>${fact}</li>`).join('');
    factsSection.style.display = 'block';

    // Update usage
    usageGrid.innerHTML = data.usage.map(item => `
        <div class="usage-item">
            <i class="fas ${item.icon}"></i>
            <span>${item.label}</span>
        </div>
    `).join('');
    usageSection.style.display = 'block';

    // Open panel
    panel.classList.add('open');
}

function closeInfoPanel() {
    document.getElementById('infoPanel').classList.remove('open');
    document.querySelectorAll('.quick-btn').forEach(btn => btn.classList.remove('active'));
    selectedComponent = null;
}

function toggleXrayMode() {
    isXrayMode = !isXrayMode;
    document.getElementById('xrayToggle').classList.toggle('active', isXrayMode);
    document.getElementById('dataFlowLegend').style.display = isXrayMode ? 'block' : 'none';
    document.body.classList.toggle('xray-mode', isXrayMode);

    // Toggle data flow visibility
    if (components.dataFlow) {
        components.dataFlow.visible = isXrayMode;
    }

    // Adjust case transparency
    if (components.case) {
        components.case.children.forEach(child => {
            if (child.material) {
                child.material.opacity = isXrayMode ? 0.1 : 0.3;
            }
        });
    }
}

function toggleAutoRotate() {
    isAutoRotate = !isAutoRotate;
    document.getElementById('autoRotate').classList.toggle('active', isAutoRotate);
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 1;
}

function updateView() {
    // Different color schemes for different views
    const colors = {
        modern: { primary: 0x00d4ff, secondary: 0x7c3aed, accent: 0x00ff88 },
        retro: { primary: 0xffaa00, secondary: 0x00aa00, accent: 0xff6600 },
        future: { primary: 0xff00ff, secondary: 0x00ffff, accent: 0xffff00 }
    };

    const currentColors = colors[currentView];

    // Update component colors based on view
    // This is a simplified version - could be expanded for more dramatic changes
    if (components.gpu) {
        const rgbStrip = components.gpu.children.find(c => c.material && c.material.emissive);
        if (rgbStrip) {
            rgbStrip.material.color.setHex(currentColors.primary);
            rgbStrip.material.emissive.setHex(currentColors.primary);
        }
    }
}

function checkEasterEggs(componentName) {
    // Easter eggs based on component selection patterns or names
    if (componentName === 'storage') {
        // 10% chance to trigger floppy disk easter egg
        if (Math.random() < 0.1) {
            showEasterEgg('You found the floppy disk! Save icon origins!');
        }
    }
}

function showEasterEgg(message) {
    const popup = document.getElementById('easterEggPopup');
    const text = document.getElementById('easterEggText');
    text.textContent = message;
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

function simulateLoading() {
    const progress = document.getElementById('loaderProgress');
    const text = document.getElementById('loaderText');
    const loadingScreen = document.getElementById('loadingScreen');

    const steps = [
        { percent: 20, text: 'Loading 3D models...' },
        { percent: 40, text: 'Initializing components...' },
        { percent: 60, text: 'Setting up lighting...' },
        { percent: 80, text: 'Preparing textures...' },
        { percent: 100, text: 'Ready!' }
    ];

    let currentStep = 0;

    const updateProgress = () => {
        if (currentStep < steps.length) {
            progress.style.width = steps[currentStep].percent + '%';
            text.textContent = steps[currentStep].text;
            currentStep++;
            setTimeout(updateProgress, 400);
        } else {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
    };

    setTimeout(updateProgress, 300);
}

function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Animate fan rotation
    if (components.cooling) {
        components.cooling.children.forEach(child => {
            if (child.geometry && child.geometry.type === 'CylinderGeometry') {
                child.rotation.z += 0.1;
            }
        });
    }

    // Animate GPU fans
    if (components.gpu) {
        components.gpu.children.forEach(child => {
            if (child.geometry && child.geometry.type === 'CylinderGeometry') {
                child.rotation.z += 0.08;
            }
        });
    }

    // Hover pulse effect
    if (hoveredComponent && components[hoveredComponent]) {
        const time = Date.now() * 0.005;
        const pulse = 1 + Math.sin(time) * 0.03;
        components[hoveredComponent].scale.setScalar(pulse);
    }

    // Render
    renderer.render(scene, camera);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

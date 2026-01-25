# Bagel Byte Academy

An interactive web-based learning platform for exploring computers, coding, and networking fundamentals.

## About

Bagel Byte Academy started as a simple idea: **what if learning about computers could be fun and interactive?** This project provides hands-on experiences to help anyone understand how computers actually work - from the hardware inside your PC to the code that makes programs run, and how data travels across the internet.

## Features

### 3D Computer Exploration Lab ✨
A fully immersive 3D experience where you can explore the inside of a computer!

- **Interactive 3D Model** - Rotate, pan, and zoom around a modern PC
- **8 Clickable Components** - CPU, GPU, RAM, Motherboard, Storage, PSU, Cooling, and Case
- **Floating 3D Labels** - Component names hover in 3D space
- **X-Ray Mode** - See animated data flow particles traveling between components:
  - CPU ↔ RAM (Memory Bus)
  - CPU → GPU (PCIe)
  - PSU → Components (Power)
  - RAM → GPU (Graphics Data)
- **Detailed Info Panels** with:
  - Component specifications
  - Historical evolution timeline
  - Fun facts
  - Modern usage examples
- **View Modes** - Switch between Modern, Retro, and Future PC concepts
- **Auto-Rotate** - Let the model spin automatically

### Hardware Explorer
- Interactive PC diagram with clickable components
- Learn about CPU, GPU, RAM, Storage, Motherboard, and PSU
- Detailed facts and explanations for each component

### Binary Converter
- Convert decimal numbers to binary and vice versa
- Interactive bit toggles to understand how binary works
- Visual representation of how computers store data

### Code Playground
- Write and execute JavaScript code in real-time
- Built-in coding challenges:
  - Hello World
  - Sum Two Numbers
  - Count to 10
  - FizzBuzz
- Learn programming concepts like variables, conditions, and loops

### Network Simulator
- Visualize how data travels across the internet
- Simulate HTTP, HTTPS, DNS, and Ping requests
- Packet Inspector showing OSI layers (Ethernet, IP, TCP, Application)
- Learn about network protocols and how they work

### Terminal Emulator
- Practice command line basics in a safe environment
- **Multiple terminal types:**
  - Linux/Bash
  - Windows CMD
  - PowerShell
- Virtual file system to navigate and explore
- Commands include: ls/dir, cd, pwd, cat/type, mkdir, ping, ifconfig/ipconfig, and more

### Quizzes & Gamification
- Test your knowledge with quizzes on hardware, binary, coding, and networking
- XP system and leveling to track your progress
- Achievements for completing challenges

## Technologies Used

- HTML5
- CSS3 (Custom properties, Flexbox, Grid, Animations)
- Vanilla JavaScript
- **Three.js** - 3D graphics library for the Computer Lab
- **CSS2DRenderer** - For 3D floating labels
- Font Awesome icons
- LocalStorage for progress persistence

## Getting Started

Simply open `index.html` in a web browser to start learning!

For the 3D Computer Lab, click the "Enter 3D Computer Lab" button in the Hardware section, or open `Computer_Hardware.html` directly.

## Project Structure

```
Bagel_Byte_Academy/
├── index.html              # Main academy page
├── styles.css              # Main page styling
├── app.js                  # Main page functionality
├── Computer_Hardware.html  # 3D Computer Lab page
├── computer_hardware.css   # 3D Lab styling
├── computer_hardware.js    # Three.js 3D scene & interactions
├── favicon.svg             # Site icon
└── README.md               # This file
```

## License

This project was created as a personal learning tool and portfolio piece.

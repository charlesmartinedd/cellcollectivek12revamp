# Cell Collective K-12 - Middle School Edition

An interactive biology simulation platform designed specifically for grades 6-8, based on Cell Collective but simplified and enhanced for middle school students.

## 🎯 Project Goals

- **Intuitive Interface**: PhET and Amplify-inspired design with large, clear UI elements
- **Visual Clarity**: Graphs and visualizations optimized for young learners (16px+ fonts, thick lines)
- **Easy Component Management**: Drag-and-drop interface with large touch targets (44x44px minimum)
- **Engaging Learning**: SCORM-integrated lessons, interactive tutorials, and built-in quizzes
- **20 Curated Models**: Middle school-appropriate biology simulations

## 📁 Project Structure

```
cellcollectivek12revamp/
├── src/
│   ├── client/                 # React frontend (Vite + React 18)
│   │   ├── src/
│   │   │   ├── components/     # React components
│   │   │   │   ├── ModelBrowser/
│   │   │   │   ├── Simulation/
│   │   │   │   ├── Visualization/
│   │   │   │   ├── Editor/
│   │   │   │   ├── WizardEditor/
│   │   │   │   ├── SCORMPlayer/
│   │   │   │   ├── Quiz/
│   │   │   │   ├── Tutorial/
│   │   │   │   └── Layout/
│   │   │   ├── pages/          # Page components
│   │   │   ├── store/          # Redux Toolkit store
│   │   │   ├── theme/          # Material-UI theme
│   │   │   ├── styles/         # SCSS styles
│   │   │   └── utils/          # Utility functions
│   │   └── package.json
│   │
│   └── server/                 # Node.js/Express backend
│       ├── api/
│       ├── models/             # Database models
│       ├── routes/             # API routes
│       ├── simulation/         # Simulation engine
│       └── index.js
│
├── docker/                     # Docker configuration
│   ├── web/
│   ├── db/
│   └── nginx/
│
├── models/                     # 20 curated model definitions (JSON)
├── lessons/                    # SCORM lesson packages
├── quizzes/                    # Quiz data (JSON)
├── tutorials/                  # Tutorial configurations
├── public/                     # Static assets
│
├── docker-compose.yml
├── package.json
└── README.md
```

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Material-UI v5** - Component library (custom themed for middle school)
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Socket.IO Client** - Real-time simulation updates
- **Highcharts** - Graph visualization (large fonts, thick lines)
- **ccnetviz** - Network visualization (enhanced for clarity)
- **D3.js** - Additional visualizations
- **react-dnd** - Drag-and-drop functionality
- **react-joyride** - Interactive tutorials
- **scorm-again** - SCORM 1.2/2004 support

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Socket.IO** - Real-time communication
- **PostgreSQL** - Database
- **SCORM-again** - SCORM API implementation

### Infrastructure
- **Docker** - Containerization (3 containers: web, db, nginx)
- **Nginx** - Reverse proxy and static file serving

## 🎨 Design Principles (PhET & Amplify Inspired)

### Visual Design
- **Base font size**: 16px (vs industry standard 14px)
- **Touch targets**: Minimum 44x44px (WCAG AAA compliant)
- **Graph lines**: 4px thick (vs typical 1-2px)
- **Component nodes**: 80x60px (vs original 30x20px)
- **Connection lines**: 3px thick with clear arrows
- **Color contrast**: WCAG AA compliant
- **Rounded corners**: 8-12px for friendly appearance

### Interaction Design
- **Explicit feedback**: Loading states, success/error messages
- **Clear affordances**: Buttons look clickable, draggable items have handles
- **Forgiving interface**: Easy undo/reset, confirmation dialogs
- **Consistent patterns**: Same interactions work the same everywhere
- **Keyboard accessible**: Full keyboard navigation support

### Educational Scaffolding
- **Guided tutorials**: Step-by-step walkthroughs using react-joyride
- **Tooltips everywhere**: Hover any element for explanations
- **Glossary integration**: Biological terms defined inline
- **Progressive complexity**: Wizard mode for beginners, advanced mode for experienced users

## 🏗️ What's Been Built

### ✅ Infrastructure & Configuration
- [x] Repository structure created
- [x] Docker compose configuration (web, db, nginx)
- [x] Vite configuration with aliases and optimizations
- [x] Environment variable setup
- [x] Git ignore and project files

### ✅ Frontend Foundation
- [x] Material-UI theme (PhET-inspired, 16px base font, large touch targets)
- [x] Redux Toolkit store setup
  - [x] Models slice
  - [x] Simulation slice
  - [x] Editor slice
  - [x] Quiz slice
  - [x] UI slice
- [x] React Router setup
- [x] Main App component structure
- [x] Package.json with all dependencies

### ✅ Backend Foundation
- [x] Express server setup
- [x] Socket.IO integration for real-time simulation
- [x] API route structure:
  - [x] `/api/models` - Model CRUD operations
  - [x] `/api/simulation` - Simulation execution
  - [x] `/api/scorm` - SCORM package management
  - [x] `/api/quiz` - Quiz management and scoring
- [x] Health check endpoints

### ✅ Design Research
- [x] PhET Interactive Simulations analysis
- [x] Amplify Science analysis
- [x] Educational node-graph visualization best practices

## 🔨 What Needs to Be Built

### High Priority (Core Functionality)

#### 1. Component Editor (Critical - User Pain Point)
**Problem**: Original had tiny circles (8-12px), hard to click/connect, confusing interface

**Solution**:
- [ ] Component Library Panel
  - Large component cards (60x80px minimum)
  - Search and filter
  - Categories: Proteins, Genes, Molecules, Signals
  - Drag-and-drop to canvas

- [ ] Drag-and-Drop System
  - Ghost preview while dragging
  - Snap to grid
  - Large drop zones
  - Visual feedback (highlights, animations)

- [ ] Connection System
  - Mode toggle: Edit Mode / Connect Mode
  - Click source → drag to target
  - Thick connection lines (3px)
  - Color-coded: Green (activation), Red (inhibition)
  - Labels on hover
  - Easy deletion (click + delete key)

- [ ] Wizard Mode
  - Step 1: Name your model
  - Step 2: Add components (simplified)
  - Step 3: Define relationships (drag lines)
  - Step 4: Set initial states
  - Step 5: Preview and save

#### 2. Simulation Controls (Critical - User Pain Point)
**Problem**: Controls scattered, unclear status, hard to use

**Solution**:
- [ ] Unified Control Panel (docked bottom)
  - Large buttons (60x60px): Play, Pause, Stop, Reset
  - Speed slider (visual labels: 🐢 Slow → 🐰 Fast)
  - Step counter with progress
  - Clear status indicator
  - Keyboard shortcuts (Space, R, S)

#### 3. Graph Visualization (Critical - Readability)
**Problem**: Small fonts, thin lines, hard to read

**Solution**:
- [ ] Highcharts Integration
  - 16px+ font sizes for all labels
  - 4px line thickness
  - Large legend with color swatches
  - Clear axis labels
  - Hover tooltips with values
  - Zoom and pan controls

#### 4. Network Visualization Enhancement
- [ ] ccnetviz Configuration
  - Large nodes (80x60px)
  - 14px bold fonts
  - Thick edges (3px)
  - Color-coded by state (ON=green glow, OFF=gray)
  - Icons/emojis for component types
  - Auto-layout with manual override

#### 5. SCORM Integration
- [ ] Install scorm-again library
- [ ] Find sample SCORM packages (SCORM Cloud, Articulate Community)
- [ ] SCORM Player Component
  - Iframe rendering
  - Progress tracking
  - Score reporting
  - Resume functionality
- [ ] Integration with lessons
  - Pre-simulation lessons
  - Post-simulation reflections
  - Combined scoring

#### 6. 20 Middle School Models
**Categories**:
- Cell Processes (6): Cell cycle, Photosynthesis, Respiration, Protein synthesis, Membrane transport, Apoptosis
- Genetics (4): Gene regulation, DNA replication, Inheritance, Mutations
- Human Biology (5): Immune response, Blood sugar, Neurons, Hormones, Wound healing
- Disease & Health (5): Cancer, Viral infection, Antibiotic resistance, Inflammation, Vaccines

**For each model**:
- [ ] Simplify to 8-15 components
- [ ] 6th-grade reading level descriptions
- [ ] 5-7 glossary terms
- [ ] 3 suggested experiments
- [ ] Initial conditions set

#### 7. Interactive Tutorials
- [ ] react-joyride setup
- [ ] Onboarding tutorial (5 steps)
- [ ] Component adding tutorial (addresses pain point)
- [ ] Connection making tutorial
- [ ] Simulation running tutorial
- [ ] Per-model tutorials (5 priority models)

#### 8. Quiz System
- [ ] Quiz component
  - Multiple choice
  - True/False
  - Image-based questions
- [ ] Immediate feedback
- [ ] Score tracking
- [ ] Retry functionality
- [ ] 5-7 questions per model × 20 models

### Medium Priority

#### 9. UI Components
- [ ] Layout component with navigation
- [ ] HomePage with welcome message
- [ ] ModelBrowserPage with large cards
  - Grid layout
  - Difficulty indicators
  - Category filters
  - Search
- [ ] SimulationPage
  - Network view
  - Graph view
  - Control panel
  - Component list
- [ ] EditorPage
  - Canvas
  - Component library
  - Properties panel
  - Mode toggle

#### 10. Additional Features
- [ ] Save/Load models
- [ ] Export to PDF
- [ ] Model sharing (basic)
- [ ] Help documentation

### Testing & Quality Assurance

#### 11. Automated Testing
- [ ] Jest unit tests
  - Redux slices
  - Utility functions
  - Component logic
- [ ] Cypress E2E tests
  - Model browsing
  - Simulation running
  - Component adding
  - Quiz taking

#### 12. Manual Testing Protocols
- [ ] Component adding (20 trials, < 30 sec average)
- [ ] Connection making (20 trials, < 45 sec average)
- [ ] Simulation running (10 models)
- [ ] Graph rendering (all 20 models)
- [ ] SCORM content (2+ packages)

#### 13. Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (if available)
- [ ] Mobile/tablet (iPad, Android tablet)

## 🔧 Installation & Setup

### Prerequisites
- Docker Desktop
- Node.js 18+ (if running locally without Docker)
- Git

### Quick Start (Docker)

```bash
# Clone repository
git clone https://github.com/charlesmartinedd/cellcollectivek12revamp.git
cd cellcollectivek12revamp

# Create environment file
cp .env.example .env

# Start Docker containers
docker-compose up

# Access application
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
# Nginx: http://localhost:80
```

### Local Development (Without Docker)

```bash
# Install root dependencies
npm install

# Install client dependencies
cd src/client
npm install

# Install server dependencies
cd ../server
npm install

# Run development servers (from root)
npm run dev
```

## 📊 Current Status & Next Steps

### Completed (Foundation)
✅ Project architecture designed
✅ Docker configuration created
✅ Redux store implemented
✅ Material-UI theme (PhET-inspired)
✅ Server routes structured
✅ Research on PhET/Amplify design completed

### In Progress
🔄 Creating comprehensive documentation
🔄 Setting up basic React components

### Next Iteration Priorities
1. **Component Editor** - Critical user pain point, must be intuitive
2. **Simulation Controls** - Large, clear, obvious
3. **Graph Visualization** - 16px+ fonts, thick lines
4. **20 Models** - Curate from Cell Collective
5. **SCORM Integration** - Lessons embedded
6. **Testing** - Both automated and manual (3x validation)

## 🎯 Success Criteria

### Functional Requirements
- ✅ All 20 models load and run without errors
- ✅ Component adding success rate: 100% (20/20 trials)
- ✅ Average time to add component: < 30 seconds
- ✅ Connection making success rate: 100% (20/20 trials)
- ✅ Average time to make connection: < 45 seconds
- ✅ Simulation runs smoothly (30+ FPS)
- ✅ Graphs render clearly with large fonts
- ✅ SCORM content loads and tracks progress
- ✅ Quizzes work and score correctly

### UX Requirements (PhET Standard)
- ✅ Touch targets: >= 44x44px (all interactive elements)
- ✅ Font sizes: >= 16px body, >= 14px labels
- ✅ Line thickness: >= 3px (connections), >= 4px (graphs)
- ✅ Color contrast: WCAG AA compliant
- ✅ Page load: < 3 seconds
- ✅ Zero critical bugs
- ✅ Works on Chrome, Firefox, Edge
- ✅ Responsive (desktop 1280x720+, tablet 768x1024+)

## 📚 Resources

### Design Inspiration
- [PhET Interactive Simulations](https://phet.colorado.edu/)
- [Amplify Science](https://amplify.com/programs/amplify-science/)

### Technical Documentation
- [Material-UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Highcharts](https://www.highcharts.com/)
- [ccnetviz](https://github.com/HelikarLab/ccNetViz)
- [SCORM-again](https://github.com/jcputney/scorm-again)
- [react-joyride](https://react-joyride.com/)

### Original Project
- [Cell Collective](https://cellcollective.org/)
- [Cell Collective GitHub](https://github.com/HelikarLab/cellcollective)

## 👥 Contributing

This is an educational project. Contributions welcome!

Priority areas:
1. Usability improvements (especially component editor)
2. Additional middle school models
3. Educational content (glossaries, descriptions)
4. Quiz questions
5. Tutorial improvements

## 📝 License

MIT License - See LICENSE file

## 🙏 Acknowledgments

- Original Cell Collective team at Helikar Lab
- PhET Interactive Simulations (University of Colorado Boulder)
- Amplify Science team

---

**Status**: Foundation complete, ready for feature implementation
**Last Updated**: 2025-10-22
**Version**: 1.0.0-alpha

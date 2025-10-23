# MVP Requirements - What's Left to Build

**Current Status**: Foundation + UI Complete (~60% done)
**Remaining for MVP**: Core functionality (~40% remaining)

---

## ✅ What's Already Working

### Infrastructure & UI (100% Complete)
- [x] React 18 + Vite setup
- [x] Material-UI theme (PhET-inspired)
- [x] Redux Toolkit state management
- [x] Docker configuration
- [x] Basic navigation and routing
- [x] Component Editor UI (drag-drop, canvas, nodes)
- [x] Simulation Controls UI (buttons, slider, status)
- [x] Graph Visualization UI (Highcharts, large fonts)
- [x] Responsive layout
- [x] Git repository with documentation

### What You Can Do Now
- ✅ Navigate between pages
- ✅ Drag components from library to canvas
- ✅ Move components around (snap to grid)
- ✅ Toggle component states (ON/OFF)
- ✅ Delete components
- ✅ See sample graph visualization
- ✅ Click simulation control buttons (updates Redux state)
- ✅ Adjust simulation speed
- ✅ Search/filter components

---

## ❌ What's Missing for MVP (Prioritized)

### 🔴 CRITICAL - Core Functionality (Must Have)

#### 1. Connection System (~3 hours)
**Status**: Lines render but can't create new connections

**What's Needed**:
- [ ] Click-and-drag to connect components
- [ ] Modal to select connection type (activation/inhibition)
- [ ] Connection deletion
- [ ] Store connections in Redux
- [ ] Visual feedback during connection creation

**Files to Update**:
- `EditorCanvas.jsx` - Add connection mode
- `ConnectionLine.jsx` - Make clickable/deletable
- `editorSlice.js` - Connection state management

#### 2. Boolean Simulation Engine (~6 hours)
**Status**: Controls work but no actual simulation runs

**What's Needed**:
- [ ] Boolean logic evaluator for components
- [ ] Update rules based on connections (AND, OR logic)
- [ ] Step-by-step simulation loop
- [ ] Real-time state updates via Socket.IO
- [ ] Graph updates with actual simulation data
- [ ] Component state visualization on canvas

**Files to Create/Update**:
- `src/server/simulation/booleanEngine.js` - Core simulation logic
- `src/client/src/utils/simulationRunner.js` - Client-side runner
- `SimulationControls.jsx` - Connect to real engine
- `SimulationGraph.jsx` - Use real data instead of sample

**Example Logic**:
```javascript
// Simple Boolean evaluation
function evaluateComponent(component, inputs, connections) {
  const activeInputs = connections
    .filter(c => c.target === component.id && c.type === 'activation')
    .filter(c => inputs[c.source].state === true)

  return activeInputs.length > 0 // Simple OR logic
}
```

#### 3. Network Visualization with Component States (~4 hours)
**Status**: Placeholder only

**What's Needed**:
- [ ] Integrate ccnetviz library
- [ ] Render components as network nodes
- [ ] Show connections as edges
- [ ] Update node colors based on state (ON=green, OFF=gray)
- [ ] Synchronize with canvas editor
- [ ] Auto-layout algorithm

**Files to Create**:
- `src/client/src/components/Visualization/NetworkView.jsx`
- Configure ccnetviz with large nodes (80x60px)

#### 4. Save/Load Models (~3 hours)
**Status**: Buttons exist but don't do anything

**What's Needed**:
- [ ] Save model to localStorage (MVP - simple)
- [ ] Load model from localStorage
- [ ] Export as JSON file
- [ ] Import from JSON file
- [ ] Database integration (later - for now localStorage is fine)

**Files to Update**:
- `EditorPage.jsx` - Wire up Save/Load buttons
- Add utility functions for serialization

#### 5. At Least 5-10 Pre-built Models (~5 hours)
**Status**: Only 4 placeholder models

**What's Needed**:
- [ ] 5-10 complete, functional models with:
  - Components defined
  - Connections defined
  - Initial states set
  - Descriptions written (6th grade reading level)
  - Suggested experiments (3 per model)

**Models to Create** (Priority):
1. **Photosynthesis** (Simple - 8 components)
   - Light → Chloroplast → ATP → Glucose

2. **Cell Cycle** (Medium - 10 components)
   - Growth signals → CDK → Cell division

3. **Immune Response** (Medium - 12 components)
   - Antigen → T Cell → Antibodies

4. **Blood Sugar Regulation** (Simple - 8 components)
   - Glucose → Insulin/Glucagon → Storage

5. **DNA Replication** (Medium - 10 components)
   - DNA → Helicase → DNA Polymerase → New DNA

**Files to Create**:
- `models/photosynthesis.json`
- `models/cell-cycle.json`
- `models/immune-response.json`
- `models/blood-sugar.json`
- `models/dna-replication.json`

### 🟡 IMPORTANT - Enhanced Functionality (Should Have)

#### 6. Backend Server Running (~1 hour)
**Status**: Server code exists but not running

**What's Needed**:
- [ ] Install server dependencies
- [ ] Start Express server
- [ ] Connect Socket.IO to frontend
- [ ] Test API endpoints
- [ ] Database connection (optional for MVP - can use JSON files)

**Commands**:
```bash
npm install  # Root dependencies
npm run server:dev  # Start backend
```

#### 7. Model Browser with Real Models (~2 hours)
**Status**: Shows 4 placeholder cards

**What's Needed**:
- [ ] Load models from JSON files or API
- [ ] Display actual model metadata
- [ ] "Run Simulation" button loads actual model
- [ ] Model detail modal with full description
- [ ] Filter by category/difficulty

**Files to Update**:
- `ModelBrowserPage.jsx` - Fetch real models
- `modelsSlice.js` - API integration

#### 8. Basic Tutorial System (~3 hours)
**Status**: Not implemented

**What's Needed**:
- [ ] Install react-joyride
- [ ] Onboarding tutorial (5 steps)
- [ ] Editor tutorial (how to drag, connect)
- [ ] Simulation tutorial (how to run)
- [ ] Dismissible and restartable

**Files to Create**:
- `src/client/src/components/Tutorial/OnboardingTutorial.jsx`
- `src/client/src/components/Tutorial/EditorTutorial.jsx`
- Configure tutorial steps in JSON

### 🟢 NICE TO HAVE - Polish (Could Have)

#### 9. Quiz System (~4 hours)
**Status**: Not implemented

**What's Needed**:
- [ ] Quiz component (multiple choice, true/false)
- [ ] 5 questions per model minimum
- [ ] Immediate feedback
- [ ] Score tracking
- [ ] Retry functionality

#### 10. SCORM Integration (~4 hours)
**Status**: Not implemented

**What's Needed**:
- [ ] Install scorm-again
- [ ] SCORM player component
- [ ] Sample SCORM package
- [ ] Progress tracking

---

## 📊 MVP Checklist Summary

### Absolutely Required (Must Have - ~22 hours)
- [ ] Connection system working (3h)
- [ ] Boolean simulation engine (6h)
- [ ] Network visualization with states (4h)
- [ ] Save/Load functionality (3h)
- [ ] 5-10 pre-built models (5h)
- [ ] Backend server running (1h)

### Strongly Recommended (Should Have - ~5 hours)
- [ ] Model browser with real data (2h)
- [ ] Basic tutorial system (3h)

### Optional for MVP (Could Have - ~8 hours)
- [ ] Quiz system (4h)
- [ ] SCORM integration (4h)

**Total to MVP: ~27-35 hours of focused development**

---

## 🎯 Minimum Functional MVP

To have a **working, demonstrable MVP**, you need:

### Absolute Minimum (Core Loop Working)
1. ✅ Can add components (DONE)
2. ❌ Can connect components (NEEDED)
3. ❌ Can run simulation (NEEDED)
4. ❌ See components change state (NEEDED)
5. ❌ See graph update with real data (NEEDED)
6. ❌ Have 3-5 working models (NEEDED)

### User Journey for MVP
```
Student opens app
  → Clicks "Explore Models"
  → Clicks "Photosynthesis" model
  → Sees network of components
  → Clicks "Play" button
  → Components turn ON/OFF based on simulation
  → Graph shows activity over time
  → Student can pause, adjust speed, reset
  → Student can click "Create Model"
  → Drag components to canvas
  → Connect them with click-drag
  → Run their own simulation
  → Save their model
```

**If this journey works = MVP is complete!**

---

## 🚀 Recommended Build Order

### Phase 1: Core Simulation (High Priority - 10 hours)
1. **Connection System** (3h)
   - Implement click-drag to connect
   - Store in Redux
   - Render thick lines

2. **Boolean Engine** (6h)
   - Write evaluation logic
   - Socket.IO real-time updates
   - State propagation

3. **Test with 1 Model** (1h)
   - Create photosynthesis.json
   - Test full simulation loop

### Phase 2: Visualization & Models (Medium Priority - 9 hours)
4. **Network Visualization** (4h)
   - ccnetviz integration
   - State-based coloring
   - Sync with canvas

5. **4 More Models** (4h)
   - Cell cycle, Immune, Blood sugar, DNA

6. **Save/Load** (3h)
   - LocalStorage implementation
   - JSON import/export

### Phase 3: Backend & Polish (Lower Priority - 8 hours)
7. **Backend Server** (1h)
   - Start server
   - Test Socket.IO

8. **Model Browser** (2h)
   - Load real models
   - Better UI

9. **Tutorial** (3h)
   - Onboarding flow
   - Editor guidance

10. **Testing & Bug Fixes** (2h)
   - Manual testing
   - Fix issues

---

## 📈 Progress Tracking

**Current**: 60% Complete (Foundation + UI)
**After Phase 1**: 80% Complete (Core functionality)
**After Phase 2**: 95% Complete (Full MVP)
**After Phase 3**: 100% Complete (Polished MVP)

---

## 🎬 Next Immediate Steps

### Right Now (Next 3 hours)
1. **Build Connection System** (1.5h)
   - Enable click-drag connections
   - Modal for connection type
   - Store in Redux

2. **Start Boolean Engine** (1.5h)
   - Write basic evaluation logic
   - Single-step simulation
   - Update component states

### Today (Next 6 hours)
3. **Complete Boolean Engine** (3h)
   - Multi-step simulation
   - Socket.IO integration
   - Graph updates

4. **Create 1 Full Model** (1h)
   - Photosynthesis with real connections
   - Test full simulation

5. **Network Visualization** (2h)
   - Basic ccnetviz setup
   - Show component states

### This Week (Remaining time)
6. **4 More Models** (4h)
7. **Save/Load** (3h)
8. **Tutorial** (3h)
9. **Testing** (2h)

---

## 💡 Technical Debt & Future Enhancements

**Not needed for MVP but good to track**:
- Database integration (using localStorage for now)
- User authentication
- Teacher dashboards
- Student accounts
- LMS integration
- Advanced analysis features
- Mobile app
- Accessibility improvements
- Performance optimization
- Automated testing
- CI/CD pipeline

---

**Focus for MVP**: Get the core simulation loop working with 5 models.
**Timeline**: ~27-35 hours to fully functional MVP
**Next Action**: Build connection system (start immediately)

---

*Last Updated: 2025-10-23*
*Status: 60% Complete - Foundation Done, Core Features In Progress*

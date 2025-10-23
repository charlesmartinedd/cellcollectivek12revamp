# Testing Guide - Cell Collective K-12 MVP

## Complete User Journey Test

### Prerequisites
- Dev server running on http://localhost:5180
- Browser open with React DevTools (optional but helpful)

---

## Test 1: Load Pre-built Model ✓

**Steps:**
1. Open http://localhost:5180
2. Navigate to "Editor" page
3. Click "Load Model" button
4. Select "Photosynthesis Model" from dropdown
5. **Expected Result**: 10 components appear on canvas with connections

**Validation:**
- [ ] 10 components visible (Sunlight, Water, CO₂, Chlorophyll, Light Reactions, ATP, NADPH, Calvin Cycle, Glucose, Oxygen)
- [ ] Components have correct colors
- [ ] 10 connection lines visible
- [ ] Green lines for activation, red lines for inhibition
- [ ] Component count shows "10 Components"

---

## Test 2: Create Connections ✓

**Steps:**
1. After loading Photosynthesis model
2. Click "Connect Mode" toggle
3. Canvas turns orange, cursor becomes crosshair
4. Click "Sunlight" component (source)
5. Click "Chlorophyll" component (target)
6. Dialog opens
7. Select "Activation"
8. Click "Create Connection"
9. **Expected Result**: New green line appears

**Validation:**
- [ ] Orange overlay appears in connect mode
- [ ] Banner shows "Selected: Sunlight → Click target"
- [ ] Dialog shows both component names
- [ ] New connection line appears
- [ ] Line is green (activation) or red (inhibition)
- [ ] Can create multiple connections

---

## Test 3: Run Simulation ✓

**Steps:**
1. After loading model
2. Navigate to "Simulation" page
3. Verify warning is NOT shown (model has components)
4. Click green Play button (60x60px)
5. **Expected Result**: Simulation runs

**Validation:**
- [ ] Play button changes to Pause (orange)
- [ ] Status chip shows "RUNNING" (green)
- [ ] Step counter increments (0, 1, 2, 3...)
- [ ] Network visualization updates in real-time
- [ ] Graph plot shows lines appearing
- [ ] Component states grid shows ON/OFF changes
- [ ] Components on canvas change color when ON
- [ ] Simulation auto-stops at 50 steps or steady state

---

## Test 4: Network Visualization ✓

**Steps:**
1. During simulation (from Test 3)
2. Watch the network graph panel
3. **Expected Result**: Nodes change color in real-time

**Validation:**
- [ ] Network graph displays all components as nodes
- [ ] Nodes show component names as labels
- [ ] Nodes are large enough to see (20-30px)
- [ ] Active nodes show component color
- [ ] Inactive nodes show gray
- [ ] Connection lines visible
- [ ] Green lines for activation
- [ ] Red lines for inhibition
- [ ] Layout is readable and organized

---

## Test 5: Graph Visualization ✓

**Steps:**
1. During simulation (from Test 3)
2. Watch the graph panel
3. Toggle between Line Chart and Bar Chart
4. Hover over data points
5. **Expected Result**: Real-time graph updates

**Validation:**
- [ ] Graph shows one line per component
- [ ] Lines are thick (4px) and visible
- [ ] Each component has correct color
- [ ] X-axis shows "Time Steps"
- [ ] Y-axis shows 0 to 1
- [ ] Data points update in real-time
- [ ] Hover tooltip shows "ON" or "OFF"
- [ ] Toggle between line/bar works
- [ ] Legend shows all component names
- [ ] Can click legend to hide/show series

---

## Test 6: Simulation Controls ✓

**Steps:**
1. Start simulation
2. Test each control button
3. Test keyboard shortcuts

**Button Tests:**
- [ ] **Play/Pause**: Toggles simulation (Space key)
- [ ] **Stop**: Stops and resets to step 0 (S key)
- [ ] **Reset**: Clears history, keeps at step 0 (R key)
- [ ] **Step**: Advances one frame at a time (N key)

**Speed Tests:**
- [ ] Slider moves from 🐢 Slow to 🐰 Fast
- [ ] Slow = 1 second per step (visible changes)
- [ ] Fast = 50ms per step (rapid changes)
- [ ] Speed change takes effect immediately

**Validation Warnings:**
- [ ] If no components: Shows warning alert
- [ ] If no connections: Shows warning alert
- [ ] Play button disabled if invalid
- [ ] Clear warning message displayed

---

## Test 7: Component States Display ✓

**Steps:**
1. During simulation
2. Watch component states grid at bottom
3. **Expected Result**: Cards update in real-time

**Validation:**
- [ ] One card per component
- [ ] Cards show component name
- [ ] Cards show ON/OFF badge
- [ ] ON badge is green
- [ ] OFF badge is gray
- [ ] Card background highlights when ON
- [ ] Updates synchronized with simulation
- [ ] All 10 components visible

---

## Test 8: Save Model ✓

**Steps:**
1. Go to Editor page
2. Add/modify components
3. Click "Save Model" button
4. Enter model name: "Test Model"
5. Click "Save & Export"
6. **Expected Result**: JSON file downloads

**Validation:**
- [ ] Dialog opens with text field
- [ ] Shows component and connection count
- [ ] File downloads with .json extension
- [ ] Filename matches entered name
- [ ] JSON contains components array
- [ ] JSON contains connections array
- [ ] JSON is valid (can open in text editor)

---

## Test 9: Import Model ✓

**Steps:**
1. Go to Editor page
2. Click "Load Model" button
3. Select "Import from File..."
4. Choose saved JSON file from Test 8
5. **Expected Result**: Model loads from file

**Validation:**
- [ ] File picker opens
- [ ] Accepts .json files
- [ ] Model name updates in header
- [ ] Components appear on canvas
- [ ] Connections appear
- [ ] Alert shows "Loaded: [model name]"
- [ ] Can simulate loaded model

---

## Test 10: Drag and Drop Components ✓

**Steps:**
1. Go to Editor page
2. Ensure in "Edit Mode" (not Connect Mode)
3. Drag "Protein" from library
4. Drop onto canvas
5. **Expected Result**: New component appears

**Validation:**
- [ ] Component follows cursor during drag
- [ ] Canvas highlights blue when dragging over it
- [ ] Component drops at cursor position
- [ ] Component snaps to 20px grid
- [ ] Can drag component to reposition
- [ ] Component count updates
- [ ] Multiple components can be added

---

## Test 11: Delete Components ✓

**Steps:**
1. After adding components
2. Click trash icon on a component
3. **Expected Result**: Component removed

**Validation:**
- [ ] Component disappears
- [ ] Related connections also removed
- [ ] Component count decreases
- [ ] No errors in console
- [ ] Other components unaffected

---

## Test 12: Toggle Component State ✓

**Steps:**
1. After adding components
2. Click power button on component
3. **Expected Result**: State toggles ON/OFF

**Validation:**
- [ ] Power button is green when ON
- [ ] Power button is gray when OFF
- [ ] Component background highlights when ON
- [ ] State label shows "ON" or "OFF"
- [ ] Click toggles between states
- [ ] Visual feedback is immediate

---

## Test 13: Keyboard Shortcuts ✓

**Steps:**
1. Go to Simulation page
2. Load model
3. Test each keyboard shortcut

**Tests:**
- [ ] **Space**: Play/Pause simulation
- [ ] **R**: Reset simulation
- [ ] **S**: Stop simulation
- [ ] **N**: Next step (manual advance)

**Edge Cases:**
- [ ] Shortcuts work when not focused on input
- [ ] Shortcuts don't trigger in text fields
- [ ] Help text displays all shortcuts

---

## Test 14: Responsive Layout ✓

**Steps:**
1. Resize browser window
2. Test at different widths
3. **Expected Result**: Layout adapts

**Validation:**
- [ ] Components remain visible
- [ ] Controls don't overflow
- [ ] Text remains readable
- [ ] Buttons remain tappable (44px min)
- [ ] Graph resizes appropriately
- [ ] No horizontal scroll on panels

---

## Test 15: Edge Cases ✓

### Empty Model
- [ ] Warning shows on Simulation page
- [ ] Play button disabled
- [ ] Clear message: "Add components first"

### Single Component (no connections)
- [ ] Warning shows about missing connections
- [ ] Can still add connections
- [ ] Component stays in initial state

### Circular Connections
- [ ] Can create A→B and B→A
- [ ] Simulation handles correctly
- [ ] No infinite loops or crashes

### Steady State Detection
- [ ] Simulation stops when all states stable
- [ ] Console shows "Steady state reached"
- [ ] Can reset and run again

### Max Steps Limit
- [ ] Simulation stops at 50 steps
- [ ] Console shows "Maximum steps reached"
- [ ] Can reset and run again

---

## Performance Tests ✓

### Large Model (20+ components)
- [ ] Loads without lag
- [ ] Simulation runs smoothly
- [ ] Graph updates without stuttering
- [ ] Network visualization performs well

### Rapid Operations
- [ ] Spam clicking Play/Pause
- [ ] Quickly dragging multiple components
- [ ] Rapid connection creation
- [ ] Fast speed simulation
- [ ] No crashes or errors

---

## Browser Compatibility ✓

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (if Mac available)

**Expected:** All features work in all browsers

---

## Known Issues to Check

1. **Graph not updating?**
   - Check browser console for errors
   - Verify history array is populating
   - Check Highcharts is loaded

2. **Network visualization blank?**
   - Check ccnetviz is loaded
   - Verify canvas element exists
   - Check components array not empty

3. **Simulation doesn't start?**
   - Verify components exist
   - Verify connections exist
   - Check useSimulation hook is running
   - Look for errors in console

4. **File import fails?**
   - Verify JSON format is valid
   - Check all required fields present
   - Ensure component IDs are unique

---

## Success Criteria

**MVP is considered functional if:**
- ✓ All 15 main tests pass
- ✓ No critical bugs or crashes
- ✓ Performance is smooth (60fps target)
- ✓ All visual feedback works
- ✓ Save/Load works correctly
- ✓ Pre-built model loads and simulates
- ✓ User can create custom models
- ✓ Browser console shows no errors

---

## Reporting Issues

When reporting issues, include:
1. **Test number** that failed
2. **Browser** and version
3. **Console errors** (screenshot)
4. **Steps to reproduce**
5. **Expected vs actual** behavior
6. **Screenshots** of issue

---

## Next Steps After Testing

If all tests pass:
1. Create 4 more pre-built models
2. Add tutorial/onboarding
3. Implement quiz system
4. Add SCORM support
5. Deploy to production

If tests fail:
1. Document failures
2. Fix critical bugs first
3. Re-test after fixes
4. Repeat until all pass

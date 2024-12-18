const contentWrapper = document.querySelector(".content-wrapper");


// Initialize lhs of grid
const lhs = document.createElement("div");
lhs.classList.add("lhs");
contentWrapper.append(lhs);


// Initialize grid
const INITIAL_SIDELENGTH = 16;
const grid = document.createElement("div");
grid.classList.add("grid");  
populateGrid(INITIAL_SIDELENGTH);
contentWrapper.append(grid);

// Paint grid square when hovered over
const DEFAULT_COLOR = "#a8b6f7";
let paintColor = DEFAULT_COLOR;
grid.addEventListener("mouseover", paintGridSquare);

// Disable painting by default
let isPainting = false;
// Toggle painting from within the grid by clicking the mouse
grid.addEventListener("click", togglePaintBrush);


// Initialize rhs of grid
const rhs = document.createElement("div");
rhs.classList.add("rhs");
contentWrapper.append(rhs);

// Initialize button to change grid density and append to rhs
const gridDensityBtn = document.createElement("button");
gridDensityBtn.setAttribute("type", "button");
gridDensityBtn.classList.add("grid-density");
gridDensityBtn.textContent = "Change grid density";
gridDensityBtn.addEventListener("click", changeGridDensity);
rhs.append(gridDensityBtn);

// Initialize button to clear the grid and append to rhs
const clearGridBtn = document.createElement("button");
clearGridBtn.setAttribute("type", "button");
clearGridBtn.classList.add("clear-grid");
clearGridBtn.textContent = "Clear";
clearGridBtn.addEventListener("click", clearGrid);
rhs.append(clearGridBtn);

// Initialize color picker and append to rhs
const colorPicker = document.createElement("input");
colorPicker.setAttribute("type", "color");
colorPicker.setAttribute("value", DEFAULT_COLOR);
colorPicker.addEventListener("input", updatePaintColor);
colorPicker.select();
rhs.append(colorPicker);

// Toggle painting from outside of the grid via a checkbox
// Initialize checkbox
const paintbrushCheckbox = document.createElement("input");
paintbrushCheckbox.setAttribute("type", "checkbox");
paintbrushCheckbox.addEventListener("change", togglePaintBrush);
paintbrushCheckbox.setAttribute("id", "paintbrushCheckbox");

// Initialize checkbox label
const paintbrushLabel = document.createElement("label");
paintbrushLabel.setAttribute("for", "paintbrushCheckbox");
paintbrushLabel.textContent = "Paintbrush";

// Wrap the checkbox and label in a div and display
const checkboxWrapper = document.createElement("div");
checkboxWrapper.setAttribute("class", "checkbox-wrapper")
checkboxWrapper.append(paintbrushCheckbox);
checkboxWrapper.append(paintbrushLabel);
rhs.append(checkboxWrapper);

// Add divs surronding content-wrapper
const above = document.createElement("div");
above.classList.add("above");
document.body.prepend(above);

const below = document.createElement("div");
below.classList.add("below");
contentWrapper.after(below);

// Add a title to the div above the content wrapper
const title = document.createElement("h1");
title.classList.add("title");
title.textContent = "Sketch Pad";
above.append(title);

// Add a description bewlow the title
const description = document.createElement("p");
description.classList.add("description");
description.textContent = "Click anywhere inside the canvas to toggle the paint brush";
above.append(description);


// Create a square grid of squares
// Input: side length (in units of grid squares)
// Returns a reference to the grid (node element)
function populateGrid(sideLength) { 
    for (let i = 0; i < sideLength; i++) {
        // Create row container
        const row = document.createElement("div");
        row.classList.add("row");
        row.setAttribute("id", `r-${i}`);
    
        for (let j = 0; j < sideLength; j++) {
            // Create grid square and populate row
            const gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            gridSquare.setAttribute("id", `gs-${i}-${j}`);
    
            row.appendChild(gridSquare);
        }
        // Display row (append to grid)
        grid.appendChild(row);
    }
}

// Changes grid density if user input sidlength is valid
function changeGridDensity() {
    const MIN_SIDE_LENGTH = 2;
    const MAX_SIDE_LENGTH = 100;

    // Get new side length from user (in units of grid squares)
    const sideLength = parseInt(
        prompt(`Enter a side length (grid squares) between ${MIN_SIDE_LENGTH} and ${MAX_SIDE_LENGTH}`, "")
    );

    // Do nothing if user input is invalid
    if (isNaN(sideLength) || 
    sideLength < MIN_SIDE_LENGTH || 
    sideLength > MAX_SIDE_LENGTH) {
        console.log(`Input: ${sideLength}, invalid input.`);
        return;
    }

    // Remove the existing grid
    while (grid.firstChild) {
        grid.firstChild.remove();
    }

    // Create a new grid with user-specified side length
    populateGrid(sideLength);
}

// Removes paint from painted elements
function clearGrid() {
    const painted = document.querySelectorAll(".painted");
    painted.forEach(element => {
        // Clear styles applied via external css
        element.classList.remove("painted");

        const paintColor = [...element.classList].find(className => className.startsWith("#"));
        element.classList.remove(paintColor);

        element.style.opacity = "";

        // Clear inline styles applied via the color picker
        element.style.backgroundColor = "";
    });
}

// Event handler for color picker input
// Updates paint color based on input
function updatePaintColor(event) {
    paintColor = event.target.value;
}

function paintGridSquare(event) {
    if (!isPainting) return; 

    const PAINTED = "painted";
    // Get the hovered grid square
    const target = event.target;

    // If target is not a grid square, do nothing
    if (!target.classList.contains("grid-square")) return;

    console.log(`over -> ${target.id}`);

    if (target.classList.contains(PAINTED)) {
        const MAX_OPACITY = 1;
        const DARKEN_FACTOR = 1.2;
        const LIGHTEN_DIVISOR = 2;

        const prevPaintColor = [...target.classList].find(className => className.startsWith("#"));
        const opacity = parseFloat(target.style.opacity);

        if (prevPaintColor === paintColor) {
            target.style.opacity = Math.min(MAX_OPACITY, opacity * DARKEN_FACTOR);
        } else {
            target.classList.replace(prevPaintColor, paintColor);
            target.style.opacity = opacity / LIGHTEN_DIVISOR ;
            target.style.backgroundColor = paintColor;
        }

    } else {
        const DEFAULT_OPACITY = 0.35;
        target.classList.add(PAINTED, paintColor);
        target.style.backgroundColor = paintColor;
        target.style.opacity = DEFAULT_OPACITY;
    }
}

function togglePaintBrush(event) {
    if (event.type === "click") {
    paintbrushCheckbox.checked = !paintbrushCheckbox.checked;
    }
    isPainting = !isPainting;
}
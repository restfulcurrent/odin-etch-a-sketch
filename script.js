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
grid.addEventListener("mouseout", logMouseOut);

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
clearGridBtn.textContent = "Clear grid";
clearGridBtn.addEventListener("click", clearGrid);
rhs.append(clearGridBtn);

// Initialize color picker and append to rhs
const colorPicker = document.createElement("input");
colorPicker.setAttribute("type", "color");
colorPicker.setAttribute("value", DEFAULT_COLOR);
colorPicker.addEventListener("input", updatePaintColor);
colorPicker.select();
rhs.append(colorPicker);

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

function logMouseOut(event) {
    // Get the hovered grid square
    const target = event.target;
    console.log(`out <- ${target.id}`);
}
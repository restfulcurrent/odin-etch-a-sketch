const gridContainer = document.querySelector(".grid-container");
const INITIAL_SIDELENGTH = 16;
initializeGrid(gridContainer, INITIAL_SIDELENGTH);
enablePainting(gridContainer);

const gridDensityBtn = document.createElement("button");
initializeGridDensityBtn(gridDensityBtn);

// Creates and displays an n x n grid of squares where n is the side length in terms of squares
// Input: grid container div, side length (n)
function initializeGrid(gridContainer, sideLength) {    
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
        // Display row (append to gridcontainer)
        gridContainer.appendChild(row);
    }
}

// Paintsgrid squares when they are hovered over
function enablePainting(gridContainer) {
    gridContainer.addEventListener("mouseover", logMouseOver);
    gridContainer.addEventListener("mouseout", logMouseOut);
    
    function logMouseOver(event) {
        // Get the hovered grid square
        const target = event.target;

        // If target is not a grid square, do nothing
        if (!target.classList.contains("grid-square")) return;

        console.log(`over -> ${target.id}`);
    
        // Paint the grid square
        target.classList.add("hovered");
    }
    
    function logMouseOut(event) {
        // Get the hovered grid square
        const target = event.target;
        console.log(`out <- ${target.id}`);
    }
}

// Create and display button to change grid density
function initializeGridDensityBtn(gridDensityBtn) {
    gridDensityBtn.setAttribute("type", "button");
    gridDensityBtn.textContent = "Change grid density";
    gridDensityBtn.addEventListener("click", initiateGridDensityChange);
    
    gridContainer.before(gridDensityBtn);

    function initiateGridDensityChange() {
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
        while (gridContainer.firstChild) {
            gridContainer.firstChild.remove();
        }
        
        // Create a new grid with user-specified side length
        initializeGrid(gridContainer, sideLength);
    }
}
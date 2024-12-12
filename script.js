const gridContainer = document.querySelector(".grid-container");
const DEFAULT_SIDELENGTH = 16;
createGrid(gridContainer);
enablePainting(gridContainer);

// Creates a n x n grid of squares where n is the side length in terms of squares
// Input: grid container div, side length (n)
function createGrid(gridContainer, sideLength = DEFAULT_SIDELENGTH) {    
    for (let i = 0; i < sideLength; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        row.setAttribute("id", `r-${i}`);
    
        for (let j = 0; j < sideLength; j++) {
            const gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            gridSquare.setAttribute("id", `gs-${i}-${j}`);
    
            row.appendChild(gridSquare);
        }
    
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
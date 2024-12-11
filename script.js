const gridContainer = document.querySelector(".grid-container");
createGrid(gridContainer);
enablePainting(gridContainer);

function createGrid(gridContainer) {
    const SIDE_LENGTH = 16;
    
    for (let i = 0; i < SIDE_LENGTH; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        row.setAttribute("id", `r-${i}`);
    
        for (let j = 0; j < SIDE_LENGTH; j++) {
            const gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            gridSquare.setAttribute("id", `gs-${i}-${j}`);
    
            row.appendChild(gridSquare);
        }
    
        gridContainer.appendChild(row);
    }
}


function enablePainting(gridContainer) {
    gridContainer.addEventListener("mouseover", logMouseOver);
    gridContainer.addEventListener("mouseout", logMouseOut);
    
    function logMouseOver(event) {
        // Get the hovered grid square
        const target = event.target;
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
createGrid();

function createGrid() {
    const SIDE_LENGTH = 16;
    
    for (let i = 0; i < SIDE_LENGTH; i++) {
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        row.setAttribute("id", `r-${i}`);
    
        for (let j = 0; j < SIDE_LENGTH; j++) {
            const gridSquare = document.createElement("div");
            gridSquare.setAttribute("class", "grid-square");
            gridSquare.setAttribute("id", `gs-${i}-${j}`);
    
            row.appendChild(gridSquare);
        }
    
        const container = document.querySelector(".container");
        container.appendChild(row);
    }
}
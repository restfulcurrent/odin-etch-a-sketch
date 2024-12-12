const contentWrapper = document.querySelector(".content-wrapper");

const lhs = document.createElement("div");
lhs.classList.add("lhs");
contentWrapper.append(lhs);

const INITIAL_SIDELENGTH = 16;
const grid = createGrid(INITIAL_SIDELENGTH);
contentWrapper.append(grid);

const rhs = document.createElement("div");
rhs.classList.add("rhs");
contentWrapper.append(rhs);

// enablePainting(grid);

// const gridDensityBtn = document.createElement("button");
// initializeGridDensityBtn(gridDensityBtn);

// Create an n x n grid of squares where n is the side length in terms of squares
// Input: side length (in units of grid squares)
// Returns a reference to the grid (node element)
function createGrid(sideLength) { 
    const grid = document.createElement("div");
    grid.classList.add("grid");   

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

    return grid;
}

// Paintsgrid squares when they are hovered over
// function enablePainting(grid) {
//     grid.addEventListener("mouseover", logMouseOver);
//     grid.addEventListener("mouseout", logMouseOut);
    
//     function logMouseOver(event) {
//         // Get the hovered grid square
//         const target = event.target;

//         // If target is not a grid square, do nothing
//         if (!target.classList.contains("grid-square")) return;

//         console.log(`over -> ${target.id}`);
    
//         // Paint the grid square
//         target.classList.add("hovered");
//     }
    
//     function logMouseOut(event) {
//         // Get the hovered grid square
//         const target = event.target;
//         console.log(`out <- ${target.id}`);
//     }
// }

// Create and display button to change grid density
// function initializeGridDensityBtn(gridDensityBtn) {
//     gridDensityBtn.setAttribute("type", "button");
//     gridDensityBtn.textContent = "Change grid density";
//     gridDensityBtn.addEventListener("click", initiateGridDensityChange);
    
//     grid.before(gridDensityBtn);

//     function initiateGridDensityChange() {
//         const MIN_SIDE_LENGTH = 2;
//         const MAX_SIDE_LENGTH = 100;
        
//         // Get new side length from user (in units of grid squares)
//         const sideLength = parseInt(
//             prompt(`Enter a side length (grid squares) between ${MIN_SIDE_LENGTH} and ${MAX_SIDE_LENGTH}`, "")
//         );
        
//         // Do nothing if user input is invalid
//         if (isNaN(sideLength) || 
//         sideLength < MIN_SIDE_LENGTH || 
//         sideLength > MAX_SIDE_LENGTH) {
//             console.log(`Input: ${sideLength}, invalid input.`);
//             return;
//         }
        
//         // Remove the existing grid
//         while (grid.firstChild) {
//             grid.firstChild.remove();
//         }
        
//         // Create a new grid with user-specified side length
//         createGrid(grid, sideLength);
//     }
// }
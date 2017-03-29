document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var boardSize = prompt("What board size would you like to play on? 3 or 6?");

var board = {
    cells: [],

}

genBoard();


function startGame() {
    for (var i = 0; i < board.cells.length; i++) {
        board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
        document.addEventListener('click', checkForWin);
        document.addEventListener('contextmenu', checkForWin);

    }
    lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

    for (var i = 0; i < board.cells.length; i++) {
        if (board.cells[i].isMine === true && board.cells[i].isMarked === false) {
            return
        }
        if (board.cells[i].isMine === false && board.cells[i].hidden === true) {
            return
        }

        // You can use this function call to declare a winner (once you've
        // detected that they've won, that is!)

    }

    lib.displayMessage('You win!')
    document.getElementById('clap').play();
}

//Gets board size from first prompt
function genBoard() {

    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            //pushes new properties to board after using the first loop for row and second for columns
            board.cells.push({
                    row: i,
                    col: j,
                    isMine: randomMines(),
                    hidden: true
                }

            )

        }
    }
}

//randomises location of mines
function randomMines() {

    var num = Math.random();
    if (num < 0.3) {
        return true;
    }
    return false;
}





// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
    var count = 0;
    var surrounding = lib.getSurroundingCells(cell.row, cell.col);

    for (var j = 0; j < surrounding.length; j++) {
        if (surrounding[j].isMine === true) {
            count += 1;


        }



    }
    return count;
}

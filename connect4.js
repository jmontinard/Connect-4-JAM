/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {

  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  // we for  loop the inital board to CREATE A # NUM of subarrs based on the value of HEIGHT  by pushing an empty []
  for(let i = 0; i < HEIGHT; i++) {board.push([]);}

  // we loop thru the board[0] to accesses the subAr loop inside of each subAR to push null  based on the Value of Width 
  for(let j = 0; j < board.length; j++) {
       for(let k = 0; k < WIDTH; k++){
        board[j].push(null);
       }
      }


      console.log(board);

// was thingking of ways to make this shorter and I think for the initial loop with could have forEached it with a helper callback but that would have bit longer 

// think of ways to refactor this into ES2015 IF POSSIBLE BUT AS OF NOW ITS  BEING CREATED DYNAMICALLY  

// could use map tooo  look that up  



}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   const htmlBoard = document.getElementById('board')
  // TODO: add comment for this code

  // this creates a table row element tr 
  const top = document.createElement("tr");
  //  top element which contains a tr element and sets an id with the value of 'column-top 
  top.setAttribute("id", "column-top");
    //  top element gets a click event listen that will invoke the handleClick CALLbACK
  top.addEventListener("click", handleClick);

  // WE are looping with the help of WIDTH just like we did to dynamically create the board ARRAY 
  for (let x = 0; x < WIDTH; x++) {
      // this creates a table data element tr  on each loop
    let headCell = document.createElement("td");
      // this sets the id of headCell to x on each loop so on the first loop the id = 0
    headCell.setAttribute("id", x);
     // this appends the headCell to The top element which is the tr on each loop and since Width = 7 each row will have 7 headCells
    top.append(headCell);
  }
  // finally we add the row to our table#board aka htmlBoard
  htmlBoard.append(top);

  // TODO: add comment for this code

  // this actually setting the board where the pieces will fall into place and the board  and add in elements based off the loop condos and the value of Height

  for (let y = 0; y < HEIGHT; y++) {
     // this creates a table row element tr  named row
    const row = document.createElement("tr");
     // we are againing looping dynamically based off the value of WIDTH 
    for (let x = 0; x < WIDTH; x++) {
     // this creates a table data element td  named cell on each loop
      const cell = document.createElement("td");
     // this sets cell's id to y-x using a template literal on each loop in the first loop [cell=0-0]
      cell.setAttribute("id", `${y}-${x}`);
      // appends each cell to row
      row.append(cell);
    }
      // appends each row to the htmlBoard  at the end of every full loop
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0

  // for (let y = HEIGHT - 1; y >= 0; y--) {
  //   if (!board[y][x]) {
  //     return y;
  //   }
  // }
  // return null;
//   const allTd = Array.from(document.querySelectorAll('td'))
//   const column = allTd.filter( td => td.getAttribute("id").includes(`-${x}`))
//   const openSlot = column.findLastIndex(td => td.innerHTML === "" )
//   let yCord = (openSlot === 0) ? 0 :openSlot
// //  cant seem to get the last slot working 

//   // const openSlot = allTd.filter( td => td.getAttribute("id").includes(`-${x}`)).findLastIndex(td => td.innerHTML === "")
//   console.log(column);
//   console.log(yCord);
//   console.log(openSlot);
//   return  yCord || null;

for (let y = HEIGHT - 1; y >= 0; y--) {
  if (!board[y][x]) {
    return y;
  }
}
return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  // figure out how to append the piece to the correct table data 
  const piece = document.createElement("div"); // add a div 
  const piecePlaceTd = document.getElementById(`${y}-${x}`) // the correct td cell 
  // placeInTable.style.position = "relative";
  // const piecePlaceTd = document.querySelector('td')
  piece.classList.add("piece") //div should have the piece class on it,
  // piece.style.top = -50 * (y + 2);
  // should have a class for whether the current player is 1 or 2, like p1 or p2.
  if(currPlayer === 1){
    // if(piece.classList.contains('p2')){
    //   piece.classList.remove('p2')
    // }
    // piece.classList.add('p1')
    if(piece.classList.contains('p2')) piece.classList.remove('p2')
    else piece.classList.add('p1')
  } else {
    if(piece.classList.contains('p1')) piece.classList.remove('p1')
      else piece.classList.add('p2')
  }
  // gotta check null
piecePlaceTd.append(piece)  //add a div inside the correct td cell in the HTML game board

console.log(piecePlaceTd);

}


/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  return alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  const filledBoard = board.every(box => box.every(val => val !== null))
   if(filledBoard) endGame('All slots have been filled it was a tie 🙃') // calls endGame if all cells in board are filled

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = (currPlayer === 1) ? 2 : 1; //switches players

  console.log(filledBoard);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
  
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.


  // this is loop from the y[0] to y[height]//7 and incrementing on every iteration 
  for (let y = 0; y < HEIGHT; y++) {
    // this is loop from the x[0] to x[height]//7 and incrementing on every iteration 
    for (let x = 0; x < WIDTH; x++) {
      // this setting 4 direction arrs that are checking the position and values of the cur [y][x] pair 
      // horiz = all the values 3 up from the curPosition based on the x position if all 4  === ALL 1s || ALL 2s then thats a horizontal win 
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // vert = all the values 3 up from the curPosition  based on the y position  if all 4  === ALL 1s || ALL 2s then thats a  vertical win 
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        // vert = all the values 3 up from the curPosition based on the y + x positions diagonally to the right if all 4  === ALL 1s || ALL 2s then thats a diagonally right win 
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       // vert = all the values 3 down from the curPosition based on the y + x positions diagonally to the right if all 4  === ALL 1s || ALL 2s then thats a diagonally left win 
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
// findSpotForCol(1)
// placeInTable(0,1)


// const filledBoard = board.every(box => box.every(val => val === null))
// // board.forEach(box =>{
// //   // box.every(val => val === null)
// //  console.log(box.every(val => val === null))
// // // console.log(box);
// // })
// // board.forEach(brd =>console.log(brd))
// // console.log(board);
// console.log(filledBoard);
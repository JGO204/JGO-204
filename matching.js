
var ppe = ["Boots", "Duck", "Ear" , "Glasses" , "Helmet", "Vest"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;


var currTile;
var otherTile;

window.onload = function(){
    startGame();

    //1/10th of a second
    window.setInterval(function(){
        crushPPE();
        slidePPE();
        generatePPE();
    }, 100);
}

function randomPPE(){
    return ppe[Math.floor(Math.random()* ppe.length)]; //0-5.99 math.Floor removes decimal
}

function startGame(){

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c= 0; c < columns; c++){
            // <img="0-0"> 
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./Images/" + randomPPE() + ".png";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on a ppe, initialize drag process
            tile.addEventListener("dragover", dragOver);  //clicking on ppe, moving mouse to drag the ppe
            tile.addEventListener("dragenter", dragEnter); //dragging ppe onto another ppe
            tile.addEventListener("dragleave", dragLeave); //leave ppe over another ppe
            tile.addEventListener("drop", dragDrop); //dropping a ppe over another ppe
            tile.addEventListener("dragend", dragEnd); //after drag process completed, we swap ppe


            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart(){
    // refers to tile that was clicked on for dragging
    currTile = this;
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){

}

function dragDrop(){
    // refers to the target tile that was dropped on
    otherTile = this;
}

function dragEnd(){

    if(currTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }

    let currCoords = currTile.id.split("-"); // id="0=0" - > ["0","0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove){
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}
// crushes ppe when there are 3 in a row
function crushPPE(){
    
    crushThree();
    document.getElementById("score").innerText = score;

}

function crushThree(){
    // check rows
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns-2; c++ ) {
            let ppe1 = board[r][c];
            let ppe2 = board[r][c+1];
            let ppe3 = board[r][c+2];
            if (ppe1.src == ppe2.src && ppe2.src == ppe3.src && !ppe1.src.includes("blank")){
                ppe1.src = "./Images/blank.png";
                ppe2.src = "./Images/blank.png";
                ppe3.src = "./Images/blank.png";
                score += 30;

            }
        }
    }


    // check columns
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows-2; r++){
            let ppe1 = board[r][c];
            let ppe2 = board[r+1][c];
            let ppe3 = board[r+2][c];
            if (ppe1.src == ppe2.src && ppe2.src == ppe3.src && !ppe1.src.includes("blank")){
                ppe1.src = "./Images/blank.png";
                ppe2.src = "./Images/blank.png";
                ppe3.src = "./Images/blank.png";
                score += 30;
            }
        }
    }
}

function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let ppe1 = board[r][c];
            let ppe2 = board[r][c+1];
            let ppe3 = board[r][c+2];
            if (ppe1.src == ppe2.src && ppe2.src == ppe3.src && !ppe1.src.includes("blank")) {
                return true;
                }
            }
        }
    
        //check columns
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows-2; r++) {
                let ppe1 = board[r][c];
                let ppe2 = board[r+1][c];
                let ppe3 = board[r+2][c];
                if (ppe1.src == ppe2.src && ppe2.src == ppe3.src && !ppe1.src.includes("blank")) {
                    return true;
                }
            }
        }
    
        return false;
    }

    function slidePPE(){
        for (let c = 0; c < columns; c++) {
            let ind = rows - 1;
            for (let r = columns-1; r >= 0; r--){
                if (!board[r][c].src.includes("blank")){
                    board[ind][c].src = board [r][c].src;
                    ind -=1;
                }
            }

            for (let r = ind; r >=0; r--){
                board[r][c].src = "./Images/blank.png";
            }
        }
    }
            

    function generatePPE() {
        for (let c = 0; c < columns; c++) {
            if (board[0][c].src.includes("blank")){
                board[0][c].src = "./Images/" + randomPPE() + ".png";
            }
        }
    }
    
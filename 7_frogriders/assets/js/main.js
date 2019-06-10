$(document).ready(startApp);

var newGameBoard;

function startApp() {
    newGameBoard = new Gameboard();
    newGameBoard.addEventListeners();
    newGameBoard.generateFrogs();
}




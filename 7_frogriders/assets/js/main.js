$(document).ready(startApp);

function startApp() {
    var newGameBoard = new Gameboard();
    newGameBoard.addEventListeners();
    newGameBoard.frogIndex();
}




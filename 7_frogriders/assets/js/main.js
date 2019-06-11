$(document).ready(startApp);

var newGameBoard;
var playerLoadScreen;
var player1;
var player2;
function startApp() {
    playerLoadScreen = new Loadscreen();
    $(window).on('load', playerLoadScreen.showModal());
    newGameBoard = new Gameboard(player1, player2);                 
    newGameBoard.addEventListeners();
    newGameBoard.generateFrogs();
}

class Loadscreen {
    constructor() {
        this.firstPlayerInput = null;
        this.secondPlayerInput = null;
    }
    showModal() {
        $('.player-input-modal').show();
        $('.modal-content').show();
        $('.player-input-button').on('click', this.enterGame);
    }
    enterGame() {
        this.firstPlayerInput = $('.first-player-input').val();
        this.secondPlayerInput = $('.second-player-input').val();
        player1 = new Player(this.firstPlayerInput, "first");
        player2 = new Player(this.secondPlayerInput, "second");    
        player1.displayNameToDom();
        player2.displayNameToDom();
        $('.player-input-modal').hide();
        $('.modal-content').hide();
    }
}

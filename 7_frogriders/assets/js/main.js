$(document).ready(startApp);

var newGameBoard;
var playerLoadScreen;
var player1;
var player2;
function startApp() {
    playerLoadScreen = new Loadscreen();
    $(window).on('load', playerLoadScreen.showModal());

    var modal = $('#simpleModal');
    var modalBtn = $('#modalBtn');
    var closeBtn = $('.closeBtn');

    modalBtn.on('click', openModal);
    closeBtn.on('click', closeModal);

    function openModal(){
        $(modal).css('display','block');
    }
    function closeModal() {
        $(modal).css('display','none');
    }
    
}

class Loadscreen {
    constructor() {
        this.firstPlayerInput = null;
        this.secondPlayerInput = null;
    }
    showModal() {
        $('.player-input-modal').show();
        $('.input-content').show();
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
        $('.input-content').hide();
        newGameBoard = new Gameboard(player1, player2);                 
        newGameBoard.addEventListeners();
        newGameBoard.generateFrogs();
    }
}

    



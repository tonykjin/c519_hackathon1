$(document).ready(startApp);

var newGameBoard

function startApp() {
    var playerLoadScreenInformation = new LoadScreen();
    $(window).on('load', playerLoadScreenInformation.createLoadingModal());
    var player1 = new Player(playerLoadScreenInformation.firstPlayerName);
    var player2 = new Player(playerLoadScreenInformation.secondPlayerName);
    newGameBoard = new Gameboard(player1, player2);
    newGameBoard.addEventListeners();
    newGameBoard.generateFrogIndex();
}

class LoadScreen {
    constructor(firstPlayerName, secondPlayerName) {
        this.firstPlayerName = firstPlayerName;
        this.secondPlayerName = secondPlayerName;
        this.createLoadModal = this.createLoadModal.bind(this);
        this.takePlayerInput = this.takePlayerInput.bind(this);
    }
    takePlayerInput() {
        //take in player input from pre-load modal
        this.firstPlayerName = $('.first-player-input').val();
        this.secondPlayerName = $('.second-player-input').val();
        
    }
    createLoadingModal() {
        this.loadModal = $('<modal>').attr('class', 'player-input-modal');
        this.createFirstPlayerInput = $('<input>').attr('class', 'first-player-input').attr('type', 'text');
        this.createSecondPlayerInput = $('<input>').attr('class', 'second-player-input').attr('type', 'text');
        this.createSecondPlayersButton = $('<button>').on('click', this.takePlayerInput);
        this.loadModal.append(this.createFirstPlayerInput);
        this.loadModal.append(this.createSecondPlayerInput);
        this.loadModal.append(this.createPlayersButton);  
        $('.player-input-modal').show();
    }
}


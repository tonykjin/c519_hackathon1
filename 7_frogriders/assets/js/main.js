$(document).ready(startApp);

var gameArea = null;
function startApp() {
    var newGame = new renderLoad();
    newGame.gameLoad(9);
    var frogLocation = new Frog();
    var createFrogs = new Frog();
    gameArea = new Gameboard();
    frogLocation.addEventListeners();
    createFrogs.frogIndex(); 
}




class renderLoad {
    constructor() {
        this.lily = null;
    }
    gameLoad(lilyCount) {
            this.lily = $("<div>").attr('class', 'lilyPad');
            $('.gameSquare').append(this.lily);
        }
}


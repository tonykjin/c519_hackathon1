$(document).ready(startApp);


function startApp() {
    var gameBoard = new renderLoad();
    gameBoard.gameLoad(9);
    var frogLocation = new frog('.gameSquare');
    var createFrogs = new frog();
    createFrogs.createFrogs(2);
    
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
class frog {
    constructor(targetSquare) {
        this.indexLocation = $(targetSquare); 
        this.makeFrog = null;
    }   
    addEventListeners() {
        this.indexLocation.click(this.frogIndex);
    }
    createFrogs(frogCount) { //tony
        for (var i = 0; i <= frogCount; i++) {
            this.makeFrog = $('<div>').addClass('frogImg');
            $('.' + i).append(this.makeFrog);
        }
    }
    frogIndex() { //dwight

    }
    moveIndex() { //bisham

    }
}
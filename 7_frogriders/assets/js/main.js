$(document).ready(startApp);


function startApp() {
    var gameBoard = new renderLoad();
    gameBoard.gameLoad(9);
    var frogLocation = new frog('.gameSquare');
    var createFrogs = new frog();
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
class frog {
    constructor(targetSquare) {
        this.indexLocation = $(targetSquare); 
        this.makeFrog = null;
    }   
    addEventListeners() {
        this.indexLocation.click(this.frogIndex);
    }
    createFrogs(frogCount) { //tony
        this.makeFrog = $('<div>').addClass('frogImg');
        $('.' + frogCount).append(this.makeFrog);
    }
    frogIndex() { //dwight
        var frogArray = [[1,1,1],[1,0,1],[1,1,1]];
        var createFrogsIndex = 0;
        for (var frogArrayIndexOuter = 0; frogArrayIndexOuter < frogArray.length; frogArrayIndexOuter++){
            for (var frogArrayIndexInner = 0; frogArrayIndexInner < frogArray[frogArrayIndexOuter].length; frogArrayIndexInner++){
                createFrogsIndex++;
                if (frogArray[frogArrayIndexOuter][frogArrayIndexInner] === 1){
                    this.createFrogs(createFrogsIndex);
                    //display frog
                }else{
                    //don't
                }
            }
        }

    }
    moveIndex() { //bisham

    }
}
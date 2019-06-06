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
        var frogArray = [[1,1,1],
                         [1,0,1],
                         [1,1,1]];
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
    removeFrogs() {
        //square of frog to move = [w][v]
       //square to move selected to = [x][y]
       //square of frog to remove = [(w+x)/2][(v+y)/2]
       //use .splice to change array[(w+x)/2][(v+y)/2] from 1 to 0
       //add to points by 1
    }
}

class gameBoard {
    constructor() {

    }
    moveIndex() {
        if (frog.frogArray[i, x] !== 0) {
            if (frog.frogArray[i + 1, x] === 1 && frog.frogArray[i + 2, x] === 0) {
                var w = i+ 2;
                var v = x;
            } else if (frog.frogArray[i - 1, x] === 1 && frog.frogArray[i-2, x] === 0) {
                var w = i - 2;
                var v = x;
            } else if (frog.frogArray[i, x+1] === 1 && frog.frogArray[i, x+2] === 0) {
                var w = i;
                var v = x+2;
            } else if (frog.frogArray[i, x-1] === 1 && frog.frogArray[i, x-2] === 0) {
                var w = i;
                var v = x-2;
            }
        }
    }
}
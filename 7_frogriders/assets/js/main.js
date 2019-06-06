$(document).ready(startApp);


function startApp() {
    var newGame = new renderLoad();
    newGame.gameLoad(9);
    var frogLocation = new frog();
    var createFrogs = new frog();
    frogLocation.addEventListeners();
    var board = new gameBoard();
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
    constructor() {
        this.makeFrog = null;
        this.frogIndex = this.frogIndex.bind(this);
        this.removeFrogs = this.removeFrogs.bind(this);
    }   
    addEventListeners() {
        $('.gameSquare').click(this.removeFrogs());
            var y = $(this).attr('id').split('-')[0];
            var x = $(this).attr('id').split('-')[1];
            return [y,x];
    }
    createFrogs(frogCount) { //tony
        console.log('createFrogs');
        this.makeFrog = $('<div>').addClass('frogImg');
        $('.' + frogCount).append(this.makeFrog);
    }
    frogIndex() { //dwight
        // debugger;
        console.log('click');

        this.frogArray = [[1,1,1],
                          [1,0,1],
                          [1,1,1]];
        var createFrogsIndex = 0;
        for (var frogArrayIndexOuter = 0; frogArrayIndexOuter < this.frogArray.length; frogArrayIndexOuter++){
            for (var frogArrayIndexInner = 0; frogArrayIndexInner < this.frogArray[frogArrayIndexOuter].length; frogArrayIndexInner++){
                createFrogsIndex++;
                if (this.frogArray[frogArrayIndexOuter][frogArrayIndexInner] === 1){
                    this.createFrogs(createFrogsIndex);
                    //display frog
                }else{
                    //don't
                }
            }
        }

    }
    removeFrogs(y,x) {
        //square of frog to move = [w][v]
       //square to move selected to = [i][x]
       //square of frog to remove = [(w+x)/2][(v+y)/2]
       //use .splice to change array[(w+x)/2][(v+y)/2] from 1 to 0
       //add to points by 1

        var w = board.moveIndex(y,x)[0];
        var v = board.moveIndex(y,x)[1];
        var x = board.moveIndex(y,x)[2];
        var i = board.moveIndex(y,x)[3];

        this.frogArray[(w+x)/2][(v+y)/2].splice(0,1,0);




    }
}

class gameBoard {
    constructor() {
        this.w = null;
        this.v = null;
    }
    moveIndex(i, x) {
        if (frog.frogArray[i, x] !== 0) {
            if (frog.frogArray[i + 1, x] === 1 && frog.frogArray[i + 2, x] === 0) {
                w = i+ 2;
                v = x;
                return [w, v, x, i]
            } else if (frog.frogArray[i - 1, x] === 1 && frog.frogArray[i-2, x] === 0) {
                w = i - 2;
                v = x;
                return [w, v, x, i]
            } else if (frog.frogArray[i, x+1] === 1 && frog.frogArray[i, x+2] === 0) {
                w = i;
                v = x+2;
                return [w, v, x, i]
            } else if (frog.frogArray[i, x-1] === 1 && frog.frogArray[i, x-2] === 0) {
                w = i;
                v = x-2;
                return [w, v, x, i]
            }
        }
    }
}
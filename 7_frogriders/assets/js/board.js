class Gameboard {
    newFrog = new Frog();

    constructor() {
        this.checkMoves = this.checkMoves.bind(this);
        this.passClickID = this.passClickID.bind(this);
        this.w = null;
        this.v = null;
        this.moveIndex = this.moveIndex.bind(this);
        this.frogArray = [[1,1,1,1,1],
                          [1,1,1,1,1],
                          [1,1,0,1,1],
                          [1,1,1,1,1],
                          [1,1,1,1,1]];
    }
    addEventListeners() {

        $('.gameSquare').click(this.passClickID);
    }

    passClickID(event){
        this.checkMoves($(event.currentTarget).attr('id'));
        this.frogIndex();
    }

    frogIndex() { 
        var createFrogsIndex = 0;
        for (var frogArrayIndexOuter = 0; frogArrayIndexOuter < this.frogArray.length; frogArrayIndexOuter++){
            for (var frogArrayIndexInner = 0; frogArrayIndexInner < this.frogArray[frogArrayIndexOuter].length; frogArrayIndexInner++){
                createFrogsIndex++;
                if (this.frogArray[frogArrayIndexOuter][frogArrayIndexInner] === 1){
                    this.newFrog.createFrogs(createFrogsIndex);
                    //display frog
                }else{
                    //don't
                }
            }
        }

    }
    moveIndex(i, x) {
        var w = null;
        var v = null;


        if (this.frogArray[i][x] !== 0) {
            if (this.frogArray[i + 1] !== undefined && this.frogArray[i + 2] !== undefined){
                if (this.frogArray[i + 1][x] === 1 && this.frogArray[i + 2][x] === 0) {
                    w = i+ 2;
                    v = x;
                    return [w, v, x, i]
                }
            } else if (this.frogArray[i - 1] !== undefined && this.frogArray[i-2] !== undefined){
                 if (this.frogArray[i - 1][x] === 1 && this.frogArray[i-2][x] === 0) {
                    w = i - 2;
                    v = x;
                    return [w, v, x, i]
                }
            }else if (this.frogArray[i][x+1] !== undefined && this.frogArray[i][x+2] !== undefined){
                if (this.frogArray[i][x+1] === 1 && this.frogArray[i][ x+2] === 0) {
                    w = i;
                    v = x + 2;
                    return [w, v, x, i]
                }
            }else if (this.frogArray[i][x-1] !== undefined && this.frogArray[i][x-2] !== undefined){
                if (this.frogArray[i][x-1] === 1 && this.frogArray[i][x-2] === 0) {
                    w = i;
                    v = x-2;
                    return [w, v, x, i]
                }
            }
        }
    }
    checkMoves(id) {
        //square of frog to move = [w][v]
       //square to move selected to = [i][x]
       //square of frog to remove = [(w+x)/2][(v+y)/2]
       //use .splice to change array[(w+x)/2][(v+y)/2] from 1 to 0
       //add to points by 1
        console.log(id);
        var y = id.split('-')[0];
        var x = id.split('-')[1];

        var w = parseInt(this.moveIndex(y,x)[0]);
        var v = parseInt(this.moveIndex(y,x)[1]);
        var x = parseInt(this.moveIndex(y,x)[2]);
        var i = parseInt(this.moveIndex(y,x)[3]);

        var targetX= [(v+i)/2];
        var targetY = [(w+x)/2];

        this.frogArray[targetY].splice(targetX ,1,0);
        this.removeFrogs(targetY, targetX);
        debugger;
    }

    removeFrogs(targetY, targetX){

    }
}
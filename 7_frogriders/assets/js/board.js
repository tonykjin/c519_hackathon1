class Gameboard {
    

    constructor() {
        this.newFrog = new Frog(); 
        this.checkMoves = this.checkMoves.bind(this);
        this.passClickID = this.passClickID.bind(this);
        this.removeFrogs = this.removeFrogs.bind(this);
        this.x = null;
        this.y = null;
        this.w = null;
        this.v = null;
        this.firstClick = null;
        this.secondClick = null;
        this.secondClick = this.secondClick.bind(this);
        this.frogArray = [[1,1,1,1,1],
                          [1,1,1,1,1],
                          [1,1,0,1,1],
                          [1,1,1,1,1],
                          [1,1,1,1,1]];
    }
    addEventListeners() {

        $('.gameSquare').click(this.passClickID);
    }

    passClickID(event) {
        debugger;

        if (this.firstClick !== null){
            this.secondClick = $(event.currentTarget).attr('id');
            this.secondClickFunction(this.secondClick);
        }
        if (this.firstClick === null) {
            this.firstClick = $(event.currentTarget).attr('id');
            this.checkMoves(this.firstClick);
        }

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
    getValueFromPosition(x, y) {
        if(this.frogArray[y] === undefined) {
            return false;
        }
        if (this.frogArray[y][x] === undefined){
            return false;
        }
        return this.frogArray[y][x];
    }
    moveIndex(y, x) {
        y = parseInt(y);
        x = parseInt(x);

        var w = null;
        var v = null;
        var vectors = [
            {x:0, y:2},
            {x:0, y:-2},
            {x:2, y:0},
            {x:-2, y:0},
        ]
        for (var vectorIndex = 0; vectorIndex < vector.length; vectorIndex++){
            var currentVector = vectors[vectorIndex];
            var nextSpot = {
                x: x + currentVector.x,
                y: y + currentVector.y
            }
            var destinationSquare = this.getValueFromPosition(nextSpot.x, nextSpot.y);
            if (destinationSquare === 0) {
                return [currentVector.y, currentVector.x, x, y];
            }
        }
        if (this.frogArray[y][x] !== 0) {

            if (this.frogArray[y + 2] !== undefined){
                if (this.frogArray[y + 1][x] === 1 && this.frogArray[y + 2][x] === 0) {
                    w = y+ 2;
                    v = x;
                    return [w, v, x, y];
                }
            }  if (this.frogArray[y-2] !== undefined){
                 if (this.frogArray[y - 1][x] === 1 && this.frogArray[y-2][x] === 0) {
                    w = y - 2;
                    v = x;
                    return [w, v, x, y];
                }
            } if (this.frogArray[y][x+2] !== undefined){
                if (this.frogArray[y][x+1] === 1 && this.frogArray[y][x+2] === 0) {
                    w = y;
                    v = x + 2;
                    return [w, v, x, y];
                }
            } if (this.frogArray[y][x-2] !== undefined){
                if (this.frogArray[y][x-1] === 1 && this.frogArray[y][x-2] === 0) {
                    w = y;
                    v = x-2;
                    return [w, v, x, y];
                }
            }
        }
    }
    checkMoves(id) {
        this.y = parseInt(id.split('-')[0]);
        this.x = parseInt(id.split('-')[1]);

    }

    secondClickFunction(id){
        var y = parseInt(id.split('-')[0]);
        var x = parseInt(id.split('-')[1]);

        var validMovesArray = this.moveIndex(y,x);

        var v = validMovesArray[0];
        var w = validMovesArray[1];
        x = validMovesArray[2];
        y = validMovesArray[3];

        var targetY = [(v+y)/2];
        var targetX = [(w+x)/2];

        if (this.secondClick === this.frogArray[targetY][targetX]){
            this.removeFrogs(targetY, targetX);
        }
    }

    removeFrogs(targetY, targetX){
        this.frogArray[targetY].splice(targetX ,1,0);
        $('#' + targetY + '-' + targetX + ' .frogImg').hide();
    }
}
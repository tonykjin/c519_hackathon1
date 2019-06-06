class Gameboard {
    newFrog = new Frog();

    constructor() {
        this.checkMoves = this.checkMoves.bind(this);
        this.passClickID = this.passClickID.bind(this);
        this.removeFrogs = this.removeFrogs.bind(this);
        this.w = null;
        this.v = null;
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
    moveIndex(y, x) {
        y = parseInt(y);
        x = parseInt(x);

        var w = null;
        var v = null;


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
        //square of frog to move = [w][v]
       //square to move selected to = [i][x]
       //square of frog to remove = [(w+x)/2][(v+y)/2]
       //use .splice to change array[(w+x)/2][(v+y)/2] from 1 to 0
       //add to points by 1
        console.log(id);
        var y = parseInt(id.split('-')[0]);
        var x = parseInt(id.split('-')[1]);

        var checkMovesArray = this.moveIndex(y,x);

        var w = checkMovesArray[0];
        var v = checkMovesArray[1];
        x = checkMovesArray[2];
        y = checkMovesArray[3];

        var targetY= [(v+y)/2];
        var targetX = [(w+x)/2];
        debugger;

        this.frogArray[targetY].splice(targetX ,1,0);
        this.removeFrogs(targetY, targetX);
    }

    removeFrogs(targetY, targetX){
        console.log($('#' + targetY + '-' + targetX + ' .frogImg'));
        $('#' + targetY + '-' + targetX + ' .frogImg').hide();
    }
}
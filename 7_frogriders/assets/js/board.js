class Gameboard {
    newFrog = new Frog();

    constructor() {
        this.removeFrogs = this.removeFrogs.bind(this);
        this.passClickID = this.passClickID.bind(this);
        this.w = null;
        this.v = null;
        this.moveIndex = this.moveIndex.bind(this);
    }
    addEventListeners() {

        $('.gameSquare').click(this.passClickID);
    }

    passClickID(event){
        this.removeFrogs($(event.currentTarget).attr('id'));
    }

    frogIndex() { 
        this.frogArray = [[1,1,1],
                          [1,0,1],
                          [1,1,1]];
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
            debugger;
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
    removeFrogs(id) {
        //square of frog to move = [w][v]
       //square to move selected to = [i][x]
       //square of frog to remove = [(w+x)/2][(v+y)/2]
       //use .splice to change array[(w+x)/2][(v+y)/2] from 1 to 0
       //add to points by 1
        console.log(id);
        var y = id.split('-')[0];
        var x = id.split('-')[1];

        var w = this.moveIndex(y,x)[0];
        var v = this.moveIndex(y,x)[1];
        var x = this.moveIndex(y,x)[2];
        var i = this.moveIndex(y,x)[3];

        Frog.frogArray[(w+x)/2][(v+y)/2].splice(0,1,0);
    }
}
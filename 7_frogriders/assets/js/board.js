class Gameboard {
    newFrog = new Frog();

    constructor() {
        this.firstClickFunction = this.firstClickFunction.bind(this);
        this.passClickID = this.passClickID.bind(this);
        this.removeFrogs = this.removeFrogs.bind(this);
        this.x = null;
        this.y = null;
        this.w = null;
        this.v = null;
        this.firstClick;
        this.secondClick;
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


        if (this.firstClick !== undefined){
            this.secondClick = $(event.currentTarget).attr('id');
            this.secondClickFunction(this.secondClick);
        }
        if (this.firstClick === undefined) {
            this.firstClick = $(event.currentTarget).attr('id');
            this.firstClickFunction(this.firstClick);
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
    moveIndex(y, x) {
        y = parseInt(y);
        x = parseInt(x);

        var w = null;
        var v = null;


        if (this.frogArray[y][x] === 0) {

            if (y === this.y + 2 && x === this.x){
                if (this.frogArray[this.y + 1][x] === 1) {
                    $('#' + this.y + '-' + this.x + ' .frogImg').hide();
                    $('#' + (this.y+1) + '-' + this.x + ' .frogImg').hide();
                    $('#' + y + '-' + x).append($('<div>').addClass('frogImg'));
                    this.removeFrogs(y, x);
                }
            }  if (y === this.y - 2 && x === this.x){
                 if (this.frogArray[this.y - 1][x] === 1) {
                     $('#' + this.y + '-' + this.x + ' .frogImg').hide();
                     $('#' + (this.y-1) + '-' + this.x + ' .frogImg').hide();
                     $('#' + y + '-' + x).append($('<div>').addClass('frogImg'));
                     this.removeFrogs(y, x);
                }
            } if (y === this.y && x === this.x + 2){
                if (this.frogArray[y][x+1] === 1) {
                    $('#' + this.y + '-' + this.x + ' .frogImg').hide();
                    $('#' + (this.y) + '-' + (this.x+1) + ' .frogImg').hide();
                    $('#' + y + '-' + x).append($('<div>').addClass('frogImg'));
                    this.removeFrogs(y, x);
                }
            } if (y === this.y && x === this.x - 2){
                if (this.frogArray[y][x-1] === 1) {
                    $('#' + this.y + '-' + this.x + ' .frogImg').hide();
                    $('#' + (this.y+1) + '-' + (this.x-1) + ' .frogImg').hide();
                    $('#' + y + '-' + x).append($('<div>').addClass('frogImg'));
                    this.removeFrogs(y, x);
                }
            }
            this.firstClick = undefined;
            this.secondClick = undefined;
        }
    }
    firstClickFunction(id) {
        this.y = parseInt(id.split('-')[0]);
        this.x = parseInt(id.split('-')[1]);

    }

    secondClickFunction(id){
        console.log('second click function');
        var y = parseInt(id.split('-')[0]);
        var x = parseInt(id.split('-')[1]);

        this.moveIndex(y,x);
    }

    removeFrogs(targetY, targetX){
        this.frogArray[targetY].splice(targetX ,1,0);
    }
}
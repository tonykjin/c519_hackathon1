class Gameboard {
    

    constructor() {

        this.firstClickFunction = this.firstClickFunction.bind(this);
        this.renderFrog = new Frog();
        this.passClickID = this.passClickID.bind(this);
        this.removeFrogHandler = this.removeFrogHandler.bind(this);
        this.x = null;
        this.y = null;

        this.firstClick;
        this.secondClick;

        this.frogGrid = [[1,1,1,1,1],
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
        }else if(this.firstClick === undefined) {
            this.firstClick = $(event.currentTarget).attr('id');
            this.firstClickFunction(this.firstClick);
        }

    }

    generateFrogIndex() {
        var createFrogsIndex = 0;
        for (var frogArrayIndexOuter = 0; frogArrayIndexOuter < this.frogGrid.length; frogArrayIndexOuter++){
            for (var frogArrayIndexInner = 0; frogArrayIndexInner < this.frogGrid[frogArrayIndexOuter].length; frogArrayIndexInner++){
                createFrogsIndex++;
                if (this.frogGrid[frogArrayIndexOuter][frogArrayIndexInner] === 1){
                    this.renderFrog.createFrogs(createFrogsIndex);
                    //display frog
                }else{
                    //don't
                }
            }
        }

    }
    getValueFromPosition(x, y) {
        if(this.frogGrid[y] === undefined) {
            return false;
        }
        if (this.frogGrid[y][x] === undefined){
            return false;
        }
        return this.frogGrid[y][x];
    }
    moveFrogCondition(y, x) {
        y = parseInt(y);
        x = parseInt(x);

        if (this.frogGrid[y][x] === 0) {


            if (y === this.y + 2 && x === this.x){
                if (this.frogGrid[this.y + 1][this.x] === 1) {
                    $('#' + this.y + '-' + this.x + ' .frogImg').hide();
                    this.removeFrogHandler(this.y, this.x);

                    $('#' + (this.y+1) + '-' + this.x + ' .frogImg').hide();
                    this.removeFrogHandler(this.y + 1, this.x);

                    $('#' + y + '-' + x).append($('<div>').addClass('frogImg'));
                    this.addFrogHandler(y, x);

                    this.firstClick = undefined;
                    this.secondClick = undefined;
                }
            }  if (y === this.y - 2 && x === this.x){
                 if (this.frogGrid[this.y - 1][this.x] === 1) {
                     $('#' + this.y + '-' + this.x + ' .frogImg').hide();
                     this.removeFrogHandler(this.y, x);

                     $('#' + (this.y-1) + '-' + this.x + ' .frogImg').hide();
                     this.removeFrogHandler(this.y-1, this.x);

                     $('#' + y + '-' + x).append($('<div>').addClass('frogImg'));
                     this.addFrogHandler(y, x);

                     this.firstClick = undefined;
                     this.secondClick = undefined;
                }
            } if (y === this.y && x === this.x + 2){
                if (this.frogGrid[this.y][this.x+1] === 1) {
                    $('#' + this.y + '-' + this.x + ' .frogImg').hide();
                    this.removeFrogHandler(this.y, this.x);

                    $('#' + (this.y) + '-' + (this.x+1) + ' .frogImg').hide();
                    this.removeFrogHandler(this.y, this.x+1);

                    $('#' + y + '-' + x).append($('<div>').addClass('frogImg'));
                    this.addFrogHandler(y, x);

                    this.firstClick = undefined;
                    this.secondClick = undefined;
                }
            } if (y === this.y && x === this.x - 2){
                if (this.frogGrid[this.y][this.x-1] === 1) {
                    $('#' + this.y + '-' + this.x + ' .frogImg').hide();
                    this.removeFrogHandler(this.y, this.x);

                    $('#' + (this.y) + '-' + (this.x-1) + ' .frogImg').hide();
                    this.removeFrogHandler(this.y, this.x-1);

                    $('#' + y + '-' + x).append($('<div>').addClass('frogImg'));
                    this.addFrogHandler(y, x);
                    this.firstClick = undefined;
                    this.secondClick = undefined;
                }
            } else {
                this.firstClick = undefined;
                this.secondClick = undefined;
            }

        }
    }
    firstClickFunction(id) {
        this.y = parseInt(id.split('-')[0]);
        this.x = parseInt(id.split('-')[1]);
    }

    secondClickFunction(id){
        var y = parseInt(id.split('-')[0]);
        var x = parseInt(id.split('-')[1]);

        this.moveFrogCondition(y,x);
    }

    removeFrogHandler(targetY, targetX){
        this.frogGrid[targetY].splice(targetX ,1,0);

    }

    addFrogHandler(targetY, targetX){
        this.frogGrid[targetY].splice(targetX ,1,1);
    }
}
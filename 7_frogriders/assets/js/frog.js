class Frog {
    constructor() {
        this.makeFrog = null;
        this.frogIndex = this.frogIndex.bind(this);
    }   
    addEventListeners() {
        $('.gameSquare').click(gameArea.removeFrogs());
            var y = $(this).attr('id').split('-')[0];
            var x = $(this).attr('id').split('-')[1];
            return [y,x];
    }
    createFrogs(frogCount) {
        console.log('createFrogs');
        this.makeFrog = $('<div>').addClass('frogImg');
        $('.' + frogCount).append(this.makeFrog);
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
                    this.createFrogs(createFrogsIndex);
                    //display frog
                }else{
                    //don't
                }
            }
        }

    }
}
$(document).ready(startApp);


function startApp() {
    var frogLocation = new frog('.gameSquare');
    
}

class frog {
    constructor(targetSquare) {
       this.indexLocation = $(targetSquare); 
    
    }   
    addEventListeners() {
        this.indexLocation.click(this.frogIndex);
    }
    createFrogs() { //tony

    }
    frogIndex() { //dwight

    }
    moveIndex() { //bisham

    }
}
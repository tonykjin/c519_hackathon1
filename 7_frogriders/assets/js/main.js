$(document).ready(startApp);

var frogInit = null;

function startApp() {
    frogInit = new gameBasics(2, '<div>');
    $('body').append(frogInit);
}

class gameBasics {
    constructor(frogNumber, frogLocation) {
        debugger;
        this.location = frogLocation;
        this.testFrogs = null;
        this.createFrogs = this.createFrogs.bind(this);
        this.createFrogs(frogNumber);
    }
    createFrogs() {
        debugger;
        this.location = $(this.location).text("testing123");
        return this.location;
    }
}
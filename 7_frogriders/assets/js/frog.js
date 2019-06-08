class Frog {
    constructor() {
        this.makeFrog = null;
    }
    appendFrogsToBoard(frogCount) {
        this.makeFrog = $('<div>').addClass('frogImg');
        $('.' + frogCount).append(this.makeFrog);
    }
}
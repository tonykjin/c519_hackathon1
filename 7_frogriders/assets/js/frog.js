class Frog {
    constructor() {
        this.makeFrog = null;
    }
    createFrogs(frogCount) {
        debugger;
        this.makeFrog = $('<div>').addClass('frogImg');
        $('.' + frogCount).append(this.makeFrog);
    }
}
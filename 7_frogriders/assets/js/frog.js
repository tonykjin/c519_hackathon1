class Frog {
    constructor() {
        this.makeFrog = null;
    }
    createFrogs(frogCount) {
        this.makeFrog = $('<div>').addClass('frogImg');
        $('.' + frogCount).append(this.makeFrog);
    }
}
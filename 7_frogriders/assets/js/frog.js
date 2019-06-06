class Frog {
    constructor() {
        this.makeFrog = null;
    }
    createFrogs(frogCount) {
        console.log('createFrogs');
        this.makeFrog = $('<div>').addClass('frogImg');
        $('.' + frogCount).append(this.makeFrog);
    }
}
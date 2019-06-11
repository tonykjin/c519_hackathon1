class Frog {
    constructor() {
        this.makeFrog = null;
    }
    appendFrogToBoard(index, row) {
        this.makeFrog = $('<div>').addClass('frogImg');
        $('#' + index + '-' + row).append(this.makeFrog);
    }
}
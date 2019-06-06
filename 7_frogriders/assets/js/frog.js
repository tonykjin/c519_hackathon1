class Frog {
    constructor() {
        this.makeFrog = null;
        this.frogIndex = this.frogIndex.bind(this);
        this.gameArea = new Gameboard();
        this.gameArea = this.gameArea.bind(this);
    }
    createFrogs(frogCount) {
        console.log('createFrogs');
        this.makeFrog = $('<div>').addClass('frogImg');
        $('.' + frogCount).append(this.makeFrog);
    }
}
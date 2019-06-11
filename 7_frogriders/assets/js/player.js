class Player {
    constructor(name, position) {
        this.playerName = name;
        this.playerPosition = position;
        this.playerScore = 0;
    }
    incrementPlayerScore() {
        this.playerScore ++;
        $('.' + this.playerPosition + 'PlayerScore').text(this.playerScore).show();        
    }
    displayNameToDom() {
        $('.player-' + this.playerPosition).text(this.playerName);
    }

}
class Gameboard {
    

    constructor( firstPlayerObject, secondPlayerObject ) {
        this.firstPlayer = firstPlayerObject;
        this.secondPlayer = secondPlayerObject;
        this.firstClickHandler = this.firstClickHandler.bind(this);
        this.renderFrog = new Frog();
        this.passClickID = this.passClickID.bind(this);
        this.removeFrog = this.removeFrog.bind(this);
        this.reset =this.reset.bind(this);
        this.x1 = null;
        this.y1 = null;
        this.firstClick;
        this.secondClick;
        this.points = 0;
        this.playerMoveCounter = 1;

        this.frogGrid = [ [1,1,1,1,1],
                          [1,1,1,1,1],
                          [1,1,0,1,1],
                          [1,1,1,1,1],
                          [1,1,1,1,1] ];
    }


    generateFrogs() {                                                   //loops through the preset array to create initial frog objects, called in main.js
        for (var frogArrayIndexOuter = 0; frogArrayIndexOuter < this.frogGrid.length; frogArrayIndexOuter++){
            for (var frogArrayIndexInner = 0; frogArrayIndexInner < this.frogGrid[frogArrayIndexOuter].length; frogArrayIndexInner++){
                if (this.frogGrid[frogArrayIndexOuter][frogArrayIndexInner] === 1) {
                    this.renderFrog.appendFrogToBoard(frogArrayIndexInner, frogArrayIndexOuter);
                }
            }
        }
    }



    addEventListeners() {

        $('.square').click(this.passClickID);
        $('.resetContainer button').click(this.reset);
        $('.victory-content').on('click','.player-reset-button',this.reset);
    }


    passClickID(event) {
        if (this.firstClick !== undefined){                             
            if ($(event.currentTarget).attr('id') === this.firstClick){ //check to see if you're clicking the same div
                this.firstClick = undefined;                            //if so, unselect the div
                $('#'+this.y1+'-'+this.x1).removeClass('yellowBackground');
                for (var frogArrayIndexOuter = 0; frogArrayIndexOuter < this.frogGrid.length; frogArrayIndexOuter++){
                    for (var frogArrayIndexInner = 0; frogArrayIndexInner < this.frogGrid[frogArrayIndexOuter].length; frogArrayIndexInner++){
                        var frogIndex = $('#' + frogArrayIndexOuter + '-' + frogArrayIndexInner);
                        if (frogIndex.hasClass('border')) {
                            frogIndex.removeClass('border');
                        }
                    }
                }
            }
            else {
                this.secondClick = $(event.currentTarget).attr('id');   
                this.secondClickHandler(this.secondClick);
            }



        }else {                                                        
            this.firstClick = $(event.currentTarget).attr('id');
            this.firstClickHandler(this.firstClick);

        }

    }


    firstClickHandler(id) {
        this.y1 = parseInt(id.split('-')[0]);      
        this.x1 = parseInt(id.split('-')[1]);
        if (this.frogGrid[this.y1][this.x1] === 0){    
            this.y1 = undefined;
            this.y2 = undefined;
            this.firstClick = undefined;
        } else {
            this.highlightSquares(this.x1, this.y1,'yellowBackground');    
            this.checksPossibleMoves();             
        }
    }



    secondClickHandler(id){
        this.y2 = parseInt(id.split('-')[0]);         
        this.x2 = parseInt(id.split('-')[1]);

        if (this.frogGrid[this.y2][this.x2] === 0){
            if (this.playerMoveCounter === 1) {                
                this.moveFrogs(this.firstPlayer);    
            } else if (this.playerMoveCounter === 2) {          
                this.moveFrogs(this.secondPlayer);
            }

            for (var frogArrayIndexOuter = 0; frogArrayIndexOuter < this.frogGrid.length; frogArrayIndexOuter++){        //gets rid of outlines on squares
                for (var frogArrayIndexInner = 0; frogArrayIndexInner < this.frogGrid[frogArrayIndexOuter].length; frogArrayIndexInner++){
                    var frogIndex = $('#' + frogArrayIndexOuter + '-' + frogArrayIndexInner);
                    if (frogIndex.hasClass('border')) {
                        frogIndex.removeClass('border');
                    }
                }
            }

            $('#'+this.y1+'-'+this.x1).removeClass('yellowBackground');         //gets rid of highlighting on selected square


        }
        if (this.playerMoveCounter === 1) {                         //if player 1 just took his turn
            this.playerMoveCounter = 2;                                //second player's turn
        } else {
            this.playerMoveCounter = 1;                                 // else - first player's turn
        }
        this.y2 = undefined;                        //resets second click if not valid
        this.x2 = undefined;
        this.secondClick = undefined;


        this.checkEndGame();                //after every click check if there are any more valid moves


        this.checkEndGame();                //after every second click check if there are any more valid moves
    }



    removeFrog(targetY, targetX){

        $('#' + targetY + '-' + targetX + ' .frogImg').remove();
        this.frogGrid[targetY].splice(targetX ,1,0);

    }



    addFrog(targetY, targetX){
        $('#' + targetY + '-' + targetX).append($('<div>').addClass('frogImg'));
        this.frogGrid[targetY].splice(targetX ,1,1);
    }


    moveFrogs(player) {


        if ((this.y2 === this.y1 + 2 && this.x2 === this.x1) || (this.y2 === this.y1 - 2 && this.x2 === this.x1) || (this.y2 === this.y1 && this.x2 === this.x1 + 2) || (this.y2 === this.y1 && this.x2 === this.x1 - 2)){
            //if the second div is 2 below the first div        //if the second div is 2 above the first div        //if the second div is 2 right of the first div     //if the second div is 2 left of the first div

            if (this.frogGrid[(this.y1 + this.y2)/2][(this.x1 + this.x2)/2] === 1) {      //and the div in between has a frog

                this.removeFrog(this.y1, this.x1);  //removes the frog from the first click

                this.removeFrog((this.y1 + this.y2)/2, (this.x1 + this.x2)/2); //removes the frog from in between

                this.addFrog(this.y2, this.x2);    //adds the frog to the empty div

                player.incrementPlayerScore();          //adds point

            }
        }

        this.firstClick = undefined;        //resets first click
        this.secondClick = undefined;       //resets second click
    }


    checksPossibleMoves(){
        var w = null;
        var v = null;


        if (this.frogGrid[this.y1 + 2] !== undefined){         //if there's a square 2 down
            if (this.frogGrid[this.y1 + 1][this.x1] === 1 && this.frogGrid[this.y1 + 2][this.x1] === 0) {    //if there's a frog 1 down and empty square 2 down
                w = this.y1 + 2;
                v = this.x1;
                this.highlightSquares(v, w, 'border');      //outline the square 2 down
            }
        }

        if (this.frogGrid[this.y1-2] !== undefined){         //if there's a square 2 up
            if (this.frogGrid[this.y1 - 1][this.x1] === 1 && this.frogGrid[this.y1-2][this.x1] === 0) {     //if there's a frog 1 up and empty square 2 up
                w = this.y1 - 2;
                v = this.x1;
                this.highlightSquares(v, w, 'border');      //outline the square 2 up
            }
        }

        if (this.frogGrid[this.y1][this.x1+2] !== undefined){        //if there's a square 2 right
            if (this.frogGrid[this.y1][this.x1+1] === 1 && this.frogGrid[this.y1][ this.x1+2] === 0) {      //if there's a frog 1 right and empty square 2 right
                w = this.y1;
                v = this.x1 + 2;
                this.highlightSquares(v, w,'border');       //outline the square 2 right
            }
        }

        if (this.frogGrid[this.y1][this.x1-2] !== undefined){        //if there's a square 2 left
            if (this.frogGrid[this.y1][this.x1-1] === 1 && this.frogGrid[this.y1][this.x1-2] === 0) {       //if there's a frog 1 left and empty square 2 left
                w = this.y1;
                v = this.x1-2;
                this.highlightSquares(v, w,'border');       //outline the square 2 left
            }
        }
    }

    highlightSquares(x, y, color){
        $('#'+y+'-'+x).addClass(color);
    }

    checkEndGame(){
        var possibleMoves = 0;

        for (var frogArrayIndexOuter = 0; frogArrayIndexOuter < this.frogGrid.length; frogArrayIndexOuter++){   //loops through all spaces
            for (var frogArrayIndexInner = 0; frogArrayIndexInner < this.frogGrid[frogArrayIndexOuter].length; frogArrayIndexInner++){
                if (this.frogGrid[frogArrayIndexOuter][frogArrayIndexInner] === 1){         //if a space has a frog in it adds 1 to possibleMoves if possible
                    if (this.frogGrid[frogArrayIndexOuter + 2] !== undefined){
                        if (this.frogGrid[frogArrayIndexOuter + 1][frogArrayIndexInner] === 1 && this.frogGrid[frogArrayIndexOuter + 2][frogArrayIndexInner] === 0) {
                            possibleMoves++;
                        }
                    }
                    if (this.frogGrid[frogArrayIndexOuter - 2] !== undefined){
                        if (this.frogGrid[frogArrayIndexOuter - 1][frogArrayIndexInner] === 1 && this.frogGrid[frogArrayIndexOuter-2][frogArrayIndexInner] === 0) {
                            possibleMoves++;
                        }
                    }
                    if (this.frogGrid[frogArrayIndexOuter][frogArrayIndexInner + 2] !== undefined){
                        if (this.frogGrid[frogArrayIndexOuter][frogArrayIndexInner+1] === 1 && this.frogGrid[frogArrayIndexOuter][frogArrayIndexInner+2] === 0) {
                            possibleMoves++;
                        }
                    }
                    if (this.frogGrid[frogArrayIndexOuter][frogArrayIndexInner - 2] !== undefined){
                        if (this.frogGrid[frogArrayIndexOuter][frogArrayIndexInner-1] === 1 && this.frogGrid[frogArrayIndexOuter][frogArrayIndexInner-2] === 0) {
                            possibleMoves++;
                        }
                    }
                }
            }
        }

        if(possibleMoves === 0){
            $('.victory-modal').css('display','block');

            if (player1.playerScore > player2.playerScore){
                $('.victory-content p .player').text(player1.playerName);
                $('.victory-content p .points').text(player1.playerScore);
            } else if (player1.playerScore < player2.playerScore){
                $('.victory-content p .player').text(player2.playerName);
                $('.victory-content p .points').text(player2.playerScore);
            } else {
                $('.victory-content p').text('It\'s a tie!');
            }



        }
    }

    reset(){
        console.log('reset');
        $('.victory-modal').css('display','none');

        for (var frogArrayIndexOuter = 0; frogArrayIndexOuter < this.frogGrid.length; frogArrayIndexOuter++){   //loops through all spaces
            for (var frogArrayIndexInner = 0; frogArrayIndexInner < this.frogGrid[frogArrayIndexOuter].length; frogArrayIndexInner++){
                if (this.frogGrid[frogArrayIndexOuter][frogArrayIndexInner] === 1){         //if a space has a frog in it, remove the frog
                    this.removeFrog(frogArrayIndexOuter, frogArrayIndexInner);
                }
            }
        }

        this.frogGrid = [ [1,1,1,1,1],
                          [1,1,1,1,1],
                          [1,1,0,1,1],
                          [1,1,1,1,1],
                          [1,1,1,1,1] ];

        this.generateFrogs();

        player1.playerScore = 0;
        $('.' + player1.playerPosition + 'PlayerScore').text(player1.playerScore).show();
        player2.playerScore = 0;
        $('.' + player2.playerPosition + 'PlayerScore').text(player2.playerScore).show();


    }
}
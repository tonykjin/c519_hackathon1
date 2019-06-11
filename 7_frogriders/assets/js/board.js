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
        this.playerMoveCounter = 1;

        this.frogGrid = [ [1,1,1,1,1],
                          [1,1,1,1,1],
                          [1,1,0,1,1],
                          [1,1,1,1,1],
                          [1,1,1,1,1] ];
    }


    generateFrogs() {                                                   
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
            if ($(event.currentTarget).attr('id') === this.firstClick){ 
                this.firstClick = undefined;                            
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
        debugger;

        if (this.frogGrid[this.y2][this.x2] === 0){
            if (this.playerMoveCounter === 1) {                
                this.moveFrogs(this.firstPlayer);
            } else if (this.playerMoveCounter === 2) {          
                this.moveFrogs(this.secondPlayer);
            }

            for (var frogArrayIndexOuter = 0; frogArrayIndexOuter < this.frogGrid.length; frogArrayIndexOuter++){        
                for (var frogArrayIndexInner = 0; frogArrayIndexInner < this.frogGrid[frogArrayIndexOuter].length; frogArrayIndexInner++){
                    var frogIndex = $('#' + frogArrayIndexOuter + '-' + frogArrayIndexInner);
                    if (frogIndex.hasClass('border')) {
                        frogIndex.removeClass('border');
                    }
                }
            }

            $('#'+this.y1+'-'+this.x1).removeClass('yellowBackground');

            if (this.playerMoveCounter === 1) {
                this.playerMoveCounter = 2;
            } else {
                this.playerMoveCounter = 1;
            }
        }

        this.y2 = undefined;                        
        this.x2 = undefined;
        this.secondClick = undefined;


        this.checkEndGame();                


        this.checkEndGame();                
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
            

            if (this.frogGrid[(this.y1 + this.y2)/2][(this.x1 + this.x2)/2] === 1) {      

                this.removeFrog(this.y1, this.x1);  

                this.removeFrog((this.y1 + this.y2)/2, (this.x1 + this.x2)/2); 

                this.addFrog(this.y2, this.x2);    

                player.incrementPlayerScore();          

            }
        }

        this.firstClick = undefined;
        this.secondClick = undefined;
    }


    checksPossibleMoves(){
        var w = null;
        var v = null;


        if (this.frogGrid[this.y1 + 2] !== undefined){         
            if (this.frogGrid[this.y1 + 1][this.x1] === 1 && this.frogGrid[this.y1 + 2][this.x1] === 0) {    
                w = this.y1 + 2;
                v = this.x1;
                this.highlightSquares(v, w, 'border');      
            }
        }

        if (this.frogGrid[this.y1-2] !== undefined){         
            if (this.frogGrid[this.y1 - 1][this.x1] === 1 && this.frogGrid[this.y1-2][this.x1] === 0) {     
                w = this.y1 - 2;
                v = this.x1;
                this.highlightSquares(v, w, 'border');      
            }
        }

        if (this.frogGrid[this.y1][this.x1+2] !== undefined){        
            if (this.frogGrid[this.y1][this.x1+1] === 1 && this.frogGrid[this.y1][ this.x1+2] === 0) {      
                w = this.y1;
                v = this.x1 + 2;
                this.highlightSquares(v, w,'border');       
            }
        }

        if (this.frogGrid[this.y1][this.x1-2] !== undefined){        
            if (this.frogGrid[this.y1][this.x1-1] === 1 && this.frogGrid[this.y1][this.x1-2] === 0) {       
                w = this.y1;
                v = this.x1-2;
                this.highlightSquares(v, w,'border');       
            }
        }
    }

    highlightSquares(x, y, color){
        $('#'+y+'-'+x).addClass(color);
    }

    checkEndGame(){
        var possibleMoves = 0;

        for (var frogArrayIndexOuter = 0; frogArrayIndexOuter < this.frogGrid.length; frogArrayIndexOuter++){   
            for (var frogArrayIndexInner = 0; frogArrayIndexInner < this.frogGrid[frogArrayIndexOuter].length; frogArrayIndexInner++){
                if (this.frogGrid[frogArrayIndexOuter][frogArrayIndexInner] === 1){         
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
        $('.victory-modal').css('display','none');

        for (var frogArrayIndexOuter = 0; frogArrayIndexOuter < this.frogGrid.length; frogArrayIndexOuter++){   
            for (var frogArrayIndexInner = 0; frogArrayIndexInner < this.frogGrid[frogArrayIndexOuter].length; frogArrayIndexInner++){
                if (this.frogGrid[frogArrayIndexOuter][frogArrayIndexInner] === 1){         
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
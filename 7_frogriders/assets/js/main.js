$(document).ready(startApp);

var newGameBoard;

function startApp() {
    newGameBoard = new Gameboard();
    newGameBoard.addEventListeners();


    newGameBoard.generateFrogs();

    var modal = $('#simpleModal');
    var modalBtn = $('#modalBtn');
    var closeBtn = $('.closeBtn');

    modalBtn.on('click', openModal);
    closeBtn.on('click', closeModal);
    $("window").on('click', outsideClick);

    function openModal(){
        $(modal).css('display','block');
    }
    function closeModal() {
        $(modal).css('display','none');
    }
    function outsideClick(event){
        if(event == modal) {
            $(modal).css('display','none');
        }
    }

}


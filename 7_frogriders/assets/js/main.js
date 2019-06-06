$(document).ready(startApp);

function startApp() {
    var frogLocation = new Frog();
    frogLocation.addEventListeners();
    frogLocation.frogIndex(); 
}




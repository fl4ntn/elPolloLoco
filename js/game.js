let canvas;
let world;
let keyboard = new Keyboard();
let sound = new Sound();



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, sound);
    
}

window.addEventListener('click', function(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    
    if (x < 706 && x > 651 && y > 17 && y < 66) {
        if (sound.sound == false) {
           sound.sound = true; 
        } else {
            sound.sound = false
        }   } 
});

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37){
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38){
        keyboard.UP = true;
    }
    if (event.keyCode == 40){
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32){
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68){
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37){
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38){
        keyboard.UP = false;
    }
    if (event.keyCode == 40){
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32){
        keyboard.SPACE = false;
    }
     if (event.keyCode == 68){
        keyboard.D = false;
    }
});




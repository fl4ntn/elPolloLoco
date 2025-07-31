let canvas;
let world;
let keyboard = new Keyboard();







function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39){
        keyboard.RIGHT = true;
        console.log(keyboard.RIGHT);
    }
    if (event.keyCode == 37){
        keyboard.LEFT = true;
        console.log(keyboard.LEFT);
    }
    if (event.keyCode == 38){
        keyboard.UP = true;
        console.log(keyboard.UP);
    }
    if (event.keyCode == 40){
        keyboard.DOWN = true;
        console.log(keyboard.DOWN);
    }
    if (event.keyCode == 32){
        keyboard.SPACE = true;
        console.log(keyboard.SPACE);
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39){
        keyboard.RIGHT = false;
        console.log(keyboard.RIGHT);
    }
    if (event.keyCode == 37){
        keyboard.LEFT = false;
        console.log(keyboard.LEFT);
    }
    if (event.keyCode == 38){
        keyboard.UP = false;
        console.log(keyboard.UP);
    }
    if (event.keyCode == 40){
        keyboard.DOWN = false;
        console.log(keyboard.DOWN);
    }
    if (event.keyCode == 32){
        keyboard.SPACE = false;
        console.log(keyboard.SPACE);
    }
});




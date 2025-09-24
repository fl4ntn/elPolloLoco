let canvas;
let world;
let keyboard = new Keyboard();
let sound = new Sound();



function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, sound);
    document.getElementById('explanation_board').classList.add('d_none');
    
}


function openSettings() {
    // document.getElementById('settings_overlay').classList.remove('d_none');
    document.getElementById('explanation_board').innerHTML = getSettingsOverlay();
}

function getExplanationBoard() {
    document.getElementById('explanation_board').innerHTML = getExplanationBoardTemplate();
}

window.addEventListener('click', function(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    
    if (x < 706 && x > 651 && y > 17 && y < 66) {
        if (sound.activated == false) {
           sound.activated = true; 
        } else {
            sound.activated = false
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



document.getElementById('move_left_btn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});

document.getElementById('move_left_btn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
});


document.getElementById('move_right_btn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
});

document.getElementById('move_right_btn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
});

document.getElementById('jump_btn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.UP = true;
});

document.getElementById('jump_btn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.UP = false;
});



document.getElementById('throw_btn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
});

document.getElementById('throw_btn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
});

function gameOver() {
     
   
//    world = new World(canvas, keyboard, sound);
//     
        
        //  world = null;
        // //  init();
        
        // // cancelAnimationFrame(world.animationFrame);
        // // clearInterval(world.gameLoop);
        // // document.getElementById('canvas').innerHTML = "";
        
        // // world.level = level1;
        // // #
        // // init();
        // document.getElementById('explanation_board').classList.remove('d_none');
    
    // cancelAnimationFrame(world.animationFrameId)
    // for (let i = 1; i < 9999; i++) { window.clearInterval(i);}
    // world = null;
    // canvas = null;
    
    init();
    // const ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // resetKeyboard();
    // world.resetWorld();
    // const level = level1;
    



    }

    function getExplanationBoardTemplate() {
        return `
            <div class="explanation_box">
                <img class="map" src="img/map.png" alt="map">
                <p>EXPLANATION</p>
            </div>
            
            <div onclick="openSettings()" class="explanation_box">
                <img class="map rotate" src="img/settings.png" alt="map">
                <p>SETTINGS</p>
            </div>
            <div onclick="init()" class="explanation_box">
                <img class="map" src="img/old_door.png" alt="map">
                <p>START GAME</p>
            </div>
        
        `
    }
    
    function getSettingsOverlay() {
        return `
        <div>
        <div class="settings">
            <div class="settings_option">
               
                <div class="ticked_box">
                    <div class="box"></div>
                    <div class="cross">X</div>
                </div>
                <p class="font60">Sound</p>
            </div>
            <div class="settings_option">
                
                <div class="ticked_box">
                    <div class="box"></div>
                    <div class="cross">X</div>
                </div>
                <p class="font60">Level 1</p>
            </div>
            <div class="settings_option">
                
                <div class="ticked_box">
                    <div class="box"></div>
                    <div class="cross">X</div>
                </div>
                <p class="font60">Level 2</p>
            </div>
        </div>

        <div class="leave_settings">
          
                <p onclick="init()" class="font60">Start Game</p>
            
           
                <p onclick="getExplanationBoard()" class="font60">Go Back</p>
            
        
        
        
        
        </div>
        </div>





        
            
           
        
        
        
        
        
        `
    }



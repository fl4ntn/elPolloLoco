let canvas;
let world;
let keyboard = new Keyboard();
let sound = new Sound();
let currentLevel = 1;
let youWon = false;
let reasonsToLooose = ['You ran out of energy...', 'No bottles left to kill the Endboss'];
let winnerAudio = new Audio('https://cdn.freesound.org/previews/769/769801_13237592-lq.mp3');
let backgroundMusic = new Audio('audio/flamenco-loop-1-382455.mp3');
let bgMusicInterval;
let touchDevice = window.matchMedia("(pointer: coarse)").matches;
// let fullScreenMode;

// window.addEventListener("touchstart", onfirstTouch => { touchDevice = true});




function init() {
    if (currentLevel == 1) {
        initLevel();
    } else {
        initLevel2();
    }
    youWon = false;
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, sound);
    
    document.getElementById('explanation_board').classList.remove('top_290');
    document.getElementById('explanation_board').classList.add('d_none');
    document.getElementById('restart_game').classList.remove('d_none');
    document.getElementById('exit_game').classList.remove('d_none');
    document.getElementById('sound_btn').classList.remove('d_none');
    if (touchDevice) {
        document.getElementById('mobile_buttons').classList.remove('d_none'); 
    }
    
    ShowUnMuteTextBtn();
    playBgMusic();
    // backgroundMusic.play();
    // backgroundMusic.loop = true;
    // playSound(backgroundMusic, 0.2)
    stopSound(winnerAudio);
}

function playBgMusic() {
    bgMusicInterval = setInterval(() => {
        playSound(backgroundMusic, 0.1)
        }, 1000/60 );
}


function openSettings() {
    document.getElementById('explanation_board').innerHTML = getSettingsOverlay();
    showSoundStatus();
    showLevelStatus();
}

function getExplanationBoard() {
    document.getElementById('explanation_board').innerHTML = getExplanationBoardTemplate();
    document.getElementById('explanation_board').classList.remove('top_290');
}

function openExplanation() {
    document.getElementById('explanation_board').innerHTML = getExplanaionOverlay();
    document.getElementById('explanation_board').classList.add('top_290');
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
    preventDefault(e);
    keyboard.LEFT = true;
});

document.getElementById('move_left_btn').addEventListener('touchend', (e) => {
    preventDefault(e);
    keyboard.LEFT = false;
});


document.getElementById('move_right_btn').addEventListener('touchstart', (e) => {
    preventDefault(e);
    keyboard.RIGHT = true;
});

document.getElementById('move_right_btn').addEventListener('touchend', (e) => {
    preventDefault(e);
    keyboard.RIGHT = false;
});

document.getElementById('jump_btn').addEventListener('touchstart', (e) => {
    preventDefault(e);
    keyboard.UP = true;
});

document.getElementById('jump_btn').addEventListener('touchend', (e) => {
    preventDefault(e);
    keyboard.UP = false;
});



document.getElementById('throw_btn').addEventListener('touchstart', (e) => {
    preventDefault(e);
    keyboard.D = true;
});

document.getElementById('throw_btn').addEventListener('touchend', (e) => {
    preventDefault(e);
    keyboard.D = false;
});

function mobileScreen() {
    if (!screen.orientation.type.startsWith('landscape') && window.innerWidth < 980) {
        document.getElementById('full_screen').classList.remove('d_none');
        console.log(`Please turn device`);
        
    } else {
        document.getElementById('full_screen').classList.add('d_none');
        document.getElementById('explanation_board').classList.add('width_581');
    }
}


screen.orientation.addEventListener("change", () => {
    mobileScreen();
    console.log(`The orientation of the screen is: ${screen.orientation}`);
    // if (screen.orientation.type.startsWith('landscape')) {
    //    let fullscreen = document.getElementById('fullscreen');
    //     // enterFullscreen(fullscreen); 

    // }
    // } else {
    //     if(fullScreenMode) {
    //        exitFullscreen(); 
    //     }
        
        
    // }
    
    
    //   screen.orientation.lock();
});

// function enterFullscreen(element) {
//     if (element.requestFullscreen) {
//     element.requestFullscreen();
//   } else if (element.webkitRequestFullscreen) { /* Safari */
//     element.webkitRequestFullscreen();
//   } else if (element.msRequestFullscreen) { /* IE11 */
//     element.msRequestFullscreen();
//   }
//   fullScreenMode = true;
// }

// function exitFullscreen() {
//     if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.webkitExitFullscreen) { /* Safari */
//     document.webkitExitFullscreen();
//   } else if (document.msExitFullscreen) { /* IE11 */
//     document.msExitFullscreen();
//   }
//   fullScreenMode = false;
// }

function preventDefault(e) {
     if (e.cancelable) {
    e.preventDefault();
  }
}

function restartGame() {
    exitGame();
    init();
    }

    function exitGame() {
        document.getElementById('explanation_board').classList.remove('d_none');
        getExplanationBoard();
        world.clearAllIntervals();
        cancelAnimationFrame(world.gameLoopId);
        world.ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('restart_game').classList.add('d_none');
        document.getElementById('exit_game').classList.add('d_none');
        document.getElementById('sound_btn').classList.add('d_none');
        document.getElementById('mobile_buttons').classList.add('d_none');
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }

    function gameOver(i, enemiesKilled){
        exitGame();
        if (youWon) {
            document.getElementById('explanation_board').innerHTML = getYouWonScreen(i, enemiesKilled);
            document.getElementById('explanation_board').classList.add('top_290');
        } else {
            document.getElementById('explanation_board').innerHTML = getYouLostScreen(i);
            document.getElementById('explanation_board').classList.add('top_290');
        }
        
    }



    function playSound(type, volume) {
        if (sound.activated) {
            type.play();  
            type.volume = volume;
        } else {
            type.pause();  
        }
    }

     function stopSound(type) {
            type.pause();  
        }

    

    function getYouWonScreen(i,enemiesKilled){
        playSound(winnerAudio, 0.2);
        
        return `
       <div class="settings">
            <img class="you_won_img" src="img/You won, you lost/You won A.png" alt="You Won">

            
            <div class="results">
                <div class="result_div">
                    <p class="font40">Coins earned:</p>
                    <p class="font40">${Math.round(i)} / 100</p>
                </div>
                <div class="result_div">
                    <p class="font40">Enemies killed:</p>
                    <p class="font40">${enemiesKilled}</p>
                </div>
                
            </div> 
            <div class="leave_explanation">
                <p onclick="init()" class="font40 hover">Play Again</p>
                <p onclick="getExplanationBoard()" class="font40 hover">Leave Game</p>
            </div>
        
        </div>
        `
    }

     function getYouLostScreen(i){
        return `
        <div class="settings">
            <img class="you_lost_img" src="img/You won, you lost/You lost.png" alt="You Lost">
    
            <div class="reason_for_loss">
                <p class="font40">${reasonsToLooose[i]}</p>
            </div>
                    
                
                
            
            <div class="leave_explanation">
                <p onclick="init()" class="font40 hover">Try Again</p>
                <p onclick="getExplanationBoard()" class="font40 hover">Leave Game</p>
            </div>
        </div>
        
        `
    }

    function getExplanationBoardTemplate() {
        return `
            <div onclick="openExplanation()" class="explanation_box">
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

    function showSoundStatus(){
        if (sound.activated) {
            document.getElementById('soundsettings').innerHTML = "X";
        } else {
            document.getElementById('soundsettings').innerHTML = "";
        }
    }

    function updateSoundSettings() {
        switchSoundSettings();
        showSoundStatus();
    }

    function updateSoundButton() {
        switchSoundSettings();
        ShowUnMuteTextBtn();  
    }

    function ShowUnMuteTextBtn() {
        if (sound.activated) {
            document.getElementById('sound_btn').innerHTML = 'mute sound';
        } else {
            document.getElementById('sound_btn').innerHTML = 'play sound';
        }
    }

    function switchSoundSettings() {
        if (sound.activated) {
            sound.activated = false;
        } else {
            sound.activated = true;
        }
    }

    function showLevelStatus() {
        if (currentLevel == 1) {
            document.getElementById('level1settings').innerHTML = "X";
            document.getElementById('level2settings').innerHTML = "";
        } else {
            document.getElementById('level1settings').innerHTML = "";
            document.getElementById('level2settings').innerHTML = "X";
        }
    }

    function switchLevelSettings() {
        if (currentLevel == 1) {
            currentLevel = 2;
        } else {
            currentLevel = 1;
        }
        showLevelStatus();

    }
    
    function getSettingsOverlay() {
        return `
        <div style="padding-top:64px;">
        <div class="settings">
            <div onclick="updateSoundSettings()" class="settings_option">
               
                <div class="ticked_box">
                    <div class="box"></div>
                    <div id="soundsettings" class="cross"></div>
                </div>
                <p class="font60">Sound</p>
            </div>
            <div onclick="switchLevelSettings()" class="settings_option">
                
                <div class="ticked_box">
                    <div class="box"></div>
                    <div id="level1settings" class="cross"></div>
                </div>
                <p class="font60">Level 1</p>
            </div>
            <div onclick="switchLevelSettings()" class="settings_option">
                
                <div class="ticked_box">
                    <div class="box"></div>
                    <div id="level2settings" class="cross"></div>
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

    function openImprint() {
        window.open(href="imprint.html");
    }

        function getExplanaionOverlay() {
        return `
        <div class="settings">
            <div class="explanation_text">
                You are about to guide the tireless Pepe across the scorching desert. Along the way, enemies will block his path. Defeat them by jumping on their heads or by throwing one of your precious salsa bottles. <br>But be careful—at the end of the journey awaits a mighty final boss, so make sure to save a few bottles for the showdown.<br><br>

                On your adventure, you can also collect coins and salsa bottles simply by running into them. Every step brings Pepe closer to victory—will you lead him through the desert?
            </div>
            <div class="keyboard_explanation">
                <div>
                    <p class="font40">Walk:</p>
                    <p class="font40">Jump:</p>
                    <p class="font40">Throw:</p>
                </div>
                <div>
                    <p class="font40">Arrow left/right</p> 
                    <p class="font40">Arrow up/Space</p>   
                    <p class="font40">D</p>
                </div>  
            </div> 
            <div class="leave_explanation">
                <p onclick="init()" class="font40 hover">Start Game</p>
                <p onclick="getExplanationBoard()" class="font40 hover">Go Back</p>
            </div>
        </div>
       
        `
    }



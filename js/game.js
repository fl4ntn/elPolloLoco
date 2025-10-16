let canvas;
let world;
let keyboard = new Keyboard();
let sound = new Sound();
let currentLevel = 1;
let youWon = false;
let reasonsToLooose = ["You ran out of energy...", "No bottles left to kill the Endboss",];
let winnerAudio = new Audio("https://cdn.freesound.org/previews/769/769801_13237592-lq.mp3");
let backgroundMusic = new Audio("audio/flamenco-loop-1-382455.mp3");
let bgMusicInterval;
let touchDevice = window.matchMedia("(pointer: coarse)").matches;


/**
 * function initializes the game with the correct level, sets up a new world.
 * It also adapts css classes and plays music if sound is on.
 */
function init() {
  if (currentLevel == 1) {
    initLevel();
  } else {
    initLevel2();
  }
  youWon = false;
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, sound);
  adaptCssClassesOnLoad();
  ShowUnMuteTextBtn();
  playBgMusic();
  stopSound(winnerAudio);
}


/**
 * function adapts css classes so that the design suits the game setup when starting.
 */
function adaptCssClassesOnLoad() {
  document.getElementById("explanation_board").classList.remove("top_290");
  document.getElementById("explanation_board").classList.add("d_none");
  document.getElementById("restart_game").classList.remove("d_none");
  document.getElementById("exit_game").classList.remove("d_none");
  document.getElementById("sound_btn").classList.remove("d_none");
  if (touchDevice) {
    document.getElementById("mobile_buttons").classList.remove("d_none");
  }
}


/**
 * plays backgroundmusic in a loop if sound is on.
 */
function playBgMusic() {
  bgMusicInterval = setInterval(() => {
    playSound(backgroundMusic, 0.1);
  }, 1000 / 60);
}


/**
 * opens settings on home screen.
 */
function openSettings() {
  document.getElementById("explanation_board").innerHTML = getSettingsOverlay();
  showSoundStatus();
  showLevelStatus();
}


/**
 * opens explanation board on home screen.
 */
function getExplanationBoard() {
  document.getElementById("explanation_board").innerHTML =
    getExplanationBoardTemplate();
  document.getElementById("explanation_board").classList.remove("top_290");
}


/**
 * opens explanation on home screen.
 */
function openExplanation() {
  document.getElementById("explanation_board").innerHTML =
    getExplanaionOverlay();
  document.getElementById("explanation_board").classList.add("top_290");
}


/**
 * onkeydown, the keyboard functions are set to true.
 */
window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
});


/**
 * onkeydown, the keyboard functions are set to false.
 */
window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode == 68) {
    keyboard.D = false;
  }
});


/**
 * ontouchstart, the specific keyboard functions are set to true.
 */
document.getElementById("move_left_btn").addEventListener("touchstart", (e) => {
  preventDefault(e);
  keyboard.LEFT = true;
});


/**
 * ontouchend, the specific keyboard functions are set to false.
 */
document.getElementById("move_left_btn").addEventListener("touchend", (e) => {
  preventDefault(e);
  keyboard.LEFT = false;
});


/**
 * ontouchstart, the specific keyboard functions are set to true.
 */
document
  .getElementById("move_right_btn")
  .addEventListener("touchstart", (e) => {
    preventDefault(e);
    keyboard.RIGHT = true;
  });


/**
 * ontouchend, the specific keyboard functions are set to false.
 */


document.getElementById("move_right_btn").addEventListener("touchend", (e) => {
  preventDefault(e);
  keyboard.RIGHT = false;
});


/**
 * ontouchstart, the specific keyboard functions are set to true.
 */
document.getElementById("jump_btn").addEventListener("touchstart", (e) => {
  preventDefault(e);
  keyboard.UP = true;
});


/**
 * ontouchend, the specific keyboard functions are set to false.
 */
document.getElementById("jump_btn").addEventListener("touchend", (e) => {
  preventDefault(e);
  keyboard.UP = false;
});


/**
 * ontouchstart, the specific keyboard functions are set to true.
 */
document.getElementById("throw_btn").addEventListener("touchstart", (e) => {
  preventDefault(e);
  keyboard.D = true;
});


/**
 * ontouchend, the specific keyboard functions are set to false.
 */
document.getElementById("throw_btn").addEventListener("touchend", (e) => {
  preventDefault(e);
  keyboard.D = false;
});


/**
 * adapts css classes based on screen orientation.
 */
function mobileScreen() {
  if (
    !screen.orientation.type.startsWith("landscape") &&
    window.innerWidth < 980
  ) {
    document.getElementById("full_screen").classList.remove("d_none");
  } else {
    document.getElementById("full_screen").classList.add("d_none");
    document.getElementById("explanation_board").classList.add("width_581");
  }
}


/**
 * when screen orientation changes, mobile screen is shown.
 */
screen.orientation.addEventListener("change", () => {
  mobileScreen();
});


/**
 * prevents default.
 */
function preventDefault(e) {
  if (e.cancelable) {
    e.preventDefault();
  }
}


/**
 * restart game.
 */
function restartGame() {
  exitGame();
  init();
}


/**
 * lets game end, including all intervals and background music.
 * Shows explanation board.
 */
function exitGame() {
  document.getElementById("explanation_board").classList.remove("d_none");
  getExplanationBoard();
  world.clearAllIntervals();
  cancelAnimationFrame(world.gameLoopId);
  world.ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("restart_game").classList.add("d_none");
  document.getElementById("exit_game").classList.add("d_none");
  document.getElementById("sound_btn").classList.add("d_none");
  document.getElementById("mobile_buttons").classList.add("d_none");
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}


/**
 * shows gameOver screen with information whether game has been won or lost.
 */
function gameOver(i, enemiesKilled) {
  exitGame();
  if (youWon) {
    document.getElementById("explanation_board").innerHTML = getYouWonScreen(i, enemiesKilled);
    document.getElementById("explanation_board").classList.add("top_290");
  } else {
    document.getElementById("explanation_board").innerHTML = getYouLostScreen(i);
    document.getElementById("explanation_board").classList.add("top_290");
  }
}


/**
 * plays sound if sound is om.
 */
function playSound(type, volume) {
  if (sound.activated) {
    type.play();
    type.volume = volume;
  } else {
    type.pause();
  }
}


/**
 * stops sound.
 */
function stopSound(type) {
  type.pause();
}


/**
 * shows on settings screen whether sound is on or off.
 */
function showSoundStatus() {
  if (sound.activated) {
    document.getElementById("soundsettings").innerHTML = "X";
  } else {
    document.getElementById("soundsettings").innerHTML = "";
  }
}


/**
 * onclick, updates soundsettings.
 */
function updateSoundSettings() {
  switchSoundSettings();
  showSoundStatus();
}


/**
 * onclick, updates soundsettings on game canvas.
 */
function updateSoundButton() {
  switchSoundSettings();
  ShowUnMuteTextBtn();
}


/**
 * shows on game canvas whether sound is activated or not.
 */
function ShowUnMuteTextBtn() {
  if (sound.activated) {
    document.getElementById("sound_btn").innerHTML = "mute sound";
  } else {
    document.getElementById("sound_btn").innerHTML = "play sound";
  }
}


/**
 * switches and saves soundsettings.
 */
function switchSoundSettings() {
  if (sound.activated) {
    sound.activated = false;
  } else {
    sound.activated = true;
  }
}


/**
 * shwos current level on settings screen.
 */
function showLevelStatus() {
  if (currentLevel == 1) {
    document.getElementById("level1settings").innerHTML = "X";
    document.getElementById("level2settings").innerHTML = "";
  } else {
    document.getElementById("level1settings").innerHTML = "";
    document.getElementById("level2settings").innerHTML = "X";
  }
}


/**
 * switches levels onclick on other level on settins page.
 */
function switchLevelSettings() {
  if (currentLevel == 1) {
    currentLevel = 2;
  } else {
    currentLevel = 1;
  }
  showLevelStatus();
}


/**
 * opens imprint on new tab.
 */
function openImprint() {
  window.open((href = "imprint.html"));
}

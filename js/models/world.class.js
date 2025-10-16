class World  {
  gameLoopId;
  CoinsEarnedAudio = new Audio("audio/Earned_Coins.m4a");
  HurtAudio = new Audio("audio/Ouch.m4a");
  throwingBottleAudio = new Audio("audio/throwingBottle.m4a");
  EndbossDeadAudio = new Audio("audio/endboss_dead – Mit Clipchamp erstellt_1755934161346.m4a");
  BabyChickenDeadAudio = new Audio("audio/small_chicken_sound.mp3");
  BreakingBottleAudio = new Audio("audio/glassIsBreaking.m4a");
  takeBottleAudio = new Audio("audio/plug_in.m4a");
  snoringSound = new Audio("audio/snoring.mp3");
  sound;
  endbossWasHit = 0;
  character = new Character(sound);
  bottlesLeft = 100;
  coinsCollected = 0;
  currentEnemey;
  bottleNumber = 0;
  level;
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  statusBarEnergy = new StatusBar("energy", 10);
  statusBarCoins = new StatusBar("coins", 55);
  statusBarBottles = new StatusBar("bottles", 100);
  throwableObjects = [];
  canvas;
  closeToEndboss = false;
  veryCloseToEndboss = false;
  ctx;
  keyboard;
  camera_x = 0;
  lastAction = new Date().getTime();
  worldActions = new WorldActions();


  /**
   * Represents a world.
   * @constructor
   * @param {string} canvas - The canvas on the screen.
   * @param {object} keyboard - saves if keys have been pressed.
   * @param {boolean} sound - Whether the sound is on or not.
   */
  constructor(canvas, keyboard, sound) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.sound = sound;
    this.checkLevel();
    this.objectsStartMoving();
    this.draw();
    this.setWorld();
    this.run();
  }


  /**
   * sets up correct level.
   */
  checkLevel() {
    if (currentLevel == 1) {
      this.getLevel1();
    } else {
      this.getLevel2();
    }
  }


  /**
   * saves all information necessary for level 1 into variables.
   */
  getLevel1() {
    this.level = level1;
    this.enemies = level1.enemies;
    this.clouds = level1.clouds;
    this.backgroundObjects = level1.backgroundObjects;
    this.coins = level1.coins;
    this.bottles = level1.bottles;
  }


  /**
   * saves all information necessary for level 2 into variables.
   */
  getLevel2() {
    this.level = level2;
    this.enemies = level2.enemies;
    this.clouds = level2.clouds;
    this.backgroundObjects = level2.backgroundObjects;
    this.coins = level2.coins;
    this.bottles = level2.bottles;
  }


  /**
   * makes enemies an clouds start moving by adding speed to the variable.
   */
  objectsStartMoving() {
    this.enemies.forEach((enemy) => {
      enemy.speed = enemy.walkingSpeed;
    });
    this.clouds.forEach((cloud) => {
      cloud.speed = 0.02;
    });
  }


  /**
   * saves all information from the world to the character.
   */
  setWorld() {
    this.character.world = this;
    this.worldActions.world = this;
  }


  /**
   * makes game Intervals start.
   */
  run() {
    setInterval(() => {
      this.worldActions.checkCollisions();
      this.worldActions.checkThrowableObjects();
      this.worldActions.collisionWithBottle();
      this.worldActions.checkDistanceToEndboss();
      this.isPepeSleeping();
    }, 1000 / 60);
  }


  /**
   * This function decreases the coins available and updates the statusbar accordingly.
   */
  decreaseCoins() {
    if (this.coinsCollected >= 12.5) {
      this.coinsCollected += -12.5;
      this.updateStatusbar(
        this.statusBarCoins,
        this.coinsCollected,
        world.statusBarCoins.IMAGES_COINS
      );
    }
  }


  /**
   * updates infrmation on bottles available.
   * Adds bottle to cnavas.
   * Plays sound.
   * Updates statusbar.
   */
  updateBottles() {
    this.decreaseAwailableBottles();
    this.worldActions.addBottleToCanvas();
    this.updateStatusbar(
      this.statusBarBottles,
      this.bottlesLeft,
      this.statusBarBottles.IMAGES_BOTTLES
    );
    playSound(this.throwingBottleAudio, 1);
  }


  /**
   * Shows game over screen.
   */
  showGameOverImage() {
    document.getElementById("explanation_board").classList.remove("d_none");
    document.getElementById(
      "explanation_board"
    ).innerHTML = `<img class="game_over_img" src="img/You won, you lost/Game over A.png" alt="You Won">`;
  }


  /**
   * leaves game by stopping all intervals and showing the game over screen.
   * @param {string} result - Indicates whether game was won or lost.
   * @param {number} i - saves the reason to loose (1:no bottls left) or the coins that have been earned.
   */
  leaveGame(result, i) {
    setTimeout(() => {
      this.clearAllIntervals();
      this.showGameOverScreen(result, i);
    }, "2000");
  }


  /**
   * Returns whether there are more than 3 bottles left.
   */
  enoughBottlesLeft() {
    return this.bottlesLeft >= 3;
  }


  /**
   * decreases the amount of bottles left.
   */
  decreaseAwailableBottles() {
    this.bottlesLeft += -3;
    this.bottleNumber += 1;
  }


  /**
   * increases the amount of bottles left.
   */
  increaseAwailableBottles() {
    this.bottlesLeft += 3;
  }


  /**
   * updates the statusbar.
   * @param {string} bar - indicates which bar is updated.
   * @param {number} assets - saves how many bottles/coins or how much energy is left.
   * @param {array} images - array of images of the statusbar.
   */
  updateStatusbar(bar, assets, images) {
    bar.setPercentage(assets, images);
  }


  /**
   * Continuously renders the current game frame onto the canvas.
   * Clears the canvas, updates visual elements and camera position,
   * Requests the next frame to create an animation loop.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addBasicsToCanvas();
    this.addStatusbarsToCanvas();
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    this.gameLoopId = requestAnimationFrame(function () {
      self.draw();
    });
  }


  /**
   * This method translates the canvas context based on the current camera position.
   * Draws all basic game elements onto the canvas.
   */
  addBasicsToCanvas() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);
  }


  /**
   * Draws all three statusbars onto the canvas.
   */
  addStatusbarsToCanvas() {
    this.addToMap(this.statusBarEnergy);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
  }


  /**
   * Iterates over the provided array of objects and calls `addToMap()` for each one, rendering them onto the canvas in sequence.
   * @param {object} objects - the provided array of objects.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }


  /**
   *  Adds a single movable object to the canvas.
   *
   * If the object is facing the opposite direction (otherDirection = true),
   * its image is temporarily flipped horizontally before drawing.
   * After rendering the object, the image orientation is restored.
   * @param {object} mo - single movable object.
   *
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }


  /**
   * flips image horizontally.
   * @param {object} mo - single movable object.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }


  /**
   * This method resets the object's horizontal position and restores the
   * canvas context to its previous state.
   * @param {object} mo - single movable object.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  
  /**
   * shows Game Over screen.
   * @param {string} result - Indicates whether game was won or lost.
   * @param {number} index - Saves the reason to loose (1:no bottls left, 0:no energy left) or the coins that have been earned.
   */
  showGameOverScreen(result, index) {
    let EnemiesKilled = this.countEnemiesKilled();
    if (result == "won") {
      youWon = true;
    }
    gameOver(index, EnemiesKilled);
  }


  /**
   * clears all intervals.
   */
  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }


  /**
   * counts the enemies that have been killed at the end of the game.
   */
  countEnemiesKilled() {
    let counter = 0;
    for (let index = 0; index < this.enemies.length; index++) {
      if (!this.enemies[index].isAlive) {
        counter++;
      }
    }
    return counter;
  }


  /**
   * saves the time of the last action and evaluates whether Pepe is sleeping.
   */
  registerTime() {
    this.lastAction = new Date().getTime();
    this.isPepeSleeping();
  }


  /**
   * if more than 10 secons have been passed since last action, function lets Pepe snooze.
   * if more than 15 secons have been passed since last action, function lets Pepe fall asleep.
   */
  isPepeSleeping() {
    if (new Date().getTime() - this.lastAction > 15000) {
      this.character.isSnoozing = false;
      this.character.isSleeping = true;
      playSound(this.snoringSound, 0.2);
    } else if (new Date().getTime() - this.lastAction > 1000) {
      this.character.isSnoozing = true;
      stopSound(this.snoringSound);
    } else {
      this.character.isSnoozing = false;
      this.character.isSleeping = false;
      stopSound(this.snoringSound);
    }
  }


  /**
   * function returns whether Pepe is sleeping at the moment or not.
   */
  pepeisSleeping() {
    if (new Date().getTime() - this.lastAction > 15000) {
      return true;
    } else {
      return false;
    }
  }
}

class World{
    gameLoopId;
    CoinsEarnedAudio = new Audio('audio/Earned_Coins.m4a');
    HurtAudio = new Audio('audio/Ouch.m4a');
    throwingBottleAudio = new Audio('audio/throwingBottle.m4a');
    EndbossDeadAudio = new Audio('audio/endboss_dead – Mit Clipchamp erstellt_1755934161346.m4a');
    BabyChickenDeadAudio = new Audio('audio/small_chicken_sound.mp3');
    BreakingBottleAudio = new Audio('audio/glassIsBreaking.m4a');
    takeBottleAudio = new Audio('audio/plug_in.m4a');
    snoringSound = new Audio('audio/snoring.mp3');
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
    
/**
   * Represents a world.
   * @constructor
   * @param {string} canvas - The canvas on the screen.
   * @param {object} keyboard - saves if keys have been pressed.
   * @param {boolean} sound - Whether the sound is on or not.
   */
    constructor(canvas, keyboard, sound){
        this.ctx = canvas.getContext('2d');
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
    setWorld(){
        this.character.world = this;
    }
 /**
   * makes game Intervals start.
   */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
            this.collisionWithBottle();
            this.checkDistanceToEndboss();
            this.isPepeSleeping();
        }, 1000/60 );
    }
 /**
   * checks collisions with enemies, coins and bottles.
   */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.checkCollisionWithCharacter(enemy);
        });
        this.level.coins.forEach((coin) => {
            this.checkCollisionWithCoin(coin);
        });
        this.level.bottles.forEach((bottle) => {
            this.checkCollisionWithBottle(bottle);
        });
        
    }
 /**
   * checks collisions with character.
   */
    checkCollisionWithCharacter(enemy) {
        if(this.character.isColliding(enemy) && enemy.isAlive) {
            this.registerTime();
            if (this.character.isFalling && this.character.isAboveGround() && this.enemyisNormalChicken(enemy)) {              
                this.character.jump(this.sound);
                this.killEnemy(enemy); 
            } else {
                this.hurtCharacter(enemy);
                this.updateStatusbar(this.statusBarEnergy, this.character.energy, world.statusBarEnergy.IMAGES_ENERGY);   
                this.decreaseCoins();  
            } 
        }
    }
 /**
   * returns whether it is a normal chicken or the endboss.
   */
    enemyisNormalChicken(enemy) {
        return enemy.number >= 0;
    }
 /**
   * checks collisions with coin.
   */
    checkCollisionWithCoin(coin) {
        if (this.character.isColliding(coin)) {
            this.coinsCollected += 12.5;
            this.statusBarCoins.setPercentage(this.coinsCollected, this.statusBarCoins.IMAGES_COINS); 
            for (let index = 0; index < this.coins.length; index++) {
                if (coin.number == this.coins[index].number) {
                    this.coins.splice(index, 1);
                }
            }
            playSound(this.CoinsEarnedAudio, 0.1);
            }
    }
 /**
   * checks collisions with bottle on the ground.
   */
    checkCollisionWithBottle(bottle) {
        if (this.character.isColliding(bottle)) {
            for (let index = 0; index < this.bottles.length; index++) {
                if (bottle.number == this.bottles[index].number) {
                    this.bottles.splice(index, 1);
            }
            playSound(this.takeBottleAudio, 0.4);
            this.increaseAwailableBottles();
            this.updateStatusbar(this.statusBarBottles, this.bottlesLeft, this.statusBarBottles.IMAGES_BOTTLES);
            };
            }
        }
 /**
   * kills enemy, plays dying/is-death-animation and stops speed.
   */
    async killEnemy(enemy, ThrowableObject) {
        await this.checkIfEndbossWasKilled(enemy);
            enemy.speed = 0;
            enemy.y = 480 - enemy.height;
            enemy.isAlive = false;
        setInterval(() => {
            if (ThrowableObject) {
                ThrowableObject.playAnimation(ThrowableObject.IMAGES_SPLASHING);
            }
            enemy.playAnimation(enemy.IMAGES_DEAD); 
        }, 10);
        if (enemy.number > 7 && enemy.number < 15) {
            playSound(this.BabyChickenDeadAudio, 0.05);
        } else {
            playSound(this.EndbossDeadAudio, 0.2);
        } 
    }
 /**
   * Ths function clears the animation of the dead enemy.
   * If the killed enemy is the endboss, this function plays a dying animation.
   */
    checkIfEndbossWasKilled(enemy) {
        if (enemy.number < 0) {
            clearInterval(enemy.animation);
            this.playDyingAnimation(enemy);
        } else {
            clearInterval(enemy.walkingAnimation);
        }
        return Promise.resolve();         
    }
 /**
   * This functions plays the dying animation of the endboss and shows the game over screen.
   */
    playDyingAnimation(enemy) {
        return new Promise ((resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                this.currentImage = 0;
                enemy.playAnimation(enemy.IMAGES_DYING);
                i++;
                if(i >= enemy.IMAGES_DYING.length) {
                    clearInterval(interval);
                    enemy.currentImage = 0;
                    resolve();
                }
            }, 1000 / 60);
            this.showGameOverImage();
            this.leaveGame('won', this.coinsCollected);
        });          
    }
 /**
   * This function makes character being hurt by playing the hurt animation, removing energy and playing the hurt sound. It also saves the last time hurt into the variable currentTime.
   */
    hurtCharacter(enemy) {
        this.character.playAnimation(this.character.IMAGES_HURT);
        let currentTime = new Date().getTime();
        this.character.hit();
        if (this.currentEnemey != enemy.number || (currentTime - this.character.lastHit) > 2000) {
            this.currentEnemey = enemy.number;
        if (!this.character.isDead()) {
            playSound(this.HurtAudio, 1);
        } }
    }
 /**
   * This function decreases the coins available and updates the statusbar accordingly.
   */
    decreaseCoins() {
        if (this.coinsCollected >= 12.5){
            this.coinsCollected += -12.5;
            this.updateStatusbar(this.statusBarCoins, this.coinsCollected, world.statusBarCoins.IMAGES_COINS);
        }
    }

 /**
   * If D is pressed, this function lets Pepe throw a bottle, makes him be frightened if he was sleeping, saves time of Pepes last action and updates the number of bottles available.
   * If there are no bottles left to kill the endboss, the game will end.
   */
    checkThrowableObjects() {
        if (this.keyboard.D) {
            if (this.pepeisSleeping()) {
                this.character.playAnimation(this.character.IMAGES_FRIGHTENED);
            }
            this.registerTime();
            this.keyboard.D = false;
            if (this.enoughBottlesLeft()) {
                this.updateBottles();
            } else if (this.level.bottles.length < 3) {
                this.clearAllIntervals();
                this.showGameOverImage();
                this.leaveGame('lost', 1);
            }
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
            this.addBottleToCanvas();
            this.updateStatusbar(this.statusBarBottles, this.bottlesLeft, this.statusBarBottles.IMAGES_BOTTLES);
            playSound(this.throwingBottleAudio, 1);  
    }
 /**
   * Shows game over screen.
   */
    showGameOverImage() {
        document.getElementById('explanation_board').classList.remove('d_none'); 
        document.getElementById('explanation_board').innerHTML = `<img class="game_over_img" src="img/You won, you lost/Game over A.png" alt="You Won">`;
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
    enoughBottlesLeft(){
        return this.bottlesLeft >=3;
    }

    decreaseAwailableBottles() {
        this.bottlesLeft += -3;
        this.bottleNumber += 1;
    }

    increaseAwailableBottles() {
        this.bottlesLeft += 3;
    }

    addBottleToCanvas() {
        let bottle;
            if (!this.character.otherDirection) {
                bottle = new ThrowableObject(this.character.x + 70, this.character.y + 70, this.character.otherDirection, this.bottleNumber);
            } else {
                bottle = new ThrowableObject(this.character.x - 20, this.character.y + 70, this.character.otherDirection, this.bottleNumber);  
            }
            this.throwableObjects.push(bottle);
    }

    updateStatusbar(bar, assets, images) {
        bar.setPercentage(assets, images);
    }


    collisionWithBottle() {
        this.throwableObjects.forEach((ThrowableObject) => {
            this.level.enemies.forEach((enemy) => {
                this.checkCollisionWithEnemy(enemy, ThrowableObject);
            });
        });
        
    }

    checkCollisionWithEnemy(enemy, ThrowableObject) {
        if (ThrowableObject.isColliding(enemy) && enemy.isAlive) {
            this.checkIfEndbossWasHit(enemy);
                    if (enemy.number >= 0 || this.endbossWasHit > 33 && this.endbossWasHit < 50) {
                        this.killEnemy(enemy, ThrowableObject);
                        playSound(this.BreakingBottleAudio, 0.1);
                    }
                }
    }


    async checkIfEndbossWasHit(enemy) {
        if (enemy.number < 0 && this.endbossWasHit < 33) {
            this.endbossWasHit += 0.2; 
            await enemy.hit();            
        }
    }

    checkDistanceToEndboss() {
        if(this.enemies[this.enemies.length - 1].x - this.character.x <= 480 && this.enemies[this.enemies.length - 1].x - this.character.x > 250 && this.closeToEndboss == false) {
            this.letEndbossBeAlert();
        }
        if (this.enemies[this.enemies.length - 1].x - this.character.x <= 250 && this.veryCloseToEndboss == false) {
            this.letEndbossAttack();
        }
    }

    letEndbossBeAlert() {
        this.closeToEndboss = true;
        this.enemies[this.enemies.length - 1].speed = 0;
        this.enemies[this.enemies.length - 1].emotionalStage = 'alert';
        this.enemies[this.enemies.length - 1].animateEmotionalStage();
        this.enemies[this.enemies.length - 1].animation;
    }

    letEndbossAttack() {
        this.veryCloseToEndboss = true;
        this.enemies[this.enemies.length - 1].emotionalStage = 'attack';
        this.enemies[this.enemies.length - 1].animateEmotionalStage();
        this.enemies[this.enemies.length - 1].animation;
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addBasicsToCanvas();
        this.addStatusbarsToCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        this.gameLoopId = requestAnimationFrame(function() {
            self.draw();
        });
    }

    addBasicsToCanvas()  {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins); 
        this.addObjectsToMap(this.level.bottles); 
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);
    }

    addStatusbarsToCanvas() {
        this.addToMap(this.statusBarEnergy);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
    }


    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        })
    }

    addToMap(mo) {
       
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }
    
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1; 
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    showGameOverScreen(result, index) {
        let EnemiesKilled = this.countEnemiesKilled();
        if (result == "won") {
            youWon = true;
        }
        gameOver(index, EnemiesKilled); 
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    countEnemiesKilled() {
        let counter = 0;
        for (let index = 0; index < this.enemies.length; index++) {
            if (!this.enemies[index].isAlive) {
                counter++;
            } 
        }
        return counter;
    }

    registerTime() {
        this.lastAction = new Date().getTime();
        this.isPepeSleeping();
    }

    isPepeSleeping() {
        if ((new Date().getTime() - this.lastAction) > 15000) {
            this.character.isSnoozing = false;
            this.character.isSleeping = true;
        playSound(this.snoringSound, 0.2);
        } else if ((new Date().getTime() - this.lastAction) > 1000) {
            this.character.isSnoozing = true;
            stopSound(this.snoringSound);
        } else {
            this.character.isSnoozing = false;
            this.character.isSleeping = false;
            stopSound(this.snoringSound);
        }
    }

    pepeisSleeping() {
        if ((new Date().getTime() - this.lastAction) > 15000) {
            return true;
        } else {
            return false;
        }
    }
}
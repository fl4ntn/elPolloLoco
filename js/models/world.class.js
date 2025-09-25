class World{
  

    gameLoopId;
    music = new Audio('audio/flamenco-loop-1-382455.mp3');
    CoinsEarnedAudio = new Audio('audio/Earned_Coins.m4a');
    HurtAudio = new Audio('audio/Ouch.m4a');
    throwingBottleAudio = new Audio('audio/throwingBottle.m4a');
    EndbossDeadAudio = new Audio('audio/endboss_dead – Mit Clipchamp erstellt_1755934161346.m4a');
    BreakingBottleAudio = new Audio('audio/GlassIsBreaking.m4a');
    sound;
    endbossWasHit = 0;
    character = new Character(sound);
    bottlesLeft = 100;
    coinsCollected = 0;
    currentEnemey;
    // hurtAudioPlayed = false;
    // level = level1;
    bottleNumber = 0;
    // enemies = level1.enemies;
    // clouds = level1.clouds;
    // backgroundObjects = level1.backgroundObjects;
    // coins = level1.coins;
    level;
    enemies;
    clouds;
    backgroundObjects;
    coins;
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
    

    constructor(canvas, keyboard, sound){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.sound = sound;
        this.checkLevel();
        // this.enemies[2].speed = this.enemies[2].walkingSpeed;
        this.objectsStartMoving();
        this.draw();
        this.setWorld();
        this.run();

    }

    checkLevel() {
        if (currentLevel == 1) {
            this.level = level1;
            this.enemies = level1.enemies;
            this.clouds = level1.clouds;
            this.backgroundObjects = level1.backgroundObjects;
            this.coins = level1.coins;
        } else {
            this.level = level2;
            this.enemies = level2.enemies;
            this.clouds = level2.clouds;
            this.backgroundObjects = level2.backgroundObjects;
            this.coins = level2.coins; 
        }
    }

    objectsStartMoving() {
        this.enemies.forEach((enemy) => {
           enemy.speed = enemy.walkingSpeed;
        });
        this.clouds.forEach((cloud) => {
           cloud.speed = 0.02;
        });
        
    }
  
    
    setWorld(){
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
            this.collisionWithBottle();
            this.checkDistanceToEndboss()
        }, 1000/60 );
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.checkCollisionWithCharacter(enemy);
        });
        this.level.coins.forEach((coin) => {
            this.checkCollisionWithCoin(coin);
        });
        
    }

    checkCollisionWithCharacter(enemy) {
        if(this.character.isColliding(enemy) && enemy.isAlive) {
            if (this.character.isAboveGround()) {
                this.character.jump(this.sound);
                this.killEnemy(enemy); 
            } else {

                this.hurtCharacter(enemy);
                this.updateStatusbar(this.statusBarEnergy, this.character.energy, world.statusBarEnergy.IMAGES_ENERGY);   
                this.decreaseCoins();  
            } 
        }
    }

    checkCollisionWithCoin(coin) {
        if (this.character.isColliding(coin)) {
            this.coinsCollected += 12.5;
            this.statusBarCoins.setPercentage(this.coinsCollected, this.statusBarCoins.IMAGES_COINS); 
            for (let index = 0; index < this.coins.length; index++) {
                if (coin.number == this.coins[index].number) {
                    this.coins.splice(index, 1);
                }
            }
            this.playSound(this.CoinsEarnedAudio, 0.1);
            }
    }

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
        this.playSound(this.EndbossDeadAudio, 0.2);
    }

    checkIfEndbossWasKilled(enemy) {
        if (enemy.number < 0) {
            return new Promise ((resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                enemy.playAnimation(enemy.IMAGES_DYING);
                i++;
                if(i >= enemy.IMAGES_DYING.length) {
                    clearInterval(interval);
                    enemy.currentImage = 0;
                    resolve();
                }
            }, 120);
            });
        } else {
            clearInterval(enemy.walkingAnimation);
        }
        return Promise.resolve();         
    }

    hurtCharacter(enemy) {
        this.character.playAnimation(this.character.IMAGES_HURT);
        let currentTime = new Date().getTime();
        this.character.hit();
        if (this.currentEnemey != enemy.number || (currentTime - this.character.lastHit) > 2000) {
            this.currentEnemey = enemy.number;
        if (!this.character.isDead()) {
            this.playSound(this.HurtAudio, 1);
            // this.hurtAudioPlayed = true; 
        } }
    }

    decreaseCoins() {
        if (this.coinsCollected >= 12.5){
            this.coinsCollected += -12.5;
            this.updateStatusbar(this.statusBarCoins, this.coinsCollected, world.statusBarCoins.IMAGES_COINS);
        }

    }


    checkThrowableObjects() {
        if (this.keyboard.D) {
            this.keyboard.D = false;
            if (this.enoughBottlesLeft()) {
                this.decreaseAwailableBottles();
                this.addBottleToCanvas();
                this.updateStatusbar(this.statusBarBottles, this.bottlesLeft, this.statusBarEnergy.IMAGES_BOTTLES);
                this.playSound(this.throwingBottleAudio, 1);  
            }
        }
    }

    enoughBottlesLeft(){
        return this.bottlesLeft >=3;
    }

    decreaseAwailableBottles() {
        this.bottlesLeft += -3;
        this.bottleNumber += 1;
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

    playSound(type, volume) {
        if (sound.activated) {
            type.play();  
            type.volume = volume;
        } else {
            type.pause();  
        }
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
                    if (enemy.number || this.endbossWasHit > 14 && this.endbossWasHit < 16) {
                        this.killEnemy(enemy, ThrowableObject);
                        this.playSound(this.BreakingBottleAudio, 0.1);
                    }
                }
    }


    async checkIfEndbossWasHit(enemy) {
        if (!enemy.number) {
            this.endbossWasHit += 1; 
            await enemy.hit();            
        }
    }

    checkDistanceToEndboss() {
        if(this.enemies[3].x - this.character.x <= 480 && this.enemies[3].x - this.character.x > 250 && this.closeToEndboss == false) {
            this.closeToEndboss = true;
            this.enemies[3].speed = 0;
            this.enemies[3].emotionalStage = 'alert';
            this.enemies[3].animateEmotionalStage();
            this.enemies[3].animation;
        }
        if (this.enemies[3].x - this.character.x <= 250 && this.veryCloseToEndboss == false) {
            this.veryCloseToEndboss = true;
            this.enemies[3].emotionalStage = 'attack';
            this.enemies[3].animateEmotionalStage();
            this.enemies[3].animation;
        }
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
        mo.drawFrame(this.ctx);
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

    resetWorld() {

    // level = level1;
    
        //  for (let i = 1; i < 9999; i++) { window.clearInterval(i);}
        //  world = null;
        // //  init();
        // this.enemies = [];
        // this.coins = [];
        // cancelAnimationFrame(this.animationFrame);
        // this.character = new Character(this.sound);
        // this.setWorld();
        // this.camera_x = 0;
        // this.draw();
        // this.run();
        // clearInterval(world.gameLoop);
        // document.getElementById('canvas').innerHTML = "";
        // world.enemies = [];
        // world.coins = [];
        // world.level = level1;
        // #
        // init();
        // document.getElementById('explanation_board').classList.remove('d_none');
        // this.bottlesLeft = 100;
        // this.coinsCollected = 0;
        // this.bottleNumber = 0;
        // this.statusBarEnergy = new StatusBar("energy", 10);
        // backgroundObjects = level1.backgroundObjects;
    // currentEnemey;
   
    // enemies = level1.enemies;
    // clouds = level1.clouds;
    
    // coins = level1.coins;
   
    // statusBarCoins = new StatusBar("coins", 55);
    // statusBarBottles = new StatusBar("bottles", 100);
    // throwableObjects = [];
    // canvas;
    // closeToEndboss = false;
    // veryCloseToEndboss = false;
    }


}
class World{
  

    music = new Audio('audio/flamenco-loop-1-382455.mp3');
    CoinsEarnedAudio = new Audio('audio/Earned_Coins.m4a');
    HurtAudio = new Audio('audio/Ouch.m4a');
    EndbossDeadAudio = new Audio('audio/endboss_dead – Mit Clipchamp erstellt_1755934161346.m4a');
    BreakingBottleAudio = new Audio('audio/GlassIsBreaking.m4a');
    sound;
    endbossWasHit = 0;
    character = new Character(sound);
    bottlesLeft = 100;
    coinsCollected = 0;
    currentEnemey;
    hurtAudioPlayed = false;
    level = level1;
    bottleNumber = 0;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    coins = level1.coins;
    statusBarEnergy = new StatusBar("energy", 10);
    statusBarCoins = new StatusBar("coins", 55);
    statusBarBottles = new StatusBar("bottles", 100);
    throwableObjects = [];
    audioImg = new SoundImage('audio/speaker-31227_1280.png');
    noAudioImg = new SoundImage('audio/mute-1628277_1280.png');
    canvas;
    ctx;
    
    keyboard;
    camera_x = 0;
    

    constructor(canvas, keyboard, sound){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.sound = sound;
        this.draw();
        this.setWorld();
        this.run();
    }
  
    
    setWorld(){
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
            this.collisionWithBottle()
            
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.playAnimation(this.character.IMAGES_HURT);
                let currentTime = new Date().getTime();
                this.character.hit();
                if (this.currentEnemey != enemy.number || (currentTime - this.character.lastHit) > 2000) {
                    this.currentEnemey = enemy.number;
                    if (!this.character.isDead()) {
                      if (sound.activated) {
                        this.HurtAudio.loop = false,
                        this.HurtAudio.play();
                        this.hurtAudioPlayed = true;
                        } else {
                        this.HurtAudio.pause();
                        }   
                    }
                }
                this.statusBarEnergy.setPercentage(this.character.energy, world.statusBarEnergy.IMAGES_ENERGY);
                
                if (this.coinsCollected >= 12.5){
                    this.coinsCollected += -12.5;
                    this.statusBarCoins.setPercentage(this.coinsCollected, world.statusBarCoins.IMAGES_COINS);
                }
                
                // this.throwableObjects.forEach((throwableObject) => {
                // if (enemy.isColliding(throwableObject)) {
                //     console.log('collided');
            //     }
            // });
            }
        });
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinsCollected += 12.5;
                this.statusBarCoins.setPercentage(this.coinsCollected, world.statusBarCoins.IMAGES_COINS); 
                for (let index = 0; index < this.coins.length; index++) {
                    if (coin.number == this.coins[index].number) {
                      this.coins.splice(index, 1);
                    }
                }
                if (sound.activated) {
                    this.CoinsEarnedAudio.play();
                    this.CoinsEarnedAudio.volume = 0.1; 
                } else {
                    this.CoinsEarnedAudio.pause();
                }
            }
        });
        
    }

    checkThrowableObjects() {
        if (this.keyboard.D) {
            if (this.bottlesLeft >=3) {
              this.bottlesLeft += -3;
                this.bottleNumber += 1;
                let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 70, this.character.otherDirection, this.bottleNumber);
                this.throwableObjects.push(bottle);
                this.statusBarBottles.setPercentage(this.bottlesLeft, world.statusBarEnergy.IMAGES_BOTTLES);  
            }
        }
    }

    collisionWithBottle() {
        this.throwableObjects.forEach((ThrowableObject) => {
            this.level.enemies.forEach((enemy) => {
                if (ThrowableObject.isColliding(enemy)) {
                    
                    console.log(enemy);
                    if (!enemy.number) {
                        this.endbossWasHit += 1; 
                    }
                    console.log(this.endbossWasHit);
                    if (enemy.number || this.endbossWasHit > 14 && this.endbossWasHit < 16) {
                        enemy.isAlive = false;
                        clearInterval(enemy.walkingAnimation)
                        setInterval(() => {
                            ThrowableObject.playAnimation(ThrowableObject.IMAGES_SPLASHING);
                            enemy.playAnimation(enemy.IMAGES_DEAD);
                            enemy.speed = 0;
                            enemy.y = 480 - enemy.height;
                   
                        }, 10);
                    
                    
                    if (sound.activated) {
                        this.EndbossDeadAudio.loop = false;
                        this.EndbossDeadAudio.play(); 
                        this.BreakingBottleAudio.play();
                        this.EndbossDeadAudio.volume = 0.2;
                        this.BreakingBottleAudio.volume = 0.1;
            
                         
                    } else {
                        this.EndbossDeadAudio.pause();
                        this.BreakingBottleAudio.pause();
                    }   
                    }
                 
                }
               
            });
        });

        
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins); 
        this.addObjectsToMap(this.level.enemies);
        
        this.ctx.translate(-this.camera_x, 0);




        this.addToMap(this.statusBarEnergy);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
       
        
        if (sound.activated) {
           this.addToMap(this.audioImg);
           this.music.play(); 
           this.music.volume = 0.1;
        } else {
            this.addToMap(this.noAudioImg); 
            this.music.pause();
        }
        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
        
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


}
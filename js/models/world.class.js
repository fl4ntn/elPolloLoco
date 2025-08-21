class World{
  

    music = new Audio('audio/flamenco-loop-1-382455.mp3');
    CoinsEarnedAudio = new Audio('audio/Earned_Coins.m4a');
    HurtAudio = new Audio('audio/Ouch.m4a');
    sound;
    character = new Character(sound);
    bottlesLeft = 100;
    coinsCollected = 0;
    currentEnemey;

    level = level1;

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
            
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.playAnimation(this.character.IMAGES_HURT);
                this.character.hit();
                
                if (this.currentEnemey != enemy.number) {
                    this.currentEnemey = enemy.number;
                    console.log(this.currentEnemey);
                    if (sound.sound) {
                        this.HurtAudio.play();
                    } else {
                        this.HurtAudio.pause();
                    }
                } 
                // else if ((new Date().getTime() - this.character.lastHit) > 4000) {
                //     if (sound.sound) {
                //         this.HurtAudio.loop = false,
                //         this.HurtAudio.play();
                //     } else {
                //         this.HurtAudio.pause();
                //     } 
                // }
                // console.log('hit with enemy number', enemy.number)
                this.statusBarEnergy.setPercentage(this.character.energy, world.statusBarEnergy.IMAGES_ENERGY);
                
                if (this.coinsCollected >= 12.5){
                    this.coinsCollected += -12.5;
                    this.statusBarCoins.setPercentage(this.coinsCollected, world.statusBarCoins.IMAGES_COINS);
                }
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
                if (sound.sound) {
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
                let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 70, this.character.otherDirection);
                this.throwableObjects.push(bottle);
                this.statusBarBottles.setPercentage(this.bottlesLeft, world.statusBarEnergy.IMAGES_BOTTLES)  
            }
            
        }
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
       
        
        if (sound.sound) {
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
class Character extends MovableObject {
    x = 90;
    y = 80;
    speed = 10;

     offset = {
        top: 85,
        left: 20,
        right: 40,
        bottom: 90

    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    world;

    currentImage = 0;

   constructor() {
    super().loadImg('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
    this.width = 120;
    this.height = 220;
   
   }

   animate() {

    setInterval(() => {
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) { 
            this.moveRight();
            this.otherDirection = false;
        }
        if(this.world.keyboard.LEFT && this.x > 0) { 
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround() || this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {

        if(this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { 
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }, 50);

   
   }

  


}
class Character extends MovableObject {
    x = 90;
    y = 220;
    speed = 10;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    world;

    currentImage = 0;

   constructor() {
    super().loadImg('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
    this.width = 120;
    this.height = 220;
   
   }

   animate() {

    setInterval(() => {
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) { 
        this.x += this.speed;
        this.otherDirection = false;
        }
        if(this.world.keyboard.LEFT && this.x > 0) { 
        this.x -= this.speed;
        this.otherDirection = true;
        }
        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
        if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { 
            this.playAnimation(this.IMAGES_WALKING);
        }
    }, 50);

   
   }

    jump(){

    }


}
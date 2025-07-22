class Character extends MovableObject {
    x = 90;
    y = 220;

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
        if(this.world.keyboard.RIGHT) { 
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++; 
        }
    }, 270);

   
   }

    jump(){

    }


}
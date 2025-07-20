class Chicken extends MovableObject {
    speed = Math.random();

       IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    currentImage = 0;

    constructor(){
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500;
        this.width = (Math.random() * 40) + 50;
        this.height = this.width * 1.2;
        this.y = 440 - this.height;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);

         setInterval(() => {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;   
    }, 270);
    }

} 
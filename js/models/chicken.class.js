class Chicken extends MovableObject {
 offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    walkingSpeed;
    speed = 0;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    isAlive = true;

    currentImage = 0;
    number;
    walkingAnimation = setInterval(() => {
                            this.playAnimation(this.IMAGES_WALKING);  
                        }, 270);

    constructor(number){
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 600 + Math.random() * 1000;
        this.width = (Math.random() * 40) + 50;
        this.height = this.width * 1.2;
        this.y = 440 - this.height;
        this.walkingSpeed = 0.15 + Math.random() * 0.5;
        this.number = number;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        if (this.isAlive) {
            this.animate();
        }
    }

    animate() {
        setInterval( () => {
            this.moveLeft();
         }, 1000 / 60);
        this.walkingAnimation;
    }
} 
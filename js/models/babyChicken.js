class BabyChicken extends MovableObject {
 offset = {
        top: -20,
        left: -20,
        right: -20,
        bottom: -20
    };
    walkingSpeed;
    speed = 0;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    isAlive = true;

    currentImage = 0;
    number;
    walkingAnimation = setInterval(() => {
                            this.playAnimation(this.IMAGES_WALKING);  
                        }, 270);

    constructor(number){
        super().loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.x = 500 + Math.random() * 1500;
        this.width = (Math.random() * 20) + 20;
        this.height = this.width * 1.2;
        this.y = 430 - this.height;
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
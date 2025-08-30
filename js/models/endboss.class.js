class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -20;
     isAlive = true;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    walkingAnimation = setInterval(() => {
                            this.playAnimation(this.IMAGES_WALKING);  
                        }, 200);
    currentImage = 0;
    constructor() {
        super().loadImg(this.IMAGES_WALKING[0]);
        this.x = 2450;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        if (this.isAlive) {
            this.animate();
        }
        

    }

    animate() {
       this.walkingAnimation
    }

}
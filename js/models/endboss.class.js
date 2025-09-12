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

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DYING = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];



    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

 hurtAnimation = setInterval(() => {
                            this.playAnimation(this.IMAGES_HURT);  
                        }, 200);

    walkingAnimation = setInterval(() => {
                            this.playAnimation(this.IMAGES_WALKING);  
                        }, 200);
   
    currentImage = 0;
    constructor() {
        super().loadImg(this.IMAGES_WALKING[0]);
        this.x = 2450;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_DEAD);
        if (this.isAlive) {
            this.animate();
        }
        

    }

    animate() {
       this.walkingAnimation
    }

    hit() {
        this.hurtAnimation
    }

}
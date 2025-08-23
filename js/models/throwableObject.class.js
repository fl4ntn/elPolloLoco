class ThrowableObject extends MovableObject {
    offset = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    };
    currentImage = 0;
    IMAGES_SPLASHING = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    bottleNumber

    constructor(x, y, direction, bottleNumber){
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPLASHING);
        this.loadImages(this.IMAGES_ROTATING);
        this.x = x;
        this.y = y;
        this.bottleNumber = bottleNumber;
        this.otherDirection = direction;
        this.width = 50;
        this.height = 60;
        
        this.animate(this.IMAGES_ROTATING);
        this.throw();
        

    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
    if (!this.otherDirection) {
        setInterval(() => {   
            this.x += 10;
        }, 25);
    } else {
        setInterval(() => {   
            this.x += -10;
        }, 25);
    }    
    }

     animate(images) {
        setInterval(() => {
        this.playAnimation(images);  
        }, 100);
    }


}
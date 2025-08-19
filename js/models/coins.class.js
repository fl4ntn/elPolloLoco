class Coin extends MovableObject {

    IMAGES_TURNING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    number;

    currentImage = 0;

    constructor(number){
        super().loadImg('img/8_coin/coin_1.png');
        this.number = number;
        console.log(this.number);
        this.x = 200 + Math.random() * 2000;
        this.width = 80;
        this.height = 80;
        this.y = 180 + Math.random() * 180;
        this.loadImages(this.IMAGES_TURNING);
        this.animate();
    }

    animate() {
        setInterval(() => {
        this.playAnimation(this.IMAGES_TURNING);  
    }, 400);
    }

} 
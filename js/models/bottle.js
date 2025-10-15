class Bottle extends MovableObject{
    offset = {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
    };
    number;

    constructor(number, image){
        super().loadImg(image);
        this.number = number;
        this.x = 200 + Math.random() * 2000;
        this.width = 80;
        this.height = 80;
        this.y = 380;
    }
} 
class ThrowableObject extends MovableObject {
    offset = {
        top: 50,
        left: 20,
        right: 20,
        bottom: 50
    };
    bottleNumber

    constructor(x, y, direction, bottleNumber){
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.bottleNumber = bottleNumber;
        this.otherDirection = direction;
        this.width = 50;
        this.height = 60;
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


}
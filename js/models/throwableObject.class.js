class ThrowableObject extends MovableObject {
    constructor(x, y){
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.throw();

    }


    

    throw() {
        this.speedY = 30;
        this.applyGravity();
        // if (this.isMoving()) {
        //         console.log('is moving');
        //     }
        setInterval(() => {
            
            // this.x += 10;
            // this.character.x += 10;
            // this.moveRight();  this.x += this.character.speed;
            // console.log(world.character.speed)
             this.x += 10;
            //  this.x += 10;
            // this.x -= 10 + world.character.speed;
            // if (condition) {
                
            // } else {
                
            // }

            // if (this.otherDirection = true) {
            //     console.log('other dircectio is true');
            // }
            // if (this.otherDirection = false) {
            //     console.log('other dircectio is false');
            // }
        }, 25);
    }


}
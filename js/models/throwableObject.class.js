class ThrowableObject extends MovableObject {

    audio = new Audio('audio/flamenco-loop-1-382455.mp3');
  
    constructor(x, y, direction){
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.otherDirection = direction;
        this.width = 50;
        this.height = 60;
        this.throw();
        

    }


    

    throw() {
        this.speedY = 30;
        this.applyGravity();
        // this.audio.play();
        // if (this.isMoving()) {
        //         console.log('is moving');
        //     } 
        // if (this.otherDirection == true) {
        //         console.log('other dircectio is true');
        //     }
        //     if (this.otherDirection == false) {
        //         console.log('other dircectio is false');
        //     }

            //  if (this.otherDirection == true) {
            //     console.log('other dircectio is true');
            // } else {
            //     console.log('other dircectio is false');
            // }

            
            if (!this.otherDirection) {
                console.log('other dircectio is true');
            } else {
                console.log('other dircectio is false');
            }
       
        setInterval(() => {

            if (!this.otherDirection) {
                this.x += 10;
            } else {
                this.x += -10;
            }
            
            // this.x += 10;
            // this.character.x += 10;
            // this.moveRight();  this.x += this.character.speed;
            // console.log(world.character.speed)
            //  this.x += 10;
            //  this.x += 10;
            // this.x -= 10 + world.character.speed;
            // if (condition) {
                
            // } else {
                
            // }

           
        }, 25);
    }


}
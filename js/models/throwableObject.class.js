class ThrowableObject extends MovableObject {

    // IMAGES_THROWING_BOTTLES = [
    //     'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    //     'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    //     'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    //     'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    // ];


    constructor(){
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        // this.loadImages(this.IMAGES_THROWING_BOTTLES);
        this.x = 100;
        this.y = 100;
        this.width = 120;
        this.height = 220;
        this.throw();
    }


    speedX = 20;
    speedY = 30;

    throw() {

    setInterval(() => {
        if(world.keyboard.D) { 
           console.log('D')
            
        }
    }, 1000 / 60);

   



    }


}
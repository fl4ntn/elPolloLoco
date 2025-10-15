class Bottle extends MovableObject{
    offset = {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
    };
    number;


     /**
   * Represents a bottle
   * @constructor
   * @param {string} image - The path of the image of the bottle.
   * * @param {number} number - The number of the bottle.
   */
    constructor(number, image){
        super().loadImg(image);
        this.number = number;
        this.x = 200 + Math.random() * 2000;
        this.width = 80;
        this.height = 80;
        this.y = 380;
    }
} 
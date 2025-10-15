class BackgroundObject extends MovableObject {
    height = 480;
    width = 720;

     /**
   * Represents a background object.
   * @constructor
   * @param {string} imagePath - The path of the image of the object.
   * * @param {number} x - The x-coordinate of the object.
   * * @param {number} y - The y-coordinate of the object.
   */
    constructor(imagePath, x, y){
        super().loadImg(imagePath);
        this.x = x;
        this.y = y;
    }
}
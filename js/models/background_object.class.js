class BackgroundObject extends MovableObject {
    height = 480;
    width = 720;
    constructor(imagePath, x, y){
        super().loadImg(imagePath);
        this.x = x;
        this.y = y;
    }
}
class SoundImage extends DrawableObject{
    x = 660;
    y = 20;


    constructor(path){
        super().loadImg(path);
        this.width = 36;
        this.height = 36;
    }


}
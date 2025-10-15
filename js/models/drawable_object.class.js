class DrawableObject{
    img;
    imageCache = {};
     offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

   loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
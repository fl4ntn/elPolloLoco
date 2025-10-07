class DrawableObject{
    img;
    imageCache = {};
     offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
      // x = 120;
    // y = 290;
    // height = 150;
    // width = 100;

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
    //  drawFrame(ctx){
    //     ctx.beginPath();
    //     ctx.lineWidth = '5';
    //     ctx.strokeStyle = 'red';
    //     ctx.rect(this.x + this.offset.left, this.y + this.offset.top,(this.x + this.width - this.offset.right) - (this.x + this.offset.left),(this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));
    //     ctx.stroke();        
    // }

}
class MovableObject {
    // x = 120;
    // y = 290;
    img;
    // height = 150;
    // width = 100;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
            
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 200;
    }

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    drawCtx(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++; 
    }

    moveRight() {
         this.x += this.speed;
        
    }

    moveLeft() {
        this.x -= this.speed;
        
    }

      jump(){
        this.speedY = 30;
    }


    
}
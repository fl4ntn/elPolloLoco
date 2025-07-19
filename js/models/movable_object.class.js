class MovableObject {
    // x = 120;
    // y = 290;
    img;
    // height = 150;
    // width = 100;
    imageCache = {};

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.scr = path;
            this.imageCache[path] = img;
        });
        
    }

    moveRight() {
        console.log('Moving right');
    }


    moveLeft(){

    }
}
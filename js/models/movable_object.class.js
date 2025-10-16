class MovableObject extends DrawableObject {
    jumpingSound = new Audio('audio/jumping_sound.m4a');
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
/**
   * Makes the object fall back to the ground when being in the air.
   */
    applyGravity() {
        setInterval(() => {
            if (this.reachedVertexPoint() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if(this.speedY < 0) {
                  this.isFalling = true;  
                } else {
                    this.isFalling = false;
                }
            }
        }, 1000 / 25);
    }
/**
   * Returns true if object reaches the highest point or if it is a bottle.
   */
    reachedVertexPoint() {
         if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 200;
        }
    }
/**
   * Returns true if the element is above the y-coordiante of 200.
   */
    isAboveGround() {
            return this.y < 200;
    }
   /**
   * returns whether the movable object is colliding with the other object.
   * @param {MovableObject} mo - The movable object.
   */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }
/**
   * decreases energy, or sets it 0 if too little is left. If enough is left, it saves the time character was hit.
   */
    hit() {
        this.energy -= 0.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
/**
   * returns whether the character has been hit in the past second.
   */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
/**
   * returns whether the character is dead or not.
   */
    isDead() {
        return this.energy == 0;
    }
/**
   * plays animation of the iages by saving the images into the variable currentImage.
   * @param {array} images - array of the images.
   */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++; 
    }
/**
   * increases the x-coordinate to make object move right.
   */
    moveRight() {
         this.x += this.speed;
    }
/**
   * decreases the x-coordinate to make object move left.
   */
    moveLeft() {
        this.x -= this.speed;
    }
/**
   * makes object jump by setting speedY to 30 and plays jumping sound id sound is on.
   * @param {boolean} sound - infomrs whether sound is on or not.
   */
    jump(sound) {
        this.speedY = 30;
        if (sound.activated) {
            this.jumpingSound.play(); 
        }
    }
   

}
class DrawableObject {
  img;
  imageCache = {};
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };


  /**
   * loads image.
   * @param {string} path - The image path.
   */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }


  /**
   * loads images from an array.
   * @param {array} arr - The array containing the images paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  
  /**
   * Draws the current object onto the given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas where the image will be drawn.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}


class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0;

    constructor(position){
        super().loadImg('img/5_background/layers/4_clouds/1.png');
        this.x = position + (Math.random() * 500);
        this.animate();
    }


    /**
   * Animates the cloud, so that it flies.
   */
    animate() {
        setInterval( () => {
          this.moveLeft();  
        })  
    }

}
class Chicken extends MovableObject {
    speed = Math.random();

    constructor(){
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500;
        this.width = (Math.random() * 40) + 50;
        this.height = this.width * 1.2;
        this.y = 440 - this.height;

        this.animate();
    }

    animate() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

}
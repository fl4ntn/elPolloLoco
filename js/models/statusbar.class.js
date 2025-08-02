class Statusbar extends DrawableObject{
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    percentage = 100;

    constructor() {
        this.loadImages(this.IMAGES);
        this.setPercentage(percentage);
        
        

    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        
    }

   resolveImageIndex() {
        if (percentage == 100) {
            return 5;
        } else if (percentage < 100 && percentage <= 80) {
            return 4;
        } else if (percentage < 80 && percentage <= 60) {
            return 3;
        } else if (percentage < 60 && percentage <= 40) {
            return 2;
        } else if (percentage < 40 && percentage <= 20) {
            return 1;
        } else {
            return 0;
        }
   }

}
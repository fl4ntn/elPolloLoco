class StatusBar extends DrawableObject{
    IMAGES_ENERGY = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];


    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];





    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_ENERGY);
        this.loadImages(this.IMAGES_COINS);
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 0;
        // this.y = 20;
        this.width = 150;
        this.height = 45;
        this.showStatusBarEnergy();
        this.showStatusBarCoins();
        this.showStatusBarBottles();
        // this.setPercentage(100, this.IMAGES_ENERGY);
        // this.setPercentage(100, this.IMAGES_COINS);
        // this.setPercentage(100, this.IMAGES_BOTTLES);
    }

    showStatusBarEnergy() {
        this.y = 20;
        this.setPercentage(100, this.IMAGES_ENERGY);
    }

    showStatusBarCoins() {
        this.y = 60;
        this.setPercentage(100, this.IMAGES_COINS);
    }

    showStatusBarBottles() {
        this.y = 90;
        this.setPercentage(100, this.IMAGES_BOTTLES);
    }

    setPercentage(percentage, arr) {
        this.percentage = percentage;
        let path = arr[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        
    }

   resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
   }
}
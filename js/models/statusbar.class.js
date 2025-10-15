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

    constructor(barType, y) {
        super();
        this.x = 0;
        this.y = y;
        this.width = 150;
        this.height = 45;
        this.getCorrectBarType(barType);
    }

    getCorrectBarType(barType) {
        if (barType == "energy") {
           this.loadImages(this.IMAGES_ENERGY);
           this.setPercentage(100, this.IMAGES_ENERGY);
        } else if (barType == "coins") {
            this.loadImages(this.IMAGES_COINS);
            this.setPercentage(0, this.IMAGES_COINS);
        } else if (barType == "bottles") {
            this.loadImages(this.IMAGES_BOTTLES);
            this.setPercentage(100, this.IMAGES_BOTTLES);
        }
    }

    setPercentage(percentage, arr) {
        this.percentage = percentage;
        let path = arr[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

   resolveImageIndex() {
        if (this.percentage >= 100) {
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
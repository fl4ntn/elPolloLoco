const level1 = new Level([
        new Chicken(0),
        new Chicken(1),
        new Chicken(2),
        new Endboss(3)
    ], [
        new Cloud()
    ], [
        
        new BackgroundObject('img/5_background/layers/air.png', 720 * -1, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * -1, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * -1, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * -1, 0),

        new BackgroundObject('img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 0, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 0, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 0, 0),

        new BackgroundObject('img/5_background/layers/air.png', 720 * 1, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 1, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 1, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 1, 0),
        
        new BackgroundObject('img/5_background/layers/air.png', 720 * 2, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 2, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 2, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2, 0),

        new BackgroundObject('img/5_background/layers/air.png', 720 * 3, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3, 0)
    ], [
        new Coin(0),
        new Coin(1),
        new Coin(2),
        new Coin(3),
        new Coin(4),
        new Coin(5),
        new Coin(6),
        new Coin(7)
    ],
);


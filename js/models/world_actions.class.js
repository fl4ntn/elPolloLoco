class WorldActions{
world;


  /**
   * checks collisions with enemies, coins and bottles.
   */
  checkCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      this.checkCollisionWithCharacter(enemy);
    });
    this.world.level.coins.forEach((coin) => {
      this.checkCollisionWithCoin(coin);
    });
    this.world.level.bottles.forEach((bottle) => {
      this.checkCollisionWithBottle(bottle);
    });
  }


  /**
   * checks collisions with character.
   */
  checkCollisionWithCharacter(enemy) {
    if (this.world.character.isColliding(enemy) && enemy.isAlive) {
      this.world.registerTime();
      if (this.world.character.isFalling && this.world.character.isAboveGround() && this.enemyisNormalChicken(enemy)) {
        this.world.character.jump(this.world.sound);
        this.killEnemy(enemy);
      } else {
        this.hurtCharacter(enemy);
        this.world.updateStatusbar(this.world.statusBarEnergy, this.world.character.energy, world.statusBarEnergy.IMAGES_ENERGY);
        this.world.decreaseCoins();
      }
    }
  }


  /**
   * returns whether it is a normal chicken or the endboss.
   */
  enemyisNormalChicken(enemy) {
    return enemy.number >= 0;
  }


  /**
   * checks collisions with coin.
   */
  checkCollisionWithCoin(coin) {
    if (this.world.character.isColliding(coin)) {
      this.world.coinsCollected += 12.5;
      this.world.statusBarCoins.setPercentage(
        this.world.coinsCollected,
        this.world.statusBarCoins.IMAGES_COINS
      );
      for (let index = 0; index < this.world.coins.length; index++) {
        if (coin.number == this.world.coins[index].number) {
          this.world.coins.splice(index, 1);
        }
      }
      playSound(this.world.CoinsEarnedAudio, 0.1);
    }
  }


  /**
   * checks collisions with bottle on the ground.
   */
  checkCollisionWithBottle(bottle) {
    if (this.world.character.isColliding(bottle)) {
      for (let index = 0; index < this.world.bottles.length; index++) {
        if (bottle.number == this.world.bottles[index].number) {
          this.world.bottles.splice(index, 1);
        }
        playSound(this.world.takeBottleAudio, 0.4);
        this.world.increaseAwailableBottles();
        this.world.updateStatusbar(this.world.statusBarBottles, this.world.bottlesLeft, this.world.statusBarBottles.IMAGES_BOTTLES);
      }
    }
  }


  /**
   * kills enemy, plays dying/is-death-animation and stops speed.
   */
  async killEnemy(enemy, ThrowableObject) {
    await this.checkIfEndbossWasKilled(enemy);
    enemy.speed = 0;
    enemy.y = 480 - enemy.height;
    enemy.isAlive = false;
    setInterval(() => {
    if (ThrowableObject) {ThrowableObject.playAnimation(ThrowableObject.IMAGES_SPLASHING);
      }
      enemy.playAnimation(enemy.IMAGES_DEAD);
    }, 10);
    if (enemy.number > 7 && enemy.number < 15) {
      playSound(this.world.BabyChickenDeadAudio, 0.05);
    } else {
      playSound(this.world.EndbossDeadAudio, 0.2);
    }
  }


  /**
   * Ths function clears the animation of the dead enemy.
   * If the killed enemy is the endboss, this function plays a dying animation.
   */
  checkIfEndbossWasKilled(enemy) {
    if (enemy.number < 0) {
      clearInterval(enemy.animation);
      this.playDyingAnimation(enemy);
    } else {
      clearInterval(enemy.walkingAnimation);
    }
    return Promise.resolve();
  }


  /**
   * This functions plays the dying animation of the endboss and shows the game over screen.
   */
  playDyingAnimation(enemy) {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        this.world.currentImage = 0;
        enemy.playAnimation(enemy.IMAGES_DYING);
        i++;
        if (i >= enemy.IMAGES_DYING.length) {
          clearInterval(interval);
          enemy.currentImage = 0;
          resolve();
        }}, 1000 / 60);
      this.world.showGameOverImage();
      this.world.leaveGame("won", this.coinsCollected);
    });
  }


  /**
   * This function makes character being hurt by playing the hurt animation, removing energy and playing the hurt sound. It also saves the last time hurt into the variable currentTime.
   */
  hurtCharacter(enemy) {
    this.world.character.playAnimation(this.world.character.IMAGES_HURT);
    let currentTime = new Date().getTime();
    this.world.character.hit();
    if (this.world.currentEnemey != enemy.number || currentTime - this.world.character.lastHit > 2000) {
      this.currentEnemey = enemy.number;
      if (!this.world.character.isDead()) {
        playSound(this.world.HurtAudio, 1);
      }
    }
  }


  /**
   * If D is pressed, this function lets Pepe throw a bottle, makes him be frightened if he was sleeping, saves time of Pepes last action and updates the number of bottles available.
   * If there are no bottles left to kill the endboss, the game will end.
   */
  checkThrowableObjects() {
    if (this.world.keyboard.D) {
      if (this.world.pepeisSleeping()) {
        this.world.character.playAnimation(this.character.IMAGES_FRIGHTENED);
      }
      this.world.registerTime();
      this.world.keyboard.D = false;
      if (this.world.enoughBottlesLeft()) {
        this.world.updateBottles();
      } else if (this.world.level.bottles.length < 3) {
        this.world.clearAllIntervals();
        this.world.showGameOverImage();
        this.world.leaveGame("lost", 1);
      }
    }
  }


  /**
   * adds a flying bottle to the canvas.
   */
  addBottleToCanvas() {
    let bottle;
    if (!this.world.character.otherDirection) {
      bottle = new ThrowableObject(this.world.character.x + 70, this.world.character.y + 70, this.world.character.otherDirection, this.world.bottleNumber);
    } else {
      bottle = new ThrowableObject( this.world.character.x - 20, this.world.character.y + 70, this.world.character.otherDirection, this.world.bottleNumber);
    }
    this.world.throwableObjects.push(bottle);
  }


  /**
   * checks for each flying bottle whether it collides with an enemy.
   */
  collisionWithBottle() {
    this.world.throwableObjects.forEach((ThrowableObject) => {
      this.world.level.enemies.forEach((enemy) => {
        this.checkCollisionWithEnemy(enemy, ThrowableObject);
      });
    });
  }


  /**
   * checks whether the flying bottle collides with each of th enemies and if so, kills it.
   * @param {object} enemy - the enemy in question.
   * @param {object} ThrowableObject - The flying bottle in question.
   */
  checkCollisionWithEnemy(enemy, ThrowableObject) {
    if (ThrowableObject.isColliding(enemy) && enemy.isAlive) {
      this.checkIfEndbossWasHit(enemy);
      if (
        enemy.number >= 0 ||
        (this.world.endbossWasHit > 33 && this.world.endbossWasHit < 50)
      ) {
        this.killEnemy(enemy, ThrowableObject);
        playSound(this.world.BreakingBottleAudio, 0.1);
      }
    }
  }


  /**
   * checks whether the the bottle colided with the endboss.
   * @param {object} enemy - the enemy in question.
   */
  async checkIfEndbossWasHit(enemy) {
    if (enemy.number < 0 && this.world.endbossWasHit < 33) {
      this.world.endbossWasHit += 0.2;
      await enemy.hit();
    }
  }


  /**
   * checks the distance of the character to the endboss and animates endboss accordingly.
   */
  checkDistanceToEndboss() {
    if (
      this.world.enemies[this.world.enemies.length - 1].x - this.world.character.x <= 480 &&
      this.world.enemies[this.world.enemies.length - 1].x - this.world.character.x > 250 &&
      this.world.closeToEndboss == false
    ) {
      this.letEndbossBeAlert();
    }
    if (
      this.world.enemies[this.world.enemies.length - 1].x - this.world.character.x <= 250 &&
      this.world.veryCloseToEndboss == false
    ) {
      this.letEndbossAttack();
    }
  }


  /**
   * stops endboss from walking and makes it be alert.
   */
  letEndbossBeAlert() {
    this.world.closeToEndboss = true;
    this.world.enemies[this.world.enemies.length - 1].speed = 0;
    this.world.enemies[this.world.enemies.length - 1].emotionalStage = "alert";
    this.world.enemies[this.world.enemies.length - 1].animateEmotionalStage();
    this.world.enemies[this.world.enemies.length - 1].animation;
  }


  /**
   * lets endboss start attacking.
   */
  letEndbossAttack() {
    this.world.veryCloseToEndboss = true;
    this.world.enemies[this.world.enemies.length - 1].emotionalStage = "attack";
    this.world.enemies[this.world.enemies.length - 1].animateEmotionalStage();
    this.world.enemies[this.world.enemies.length - 1].animation;
  }

}


 







import Star from './star.js'

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds();
    this.speed = 300;
    this.jumpSpeed = -400;
    //this.label = this.scene.add.text(10, 10);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.updateScore();
  }
  point() {
    this.score++;
    this.updateScore();
  }
  
  updateScore() {
    //this.label.text = 'Score: ' + this.score;
  }
  preUpdate() {
    if (this.cursors.up.isDown) {
      this.body.setVelocityY(-this.speed);
    }
    else if (this.cursors.left.isDown) {
      this.body.setVelocityX(-this.speed);
    }
    else if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.speed);

    }
    else if (this.cursors.down.isDown) {
      this.body.setVelocityY(this.speed);

    }
    else {
      this.body.setVelocity(0);

    }
  }
}

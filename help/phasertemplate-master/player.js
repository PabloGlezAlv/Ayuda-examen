export default class player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y,anim) {

    super(scene,x,y,anim);

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    this.body.setAllowGravity(false);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }
  
  preUpdate(t, d)
  {
    let aux1 = false;
    let aux2 = false;
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-70);
      aux1 = true;
    }
    if (this.cursors.right.isDown) {
      this.body.setVelocityX(70);
      aux1 = true;
    }

    if (this.cursors.up.isDown) {
      this.body.setVelocityY(-70);
      aux2 = true;
    }
    if (this.cursors.down.isDown) {
      this.body.setVelocityY(70);
      aux2 = true;
    }
    
    if(!aux1)
    {
      
      this.body.setVelocityX(0);
    }
    if(!aux2)
    {
      this.body.setVelocityY(0);
    }
  }
}
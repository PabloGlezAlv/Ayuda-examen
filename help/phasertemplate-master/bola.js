export default class bola extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y,anim,dir, vida) {

    super(scene,x,y,anim, dir);

    this.lado = dir;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    this.body.setAllowGravity(false);
    this.body.setCircle(800);
    this.setScale(0.02);
    this.body.bounce.set(1);
    this.body.velocity.set(-200*this.lado, 60*this.lado);
  }
  
  preUpdate(t, d)
  {
    
  }
}
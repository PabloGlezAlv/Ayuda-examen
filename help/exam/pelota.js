export default class Pelota extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, player, clon, walls, lifes) {
    super(scene, x, y, 'player');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    //this.scene.physics.add.collider(this, player);              //NO AÑADAS MÁS DE UNA COLISIÓN

    this.body.setVelocity(250,250);                           //VELOCIDAD

    this.body.setBounce(1);                                   //REBOTE(1 NORMALITO)

    if(clon)this.setScale(0.5);                   


    
    this.setTint("0x71CA1E");
    
    this.player = player;


    this.scene.physics.add.collider(this.player, this, () => {      //COLISIONES SI QUIERES QUE HAGA ALGO ASÍ
      this.clonateBola(this.x, this.y);  
    });

    this.walls = walls;     
    
    this.scene.physics.add.collider(this,this.walls);

    this.scene = scene;
    this.vidas = lifes;
  }

  clonateBola(x,y){
    
    //NO SE CARLOS QUE SOY EL PUTO AMO O ALGO DE ESO
    if(this.vidas>0){
      new Pelota(this.scene,x+50,y,this.player,true, this.walls, this.vidas-1);
      new Pelota(this.scene, x, y, this.player, true, this.walls, this.vidas-1);
      this.scene.nPelotas++;
      this.scene.danlles.play();
      this.destroy();
    }
    else{   //NO PONER COMPROBACIONES DESPUÉS DE DESTRUIR ALGO
      this.scene.nPelotas--;
      if(this.scene.nPelotas == 0) this.scene.ganar();


      this.destroy();

    } 
  
  }

}

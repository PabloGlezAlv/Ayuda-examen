import Player from './player.js'
import Platform from './platform.js';
import Pelota from './pelota.js';

export default class Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'scene' });
  }

  updateTime(){
    this.tiempo--;
    this.label.text = 'Score: ' + this.tiempo; 
    if(this.tiempo === 0) this.perder();
  }



  create() {

    this.tiempo = 30;    //ESTO ES EL TIEMPO TOTAL
    this.timer = 1000;             //ESTO ES PARA LLAMARLO CADA SEGUNDO


    this.stars = 10;
    this.bases = this.add.group();
    this.player = new Player(this, 500, 300);
    
    this.walls = this.physics.add.staticGroup();        //ASÍ SE CREA UN GRUPO ESTÁTICO
    
    this.walls.add(new Platform(this, this.player, this.bases, 150, 250,true));
    this.walls.add(new Platform(this, this.player, this.bases, 850, 250,true));
    this.walls.add(new Platform(this, this.player, this.bases, 500, 480));
    this.walls.add(new Platform(this, this.player, this.bases, 500, 50));
    
    
    
    this.pelota = new Pelota(this, 200,200,this.player,false, this.walls, 3);

    this.label = this.add.text(10, 0);
    this.updateTime();

    //Timer de phaser       //ERA LA BROMA
    this.time.addEvent({
      delay: this.timer,                // ms
      callback: () => {
        this.updateTime();
      },
      loop: true
    });


    const config = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    }; // config es opcional
    this.danlles = this.sound.add("hijoDePuta", config);

    this.nPelotas = 1; 

  }

  spawn(from = null) {
    Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
  }

  perder(){
    // this.perdiste = this.add.text(500,300);

    // this.perdiste.text = "Perdiste puto feo";

    //HACER ESTO PARA PAUSAR ESCENAS Y ESAS MIERDAS
    this.scene.pause();
    this.scene.launch('end', {mensaje: "Perdiste Feo"});

  }

  ganar(){
    //HACER ESTO PARA PAUSAR ESCENAS GANAR O MIERDAS DE ESAS
    this.scene.pause();
    this.scene.launch('end',{mensaje:"Ganaste"});
  }

}
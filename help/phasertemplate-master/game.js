import bola from "./bola.js";
import player from "./player.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() 
  {
    this.load.image('bola', 'bola.png');
    this.load.image('horizontal', 'horizontal.png');
    this.load.image('vertical', 'vertical.png');
    this.load.image('player', 'favicon.png');
  }

  create() {
    
    this.time = 60;
    this.colisones = 1;
    this.end = false;


    this.info = this.add.text(45, 50, "Te quedan "+ this.time + " segundos y te faltan " + this.colisones + " colision/es", { fontColor: 0xffff00 });

    this.info.setScale(0.9);
    this.info.setDepth(1);

    this.cont = 201;

    this.techo = this.physics.add.staticImage(250,0,'horizontal');
    this.techo.setScale(1.5,1);
    this.suelo = this.physics.add.staticImage(250,500,'horizontal');
    this.suelo.setScale(1.5,1);
    this.derecha = this.physics.add.staticImage(500,250,'vertical');
    this.izquierda = this.physics.add.staticImage(0,250,'vertical');

    this.bola = new bola(this, 250,250,'bola',1);
    this.physics.add.collider(this.bola, this.techo);
    this.physics.add.collider(this.bola, this.suelo);
    this.physics.add.collider(this.bola, this.derecha);
    this.physics.add.collider(this.bola, this.izquierda);

    this.player = new player(this,100,250,'player',3);
    this.physics.add.collider(this.player, this.techo);
    this.physics.add.collider(this.player, this.suelo);
    this.physics.add.collider(this.player, this.derecha);
    this.physics.add.collider(this.player, this.izquierda);

    this.physics.add.overlap(this.player, this.bola, () => 
        {
          this.dividir(this.bola);
          this.colisones--;
          this.cont = 200;


          this.info.setText("Te quedan "+ this.time + " segundos y te faltan " + this.colisones + " colision/es");
        })


    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  updateCounter(tiempo)
  {
    this.time -= tiempo;
    this.info.setText("Te quedan "+ this.time.toFixed() + " segundos y te faltan " + this.colisones + " colision/es");
  }

  dividir(dato)
  {
    if(this.colisones > 0)
    {
      this.bola1 = new bola(this, dato.x , dato.y,'bola',-1);
      this.physics.add.collider(this.bola1, this.techo);
      this.physics.add.collider(this.bola1, this.suelo);
      this.physics.add.collider(this.bola1, this.derecha);
      this.physics.add.collider(this.bola1, this.izquierda);
  
      this.bola2 = new bola(this, dato.x, dato.y,'bola',1);
      this.physics.add.collider(this.bola2, this.techo);
      this.physics.add.collider(this.bola2, this.suelo);
      this.physics.add.collider(this.bola2, this.derecha);
      this.physics.add.collider(this.bola2, this.izquierda);
  
      this.physics.add.collider(this.bola1, this.bola2);
    }
    

    dato.destroy();
  }


  coli()
  {
    this.physics.add.overlap(this.player, this.bola1, () => 
    {
      this.dividir(this.bola1);
      this.colisones--;
      this.cont = 200;
    })

    this.physics.add.overlap(this.player, this.bola2, () => 
    {
      this.dividir(this.bola2);
      this.colisones--;
          this.cont = 200;
    })
  }

  victoria()
  {
    this.player.destroy();
    this.info.destroy();
    if(this.bola != undefined)
    {
      this.bola.destroy();
    }
    if(this.bola1 != undefined)
    {
      this.bola1.destroy();
    }
    if(this.bola2 != undefined)
    {
      this.bola2.destroy();
    }


    this.info = this.add.text(200, 250, "WIN", { fontColor: 0xffff00 });
    this.info.setScale(3);
  }

  derrota()
  {
    this.player.destroy();
    this.info.destroy();
    if(this.bola != undefined)
    {
      this.bola.destroy();
    }
    if(this.bola1 != undefined)
    {
      this.bola1.destroy();
    }
    if(this.bola2 != undefined)
    {
      this.bola2.destroy();
    }

    this.info = this.add.text(200, 250, "LOSE", { fontColor: 0xffff00 });
    this.info.setScale(3);
  }

  update(time, delta) 
  {
      if(this.cont <= 200)
      {
        this.cont--;
      }
      if(this.cont === 0)
      {
        this.coli();
      }

      this.updateCounter(delta);

      if(this.colisones === 0)
      {
        this.victoria();
        this.end = true;
      }
      else if(this.time < -1000)
      {
        this.derrota();
        this.end = true;
      }
      if(this.end && this.enter.isDown)
      {
        this.scene.start('main');
      }
  }
}

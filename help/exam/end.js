

export default class End extends Phaser.Scene {
  constructor() {
    super({ key: 'end' });
  }
  init(data){
    this.cosita = data;
  }

  create() {
    this.add.text(500, 300, this.cosita.mensaje);

    //AÑADIR EVENTOS
    this.space = this.input.keyboard.addKey('SPACE');

    this.space.on('down',() => {
      this.scene.start('scene');
      //this.space.resetkey();
    })
  }
}
export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }
  preload() {
    this.load.image('platform', 'platform.png');
    this.load.image('base', 'base.png');
    this.load.image('star', 'star.png');
    this.load.image('player', 'player.png');
    this.load.image('platformV', 'platformVertical.png');
    this.load.audio('hijoDePuta', 'DanllesHijoPuta.mp3');
  }

  create() {
    this.scene.start('scene');
  }
}
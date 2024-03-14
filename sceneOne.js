var player;
class CenaUm extends Phaser.Scene {
    constructor() {
        super({ key: "CenaUm" });
    }

    preload() {
        this.load.image('officeInterior', 'assets/OfficeInterior.png');
        this.load.image('japaneseCityFree', 'assets/JapaneseCityFree.png');
        this.load.tilemapTiledJSON('map', 'assets/map.json');
        this.load.spritesheet('player', 'assets/spritePlayer.png', { frameWidth: 146, frameHeight: 150 });
        //this.load.image('explicar', 'assets/exclamation.png');
    }

    create() {
        this.loadMapLayers('map', [
            {
                tilesetName: 'officeInterior',
                layers: [
                    { layerName: 'chao', collider: false },
                    { layerName: 'paredes', collider: true, collisionTiles: { between: { start: 0, end: 2261 } } },
                    { layerName: 'paredesDois', collider: true, collisionTiles: { between: { start: 0, end: 2261 } } },
                    { layerName: 'paredesTres', collider: true, collisionTiles: { between: { start: 0, end: 2261 } } },
                    { layerName: 'objetos', collider: true, collisionTiles: { between: { start: 0, end: 2261 } } },
                    { layerName: 'objetosDois', collider: true, collisionTiles: { between: { start: 0, end: 2261 } } },
                    { layerName: 'objetosTres', collider: true, collisionTiles: { between: { start: 0, end: 2261 } } }
                ]},
            
            {
                tilesetName: 'japaneseCityFree',
                layers: [
                    { layerName: 'objetosCityFree', collider: true, collisionTiles: { between: { start: 0, end: 1439 } } }
                ]
            }
        ]);

        console.log(this.layers);

        this.player = this.physics.add.sprite(1042, 447, 'player').setScale(0.2);
        this.player.setDepth(1);

        this.layers.forEach(layer => {
            if (layer.collision) {
                if (layer.collisionTiles.between) {
                    this.map.setCollisionBetween(layer.collisionTiles.between.start, layer.collisionTiles.between.end, true, layer.layerName);
                } else if (layer.collisionTiles.current) {
                    this.map.setCollision(layer.collisionTiles.current, true, layer.layerName);
                }
                this.physics.add.collider(this.player, this.map.getLayer(layer.layerName));
            }
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'andarLateral',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'andarBaixo',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'parado',
            frames: this.anims.generateFrameNumbers('player', { start: 7, end: 7 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'andarCima',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
        });

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2); 

    }

    update() {
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-150);
            this.player.anims.play('andarLateral', true)
            this.player.flipX = true
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(150);
            this.player.anims.play('andarLateral', true)
            this.player.flipX = false
        }
        else {
            this.player.body.setVelocityX(0);
            this.player.anims.play('parado', true)
        }
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-150);
            this.player.anims.play('andarCima', true)
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(150);
            this.player.anims.play('andarBaixo', true)
        }
    }

    loadMapLayers(map, tiledSettings) {
        this.map = this.make.tilemap({ key: map, tileWidth: 32, tileHeight: 32 });
        this.layers = [];
        tiledSettings.forEach(setting => {
            const tileset = this.map.addTilesetImage(setting.tilesetName, setting.tilesetName);
            setting.layers.forEach(layer => {
                const currentLayer = this.map.createLayer(layer.layerName, tileset, 0, 0);
                currentLayer.setCollisionByProperty({ collider: layer.collider });
                //this.layers.push(currentLayer);
                this.layers.push({
                    layerName: layer.layerName,
                    collider: layer.collider,
                    collisionTiles: layer.collisionTiles
                });
                //currentLayer.setCollisionByProperty({ collider: true }, true);
            });
        });
    }
}

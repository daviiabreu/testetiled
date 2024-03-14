var gameState = {

    // Definindo as dimensões do nosso jogo
    larguraJogo: window.innerWidth,
    alturaJogo: window.innerHeight,
  };

  // configuração padrão do nosso jogo
  var config = {
    type: Phaser.AUTO,
    width: gameState.larguraJogo,
    height: gameState.alturaJogo,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
      },
    },
    // Definição dos nomes das cenas
    scene: [CenaUm],
  };
  
  // Configuração padrão do Phaser para a configuração de um novo jogo
  var game = new Phaser.Game(config);
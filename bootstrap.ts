import { BombermanGame } from "./bomberman-game";
import { CollisionManager } from "./engine/collision-manager";
import { EntityManager } from "./engine/entity-manager";
import { WindowDomGameLoop } from "./engine/game-loop";
import { KeyListener } from "./engine/key-listener";
import { PositionManager } from "./engine/position-manager";


async function bootstrap() {
  const canvasEl = document.getElementById('game-canvas') as HTMLCanvasElement | null;

  if (!canvasEl) {
    console.error('Couldn\'t find the canvas element');
    return;
  }

  const context = canvasEl.getContext('2d');
  
  if(!context) {
    console.error('Couldn\'t get the context');
    return;
  }

  canvasEl.focus();
  context.imageSmoothingEnabled = false;

  const collisionManager = new CollisionManager();
  const positionManager = new PositionManager();

  const game = new BombermanGame(
    context, 
    canvasEl.width, 
    canvasEl.height, 
    new KeyListener(canvasEl),
    new EntityManager(collisionManager, positionManager),
    collisionManager,
    positionManager,
    new WindowDomGameLoop());

  await game.run();
}

bootstrap();
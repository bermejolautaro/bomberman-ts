import { CollisionManager } from "./engine/collision-manager";
import { EntityManager } from "./engine/entity-manager";
import { Game } from "./engine/game";
import { IGameLoop } from "./engine/game-loop";
import { loadImageFromUrl } from "./engine/image-utils";
import { KeyListener } from "./engine/key-listener";
import { PositionManager } from "./engine/position-manager";
import { GameMap } from "./game-map";
import { Player } from "./player";
import { CONTROLS } from "./player-controls";

export class BombermanGame extends Game {
  private readonly tilesize: number = 16;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    keyListener: KeyListener,
    entityManager: EntityManager,
    collisionHandler: CollisionManager,
    positionManager: PositionManager,
    gameLoop: IGameLoop
  ) {
    super(
      width,
      height,
      context,
      keyListener,
      entityManager,
      collisionHandler,
      positionManager,
      gameLoop
    );
  }

  protected override async setup(): Promise<void> {
    super.setup();
    const tileset = await loadImageFromUrl('sprites/bomberman-tileset.png');
    const map = new GameMap(tileset, this._scale, this.width, this.height);
    const player = new Player(
      this.tilesize * this._scale, 
      this.tilesize * this._scale * .5, 
      await loadImageFromUrl('sprites/bomberman-atlas.png'), 
      tileset, 
      this._scale,
      CONTROLS[0]);
      
    const player2 = new Player(
      this.tilesize * this._scale * ((this.width / (this.tilesize * this._scale)) - 2), 
      this.tilesize * this._scale * .5, 
      await loadImageFromUrl('sprites/bomberman-atlas.png'), 
      tileset, 
      this._scale,
      CONTROLS[1]);

    this.addEntity(map);
    this.addEntity(player);
    this.addEntity(player2);
  }
}
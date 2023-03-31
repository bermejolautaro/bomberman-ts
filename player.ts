import { Bomb } from "./bomb";
import { ICollidable } from "./engine/collidable";
import { CollisionBox } from "./engine/collision-box";
import { CollisionManager } from "./engine/collision-manager";
import { EntityManager } from "./engine/entity-manager";
import { GameAnimation } from "./engine/game-animation";
import { KeyListener } from "./engine/key-listener";
import { PositionManager } from "./engine/position-manager";
import { IPositionable } from "./engine/positionable";
import { Spritesheet } from "./engine/spritesheet";
import { ControlMapping } from "./player-controls";

enum Direction {
  Up,
  Right,
  Down,
  Left
}

type PlayerAnimations = {
  'idle-up': GameAnimation,
  'idle-right': GameAnimation,
  'idle-down': GameAnimation,
  'idle-left': GameAnimation,
  'walking-up': GameAnimation,
  'walking-right': GameAnimation,
  'walking-down': GameAnimation,
  'walking-left': GameAnimation,
}

export class Player implements IPositionable, ICollidable {
  private maxAmountOfBombs: number = 1;
  private placedBombs: Bomb[] = [];
  private bombRange: number = 2;

  private readonly spritesheet: Spritesheet;
  private readonly playerAnimations: PlayerAnimations;
  private velX = 0;
  private velY = 0;
  private width = 32;
  private height = 32;
  private speed = 200;
  private currentAnimation: GameAnimation;
  private currentDirection: Direction;

  constructor(
    private _x: number,
    private _y: number,
    playerSpritesheet: HTMLImageElement,
    private bombSpritesheet: HTMLImageElement,
    private scale: number,
    private readonly controlMapping: ControlMapping) {
    this.spritesheet = new Spritesheet(playerSpritesheet, 32, 32);
    this.playerAnimations = {
      'idle-up': new GameAnimation(this.spritesheet, [[0, 0]], 200),
      'idle-right': new GameAnimation(this.spritesheet, [[0, 1]], 200),
      'idle-down': new GameAnimation(this.spritesheet, [[0, 2]], 200),
      'idle-left': new GameAnimation(this.spritesheet, [[0, 3]], 200),
      'walking-up': new GameAnimation(this.spritesheet, [[0, 0], [1, 0], [2, 0]], 200),
      'walking-right': new GameAnimation(this.spritesheet, [[0, 1], [1, 1], [2, 1]], 200),
      'walking-down': new GameAnimation(this.spritesheet, [[0, 2], [1, 2], [2, 2]], 200),
      'walking-left': new GameAnimation(this.spritesheet, [[0, 3], [1, 3], [2, 3]], 200),
    };
    this.currentAnimation = this.playerAnimations['walking-down'];
    this.currentDirection = Direction.Down;
  }

  public get solid(): boolean {
    return true;
  }

  public getCollisionBox(): CollisionBox {
    return {
      xPos: this._x + 15,
      yPos: this._y + 47,
      width: this.width,
      height: this.height - 10
    };
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get z(): number {
    return 10;
  }

  public update(
    dt: number,
    kl: KeyListener,
    ch: CollisionManager,
    em: EntityManager,
    pm: PositionManager) {

    this.velX = 0;
    this.velY = 0;
    this.placedBombs = this.placedBombs.filter(x => !x.exploded);

    if (kl.isAnyKeyDown(this.controlMapping.left)) {
      this.velX = -this.speed * dt;
    }

    if (kl.isAnyKeyDown(this.controlMapping.right)) {
      this.velX = this.speed * dt;
    }

    if (kl.isAnyKeyDown(this.controlMapping.up)) {
      this.velY = -this.speed * dt;
    }

    if (kl.isAnyKeyDown(this.controlMapping.down)) {
      this.velY = this.speed * dt;
    }

    if (kl.isAnyKeyDown(this.controlMapping.bomb) &&
      this.placedBombs.length < this.maxAmountOfBombs) {
      const collisionBox = this.getCollisionBox();
      const gridX = Math.floor((collisionBox.xPos + collisionBox.width / 2) / (16 * this.scale)) * 16 * this.scale
      const gridY = Math.floor((collisionBox.yPos) / (16 * this.scale)) * 16 * this.scale

      if (!pm.getPositionablesAt(gridX, gridY).some(x => x instanceof Bomb)) {
        const bomb = new Bomb(this.bombSpritesheet, this.scale, gridX, gridY, this.bombRange);
        em.addEntity(bomb);
        this.placedBombs.push(bomb);
      }
    }

    if (this.velX !== 0 && this.velY !== 0) {
      const lkp = kl.lastKeyPressed;
      if (this.controlMapping.left.some(x => x === lkp) ||
        this.controlMapping.right.some(x => x === lkp)) {
        this.velY = 0;
      }

      if (this.controlMapping.up.some(x => x === lkp) ||
        this.controlMapping.down.some(x => x === lkp)) {
        this.velX = 0;
      }
    }

    const [newVelX, newVelY] = Player.calculateCollision(ch, this, this.velX, this.velY);

    this.velX = newVelX;
    this.velY = newVelY;

    this._x += this.velX;
    this._y += this.velY;
    this.currentDirection = Player.getDirection(this.currentDirection, this.velX, this.velY);
    this.currentAnimation = Player.getCurrentAnimation(this.playerAnimations, this.currentDirection, this.velX, this.velY);
    this.currentAnimation.update(dt);
  }

  public render(context: CanvasRenderingContext2D) {
    this.currentAnimation.render(context, this._x, this._y, 32 * this.scale, 32 * this.scale);
  }

  private static calculateCollision(ch: CollisionManager, driver: ICollidable, velX: number, velY: number): [number, number] {
    const collisionsX = ch.testMovement(driver, velX, 0);
    let [newVelX, newVelY] = [velX, velY];

    if (collisionsX.length > 0) {
      newVelX = 0;
    }

    const collisionsY = ch.testMovement(driver, 0, velY);

    if (collisionsY.length > 0) {
      newVelY = 0;
    }

    return [newVelX, newVelY];
  }

  private static getDirection(currentDirection: Direction, velX: number, velY: number): Direction {
    if (velX > 0) {
      return Direction.Right;
    } else if (velX < 0) {
      return Direction.Left;
    }

    if (velY > 0) {
      return Direction.Down;
    } else if (velY < 0) {
      return Direction.Up;
    }

    return currentDirection;
  }

  private static getCurrentAnimation(playerAnimations: PlayerAnimations, currentDirection: Direction, velX: number, velY: number): GameAnimation {
    if (velX > 0) {
      return playerAnimations['walking-right'];
    } else if (velX < 0) {
      return playerAnimations['walking-left'];
    }

    if (velY > 0) {
      return playerAnimations['walking-down'];
    } else if (velY < 0) {
      return playerAnimations['walking-up'];
    }

    switch (currentDirection) {
      case Direction.Right: return playerAnimations['idle-right'];
      case Direction.Left: return playerAnimations['idle-left'];
      case Direction.Down: return playerAnimations['idle-down'];
      case Direction.Up: return playerAnimations['idle-up'];
    };
  }
}
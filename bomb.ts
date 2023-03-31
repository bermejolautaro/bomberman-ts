import { SolidTile } from "./solid-tile";
import { Tiles, TILES } from "./constants";
import { ICollidable } from "./engine/collidable";
import { CollisionBox } from "./engine/collision-box";
import { CollisionManager } from "./engine/collision-manager";
import { drawSprite } from "./engine/draw-utils";
import { IEntity } from "./engine/entity";
import { EntityManager } from "./engine/entity-manager";
import { KeyListener } from "./engine/key-listener";
import { PositionManager } from "./engine/position-manager";
import { IPositionable } from "./engine/positionable";
import { Explosion, ExplosionAnimation } from "./explosion";
import { Player } from "./player";

export class Bomb implements IEntity, IPositionable, ICollidable {
  private readonly _frames: Tiles[] = ['s-bomb', 'm-bomb', 'l-bomb'];
  private _currentFrame: number = 0;
  private _solid: boolean = false;
  private _exploded: boolean = false;

  private msInCurrentFrame: number = 0;
  private msPerFrame: number = 300;

  private currentExplosionTimeInMs: number = 0;
  private readonly explosionTimeInMs: number = this.msPerFrame * this._frames.length * 2;

  private _incrementing: boolean = true;

  constructor(
    private image: HTMLImageElement,
    private scale: number,
    private _x: number,
    private _y: number,
    private readonly range: number
  ) { }

  public get solid(): boolean {
    return this._solid;
  }

  public get exploded(): boolean {
    return this._exploded;
  }

  public getCollisionBox(): CollisionBox {
    const width = 16 * this.scale;
    const height = 16 * this.scale;
    return {
      xPos: this.x + width / 4,
      yPos: this.y + height / 4,
      width: width / 2,
      height: height / 2
    }
  }

  public update(dt: number, _kl: KeyListener, ch: CollisionManager, em: EntityManager, _pm: PositionManager): void {
    this.notSolidUntilPlayerMovesOutside(ch);

    this.msInCurrentFrame += dt * 1000;
    this.currentExplosionTimeInMs += dt * 1000;

    if (this.currentExplosionTimeInMs >= this.explosionTimeInMs) {
      em.removeEntity(this);
      this._exploded = true;

      const startingX = Math.floor(this.x);
      const startingY = Math.floor(this.y);
      this.explosionLogic(ch, em, startingX, startingY, 1, 0);
      this.explosionLogic(ch, em, startingX, startingY, -1, 0);
      this.explosionLogic(ch, em, startingX, startingY, 0, 1);
      this.explosionLogic(ch, em, startingX, startingY, 0, -1);
    }

    if (this.msInCurrentFrame >= this.msPerFrame) {
      this.msInCurrentFrame -= this.msPerFrame;

      if (this._currentFrame === this._frames.length - 1) {
        this._incrementing = false;
      }

      if (this._currentFrame === 0) {
        this._incrementing = true;
      }

      if (this._incrementing) {
        this._currentFrame += 1;
      } else {
        this._currentFrame -= 1;
      }
    }
  }

  private static getCellsToPutExplosions(ch: CollisionManager,
    startingX: number,
    startingY: number,
    tilesize: number,
    scale: number,
    rangeMax: number,
    iterationsMax: number,
    directionX: number,
    directionY: number): [number, number, IEntity[]][] {
    const result: [number, number, IEntity[]][] = [];
    const width = tilesize * scale;
    const height = tilesize * scale;

    let box: CollisionBox = {
      xPos: startingX + width / 4,
      yPos: startingY + height / 4,
      width: width / 2,
      height: height / 2
    };
    let collisions = ch.findCollisions(box);
    let iterationCount = 0;
    let isCollisionWithUnbreakable = collisions.some(x => x.with instanceof SolidTile && x.with.tilekey === 'unbreakable-brick');
    let brickFound = false;

    while (
      !isCollisionWithUnbreakable &&
      iterationCount <= iterationsMax &&
      iterationCount <= rangeMax &&
      !brickFound) {
      let element: [number, number, IEntity[]] = [startingX, startingY, []];

      for (const { with: collidable } of collisions) {
        if (collidable instanceof SolidTile && collidable.tilekey === 'brick') {
          element[2].push(collidable);
          brickFound = true;
        }

        if (collidable instanceof Player) {
          element[2].push(collidable);
        }
      }

      startingX += tilesize * scale * directionX;
      startingY += tilesize * scale * directionY;

      box = {
        xPos: startingX + width / 4,
        yPos: startingY + height / 4,
        width: width / 2,
        height: height / 2
      };

      collisions = ch.findCollisions(box);
      isCollisionWithUnbreakable = collisions.some(x => x.with instanceof SolidTile && x.with.tilekey === 'unbreakable-brick');
      brickFound = collisions.some(x => x.with instanceof SolidTile && x.with.tilekey === 'brick');

      iterationCount++;
      result.push(element);
    }

    return result;
  }

  private explosionLogic(
    ch: CollisionManager,
    em: EntityManager,
    startingX: number,
    startingY: number,
    directionX: -1 | 0 | 1,
    directionY: -1 | 0 | 1) {

    const maxIteration = 10;
    let iterationCount = 0;
    let currentAnimDirection: ExplosionAnimation = 'center';
    let explosion = new Explosion(this.image, this.scale, startingX, startingY, currentAnimDirection)
    let collisions = ch.findCollisions(explosion);
    let isCollisionWithUnbreakable = collisions.some(x => x.with instanceof SolidTile && x.with.tilekey === 'unbreakable-brick');
    let brickFound = false;

    while (!isCollisionWithUnbreakable &&
      iterationCount <= maxIteration &&
      iterationCount <= this.range &&
      !brickFound) {

      em.addEntity(explosion);

      for (const { with: collidable } of collisions) {
        if (collidable instanceof SolidTile && collidable.tilekey === 'brick') {
          em.removeEntity(collidable);
          brickFound = true;
        }

        if (collidable instanceof Player) {
          em.removeEntity(collidable);
        }
      }

      startingX += 16 * this.scale * directionX;
      startingY += 16 * this.scale * directionY;

      explosion = new Explosion(this.image, this.scale, startingX, startingY, currentAnimDirection)

      collisions = ch.findCollisions(explosion);
      isCollisionWithUnbreakable = collisions.some(x => x.with instanceof SolidTile && x.with.tilekey === 'unbreakable-brick');
      let temp: boolean = brickFound;
      brickFound = collisions.some(x => x.with instanceof SolidTile && x.with.tilekey === 'brick');
      iterationCount++;

      if (isCollisionWithUnbreakable || iterationCount >= maxIteration || iterationCount >= this.range || brickFound) {
        if (directionX === 1) {
          currentAnimDirection = 'right'
        }

        if (directionX === -1) {
          currentAnimDirection = 'left'
        }
      } else {
        if (directionX !== 0 && directionY === 0) {
          currentAnimDirection = 'horizontal';
        }

        if (directionY !== 0 && directionX === 0) {
          currentAnimDirection = 'vertical';
        }
      }
      brickFound = temp;
      explosion = new Explosion(this.image, this.scale, startingX, startingY, currentAnimDirection)
    }
  }


  private notSolidUntilPlayerMovesOutside(ch: CollisionManager) {
    if (this.solid) {
      return;
    }

    const collisionWithPlayer =
      ch.findCollisions(this)
        .some(x => x.with instanceof Player);

    if (!collisionWithPlayer) {
      this._solid = true;
    }
  }

  public render(context: CanvasRenderingContext2D): void {
    drawSprite(context, this.image, this.scale, TILES[this._frames[this._currentFrame]], this._x, this._y)
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get z(): number {
    return 1;
  }

}
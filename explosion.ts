import { Tiles, TILES } from "./constants";
import { ICollidable } from "./engine/collidable";
import { CollisionBox } from "./engine/collision-box";
import { CollisionManager } from "./engine/collision-manager";
import { drawSprite } from "./engine/draw-utils";
import { EntityManager } from "./engine/entity-manager";
import { KeyListener } from "./engine/key-listener";
import { PositionManager } from "./engine/position-manager";
import { IPositionable } from "./engine/positionable";

export type ExplosionAnimation =
  | 'center'
  | 'horizontal'
  | 'vertical'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'

export class Explosion implements IPositionable, ICollidable {
  private readonly _frames: { [anim in ExplosionAnimation]: Tiles[] } = {
    center: [
      'explosion-center-1',
      'explosion-center-2',
      'explosion-center-3',
      'explosion-center-4',
      'explosion-center-5'
    ],
    horizontal: [
      'explosion-horizontal-1',
      'explosion-horizontal-2',
      'explosion-horizontal-3',
      'explosion-horizontal-4',
      'explosion-horizontal-5',
    ],
    vertical: [
      'explosion-vertical-1',
      'explosion-vertical-2',
      'explosion-vertical-3',
      'explosion-vertical-4',
      'explosion-vertical-5',
    ],
    left: [
      'explosion-left-1',
      'explosion-left-2',
      'explosion-left-3',
      'explosion-left-4',
      'explosion-left-5',
    ],
    right: [
      'explosion-right-1',
      'explosion-right-2',
      'explosion-right-3',
      'explosion-right-4',
      'explosion-right-5',
    ],
    top: [],
    bottom: [],
  };

  private msInCurrentFrame: number = 0;
  private msPerFrame: number = 50;
  private _frameIndex: number = 0;

  private currentMs: number = 0;
  private readonly keepAliveForMs: number = 250;

  constructor(
    private image: HTMLImageElement,
    private readonly scale: number,
    private _x: number,
    private _y: number,
    private readonly animDirection: ExplosionAnimation
  ) {

  }

  public get solid(): boolean {
    return false;
  }

  public getCollisionBox(): CollisionBox {
    return {
      height: 8 * this.scale,
      width: 8 * this.scale,
      xPos: this.x + 4 * this.scale,
      yPos: this.y + 4 * this.scale
    }
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get z(): number {
    return 5;
  }


  update(dt: number, kl: KeyListener, ch: CollisionManager, em: EntityManager, pm: PositionManager): void {
    this.currentMs += dt * 1000;
    this.msInCurrentFrame += dt * 1000;

    if (this.msInCurrentFrame >= this.msPerFrame) {
      this.msInCurrentFrame -= this.msPerFrame;
      this._frameIndex = (this._frameIndex + 1) % this._frames[this.animDirection].length;
    }

    if (this.currentMs >= this.keepAliveForMs) {
      em.removeEntity(this);
    }
  }

  render(context: CanvasRenderingContext2D): void {
    drawSprite(context, this.image, this.scale, TILES[this._frames[this.animDirection][this._frameIndex]], this.x, this.y);
  }
}
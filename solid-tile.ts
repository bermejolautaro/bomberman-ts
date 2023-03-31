import { Tiles, TILES } from "./constants";
import { ICollidable } from "./engine/collidable";
import { CollisionBox } from "./engine/collision-box";
import { drawSprite } from "./engine/draw-utils";
import { KeyListener } from "./engine/key-listener";
import { IPositionable } from "./engine/positionable";

export class SolidTile implements ICollidable, IPositionable {
  private collisionBox: CollisionBox;

  constructor(
    private image: HTMLImageElement,
    private readonly _tilekey: Tiles,
    private scale: number,
    private _x: number,
    private _y: number) {

    this.collisionBox = {
      height: 16 * this.scale,
      width: 16 * this.scale,
      xPos: this._x,
      yPos: this._y
    };
  }

  public get x(): number {
    return this._x
  }

  public get y(): number {
    return this._y
  }

  public get z(): number {
    return 1;
  }

  public get tilekey(): Tiles {
    return this._tilekey;
  }

  public get solid(): boolean {
    return true;
  }

  getCollisionBox(): CollisionBox {
    return this.collisionBox;
  }

  update(_dt: number, _kl: KeyListener): void { }

  render(context: CanvasRenderingContext2D): void {
    drawSprite(context, this.image, this.scale, TILES[this._tilekey], this._x, this._y)
  }
}
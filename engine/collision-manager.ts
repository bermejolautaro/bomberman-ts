import { ICollidable } from "./collidable";
import { Collision } from "./collision";
import { CollisionBox } from "./collision-box";
import { IEntity } from "./entity";

export class CollisionManager {
  private collidables: ICollidable[] = [];

  public addCollidable(collidable: ICollidable) {
    this.collidables.push(collidable);
  }

  public removeCollidable(collidable: ICollidable) {
    const index = this.collidables.findIndex(x => x === collidable);
    this.collidables.splice(index, 1);
  }

  public testMovement(driverCollidable: ICollidable, velX: number, velY: number): Collision[] {
    return this.findCollisions(driverCollidable, velX, velY).filter(x => x.with.solid);
  }

  public findCollisions(driverCollidable: ICollidable | CollisionBox, xOffset: number = 0, yOffset: number = 0): Collision[] {
    const result = [];

    for (const collidable of this.collidables) {
      const collision = this.findCollision(driverCollidable, collidable, xOffset, yOffset);
      if (collision) {
        result.push(collision);
      }
    }

    return result;
  }

  private findCollision(
    driverCollidableOrBox: ICollidable | CollisionBox,
    otherCollidable: ICollidable,
    xOffset: number = 0,
    yOffset: number = 0): Collision | null {

    let driverCollisionBox: CollisionBox;

    if (this.isCollidable(driverCollidableOrBox)) {
      if (driverCollidableOrBox === otherCollidable) {
        return null;
      } else {
        driverCollisionBox = driverCollidableOrBox.getCollisionBox();
      }
    } else {
      driverCollisionBox = driverCollidableOrBox;
    }

    driverCollisionBox.xPos += xOffset;
    driverCollisionBox.yPos += yOffset;
    const collidableCollisionBox = otherCollidable.getCollisionBox();

    const rightCollision =
      driverCollisionBox.xPos <= collidableCollisionBox.xPos &&
      driverCollisionBox.xPos + driverCollisionBox.width >= collidableCollisionBox.xPos;

    const leftCollision =
      collidableCollisionBox.xPos <= driverCollisionBox.xPos &&
      collidableCollisionBox.xPos + collidableCollisionBox.width >= driverCollisionBox.xPos;

    const topCollision =
      driverCollisionBox.yPos <= collidableCollisionBox.yPos &&
      driverCollisionBox.yPos + driverCollisionBox.height >= collidableCollisionBox.yPos;

    const bottomCollision =
      collidableCollisionBox.yPos <= driverCollisionBox.yPos &&
      collidableCollisionBox.yPos + collidableCollisionBox.height >= driverCollisionBox.yPos;

    if ((rightCollision || leftCollision) && (topCollision || bottomCollision)) {
      return {
        with: otherCollidable,
        bottom: bottomCollision,
        left: leftCollision,
        right: rightCollision,
        top: topCollision
      };
    }

    return null;
  }


  public render(context: CanvasRenderingContext2D) {
    for (const collidable of this.collidables) {
      const box = collidable.getCollisionBox();
      context.strokeStyle = 'blue';
      context.lineWidth = 3;
      context.strokeRect(box.xPos, box.yPos, box.width, box.height);
    }
  }

  public isCollidable(entity: IEntity | CollisionBox | ICollidable): entity is ICollidable {
    return (entity as ICollidable).getCollisionBox !== undefined;
  }
}
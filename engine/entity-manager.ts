import { CollisionManager } from "./collision-manager";
import { IEntity } from "./entity";
import { PositionManager } from "./position-manager";

export class EntityManager {
  private readonly entities: IEntity[] = [];

  constructor(
    private readonly collisionManager: CollisionManager,
    private readonly positionManager: PositionManager) {
  }

  public addEntity(entity: IEntity): void {
    this.entities.push(entity);

    if (this.collisionManager.isCollidable(entity)) {
      this.collisionManager.addCollidable(entity);
    }

    if (this.positionManager.isPositionable(entity)) {
      this.positionManager.addPositionable(entity);
    }
  }

  public removeEntity(entity: IEntity): void {
    const index = this.entities.findIndex(x => x === entity);
    this.entities.splice(index, 1);

    if(this.collisionManager.isCollidable(entity)) {
      this.collisionManager.removeCollidable(entity);
    }

    if(this.positionManager.isPositionable(entity)) {
      this.positionManager.removePositionable(entity);
    }
  }

  public getEntities(): IEntity[] {
    return this.entities;
  }
}
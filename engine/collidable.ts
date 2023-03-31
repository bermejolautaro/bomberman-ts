import { CollisionBox } from "./collision-box";
import { IEntity } from "./entity";

export interface ICollidable extends IEntity {
  solid: boolean;
  getCollisionBox(): CollisionBox;
}
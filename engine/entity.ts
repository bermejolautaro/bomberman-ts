import { CollisionManager } from "./collision-manager";
import { EntityManager } from "./entity-manager";
import { KeyListener } from "./key-listener";
import { PositionManager } from "./position-manager";

export interface IEntity {
  update(dt: number, kl: KeyListener, ch: CollisionManager, em: EntityManager, pm: PositionManager): void;
  render(context: CanvasRenderingContext2D): void;
}
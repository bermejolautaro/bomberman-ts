import { ICollidable } from "./collidable";

export interface Collision {
  with: ICollidable,
  top: boolean,
  bottom: boolean,
  left: boolean,
  right: boolean
}
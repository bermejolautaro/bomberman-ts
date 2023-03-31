import { IEntity } from "./entity";

export interface IPositionable extends IEntity {
  x: number;
  y: number;
  z: number;
}
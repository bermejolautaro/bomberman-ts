import { IEntity } from "./entity";
import { IPositionable } from "./positionable";

export class PositionManager {
  private readonly positionables: IPositionable[] = [];

  constructor(){ }

  public addPositionable(positionable: IPositionable): void {
    this.positionables.push(positionable);
  }

  public removePositionable(positionable: IPositionable) {
    const index = this.positionables.findIndex(x => x === positionable);
    this.positionables.splice(index, 1);
  }

  public getPositionables(): IPositionable[] {
    return this.positionables;
  }

  public getPositionablesAt(x: number, y: number): IPositionable[] {
    return this.positionables.filter(p => p.x === x && p.y === y);
  }

  public getPositionablesBetween(x0: number, y0: number, x1: number, y1: number): IPositionable[] {
    return this.positionables.filter(p => 
      p.x >= x0 && p.y >= y0 &&
      p.x <= x1 && p.y <= y1);
  }

  public isPositionable(entity: IEntity | IPositionable): entity is IPositionable {
    const positionable = entity as IPositionable;
    return positionable.x !== undefined && positionable.y !== undefined;
  }
}
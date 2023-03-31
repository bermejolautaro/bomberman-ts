import { SolidTile } from "./solid-tile";
import { Tiles, TILES } from "./constants";
import { CollisionManager } from "./engine/collision-manager";
import { drawSprite } from "./engine/draw-utils";
import { IEntity } from "./engine/entity";
import { EntityManager } from "./engine/entity-manager";
import { KeyListener } from "./engine/key-listener";
import { PositionManager } from "./engine/position-manager";
import { IPositionable } from "./engine/positionable";

export class GameMap implements IEntity, IPositionable {

  private readonly _map;
  private readonly _floorTile = TILES['floor'];
  private readonly _tileCountX: number;
  private readonly _tileCountY: number;

  private hasBeenInitialized: boolean = false;

  constructor(
    private sprite: HTMLImageElement, 
    private scale: number, 
    screenWidth: number, 
    screenHeight: number) { 
      this._tileCountX = Math.ceil(screenWidth / (this._floorTile.width * this.scale));
      this._tileCountY = Math.ceil(screenHeight / (this._floorTile.height * this.scale));
      this._map = GameMap.generateMap(this._tileCountY, this._tileCountX);
    } 

  public get x(): number {
    return 0;
  }

  public get y(): number {
    return 0;
  }

  public get z(): number {
    return 0;
  }

  update(_dt: number, _kl: KeyListener, _ch: CollisionManager, em: EntityManager, _pm: PositionManager): void {
    if(!this.hasBeenInitialized) {
      for (let y = 0; y < this._tileCountY; y++) {
        for (let x = 0; x < this._tileCountX; x++) {
          if(this._map[y][x] === 'brick') {
            em.addEntity(new SolidTile(this.sprite, 'brick',this.scale, x * this.scale * 16, y * this.scale * 16));
          }

          if(this._map[y][x] === 'unbreakable-brick') {
            em.addEntity(new SolidTile(this.sprite, 'unbreakable-brick', this.scale, x * this.scale * 16, y * this.scale * 16));
          }
        }
      }

      this.hasBeenInitialized = true;
    }
  }

  public render(context: CanvasRenderingContext2D) {
    this.drawFloor(context, this.sprite);
  }

  private drawFloor(
    context: CanvasRenderingContext2D, 
    image: HTMLImageElement) {

    for (let y = 0; y < this._tileCountY; y++) {
      for (let x = 0; x < this._tileCountX; x++) {
        drawSprite(context, image, this.scale, TILES['floor'], x * this._floorTile.width * this.scale, y * this._floorTile.height * this.scale);
      }
    }
  }

  private static generateEmptyMap(rows: number, columns: number): Tiles[][] {
    const map: Tiles[][] = new Array(rows);
  
    for (let i = 0; i < map.length; i++) {
      map[i] = new Array(columns);
    }
  
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        map[y][x] = 'floor';
      }
    }
  
    return map;
  }
  
  private static generateMapWithUnbreakableWalls(rows: number, columns: number): Tiles[][] {
    const emptyMap = GameMap.generateEmptyMap(rows, columns);
  
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
  
        if (x === 0 || y === 0 || y === rows - 1 || x === columns - 1) {
          emptyMap[y][x] = 'unbreakable-brick';
        }
  
        if (x % 2 === 0 && y % 2 === 0) {
          emptyMap[y][x] = 'unbreakable-brick';
        }
      }
    }
  
    return emptyMap;
  }
  
  private static generateMap(rows: number, columns: number): Tiles[][] {
    const mapWithWalls = GameMap.generateMapWithUnbreakableWalls(rows, columns);
  
    const omittedTiles = [
      // Top Left
      [1, 1],
      [2, 1],
      [1, 2],
  
      // Top Right
      [columns - 2, 1],
      [columns - 3, 1],
      [columns - 2, 2],
  
      // Bottom Left
      [1, rows - 2],
      [2, rows - 2],
      [1, rows - 3],
  
      // Bottom Right
      [columns - 2, rows - 2],
      [columns - 3, rows - 2],
      [columns - 2, rows - 3]
    ];
  
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const putBreakableWall = Math.random() > 0.2;
  
        if (mapWithWalls[y][x] !== 'floor') {
          continue;
        }
  
        if (putBreakableWall) {
          mapWithWalls[y][x] = 'brick'
        }
      }
    }
  
    for (const [x, y] of omittedTiles) {
      mapWithWalls[y][x] = 'floor';
    }
  
    return mapWithWalls;
  }
}


import { Spritesheet } from "./spritesheet";

export class SpritesheetSprite {
  constructor(
    private spritesheet: Spritesheet,
    private xIndex: number,
    private yIndex: number
  ) { }

  public render(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.spritesheet.render(
      context,
      this.xIndex,
      this.yIndex,
      x,
      y,
      width,
      height
    );
  }
}


import { Spritesheet } from "./spritesheet";

export class GameAnimation {
  private currentFrameIndex: number = 0;
  private msInCurrentFrame: number = 0;
  private currentXIndex: number = 0;
  private currentYIndex: number = 0;

  constructor(
    private spritesheet: Spritesheet,
    private frameIndexes: [number, number][],
    private msPerFrame: number
  ){ }

  public update(delta: number) {
    this.msInCurrentFrame += delta * 1000;
    if(this.msInCurrentFrame >= this.msPerFrame) {
      this.msInCurrentFrame -= this.msPerFrame;
      this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frameIndexes.length;
    }

    const [xIndex, yIndex] = this.frameIndexes[this.currentFrameIndex];
    this.currentXIndex = xIndex;
    this.currentYIndex = yIndex;
  }

  public render(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.spritesheet.render(
      context,
      this.currentXIndex,
      this.currentYIndex,
      x,
      y,
      width,
      height
    );
  }
}
export class Spritesheet {

  constructor(
    private image: HTMLImageElement,
    private spriteWidth: number,
    private spriteHeight: number
  ) { }

  public render(
    context: CanvasRenderingContext2D,
    xIndex: number,
    yIndex: number,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    context.drawImage(
      this.image,
      xIndex * this.spriteWidth,
      yIndex * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      x,
      y,
      width,
      height
    );
  }
}
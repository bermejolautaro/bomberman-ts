import { Sprite } from "./sprite";

export function drawSprite(
  context: CanvasRenderingContext2D, 
  image: HTMLImageElement,
  scale: number,
  spr: Sprite, 
  x: number, 
  y: number) {
  context.drawImage(image, spr.x, spr.y, spr.width, spr.height, x, y, spr.width * scale, spr.height * scale);
}
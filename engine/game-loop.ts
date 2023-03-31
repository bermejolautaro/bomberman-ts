import { getTimestampMs } from "./time-utils";

type UpdateFunction = (dt: number) => void;
type RenderFunction = () => void;

export interface IGameLoop {
  run: (updateFunction: UpdateFunction, renderFunction: RenderFunction) => void;
}

export class WindowDomGameLoop implements IGameLoop {
  private _sumDeltas: number = 0;
  private _frames: number = 0;
  private _lastTime: number = 0;
  private updateFunction: UpdateFunction | undefined;
  private renderFunction: RenderFunction | undefined;

  constructor() { }

  public run(updateFunction: UpdateFunction, renderFunction: RenderFunction) {
    this._lastTime = getTimestampMs();
    this.updateFunction = updateFunction;
    this.renderFunction = renderFunction;

    window.requestAnimationFrame(() => {
      this.loop();
    });
  }

  private loop() {
    if (!this.updateFunction || !this.renderFunction) {
      throw Error('Game loop was not initialized');
    }
    const currentTime = getTimestampMs();
    const dt = (currentTime - this._lastTime) / 1000;
    this._lastTime = currentTime;
    this._sumDeltas += dt;
    this._frames += 1;

    if(this._sumDeltas >= 1) {
      this._sumDeltas = 0;
      this._frames = 0;
    }

    this.updateFunction(dt);
    this.renderFunction();
    window.requestAnimationFrame(() => this.loop());
  }
}
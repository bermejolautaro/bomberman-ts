export class KeyListener {
  private _keyStates: { [key: string]: boolean } = {};
  private _lastKeyPressed: string | undefined;

  constructor(private canvasEl: HTMLCanvasElement) { }

  public async setup() {
    this.canvasEl.addEventListener('keydown', e => {
      e.preventDefault();
      this._keyStates[e.key] = true;
      this._lastKeyPressed = e.key;
    })

    this.canvasEl.addEventListener('keyup', e => {
      e.preventDefault();
      this._keyStates[e.key] = false;
    });
  }

  public isKeyDown(key: string): boolean {
    return this._keyStates[key] === true;
  }

  public isAnyKeyDown(keys: string[]): boolean {
    return keys.some(key => this.isKeyDown(key));
  }

  public get lastKeyPressed(): string | undefined {
    return this._lastKeyPressed;
  }
}
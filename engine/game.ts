import { CollisionManager } from "./collision-manager";
import { IEntity } from "./entity";
import { IGameLoop } from "./game-loop";
import { KeyListener } from "./key-listener";
import { EntityManager } from "./entity-manager";
import { PositionManager } from "./position-manager";

export abstract class Game {
  protected readonly _scale: number = 3;

  private showCollisionBoxes: boolean = false;
  private activateDebugMode: (dt: number) => void;

  constructor(
    protected width: number,
    protected height: number,
    private context: CanvasRenderingContext2D,
    private keyListener: KeyListener,
    private entityManager: EntityManager,
    private collisionManager: CollisionManager,
    private positionManager: PositionManager,
    private gameLoop: IGameLoop) { 
      this.activateDebugMode = debounce(
        200,
        () => this.keyListener.isKeyDown('F1'),
        () => this.showCollisionBoxes = !this.showCollisionBoxes);
    }

  public async run() {
    await this.setup();
    this.gameLoop.run(
      (dt) => this.update(
        dt, 
        this.keyListener, 
        this.collisionManager, 
        this.entityManager, 
        this.positionManager),
      () => this.render(this.context)
    );
  }

  protected async setup(): Promise<void> {
    const promises = [this.keyListener.setup()];
    Promise.all(promises);
  };

  protected addEntity(entity: IEntity) {
    this.entityManager.addEntity(entity);
  }

  private update(
    dt: number, 
    kl: KeyListener, 
    cl: CollisionManager, 
    em: EntityManager, 
    pm: PositionManager) {
    for (const entity of this.entityManager.getEntities()) {
      entity.update(dt, kl, cl, em, pm);
    }

    this.activateDebugMode(dt);
  }

  private render(context: CanvasRenderingContext2D) {
    for (const entity of this.positionManager.getPositionables().slice(0).sort((a, b) => a.z - b.z)) {
      entity.render(context);
    }

    if(this.showCollisionBoxes) {
      this.collisionManager.render(context);
    }
  }
}

function debounce(debounceKeyInputMs: number, condition: () => boolean, action: () => void) {
  let currentDebounceMs = 0;
  let debounce = false;

  return (dt: number) => {
    currentDebounceMs += dt * 1000;

    if(currentDebounceMs >= debounceKeyInputMs) {
      debounce = false;
      currentDebounceMs = 0;
    }

    if(condition() && !debounce) {
      action();
      debounce = true;
      currentDebounceMs = 0;
    }
  }
}
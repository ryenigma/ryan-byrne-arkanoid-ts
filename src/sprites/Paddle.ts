import {Vector} from '../types';
import {fasterPlayCheck} from '../setup';

export class Paddle {
  private paddleImage: HTMLImageElement = new Image();
  private moveLeft: boolean;
  private moveRight: boolean;

  constructor(
    public speed: number,
    public paddleWidth: number,
    private paddleHeight: number,
    private position: Vector,
    image: string
  ) {
    // Challenge mode - increses paddle speed if option selected
    if(fasterPlayCheck.checked) {
      this.speed = speed * 1.25;
    } else {
      this.speed = speed;
    }
    
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.moveLeft = false;
    this.moveRight = false;
    this.paddleImage.src = image;

    // Event Listeners
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  // Getters
  get width(): number {
    return this.paddleWidth;
  }

  get height(): number {
    return this.paddleHeight;
  }

  get pos(): Vector {
    return this.position;
  }

  get image(): HTMLImageElement {
    return this.paddleImage;
  }

  get isMovingLeft(): boolean {
    return this.moveLeft;
  }

  get isMovingRight(): boolean {
    return this.moveRight;
  }

  set width(width: number) {
    this.paddleWidth = width;
  }

  movePaddle(): void {
    if (this.moveLeft) this.pos.x -= this.speed;
    if (this.moveRight) this.pos.x += this.speed;
  }

  handleKeyUp = (e: KeyboardEvent): void => {
    if (e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = false;
    if (e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRight = false;
  }

  handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = true;
    if (e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRight = true;
  }
}

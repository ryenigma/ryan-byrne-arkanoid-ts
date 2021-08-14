import {Vector} from '../types';
import {fasterPlayCheck} from '../setup';

export class Ball {
  public speed: Vector;
  private ballImage: HTMLImageElement = new Image();

  constructor(
    speed: number,
    private ballSize: number,
    private position: Vector,
    image: string
  ) {
    this.ballSize = ballSize;
    this.position = position;

    //Challeng Mode - Increases Ball speed if option selected
    if(fasterPlayCheck.checked) {
      this.speed = {
        x: speed * 1.25,
        y: -speed * 1.25
      }
    } else {
    this.speed = {
      x: speed,
      y: -speed
    }};
    
    this.ballImage.src = image;
  }

  // Getters
  get width(): number {
    return this.ballSize;
  }

  get height(): number {
    return this.ballSize;
  }

  get pos(): Vector {
    return this.position;
  }

  get image(): HTMLImageElement {
    return this.ballImage;
  }

  // Methods
  changeYDirection(): void {
    this.speed.y =- this.speed.y;
  }

  changeXDirection(): void {
    this.speed.x =- this.speed.x;
  }

  moveBall(): void {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }

}

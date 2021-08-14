// This code is for a different way of enabling the shrinking paddle.  I still need to iron it out but I put it here so I can refference it if I want to make these changes.

checkBrickCollision(ball: Ball, brick: Brick): boolean[] {
    const colliding = this.isCollidingBrick(ball,brick);
    let destruction = colliding && brick.energy <=1;
    return [colliding, destruction];
  }

bricks.forEach((brick, i)=>{
      // object destructuring. brackets [] mean the expected value is an array.
      // it indexes into the result based on how many variables you add.
      // eg [collision] = someFunc() means the same as collision = someFunc()[0]
      // [collision,destruction]=somefunc() is the same as:
      //    collision = someFunc()[0]
      //    destruction = someFunc()[1]
      // you can use this feature with objects too using {} instead of [].
      // however it uses keys instead of index number.
      const [collision, destruction] = this.checkBrickCollision(ball,brick);
      colliding = collision || colliding; // make sure to know about any collisions
      if (collision){
        brick.energy -= 1;
      }
      if (destruction){
        bricks.splice(i,1);
        if (bricks.length % 5 == 0 && shrinkPaddleCheck.checked) {
          paddle.width = Math.max(paddle.width * 0.90, paddle.minWidth);
        }
      }
    });
    if (colliding) {
      ball.changeYDirection()
    }

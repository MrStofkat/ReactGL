import MoveableObject from './MoveableObject';

export default class Player extends MoveableObject {
  constructor(props) {
    super(props);
    this.counter = 0;
    this.animationInterval = 2;
  }
  move(headingX, headingY) {
    // debugger;
    if (headingX > 0) {
      this.currentAnimation = 3;
    } else if (headingX < 0) {
      this.currentAnimation = 1;
    } else if (headingY > 0) {
      this.currentAnimation = 0;
    }
    else if (headingY < 0) {
      this.currentAnimation = 2;
    }
    if (Math.abs(headingX) > 0 || Math.abs(headingY) > 0) {
      this.counter++;
      if (this.counter % this.animationInterval == 0)
        this.updateFrame();
    }

  }

}


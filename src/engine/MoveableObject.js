import Object2D from './Object2D';

export default class MoveableObject extends Object2D {
  constructor(props) {
    super(props);
    this.gravity = 1.0;
    this.numberOfFrames = 9;
    this.numberOfAnimations = 4;

    this.frameWidth = 0;
    this.frameHeight = 0;
    this.headingX = 0;
    this.headingY = 0;
    this.currentFrame = 0;
    this.movementCounter = 0;

    this.currentAnimation = 1;
  }

  updateFrame() {
    this.currentFrame++;
    var frameIndex = this.currentFrame % (this.numberOfFrames);
    var frame = frameIndex % this.numberOfFrames;
    var fWidth = 1.0 / this.numberOfFrames;
    var fHeight = 1.0 / this.numberOfAnimations;
    var frameX = frame / this.numberOfFrames;
    var frameY = this.currentAnimation / this.numberOfAnimations;
    this.textureBuffer = window.gl.createBuffer();
    window.gl.bindBuffer(window.gl.ARRAY_BUFFER, this.textureBuffer);

    var textureCoordinates = [
      frameX, frameY + fHeight,
      frameX + fWidth, frameY + fHeight,
      frameX + fWidth, frameY,
      frameX, frameY,
    ];

    window.gl.bufferData(window.gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
      window.gl.STATIC_DRAW);
  }


  setHeading(x, y) {
    this.headingX = x;
    this.headingY = y;
  }

  doActions() {
    //this.x +=headingX;
    //this.y +=headingY;
    this.headingX = 0.7
    this.movementCounter += this.headingX;

    if (this.movementCounter > 1) {
      this.updateFrame();

      this.movementCounter = 0;
    }
  }


}


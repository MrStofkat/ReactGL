
export default class Object2D {

  constructor(props) {
    this.action = "";

    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    this.width = 0.0;
    this.height = 0.0;
    this.name ="";

    this.rotationX = 0;
    this.rotationY = 0;
    this.vertices2D = [];
    this.texture = undefined;
    this.index = 0;
    this.counter = 0;
    this.add = 0.01;
    this.headingX = 0;
    this.headingY = 0;
    this.random = undefined;
    this.imgName = undefined;

    this.frameWidth = 0;
    this.frameHeight = 0;
    this.currentAnimation = 1;
    this.movementCounter = 0;
    this.headingX = 0;
    this.headingY = 0;
    this.currentFrame = 0;
    this.numberOfFrames = 9;
    this.numberOfAnimations = 4;

    this.normalsBuffer = undefined;
    this.verticesBuffer = undefined;
    this.textureBuffer = undefined;
    this.vertexIndexBuffer = undefined;
  }


  create() {
    // Create a buffer for the cube's vertices.
    this.verticesBuffer = window.gl.createBuffer();
    // Select the cubeVerticesBuffer as the one to apply vertex
    // operations to from here out.
    window.gl.bindBuffer(window.gl.ARRAY_BUFFER, this.verticesBuffer);
    // Now create an array of vertices for the cube.
    this.vertices2D = [
      // Front face
      -this.width, -this.height, 0.0,
      this.width, -this.height, 0.0,
      this.width, this.height, 0.0,
      -this.width, this.height, 0.0,

    ];
    // Now pass the list of vertices into WebGL to build the shape. We
    // do this by creating a Float32Array from the JavaScript array,
    // then use it to fill the current vertex buffer.
    window.gl.bufferData(window.gl.ARRAY_BUFFER, new Float32Array(this.vertices2D), window.gl.STATIC_DRAW);

    // Set up the normals for the vertices, so that we can compute lighting.
    this.normalsBuffer = window.gl.createBuffer();
    window.gl.bindBuffer(window.gl.ARRAY_BUFFER, this.normalsBuffer);

    var vertexNormals = [
      // Front
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,

    ];
    window.gl.bufferData(window.gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
      window.gl.STATIC_DRAW);


    // Map the texture onto the face.
    this.textureBuffer = window.gl.createBuffer();
    window.gl.bindBuffer(window.gl.ARRAY_BUFFER, this.textureBuffer);

    var textureCoordinates = [
      0.0, 1.0,
      1.0, 1.0,
      1.0, 0.0,
      0.0, 0.0,
    ];

    window.gl.bufferData(window.gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
      window.gl.STATIC_DRAW);

    // Build the element array buffer; this specifies the indices
    // into the vertex array for each face's vertices.
    this.vertexIndexBuffer = window.gl.createBuffer();
    window.gl.bindBuffer(window.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.

    var vertexIndices = [0, 1, 2, 0, 2, 3,];    // for all the same

    // Now send the element array to GL
    window.gl.bufferData(window.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), window.gl.STATIC_DRAW);

    //debugger;
    this.texture = window.sTextureLibrary.textures[this.name];
    //debugger;
    // this.initTextures(this.imageName);
  }


  initWithJSON(json) {
    this.x = json.x;
    this.y = json.y;
    this.z = json.z;
    this.index = json.index;
    this.name = json.image;
    this.create();

  }


  init(x, y, z, width, height, image, index) {
    if (!window.gl) alert("no gl context found in object!");
    this.index = index;
    this.name = image;
    this.random = Math.random();
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width;
    this.height = height;
    this.headingX = ((Math.random() * 2) - 1) / 1000;
    this.headingY = ((Math.random() * 2) - 1) / 1000;
    this.create();
  }




  doActions() {
    //Overide this method
  }


  moveScene(posX, posY) {
    this.x -= posX;
    this.y -= posY;

  }


  move() {

    // this.x +=this.headingX;
    // this.y +=this.headingY;

    //this.y = (this.y*.95)+(0.3*(Math.cos(Math.tan(this.x*2*this.index))));

    //        this.index+=this.add;
    //        if(this.index>1.3)this.index=0;


    this.index++;
    if (this.index % 500 == 0) {
      this.headingX = ((Math.random() * 2) - 1) / 100;
      this.headingY = ((Math.random() * 2) - 1) / 100;
    }

    if (this.x < -4 || this.x > 4) this.headingX = -this.headingX;
    if (this.y < -4 || this.y > 4) this.headingY = -this.headingY;


  }

  detectCollision(object2D) {

    if (object2D.x > this.x && object2D.y > this.y && object2D.x < this.x + this.width && object2D.y < this.y + this.height) {
      //collision happened!
    }
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


}
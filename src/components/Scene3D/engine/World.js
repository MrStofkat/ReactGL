import Object2D from './Object2D';
import MoveableObject from './MoveableObject';
import GridTile from './GridTile';
import BackgroundLayer from './BackgroundLayer';


export default class World {

  constructor(props) {
    this.backgroundLayer = undefined;
    //Scrolling parts
    this.backgroundFXLayer1A = undefined;
    this.backgroundFXLayer1B = undefined;
    this.backgroundFXLayer2A = undefined;
    this.backgroundFXLayer2B = undefined;

    this.textures = undefined;
    this.gravity = 1;
    this.actors = undefined;
    this.objects = undefined;
    this.playe = undefined;
    this.width = 20;
    this.height = 20;
    this.tileWidth = 0.5;
    this.tileHeight = 0.5;
    this.grid = [];
    this.layers = 3;

    this.normalsBuffer = undefined;
    this.verticesBuffer = undefined;
    this.textureBuffer = undefined;
    this.vertexIndexBuffer = undefined;
  }

  init() {
    for (var i = 0; i < 3; i++) {
      this.grid[i] = [];
    }

    //this.grid[0] =[];

    this.createGrid();
    for (var x = 0; x < this.width; x++) {
      this.grid[0][x] = [];
      for (var y = 0; y < this.height; y++) {
        this.grid[0][x][y] = new GridTile();
        this.grid[0][x][y].init(x, y, 0, "grass", false);
      }
    }


    this.createBackground();
  }
  initWithJSON(json) {
    for (var i = 0; i < json.objects.length; i++) {
      var object = new Object2D;
      object.initWithJSON(json);
      this.objects[i] = object;
    }
    for (var i = 0; i < json.actors.length; i++) {
      var actor = new MoveableObject();
      actor.initWithJSON(json);
      this.actors[i] = actor;
    }
    for (var i = 0; i < json.objects.length; i++) {
      var object = new Object2D;
      object.initWithJSON(json);
      this.objects[i] = object;
    }

  }

  createBackground() {
    this.backgroundFXLayer1A = new BackgroundLayer();
    this.backgroundFXLayer1A.init(0, 0, 0, 15, 8, "clouds_1", 1111);
    this.backgroundFXLayer1A.scrollingX = 0.01;

    this.backgroundFXLayer1B = new BackgroundLayer();
    this.backgroundFXLayer1B.init(30, 0, 0, 15, 8, "clouds_1", 1111);
    this.backgroundFXLayer1B.scrollingX = 0.01;

    this.backgroundFXLayer2A = new BackgroundLayer();
    this.backgroundFXLayer2A.init(0, 0, 0, 15, 8, "clouds_1", 1111);
    this.backgroundFXLayer2A.scrollingX = 0.005;

    this.backgroundFXLayer2B = new BackgroundLayer();
    this.backgroundFXLayer2B.init(30, 0, 0, 15, 8, "clouds_1", 1111);
    this.backgroundFXLayer2B.scrollingX = 0.005;


  }

  fx() {//Do all FX related stuff in the world
    // this.backgroundFXLayer1A.x -= this.backgroundFXLayer1A.scrollingX;
    // this.backgroundFXLayer1B.x -= this.backgroundFXLayer1B.scrollingX;
    // this.backgroundFXLayer2A.x -= this.backgroundFXLayer2A.scrollingX;
    // this.backgroundFXLayer2B.x -= this.backgroundFXLayer2B.scrollingX;

    // if (this.backgroundFXLayer1A.x < -this.backgroundFXLayer1A.width - 7) this.backgroundFXLayer1A.x = (this.backgroundFXLayer1B.width * 2) + this.backgroundFXLayer1B.x;
    // if (this.backgroundFXLayer1B.x < -this.backgroundFXLayer1B.width - 7) this.backgroundFXLayer1B.x = (this.backgroundFXLayer1A.width * 2) + this.backgroundFXLayer1A.x;
    // if (this.backgroundFXLayer2A.x < -this.backgroundFXLayer2A.width - 7) this.backgroundFXLayer2A.x = (this.backgroundFXLayer2B.width * 2) + this.backgroundFXLayer2B.x;
    // if (this.backgroundFXLayer2B.x < -this.backgroundFXLayer2B.width - 7) this.backgroundFXLayer2B.x = (this.backgroundFXLayer2A.width * 2) + this.backgroundFXLayer2A.x;

  }



  createGrid() {
    // Create a buffer for the cube's vertices.
    this.verticesBuffer = window.gl.createBuffer();
    // Select the cubeVerticesBuffer as the one to apply vertex
    // operations to from here out.
    window.gl.bindBuffer(window.gl.ARRAY_BUFFER, this.verticesBuffer);
    // Now create an array of vertices for the cube.
    this.vertices2D = [
      // Front face
      -this.tileWidth, -this.tileHeight, 0.0,
      this.tileWidth, -this.tileHeight, 0.0,
      this.tileWidth, this.tileHeight, 0.0,
      -this.tileWidth, this.tileHeight, 0.0,

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


  }


}

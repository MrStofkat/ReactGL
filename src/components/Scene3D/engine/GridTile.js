export default class GridTile {
  constructor() {
    this.id = 0;
    this.isBlocking = false;
    this.isTrigger = false;
    this.texture = undefined;
    this.x =0;
    this.y=0;
    this.z=0;
    this.size=0;
    this.tileWidth = 1;
    this.tileHeight = 1;
    this.normalsBuffer = undefined;
    this.verticesBuffer = undefined;
    this.textureBuffer = undefined;
    this.vertexIndexBuffer = undefined;
  }

  init(x, y, z, imgName, isBlocking) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.id = x * y * z;
    this.isBlocking = isBlocking;
    this.texture = window.sTextureLibrary.textures[imgName];

    this.create();
  }

  create() {
    // Create a buffer for the cube's vertices.
    this.verticesBuffer = window.gl.createBuffer();
    // Select the cubeVerticesBuffer as the one to apply vertex
    // operations to from here out.
    window.gl.bindBuffer(window.gl.ARRAY_BUFFER, this.verticesBuffer);
    // Now create an array of vertices for the cube.
    // this.x =0;
    // this.y=0;
    this.vertices2D = [
      // Front face
      (-this.tileWidth / 2) + (this.x * 1), (-this.tileHeight / 2) + (this.y * 1), this.z / 10,
      (this.tileWidth / 2) + (this.x * 1), (-this.tileHeight / 2) + (this.y * 1), this.z / 10,
      (this.tileWidth / 2) + (this.x * 1), (this.tileHeight / 2) + (this.y * 1), this.z / 10,
      (-this.tileWidth / 2) + (this.x * 1), (this.tileHeight / 2) + (this.y * 1), this.z / 10,

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
    window.gl.bufferData(window.gl.ARRAY_BUFFER, new Float32Array(vertexNormals), window.gl.STATIC_DRAW);

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


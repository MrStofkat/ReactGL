import React, { Component } from 'react';
import {Matrix, Vector, $V, $M} from './sylvester';
import World from '../../engine/World';
import Player from '../../engine/Player';
import {makePerspective} from './glUtils';
let shaderProgram = undefined;
let vertexPositionAttribute = undefined;
let textureCoordAttribute =  undefined;
let vertexNormalAttribute = undefined;
class Scene3D extends Component {

  constructor(props) {
    super(props);
    // sBuilder = new Builder();
    // sBuilder.createUI(document.getElementById("paletteContainer"));

  }

  componentDidMount() {

    window.gl = this.canvas.getContext("experimental-webgl");
    this.mvMatrixStack = [];

    this.objects = new Array();
    this.particles = new Array();
    this.world = new World();

    this.textureBuffer = this.world.textureBuffer;
    this.normalsBuffer = this.world.normalsBuffer;
    this.verticesBuffer = this.world.verticesBuffer;
    this.vertexIndexBuffer = this.world.vertexIndexBuffer;

    // Establish the perspective with which we want to view the
    // scene. Our field of view is 45 degrees, with a width/height
    // ratio of 640:480, and we only want to see objects between 0.1 units
    // and 1000.0 units away from the camera.
    this.screenWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    this.creenHeight = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
    this.perspectiveMatrix = makePerspective(60, this.screenWidth / this.screenHeight, 0.1, 1000.0);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    this.loadIdentity();

    window.window.gl.enable(window.gl.BLEND);
    window.window.gl.disable(window.gl.DEPTH_TEST);


    this.mvTranslate([0, 0, -8]);


    this.mvUniform = window.gl.getUniformLocation(shaderProgram, "uMVMatrix");
    this.nUniform = window.gl.getUniformLocation(shaderProgram, "uNormalMatrix");
    this.pUniform = window.gl.getUniformLocation(shaderProgram, "uPMatrix");


    this.player = new Player();
    this.player.init(0.5, 1, 0, 0.4, 1.0, "player", 10010);


    // Set up to draw the scene periodically.
    setInterval(this.drawScene, 30);

  }


  drawScene() {

    this.world.fx();

    window.gl.clearColor(0.3, .3, 1.0, 1.0);

    // Clear the canvas before we start drawing on it.
    window.gl.clear(window.gl.COLOR_BUFFER_BIT | window.gl.DEPTH_BUFFER_BIT);
    this.mvPushMatrix();

    this.normalMatrix = this.mvMatrix.inverse();
    this.normalMatrix = this.normalMatrix.transpose();

    window.gl.uniformMatrix4fv(this.nUniform, false, new Float32Array(this.normalMatrix.flatten()));
    window.gl.uniformMatrix4fv(this.pUniform, false, new Float32Array(this.perspectiveMatrix.flatten()));

    // Set the texture coordinates attribute for the vertices.
    window.gl.bindBuffer(window.gl.ARRAY_BUFFER, this.textureBuffer);
    window.gl.vertexAttribPointer(this.textureCoordAttribute, 2, window.gl.FLOAT, false, 0, 0);

    // Bind the normals buffer to the objects[i] attribute.
    window.gl.bindBuffer(window.gl.ARRAY_BUFFER, this.thinormalsBuffer);
    window.gl.vertexAttribPointer(this.vertexNormalAttribute, 3, window.gl.FLOAT, false, 0, 0);

    this.offsetX -= this.headingX;
    this.offsetY -= this.headingY;

    this.mvTranslate([this.offsetX, this.offsetY, 0]);
    this.setMatrixUniforms();

    //Draw the grid elements of the scene, these do not emit light so need the normal alpha blendfunc
    window.gl.blendFunc(window.gl.SRC_ALPHA, window.gl.ONE_MINUS_SRC_ALPHA);
    //mvTranslate([-8, -2, 0]);

    for (var z = 0; z < this.world.layers; z++) {
      for (var x = 0; x < this.world.width; x++) {
        for (var y = 0; y < this.world.height; y++) {
          if (this.world.grid[z][x]) {//check if we should render this grid element
            if (this.world.grid[z][x][y]) {
              if (this.texture === null || this.texture !== this.world.grid[z][x][y].texture) {
                window.gl.activeTexture(window.gl.TEXTURE0);
                this.texture = this.world.grid[z][x][y].texture;
              }
              window.gl.bindTexture(window.gl.TEXTURE_2D, this.texture);
              // Draw the face by binding the array buffer to the face's vertices
              // array, setting attributes, and pushing it to GL.
              window.gl.bindBuffer(window.gl.ARRAY_BUFFER, this.world.grid[z][x][y].verticesBuffer);
              window.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, window.gl.FLOAT, false, 0, 0);
              //mvTranslate([0, 1, 0]);
              window.gl.drawElements(window.gl.TRIANGLES, 6, window.gl.UNSIGNED_SHORT, 0);

            }
          }
        }
      }
    }


    this.mvTranslate([-this.offsetX, -this.offsetY, -this.offsetZ]);
    this.setMatrixUniforms();

    //start drawing player
    this.player.move(this.headingX, this.headingY);//for animation

    window.gl.bindTexture(window.gl.TEXTURE_2D, this.player.texture);
    // Set the texture coordinates attribute for the vertices.
    window.gl.bindBuffer(window.gl.ARRAY_BUFFER, this.player.textureBuffer);
    window.gl.vertexAttribPointer(textureCoordAttribute, 2, window.gl.FLOAT, false, 0, 0);

    // Draw the face by binding the array buffer to the face's vertices
    // array, setting attributes, and pushing it to GL.
    window.gl.bindBuffer(window.gl.ARRAY_BUFFER, this.player.verticesBuffer);
    window.gl.vertexAttribPointer(vertexPositionAttribute, 3, window.gl.FLOAT, false, 0, 0);
    window.gl.drawElements(window.gl.TRIANGLES, 6, window.gl.UNSIGNED_SHORT, 0);
    //end drawing player

    //Start drawing mouse pointer
    // this.mvTranslate([this.mouseX, -this.mouseY, 0]);
    // this.setMatrixUniforms();
    // window.gl.bindTexture(window.gl.TEXTURE_2D, sBuilder.selectedObject.texture);
    // // Set the texture coordinates attribute for the vertices.
    // window.gl.bindBuffer(window.gl.ARRAY_BUFFER, sBuilder.selectedObject.textureBuffer);
    // window.gl.vertexAttribPointer(textureCoordAttribute, 2, window.gl.FLOAT, false, 0, 0);

    // Draw the face by binding the array buffer to the face's vertices
    // array, setting attributes, and pushing it to GL.
    // window.gl.bindBuffer(window.gl.ARRAY_BUFFER, sBuilder.selectedObject.verticesBuffer);
    // window.gl.vertexAttribPointer(vertexPositionAttribute, 3, window.gl.FLOAT, false, 0, 0);
    // window.gl.drawElements(window.gl.TRIANGLES, 6, window.gl.UNSIGNED_SHORT, 0);
    //end drawing mouse pointer

    this.mvPopMatrix();
  }

  /// initShaders
  // Initialize the shaders, so WebGL knows how to light our scene.
  initShaders() {
    var fragmentShader = this.getShader(window.gl, "shader-fs");
    var vertexShader = this.getShader(window.gl, "shader-vs");

    // Create the shader program
    shaderProgram = window.gl.createProgram();
    window.gl.attachShader(shaderProgram, vertexShader);
    window.gl.attachShader(shaderProgram, fragmentShader);
    window.gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!window.gl.getProgramParameter(shaderProgram, window.gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program.");
    }

    window.gl.useProgram(shaderProgram);

    vertexPositionAttribute = window.gl.getAttribLocation(shaderProgram, "aVertexPosition");
    window.gl.enableVertexAttribArray(vertexPositionAttribute);

    textureCoordAttribute = window.gl.getAttribLocation(shaderProgram, "aTextureCoord");
    window.gl.enableVertexAttribArray(textureCoordAttribute);

    vertexNormalAttribute = window.gl.getAttribLocation(shaderProgram, "aVertexNormal");
    window.gl.enableVertexAttribArray(vertexNormalAttribute);
  }

  // Loads a shader program by scouring the current document,
  // looking for a script with the specified ID.
  getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    // Didn't find an element with the specified ID; abort.
    if (!shaderScript) {
      return null;
    }

    // Walk through the source element's children, building the
    // shader source string.
    var theSource = "";
    var currentChild = shaderScript.firstChild;

    while (currentChild) {
      if (currentChild.nodeType == 3) {
        theSource += currentChild.textContent;
      }
      currentChild = currentChild.nextSibling;
    }

    // Now figure out what type of shader script we have,
    // based on its MIME type.
    var shader;

    if (shaderScript.type == "x-shader/x-fragment") {
      shader = window.gl.createShader(window.gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = window.gl.createShader(window.gl.VERTEX_SHADER);
    } else {
      return null;  // Unknown shader type
    }

    // Send the source to the shader object
    window.gl.shaderSource(shader, theSource);

    // Compile the shader program
    window.gl.compileShader(shader);

    // See if it compiled successfully
    if (!window.gl.getShaderParameter(shader, window.gl.COMPILE_STATUS)) {
      alert("An error occurred compiling the shaders: " + window.gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

  // Matrix utility functions
  loadIdentity() {
    this.mvMatrix = Matrix.I(4);
  }

  multMatrix(m) {
    this.mvMatrix = this.mvMatrix.x(m);
  }

  mvTranslate(v) {
    this.multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
  }

  setMatrixUniforms() {
    window.gl.uniformMatrix4fv(this.mvUniform, false, new Float32Array(this.mvMatrix.flatten()));
  }

  mvPushMatrix(m) {
    if (m) {
      this.mvMatrixStack.push(m.dup());
      this.mvMatrix = m.dup();
    } else {
      this.mvMatrixStack.push(this.mvMatrix.dup());
    }
  }

  mvPopMatrix() {
    if (!this.mvMatrixStack.length) {
      throw ("Can't pop from an empty matrix stack.");
    }

    var mvMatrix = this.mvMatrixStack.pop();
    return mvMatrix;
  }

  mvRotate2Axis(angleX, angleY) {
    var inRadiansX = angleX * Math.PI / 180.0;
    var inRadiansY = angleY * Math.PI / 180.0;
    var rotMatrixX = Matrix.Rotation(inRadiansX, $V([0, 1, 0])).ensure4x4();
    var rotMatrixY = Matrix.Rotation(inRadiansY, $V([1, 0, 0])).ensure4x4();
    var endMatrix = rotMatrixY.x(rotMatrixX);

    this.mvMatrix = this.mvMatrix.x(endMatrix);
  }

  mvRotate(angle, v) {
    var inRadians = angle * Math.PI / 180.0;
    var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
    this.multMatrix(m);
  }

  render() {
    return (
      <canvas ref={(ref) => { this.canvas = ref; }} id="webgl">
      </canvas>
    );
  }
}
export default Scene3D;

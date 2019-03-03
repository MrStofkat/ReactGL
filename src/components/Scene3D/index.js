import React, { Component } from 'react';
var mvMatrixStack = [];
var shaderProgram;


class Scene3D extends Component {

  constructor(props) {
    super(props);
    // sBuilder = new Builder();
    // sBuilder.createUI(document.getElementById("paletteContainer"));

    this.objects = new Array();
    this.particles = new Array();
    this.world = new World();

    this.textureBuffer = world.textureBuffer;
    this.normalsBuffer = world.normalsBuffer;
    this.verticesBuffer = world.verticesBuffer;
    this.vertexIndexBuffer = world.vertexIndexBuffer;

    // Establish the perspective with which we want to view the
    // scene. Our field of view is 45 degrees, with a width/height
    // ratio of 640:480, and we only want to see objects between 0.1 units
    // and 1000.0 units away from the camera.
    screenWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    screenHeight = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
    perspectiveMatrix = makePerspective(60, screenWidth / screenHeight, 0.1, 1000.0);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    this.loadIdentity();

    gl.enable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);


    mvTranslate([0, 0, -8]);


    mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    nUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
    pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");


    player = new Player();
    player.init(0.5, 1, 0, 0.4, 1.0, "player", 10010);


    // Set up to draw the scene periodically.
    setInterval(this.drawScene, 30);

  }

  drawScene() {

    world.fx();

    gl.clearColor(0.3, .3, 1.0, 1.0);

    // Clear the canvas before we start drawing on it.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mvPushMatrix();

    var normalMatrix = mvMatrix.inverse();
    normalMatrix = normalMatrix.transpose();

    gl.uniformMatrix4fv(nUniform, false, new Float32Array(normalMatrix.flatten()));
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    // Set the texture coordinates attribute for the vertices.
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    // Bind the normals buffer to the objects[i] attribute.
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    offsetX -= headingX;
    offsetY -= headingY;

    mvTranslate([offsetX, offsetY, 0]);
    this.etMatrixUniforms();

    //Draw the grid elements of the scene, these do not emit light so need the normal alpha blendfunc
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    //mvTranslate([-8, -2, 0]);

    for (var z = 0; z < world.layers; z++) {
      for (var x = 0; x < world.width; x++) {
        for (var y = 0; y < world.height; y++) {
          if (world.grid[z][x]) {//check if we should render this grid element
            if (world.grid[z][x][y]) {
              if (texture === null || texture !== world.grid[z][x][y].texture) {
                gl.activeTexture(gl.TEXTURE0);
                texture = world.grid[z][x][y].texture;
              }
              gl.bindTexture(gl.TEXTURE_2D, texture);
              // Draw the face by binding the array buffer to the face's vertices
              // array, setting attributes, and pushing it to GL.
              gl.bindBuffer(gl.ARRAY_BUFFER, world.grid[z][x][y].verticesBuffer);
              gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
              //mvTranslate([0, 1, 0]);
              gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

            }
          }
        }
      }
    }


    mvTranslate([-offsetX, -offsetY, -offsetZ]);
    this.setMatrixUniforms();

    //start drawing player
    player.move(headingX, headingY);//for animation

    gl.bindTexture(gl.TEXTURE_2D, player.texture);
    // Set the texture coordinates attribute for the vertices.
    gl.bindBuffer(gl.ARRAY_BUFFER, player.textureBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    // Draw the face by binding the array buffer to the face's vertices
    // array, setting attributes, and pushing it to GL.
    gl.bindBuffer(gl.ARRAY_BUFFER, player.verticesBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    //end drawing player

    //Start drawing mouse pointer
    mvTranslate([mouseX, -mouseY, 0]);
    this.setMatrixUniforms();
    gl.bindTexture(gl.TEXTURE_2D, sBuilder.selectedObject.texture);
    // Set the texture coordinates attribute for the vertices.
    gl.bindBuffer(gl.ARRAY_BUFFER, sBuilder.selectedObject.textureBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    // Draw the face by binding the array buffer to the face's vertices
    // array, setting attributes, and pushing it to GL.
    gl.bindBuffer(gl.ARRAY_BUFFER, sBuilder.selectedObject.verticesBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    //end drawing mouse pointer

    this.mvPopMatrix();
  }

  /// initShaders
  // Initialize the shaders, so WebGL knows how to light our scene.
  initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    // Create the shader program
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program.");
    }

    gl.useProgram(shaderProgram);

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);

    textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(textureCoordAttribute);

    vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(vertexNormalAttribute);
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
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      return null;  // Unknown shader type
    }

    // Send the source to the shader object
    gl.shaderSource(shader, theSource);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

  // Matrix utility functions
  loadIdentity() {
    mvMatrix = Matrix.I(4);
  }

  multMatrix(m) {
    mvMatrix = mvMatrix.x(m);
  }

  mvTranslate(v) {
    multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
  }

  setMatrixUniforms() {
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
  }

  mvPushMatrix(m) {
    if (m) {
      mvMatrixStack.push(m.dup());
      mvMatrix = m.dup();
    } else {
      mvMatrixStack.push(mvMatrix.dup());
    }
  }

  mvPopMatrix() {
    if (!mvMatrixStack.length) {
      throw ("Can't pop from an empty matrix stack.");
    }

    mvMatrix = mvMatrixStack.pop();
    return mvMatrix;
  }

  mvRotate2Axis(angleX, angleY) {
    var inRadiansX = angleX * Math.PI / 180.0;
    var inRadiansY = angleY * Math.PI / 180.0;
    var rotMatrixX = Matrix.Rotation(inRadiansX, $V([0, 1, 0])).ensure4x4();
    var rotMatrixY = Matrix.Rotation(inRadiansY, $V([1, 0, 0])).ensure4x4();
    var endMatrix = rotMatrixY.x(rotMatrixX);

    mvMatrix = mvMatrix.x(endMatrix);
  }

  mvRotate(angle, v) {
    var inRadians = angle * Math.PI / 180.0;
    var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
    this.multMatrix(m);
  }

  render() {
    return (
      <div className="alinea">
      </div>
    );
  }
}
export default Scene3D;

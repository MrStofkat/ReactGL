
export default class TextureLibrary {

  constructor() {
    this.instance = undefined;
    this.textureList = ["clouds_1", "dirt", "player", "background", "grass", "ice_planet", "green_planet", "particle", "mars", "asteroid", "running", "cliff_bottom_center", "cliff_bottom_left", "cliff_bottom_right", "grass_left", "grass_center", "grass_right", "box", "cliff_center_left", "cliff_center", "cliff_center_right", "cliff_top_left", "cliff_top_center", "cliff_top_right", "flowers_0"];
    this.onFinished =  ()=> { };
    this.processing = false;
    this.currentName = undefined;
    this.textures = [];
    this.index = 0;
    this.onImageLoad = this.onImageLoad.bind(this);
    this.loadTexture = this.loadTexture.bind(this);
    this.load = this.load.bind(this);

  }


  loadTexture(imgName) {
    console.log("Loading texture:" + imgName);

    this.currentName = imgName;
    this.texture = window.gl.createTexture();
    this.image = new Image();
    this.instance = this;
    this.image.onload = this.onImageLoad;
    this.image.src = "img/" + imgName + ".png";
    if (!this.texture) alert("no txture found in init");
  }
  
  load(onFinished) {
    this.onFinished = onFinished;
    this.loadNext();
  }

  loadNext() {
    this.loadTexture(this.textureList[this.index]);
  }

  onImageLoad() {
    //console.log("done loading");
    var gl = window.gl;
    if (!this.instance.texture) alert("no texture found in callback!");
    if (!gl) alert("no gl context found!");
    if (!this.instance.image) alert("no image found!");
    gl.bindTexture(gl.TEXTURE_2D, this.instance.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.instance.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    this.instance.textures[this.instance.currentName] = this.instance.texture;
    //Done loading the image, now we can load the next one
    this.instance.index++;
    if (this.instance.index < this.instance.textureList.length) { this.instance.loadNext(); }
    else { this.instance.onFinished(); }
  }



}

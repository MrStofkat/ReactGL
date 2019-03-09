import Object2D from "./Object2D";

export default class Builder {
  constructor() {
    this.tileList = ["dirt", "grass", "cliff_bottom_center", "cliff_bottom_left", "cliff_bottom_right", "grass_left", "grass_center", "grass_right", "box", "cliff_center_left", "cliff_center", "cliff_center_right", "cliff_top_left", "cliff_top_center", "cliff_top_right", "flowers_0"];
    this.objectList = undefined;
    this.prefabs = undefined;
    this.selectedObject = undefined;
    this.createTiles = undefined;
    this.numberOfLayers = 3;
    this.selectedLayer = 0;
  }
  selectLayer(layer) {
    this.selectedLayer = layer;
  }



  selectTile(tileName) {
    this.selectedObject = new Object2D();
    this.selectedObject.init(0.5, .5, 0, .5, .5, tileName, 12);
  }
  
  createUI(view) {
    var palette = document.createElement('div');
    for (var i = 0; i < this.tileList.length; i++) {
      palette.innerHTML += "<div onclick='sBuilder.selectTile(\"" + this.tileList[i] + "\");' class='paletteItem'><img class='paletteImage' src='img/" + this.tileList[i] + ".png'/></div>";
      //div.setAttribute('class', 'myclass'); // and make sure myclass has some styles in css
    }
    view.appendChild(palette);
    var layers = document.createElement('div');

    for (var i = 0; i < this.numberOfLayers; i++) {
      layers.innerHTML += "<input onclick='sBuilder.selectLayer(\"" + i + "\");' type='radio' name='layer' value='" + i + "'> " + i + "<br>"

    }

    view.appendChild(layers);
    this.selectedObject = new Object2D();
    this.selectedObject.init(0.5, .5, 0, .5, .5, "dirt", 12);
  }


}
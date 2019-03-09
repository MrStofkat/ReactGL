/* 
 * InputHandler manages every type of input from keyboard/mouse to touchscreen 
 * but also game controller inputs
 *
 */

export default class InputHandler {

  constructor(source) {
    this.kKeyBoardLeft = 37;
    this.kKeyBoardRight = 39;
    this.kKeyBoardUp = 38;
    this.kKeyBoardDown = 38

    this.interface = null;
    this.forceX = 0;
    this.forceY = 0;
    source.onmousedown = handleMouseDown;
    source.onmouseup = handleMouseUp;
    source.onmousemove = handleMouseMove;
    source.addEventListener("touchstart", ()=> {
    }, false);

    source.addEventListener('keydown',  (event)=> {
      if (event.keyCode === this.kKeyBoardLeft) {
        //alert('Left was pressed');
        this.forceX = -.1;
      }
      else if (event.keyCode === this.kKeyBoardUp) {

        this.forceY = .1;
        //alert('Up was pressed');
      }
      else if (event.keyCode === this.kKeyBoardRight) {
        this.forceX = .1;
        // alert('Right was pressed');
      }

      else if (event.keyCode === this.kKeyBoardDown) {
        this.forceY = -.1;
        // alert('Down was pressed');
      }

    });

    source.addEventListener('keyup', (event)=> {
      if (event.keyCode === this.kKeyBoardLeft) {
        //alert('Left was pressed');
        this.forceX = 0;
      }
      else if (event.keyCode === this.kKeyBoardUp) {

        this.forceY = 0;
      }
      else if (event.keyCode === this.kKeyBoardRight) {
        this.forceX = 0;
        // alert('Right was pressed');
      }

      else if (event.keyCode === this.kKeyBoardDown) {
        this.forceY = 0;
        // alert('Down was pressed');
      }

    });
  }



  setControl(interface) {
    this.interface = interface;
  }

}

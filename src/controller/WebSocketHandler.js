// WIP we do not use this file yet
// in order to get better seperation of code I put this in a seperate class
// however due to the callback nature of the WEBRTC implementation it's hard
// to get a good seperation in the controller class

class WebSocketHandler {
  constructor(controller) {
    this.controller = controller;
    this.openWebSocket();
  }

  async openWebSocket() {
    this.webSocket = new WebSocket("wss://web.toffeeshare.com/wss/");
    this.webSocket.onmessage = (event) => {
      console.log('Got websocket event', event.data);
      //received a new connection key
      if (event.data.charAt(0) == 'k') {
        this.controller.connectionKey = event.data.substring(1, event.data.length);
        this.controller.shareUrl = API_URL + "/?" + this.connectionKey;
        //received a file info package
      } else if (event.data.charAt(0) == 'f') {
        // TODO: this below should become a lone 's', so not 'fs', but for now we do not want to change the websocketrelay service
        if  (event.data.charAt(1) == 's') {// request for download started      
          // Add senderConnection to global scope to make it visible
          // from the browser console.
          window.senderConnection = this.controller.senderConnection = new RTCPeerConnection(ICE_config);

          this.controller.sendChannel = this.senderConnection.createDataChannel('sendDataChannel');
          this.controller.sendChannel.binaryType = 'arraybuffer';
          this.controller.sendChannel.onopen = this.onSendChannelStateChange.bind(this);
          this.controller.sendChannel.onclose = this.onSendChannelStateChange.bind(this);
          this.controller.senderConnection.onicecandidate = this.iceSenderCallBack.bind(this);
          this.controller.senderConnection.createOffer().then(this.gotSenderDescription.bind(this), this.onCreateSessionDescriptionError.bind(this));

        } else {
          this.fileInfo = JSON.parse(event.data.substring(1, event.data.length));
          this.isReceiving = true;
          this.ui.onGotFileInfo(this.fileInfo.name, this.fileInfo.size);
        }
      } else if (event.data.charAt(0) == 'm') {// receiver is requesting file
        var ICE_config = {
          'iceServers': [
            {
              "urls": "stun:stun.l.google.com:19302"
            }, {
              "urls": "stun:stun.ipns.com"
            }
          ]
        };

        if (this.controller.isSender) {

          this.controller.fileInfo = {
            name: this.file.name,
            size: this.file.size
          };

          this.webSocket.send("f" + JSON.stringify(this.fileInfo));
        } else {

          window.receiverConnection = this.controller.receiverConnection = new RTCPeerConnection(ICE_config);
          //console.log('Created remote peer connection object receiverConnection');
          this.controller.receiverConnection.onicecandidate = this.iceReceiverCallBack.bind(this);
          this.controller.receiverConnection.ondatachannel = this.receiveChannelCallback.bind(this);
        }

      } else if (event.data.charAt(0) == 'd') {
        //console.log(event.data.substring(1, event.data.length));
        try {
          var rawJSON = event.data.substring(1, event.data.length);
          var fixedJSON = rawJSON.substring(0, rawJSON.indexOf("}")+1);
          var remoteDescriptionJSON = JSON.parse(fixedJSON);
        } catch (ex) {
          console.log('Error fixing JSON', ex);
          console.log('fixedJSON',fixedJSON);
          return;
        }
        var remoteDescription = new RTCSessionDescription(remoteDescriptionJSON);
        if (this.controller.isSender) {
          this.controller.senderConnection.setRemoteDescription(remoteDescription);

        } else {
          //console.log("now setting remote description");
          this.controller.receiverConnection.setRemoteDescription(remoteDescription);
          this.controller.receiverConnection.createAnswer().then(this.gotReceiverDescription.bind(this), this.onCreateSessionDescriptionError.bind(this));
        }
      } else if (event.data.charAt(0) == 'i') {
        try {
          var rawJSON = event.data.substring(1, event.data.length);
          var fixedJSON = rawJSON.substring(0, rawJSON.indexOf("}")+1);
          var iceCandidateJSON = JSON.parse(fixedJSON);
        } catch (ex) {
          console.log('Error fixing JSON', ex);
          console.log('fixedJSON',fixedJSON);
          return;
        }
        var iceCandidate = new RTCIceCandidate(iceCandidateJSON);

        if (this.controller.isSender) {
          this.controller.senderConnection.addIceCandidate(iceCandidate).then(this.onAddIceCandidateSuccess, this.onAddIceCandidateError);
        } else {
          this.controller.receiverConnection.addIceCandidate(iceCandidate).then(this.onAddIceCandidateSuccess, this.onAddIceCandidateError);
        }
      }
    }

    this.webSocket.onopen = (event) => {
      if (window.location.href.indexOf("?") !== -1) {
        this.controller.connectionKey = window.location.href.split("?")[1];
        //send connection key
        this.webSocket.send("c" + this.connectionKey);
      } else {
        //ask for connection key
        this.webSocket.send("r");
        this.controller.isSender = true;
      }

    };
  }
}

export default WebSocketHandler;
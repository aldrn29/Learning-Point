'use strict';

//getUserMedia() 호출시 어떤 트랙이 포함되는지 지정
const mediaStreamConstraints = {
  video: true,
};


// 스트림이 위치할 로컬비디오 html에서 param으로 접근한다.
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream;
let remoteStream;

let localPeerConnection;
let remotePeerConnection;

// 비디오 요소에 미디어스트림을 추가하는 function
function gotLocalMediaStream(mediaStream) {
  localStream = mediaStream; //param 값을 localStream에도,
  localVideo.srcObject = mediaStream;// 순서?
  trace('Received local stream.')
  startButton.disabled = false; //start버튼 누를 수 있게
}

// 예외처리 에러 로그 메시지
function handleLocalMediaStreamError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

//상대방 비디오를 가져올때
function gotRemoteMediaStream(event) {
  const mediaStream = event.stream; //이부분에서 상대 peer의 화면을 가져와야 하는거 아닌가?
  remoteVideo.srcObject = mediaStream;
}

// RTC peer connection 을 정의

// 새로운 peer 연결 new peer candidate로
function handleConnection(event) {
  const peerConnection = event.target;
  const iceCandidate = event.candidate;

  if(iceCandidate){
    const newIceCandidate = new RTCIceCandidate(iceCandidate);
    const otherPeer = getOtherPeer(peerConnection);

    otherPeer.addIceCandidate(newIceCandidate);

    // .then(() => {
    //   handleConnectionSuccess(peerConnection);
    // }).catch((error) => {
    //   handleConnectionFailure(peerConnection, error);
    // });

  }
}

// // Logs that the connection succeeded.
// function handleConnectionSuccess(peerConnection) {
//   trace(`${getPeerName(peerConnection)} addIceCandidate success.`);
// };

// // Logs that the connection failed.
// function handleConnectionFailure(peerConnection, error) {
//   trace(`${getPeerName(peerConnection)} failed to add ICE Candidate:\n`+
//         `${error.toString()}.`);
// }

// // Logs changes to the connection state.
// function handleConnectionChange(event) {
//   const peerConnection = event.target;
//   console.log('ICE state change event: ', event);
//   trace(`${getPeerName(peerConnection)} ICE state: ` +
//         `${peerConnection.iceConnectionState}.`);
// }

// 버튼 정의와 초기화
const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');
callButton.disabled = true;
callButton.disabled = true;

// 미디어 스트림 초기화
function startAction() {
  startButton.disabled = true;
  // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
    .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
  trace('Requesting local stream.');
}
  /* Navigator.mediaDevices는 읽기 전용 프로퍼티이며 MediaDevices 객체를 리턴한다.
  미디어 입력장치에 접근할 수 있도록 한다.
  */
  /*
  getUserMedia()호출 후 브라우저는 사용자에게 카메라 액세스 권한을 요청한다.
  성공하면 위에 정의한 function gotLocalMediaStream을 통해 MediaStream 이 반환된다.
  이는 srcObject속성을 통해 미디어 요소에서 사용할 수 있다.
  */

function callAction() {
  callButton.disabled = true;
  hangupButton.disabled = false;

  trace('Start calling');
  
  const videoTracks = remoteStream.getVideoTracks();
}

 // 버튼 클릭 이벤트 핸들러
 startButton.addEventListener('click', startAction);

 // 콘솔 로그 추적을 위한 함수
function trace(text) {
  text = text.trim();
  const now = (window.performance.now() / 1000).toFixed(3);

  console.log(now, text);
}
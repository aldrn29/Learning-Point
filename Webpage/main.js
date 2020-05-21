'use strict';

// On this codelab, you will be streaming only video (video: true).
const mediaStreamConstraints = {
  video: true,
};
/*
MediaStreamConstraints dictionary
반환 시 어떤 종류의 트랙이 포함되어야 하는지 지정하기 위해 
getUserMedia()를 호출할 때 사용된다. 
*/

// 스트림이 위치할 로컬비디오
const localVideo = document.querySelector('video');
/*
Document의 메서드 querySelector(DOMString selsector)는 선택된 selector 
또는 selsector 그룹과 일치하는 문서 내 '첫 번째 Element'를 반환한다. 
일치하는 요소가 없으면 null을 반환한다.
*/

// Local stream that will be reproduced on the video.
let localStream;
//let은 블록 유효 범위를 갖는 지역 변수이다.

// 비디오 요소에 미디어스트림을 추가하는 function
function gotLocalMediaStream(mediaStream) {
  localStream = mediaStream; //param 값을 localStream에도,
  localVideo.srcObject = mediaStream;//
}

// 예외처리 에러 로그 메시지
function handleLocalMediaStreamError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

// 버튼 정의
const startButton = document.getElementById('startButton');

// 미디어 스트림 초기화
function startAction() {
  startButton.disabled = true;
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

 // 버튼 클릭 이벤트 핸들러
 startButton.addEventListener('click', startAction);

 // 콘솔 로그 추적을 위한 함수
function trace(text) {
  text = text.trim();
  const now = (window.performance.now() / 1000).toFixed(3);

  console.log(now, text);
}
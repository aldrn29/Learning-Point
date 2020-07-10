# 인터페이스 설명
DOM 문서를 포함하는 창을 나타낸다. 현재 스크립트가 작동 중인 창을 나타내는 전역변수 `window`는 JavaScript 코드에 노출되어 있다. **즉 전역적으로 접근이 가능하다.**
탭이 있는 브라우저에서는 각각의 탭을 각각의 Window 객체로 나타냅니다. 주어진 탭에서 동작 중인 JavaScript 코드의 전역 window 객체는 항상 자신의 탭을 나타냅니다.

Methods || 
--|--
`confirm(message)` | return : `boolean`. OK를 클릭하면 `true`를 Cancel을 누르면 `false`를 반환한다. message는 선택적으로 보여지는 텍스트입니다.
`prompt(message)` | return : `string`. 사용자가 입력한 텍스트나 null을 반환합니다. message는 선택적으로 보여지는 텍스트입니다. 
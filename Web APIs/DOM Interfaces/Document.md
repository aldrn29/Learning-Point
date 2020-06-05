# Interface 설명
`Document` 인터페이스는 브라우저가 불러온 웹 페이지를 나타내며, 페이지 콘텐츠(DOM 트리)의 진입점 역할을 수행한다.

Constructor  ||
--|--
`Document()` | 

Properties||
--|--
`doctype`    | 현재 문서의 문서 형식 정의(Document Type Definition, DTD)를 반환합니다.

Methods||
--|--
특징 | `Node`와 `EventTarget` 인터페이스도 상속합니다.
`querySelector(DOMString selector)`    | 문서 내에서 주어진 `selector` 만족하는 첫 번째 Element를 반환합니다. 일치하는 요소가 없으면 `null`을 반환합니다.

# DOM이란?
DOM(The Document Object Model)이란 HTML, XML 문서의 프로그래밍 interface 입니다. DOM은 문서의 구조화된 표현을 제공하며 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공하여 그들이 문서 구조, 스타일, 내용 등을 변경할 수 있게 돕는다. DOM 은 구조화된 nodes와 property 와 method 를 갖고 있는 objects로 문서를 표현한다. 이들은 웹 페이지를 스크립트 또는 프로그래밍 언어들에서 사용될 수 있게 연결시켜주는 역할을 담당합니다.

# Interfaces

## Document
`Document` 인터페이스는 브라우저가 불러온 웹 페이지를 나타내며, 페이지 콘텐츠(DOM 트리)의 진입점 역할을 수행한다.

Constructor  ||
--|--
`Document()` | 

Properties||
--|--
`Document.doctype`    | 현재 문서의 문서 형식 정의(Document Type Definition, DTD)를 반환합니다.

Methods||
--|--
특징 | `Node`와 `EventTarget` 인터페이스도 상속합니다.
`Document.querySelector()`    | 문서 내에서 주어진 선택자를 만족하는 첫 번째 Element를 반환합니다.

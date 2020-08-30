# CHAPTER 1. 타입

`타입`이란 자바스크립트 엔진, 개발자 모두에게 어떤 값을 다른 값과 분별할 수 있는, 고유한 내부 특성의 집합이다.

## 자바스크립 7가지 내장 타입
- null
- undefined
- boolean
- number
- string
- object
- symbol(ES6 추가)

`objec 를 제외한 타입들을 원시 타입(Primitives)` 이라 한다.

## typeof 연산자
```js
typeof undefined === 'undefined'; //true
typeof true === 'boolean'; //true
typeof 42 === 'number'; //true
typeof '42' === 'string'; //true
typeof { life: 28 } === 'object'; //true

//ES6부터 추가
typeof Symbol() === 'symbol'; //true
```

### null 은 좀 특별하다.
```js
typeof null === 'object'; //true

//null값을 확인하려면
var a = null;
(!a && typeof a === 'object'); //true
```
### function
```js
typeof function a(){} === 'function'; //true
//함수는 호출가능한 '객체'이다. (Callable Object)
```
### array
```js
typeof [1, 2, 3] === 'object'; //true
//배열은 숫자인덱스를 가지며 length 프로퍼티가 자동으로 관리되는 등의 추가특성을 지닌, 객체의 '하위 타입' 이다.
```

## 값은 타입을 가진다
값에는 타입이 있지만, 변수엔 따로 타입이란 없다. 변수는 언제라도, 어떤 형태의 값이라도 가질 수 있다. 변수에 typeof 연산자를 대어보는 건 '이 변수의 타입이 무엇이니?'라는 질문과 같지만, 실은 타입이란 개념은 변수에 없으므로 정확히는 '이 변수에 들어있는 값의 타입은 무엇이니?'라고 묻는 것이다.

## 값이 없는 vs 선언되지 않은
- undefined(값이 없는) - 접근 가능한 스코프에 변수가 선언되었으나 현재 아무런 값도 할당되지 않은 상태.
- undeclared(선언되지 않은) - 접근 가능한 스코프에 변수 자체가 선언조차 되지 않은 상태.

### 선언되지 않은(undeclared) 변수의 typeof 연산 결과
```js
var a;
typeof a; // 'undefined'
typeof b; // 'undefined' => 선언되지 앟은 변수에 typeof 연산을 수행해도 오류 처리를 하지 않는다. (typeof만의 독특한 안전 가드)

//typeof 의 안전가드 덕분에 DEBUG 변수가 선언되지 않은경우도 ReferenceError 없이 처리할 수 있다.
if (typeof DEBUG !== 'undefined') {
    console.log('디버깅을 시작합니다');
}
```

## 정리하기
- 자바스크립트에는 7가지 내장 타입(null, undefined, boolean, string, object, symbol) 이 있으며, typeof 연산자로 타입명을 알아낸다.
- 변수는 타입이 없지만 값은 타입이 있고, 타입은 값의 내재된 특성을 정의한다.
- 자바스크립트 엔진은 undefined 와 undeclared 를 다르게 취급한다. undefined 는 선언된 변수에 할당할 수 있는 값이지만, undeclared 는 변수 자체가 선언된 적이 없음을 나타낸다. typeof 반환값은 둘 다 'undefined' 로 뭉뚱그린다.
- 그래도 에러를 내지 않는 typeof 안전 가드 덕분에 선언되지 않은 변수에 사용하면 제법 쓸 만하다.



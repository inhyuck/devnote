# CHAPTER 2. 값 

## 2.1 배열
자바스크립트 배열은 타입이 엄격한 다른 언어와 달리 문자열, 숫자, 객체 심지어 다른 배열이나 어떤 타입의 값이라도 담을 수 있는 그릇이다.
- 일반적으로 배열에 문자열 타입의 키/프로퍼티를 두는 건 추천하고 싶지 않다. 그렇게 해야 한다면 객체를 대용하고 배열 원소의 인덱스는 확실히 `숫자`만 쓰자.

### 2.1.1 유사 배열
유사 배열 예 - DOM 쿼리 작업 수행 후 반환되는 배열, 함수 내 arguments 등
```js
Array.prototype.slice.call( arguments );
Array.from( arguments ); //ES6
```

## 2.2 문자열
자바스크립트 문자열은 실제로 생김새만 비슷한 뿐 문자 배열과 같지 않다. (유사배열)
- 문자열도 length 프로퍼티, indexOf(), concat() 메서드를 가진다.
- 문자열은 불변 값(immutable) 이지만 배열은 가변 값(mutable) 이다.
- 문자열의 특정 문자를 접근하는것은 charAt() 메소드로 접근하는 것이 맞다. (a[0] 과 같이 배열처럼 접근하는 방식은 문법에러로 인식하는 브라우저도 있다)
- 문자열은 불변 값이므로 문자열 메서드는 그 내용을 바로 변경하지 않고 항상 새로운 문자열을 생성한 후 반환한다. 반면 대부분의 배열 메서드는 그 자리에서 곧바로 원소를 수정한다.

문자열을 다룰 때 유용한 대부분의 배열 메서드는 문자열에 사용할 수 없지만, 불변 배열 메서드를 빌려 쓸 수는 있다.
```js
var a = 'foo';
a.join; //undefined

var b = Array.prototype.join.call(a, '-'); //불변 메서드 빌려 쓰는 것 가능
b; //'f-o-o';

Array.prototype.reverse.call(a); //가변 메서드는 빌려 쓰는 것도 안된다 :(
```
## 2.3 숫자
자바스크립트의 숫자 타입은 number 가 유일하며 정수, 부동 소수점 숫자를 모두 아우른다.

### 2.3.1 숫자 구문
```js
var a = 42;
var b = 42.2;
var c = 5E10; //아주 크거나 아주 작은 숫자는 지수형으로 표시. a
c.toExponential(); //'5e+10'

var d = 42.59;
d.toFixed(3); //'42.590' toFixed() 메서드는 지정한 소수점 이하 자릿수까지의 숫자를 보여준다
d.toPrecision(3); //'42.6' toPrecision() 메서드는 유효 숫자 개수를 지정할 수 있다

var onethousand = 1E3; //1 * 10^3 큰 숫자는 보통 지수형으로 표시한다
var e = 0xf3; //243 16진수 표현
var f = 0o363; //243 8진수 표현
var g = 0b11110011; //243 2진수 표현 
```

### 2.3.2 작은 소수 값
```js
0.1 + 0.2 === 0.3; //false
```
부동 소수점으로 나타낸 0.1과 0.2는 원래의 숫자와 일치하지 않는다. 따라서 둘을 더한 결과 역시 정확히 0.3이 아니다. 
- 부동 소수점을 사용하는 경우는 드물다.
- 미세한 반올림 오차를 허용 공차로 처리하는 방법이 있다. 미세한 오차를 머신 입실론 이라고 하는데, 자바스크립트 숫자의 머신 입실론은 2^-52 이다. 
- ES6부터는 이 값이 Number.EPSILON 으로 미리 정의되어 있다.
```js
//Number.EPSILON 으로 두 숫자의 (반올림 허용 오차 이내의) 동등함을 비교할 수 있다.
function numbersCloseEnoughToEqual(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON;
}
var a = 0.1 + 0.2;
var b = 0.3;
numbersCloseEnoughToEqual(a, b); //true
numbersCloseEnoughToEqual(0.000001, 0.000002); //false

//부동소숫점 숫자의 최댓값, 최솟값
Number.MAX_VALUE; //1.798e+308
Number.MIN_VALUE; //5e-324 음수는 아니지만 거의 0에 가까운 숫자
```

### 2.3.3 안전한 정수 범위
정수는 Number.MAX_VALUE 보다 훨씬 작은 수준에서 안전 값의 범위가 정해져있다.
```js
Number.MAX_SAFE_INTEGER; //2^53 - 1, 9007199254740991
Number.MIN_SAFE_INTEGER; //-(2^53 - 1), -9007199254740991
```
자바스크립트 프로그램에서 이처럼 아주 큰 숫자에 맞닥뜨리는 경우는 데이터베이스 등에서 64비트 ID를 처리할 때가 대부분이다. 64비트 숫자는 숫자 타입으로 정확하게 표시할 수 없으므로 (보내고 받을 때) 자바스크립트 string 타입으로 저장해야한다.

### 2.3.4 정수인지 확인
```js
Number.isInteger(42); //true
Number.isInteger(42.3); //false

//안전한 정수 여부 (ES6)
Number.isSafeInteger(Number.MAX_SAFE_INTEGER); //true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1); //false
```

### 2.3.5 32비트 (부호있는) 정수
정수의 안전 범위가 대략 9천 조(53비트)에 이르지만, 32비트 숫자에만 가능한 연산(비트연산)이 있으므로 실제 범위는 훨씬 줄어든다.
- 정수의 안전 범위 Math.pow(-2, 31) ~ Math.pow(2, 31)-1 //-21억 ~ +21억

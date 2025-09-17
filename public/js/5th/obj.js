// obj.js
let obj = {};
let obj2 = obj;

console.log(obj == obj2);

let obj3 = {};
console.log(obj == obj3);

obj.name = `Hun`;
obj.age = 20;

obj3.name = `Hun`;
obj3.age = 20;
console.log(obj == obj3);
console.log(`obj.name => ${obj.name}`);
console.log(`obj2.name => ${obj2.name}`);
obj2.name = 'dddd'
console.log(`obj2.name => ${obj2.name}`);
console.log(`obj.name => ${obj.name}`);
console.log(obj, obj3)

// 원시 데이터 타입
let str1 = 'hong';
let str2 = 'hong';

let ary = [];
console.log(str1 == str2);
console.log(`str1 type is > ${typeof(str1)}`);
console.log(`obj3 type is > ${typeof(obj3)}`);
console.log(`obj3.age type is > ${typeof(obj3.age)}`);
console.log(`obj3.name type is > ${typeof(obj3.name)}`);
console.log(`null type is > ${typeof(null)}`);
console.log(`ary type is > ${typeof(ary)}`);
obj.equals

str1 = 10;
str2 = '10';
console.log(`Value \n str1 == str2 => ${str1 == str2}`);
console.log(`Value & Type \n str1 === str2 => ${str1 === str2}`);

// 함수 정의식 vs 함수 표현식
// 함수 정의 식(정의식으로 구분하지만 내부적으로는 정의식과 표현식이 동일하다)
// function sum(n1, n2) {
//   return n1 + n2;
// }

// 함수 표현식
// const sum = function (n1, n2) {
//   return n1 + n2;
// }

// 간략화된 함수 표현식 ' => '을 사용하는 화살표 함수.
// const sum = (n1, n2) => {
//   return n1 + n2;
// }

// 간략화된 함수 표현식의 내용이 1줄 일때 극한으로 줄인 => 화살표 함수
// const sum = (n1, n2) => n1 + n2;

// sum()이나 sum(0, )같은거 넣으면 개지랄나니까 예외처리해줘야함.
// const sum = (n1, n2) => {
//   if (n2 == undefined) {
//     if (n1 == undefined) {
//       return null;
//     }
//     return n1;
//   }
//   n1 + n2
// };

// 값이 안 들어오면 초기값을 대입해서 함수를 진행하겠슙니다. 라는 뜻의 
// 진짜 찐막 최종 리얼 라스트 극한 압축 함수
const sum = (n1 = 0, n2 = 0) => n1 + n2;


console.log(sum);
console.log(sum(sum(1, ),sum(3, 6) )); //Not a Number

// [23, 10, 17, 45].forEach((item, index, ary) => console.log(`\nitem is ${item}`));
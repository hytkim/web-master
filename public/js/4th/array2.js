// array2.js

// 변수를 상수(const)로 정의하겠다, 상수는 변경할 수없지만, 고정된 배열의 안에있는 배열요소를 바꾸는것은가능하다.
const numAry = new Array(); // new Array() == []; Array라는 객체를 선언하겠다인데 []가 직관적이라서 이걸쓰라고한다.
numAry.push(10); //배열자체가 바뀌는것이 아니라 배열에 소속된 값이 바뀌는것이라 가능함
// numAry = [];// 상수는 재할당이 불가능. = numAry를 새로운 배열로 대체하겠다(빨간줄생김)
numAry.push(25); // [10, 25]

// forEach는 배열변수에서만 사용가능함,
// 함수를객체로 처리가능한 1급함수인 foreach는 매개변수의 역할들이 최대 3개로 고정되어있다
// numAry.forEach(function (item, index, ary) {
//   console.log(item, index, ary);
//   console.log(item);
// });

//[10, 25]
numAry.splice(2, 0, 34); // [10, 25, 34] 
numAry.unshift(47); // [47, 10, 25, 34] 
numAry.splice(2, 0, 33); // [47, 10, 33, 25, 34]
numAry.splice(2, 0, 22, 19); // [47, 10, 22, 19, 33, 25, 34]

let sum = 0;

numAry.forEach(function (item, idx, ary) {
  // console.log(item);
  if (idx == 0 || idx == numAry.length - 1) {
    sum += item;
    console.log(`${idx}: ${item}`);
  }
});
console.log(`${numAry}의 모든 even idx item의 합계: ${sum}`);
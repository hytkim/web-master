// test2.js
console.clear();

let f = [{
  name: "점심호랑",
  height: 1577
}, {
  name: "배고픈치타",
  height: 1577
}];

if (f[0].height >= f[1].height) {
  if (f[0].height == f[1].height) {
    console.log(f[0].name + "과 " + f[1].name + "는 엄대엄이다");
  } else {
    console.log(f[0].name + "이 " + f[1].name + "보다 크다");
  }
} else {
  console.log(f[0].name + "이 " + f[1].name + "보다 작다");
}

// 입력값 받는 함수
// let n3 = prompt("숫자를 입력하세요: ");
// console.log(n3);
// if(n3 % 2 == 0){
//   console.log(n3+ "is even");
// }
// else if(n3 % 2 == 1){
//   console.log(n3+ "is odd");
// }
// else{
//   console.log("히히 문자 발싸");
// }
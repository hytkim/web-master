// test3.js
console.clear();

// 입력값 받는 함수
let n4 =  parseInt(prompt("숫자를 입력하세요: "));
let n5 =  parseInt(prompt("숫자를 입력하세요: "));
let res2 = n4 +n5;
if(res2 % 3 == 0){
  console.log((res2)+"는 3의 배수였읍니다.");
}
else{
  console.log((res2)+"는 3의 배수가 아닙니다.");
}
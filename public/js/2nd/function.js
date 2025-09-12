// function

// function calc() {
//   let n1, n2;
//   n1 = parseInt(prompt("n1에 값을 입력하세요: "));
//   n2 = parseInt(prompt("n2에 값을 입력하세요: "));

//   let res = (n1+n2);
//   console.log(`res= ${res}`);
//   console.log(`res%7= ${res%7 }`);
// }
// calc();
// 전역(global) 변수

// function sum(){ //sum 함수의 지역(local) 
//   let n1, n2;
//   n1 = parseInt(prompt("n1에 값을 입력하세요: "));
//   n2 = parseInt(prompt("n2에 값을 입력하세요: "));

//   let res = (n1+n2);
//   console.log(`n1(${n1}) + n2(${n2}) = ${res}`)
//   alert(res);
// }
// sum();


let num1 = 10;
let num2 = 20;
// function sum2(n1, n2){
//   let res = n1 + n2;
//   console.log(`${n1} + ${n2}의 결과는 => ${res}`);
// }

// sum2(num1, num2);
// sum2('abc', 18);

function sum2(몰루1, 몰루2) {
  let res = 몰루1 + 몰루2;
  console.log(`${몰루1} + ${몰루2}의 결과는 => ${res}`);
}
// sum2(num1, num2);

let n1 = 10;
let n2 = 20;

{
  let n2 = 2;
  console.log(`n2 => ${n2}`);
}
  console.log(`n2 => ${n2}`);

function vf() {
  let n1 = 100;
  console.log(`vf.n1 = ${n1}`);
  n1 = 2000;
  console.log(`vf.n1 = ${n1}`);
}
console.log(`function.js.n1 = ${n1}`);
vf();
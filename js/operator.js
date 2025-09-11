// operator.js

let n1 = 10;
let n2 = 20;
let res;

console.log(res);
// res = n1 % n2;

// JavaScript의 연산은 왼쪽에서 오른쪽으로가면서 순차적으로 계산해나가는듯
// (문자+숫자) +숫자 순서대로 진행되어서 (문자열 +숫자)= 문자열 한 후에 (문자열)+숫자 => 문문문자열이 된다.
console.log("문자열이 함께 계산된다면? " + n1 + n2);
// 여기선 괄(호 )를 쓰죠
console.log("문자열이 함께 계산된다면? " + (n1 + n2));
console.log(n1 + n2 + "로꾸거 ?면다한");

n1 = 425;
// Js에서는 ""랑 ''랑 같으시다
console.log( '나무쥐: '+ (n1 % n2) );
console.log( '나무쥐: '+ (n1 % 2) );

if(n1 % 2 == 0){
  console.log("even");
}
else{
    console.log("odd");
}

res = n1 % 2 == 1;
if(res){
  // console.log("res is even");
  console.log("res is odd");
}

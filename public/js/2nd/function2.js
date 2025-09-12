// function2.js - gugu 3dan

// function multiplication(_dan){
//   let dan = _dan;
//   for (let i = 1; i < 10; i++) {
//     console.log(`${dan} * ${i} = ${dan*i}`);
//   }
// }
// multiplication(4);

// function shwoMax(n1, n2){
//   if (n1 > n2) {
//     console.log(`${n1}이 더 큽니다.`);
//   } else if (n1 , n2) {
//     console.log(`${n2}이 더 큽니다.`);
//   } else{
//     console.log(`${n1}와 ${n2}은 동등합니다.`);
//   }
// }
// shwoMax(10, 7)

//매개변수 2개를 받아서 두 수를 포함한 두 수 사이의 모든 정수의 합을 구함
function sumBy2(_n1, _n2) {
  let sum = 0;
  let min, max;
  if (_n1 <= _n2) {
    min = _n1;
    max = _n2;
  } else {
    min = _n2;
    max = _n1;
  }

  for (let i = min; i <= max; i++) {
    sum += i;
  }
  console.log(`${min} ~ ${max}까지의 모든 정수의합 => ${sum}`);
}
sumBy2(50, 25);
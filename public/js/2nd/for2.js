// for2.js

let sum = 0;
// sum += 1;

// for (let i = 1; i <= 10; i++) {
//   // if (i%2==0) {
//   //  console.log(`even하게 익은 i의 값은: ${i}`); 
//   // }
//   sum += i;
//   if (sum >= 30) {
//     console.log(`sum의 값이 30이상(${sum})이므로, i의 값은: ${i}`); 
//   }
// }


// for (let i = 1; i <= 100; i++) {
//   if (i % 3 == 0) {
//     console.log(`sum(${sum}) + 3의 배수인 i(${i}) 값은: ${sum+i}`);
//     sum += i;
//   }
// }

// let even = 0;
// let odd = 0;
// for (let i = 0; i <= 100; i++) {
//   if (i % 2 == 0) {
//     even += i;
//   } 
//   if (i % 3 == 0) {
//     odd += i;
//   }
// }
// console.log(`2의 배수의 합: ${even}`);
// console.log(`3의 배수의 합: ${odd}`);


// let ran = 0;
// while(true){
//   ran = ;
//   if (ran == 1 || ran == 0) {
//     console.log(`ran의 값은!!! ${ran}`);
//     break;
//   }
// }
let r = 0;
let even_r = 0;
let threeven_r = 0;
for (let i = 0; i < 100; i++) {
  r = parseInt(Math.random() * 10) + 1;
  if (r % 2 == 0) {
    console.log(`\n even_r(${even_r}) + 2의 배수인 r의 값${r} => ${even_r+r}`);
    even_r += r;
  }
 if (r % 3 == 0) {
    console.log(`\n threeven_r(${threeven_r}) 3의 배수인 r의 값${r} => ${threeven_r+r}`);
    threeven_r += r;
  }
}
// while.js

// let i = 1;
// while (i <= 10) {
//   console.log(`현재 i의 값은 => ${i}, \n 1 증가된 i의 값은 =>${i}`);
//   i++;
// }

let star = 0;
while (true) {
  let r = parseInt(Math.random()*10);
  console.log(`Random Value => ${r}`);
  if (r == 0) {
    console.log(`r의 값이 => ${r}이므로 while,,,부순다고,,,,`);
    break;
  }   
  star++;
}
for (let i = 0; i < star; i++) {
  document.write('*');
}
console.log(`###################\n \t end of prog. \n###################`);
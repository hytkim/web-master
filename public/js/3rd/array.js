// Array.js

let fruits = ['apple', '딱복', 'orangi', '참?외'];
console.log(fruits[1]);

fruits[1] = 'melong';
console.log(fruits[1]);
console.clear();

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

console.clear();
let stds = [{sno: 101, sna: "rr", sco: 80 },
  {sno: 201, sna: "ss", sco: 85 },
  {sno: 301, sna: "dd", sco: 88 }
];

let str = `<ul>`;
for (let i = 0; i < stds.length; i++) {
  str += `<li>학생버노: ${stds[i].sno}, 이름: ${stds[i].sna}, 점수: ${stds[i].sco}</li>`;
  // document.writeln('stds: '+stds[i].sna);
  // console.log(stds[i]);
}
str += `</ul>`;
document.writeln(str);
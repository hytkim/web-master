// destructuring.js -> 객체와 배열을 편하게쓰겠다.

const person = {
  name: "다람쥐",
  age: 20
}

// 옛날방식
// let na = person.name; // name: '다람쥐'
// let age = person.age; // age: 18

// 객체 destructuring: 객체의 key값과 동일하게 맞춰줘야한다.
let {
  name,
  age
} = person;
let {
  a,
  b
} = person;
console.log(`${name+age}`);
console.log(`${a+b}`);

// 배열 destructuring
const nAry = [10, 20, 30];
let [n1, n2, n3] = nAry;
console.log(`n1, n2, n3 => ${n1, n2, n3}`);

// 배열메소드: forEach(), map(): A-> A', filter(), reduce()

const stAry = [
  { sno: 100, sna: `다람쥐`, score: 80 },
  { sno: 200, sna: `람-썬!`, score: 90 }, 
  { sno: 300, sna: `람-웥ter`, score: 70 },
];

// const newAry = [];
// stAry.forEach((item, index, ary) => {
//   if (item.score >= 80) {
//     newAry.push(item)
//   }
// });
// console.log(newAry);

// const newAry = stAry.filter(item => {
//   return item.score >= 80? true : false;
// });
// console.log(newAry);

// Array.map(item => { }) => Array의 특징의일부를 가진 다른 배열 Array`를 생성
// 그냥방식: 효율좀별로임
// const newAry = stAry.map(item => {
//   const obj = {}
//   obj.sno = item.sno;
//   obj.sna = item.sna;
//   return obj;
// });

// 객체 디스트럭처링(destructuring) 방식: 속성이름변경가능 
const newAry = stAry.map(item => {
  const { sno: sn, sna: na} = item;
  return { sn, na};
});
console.log(newAry);

// 극한 압축 디스트럭처링(destructuring)방식: 코드를 극한까지 줄여서 좀 더 효율적임
const newAry2 = stAry.map(item => {
  const { sno, sna} = item;
  return { sno, sna};
});
console.log(newAry2);
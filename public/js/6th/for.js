// for.js
let nAry = [10, 20, 30, 40, 50];
let sum = 0;
// for of => for (let n of Ary): 배열의 갯수만큼, 
// 하나씩 요소를 가져와서 반복하는 item밖에 없는 foreach문 같은거 
// 이거쓸바에 foreach나 한번더 쓰라는 교수님 이야기 있음.
for (let n of nAry) {
  sum += n;
}
console.log(sum); console.clear();

// for .. in .. 객체. 
let std = {
  son: 100,
  sna: "람쥐",
  sco: 80
};
// 객체가 가진 속성을 순회하면서 실행
for(let prop in std){
  // std.prop는 불가능함, std.prop라는 속성이 진짜 있어야만 되는거임이건
  console.log(prop, std[prop]);
}
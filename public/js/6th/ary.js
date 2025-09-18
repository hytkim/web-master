// ary.js

const nams = ['김길동', '박길동', '짭히찬', '김하찬', '최민우', '민우민우', '이동길', '최길동', '갈!길동', '홍길동', ];

// filter() => true값에 해당하는 요소들을 새로운 배열에 저장
// 배열의 개수만큼 순회하다가. 필터에정의된 
// 함수의 조건을 보고 true일때 해당요소를 새로운 배열에 저장.
// return item.indexOf('민우') != -1 ? true : false;
const res = nams.filter((item) => item.indexOf('김') == 0 );
console.log(res);

const nbs = [23,44,22,57,80,19];
const res2 = nbs.filter((item) => item%2==0);

console.log(res2);

// map() => A > A'
const m = [{sno:100, sna:"람ㅆ", sc: 80},
  {sno:200, sna:"쌀람각", sc: 75},
  {sno:300, sna:"힌디히찬", sc: 35},
  {sno:400, sna:"신창섭", sc: 95}];

// const m1 = m.map(item => {
//   let {sno, sna} = item;
//   isPass = item.sc > 60 ? "pass" : "fail";
//   return {sno, sna, isPass};
// });
// console.log(m1);

// const m2 = m.map(item => {
//   let {sno, sna, sc:합격여부} = item;
//   합격여부 = item.sc > 60 ? "pass" : "fail";
//   return {sno, sna, 합격여부};
// });
// console.log(m2);

// m2.forEach((item) => {
//   if (item.합격여부 == 'pass') {
//     console.log(`${item.sna} is Passed`);
//   }
// });

// m.map(item => {
//   let {sno, sna, sc:합격여부} = item;
//   합격여부 = item.sc > 60 ? "pass" : "fail";
//   return {sno, sna, 합격여부};
// })
// .forEach((item) => {
//   if (item.합격여부 == 'pass') {
//     console.log(`${item.sna} is Passed`);
//   }
// });

m.map(item => {
  let {sno, sna, sc:합격여부} = item;
  합격여부 = item.sc > 60 ? "pass" : "fail";
  return {sno, sna, 합격여부};
}).filter((item) => item.합격여부 == "pass")
.forEach((item) => { console.log(item); });

console.clear();
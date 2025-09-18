// 6th > string.js
let name = `RamG`;
let age = 20;
let res = `미성년`;

console.log(`${name}`);
console.log(`name == RamG => ${name == 'RamG'}`);

let obj = {
  na: 'na',
  bt: "o",
  show() {return this.na+this.bt}
}

// if (age >= 20) {
//   res = "성인";
// }
// 3항 연산자.
res = age >= 20 ? "adult" : "kid"; 

// console.log(`${name}은 ${res}입니다.`);
// ``백틱이 사용되는문자열에 추가되는 템플릿-리터럴( ${} )에는 
// if() else문은 안되지만, 3항연산자는 들어간다.
console.log(`${name}은 ${age >= 20 ? "adult" : "kid"}입니다.`);

console.log(`${'hello, world'.indexOf('w')}`);
console.log(`${'띵명식, 띵명식, 세븐나이띵츠리붫th'.indexOf('슝솩')}`);

console.clear();
let f = ["띵명식", "띵조", "세븐나이띵츠리붫th"];
// index of를사용하여 특정문자가 포함되거나, 특정문자로 시작되는 문자를 문자배열에서 찾아낼수있다
f.forEach((item, index, ary) => {
  // console.log(`${index}`);
  //이렇게 해도 되지만
  // if (item=="띵명식") { console.log(`${item}`); }
  // index of를 사용한다면! 해당문자열이 
  // if (item.indexOf("띵조") != -1) { console.log(`${item}`); }
  if (item.indexOf("띵") == 0) { console.log(`띵씨 성, 맞네 코레안은 성의 인덱스가 무조건 0 이니까\n 띵씨 성인 사람은: ${item}`); }
  // console.log(`${item}`);
  // console.log(`${ary}`);
})

// 원시데이터타입은 '객체'에만 메소드가 있는데
// 문자열 <-> 문자열객체(new String("Hellow")): 문자열 원시데이터와 
// .을 쓰면 문자열객체가 자동으로 형변환이 일어난다. 이게있어서
// 메소드반환값으로 메소드를 사용하고 그 반환값으로 메소드를 사용하는 => 메소드체인이 가능하다.

//slice(start, end) => 복합 문자열에서 [start]위치부터 [end-1]위치까지 잘라서반환
// `pizza, orange, cereals`.slice(0, 5);
// console.log(`${"pizza, orange, cereals".slice(0, 5)}`);
// console.log(`${"pizza, orange, cereals".slice(-7)}`);
// console.log(`${"pizza, orange, cereals".slice(7, 13)}`);
console.log(`${"pizza, orange, cereals".substring(0, 5)}`); //pizza
console.log(`${"pizza, orange, cereals".substring(0, 5).toUpperCase()}`); //pizza
console.log(`${"pizza, orange, cereals".substring(5, 0)}`); //pizza
console.log(`${"PIZZA, orange, cereals".substring(5, 0).toLocaleLowerCase()}`); //pizza

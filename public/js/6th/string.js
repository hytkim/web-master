// 6th > string.js
let name = `RamG`;
let age = 20;
let res = `미성년`;

console.log(`${name}`);
console.log(`name == RamG => ${name == 'RamG'}`);

let obj = {
  na: 'na',
  bt: "o",
  show() {
    return this.na + this.bt
  }
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
  if (item.indexOf("띵") == 0) {
    console.log(`띵씨 성, 맞네 코레안은 성의 인덱스가 무조건 0 이니까\n 띵씨 성인 사람은: ${item}`);
  }
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


// 문자열.charAt(index) => 문자열[index]위치의 문자 반환;
console.log(`${'Hello, World'.charAt(7)}`); // W

// 문자열.replace('찾을문자/열', '변경할문자/열')
console.log(`${'Hello, World'.replace('W','wwer')}`); // Hello, wwerorld

// 문자열.trim() => 문자열 좌우의 공백을 제거 
console.log(`${'      Hello         '.trim()}`);

// 문자열.startWith('문자열') => 문자열이, 매개값으로받은 문자열로 시작하는지 대소문자구분해서 T/F 반환
// 문자열.startWith('문자열', n) => 문자열[n]부터, 매개값으로받은 문자열로 시작하는지 대소문자구분해서 T/F 반환
//console.log(`${'ABCDEFGHI'.startsWith('ABB')}`); // F
//console.log(`${'ABCDEFGHI'.startsWith('abc')}`); // F
//console.log(`${'ABCDEFGHI'.startsWith('ABC')}`); // T
// console.log(`${'ABCDEFGHI'.startsWith('CDE',2)}`); // T
// console.log(`${'ABCDEFGHI'.startsWith('Cde',2)}`); // F
// console.log(`${'ABCDEFGHI'.startsWith('CDE',3)}`); // F



// 문자열.endWith('문자열') => 문자열이, 매개값으로받은 문자열로 끝나는지 대소문자구분해서 T/F 반환
// 문자열.endWith('문자열', n) => 문자열[0] 에서 문자열[n]까지의 문자열 기준으로, 매개값으로받은 문자열로 끝나는지 대소문자구분해서 T/F 반환
// console.log(`${'ABCDEFGHI'.endsWith('ghi')}`); // F
// console.log(`${'ABCDEFGHI'.endsWith('GHi')}`); // F
// console.log(`${'ABCDEFGHI'.endsWith('GHI')}`); // T
// console.log(`${'ABCDEFGHI'.endsWith('GHI', 3)}`); // F
// console.log(`${'ABCDEFGHI'.endsWith('ABC', 3)}`); // T
// console.log(`${'ABCDEFGHI'.endsWith('abc',3)}`); // F

// 문자열.includes('문자열') => 문자열에, 매개값으로받은 문자열이 포함되는지 대소문자구분해서 T/F 반환
// console.log(`${'ABCDEFGHI'.includes('ABI')}`); // F
// console.log(`${'ABCDEFGHI'.includes('abc')}`); // F
// console.log(`${'ABCDEFGHI'.includes('ABC')}`); // T

// 문자열.repeat(n) => 문자열을, n회만큼 반복한 문자열을 반환받는다.
console.log(`10회 함성 발사 => ${'으아아악!!!  '.repeat(10)}`);
// console.clear();

// Q1. 성별 판별 함수. 뒷자리7중 1번째값으로 판별해라
function getGender(no) {
  // console.log(no.indexOf(`-`));
  if (no.indexOf(`-`) == -1) {
    return parseInt(no.slice(6, 7))%2 == 0 ? "여" : "남"; 
  }
  else{
    return parseInt(no.slice(7, 8))%2 == 0 ? "여" : "남"; 
  }
  // console.log(`no gender `+ no.slice(7, 8));
  // console.log(`${parseInt(no.slice(7, 8))%2 == 0}`);
}
function getGender2(no){
  let pos = -1
  pos = no.length == 14 ? 7 : 6;
  // console.log(no.charAt(pos));
  return no.charAt(pos) % 2 == 0 ? '여자' : '남자';
}

const numAry = ["990101-1234567", "030303-3234545","980304-2324567", "0103044324567"]
numAry.forEach((item, index) => {
  // console.log(`${index} ${item} gender is: ${getGender(item)}`);
  console.log(`${index} ${item} gender is: ${getGender2(item)}`);
});


// Q2. 사용자 아이디 확인, 메일주소에서 id 부분만 반환

function getId(mail) {
  // console.log(mail);
  // console.log(`${mail.indexOf('@')}`);
  // console.log(`${substring(0, mail.indexOf('@')+1)}`)
  // console.log(mail.slice(0, mail.indexOf('@')));
  return mail.slice(0, mail.indexOf('@'));
}
function getId2(mail) {
  let pos = mail.indexOf('@');
  return mail.substring(0, pos);
}
const emails = [
  `maldersley1@cpanel.net`,
  `jmazella0@deviantart.com`,
  `ucallis2@examiner.com`,
  `abc@naberGogle.com,`
]
emails.forEach((item) => {
  // console.log(`${item}의 id: ${getId(item)}`);
  console.log(`${item}의 id: ${getId2(item)}`);
})
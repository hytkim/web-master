// date.js

const now = new Date();
// console.log(now);
console.log(now.toLocaleDateString()); //현지(toLocale) 날짜
console.log(now.toLocaleTimeString()); //현지(toLocale) 시간

let today = new Date('2025'); // 해당되는연도의 첫날을 기준으로 잡아줌
console.log(today);

let today2 = new Date('2025-03'); // 해당연도의 해당월의 첫 날
console.log(today2);

let today3 = new Date('2025-03-10');
console.log(today3);

let today4 = new Date('2025-03-10 10:30:30');
console.log(today4);
console.log(`${today4.getFullYear()}년`); // 2025
console.log(`${today4.getMonth() + 1}월`); // 배열처럼 1월이 0부터 시작이라 2를 반환함
console.log(`${today4.getDate()}일`); // 3-10 할때 10, 날짜
console.log(`${today4.getDay()}요일`); // 일(0) 월화수목금 토(6) 0~6으로 반환

let today5 = new Date('2025-09-13 10:30:30');
console.log(`${today5.getDay()}요일`);

let today6 = new Date('2025-09-13 10:30:30');
today6.setFullYear(2024);
console.log(today6.toLocaleString());
today6.setMonth(11); //0~11 이니까 11+1해서 12월이됨
console.log(today6.toLocaleString());

// 날짜 '2025-11-12'를 입력하면, => 해당날짜의 요일정보를 반환해주는 함수.
function translateDay(day) {
  // let trDate = new Date(day);
  str = `${new Date(day).getFullYear()}년 ${new Date(day).getMonth()}월 ${new Date(day).getDate()}일은, `;
  switch (new Date(day).getDay()) {
    case 0:
      str += `일요일`
      break;
    case 1:
      str += `월요일`
      break;
    case 2:
      str += `화요일`
      break;
    case 3:
      str += `수요일`
      break;
    case 4:
      str += `목요일`
      break;
    case 5:
      str += `금요일`
      break;
    case 6:
      str += `토요일`
      break;
    default:
      str = null;
      break;
  }
  return str;
}
// 교수님이 짠거 << 2줄컷 초고수 ㄷㄷ
function translateDay2(day) {
  let Days = [`일요일`, `월요일`, `화요일`, `수요일`, `목요일`, `금요일`, `토요일`];
  return `${day}는, ${Days[new Date(day).getDay()]}`;
}
console.log('\n translateDay: \n');
console.log(`${translateDay('2022-10-22')} 입니다.`);
console.log(`${translateDay('2028-04-04')} 입니다. `);
console.log('\n translateDay2: \n');
console.log(`${translateDay2('2022-10-22')} 입니다.`);
console.log(`${translateDay2('2028-04-04')} 입니다.`);

console.log(now.getTime());
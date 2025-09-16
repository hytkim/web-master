// calendar.js 달력만들기
// 매개값으로 연, 월 활용.
let yyyy = 2025,
  mm = 8;
let today = new Date();

// console.log(today.getTime());

today.setFullYear(yyyy);
today.setMonth(mm - 1);
today.setDate(1);
//2025-08-01 - 24 => 2025 -07-31
// console.log(today.getDay());// 공란의 갯수
// console.log(new Date(today.getTime() - (1000 * 60 * 60 * 24)).getDate());// 내가 구하려는 다음월의 첫번째날로부터 -24시간하면 내가구하려는 달의 마지막 날
// 1970-01-01 00:00:00 UTC 기준으로 지금까지 1000분에 1초단위로 숫자더해서 센 값
// 2025-08월 달의 1일의 위치ㅇ.(월)
// 2025-08-01 => getDay() 요일정보;
// 8월의 마지막 날 =>
// let lastDate = new Date(today.getTime() - (1000 * 60 * 60 * 24)).getDate();
// let spaces = today.getDay(); // 공란의 갯수.
// let tr = document.createElement('tr');
// for (let s = 0; s < spaces; s++) {
//   let td = document.createElement('td');
//   tr.appendChild(td);
// }
// for (let d = 1; d <= lastDate; d++) {
//   let td = document.createElement('td');
//   td.innerHTML = d;
//   tr.appendChild(td);
//   if ((d + spaces) % 7 == 0) { // 새로운 줄 생성
//     tr = document.createElement('tr');
//   }
//   document.querySelector('tbody').appendChild(tr);
// }

function MakeCalendarDate(yyyy, mm) {

  //구하려는 달력의 다음달 첫날을 구함
  lastAfterDay = new Date();
  lastAfterDay.setFullYear(parseInt(yyyy));
  lastAfterDay.setMonth(parseInt(mm));
  lastAfterDay.setDate(1);

  // 구하려는 달력의 마지막날을 구함
  let lastDate = new Date(lastAfterDay.getTime() - (1000 * 60 * 60 * 24));
  let lastDayNum = lastDate.getDate();
  lastDate.setDate(1);
  let spacesNum = lastDate.getDay();

  console.log(`입력받은 달력 생성할 날짜 ${yyyy}년 ${mm}월`);
  console.log(`입력받은 달력 다음달${lastAfterDay.toLocaleString()}`);
  console.log(`입력받은 달력 마지막 날${lastDayNum}`);
  console.log(`입력받은 달력 처음 날(공란구하기용)${spacesNum}`);

  MakeCalendarTable(lastDayNum, spacesNum);
}

let holyDay = [1, 15, 5, 9, 24]; //홀리데이와 일치하는날짜에 새로운스타일을줘야함

// holyDay Check ver.1
// function MakeCalendarTable(lastDate, spaces) {
//   console.log(`입력받은 달력 마지막 날${lastDate}`);
//   let tr = document.createElement('tr');
//   for (let s = 0; s < spaces; s++) {
//     let td = document.createElement('td');
//     tr.appendChild(td);
//   }
//   for (let d = 1; d <= lastDate; d++) {
//     let td = document.createElement('td');
//     td.innerHTML = d;
//     tr.appendChild(td);
//     if ((d + spaces) % 7 == 0) {
//       td.setAttribute('class', 'saturday');
//       document.querySelector('tbody').appendChild(tr);
//       tr = document.createElement('tr');
//     }
//     if ((d + spaces) % 7 == 1) {td.setAttribute('class', 'sunday');}
//     document.querySelector('tbody').appendChild(tr);

//     for(let i = 0; i < holyDay.length; i ++){
//       if (parseInt(holyDay[i]) == d) {
//         td.setAttribute('class', 'holyday');
//       }
//     }
//   }
// }


function MakeCalendarTable(lastDate, spaces) { 
  // holyDay Check ver.2 - 3중 for문이걸 내가왜했지 암튼됨 ㅋㅋ
  console.log(`입력받은 달력 마지막 날${lastDate}`);
  let tr = document.createElement('tr');
  for (let s = 0; s < spaces; s++) {
    let td = document.createElement('td');
    tr.appendChild(td);
  }
  for (let d = 1; d <= lastDate; d++) {
    let td = document.createElement('td');
    td.innerHTML = d;
    tr.appendChild(td);
    if ((d + spaces) % 7 == 0) {
      td.setAttribute('class', 'saturday');
      document.querySelector('tbody').appendChild(tr);
      tr = document.createElement('tr');
    }
    if ((d + spaces) % 7 == 1) {
      td.setAttribute('class', 'sunday');
    }
    document.querySelector('tbody').appendChild(tr);
  }
}

function HolyDayChek() {
  document.querySelectorAll(`tbody tr`).length;
  document.querySelectorAll(`tbody tr`).forEach(function (item, idx, ary) {
    item.querySelectorAll('td').forEach(function (item2, idx2, ary2) {
      // console.log(item2);
      holyDay.forEach(function (a, b, c) {
        if (a == item2.innerHTML) {
          item2.setAttribute('class', 'holyday');
        }
      });
    });

  });
}

MakeCalendarDate(2025, 11);
HolyDayChek();
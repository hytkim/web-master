// setInterval.js
document.querySelector('table').remove();

let str = `A B A A A`;
let strAry = str.split(' '); // 구분자 (' ')를 기준으로 문자열을 잘라서 배열로 생성
console.log(strAry);

//구분된 strAry로 div#outer에 div#inner로 하나씩 집어넣음
const outer = document.querySelector('.outer');
let timing = 0;

function Refreshi() {
  strAry.forEach(function (item, idx, ary) {
    let div = document.createElement('div');
    div.innerText = item;
    div.setAttribute("class", "inner");
    outer.appendChild(div);
  });
  timing = 60;
  colorRows();
}

Refreshi();

document.querySelector('#search_word')
  .addEventListener('click', function () {
    let l = document.querySelector('#user_value').value;
    if (l == '') {
      alert('삭제할 값을 입력 해 주세요.');
      return;
    }

    let bool = false;
    document.querySelectorAll('div.inner');
    console.log(document.querySelectorAll('div.inner').length);
    document.querySelectorAll('div.inner').forEach(function (item, idx, ary) {
      if (l == item.innerHTML) {
        console.log(item.innerHTML);
        item.remove();
        bool = true;
      }
    });
    if (!bool) {
      alert('삭제할 값을 정확하게 입력 해 주세요.');
      document.querySelector('#user_value').value = '';
      return;
    } else {
      alert(`${l}을 제거 했습니다.`);
      document.querySelector('#user_value').value = '';
      colorRows();
    }
  });

// 웹브라우저가 가진 내장함수 setInteval(function() {}, time): function(){}을 1/1000 * time 단위로 반복실행한다.(1000이면 1초임)
// setInterval(function() { console.log(new Date()); }, 1000);
setInterval(function () {
  console.log(timing--);

  if (timing == 0) {
    if (document.querySelectorAll('div.inner').length > 0) {
      alert('!!!!!!실패!!!!!');
    }
  } else if (timing > 0) {
    if (document.querySelectorAll('div.inner').length == 0) {
      alert('!!!!!!성공!!!!!');
      timing = 0;
      Refreshi();
    }
  }
}, 1000);









// 휠이벤트 검사 시도: 반쪽짜리성공
//   document.addEventListener('wheel', function(event) {
//   // console.log(event);
//   document.querySelector('.outer');
//   console.log(document.querySelector('.outer'));
// });

/* AI가만들어준 휠스크롤별 한 행의 셀의개수 구하는 기능 */
// document.addEventListener('wheel', function(event) {
//   const outer = document.querySelector('.outer');
//   const items = outer.querySelectorAll('.inner');

//   let currentTop = null;
//   let countInRow = 0;
//   let rows = [];

//   items.forEach(item => {
//     if (currentTop === null) {
//       currentTop = item.offsetTop;
//       countInRow = 1;
//     } else if (item.offsetTop === currentTop) {
//       countInRow++;
//     } else {
//       rows.push(countInRow);
//       currentTop = item.offsetTop;
//       countInRow = 1;
//     }
//   });
//   rows.push(countInRow);

//   console.log('각 행의 개수:', rows);
// });
/* AI가만들어준 휠스크롤때마다 짝수행의 백그라운드바꿔주는 기능 */
function colorRows() {
  let inners = document.querySelectorAll('.outer .inner');

  // 1. 먼저 전체 배경 초기화
  inners.forEach(inner => {
    inner.style.backgroundColor = "";
  });

  let currentTop = null;
  let rowCount = -1; // 첫 행이 0번째로 시작되도록

  inners.forEach(inner => {
    if (currentTop === null || inner.offsetTop !== currentTop) {
      rowCount++;
      currentTop = inner.offsetTop;
    }

    // 짝수 행만 색칠
    if (rowCount % 2 === 1) {
      inner.style.backgroundColor = "lightcoral";
    }
  });
}

// 처음 로드 + 휠 이벤트마다 실행
window.addEventListener('load', colorRows);
window.addEventListener('resize', colorRows); // 창 크기 바뀌어도 대응
document.addEventListener('wheel', colorRows);
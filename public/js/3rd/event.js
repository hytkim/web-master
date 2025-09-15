// event.js

// document.querySelector('#addBtn');
// document.querySelector('.addBtn');
// console.log(document.querySelector('#addBtn'));
// console.log(document.querySelector('.addBtn'));

// document.querySelector('button#addBtn')
// .addEventListener('click', function() {
//   alert('call #addBtn');
// });

// document.querySelector('button.addBtn')
// .addEventListener('click', function() {
//   alert('call .addBtn');
// });

// 매개변수로 넣은값과 일치하는 태그들 중 첫번째 태그만 반환.
// document.querySelector('button') 
// .addEventListener('click', function() {
//   alert('call firstBtn');
// });


// 매개변수로 넣은값과 일치하는 태그 전부를 배열로 반환.
// console.log(document.querySelectorAll('button'));

// document.querySelectorAll('button')[0]
// .addEventListener('click', function() {
//   alert('call btns');
// });

let std = [{
  stdNo: '00',
  stdName: '킴치',
  stdScore: 666
}, {
  stdNo: '11',
  stdName: '피자',
  stdScore: 333
}]; // std.length;

document.querySelector('button#addBtn')
  .addEventListener('click', function () {
    let sno = document.querySelector('#stNum').value;
    let sna = document.querySelector('#stName').value;
    let sco = document.querySelector('#stScore').value;

    if (sno == '' || sna == '' || sco == '') {
      alert('값을 입력하세요.');
      return;
    }

    std[std.length] = {
      stdNo: sno,
      stdName: sna,
      stdScore: sco
    };

    console.log(std);

    AddList();
    // AddList2();
    RefreshInputV();
  });


function RefreshInputV() {
  //입력 항목 초기화.
  document.querySelector('#stNum').value = '';
  document.querySelector('#stName').value = '';
  document.querySelector('#stScore').value = '';
}
AddList();
// 이런 구조로 만들것
// <tr>
//   <td></td>
//   <td></td>
//   <td></td>
// </tr>
//
function AddList() {
  let str = ``;
  for (let i = 0; i < std.length; i++) {
    str +=
      `<tr onclick='ShowInfo(event)'>
      <td>${std[i].stdNo}</td>
      <td>${std[i].stdName}</td>
      <td>${std[i].stdScore}</td>
      <td><button class='btn btn-danger' onclick='RemoveRow(event)'>삭제</button></td>
    </tr>`
  }
  document.querySelector('#list tbody').innerHTML = str;
}

// 단일 값 추가
function AddList2() {
  let str =
    `<tr>
      <td>${std[std.length-1].stdNo}</td>
      <td>${std[std.length-1].stdName}</td>
      <td>${std[std.length-1].stdScore}</td>
    </tr>`;
  document.querySelector('#list tbody').innerHTML += str;
}

// 삭제
function RemoveRow(e) {
  console.log(e);
  console.log(e.target);

  console.dir(e);
  console.dir(e.target);

  // console.log("떳냐?: "+Array.prototype.indexOf.call(e.target.parentElement.childrenOfParent, e.target.parentElement));
  const trIndex = Array.prototype.indexOf.call(
    //버튼의 부모인 td의부모인tr의부모인thead의 모든 자식들을 가지고
    e.target.parentElement.parentElement.parentElement.children, 
    //버튼의 부모인td의 부모인tr이 몇번째 자식인지 검사하는 코드
    e.target.parentElement.parentElement);
  console.log("현재 행(tr)의 인덱스: " + trIndex);

  e.target.parentElement.parentElement.remove();
  // e.parentElement.
}

function ShowInfo(e) {
  // console.log(e);
  // console.log(e.target);

  // 객체 타겟 확인
  // console.dir(e);
  console.dir(e.target);
  console.dir(e.target.parentElement);
  // console.dir(e.target.parentElement.children[0]);
  console.dir(e.target.parentElement.children[0].innerHTML);
  console.dir(e.target.parentElement.children[1].innerHTML);
  console.dir(e.target.parentElement.children[2].innerHTML);
  // console.dir(e.target.parentElement.children[3].innerHTML);

  let sno = document.querySelector('#stNum').value = e.target.parentElement.children[0].innerHTML;
  let sna = document.querySelector('#stName').value = e.target.parentElement.children[1].innerHTML;
  let sco = document.querySelector('#stScore').value = e.target.parentElement.children[2].innerHTML;
}

// 수정이벤트
document.querySelector('.addBtn')
  .addEventListener('click', function () {
    let nodeList = document.querySelectorAll('#list tbody tr');
    //학생번호가담긴 tr의 children중, 첫번째 td의 innerHTML을 찾아서 변경을해줄것

    //찾을 학생 번호, 변경할 학생의 점수
    let sno = document.querySelector('#stNum').value;
    // let sna = document.querySelector('#stName').value;
    let sco = document.querySelector('#stScore').value;

    for (let i = 0; i < nodeList.length; i++) {
      //console.dir(nodeList[i]); // 이거 한글이랑 같이쓰면 tr이아니라 이상한걸로잡힘
      console.log(nodeList[i].children[0], '-', sno);

      if (nodeList[i].children[0].innerHTML == sno) {
        nodeList[i].children[2].innerHTML = sco;
      }
    }
  })
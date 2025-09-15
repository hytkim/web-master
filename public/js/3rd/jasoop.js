let std = [{
  stdNo: 100,
  stdName: '람지',
  stdScore: 99
}, {
  stdNo: 200,
  stdName: '썬더',
  stdScore: 88
}, ]

function start() {
  GetOldList();
}
// Add버튼에 이벤트연결하는데 AddList() 를 하면 "함수 참조"가 아닌 "함수 호출"이 발생하기때문에 () 떼줘야함!
document.querySelector('#addBtn').addEventListener('click', AddList);

function AddList() {
  let newData = {
    stdno: document.querySelector('#stNum').value,
    stdName: document.querySelector('#stName').value,
    stdScore: document.querySelector('#stScore').value
  };
  for (let prop in newData) {
    if (newData[prop] == '') {
      alert('값을 입력하세요.');
      return;
    }
  }
  let tr = makeTr(newData);
  InitObj(tr);
}

function GetOldList() {
  for (let i = 0; i < std.length; i++) {
    let tr = makeTr(std[i]);
    InitObj(tr);
  }
}

// Data를 바탕으로 생성된 tr을 #list > thead의 자식요소로 삽입
function InitObj(tr) {
  document.querySelector('#list thead').appendChild(tr);
}
// Obj Data를 바탕으로 tr을 생성함
function makeTr(newData) {
  // console.log(newData);
  let tr = document.createElement('tr');
  for (const prop in newData) {
    let td = document.createElement('td');
    td.innerHTML = newData[prop];
    tr.appendChild(td);
  }
  let td = document.createElement('td');
  let btn = document.createElement('button');
  btn.addEventListener('click', function (e) {
    console.dir(e);
    e.target.parentElement.parentElement.remove();
    e.stopPropagation();
    // const trIndex = Array.prototype.indexOf.call(
    //   e.target.parentElement.parentElement.parentElement.children,
    //   e.target.parentElement.parentElement);
    // console.log(trIndex);
    // std.splice(trIndex, 1);
  })
  btn.innerHTML = '삭제';

  td.appendChild(btn);
  tr.appendChild(td);

  return tr;
}

start();
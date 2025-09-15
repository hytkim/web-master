// Object.js

// 객체 내부에 '소속된' 함수 === Method
let obj = {
  name: "김치",
  age: 18,
  showInfo: () => {
    return `이름은 ${obj.name}, 나이는 ${obj.age}`;
  }
}
// console.log(obj.showInfo());
// console.log(window);

// createElement() 요소생성
// appendChilde()부모0자식관계
// innerText innerHTMl textContent
let stds = [{
  no: 100,
  name: 'rr',
  score: 90
}, {
  no: 200,
  name: 'ㄴㄴ',
  score: 80
}]

// 
function CreateList() {
  for (let i = 0; i < stds.length; i++) {
    // let tr = document.createElement('tr'); // <tr> </tr>

    // let td = document.createElement('td');
    // td.innerHTML = stds[i].no;
    // tr.appendChild(td);

    // td = document.createElement('td');
    // td.innerHTML = stds[i].name;
    // tr.appendChild(td);

    // td = document.createElement('td');
    // td.innerHTML = stds[i].score;
    // tr.appendChild(td);
    // document.querySelector('#list tbody').appendChild(tr);
    let tr = makeTr(stds[i]);
    document.querySelector('#list tbody').appendChild(tr);

  }
}

//순수 노가다로 CreateList2 생성
// function CreateList2() {
//   for (let i = 0; i < stds.length; i++) {
//     let tr = document.createElement('tr'); // <tr> </tr>

//     for (let prop in stds[i]) {
//       let td = document.createElement('td');
//       td.innerHTML = stds[i][prop];
//       tr.appendChild(td);
//     }
//     let td = document.createElement('td');
//     let btn = document.createElement('button');
//     btn.innerHTML = '삭제';
//     //btn btn-danger <== 부트스트랩 스타일시트로 받아온 빨간버튼 css
//     btn.setAttribute('class', 'btn btn-danger'); // <button class="btn btn-danger">
//     btn.addEventListener('click', function (e) {
//       console.log(e);
//       e.target.parentElement.parentElement.remove();
//     });
//     td.appendChild(btn);

//     document.querySelector('#list tbody').appendChild(tr);
//     tr.appendChild(td);
//   } // end of for. 
//   document.querySelector('#addBtn').addEventListener('click', function () {
//     let nu = document.querySelector('#stNum').value;
//     let na = document.querySelector('#stName').value;
//     let co = document.querySelector('#stScore').value;

//     if (nu == '' || na == '' || co == '') {
//       alert('값을 입력하세요.');
//       return;
//     }

//     stds[stds.length] = {
//       no: nu,
//       name: na,
//       score: co
//     }
//     console.log(stds[stds.length - 1]);
//     let tr = document.createElement('tr');
//     for (let prop in stds[stds.length - 1]) {
//       let td = document.createElement('td');
//       td.innerHTML = stds[stds.length - 1][prop];
//       tr.appendChild(td);
//     }
//     let td = document.createElement('td');
//     let btn = document.createElement('button');
//     btn.innerHTML = '삭제';
//     //btn btn-danger <== 부트스트랩 스타일시트로 받아온 빨간버튼 css
//     btn.setAttribute('class', 'btn btn-danger'); // <button class="btn btn-danger">
//     btn.addEventListener('click', function (e) {
//       console.log(e);
//       e.target.parentElement.parentElement.remove();
//     });
//     td.appendChild(btn);

//     document.querySelector('#list tbody').appendChild(tr);
//     tr.appendChild(td);
//     document.querySelector('#stNum').value = '';
//     document.querySelector('#stName').value = '';
//     document.querySelector('#stScore').value = '';
//   });
// } // end of CreateList2().

//makeTr 사용하는 CreateList2
// function CreateList2() {
//   for (let i = 0; i < stds.length; i++) {
//     makeTr(stds)
//   } // end of for. 
//   document.querySelector('#addBtn').addEventListener('click', function () {
//     let nu = document.querySelector('#stNum').value;
//     let na = document.querySelector('#stName').value;
//     let co = document.querySelector('#stScore').value;

//     if (nu == '' || na == '' || co == '') {
//       alert('값을 입력하세요.');
//       return;
//     }

//     stds[stds.length] = {
//       no: nu,
//       name: na,
//       score: co
//     }
//     console.log(stds[stds.length - 1]);
//     let tr = document.createElement('tr');
//     for (let prop in stds[stds.length - 1]) {
//       let td = document.createElement('td');
//       td.innerHTML = stds[stds.length - 1][prop];
//       tr.appendChild(td);
//     }
//     let td = document.createElement('td');
//     let btn = document.createElement('button');
//     btn.innerHTML = '삭제';
//     //btn btn-danger <== 부트스트랩 스타일시트로 받아온 빨간버튼 css
//     btn.setAttribute('class', 'btn btn-danger'); // <button class="btn btn-danger">
//     btn.addEventListener('click', function (e) {
//       console.log(e);
//       e.target.parentElement.parentElement.remove();
//     });
//     td.appendChild(btn);

//     document.querySelector('#list tbody').appendChild(tr);
//     tr.appendChild(td);
//     document.querySelector('#stNum').value = '';
//     document.querySelector('#stName').value = '';
//     document.querySelector('#stScore').value = '';
//   });
// } // end of CreateList2().
CreateList2();

function makeTr(newStds) {
  console.log(newStds);
  let tr = document.createElement('tr'); // <tr> </tr>

  for (let prop in newStds) {
    let td = document.createElement('td');
    td.innerHTML = newStds[prop];
    tr.appendChild(td);
  }
  let td = document.createElement('td');
  let btn = document.createElement('button');
  btn.innerHTML = '삭제';
  //btn btn-danger <== 부트스트랩 스타일시트로 받아온 빨간버튼 css
  btn.setAttribute('class', 'btn btn-danger'); // <button class="btn btn-danger">
  btn.addEventListener('click', function (e) {
    console.log(e);
    e.target.parentElement.parentElement.remove();
  });
  td.appendChild(btn);

  document.querySelector('#list tbody').appendChild(tr);
  tr.appendChild(td);

  //생성한 tr 반환
  return tr;
} // end of makeTr(newStds);

// for - in 구문, makeTr 메서드 공유(CreateList, CreateList2) 최종본
function CreateList2() {
  for (let i = 0; i < stds.length; i++) {
    let tr = makeTr(stds[i]);
  } // end of for. 
  document.querySelector('#addBtn').addEventListener('click', function () {
    let newStd = {
      nu: document.querySelector('#stNum').value,
      na: document.querySelector('#stName').value,
      co: document.querySelector('#stScore').value
    }

    if (newStd.nu == '' || newStd.na == '' || newStd.co == '') {
      alert('값을 입력하세요.');
      return;
    }

    stds[stds.length] = {
      no: newStd.nu,
      name: newStd.na,
      score: newStd.co
    }
    // console.log(stds[stds.length - 1]);
    console.log(newStd);
    let tr = document.createElement('tr'); // <tr></tr>
    for (let prop in newStd) {
      let td = document.createElement('td'); // <td></td>
      td.innerHTML = newStd[prop];
      tr.appendChild(td);
    }
    //<tr> <td> newStd.prop[0] </td> </tr>
    //<tr> <td> newStd.prop[1] </td> </tr>
    //<tr> <td> newStd.prop[2] </td> </tr>

    let td = document.createElement('td'); // <td></td>
    let btn = document.createElement('button'); // <button></button>
    btn.innerHTML = '삭제';
    //btn btn-danger <== 부트스트랩 스타일시트로 받아온 빨간버튼 css
    btn.setAttribute('class', 'btn btn-danger'); // <button class="btn btn-danger">
    btn.addEventListener('click', function (e) {
      console.log(e);
      e.target.parentElement.parentElement.remove();
    });
    td.appendChild(btn); // <td> <button></button> </td>

    document.querySelector('#list tbody').appendChild(tr);
    tr.appendChild(td);
    //<tr> <td> newStd.prop[0] </td> </tr>
    //<tr> <td> newStd.prop[1] </td> </tr>
    //<tr> <td> newStd.prop[2] </td> </tr>
    //<tr> <td> <button>삭제</button> </td> </tr>

    document.querySelector('#stNum').value = '';
    document.querySelector('#stName').value = '';
    document.querySelector('#stScore').value = '';
  });
} // end of CreateList2().
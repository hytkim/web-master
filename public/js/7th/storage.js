// storage.js

// 로컬스토리지에 접근하는 예제
// localStorage.setItem('myName', "렙틸리언");
// localStorage.setItem("myInfo", JSON.stringify({name: "람썬vjsc", age:24}));
// localStorage.setItem("myInfo", '{"name": "람썬킥", "age":20}');
// let info = localStorage.getItem("myInfo");
// console.log(info);
// console.log(JSON.parse(info));
console.log(window);

//저장 현재 localStorage꺼 가져와서 그 data에 push하고 그걸다시 stpiy해서저장
document.forms.stdForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let sno = document.getElementById('sno').value;
  let sname = document.getElementById('sname').value;
  let score = document.getElementById('score').value;
  if (!sno || !sname || !score) {
    alert('값을 입력 해 주세요!');
    return;
  }
  if (!confirm(`저장하시겠습니까?`)) {
    alert('저장을 취소했습니다.');
    // cleaerInput();
    return;
  }
  // 중복검사 1
  // forEach는 항상 undefined를 반환합니다. (리턴값이 없습니다.)
  // forEach는 중간에 멈출 수 없습니다. (내부의 return은 반복을 멈추지 못합니다.)
  // let bool = false;
  // JSON.parse(localStorage.getItem("students")).forEach((item) => {
  //   if (item.sno == sno) {
  //     bool = true;
  //   }
  // });
  // if (bool) {
  //   alert('저장을 취소했습니다.');
  //   cleaerInput();
  //   return;
  // }
  console.log(JSON.parse(localStorage.getItem("students")).filter((item) => item.sno == sno));
  console.log(JSON.parse(localStorage.getItem("students")).filter((item) => item.sno == sno).length);
  if (JSON.parse(localStorage.getItem("students")).filter((item) => item.sno == sno).length) {
    alert('학생번호가 중복입니다.');
    cleaerInput();
    return;
  }

  let data = JSON.parse(localStorage.getItem('students'));

  data.push({
    sno,
    sname,
    score
  });
  localStorage.setItem('students', JSON.stringify(data));
  cleaerInput();
  loadData();
});
cleaerInput = () => {
  document.getElementById('sno').value = '';
  document.getElementById('sname').value = '';
  document.getElementById('score').value = '';
}
loadData = () => {
  document.querySelector('#data-container').innerHTML = '';
  let data = JSON.parse(localStorage.getItem("students"));
  // console.log(data);
  data.forEach((item, index, ary) => {
    // console.log(item);
    fields = ['sno', 'sname', 'score'];
    let div = document.createElement('div');
    for (const prop of fields) {
      // console.log('prop',prop);
      // console.log(`item[prop]`,item[prop]);
      let span = document.createElement('span');
      span.innerHTML = item[prop];
      span.setAttribute('class', `data-${prop}`);
      div.appendChild(span);
    }
    let span = document.createElement('span');
    let btn = document.createElement('button');
    btn.innerHTML = '수정';
    btn.addEventListener('click', (e) => {
      // search : sno 저장.
      localStorage.setItem('search', item.sno);
      location.href = 'update.html';
    });
    span.appendChild(btn);
    div.appendChild(span);
    document.querySelector('#data-container').appendChild(div);
  });
}

// 한번저장했으면 쿠키삭제하지않는이상 실행 안 해도됨.
RefreshiLocalStorage = () => {
  localStorage.setItem("students", JSON.stringify([{
      sno: 100,
      sname: "다람쥐",
      score: 80,
    },
    {
      sno: 200,
      sname: "람썬더",
      score: 90,
    },
    {
      sno: 300,
      sname: "알파카",
      score: 65,
    },
  ]));
}
// RefreshiLocalStorage();

loadData();
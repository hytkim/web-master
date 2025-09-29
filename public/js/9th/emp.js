// 9th > emp.js
http://localhost:3000/emp => json data
fetch(`http://localhost:3000/emp/ALL/ALL/-1`)
  .then(response => response.json()) //응답정보 json객체를 javascript객체로 변환
  .then(result => {
    // console.log(result);
    console.log("Start result: \n",result);
    result.forEach((item) => {
      let tr = makeRow(item);
      document.querySelector('#list').appendChild(tr);
    });
  })
  .catch(err => {
    console.log(err);
  });

// 이벤트 핸들러 :document.forms 화면의 폼들을관리해주는 속성
document.forms[0].addEventListener('submit', (e) => {
  // submit 이벤트의 기본 기능을 차단하겠습니다.
  e.preventDefault();
  // empNo, empName, job, hd, deptNo
  let eno = document.querySelector('#empNo').value;
  let ena = document.querySelector('#empName').value;
  let job = document.querySelector('#job').value;
  let hd = document.querySelector('#hd').value;
  let deptNo = document.querySelector('#deptNo').value;
  // 사용자입력 값을 서버에 전달할 포멧이 json이다. => json포멧으로 서버 전달
  //http://localhost:3000/emp 만 있으면 get방식인데 post쓰려면 객체 {}의 속성을 수정해줘야한다.
  fetch('http://localhost:3000/emp', {
    method:'post', //post방식은 data가 body? header에 담겨서 전달된다, 
    headers:{ 'Content-Type':'application/json;charset=utf-8' }, // json으로넘겨줄거고, 한글쓸꺼다.
    body: JSON.stringify({ eno, ena, job, hd, deptNo})
  })
  .then(response => response.json()) // 서버의 응답결과
  .then(result => {
    console.log(result);
  })
  .catch(err => console.log(err));
});
// 조회 이벤트 핸들러: 사원명 직무 부서번호값들을 서버에 전달해주는 이벤트를 만들거임 
document.forms[1].addEventListener('submit', (e) => {
  e.preventDefault();
  const ename = document.getElementById('s_ename').value || "ALL";
  const job = document.getElementById('s_job').value || "ALL";
  const deptno = document.getElementById('s_deptno').value || -1;
  // let url = `http://localhost:3000/emp/${ename ? ename : 'ALL'}/${job}/${deptno}`;
  let url = `http://localhost:3000/emp/${ename}/${job}/${deptno}`;
  fetch(url) // url로 들어가서 그곳의 응답을 .json()한다 이게뭐하는건데
  .then(response => response.json())
  .then(result => {
    console.log(result);
    document.querySelector('#list').innerHTML = '';
    result.forEach((item) => {
      let tr = makeRow(item);
      document.querySelector("#list").appendChild(tr);
    });
  })
  .catch(err => console.log(err));
});
// 사원 검색 버튼의 타입이 button이였으면 이렇게.
document.querySelector('#searchForm > button[type="button"]');


// 사원정보 1건 => row 생성.
makeRow = (employee) => {
  console.log(employee);
  let fields = ['EMPNO', 'ENAME', 'JOB', 'SAL','DNAME'];
  let tr = document.createElement('tr');
  tr.setAttribute('data-eno', employee.EMPNO);
  fields.forEach((field) => {
    let td = document.createElement('td');
    td.innerHTML = employee[field];
    tr.appendChild(td);
  })
  let btn = document.createElement('button');
  btn.addEventListener('click', deleteFunc);
  btn.innerHTML = '삭제';
  btn.setAttribute('class','btn btn-danger');
  let td = document.createElement('td');
  td.appendChild(btn);
  tr.appendChild(td);
  return tr;
}

// 삭제버튼눌렀을때 실행할 이벤트 핸들러.
function deleteFunc(e) {
  console.log('this:', this);
  // console.log(e.target.parentElement.parentElement.dataset.eno);
  console.log(this.parentElement.parentElement.dataset.eno); // data-eno
  let thisTr = this.parentElement.parentElement;
  let eno = this.parentElement.parentElement.dataset.eno;
  fetch(`http://localhost:3000/emp/` + eno)
    .then(response => response.json())
    .then(result => {
      console.log('Result: ', result);
      if (result.rowsAffected) {
        alert('성공');
        thisTr.remove();
      } else {
        alert('실패');
      }
    })
    .catch(err => {
      console.log(err);
    });
};
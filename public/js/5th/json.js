// JSON.js
// http://127.0.0.1:5500/public/js/5th/index.html
// http://192.168.0.15:5500/public/js/5th/data.json
//c -> s request
//c <- s response
const xhtp = new XMLHttpRequest();
// console.log();
xhtp.open('get', 'data.json') // 서버의 요청할 페이지 지정.
xhtp.send(); // 실제 요청
xhtp.onload = function () {
  // 서버의 응답(response)으로 받아온 data.json의 내용물이 response에들어가있다.
  // console.log(xhtp.response+'\n\n\n\n');
  // console.log(xhtp.responseText);
  let data = JSON.parse(xhtp.responseText);
  console.log(data);
  let fields = ['id', 'first_name', 'last_name', 'gender', 'salary'];
  data.forEach(function (item, idx, ary) {
    let tr = document.createElement('tr');
    fields.forEach(function (a, b, c) {
      let td = document.createElement('td');
      td.innerHTML = item[fields[b]];
      console.log(`make: ${td.innerHTML}`);
      tr.appendChild(td);
    });
    document.querySelector('#list').appendChild(tr);
  });
};

function MakeList(json, data) {
  let tr = document.createElement('tr');
  data.forEach(function (item, idx, ary) {

  });
}
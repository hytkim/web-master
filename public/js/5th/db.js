// db.js
const xp = new XMLHttpRequest();
// event
document.querySelector('div.container > form')
  .addEventListener('submit', function (e) {
    e.preventDefault(); // 기본 기능 차단.
    addPost();
  });

function addPost() {
  const x = new XMLHttpRequest();
  x.open('post', 'http://localhost:3000/post'); //요청방식, 요청url
  // ↓↓ post ↓↓ 요청일때 전달할 컨텐트 타입을 지정, 한글포함이면 인코딩방식지정(charset)해줘야함
  x.setRequestHeader(`Content-Type`, 'application/json;charset=utf-8');
  // ↓↓ 실제 요청 ↓↓, stringify(): js객체를 Json타입으로 변경해주는 메서드
  x.send(JSON.stringify({
    title: document.querySelector('input[name="title"]').value,
    author: document.querySelector('input[name="author"]').value
  }));
  // ↓↓ 로드이벤트 발생시 함수 실행 ↓↓
  x.onload = function () {
    // 이게대체뭐임? 이게어떻게 한줄만반환하는거임?
    let res = JSON.parse(x.response); console.log(res);

    // 생성된 행을 콘테이너에 추가
    let div = MakeRow(res);
    document.querySelector('#data-container').appendChild(div);

    // 입력 값 초기화
    document.querySelector('input[name="title"]').value = '';
    document.querySelector('input[name="author"]').value = '';
  };
}

// 기존의 http://localhost:3000/post (db.json)
xp.open('get', 'http://localhost:3000/post');
xp.send();
xp.onload = function () {
  // 기존의 db.json에 저장된 글 목록
  let data = JSON.parse(xp.responseText);
  data.forEach(function(item) {
    let div = MakeRow(item);
    document.querySelector('#data-container').appendChild(div);
  });

}
// 게시글 한 건에 대한 row(div태그) 생성해서 반환하는 함수
function MakeRow(post = { id, title, author }) {
  let div = document.createElement('div');
  let fields = ['id', 'title', 'author'];
  fields.forEach(function (a, b, c) {
    let span = document.createElement('span');
    span.innerHTML = post[fields[b]];
    span.classList.add(`data-${fields[b]}`);
    // span.setAttribute('class','data-'+fields[b]);
    div.appendChild(span);
  });
  return div;
  /*
  <div> 
    <span class='data-id'>랜덤 id값</span> 
    <span class='data-title'> input#title.value</span> 
    <span class='data-author'>input#author.value</span> 
  </div>
  */
}
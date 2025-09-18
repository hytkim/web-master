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
    // 이게대체뭐임
    let res = JSON.parse(x.response);
    console.log(res);

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
  data.forEach(function (item) {
    let div = MakeRow(item);
    document.querySelector('#data-container').appendChild(div);
  });
}

function addComments(postObj) {
  const c = new XMLHttpRequest();
  c.open('get', 'http://localhost:3000/comments');
  // c.setRequestHeader(`Content-Type`, 'application/json;charset=utf-8');
  c.send();
  c.onload = () => {
    // console.log(JSON.parse(c.response));
    let comments = document.querySelector('.comments');
    comments.innerHTML = '';
    // console.log(JSON.parse(c.response).filter(item => item.postId == postObj.children[0].innerHTML));
    let res = JSON.parse(c.response).filter(item => item.postId == postObj.children[0].innerHTML);
    let fields = ['id', 'content', 'postId'];
    if (res.length == 0) {
      console.log(`숨김`);
      comments.style.display = 'none';
    }
    else{
      console.log(`안 숨김`);
      comments.style.display = 'block';
    }
    for (let index = 0; index < res.length; index++) {
      // console.log(`객체단위로뜯었음 \n`, res[index]);
      let div = document.createElement('div');
      fields.forEach((item, idx, ary) => {
        // console.log(`뜯어낸 객체의 속성단위로 뜯었음 \n 지금 속성은: `, item);
        // console.log(`제발살려만다오`,res[index][fields[idx]]);
        let span = document.createElement('span');
        span.innerHTML = res[index][fields[idx]];
        span.classList.add(`comment-${fields[idx]}`);
        div.appendChild(span);
      })
      document.querySelector('.comments').appendChild(div);
    }
    postObj.appendChild(comments);

  }


}
// console.log(`${res}`);
//가져온 comments의 갯수만큼 반복문 슛!
// JSON.parse(c.response).filter(item => item.postId == a).forEach((item, index, ary) => {
//   let div = document.createElement('div');

//   console.log(`${index}item이 돌고있어요 ${item}`);
//   // 가져온 comments의 속성의 종류의 수 만큼 내부 for문 뺑뺑이
//   for (let prop in item) {
//     let span = document.createElement('span');
//     span.innerHTML = item[prop];
//     span.setAttribute('class',`comment-${prop}`);
//     div.appendChild(span);
//   }
// });

// 게시글 한 건에 대한 row(div태그) 생성해서 반환하는 함수
function MakeRow(post = { id,  title,  author}) {
  let div = document.createElement('div');
  div.addEventListener('click', function () {
    addComments(this);
  });
  let fields = ['id', 'title', 'author'];
  fields.forEach(function (a, b, c) {
    let span = document.createElement('span');
    span.innerHTML = post[fields[b]];
    span.classList.add(`data-${fields[b]}`);
    // span.setAttribute('class','data-'+fields[b]);
    div.appendChild(span);
  });
  return div;
}
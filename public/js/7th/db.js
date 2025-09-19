// 7th/db.js

/* 3가지방법으로 즐기는 form 태그 호출방법
console.log(document.forms);
console.log(document.forms[0]);
console.log(document.forms.postForm);
console.log(document.forms['postForm']);
*/

// document.forms['postForm'].addEventListener('submit', (e) => {
document.forms.postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = document.querySelector(`[name="title"]`).value;
  let author = document.querySelector(`[name="author"]`).value;
  if (!title|| !author) {
    alert(`title과 author를 입력해주세요.`);
    return;
  }
  // ajax. 비동기함수, 요청방식:post
  // 나는, http://localhost:3000/post 에다가 뭔가할꺼다
  fetch('http://localhost:3000/post', {
    method: "post",
    headers: {"Content-Type": "application/json;charset=utf-8"},
    body: JSON.stringify({title, author}),
  })
  .then((response) => response.json()) // 받아온 Json파일의 responseㅇ 2진바이너리 ㄷ
  .then((result) => {
    console.log(result);
    let div = MakeRow(result);
    document.querySelector('#data-container').appendChild(div);
  })
  .catch((err)=> {
    console.log(`err now! ${err}`);
  });
});

fetch('http://localhost:3000/post')
.then((response) => response.json()) //fetch로 받은 .../post의 값을 js로 변환해서 반환
.then((result) => {
  let fiels = ['id', 'title', 'author'];

  result.forEach((item, index, ary) => {
    let div = MakeRow(item);
    document.querySelector('#data-container').appendChild(div);
  });
})
.catch((err) => {
  console.log(`fetch Error! is: ${err}`);
});

MakeRow = (post_object) => {
  let div = document.createElement('div');
  let fiels = ['id', 'title', 'author'];
  for (const prop of fiels) {
    let span = document.createElement('span');
    span.innerHTML = post_object[prop];
    // console.log(`input prop is: ${prop}`);
    // console.log(`input value is: ${post_object[prop]}`);
    span.setAttribute('class',`data-${prop}`);
    div.appendChild(span);
  }
  let span = document.createElement('span');
  let btn = document.createElement('button');
  btn.setAttribute('class','btn btn-danger');
  btn.innerHTML = '삭제';
  btn.addEventListener('click', (e) => {
    // console.log(`who is this: ${this}`);
    console.log(`who is target: ${e.target}`);
    console.log(`who is target: ${e.target.innerHTML}`);
    console.log(`who is target: ${e.target.parentElement}`);
    console.log(`who is target: ${e.target.parentElement.parentElement}`);
    console.log(`who is target: ${e.target.parentElement.parentElement.children[0].innerHTML}`);

    fetch(`http://localhost:3000/post/${e.target.parentElement.parentElement.children[0].innerHTML}`, {
      method: "delete",
      headers: {"Content-Type": "application/json;charset=utf-8"},
    })
    // .then((response) => {console.log(`resqponse: ${response}`)})
    .catch((err) => {
      console.log(`btn Delete request Error!: ${err}`);
    })

    e.target.parentElement.parentElement.remove();
  });
  span.appendChild(btn);
  div.appendChild(span);
  return div;
}
/* backup - code*/
backup_then_result = () =>{
  // 3가지 방법으로 동작가능함
  // item 순회방법 동작하긴하는데 예외 추가 방법 생각 해야해서
  //  다른경우에 오류발생할수있고, 비효율적이라고 생각되서 죽였음!
  // .then((result) => {
  //   // console.log(result);
  //   let fiels = ['id', 'title', 'author'];
  //   result.forEach((item, index, ary) => {
  //     let div = document.createElement('div');
  //     for (const prop in item) {
  //       let span = document.createElement('span');
  //       span.innerHTML = item[prop];
  //       span.setAttribute('class','data-'+[prop]);
  //       div.appendChild(span);
  //     }
  //     document.querySelector('#data-container').appendChild(div);
  //   });
  // })
  
  // for -of 방법
  // .then((result) => {
  //   // console.log(result);
  //   let fiels = ['id', 'title', 'author'];
  //   result.forEach((item, index, ary) => {
  //     let div = document.createElement('div');
  //     // ↓↓ 이거 배열에는 for 'of' 써야하고, 객체에는 for 'in'을 써야함, ↓↓
  //     // ↓ {}에는 of, [1, 2, 3]에는 in of쓰면 안에있는 값을 못 읽어와서 이코드를 in으로쓰면 에러남↓
  //     for (const prop of fiels) { 
  //       let span = document.createElement('span');
  //       // console.log('이게 순회중인 item임!: ',item);
  //       // console.log('이게prop임!:', prop);
  //       // console.log('이게item[id]임!:',item['id']);
  //       // console.log('이게item[id]임!:',item['title']);
  //       // console.log(`이거뭐나옴? ${item[fiels[prop]]}`);
  //       span.innerHTML = item[prop];
  
  //       span.setAttribute('class','data-'+[prop]);
  //       div.appendChild(span);
  //     }
  //     document.querySelector('#data-container').appendChild(div);
  //   });
  // })
  
  // for - in 방법
  // .then((result) => {
  //   // console.log(result);
  //   let fiels = ['id', 'title', 'author'];
  //   console.log(fiels);
  //   result.forEach((item, index, ary) => {
  //     let div = document.createElement('div');
  //     console.log(item);
  //     for (const prop in fiels) {
  //       console.log(fiels[prop]);
  //       let span = document.createElement('span');
  //       span.innerHTML = item[fiels[prop]];
  //       span.setAttribute('class','data-'+[fiels[prop]]);
  //       div.appendChild(span);
  //     }
  //     document.querySelector('#data-container').appendChild(div);
  //   });
  // })
}
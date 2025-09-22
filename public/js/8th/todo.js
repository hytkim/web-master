// 8th.todo.js
// 추가, 삭제 토글
// 누를때마다 클래스이름 넣었다빼기, 내부의 span이클릭되면 li를죽여야됨 
// display:none 쓰거나제거

// 클릭이벤트의 하위요소부터 부모를찾아가는 이벤트검사 = 버블링
// 클릭이벤트의 상위요소부터 하위요소를찾아가는 이벤트검사 = 캡처링
// 캡처링은 => 클릭이벤트가 있는 태그만 찾아가니까 body부터 검사할걱정은 없음
// addEvListener(ev, function, 버블링||캡처링); 디폴트는 false => 버블링
// e.stopPropagation(); 쓰면 버블링이든 캡쳐링이든 이벤트전파를 막아줌.
// e.preventDefault << 기본기능차단, 이벤트차단이 아님!

newElement = () => {
  let txt = document.getElementById('myInput').value;
  // default: false, true주면 하위소속값들도 다 받아옴.
  let cloned = document.querySelector('#myUL>li').cloneNode(true);
  // 클론에 innerHtml넣어주면 하위태그에 txt를제외한내용이 다 제거되서 백업해줘야함.
  let spand = cloned.querySelector('span');
  
  cloned.innerHTML = txt;
  cloned.appendChild(spand);

}


// 목록 등록 기능, 클릭시 상태변경, 
//element.classList.add/remove('class명')
document.querySelector('.addBtn')
  .addEventListener('click', () => {
    let ul = document.getElementById('myUL');
    let title = document.getElementById('myInput').value;
    if (!title) {
      alert('값 입력');
      document.getElementById('myInput').value = '';
      return;
    }
    // console.log(`clicked now, title is: ${title}`);
    let li = AddList(title);
    console.log(li);
    // console.dir(`li를 만들었는데 이게 무슨일이죠${li}`);
    ul.appendChild(li);
  });

AddList = (title) => {
  console.log(`clicked now, title is: ${title}`);

  let li = document.createElement('li');
  li.innerHTML = title;
  li.className += '';
  li.addEventListener('click', (e) => {
    console.log(e.target);
    if (li.className == 'checked') {
      li.className = '';
    } else {
      li.className = '';
      li.className += 'checked';
    }
  });
  let span = MakeSpan();

  li.appendChild(span);

  return li;
};

Refresh = () => {
  let ul = document.getElementById('myUL');
  // console.log(ul.children);//ul.children.length
  // console.log(ul.children.length);
  for (let i = 0; i < ul.children.length; i++) {
    // console.log(ul.children[i].className);
    ul.children[i].addEventListener('click', (e) => {
      console.log(`e.target ${e.target}`);
      console.dir(`e.target ${e.target}`);
      if (ul.children[i].className == 'checked') {
        // console.log(`my className is: ${ul.children[i].className == 'checked'}`);
        console.log(`나는 얻다 새로운 클릭 이벤트, ${ul.children[i]}`);
        ul.children[i].className = '';
      } else {
        ul.children[i].className = '';
        ul.children[i].className += 'checked';
      }
      // e.stopPropagation();
    }, false);

    let span = MakeSpan();

    ul.children[i].appendChild(span);
  }
};

MakeSpan = () => {
  let span = document.createElement('sapn');

  span.setAttribute('class', 'close');
  span.innerHTML = 'X';
  span.addEventListener('click', (e) => {
    // console.log(`target is :${e.target}`);
    // console.log(`target is :${e.target.parentElement}`);
    e.stopPropagation();
    e.target.parentElement.remove();
  });
  return span;
}

Refresh();
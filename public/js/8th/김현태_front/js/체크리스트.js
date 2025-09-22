// front > js > 체크리스트.js
let ary = [];
document.getElementById('add')
  .addEventListener('click', () => {
    let item = document.getElementById('item');
    let ul = document.querySelector('#itemList > ul');

    // 초기화
    if (ul == null) {
      ul = document.createElement('ul');
      document.querySelector('#itemList').appendChild(ul);
    }
    // console.log(ul);

    // 빈 값 입력 대응
    if (item.value == '') {
      alert('값을 입력해 주세요');
      item.focus();
      return;
    } //else if (item.value == Document.qu) {

    let bool = false;
    // document.querySelectorAll('#itemList > ul > li')
    //   .forEach(_item => {
    //     // console.log(`현재 입력값${item}과 비교할 목록: `);
    //     // console.log(_item);
    //     // console.log(_item.innerText);
    //     let pos = _item.innerText.indexOf('X');
    //     // console.log(_item.innerText.substring(0, pos));
    //     if (item.value === _item.innerText.substring(0, pos).trim()) {
    //       // console.log('이게뭐임');
    //       bool = true;
    //     }
    //   });
    ary.forEach(_item => {
      if (item.value == _item) {
        bool = true;
      }
    });

    if (bool) {
      alert('중복값을 입력 했습니다.');
      item.focus();
      document.getElementById('item').value = '';
      return;
    }
    //입력 완료 후 버튼 클릭시 ul, li태그 생성
    let li = MakeRow(item.value);
    ul.appendChild(li);
    ary.push(item.value);
        console.log(ary);
    //입력완료시 input 초기화, 포커스
    document.getElementById('item').value = '';
  });

MakeRow = (item) => {
  // console.log(item);
  let li = document.createElement('li');
  let span = document.createElement('span');
  // console.log(span);
  span.innerHTML = 'X';
  span.classList += 'close'
  span.addEventListener('click', (e) => {
    // console.log(e.target);
    let num = e.target.parentElement.innerText.indexOf('X');
    let str = e.target.parentElement.innerText.substring(0, num).trim();
    console.log(`제거된 ary요소 str:  ${str}`);
    ary = ary.filter(item => item != str);
    console.log(`남은 ary ${ary}`);
    e.target.parentElement.remove();
  });
  li.innerHTML = item;
  li.appendChild(span);

  return li;
}
// 8th > covid.js
// let url = `https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=10&serviceKey=78016526f2e3c9b73714877ecc253bd7f6ba840908b6588fd5b6a90b9c02fb28`;
let url = `https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=78016526f2e3c9b73714877ecc253bd7f6ba840908b6588fd5b6a90b9c02fb28`;
let total = []; // 전체 센터 목록

fetch(url)
  .then(resp => resp.json()) // json포멧 -> javaScript객체
  .then((result) => {
    // console.log(result);
    total = result.data;
    showPageList(1);
    // console.log(result.data[0]);
  })
  .catch((err) => console.log(err));

//페이지 목록 출력
showPageList = (page = 1) => {
  // 초기화
  document.querySelector('#centerList').innerHTML = '';
  let start, end;
  // start = (--page * 10);
  start = (page-1) * 10;
  end = page * 10;
  total
  .filter((item) => start < item.id  && item.id <= end)
  .forEach((center) => {
    let tr = makeRow(center);
    document.querySelector('#centerList').appendChild(tr);
  });
  makePagingList();
};
// 총 항목의 수에 따라 페이징 목록 => 13, 11,12,13,14,15,16,17,18,19 ... 29
makePagingList = () => {
  const paging = {
    currPage:1,
    startPage:1,
    endPage:10,
    prev:false,
    next:false,
    initPage(page = 1, totalCnt = 284){
      let realEnd = Math.ceil(totalCnt/10);
      this.currPage = page; // 13
      this.endPage = Math.ceil(page/10) * 10;// 올림 함수 13/10  => ceil(1.3) => 2 
      this.startPage = this.endPage - 9;
      this.prev = this.startPage == 1 ? false : true; // 이전의 10페이지가 있는지
      // this.next = this.end > realEnd ? realEnd: this.end;
      this.next = this.endPage < realEnd ? true : false;
    }
  }
  paging.initPage(7);
  console.log(paging);
  let target = document.querySelector('ul.pagination');
  target.innerHTML = '';
  // ul tag
  if (paging.prev) {
    let li = document.createElement('li');
    li.className = `page-item`;

    let a = document.createElement('a');
    a.innerText = 'Previous';
    a.className = ' page-link';
    li.appendChild(a);
    target.appendChild(li);
  }
  else{
    let li = document.createElement('li');
    li.className = `page-item disabled`;

    let a = document.createElement('a');
    a.innerText = 'Previous';
    a.className = ' page-link';
    li.appendChild(a);
    target.appendChild(li);
  }

  // ul tag
  for(let s = paging.startPage; s <= paging.endPage; s++){
    let li = document.createElement('li');
    li.className = `page-item`
    let a = document.createElement('a');
    a.innerText = s;
    a.className = ' page-link';
    a.setAttribute('href', '#');

    li.appendChild(a);
    target.appendChild(li);
  }

  if (paging.next) {
    let li = document.createElement('li');
    li.className = `page-item`;

    let a = document.createElement('a');
    a.innerText = 'Next';
    a.className = ' page-link';
    li.appendChild(a);
    target.appendChild(li);
  }
  else{
    let li = document.createElement('li');
    li.className = `page-item disabled`;

    let a = document.createElement('a');
    a.innerText = 'Next';
    a.className = ' page-link';
    li.appendChild(a);
    target.appendChild(li);
  }
  // paging.initPage(1);
  pageLinkEvnet();
}

//화면의 a태그에 링크 생성
pageLinkEvnet = () => {
  document.querySelectorAll('a.page-link').forEach((item, index, ary) => {
    // 이벤트 등록
    item.addEventListener('click', (e) => {
      e.preventDefault(); // 기본 기능 차단
      let page = item.innerHTML;
      showPageList(page);
    });
  });
};

// 센터 -> 한건 출력.
makeRow = (center) => {
  const fields = ['id', 'centerName', 'address', 'sido'];
  let tr = document.createElement('tr');
  for (const field of fields) {
    let td = document.createElement('td');
    td.innerHTML = center[field];
    tr.appendChild(td);
    document.querySelector('#centerList').appendChild(tr);
  }
  return tr;
};
pageLinkEvnet();
// 8th > covid.js
// let url = `https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=10&serviceKey=78016526f2e3c9b73714877ecc253bd7f6ba840908b6588fd5b6a90b9c02fb28`;
let url = `https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=78016526f2e3c9b73714877ecc253bd7f6ba840908b6588fd5b6a90b9c02fb28`;
let total = []; // 전체 센터 목록

fetch(url)
  .then(resp => resp.json()) // json포멧 -> javaScript객체
  .then((result) => {
    // console.log(result);
    total = result.data;
    showPageList(2);
    // console.log(result.data[0]);
  })
  .catch((err) => console.log(err));

//페이지 목록 출력
showPageList = (page = 1) => {
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
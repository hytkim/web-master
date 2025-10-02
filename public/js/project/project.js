// web-master > public > js > project > project.js
// 최초 실행시 방문자에게 가장 많이 팔린 상품을 정렬해서 보여줌.
fetch(`http://localhost:3000/history`)
.then(response => response.json())
//.then(resultCount => resultCount.sort((item1, item2) => item2.HISTORY_COUNT - item1.HISTORY_COUNT))
//.then(resultPay => resultPay.sort((item1, item2) => (item2.HISTORY_COUNT - item1.HISTORY_COUNT) && item2.HISTORY_ITEM_TOTALPAY - item1.HISTORY_ITEM_TOTALPAY).slice(0, 4))
.then(data =>  [...data].sort((a, b) => 
        b.HISTORY_COUNT !== a.HISTORY_COUNT
          ? b.HISTORY_COUNT - a.HISTORY_COUNT
          : b.HISTORY_ITEM_TOTALPAY - a.HISTORY_ITEM_TOTALPAY).slice(0, 4))
.then(res => {
  document.querySelector('.card-container').innerHTML = '';
  console.log(`팔린갯수 기준 내림차순 => 가격기준 내림차순 & 상위 4개 정렬`);
  console.log('res is: ',res);
  res.forEach(item => {
    let div = MakeRow(item);
    document.querySelector('.card-container').appendChild(div);
  });
})
.catch(err => console.log(err));

/**
 * 상품 데이터 객체를 받아 HTML 카드 요소를 생성하는 함수
 * @param {object} item - 상품 정보 객체
 * @returns {HTMLElement} - 생성된 div 카드 요소
 */
const MakeRow = (item) => {
  // 카드 전체를 감싸는 div
  const div = document.createElement('div');
  div.setAttribute('class', 'card');

  // --- 이미지 태그 생성 ---
  const img = document.createElement('img');
  img.setAttribute('class', 'image');
  // DB의 HISTORY_ITEM_IMAGE 키(대문자)로 접근합니다. 값이 없으면 기본 'logo.png'를 사용합니다.
  img.setAttribute('src', item.HISTORY_ITEM_IMAGE || 'logo.png');
  console.log('이거 바꿨는데 DB에서: ', item.HISTORY_ITEM_IMAGE);
  img.setAttribute('alt', '상품 이미지');

  // --- 카드 내용 전체 영역 ---
  const cardContent = document.createElement('div');
  cardContent.setAttribute('class', 'card-content');

  // --- 상품명 ---
  const name = document.createElement('p');
  name.setAttribute('class', 'name');
  // DB의 ITEMS_NAME 키(대문자)로 접근합니다.
  name.innerHTML = item.ITEMS_NAME;

  // --- 가격 영역 ---
  const priceSection = document.createElement('div');
  priceSection.setAttribute('class', 'price-section');

  // 할인율 (0.7 -> 70, 0.05 -> 5)
  const discountPercent = item.DISCOUNT_PERCENT * 100;
  // 최종 가격 계산 (가격 * (1 - 할인율))
  const finalPriceValue = Math.floor(item.ITEMS_PRICE * (1 - item.DISCOUNT_PERCENT));

  // --- 할인이 있는 경우와 없는 경우를 분리하여 표시 ---
  if (discountPercent > 0) {
    // 1. 할인이 적용된 경우

    // 원가 (취소선)
    const originalPrice = document.createElement('del');
    originalPrice.setAttribute('class', 'original-price');
    // DB의 ITEMS_PRICE 키(대문자)로 접근합니다.
    originalPrice.innerHTML = `${Number(item.ITEMS_PRICE).toLocaleString()}원`;
    priceSection.appendChild(originalPrice);

    // 최종 가격 라인 (할인율 + 최종가)
    const finalPriceLine = document.createElement('div');
    finalPriceLine.setAttribute('class', 'final-price-line');

    // 할인율 표시
    const discountRate = document.createElement('span');
    discountRate.setAttribute('class', 'discount-rate');
    discountRate.innerHTML = `${discountPercent}%`;
    finalPriceLine.appendChild(discountRate);

    // 최종가 표시
    const finalPrice = document.createElement('span');
    finalPrice.setAttribute('class', 'final-price');
    finalPrice.innerHTML = `${finalPriceValue.toLocaleString()}원`;
    finalPriceLine.appendChild(finalPrice);
    
    priceSection.appendChild(finalPriceLine);

  } else {
    // 2. 할인이 없는 경우 (정가)
    const finalPriceLine = document.createElement('div');
    finalPriceLine.setAttribute('class', 'final-price-line');
    
    const finalPrice = document.createElement('span');
    finalPrice.setAttribute('class', 'final-price');
    finalPrice.innerHTML = `${Number(item.ITEMS_PRICE).toLocaleString()}원`;
    finalPriceLine.appendChild(finalPrice);

    priceSection.appendChild(finalPriceLine);
  }


  // --- 태그 영역 ---
  // 참고: 보내주신 데이터에는 items_category 정보가 없습니다.
  //       만약 DB에 해당 컬럼이 있다면 키 이름을 대문자(ITEMS_CATEGORY)로 변경해주세요.
  const tags = document.createElement('div');
  tags.setAttribute('class', 'tags');
  
  // item.ITEMS_CATEGORY 와 같이 해당 데이터가 있을 경우에만 태그를 추가
  if (item.ITEMS_CATEGORY) {
      const tag = document.createElement('span');
      tag.setAttribute('class', 'tag');
      tag.innerHTML = `#${item.ITEMS_CATEGORY}`;
      tags.appendChild(tag);
  }

  // --- 생성된 요소들을 조립 ---
  // card-content 조립
  cardContent.appendChild(name);
  cardContent.appendChild(priceSection);
  cardContent.appendChild(tags);

  // 전체 카드 조립
  div.appendChild(img);
  div.appendChild(cardContent);

  // 완성된 카드(div) 요소를 반환
  return div;
};
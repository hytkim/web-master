// 상품 데이터 배열 (이미지, 이름, 가격 등)
const products = [
    {
        rank: 1,
        imgSrc: 'https://shop-phinf.pstatic.net/20250310_3/1741577561726tGBJB_JPEG/411621843739980_1130884599.jpg?type=f750_974',
        name: '코피코 커피캔디 800g/kopiko',
        discountRate: '50%',
        finalPrice: '9,900원',
        originalPrice: '19,800원'
    },
    {
        rank: 2,
        imgSrc: 'https://shop-phinf.pstatic.net/20231129_236/1701238834951YXvPM_JPEG/5638112814621435_1576510885.jpg?type=f296_296',
        name: '베르터스 오리지날 슈가프리 80g',
        discountRate: '30%',
        finalPrice: '2,000원',
        originalPrice: '2,800원'
    },
    {
        rank: 3,
        imgSrc: 'https://shop-phinf.pstatic.net/20250310_3/1741577561726tGBJB_JPEG/411621843739980_1130884599.jpg?type=f750_974',
        name: '산가리아 라무네 일본사이다 7종 택1',
        discountRate: '50%',
        finalPrice: '2,100원',
        originalPrice: '2,500원'
    },
    {
        rank: 4,
        imgSrc: 'https://shop-phinf.pstatic.net/20250310_3/1741577561726tGBJB_JPEG/411621843739980_1130884599.jpg?type=f750_974',
        name: '칸로 금의 밀크캔디 80g x4개',
        finalPrice: '9,500원',
        originalPrice: '12,500원'
    }
];

// 상품 목록을 표시할 부모 요소를 선택
const productListContainer = document.querySelector('.product-list');

// 상품 데이터 배열을 순회하며 HTML 요소를 생성
products.forEach(product => {
    // 상품 카드 생성
    const productItem = document.createElement('div');
    productItem.className = 'product-item';

    // 상품 카드 내부 HTML 구조 설정
    productItem.innerHTML = `
        <div class="image-container">
            <span class="rank-badge">${product.rank}</span>
            <img src="${product.imgSrc}" alt="${product.name}">
        </div>
        <div class="info">
            <p class="name">${product.name}</p>
            <p class="price-info">
                ${product.discountRate ? `<span class="discount-rate">${product.discountRate}</span>` : ''}
                <span>${product.finalPrice}</span>
                <span class="original-price">${product.originalPrice}</span>
            </p>
        </div>
    `;

    // 생성된 상품 카드를 부모 요소에 추가
    productListContainer.appendChild(productItem);
});
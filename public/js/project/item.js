document.addEventListener('DOMContentLoaded', () => {
    // --- Global state for the page ---
    let currentItem = null;
    let quantity = 1;

    // --- DOM Elements ---
    const mainContent = document.querySelector('.item-main');
    const quantityInput = document.getElementById('quantity-input');
    const quantityMinusBtn = document.getElementById('quantity-minus');
    const quantityPlusBtn = document.getElementById('quantity-plus');
    const totalPriceEl = document.getElementById('total-price');
    const reviewsContainer = document.getElementById('reviews-container');

    // --- Initialization ---
    const params = new URLSearchParams(window.location.search);
    const itemNo = params.get('item_no');

    if (!itemNo) {
        mainContent.innerHTML = '<h1>오류: 상품 번호가 없습니다.</h1>';
        return;
    }

    // --- Data Fetching ---
    // 1. Fetch main item data
    fetch(`http://localhost:3000/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_no: itemNo })
    })
    .then(response => {
        if (!response.ok) throw new Error('상품 정보를 불러오는 데 실패했습니다.');
        return response.json();
    })
    .then(itemData => {
        currentItem = itemData;
        populateItemData(currentItem);
        updateTotalPrice(); // Initial total price calculation
        
        // 2. After fetching item, fetch its reviews
        fetchAndRenderReviews(itemNo);
    })
    .catch(error => {
        console.error('Error fetching item data:', error);
        mainContent.innerHTML = `<h1>${error.message}</h1>`;
    });

    // --- Event Listeners ---
    quantityMinusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
            updateTotalPrice();
        }
    });

    quantityPlusBtn.addEventListener('click', () => {
        quantity++;
        quantityInput.value = quantity;
        updateTotalPrice();
    });

    // --- Functions ---

    function populateItemData(item) {
        document.getElementById('item-image').src = item.ITEMS_IMAGE || 'logo.png';
        document.getElementById('item-title').textContent = item.ITEMS_NAME;
        document.getElementById('item-origin').textContent = item.ITEMS_ORIGIN ? `[원산지:${item.ITEMS_ORIGIN}]` : '';
        // BUG FIX: Use ITEMS_INFO instead of ITEMS_DESC
        document.getElementById('item-description-content').textContent = item.ITEMS_INFO || '상세 정보가 없습니다.';
        document.title = item.ITEMS_NAME;
        renderPrice(document.getElementById('item-price-display'), item);
    }

    function renderPrice(container, item) {
        const discountPercent = (item.DISCOUNT_PERCENT || 0) * 100;
        const finalPriceValue = Math.round(item.ITEMS_PRICE * (1 - (item.DISCOUNT_PERCENT || 0)));

        if (discountPercent > 0) {
            container.innerHTML = `
                <del class="original-price">${Number(item.ITEMS_PRICE).toLocaleString()}원</del>
                <div class="final-price-line">
                    <span class="discount-rate">${discountPercent}%</span>
                    <span class="final-price">${finalPriceValue.toLocaleString()}원</span>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="final-price-line">
                    <span class="final-price">${finalPriceValue.toLocaleString()}원</span>
                </div>
            `;
        }
    }

    function updateTotalPrice() {
        if (!currentItem) return;
        const finalPriceValue = Math.round(currentItem.ITEMS_PRICE * (1 - (currentItem.DISCOUNT_PERCENT || 0)));
        const total = finalPriceValue * quantity;
        totalPriceEl.textContent = `${total.toLocaleString()}원`;
    }

    function fetchAndRenderReviews(itemNo) {
        fetch(`http://localhost:3000/reviews/${itemNo}`)
            .then(response => {
                if (!response.ok) throw new Error('리뷰를 불러오는 데 실패했습니다.');
                return response.json();
            })
            .then(reviews => {
                reviewsContainer.innerHTML = ''; // Clear placeholder
                if (reviews.length === 0) {
                    reviewsContainer.innerHTML = '<p>작성된 리뷰가 없습니다.</p>';
                    return;
                }
                reviews.forEach(review => {
                    const reviewEl = createReviewElement(review);
                    reviewsContainer.appendChild(reviewEl);
                });
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                reviewsContainer.innerHTML = '<p>리뷰를 불러오는 중 오류가 발생했습니다.</p>';
            });
    }

    function createReviewElement(review) {
        const div = document.createElement('div');
        div.className = 'review-item';

        const maskedUserId = review.USER_ID ? review.USER_ID.substring(0, 4) + '****' : '익명';

        div.innerHTML = `
            <div class="review-header">
                <strong class="review-title">${review.BOARD_TITLE}</strong>
                <span class="review-author">${maskedUserId}</span>
                <span class="review-date">${review.WRITER_DATE}</span>
            </div>
            <div class="review-content">
                <p>${review.BOARD_CONTENT || '내용이 없습니다.'}</p>
            </div>
        `;
        return div;
    }
});

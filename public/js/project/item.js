
document.addEventListener('DOMContentLoaded', () => {
    // --- Global state ---
    let currentItem = null;
    let quantity = 1;
    let loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    let pointsToUse = 0;

    // --- DOM Elements ---
    const mainContent = document.querySelector('.item-main');
    const quantityInput = document.getElementById('quantity-input');
    const quantityMinusBtn = document.getElementById('quantity-minus');
    const quantityPlusBtn = document.getElementById('quantity-plus');
    const totalPriceEl = document.getElementById('total-price');
    const reviewsContainer = document.getElementById('reviews-container');
    const buyNowBtn = document.querySelector('.buy-now-btn');

    // Purchase Popup Elements
    const purchasePopupWrapper = document.getElementById('purchase-popup-wrapper');
    const purchasePopup = document.getElementById('purchase-popup');
    const purchaseCloseBtn = document.getElementById('purchase-close-btn');
    const purchaseCancelBtn = document.getElementById('purchase-cancel-btn');
    const purchaseConfirmBtn = document.getElementById('purchase-confirm-btn');
    const purchasePostcodeBtn = document.getElementById('purchase-postcode-btn');

    // --- Initialization ---
    const params = new URLSearchParams(window.location.search);
    const itemNo = params.get('item_no');

    if (!itemNo) {
        mainContent.innerHTML = '<h1>오류: 상품 번호가 없습니다.</h1>';
        return;
    }

    // --- Data Fetching ---
    fetch(`http://192.168.0.15:3000/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_no: itemNo })
    })
    .then(response => response.json())
    .then(itemData => {
        if (!itemData) throw new Error('상품 정보를 불러오는 데 실패했습니다.');
        currentItem = itemData;
        populateItemData(currentItem);
        updateTotalPrice();
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

    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            if (!loggedInUser) {
                alert('구매하려면 로그인이 필요합니다.');
                document.getElementById('open-login')?.click();
            } else {
                showPurchasePopup();
            }
        });
    }

    reviewsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-comment-btn')) {
            handleCommentDelete(event);
        }
    });

    purchaseCloseBtn.addEventListener('click', hidePurchasePopup);
    purchaseCancelBtn.addEventListener('click', hidePurchasePopup);
    purchasePopupWrapper.addEventListener('click', (e) => { 
        if (e.target === purchasePopupWrapper) hidePurchasePopup(); 
    });
    purchaseConfirmBtn.addEventListener('click', handlePurchaseConfirm);
    purchasePostcodeBtn.addEventListener('click', () => execDaumPostcode_purchase());

    // --- Core Functions ---
    function populateItemData(item) {
        document.getElementById('item-image').src = item.ITEMS_IMAGE || 'logo.png';
        document.getElementById('item-title').textContent = item.ITEMS_NAME;
        document.getElementById('item-origin').textContent = item.ITEMS_ORIGIN ? `[원산지:${item.ITEMS_ORIGIN}]` : '';
        document.getElementById('item-description-content').textContent = item.ITEMS_INFO || '상세 정보가 없습니다.';
        document.title = item.ITEMS_NAME;
        renderPrice(document.getElementById('item-price-display'), item);
    }

    function renderPrice(container, item) {
        const discountPercent = (item.DISCOUNT_PERCENT || 0) * 100;
        const finalPriceValue = Math.round(item.ITEMS_PRICE * (1 - (item.DISCOUNT_PERCENT || 0)));
        container.innerHTML = discountPercent > 0 ? `
            <del class="original-price">${Number(item.ITEMS_PRICE).toLocaleString()}원</del>
            <div class="final-price-line">
                <span class="discount-rate">${discountPercent}%</span>
                <span class="final-price">${finalPriceValue.toLocaleString()}원</span>
            </div>` : `
            <div class="final-price-line">
                <span class="final-price">${finalPriceValue.toLocaleString()}원</span>
            </div>`;
    }

    function updateTotalPrice() {
        if (!currentItem) return;
        const finalPriceValue = Math.round(currentItem.ITEMS_PRICE * (1 - (currentItem.DISCOUNT_PERCENT || 0)));
        totalPriceEl.textContent = `${(finalPriceValue * quantity).toLocaleString()}원`;
    }

    // --- Purchase Popup Functions ---
    function showPurchasePopup() {
        if (!currentItem || !loggedInUser) return;

        const finalPriceValue = Math.round(currentItem.ITEMS_PRICE * (1 - (currentItem.DISCOUNT_PERCENT || 0)));
        const totalPrice = finalPriceValue * quantity;
        const userPoints = loggedInUser.USER_POINT || 0;

        pointsToUse = Math.min(totalPrice, userPoints);
        const finalPayment = totalPrice - pointsToUse;

        document.getElementById('purchase-item-image').src = currentItem.ITEMS_IMAGE || 'logo.png';
        document.getElementById('purchase-item-name').textContent = currentItem.ITEMS_NAME;
        document.getElementById('purchase-quantity').textContent = quantity;
        document.getElementById('purchase-total-price').textContent = `${totalPrice.toLocaleString()}원`;
        document.getElementById('purchase-user-points').textContent = `${userPoints.toLocaleString()} P`;
        document.getElementById('purchase-points-used').textContent = `- ${pointsToUse.toLocaleString()} P`;
        
        // 주소 필드 초기화 및 기본값 설정
        document.getElementById('purchase-postcode').value = '';
        // document.getElementById('purchase-address').value = loggedInUser.USER_ADDRESS || '';
        document.getElementById('purchase-address').value = '';
        document.getElementById('purchase-detailAddress').value = '';

        document.getElementById('purchase-final-price').textContent = `${finalPayment.toLocaleString()}원`;

        purchasePopupWrapper.style.display = 'flex';
    }

    function hidePurchasePopup() {
        purchasePopupWrapper.style.display = 'none';
    }

    function handlePurchaseConfirm() {
        const finalPriceValue = Math.round(currentItem.ITEMS_PRICE * (1 - (currentItem.DISCOUNT_PERCENT || 0)));
        const totalPrice = finalPriceValue * quantity;
        
        const baseAddress = document.getElementById('purchase-address').value;
        const detailAddress = document.getElementById('purchase-detailAddress').value;
        const fullAddress = `${baseAddress} ${detailAddress}`.trim();

        if (!fullAddress) {
            alert('배송지를 입력해주세요.');
            return;
        }

        const finalPayment = totalPrice - pointsToUse;

        const purchaseData = {
            items_no: currentItem.ITEMS_NO,
            user_id: loggedInUser.USER_ID,
            item_name: currentItem.ITEMS_NAME,
            count: quantity,
            total_pay: totalPrice,
            address: fullAddress,
            item_image: currentItem.ITEMS_IMAGE,
            points_used: pointsToUse // 사용 포인트 추가
        };

        fetch('http://192.168.0.15:3000/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(purchaseData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success && result.updatedUser) {
                alert('구매가 완료되었습니다!');
                
                // 1. sessionStorage와 전역 변수 업데이트
                sessionStorage.setItem('user', JSON.stringify(result.updatedUser));
                loggedInUser = result.updatedUser;

                // 2. UI 갱신을 위해 authChange 이벤트 발생 (project.js에서 감지하여 처리)
                document.dispatchEvent(new CustomEvent('authChange'));
                
                hidePurchasePopup();
            } else {
                throw new Error(result.message || '구매 처리 중 오류가 발생했습니다.');
            }
        })
        .catch(error => {
            console.error('Error during purchase:', error);
            alert(error.message);
        });
    }

    // --- Review and Comment Functions ---
    function fetchAndRenderReviews(itemNo) {
        fetch(`http://192.168.0.15:3000/reviews/${itemNo}`)
            .then(response => response.json())
            .then(reviews => {
                reviewsContainer.innerHTML = '';
                if (reviews.length === 0) {
                    reviewsContainer.innerHTML = '<p>작성된 리뷰가 없습니다.</p>';
                    return;
                }
                reviews.forEach(review => {
                    const reviewEl = createReviewElement(review);
                    reviewsContainer.appendChild(reviewEl);
                    const commentsContainer = reviewEl.querySelector('.comments-container');
                    if (review.BOARD_NO && commentsContainer) {
                        fetchAndRenderComments(review.BOARD_NO, commentsContainer);
                    }
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
            <div class="comments-section" data-board-no="${review.BOARD_NO}">
                <div class="comments-container"></div>
                ${loggedInUser ? `
                <form class="comment-form">
                    <textarea name="comment-content" placeholder="댓글을 입력하세요..." required></textarea>
                    <button type="submit">댓글 등록</button>
                </form>
                ` : `
                <div class="comment-login-prompt">
                    <p>댓글을 작성하려면 <a href="#" class="login-link">로그인</a>이 필요합니다.</p>
                </div>
                `}
            </div>
        `;

        const commentForm = div.querySelector('.comment-form');
        if (commentForm) {
            commentForm.addEventListener('submit', handleCommentSubmit);
        }
        
        const loginLink = div.querySelector('.login-link');
        if (loginLink) {
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('open-login')?.click();
            });
        }

        return div;
    }

    function fetchAndRenderComments(boardNo, container) {
        fetch(`http://192.168.0.15:3000/comments/list`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ board_no: boardNo })
        })
            .then(response => response.json())
            .then(comments => {
                container.innerHTML = '';
                if (comments.length > 0) {
                    comments.forEach(comment => {
                        container.appendChild(createCommentElement(comment));
                    });
                }
            })
            .catch(error => {
                console.error(`Error fetching comments for board ${boardNo}:`, error);
                container.innerHTML = '<p>댓글을 불러오는 중 오류가 발생했습니다.</p>';
            });
    }

    function createCommentElement(comment) {
        const div = document.createElement('div');
        div.className = 'comment-item';
        const maskedUserId = comment.USER_ID ? comment.USER_ID.substring(0, 4) + '****' : '익명';
        
        const deleteButtonHtml = (loggedInUser && loggedInUser.USER_ID === comment.USER_ID)
            ? `<button class="delete-comment-btn" data-comment-no="${comment.COMMENTS_NO}">&times;</button>`
            : '';

        div.innerHTML = `
            <div class="comment-author">${maskedUserId}</div>
            <div class="comment-content">${comment.COMMENTS_CONTENT}</div>
            <div class="comment-date">${comment.WRITER_DATE}</div>
            ${deleteButtonHtml}
        `;
        return div;
    }

    function handleCommentSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const commentsSection = form.closest('.comments-section');
        const boardNo = commentsSection.dataset.boardNo;
        const content = form.querySelector('textarea').value.trim();

        if (!content || !boardNo || !loggedInUser) {
            alert('댓글 내용이 없거나 로그인 상태가 아닙니다.');
            return;
        }

        fetch('http://192.168.0.15:3000/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                board_no: boardNo,
                user_id: loggedInUser.USER_ID,
                content: content
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                form.querySelector('textarea').value = '';
                const commentsContainer = commentsSection.querySelector('.comments-container');
                fetchAndRenderComments(boardNo, commentsContainer);
            } else {
                throw new Error(result.message || '댓글 등록에 실패했습니다.');
            }
        })
        .catch(error => {
            console.error('Error submitting comment:', error);
            alert(error.message);
        });
    }

    function handleCommentDelete(event) {
        const button = event.target;
        const commentNo = button.dataset.commentNo;
        
        if (!commentNo || !loggedInUser) {
            alert('삭제 권한이 없습니다.');
            return;
        }

        if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
            return;
        }

        fetch('http://192.168.0.15:3000/comments', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                comments_no: commentNo,
                user_id: loggedInUser.USER_ID
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                button.closest('.comment-item').remove();
            } else {
                throw new Error(result.message || '댓글 삭제에 실패했습니다.');
            }
        })
        .catch(error => {
            console.error('Error deleting comment:', error);
            alert(error.message);
        });
    }

    // --- Auth Change Listener ---
    document.addEventListener('authChange', () => {
        window.location.reload();
    });
});

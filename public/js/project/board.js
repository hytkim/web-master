document.addEventListener('DOMContentLoaded', function () {
    // --- Global State ---
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    let availableCategories = []; // 카테고리 목록 저장

    // --- DOM Elements ---
    const pageTitle = document.getElementById('page-title');
    const contentContainer = document.getElementById('content-container');

    // --- Review Popup Elements ---
    const reviewPopupWrapper = document.getElementById('review-popup-wrapper');
    const reviewPopup = document.getElementById('review-popup');
    const reviewCloseBtn = document.getElementById('review-close-btn');
    const reviewForm = document.forms.reviewForm;

    // --- Initialization ---
    fetchAndPopulateCategories().then(() => {
        initializeBoardPage();
    });

    // --- Event Listeners ---
    window.addEventListener('hashchange', initializeBoardPage);

    contentContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-review-btn')) {
            handleReviewDelete(event.target);
        }
    });

    // --- Functions ---
    async function fetchAndPopulateCategories() {
        try {
            const response = await fetch('http://192.168.0.15:3000/categories');
            const data = await response.json();
            if (data.success) {
                availableCategories = data.categories;
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    function initializeBoardPage() {
        const hash = window.location.hash;
        if (hash === '#history') {
            if (!loggedInUser) {
                alert('거래 내역을 보려면 로그인이 필요합니다.');
                window.location.hash = '#reviews';
                showReviews();
                document.getElementById('open-login')?.click();
            } else {
                showHistory();
            }
        } else {
            showReviews();
        }
    }

    // 1. 리뷰 게시판 기능
    function showReviews() {
        pageTitle.textContent = '리뷰 게시판';
        
        const myPostsButtonHtml = loggedInUser 
            ? '<button type="button" id="my-posts-btn">내 글 보기</button>' 
            : '';

        contentContainer.innerHTML = `
            <div class="board-list">...</div>
            <div class="search-bar" id="review-search-bar">
                <select name="search-type" id="search-type">
                    <option value="title">제목</option>
                    <option value="category">상품 종류</option>
                </select>
                <div id="search-input-container">
                    <input type="text" id="search-keyword" placeholder="검색어를 입력하세요">
                </div>
                <button type="submit" id="search-btn">검색</button>
                ${myPostsButtonHtml}
            </div>
        `;
        updateReviewSearchUI('title'); // 초기 UI 설정
        fetchAndRenderBoard();

        document.getElementById('search-type').addEventListener('change', (e) => {
            updateReviewSearchUI(e.target.value);
        });
        document.getElementById('search-btn').addEventListener('click', handleReviewSearch);
        
        if (loggedInUser) {
            const myPostsBtn = document.getElementById('my-posts-btn');
            if(myPostsBtn) {
                myPostsBtn.addEventListener('click', handleMyPostsSearch);
            }
        }
    }

    function updateReviewSearchUI(searchType) {
        const inputContainer = document.getElementById('search-input-container');
        if (searchType === 'title') {
            inputContainer.innerHTML = '<input type="text" id="search-keyword" placeholder="검색어를 입력하세요">';
            inputContainer.querySelector('#search-keyword').addEventListener('keyup', (e) => {
                if (e.key === 'Enter') handleReviewSearch();
            });
        } else if (searchType === 'category') {
            const options = availableCategories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
            inputContainer.innerHTML = `<select id="category-select">${options}</select>`;
        }
    }

    function handleReviewSearch() {
        const searchType = document.getElementById('search-type').value;
        let keyword = '';
        if (searchType === 'title') {
            keyword = document.getElementById('search-keyword').value.trim();
        } else if (searchType === 'category') {
            keyword = document.getElementById('category-select').value;
        }
        
        // '내 글 보기' 버튼 비활성화
        const myPostsBtn = document.getElementById('my-posts-btn');
        if (myPostsBtn) {
            myPostsBtn.classList.remove('active');
        }

        fetchAndRenderBoard(searchType, keyword);
    }

    function handleMyPostsSearch() {
        if (!loggedInUser) return;
        const myPostsBtn = document.getElementById('my-posts-btn');
        const isActive = myPostsBtn.classList.toggle('active');

        if (isActive) {
            // '내 글 보기' 활성화
            document.getElementById('search-type').value = 'title';
            updateReviewSearchUI('title');
            fetchAndRenderBoard('my_posts', loggedInUser.USER_ID);
        } else {
            // '내 글 보기' 비활성화 (전체 목록 보기)
            fetchAndRenderBoard();
        }
    }

    function fetchAndRenderBoard(searchType = '', keyword = '') {
        let boardList = document.querySelector('.board-list');
        if (!boardList) {
            boardList = document.createElement('div');
            boardList.className = 'board-list';
            contentContainer.prepend(boardList);
        }
        boardList.innerHTML = `<ul class="post-list"><li>리뷰를 불러오는 중...</li></ul>`;

        let url = new URL('http://192.168.0.15:3000/board');
        if (searchType && keyword) {
            url.searchParams.set('searchType', searchType);
            url.searchParams.set('keyword', keyword);
        }

        fetch(url)
            .then(response => response.json())
            .then(posts => {
                const showActions = loggedInUser && posts.some(post => post.USER_ID === loggedInUser.USER_ID);
                
                boardList.classList.toggle('actions-visible', showActions);

                const headerHtml = `
                    <div class="board-header">
                        <div class="board-col-title">제목/상품</div>
                        <div class="board-col-author">작성자</div>
                        <div class="board-col-date">작성일</div>
                        <div class="board-col-actions">관리</div>
                    </div>
                `;

                let postsHtml = '';
                if (posts.length === 0) {
                    postsHtml = '<li class="no-history">검색 결과가 없습니다.</li>';
                } else {
                    postsHtml = posts.map(post => createBoardPostItem(post).outerHTML).join('');
                }

                boardList.innerHTML = headerHtml + `<ul class="post-list">${postsHtml}</ul>`;
            })
            .catch(error => {
                console.error('Error fetching board data:', error);
                boardList.innerHTML = '<ul><li class="no-history">게시물을 불러오는 데 실패했습니다.</li></ul>';
            });
    }

    function createBoardPostItem(post) {
        const li = document.createElement('li');
        li.className = 'post-item';
        const maskedUserId = post.USER_ID ? post.USER_ID.substring(0, 4) + '****' : 'unknown';
        const formattedDate = new Date(post.WRITER_DATE).toLocaleDateString('ko-KR');

        const isAuthor = loggedInUser && loggedInUser.USER_ID === post.USER_ID;
        const deleteButtonHtml = isAuthor
            ? `<button class="delete-review-btn" data-board-no="${post.BOARD_NO}">삭제</button>`
            : '';

        li.innerHTML = `
            <div class="post-col-title">
                <img src="${post.ITEMS_IMAGE || 'logo.png'}" alt="상품 썸네일" class="post-thumbnail">
                <div class="post-content">
                    <a href="item.html?item_no=${post.ITEMS_NO}" class="post-title">${post.BOARD_TITLE}</a>
                    <span class="post-subtitle">${post.ITEMS_NAME}</span>
                </div>
            </div>
            <div class="post-col-author">${maskedUserId}</div>
            <div class="post-col-date">${formattedDate}</div>
            <div class="post-col-actions">${deleteButtonHtml}</div>
        `;
        return li;
    }

    // 2. 거래 내역 조회 기능 (이하 동일)
    function showHistory() {
        pageTitle.textContent = '거래 내역 조회';
        contentContainer.innerHTML = `
            <div class="history-list">...</div>
        `;
        fetchAndRenderHistory();
    }

    function fetchAndRenderHistory() {
        const historyList = document.createElement('div');
        historyList.className = 'history-list';
        historyList.innerHTML = `
             <div class="history-header">
                <div class="history-col-no">거래번호</div>
                <div class="history-col-item">상품 정보</div>
                <div class="history-col-details">거래 상세</div>
                <div class="history-col-address">배송지</div>
                <div class="history-col-actions">리뷰</div>
            </div>
            <ul class="purchase-list"><li>거래 내역을 불러오는 중...</li></ul>
        `;
        contentContainer.innerHTML = '';
        contentContainer.appendChild(historyList);
        const purchaseList = historyList.querySelector('.purchase-list');

        // 관리자(user_access === 1) 여부에 따라 다른 API 호출
        const isAdmin = loggedInUser && loggedInUser.USER_ACCESS === 1;
        const url = `http://192.168.0.15:3000/history/${isAdmin ? 'all' : 'user'}`;
        const fetchOptions = {
            method: isAdmin ? 'GET' : 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

        if (!isAdmin) {
            fetchOptions.body = JSON.stringify({ user_id: loggedInUser.USER_ID });
        }

        fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => {
            if (!data.success) throw new Error(data.message || '거래 내역 조회 실패');
            purchaseList.innerHTML = '';
            if (data.history.length === 0) {
                purchaseList.innerHTML = '<li class="no-history">거래 내역이 없습니다.</li>';
                return;
            }
            data.history.forEach(item => {
                purchaseList.appendChild(createHistoryItem(item));
            });
        })
        .catch(error => {
            console.error('Error fetching history data:', error);
            purchaseList.innerHTML = '<li class="no-history">거래 내역을 불러오는 중 오류가 발생했습니다.</li>';
        });
    }

    function createHistoryItem(item) {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            <div class="history-col-no">${item.HISTORY_NO}</div>
            <div class="history-col-item">
                <img src="${item.HISTORY_ITEM_IMAGE || 'logo.png'}" alt="상품 이미지">
                <span>${item.HISTORY_ITEM_NAME}</span>
            </div>
            <div class="history-col-details">
                <div><strong>수량:</strong> ${item.HISTORY_COUNT}개</div>
                <div><strong>결제 금액:</strong> ${Number(item.HISTORY_ITEM_TOTALPAY).toLocaleString()}원</div>
                <div><strong>상태:</strong> ${item.HISTORY_NOTE}</div>
                <div><strong>거래일:</strong> ${item.FORMATTED_DATE}</div>
            </div>
            <div class="history-col-address">${item.HISTORY_ADDRESS}</div>
            <div class="history-col-actions">
                ${(item.HISTORY_NOTE === '출고' && loggedInUser && loggedInUser.USER_ID === item.USER_ID)
                    ? `<button class="write-review-btn" data-item-no="${item.ITEMS_NO}" data-item-name="${item.HISTORY_ITEM_NAME}">리뷰 작성</button>`
                    : ''
                }
            </div>
        `;
        return li;
    }

    function handleReviewDelete(button) {
        const boardNo = button.dataset.boardNo;
        if (!boardNo || !loggedInUser) {
            alert('삭제 권한이 없습니다.');
            return;
        }

        if (!confirm('정말로 이 리뷰를 삭제하시겠습니까? 연관된 댓글도 모두 삭제됩니다.')) {
            return;
        }

        fetch('http://192.168.0.15:3000/board', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                board_no: boardNo,
                user_id: loggedInUser.USER_ID
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('리뷰가 삭제되었습니다.');
                button.closest('.post-item').remove();
            } else {
                throw new Error(result.message || '리뷰 삭제에 실패했습니다.');
            }
        })
        .catch(error => {
            console.error('Error deleting review:', error);
            alert(error.message);
        });
    }

    // --- Auth Change Listener ---
    document.addEventListener('authChange', () => {
        window.location.reload();
    });

    // =====================================================
    // ======== 3. 리뷰 작성 팝업 관련 기능 ========
    // =====================================================

    function openReviewPopup(itemNo, itemName) {
        if (!reviewForm) return;
        reviewForm.elements.items_no.value = itemNo;
        document.getElementById('review-item-name').textContent = `상품: ${itemName}`;
        if(reviewPopupWrapper) reviewPopupWrapper.style.display = 'flex';
    }

    function closeReviewPopup() {
        if (!reviewPopupWrapper) return;
        reviewForm.reset();
        reviewPopupWrapper.style.display = 'none';
    }

    // '리뷰 작성' 버튼에 대한 이벤트 리스너 (이벤트 위임)
    contentContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('write-review-btn')) {
            const button = event.target;
            const itemNo = button.dataset.itemNo;
            const itemName = button.dataset.itemName;
            openReviewPopup(itemNo, itemName);
        }
    });

    // 팝업 닫기 버튼
    if (reviewCloseBtn) {
        reviewCloseBtn.addEventListener('click', closeReviewPopup);
    }
    if (reviewPopupWrapper) {
        reviewPopupWrapper.addEventListener('click', (e) => {
            if (e.target === reviewPopupWrapper) {
                closeReviewPopup();
            }
        });
    }

    // 리뷰 폼 제출 처리
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(reviewForm);
            const reviewData = Object.fromEntries(formData.entries());

            if (!loggedInUser) {
                alert('리뷰를 작성하려면 로그인이 필요합니다.');
                return;
            }
            reviewData.user_id = loggedInUser.USER_ID;

            fetch('http://192.168.0.15:3000/board', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('리뷰가 성공적으로 등록되었습니다.');
                    closeReviewPopup();
                    // 성공 후, '리뷰 작성' 버튼을 비활성화하거나 '작성 완료'로 변경
                    const submittedBtn = document.querySelector(`.write-review-btn[data-item-no="${reviewData.items_no}"]`);
                    if (submittedBtn) {
                        submittedBtn.textContent = '작성 완료';
                        submittedBtn.disabled = true;
                    }
                } else {
                    throw new Error(result.message || '리뷰 등록에 실패했습니다.');
                }
            })
            .catch(error => {
                console.error('Error submitting review:', error);
                alert(error.message);
            });
        });
    }
});
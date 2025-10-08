document.addEventListener('DOMContentLoaded', function () {
    // --- Global State ---
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    let availableCategories = []; // 카테고리 목록 저장

    // --- DOM Elements ---
    const pageTitle = document.getElementById('page-title');
    const contentContainer = document.getElementById('content-container');

    // --- Initialization ---
    fetchAndPopulateCategories().then(() => {
        initializeBoardPage();
    });

    // --- Event Listeners ---
    window.addEventListener('hashchange', initializeBoardPage);

    // --- Functions ---
    async function fetchAndPopulateCategories() {
        try {
            const response = await fetch('http://localhost:3000/categories');
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
            </div>
        `;
        updateReviewSearchUI('title'); // 초기 UI 설정
        fetchAndRenderBoard();

        document.getElementById('search-type').addEventListener('change', (e) => {
            updateReviewSearchUI(e.target.value);
        });
        document.getElementById('search-btn').addEventListener('click', handleReviewSearch);
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
        fetchAndRenderBoard(searchType, keyword);
    }

    function fetchAndRenderBoard(searchType = '', keyword = '') {
        const boardList = document.querySelector('.board-list');
        if (!boardList) {
            boardList = document.createElement('div');
            boardList.className = 'board-list';
            contentContainer.prepend(boardList);
        }
        boardList.innerHTML = `
            <div class="board-header">
                <div class="board-col-title">제목/상품</div>
                <div class="board-col-author">작성자</div>
                <div class="board-col-date">작성일</div>
            </div>
            <ul class="post-list"><li>리뷰를 불러오는 중...</li></ul>
        `;
        const postList = boardList.querySelector('.post-list');
        let url = new URL('http://localhost:3000/board');
        if (searchType && keyword) {
            url.searchParams.set('searchType', searchType);
            url.searchParams.set('keyword', keyword);
        }

        fetch(url)
            .then(response => response.json())
            .then(posts => {
                postList.innerHTML = '';
                if (posts.length === 0) {
                    postList.innerHTML = '<li class="no-history">검색 결과가 없습니다.</li>';
                    return;
                }
                posts.forEach(post => {
                    postList.appendChild(createBoardPostItem(post));
                });
            })
            .catch(error => {
                console.error('Error fetching board data:', error);
                postList.innerHTML = '<li>게시물을 불러오는 데 실패했습니다.</li>';
            });
    }

    function createBoardPostItem(post) {
        const li = document.createElement('li');
        li.className = 'post-item';
        const maskedUserId = post.USER_ID ? post.USER_ID.substring(0, 4) + '****' : 'unknown';
        const formattedDate = new Date(post.WRITER_DATE).toLocaleDateString('ko-KR');
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
            </div>
            <ul class="purchase-list"><li>거래 내역을 불러오는 중...</li></ul>
        `;
        contentContainer.innerHTML = '';
        contentContainer.appendChild(historyList);
        const purchaseList = historyList.querySelector('.purchase-list');
        fetch('http://localhost:3000/history/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: loggedInUser.USER_ID })
        })
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
        `;
        return li;
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const postList = document.querySelector('.post-list');
    const searchTypeSelect = document.getElementById('search-type');
    const searchKeywordInput = document.getElementById('search-keyword');
    const searchBtn = document.getElementById('search-btn');

    if (!postList || !searchTypeSelect || !searchKeywordInput || !searchBtn) {
        console.error('Error: One or more required elements are missing from the DOM.');
        return;
    }

    /**
     * Fetches board data from the server and renders it.
     * @param {string} [searchType=''] - The type of search (e.g., 'title', 'category').
     * @param {string} [keyword=''] - The search keyword.
     */
    function fetchAndRenderBoard(searchType = '', keyword = '') {
        let url = 'http://localhost:3000/board';
        if (searchType && keyword) {
            url += `?searchType=${encodeURIComponent(searchType)}&keyword=${encodeURIComponent(keyword)}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(posts => {
                postList.innerHTML = ''; // Clear existing items
                if (posts.length === 0) {
                    postList.innerHTML = '<li>검색 결과가 없습니다.</li>';
                    return;
                }
                posts.forEach(post => {
                    const postItem = createPostItem(post);
                    postList.appendChild(postItem);
                });
            })
            .catch(error => {
                console.error('Error fetching board data:', error);
                postList.innerHTML = '<li>게시물을 불러오는 데 실패했습니다.</li>';
            });
    }

    /**
     * Creates a post item element from post data.
     * @param {object} post - The post data object.
     * @returns {HTMLElement} - The created list item element.
     */
    function createPostItem(post) {
        const li = document.createElement('li');
        li.className = 'post-item';

        const maskedUserId = post.USER_ID ? post.USER_ID.substring(0, 4) + '****' : 'unknown';

        const date = new Date(post.WRITER_DATE);
        const formattedDate = !isNaN(date)
            ? `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
            : 'N/A';

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

    /**
     * Handles the search action.
     */
    function handleSearch() {
        const searchType = searchTypeSelect.value;
        const keyword = searchKeywordInput.value.trim();
        fetchAndRenderBoard(searchType, keyword);
    }

    // Event Listeners
    searchBtn.addEventListener('click', handleSearch);
    searchKeywordInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    // Initial load of all posts
    fetchAndRenderBoard();
});
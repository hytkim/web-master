document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // ======== 1. 전역 변수 및 DOM 요소 선언 ======== 
    // ======================================================

    // --- 상품 표시 관련 ---
    const cardContainer = document.querySelector('.card-container');
    const bestTab = document.getElementById('best-tab');
    const searchTab = document.getElementById('search-tab');
    
    // --- 상품 검색 관련 ---
    const productSearchBar = document.getElementById('product-search-bar');
    const productSearchInput = document.getElementById('product-search-keyword');
    const productSearchBtn = document.getElementById('product-search-btn');

    // --- 팝업 및 로그인 관련 ---
    const popupWrapper = document.querySelector('.popup-wrapper');
    const popup = document.querySelector('.popup'); // 팝업창 자체
    const openLoginBtn = document.getElementById('open-login');
    const openSignupBtn = document.getElementById('open-signup');
    const closeBtn = document.querySelector('.close-btn');
    const logoLink = document.getElementById('logo-link');
    const popupNavButtons = document.querySelectorAll('.popup nav button');
    const popupSections = document.querySelectorAll('.popup section');
    const authMenu = document.getElementById('auth-menu');
    const userMenu = document.getElementById('user-menu');
    const userNameEl = document.getElementById('user-name');
    const userIdEl = document.getElementById('user-id');
    const userPointEl = document.getElementById('user-point');
    const logoutBtn = document.getElementById('logout-btn');
    const transactionHistoryMenu = document.getElementById('transaction-history-menu');
    const sessionOkBtn = document.getElementById('session-ok-btn');
    const navLiElements = document.querySelectorAll('header nav .menu-left li');

    // ======================================================
    // ======== 2. 상품 및 UI 렌더링 함수 ======== 
    // ======================================================

    const fetchAndRenderProducts = (options = {}) => {
        const { mode = 'best', category = null, keyword = null, searchType = 'name' } = options;
        if (!cardContainer) return;
        
        let url = new URL('http://localhost:3000/history');
        if (mode) url.searchParams.set('mode', mode);
        if (category) url.searchParams.set('category', category);
        if (keyword) {
            url.searchParams.set('keyword', keyword);
            url.searchParams.set('searchType', searchType);
        }

        fetch(url)
            .then(response => response.json())
            .then(items => {
                cardContainer.innerHTML = '';
                if (items.length === 0) {
                    cardContainer.innerHTML = '<p class="no-results">해당 상품이 없습니다.</p>';
                }
                items.forEach(item => {
                    const cardElement = MakeRow(item);
                    cardContainer.appendChild(cardElement);
                });
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                cardContainer.innerHTML = '<p class="no-results">상품을 불러오는 중 오류가 발생했습니다.</p>';
            });
    };

    const MakeRow = (item) => {
        const link = document.createElement('a');
        link.href = `item.html?item_no=${item.ITEMS_NO}`;
        link.className = 'card-link';

        const div = document.createElement('div');
        div.className = 'card';

        const img = document.createElement('img');
        img.className = 'image';
        img.src = item.HISTORY_ITEM_IMAGE || 'logo.png';
        img.alt = item.ITEMS_NAME;

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        const name = document.createElement('p');
        name.className = 'name';
        name.textContent = item.ITEMS_NAME;

        const priceSection = document.createElement('div');
        priceSection.className = 'price-section';

        const discountPercent = (item.DISCOUNT_PERCENT || 0) * 100;
        const finalPriceValue = Math.round(item.ITEMS_PRICE * (1 - (item.DISCOUNT_PERCENT || 0)));

        if (discountPercent > 0) {
            priceSection.innerHTML = `
                <del class="original-price">${Number(item.ITEMS_PRICE).toLocaleString()}원</del>
                <div class="final-price-line">
                    <span class="discount-rate">${discountPercent}%</span>
                    <span class="final-price">${finalPriceValue.toLocaleString()}원</span>
                </div>
            `;
        } else {
            priceSection.innerHTML = `
                <div class="final-price-line">
                    <span class="final-price">${finalPriceValue.toLocaleString()}원</span>
                </div>
            `;
        }

        const tags = document.createElement('div');
        tags.className = 'tags';
        if (item.ITEMS_CATEGORY) {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = `#${item.ITEMS_CATEGORY}`;
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if(productSearchBar) {
                    fetchAndRenderProducts({ mode: 'all', category: item.ITEMS_CATEGORY });
                    productSearchBar.style.display = 'flex';
                    setActiveNav(searchTab);
                }
            });
            tags.appendChild(tag);
        }

        cardContent.append(name, priceSection, tags);
        div.append(img, cardContent);
        link.appendChild(div);

        return link;
    };

    const setActiveNav = (activeTab) => {
        navLiElements.forEach(li => li.classList.remove('active'));
        if (activeTab && activeTab.parentElement) {
            activeTab.parentElement.classList.add('active');
        }
    };

    const initializePage = () => {
        const currentPath = window.location.pathname.split('/').pop();
        const hash = window.location.hash;

        // 1. 비-메인 페이지의 네비게이션 강조 처리
        if (currentPath.startsWith('board.html')) {
            if (hash === '#history') {
                const historyLink = document.querySelector('a[href="board.html#history"]');
                if(historyLink) setActiveNav(historyLink);
            } else { // #reviews 또는 해시 없음
                const reviewLink = document.querySelector('a[href="board.html#reviews"]');
                if(reviewLink) setActiveNav(reviewLink);
            }
            return; 
        } 
        if (currentPath.startsWith('item.html')) {
            setActiveNav(null);
            return;
        }

        // 2. 메인 페이지(index.html)의 초기 탭 설정 및 콘텐츠 로드
        if (hash === '#search' && searchTab) {
            searchTab.click();
        } else { 
            if (bestTab) {
                bestTab.click();
            } else {
                // 예외 상황: bestTab이 없으면 기본 상품 로드
                fetchAndRenderProducts();
            }
        }
    };

    // ======================================================
    // ======== 3. 로그인, 팝업, 세션 관리 함수 ======== 
    // ======================================================

    const showUserInfo = (userData, dispatchEvent = false) => {
        authMenu.style.display = 'none';
        userNameEl.textContent = userData.USER_NAME + '님';
        userIdEl.textContent = `(${userData.USER_ID})`;
        userPointEl.textContent = `P: ${userData.USER_POINT.toLocaleString()}`;
        userMenu.classList.add('active');
        transactionHistoryMenu.style.display = 'list-item';
        sessionStorage.setItem('loginTime', new Date().getTime());
        if (dispatchEvent) {
            document.dispatchEvent(new CustomEvent('authChange', { detail: { loggedIn: true, user: userData } }));
        }
        closePopup();
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('loginTime');
        userMenu.classList.remove('active');
        authMenu.style.display = 'flex';
        userNameEl.textContent = '';
        userIdEl.textContent = '';
        userPointEl.textContent = '';
        transactionHistoryMenu.style.display = 'none';
        const usernameInput = document.querySelector('#username');
        if (usernameInput) usernameInput.value = '';
        const passwordInput = document.querySelector('#password');
        if (passwordInput) passwordInput.value = '';
        document.dispatchEvent(new CustomEvent('authChange', { detail: { loggedIn: false } })); // Dispatch event
    };

    const checkLoginState = () => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            showUserInfo(JSON.parse(storedUser), false); // 이벤트 발생 안 함
        }
    };

    const openPopup = (targetTab) => {
        setActivePopupTab(targetTab);
        popupWrapper.classList.add('active');
    };

    const closePopup = () => {
        popupWrapper.classList.remove('active');
        if (popup) popup.classList.remove('session-mode'); // 세션 모드 클래스 제거
        setActivePopupTab('login'); 
        const formsInPopup = document.querySelectorAll('.popup form');
        formsInPopup.forEach(form => form.reset());
        const messageElements = document.querySelectorAll('.popup .message');
        messageElements.forEach(msg => msg.innerHTML = '');
    };

    const setActivePopupTab = (targetId) => {
        popupNavButtons.forEach(navBtn => navBtn.classList.toggle('active', navBtn.dataset.target === targetId));
        popupSections.forEach(sec => sec.classList.toggle('active', sec.id === targetId));
    };

    const showSessionTimeoutPopup = () => {
        handleLogout();
        if (popup) popup.classList.add('session-mode'); // 세션 모드 클래스 추가
        openPopup('session-timeout');
    };

    const resetSessionTimeout = () => {
        if (sessionStorage.getItem('user')) {
            sessionStorage.setItem('loginTime', new Date().getTime());
        }
    };

    const initSessionTimeoutChecker = () => {
        const MAX_SESSION_TIME = 5 * 60 * 1000;
        setInterval(() => {
            const storedUser = sessionStorage.getItem('user');
            if (storedUser) {
                const loginTime = sessionStorage.getItem('loginTime');
                const currentTime = new Date().getTime();
                if (loginTime && (currentTime - loginTime > MAX_SESSION_TIME)) {
                    showSessionTimeoutPopup();
                }
            }
        }, 60 * 1000);
        window.addEventListener('click', resetSessionTimeout);
        window.addEventListener('keypress', resetSessionTimeout);
        window.addEventListener('scroll', resetSessionTimeout);
        window.addEventListener('mousemove', resetSessionTimeout);
    };

    // ======================================================
    // ======== 4. 이벤트 리스너 설정 및 페이지 초기화 ======== 
    // ======================================================

    if(bestTab) bestTab.addEventListener('click', (e) => {
        const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
        if (isIndexPage) {
            e.preventDefault();
            if(productSearchBar) productSearchBar.style.display = 'none';
            setActiveNav(bestTab);
            fetchAndRenderProducts({ mode: 'best' });
        }
    });

    if(searchTab) searchTab.addEventListener('click', (e) => {
        const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
        if (isIndexPage) {
            e.preventDefault();
            if(productSearchBar) productSearchBar.style.display = 'flex';
            setActiveNav(searchTab);
            fetchAndRenderProducts({ mode: 'all' });
        }
    });

    if(productSearchBtn) productSearchBtn.addEventListener('click', () => {
        const searchType = document.getElementById('product-search-type').value;
        const keyword = productSearchInput.value.trim();
        setActiveNav(searchTab);
        fetchAndRenderProducts({ mode: 'all', searchType: searchType, keyword: keyword });
    });

    if(productSearchInput) productSearchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            productSearchBtn.click();
        }
    });

    if(logoLink) logoLink.addEventListener('click', (e) => {
        const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
        if (isIndexPage && bestTab) {
            e.preventDefault();
            bestTab.click();
        }
    });

    openLoginBtn.addEventListener('click', (e) => { e.preventDefault(); openPopup('login'); });
    openSignupBtn.addEventListener('click', (e) => { e.preventDefault(); openPopup('signup'); });
    closeBtn.addEventListener('click', closePopup);
    popupWrapper.addEventListener('click', (e) => { if (e.target === popupWrapper) closePopup(); });
    if(sessionOkBtn) sessionOkBtn.addEventListener('click', closePopup);
    
    popupNavButtons.forEach(btn => {
        btn.addEventListener('click', () => setActivePopupTab(btn.dataset.target));
    });
    logoutBtn.addEventListener('click', handleLogout);

    checkLoginState();
    initSessionTimeoutChecker();
    initializePage();
    window.addEventListener('hashchange', initializePage);

    // ======================================================
    // ======== 5. Form 제출 이벤트 처리 (로그인 등) ======== 
    // ======================================================
    
    if (document.forms.length > 0) {
        if(document.forms[0]) document.forms[0].addEventListener('submit', (e) => {
            e.preventDefault();
            let id = document.querySelector('#username').value;
            let pw = document.querySelector('#password').value;
            
            fetch('http://localhost:3000/login', {
              method:'post',
              headers:{ 'Content-Type':'application/json;charset=utf-8' },
              body: JSON.stringify({id, pw})
            })
            .then(response => response.json())
            .then(result => {
              if (result.success && result.user_result.length > 0) {
                const userData = result.user_result[0];
                sessionStorage.setItem('user', JSON.stringify(userData));
                showUserInfo(userData, true); // 이벤트 발생시킴
              } else {
                alert(result.message || '아이디 또는 비밀번호가 일치하지 않습니다.');
              }
            })
            .catch(err => console.log(err));
        });
          
        if(document.forms[1]) document.forms[1].addEventListener('submit', (e)=> {
            e.preventDefault();
            let user_name = document.getElementById('id_search_name').value;
            let user_address = document.getElementById('id_searchaddress').value.trim()+ document.getElementById('id_searchdetailAddress').value.trim();
            fetch('http://localhost:3000/searchId', {
              method:'post',
              headers:{ 'Content-Type':'application/json;charset=utf-8' },
              body: JSON.stringify({user_name, user_address})
            })
            .then(response => response.json())
            .then(search => {
              if (search.success && search.result.length > 0) {
                let searchId = search.result[0].USER_ID;
                alert(`회원님의 ID는 [ ${searchId} ] 입니다.`);
                closePopup();
              } else {
                alert('일치하는 사용자 정보가 없습니다.');
              }
            })
            .catch(err => console.log(err));
        });
          
        if(document.forms[2]) document.forms[2].addEventListener('submit', (e)=> {
            e.preventDefault();
            let user_id = document.getElementById('pw_search_id').value;
            let user_address = document.getElementById('pw_searchaddress').value.trim()+ document.getElementById('pw_searchdetailAddress').value.trim();
            fetch('http://localhost:3000/searchPw', {
              method:'post',
              headers:{ 'Content-Type':'application/json;charset=utf-8' },
              body: JSON.stringify({user_id, user_address})
            })
            .then(response => response.json())
            .then(search => {
              if (search.success && search.result.length > 0) {
                let searchPw = search.result[0].USER_PW;
                alert(`회원님의 Pw는 [ ${searchPw} ] 입니다.`);
                closePopup();
              } else {
                alert('일치하는 사용자 정보가 없습니다.');
              }
            })
            .catch(err => console.log(err));
        });
          
        if(document.forms[3]) document.forms[3].addEventListener('submit', (e)=> {
            e.preventDefault();
            let id = document.getElementById('signup_id');
            let pw = document.getElementById('signup_pw');
            let pw2 = document.getElementById('signup_pw2');
            let name = document.getElementById('signup_name');
            let addr = document.getElementById('signup_address');
            let d_addr = document.getElementById('signup_detailAddress');
            let birth = document.getElementById('signup_userBirth');
          
            if (pw.value !== pw2.value) {
              alert('비밀번호가 일치하지 않습니다.');
              pw2.focus();
              return;
            }
          
            const fullAddress = addr.value.trim() + d_addr.value.trim();
            
            fetch('http://localhost:3000/signup', {
              method:'post',
              headers:{ 'Content-Type':'application/json;charset=utf-8' },
              body: JSON.stringify({
                body_id: id.value,
                body_pw: pw.value,
                body_name: name.value,
                body_addr: fullAddress,
                body_birth: birth.value
              })
            })
            .then(response => response.json())
            .then(result => {
              if (result.success) {
                alert(`회원 가입 성공: ${name.value}님, 이제 로그인해주세요.`);
                setActivePopupTab('login');
              } else {
                alert('회원가입 중 오류가 발생했습니다: ' + result.detail);
              }
            })
            .catch(err => console.log(err));
        });
    }
});

// ======================================================
// ======== 6. Daum Postcode API 함수 (전역 스코프) ======== 
// ======================================================

function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            var addr = (data.userSelectedType === 'R') ? data.roadAddress : data.jibunAddress;
            var extraAddr = '';
            if (data.userSelectedType === 'R') {
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                document.getElementById("signup_extraAddress").value = extraAddr;
            } else {
                document.getElementById("signup_extraAddress").value = '';
            }
            document.getElementById('signup_postcode').value = data.zonecode;
            document.getElementById("signup_address").value = addr;
            document.getElementById("signup_detailAddress").focus();
        }
    }).open();
}

function execDaumPostcode_id() {
    new daum.Postcode({
        oncomplete: function(data) {
            var addr = (data.userSelectedType === 'R') ? data.roadAddress : data.jibunAddress;
            document.getElementById('id_serch_postcode').value = data.zonecode;
            document.getElementById("id_searchaddress").value = addr;
            document.getElementById("id_searchdetailAddress").focus();
        }
    }).open();
}

function execDaumPostcode_pw() {
    new daum.Postcode({
        oncomplete: function(data) {
            var addr = (data.userSelectedType === 'R') ? data.roadAddress : data.jibunAddress;
            document.getElementById('pw_search_postcode').value = data.zonecode;
            document.getElementById("pw_searchaddress").value = addr;
            document.getElementById("pw_searchdetailAddress").focus();
        }
    }).open();
}

function execDaumPostcode_purchase() {
    new daum.Postcode({
        oncomplete: function(data) {
            var addr = (data.userSelectedType === 'R') ? data.roadAddress : data.jibunAddress;
            document.getElementById('purchase-postcode').value = data.zonecode;
            document.getElementById("purchase-address").value = addr;
            document.getElementById("purchase-detailAddress").focus();
        }
    }).open();
}
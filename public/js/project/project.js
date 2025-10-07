// project.js
/* ====================================================== */
/* ======== 1. 기존 JavaScript (상품 목록 표시) ======== */
/* ====================================================== */

// 최초 실행시 방문자에게 가장 많이 팔린 상품을 정렬해서 보여줌.
fetch(`http://localhost:3000/history`)
  .then(response => response.json())
  .then(data => [...data].sort((a, b) =>
    b.HISTORY_COUNT !== a.HISTORY_COUNT ?
    b.HISTORY_COUNT - a.HISTORY_COUNT :
    b.HISTORY_ITEM_TOTALPAY - a.HISTORY_ITEM_TOTALPAY).slice(0, 4))
  .then(res => {
    document.querySelector('.card-container').innerHTML = '';
    console.log(`팔린갯수 기준 내림차순 => 가격기준 내림차순 & 상위 4개 정렬 \n res is: `,res);
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
  img.setAttribute('src', item.HISTORY_ITEM_IMAGE || 'logo.png');
  img.setAttribute('alt', '상품 이미지');

  // --- 카드 내용 전체 영역 ---
  const cardContent = document.createElement('div');
  cardContent.setAttribute('class', 'card-content');

  // --- 상품명 ---
  const name = document.createElement('p');
  name.setAttribute('class', 'name');
  name.innerHTML = item.ITEMS_NAME;

  // --- 가격 영역 ---
  const priceSection = document.createElement('div');
  priceSection.setAttribute('class', 'price-section');

  const discountPercent = item.DISCOUNT_PERCENT * 100;
  const finalPriceValue = Math.round(item.ITEMS_PRICE * (1 - item.DISCOUNT_PERCENT)); // const finalPriceValue = Math.floor(item.ITEMS_PRICE * (1 - item.DISCOUNT_PERCENT));

  // --- 할인이 있는 경우와 없는 경우를 분리하여 표시 ---
  if (discountPercent > 0) {
    // 1. 할인이 적용된 경우
    const originalPrice = document.createElement('del');
    originalPrice.setAttribute('class', 'original-price');
    originalPrice.innerHTML = `${Number(item.ITEMS_PRICE).toLocaleString()}원`;
    priceSection.appendChild(originalPrice);

    const finalPriceLine = document.createElement('div');
    finalPriceLine.setAttribute('class', 'final-price-line');

    const discountRate = document.createElement('span');
    discountRate.setAttribute('class', 'discount-rate');
    discountRate.innerHTML = `${discountPercent}%`;
    finalPriceLine.appendChild(discountRate);

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
  const tags = document.createElement('div');
  tags.setAttribute('class', 'tags');

  if (item.ITEMS_CATEGORY) {
    const tag = document.createElement('span');
    tag.setAttribute('class', 'tag');
    tag.innerHTML = `#${item.ITEMS_CATEGORY}`;
    tags.appendChild(tag);
  }

  // --- 생성된 요소들을 조립 ---
  cardContent.appendChild(name);
  cardContent.appendChild(priceSection);
  cardContent.appendChild(tags);
  div.appendChild(img);
  div.appendChild(cardContent);
  return div;
};


/* ============================================================ */
/* ======== 2. 새로 추가된 JavaScript (팝업창 제어) ======== */
/* ============================================================ */

// 팝업 관련 요소들을 모두 변수에 저장
const popupWrapper = document.querySelector('.popup-wrapper');
const openLoginBtn = document.getElementById('open-login');
const openSignupBtn = document.getElementById('open-signup');
const closeBtn = document.querySelector('.close-btn');

const popupNavButtons = document.querySelectorAll('.popup nav button');
const popupSections = document.querySelectorAll('.popup section');

// ✅ 새로 추가: 사용자 정보 표시 관련 요소들
const authMenu = document.getElementById('auth-menu');       // 로그인/회원가입 메뉴
const userMenu = document.getElementById('user-menu');       // 사용자 정보 표시 영역
const userNameEl = document.getElementById('user-name');     // 사용자 이름 표시할 span
const userIdEl = document.getElementById('user-id');         // 사용자 ID 표시할 span
const logoutBtn = document.getElementById('logout-btn');     // 로그아웃 버튼


// 특정 탭을 활성화하는 함수
const setActiveTab = (targetId) => {
  popupNavButtons.forEach(navBtn => {
    // 버튼의 data-target과 목표 id가 같으면 active 클래스 추가, 아니면 제거
    navBtn.classList.toggle('active', navBtn.dataset.target === targetId);
  });
  popupSections.forEach(sec => {
    // 섹션의 id와 목표 id가 같으면 active 클래스 추가, 아니면 제거
    sec.classList.toggle('active', sec.id === targetId);
  });
}

// 팝업을 여는 함수
const openPopup = (targetTab) => {
  setActiveTab(targetTab); // 원하는 탭을 먼저 활성화
  popupWrapper.classList.add('active'); // 팝업창을 보여줌
}

// 팝업을 닫는 함수
const closePopup = () => {
  popupWrapper.classList.remove('active');

  // --- 이 부분이 추가됩니다 ---
    // 1. 팝업 안의 모든 form 요소를 찾습니다.
    const formsInPopup = document.querySelectorAll('.popup form');

    // 2. 각 폼에 대해 reset() 메서드를 호출하여 모든 입력 필드를 초기화합니다.
    formsInPopup.forEach(form => {
      form.reset();
    });

    // 3. (추가) 아이디/비밀번호 찾기 결과 메시지가 표시되는 영역도 비워줍니다.
    const messageElements = document.querySelectorAll('.popup .message');
    messageElements.forEach(msg => {
      msg.innerHTML = '';
    });
    // --- 여기까지 추가됩니다 ---
}

// --- 이벤트 리스너(Event Listener) 설정 ---

// 헤더의 '로그인' 버튼 클릭 시
openLoginBtn.addEventListener('click', (e) => {
  e.preventDefault(); // a 태그의 기본 동작(페이지 이동) 방지
  openPopup('login');
});

// 헤더의 '회원가입' 버튼 클릭 시
openSignupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openPopup('signup');
});
function execDaumPostcode() {
new daum.Postcode({
    oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ''; // 주소 변수
        var extraAddr = ''; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
            // 조합된 참고항목을 해당 필드에 넣는다.
            document.getElementById("signup_extraAddress").value = extraAddr;
        
        } else {
            document.getElementById("signup_extraAddress").value = '';
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById('signup_postcode').value = data.zonecode;
        document.getElementById("signup_address").value = addr;
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("signup_detailAddress").focus();
    }
}).open();
}
// 팝업 내부의 'X' 버튼 클릭 시
closeBtn.addEventListener('click', closePopup);

// 팝업의 어두운 배경 부분을 클릭했을 때 닫히게 하는 기능
popupWrapper.addEventListener('click', (e) => {
  // 클릭된 요소가 어두운 배경(자기 자신)일 때만 닫힘
  if (e.target === popupWrapper) {
    closePopup();
  }
});

// 팝업 내부의 탭 전환 로직
popupNavButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    setActiveTab(target);
  });
});

// id/pw 찾기버튼 함수

function execDaumPostcode_id() {
new daum.Postcode({
    oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ''; // 주소 변수
        var extraAddr = ''; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
            // 조합된 참고항목을 해당 필드에 넣는다.
            document.getElementById("id_searchextraAddress").value = extraAddr;
        
        } else {
            document.getElementById("id_searchextraAddress").value = '';
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById('id_serch_postcode').value = data.zonecode;
        document.getElementById("id_searchaddress").value = addr;
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("id_searchdetailAddress").focus();
    }
}).open();
}
function execDaumPostcode_pw() {
new daum.Postcode({
    oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ''; // 주소 변수
        var extraAddr = ''; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
            // 조합된 참고항목을 해당 필드에 넣는다.
            document.getElementById("pw_searchextraAddress").value = extraAddr;
        
        } else {
            document.getElementById("pw_searchextraAddress").value = '';
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById('pw_search_postcode').value = data.zonecode;
        document.getElementById("pw_searchaddress").value = addr;
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("pw_searchdetailAddress").focus();
    }
}).open();
}
/* ====================================================== */
/* ======== 2. 로그인/UI 제어 관련 함수 ======== */
/* ====================================================== */

/**
 * 로그인 성공 시 UI를 업데이트하고 사용자 정보를 화면에 표시
 * @param {object} userData - 서버에서 받은 사용자 데이터
 */
const showUserInfo = (userData) => {
  authMenu.style.display = 'none';
  userNameEl.textContent = userData.USER_NAME + '님';
  userIdEl.textContent = `(${userData.USER_ID})`;
  userMenu.classList.add('active');
  closePopup();
  console.log('로그인 성공! 사용자 정보:', userData);
}

/**
 * 로그아웃 시 UI를 초기 상태로 되돌림
 */
const handleLogout = () => {
  // ✅ localStorage에서 사용자 정보 삭제
  localStorage.removeItem('user');
  
  userMenu.classList.remove('active');
  authMenu.style.display = 'flex';
  document.querySelector('#username').value = '';
  document.querySelector('#password').value = '';
  console.log('로그아웃 완료');
}

/**
 * ✅ 페이지 로드 시 localStorage를 확인하여 로그인 상태를 복원
 */
const checkLoginState = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    showUserInfo(userData);
  }
}

/* ====================================================== */
/* ======== 3. 이벤트 리스너 설정 ======== */
/* ====================================================== */

// 페이지가 처음 로드될 때 로그인 상태 확인
document.addEventListener('DOMContentLoaded', checkLoginState);

// 헤더의 '로그인' 버튼 클릭 시
openLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openPopup('login');
});

// 헤더의 '회원가입' 버튼 클릭 시
openSignupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openPopup('signup');
});

// 팝업 'X' 버튼 클릭 시
closeBtn.addEventListener('click', closePopup);

// 팝업 배경 클릭 시
popupWrapper.addEventListener('click', (e) => {
  if (e.target === popupWrapper) {
    closePopup();
  }
});

// 팝업 탭 버튼 클릭 시
popupNavButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setActiveTab(btn.dataset.target);
  });
});

// 로그아웃 버튼 클릭 시
logoutBtn.addEventListener('click', handleLogout);


/* ====================================================== */
/* ======== 4. Form 제출(submit) 이벤트 처리 ======== */
/* ====================================================== */

// 로그인 폼 제출
document.forms[0].addEventListener('submit', (e) => {
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
      
      // ✅ 로그인 성공 시 localStorage에 사용자 정보 저장
      localStorage.setItem('user', JSON.stringify(userData));
      
      showUserInfo(userData);
    } else {
      alert(result.message || '아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  })
  .catch(err => console.log(err));
});

// 아이디 찾기 폼 제출
document.forms[1].addEventListener('submit', (e)=> {
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

// 비밀번호 찾기 폼 제출
document.forms[2].addEventListener('submit', (e)=> {
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

// 회원가입 폼 제출
document.forms[3].addEventListener('submit', (e)=> {
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
      setActiveTab('login'); // 로그인 탭으로 전환
    } else {
      alert('회원가입 중 오류가 발생했습니다: ' + result.detail);
    }
  })
  .catch(err => console.log(err));
});
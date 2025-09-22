// front > js > 회원가입.js

document.forms.register // getElementById('register')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    let id = document.getElementById('user-id');
    let pw1 = document.getElementById('user-pw1');
    let pw2 = document.getElementById('user-pw2');

    if (!idCheck(id.value)) {
      alert('id 는 4자리 이상 15자리 이하 입니다.');
      id.focus();
      return;
    }

    if (pw1.value.length < 8) {
      alert('비밀번호는 8자리 이상 입력해주세요.');
      document.getElementById('user-pw1').value = '';
      pw1.focus();
      return;
    } else {
      if (pwCheck(pw1.value, pw2.value)) {
        alert('회원가입 승인');
      } else {
        alert('비밀번호가 일치하지 않습니다.');
        pw2.focus();
        document.getElementById('user-pw2').value = '';
      }
    }
  }, false);

idCheck = id => (4 <= id.length && id.length <= 15);
pwCheck = (pw1, pw2) => pw1 == pw2;
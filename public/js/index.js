// ctrl + a -> (ctrl + k) + (ctrl + f)
// JavaScript range
// 1. value
// 2. function
let user_id = "user01"; // string
let user_age = 40;    // int
let is_child = false; // boolean

// 실행 요청이 필수다.
function show_info() {
  console.log("회원의 id는: " + user_id);
}
show_info();
function chw() {
  // 머리채 틀어잡아서 끌고올놈 정하기
  // css처럼 선택자를 매개변수로받아서 가져올 html요소를 지정함
  document.querySelector('h1#a1').innerHTML = "안!녕! 클레오 파! 트! 라! 세상에서 제일가는 포테이토칲!";
}
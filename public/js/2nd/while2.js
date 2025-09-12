// while2.js

// let uv = prompt("값을 입력하세요, 종료하려면 exit");
// console.log(`${uv}`);
let sum = 0;
let uv;
let cnt = 0;
while (1) {
  uv = prompt("값을 입력하세요, 종료하려면 'exit'를 '빼고 입력하세요.\n숫자가 아니면 더해지지 않습니다.");

  if (!isNaN(uv)) {
    sum += parseInt(uv);
    cnt++;
  }else if (uv == 'exit') {
    break;
  }else{
    console.log(`${uv}는 숫자가 아닙니다.`);
  }
}
console.log(`sum => ${sum}`);
console.log(`avg => ${sum/cnt}`);

// let uv = 'exit';
// console.log(uv == 'exit');
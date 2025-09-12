// todo.js

// 입력 2개 가능한 html 구성
//버튼 클릭하면 이벤트발생하는거랑 연결해라
//사칙연산 계산기

function cal() {
  let n1 = parseInt(document.querySelector("#n1").value);
  let n2 = parseInt(document.querySelector("#n2").value);
  let op = document.querySelector("#op").value;
  let res = 0;
  switch (op) {
    case '+':
      res = plus(n1, n2);
      break;
    case '-':
      res = minus(n1, n2);
      break;
    case '*':
      res = multiply(n1, n2);
      break;
    case '/':
      res = divide(n1, n2);
      break;
    default:
      break;
  }
  document.querySelector("#res").value = res;
}

function plus(n1, n2) {
  return n1 + n2;
}

function minus(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  return n1 / n2;
}
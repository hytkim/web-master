// condition.js

function calc() {
  let c1 = parseInt(document.querySelector('#u1').value);
  let c2 = parseInt(document.querySelector('#u2').value);
  let o = document.querySelector('#oper').value;
  let res = 0;
  // if (o == '+') {
  //   res = c1 + c2;
  // } else if (o == '-') {
  //   res = c1 - c2;
  // } else if (o == '*') {
  //   res = c1 * c2;
  // } else if (o == '/') {
  //   res = c1 / c2;
  // }

  switch (o) {
    case '+':
      res = c1 + c2;
      break;
    case '-':
      res = c1 - c2;
      break;
    case '*':
      res = c1 * c2;
      break;
    case '/':
      res = c1 / c2;
      break;
  }

  document.querySelector('#res').value = res;
  // console.log(c1+c2);
}
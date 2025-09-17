// this.js

// 1) 함수에서의 this => window 객체에 binding 되어있음.
// 2) 이벤트에서의 this => 이벤트를 받는 대상에 binding 되어있음.
    // 2-2) 이벤트안에서 (e) => {} 쓰면 window객체에 binding되어있음.
// 3) 객체 안에서의 this => 객체 자기자신에 binding 되어있음.

function sum(n1, n2) {
  console.log(this);
  return n1 + n2;
}
// console.log(this);

sum(1, 2);

// document.querySelector('table')
//   .addEventListener('click', function (e) {
//     console.log(e.target);
//     console.log(this);
//   }
// )
document.querySelector('table')
  .addEventListener('click', (e) => {
    console.log(e.target);
    console.log(this);
  }
)


const obj = {
  name: 'e',
  show: () => {
    console.log(this);
    return `이름은${this.name} 입니다`;
  }
}
console.log(obj.show());
obj.show();

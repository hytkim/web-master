// todo.js 
// 반복문활용해서 * 출력하는 구문
console.log(`todo.js is Run`);

// for (let i = 5; i > 0; i--) {
//   let str = ``;
//   // console.log(`now i => ${i}`);
//   for (let j = 0; j < (6 - i); j++) {
//     str += `*`;
//     // console.log(`now j => ${j}`);
//     // console.log(`*`);
//     // document.write(`*`);
//   }
//   console.log(`${str}\n`);

//   // document.writeln('');
// }

// *
// **
// ***
// ****
// *****

// *****
// ****
// ***
// **
// *

// *****
//  ****
//   ***
//    **
//     *


// *
// **
// ***
// ****
// *****
const Star = (line) => {
  for (let i = 0; i < line; i++) {
    let str = ``;
    for (let j = -1; j < i; j++) {
      str += `*`;
    }
    console.log(`${str} \n`);
  }
}

// Star(5);



// *****
// ****
// ***
// **
// *

// const unStar = (line) => {
//   // 아래로 5줄 내려가겠다.
//   let li = line;
//   for (let i = 0; i < line; i++) {
//     let str = ``;
//     //오른쪽으로 5개찍고 하나씩깎아먹겠다.
//     for (let j = li; j > 0; j--) {
//       str += `*`;
//     }
//     li --;
//     console.log(str);
//   }
// }

// unStar(5);


const unStarRe = (line) => {
  // 아래로 5줄 내려가겠다.
  let li = line;
  for (let i = 0; i < line; i++) {
    let blank = ``;
    let str = ``;
    //오른쪽으로 5개찍고 하나씩깎아먹겠다.
    for (let j = li; j > 0; j--) {
      blank += ``;
    }
    li--;
    if (blank.length < line) {
      for (let st = 0; st < line - blank; st++) {
        blank += `*`;
      }
    }

    console.log(blank);
  }
}

unStarRe(5);
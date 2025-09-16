// array.js

// 배열의 각 위치를 인덱스로 접근함
const fruits = ['사과', '복숭아']; // 배열크기. fruits.length

// 아래의 배열에서 i의 크기는 계속변경될수있으니까, 배열의 크기를의미하는 fruits.length를 쓴다.
for (let i = 0; i < fruits.length; i++) {
  // 배열의 각요소의 위치에 접근하여 내용을 볼수있는코드
  console.log(fruits[i]);
  //fruits[0] == 사과
  //fruits[1] == 복숭아
}

// 배열에 새로운 값을 추가하려면, 배열의 마지막(끝)위치에 새 값을 넣어야함.
// 기존의값이 있는 위치에 값을 넣으면 해당위치의 값을 덮어써버림.
// 새로운값은 배열의 2번째위치에 들어가야하기때문에 현재 배열에 있는값이 2개이므로
//  length가 2가나와서 이렇게쓰면 새로운값이 배열의 마지막에 들어감

fruits[fruits.length] = '배'; //fruits[3] == 배
fruits[fruits.length] = '참외'; //fruits[4] == 참외

// 기존의값이 있는 위치에 값을 넣어서 값을 덮어씀.
fruits[0] = '포도';
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
//배열의 요소에 접근해 내용을 삭제: 포도 -> undefined. 값이 들어감
//혹은 fruits[0] = ull; 가능함 
delete fruits[0]; // 변수의 초기화 라고봐도됨

//배열 메소드 : 객채에 소속되어있으면서도 기능(함수)를 담당하는것, 여기선 showInfo()
const obj = {
  name: 'ㄱ길동',
  age: 20,
  showInfo: function () {
    return `이름은 ${obj.name}, 나이는 ${obj.age}`;
  }
}

// 배열에서만 사용가능한 메소드. 추가, 삭제(push, pop)
fruits.push('메론'); //fruits[5] == 메론 배열에 요소 하나 추가하는 기능
fruits.pop(); //fruits[5]를 아예 제거해서 배열의크기가 6 -> 5가됨

//unshift, shift
fruits.unshift('메론'); // 배열의 맨 앞 요소에 '메론' 을 추가 메론, undefined, 복숭아, 배, 참외
fruits.shift(); //배열의 맨 앞을 통째로 제거 -> undefined, 복숭아, 배, 참외

console.log(`\n push, pop Test`);
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// 배열 임의의 위치에 추가, 삭제 변경이 가능한 메소드
// splice(index, length) : 배열의 index값이 index인 위치부터 length개의 요소를 삭제 한다.
fruits.splice(1, 1); // undefined, 복숭아, 배, 참외 -> undefined, 배, 참외

// 요소 교체
// splice(index, length, value) : 배열의 index값이 index인 위치부터 length개의 요소를 삭제하고, 그 자리를 value로 수정 한다.
// fruits.splice(0, 1, '사과'); // undefined, 배, 참외 -> 사과, 배, 참외
// fruits.splice(0, 3, '사과'); // undefined, 배, 참외 -> 사과

//요소 추가
fruits.splice(1, 0, '수박'); // undefined, 배, 참외 -> undefined, 수박, 배, 참외
fruits.splice(1, 3, '수박'); // undefined, 배, 참외 -> undefined, 수박


console.log(`\n splice Test`);
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}



// undefined: 정의되지않은 값
// string, number, boolean. {}, [], undefined(변수를 선언해놓고 값이 할당되지않은 시점의 값.), null <> '' (공백값조차 할당되지않은 유효아지 않은 상태를 null이라고함)

// *정리)
// undefined는 자바스크립트에서 값이 할당되지 않은 상태로 자동 설정되는 값입니다.
// null은 개발자가 의도적으로 값이 없음을 나타내는 값입니다.
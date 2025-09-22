// 8th/spread.js

// 원시 데이터타입
let fruit = 'apple'
let newFruit = fruit;
newFruit += ', mango'
console.log(`fruit is: ${fruit}`, `\nnewFruit is: ${newFruit}`);

// 객체(배열도 객체다)
const veggie = ['tomato', 'cucumber', 'beans']; // ...veggie
console.log(`veggie... => ${veggie}`);


// 배열은 힙메모리영역에 객체로만들어지고 배열영역의 주소값이 변수에 할당 되는것.
const newVeggie = veggie; // 객체의 주소가 동일하다.
console.log(veggie, newVeggie);

newVeggie.push('peas');
console.log(veggie, newVeggie); // 동일한 배열을 참조.

const anotherVeggie = [...veggie]; // 배열을 가져와서 그 값을 펼쳐(spread)서 새로운 배열을 생성하겠다.
console.log(anotherVeggie);
newVeggie.push('banana');

console.log(`veggie is: ${veggie}`, `\n\nnewVeggie is: ${newVeggie}`, `\n\nanotherVeggie is: ${anotherVeggie}`);

// 펼침 연산자를 사용하지않으면 2차원 배열이 생성됨
// const TestVeggie = [veggie];
// TestVeggie.push(...TestVeggie, ...['panana']);

//단일 배열로 할거면 무조건 ... 연산자
const TestVeggie = [...veggie, ...['panana']];
console.log(TestVeggie);

console.clear();

// spread연산자.
// 이런식으로 쓰면 오류나는데, 배열에 몇개들어올지 아무도모르니까 펼침연산자를 쓰겠다.
//sum = (n1 = 0, n2 = 0, n3 = 0) => n1 + n2 + n3;
//sum(1, 2, 3, 4, 5, 6);

// 배열 spread 연산
// 배열이니까 for of, 객체면 for in
sum = (a = 0, b = 0, ...num) => {
  let res = a + b;
  for (const n of num) {
    res += n;
  }
  return res;
};
console.log(sum(1, 2, 3, 4, 5, 6));

// 객체 
const myFriend = {
  name: '람쥐',
  age: 20
};
const yourFirend = myFriend; // heap메모리의 주소값 참조
console.log(myFriend, yourFirend);

const anFriend = {...myFriend} // 새로운 객체 생성

myFriend.age = 22;
anFriend.name = '람!썬';

console.log(anFriend,myFriend, yourFirend);
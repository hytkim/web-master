// 8th > class.js

// 상수형 변수 obj 선언(새 값 할당은 불가능, 내부속성 추가/제거/변경 가능)
const obj = {
  name: "람지",
  age: 20,
  showInfo() {return `이름은 ${this.name}`}
}; // 객체(이면서 하나의 값), (실재하는 사물을 표현하기위한 객체)

// class (실사물의 전산적인 표현 => 객체(구조, 설명이 필요할때 class 씀))
// 사람의 구조중 지금 내가 표현할때 필요한것들을 선언한다.
// 클래스라는 도면을따라 객체를 생성하는것을 인스턴스를 생성한다고 한다.
class Person{
  // 이름, 키, 무게, 혈액형
  constructor(name, heigth, weigth, bloodType){
    this.name = name;
    this.heigth = heigth;
    this.weigth = weigth;
    this.bloodType = bloodType;
  }
  showInfo = () => `이름은 ${this.name}, 키는 ${this.heigth}`;
}

let p1 = new Person('람!썬',666, 777, "O");
let p2 = new Person('람지',222, 222, "Yee");
console.log(p1.weigth, p1.showInfo());
console.log(p2.showInfo(),`\n`, p1.showInfo());

console.log(p1.constructor);
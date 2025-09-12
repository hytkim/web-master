// variable.js
// java햄들은 카멜을 근본으로친다더라
// beautify: ctrl + (Left)shift + F
let myName = "람지썬더";
let myAge = 16;
let pets = [{
  n1ame: "람썬",
  a1ge: 2
}, {
  n1ame: "스네잌",
  a1ge: 1
}, {
  n1ame: "캬=멣",
  a1ge: 12
}];

// console.log(myName + " " + myAge + " " + pets);
// console.log(pets[0] + " " + pets[1]);
// console.log(pets);

// obj Type
let myF = {
  name: "Dog Kim",
  age: 18,
  num: "010-1234-5678",
  addr: "약령 city",
}
// console.log(myF.age + " " + myF.name + "\n" +
//   myF.num + "\n" +
//   myF.addr);
// console.log(myF);
console.log(pets[0].n1ame +"이의 나이는: " + pets[0].a1ge);

pets[0].a1ge = 18; // change the variable
console.log(pets[0].n1ame +"이의 나이는: " + pets[0].a1ge);
console.log(pets[1].n1ame +"이의 나이는: " + pets[1].a1ge);
// storage.js

console.log(window);
localStorage.setItem('myName',"렙틸리언");
localStorage.setItem("myInfo", JSON.stringify({name: "람썬vjsc", age:24}));
// localStorage.setItem("myInfo", '{"name": "람썬킥", "age":20}');
let info = localStorage.getItem("myInfo");
console.log(info);
console.log(JSON.parse(info));
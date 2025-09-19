// fetch.js
console.clear();
// fetch() => return Promise // Promise객체를 반환
 // http://localhost:3000/post에 표시되는 
 // server의 db.json에있는 post객체가 포함된 정보(promise객체)를 살펴보면
 // body의 정보가 readableStrem타입으로 받아지는데, 이 정보를
 //  javaScript에서 읽을 수 있는 객체로 변환하여 출력한게 fetch().then().then()의 result이다.
fetch('http://localhost:3000/post')
// fetch('http://localhost:3000/psKill')
.then((response) =>{
  //body: ReadableStream // 2진값을
  console.log(response);
  return response.json(); // 자바스크립트의 객체변경
})
.then((result) => {
  console.log(result);
})
.catch((err) => {
  console.log(`error now: ${err}`);
})
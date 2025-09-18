// xml 기반의 http 로컬 서버

// xml 객체 x 를 선언
const x = new XMLHttpRequest();

// Node.js 에 json-server를 열었다면 로컬호스트 3000번이 열리는데.
// db.json{post:{'id':'value'}}에 서버로 접근이가능하다.
// 서버에서 표시중인 db.json에게 값을 추가하는 요청을 보내겠다는 선언을 하는것.
// x에서 request가 발생하면 json파일의 내용물이 db.json의 post객체의 마지막 부분에 추가된다.
// ↓↓ 이때 값을 입력하지않은 키는 임의로 값이 할당된다. ↓↓
x.open('get', 'http://localhost:3000/post');

// 비어있는 값을 서버에 보냄으로써 서버가 가지고있던 기존의 db.json
//의 내용을 받아 올 수 있고, 서버에서 데이터를 받아오는 이벤트가 일어났기때문에
// onload를 등록해놓으면 동작 함.
xp.send();
x.onload() = function(){

}

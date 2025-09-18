// ary2.js

const x = new XMLHttpRequest();
x.open('get', '../5th/data.json');
x.send();
x.onload = () => {
  // console.log(x); //x는 서버의 응답
  // console.log(x.response); // 응답. x.response에 서버가 보내준 data.json파일이 들어있음
  console.log(JSON.parse(x.response)); // JSON타입은 읽기힘드니까 js객체로 변환!
  let res = JSON.parse(x.response).filter(item => item.gender == "Female")
  .map((item) => {
    let {id: 사번, first_name:이름, salary: 급여} = item;
    이름 += item.last_name;
    return {사번, 이름, 급여};
  });
  console.log(res);
};
console.clear();
//필터, 맵 => gender가 여자인 사원 => 사번,이름 f+l 합쳐서, 급여(쌀라리)

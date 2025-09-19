// ajax.js: 비동기방식은 일반변수와 처리순서가 다르다!
// 자료처리방식의 이름이 ajxx 인 것이다: Asynchronous JavaScript And XML
// 비동기방식(병렬) vs 동기방식(직렬)(한줄한줄 순서대로 실행하고 실행대기했다 실행하고 하면서내려감)

// XML 리퀘스트는 비동기작업을 Ajax를 잘 안쓰고 fetch라는 함수로 잘 쓴다. ajax는 퇴물
backup  = () => {
  let members = []; // 콜스택에 선언한변수 쌓임

  const xhtp = new XMLHttpRequest(); // 비동기방식은 콜백 큐에 먼저 콜백큐에 쌓였다가 

  xhtp.open('get', '../5th/data.json');
  xhtp.send();
  xhtp.onload = () => {
    members = JSON.parse(xhtp.response);
    console.log(JSON.parse(xhtp.response)); //콜백큐에 담겨서 memebers가 채워진뒤에 호출되므로 의도한대로 잘 보여짐

  };
  //console.log(members); //값이 없음: 콜스택에 먼저 쌓이는 동기방식이라 members가 채워지기전에 호출되기때문에 값이없음!

  //요청된 함수로들이 콜백Queu에 쌓이다가 

  //비동기방식이 20개있다치자, 하나당 1초씩걸리면
  //새로고침할때마다 20초씩느려진다.
  //비동기 방식을제외하고 동기방식으로 콜스택을 처리
  //비동기방식도 지나가면서 값을받아오지않았을뿐 콜백큐에 담아서 작업중
  // 콜백큐에서 병렬작업이 진행되기때문에 다 1초씩걸림.
  //새로고침에 1초면됨. 20배 효율
}

backup2_setTimeout  = () => {
//setTiemout(() => {}, time) 대표적인 비동기방식 함수: 실행할 함수를 첫 매개값, 지연시간(/ms 1000분에1초)
// setTimeout(()=> {console.log(`1st function`)}, 1000);
// setTimeout(()=> {console.log(`2nd function`)}, 2000);
// setTimeout(()=> {console.log(`3rd function`)}, 500);// 여기 1000주면 1,3 => 2 순서보니까 얘도 선입선출인듯
// 동기방식이면 이게 다 출력되는데 3.5초가 걸리지만, 
// '비'동기방식이라 2초때 3 => 1 =>2 순서로 이미 작업이다끝나있음.
  setTimeout(() => {
    console.log(`1st function`);

    setTimeout(() => {
      console.log(`2st function`);

      setTimeout(() => {
        console.log(`3nd function`);
      }, 500);
    }, 2000);
  }, 1000);
//이렇게 작성하면 동기방식처럼 동작함 3.5초걸린단 소리임
}

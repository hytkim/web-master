// promise.js
// 콜백큐에 적재된 함수를 순차적으로 구성해준다.

// 매개값을 함수, 기능을 매개값으로받는데 어떤기능을 받을지는 정해지지않았다.
callFnc = (x1=0, x2=0, anonymousFunc) => {
  return anonymousFunc(x1, x2);
};
console.log(`anonymousFnc => return is: ${callFnc(10,20, (x1, x2)=> x1+x2)}`);
console.log(`anonymousFnc => return is: ${callFnc(10,20, (x1, x2)=> x1-x2)}`);
console.log(`anonymousFnc => return is: ${callFnc(10,20, (x1, x2)=> x1*x2)}`);
console.log(`anonymousFnc => return is: ${callFnc(10,20, (x1, x2)=> x1/x2)}`);

// 함수가 정상적으로 실행이되었을때 실행될 resolve()
// 함수가 정상적으로 실행이되지 않았을때 실행될 reject()
// 비동기방식을 동기방식으로 진행할때 프로미스객체를사용한다.
const promise = new Promise((resolve, reject) => {
  resolve('OK');
  reject('NG');
}); //new Object( () => {}, () => {} )

// 프로미스가 정상적으로 실행되면then에 정의된 함수가 실행된다.
// 여기 들어간 () => {} 가 resolve가 됨.
promise.then((response) => {
  console.log(`promise is Success then: ${response}`);
  return 'PK';
})
.then((result) => {
  console.log(`promise is Success then2 res: ${result}`);
  // return 'RK';
})
.then((result) => {
  console.log(`promise is Success then3 res: ${result}`);
  // return null
})
.catch((err) => {
  console.log(`promise is Err then: ${err}`);
});
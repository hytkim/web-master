// scope.js
// global vs local

// var & let, const 

// let || const는 블럭안에서만 선언하면 거기에서만 생성되고끝나는데
// var는 블럭레벨이아니라 지역이냐 전역이냐밖에없다.

var g_Age = 20;

function showAge() {
  var g_Age = 22;
  console.log(`local g_Age(${g_Age}) + 1 is: ${g_Age+1}`);
}

showAge();

console.log(`global g_Age(${g_Age}) is: ${g_Age}`);

//var 선언을했다면  블럭({} = block)만가지고 전역과 지역을 구분하지않는다.
{
  var g_Age = 10;
  console.log(`{} g_Age(${g_Age}) += 1 is: ${g_Age += 1}`);
}

console.log(`global g_Age(${g_Age}) +1 is: ${g_Age+1}`);

console.log(`\n###############################################\n`);

let lg_Age = 20;

function showAge() {
  let lg_Age = 22;
  console.log(`local lg_Age(${lg_Age}) + 1 is: ${lg_Age+1}`);
}

showAge();

console.log(`global lg_Age(${lg_Age}) is: ${lg_Age}`);

{
  let lg_Age = 10
  lg_Age += 1;
  console.log(`{} lg_Age(${lg_Age}) is: ${lg_Age}`);
}

console.log(`global lg_Age(${lg_Age}) +1 is: ${lg_Age+1}`);
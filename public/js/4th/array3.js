// array3.js obejctArray: push({}), unshift({}) splice(idx,length,{})

const friends = [{
  name: '다람쥐',
  phone: '010-1234-5678',
}];

friends.push({
  name: '람썬더',
  phone: `010-2222-2222`
});

friends.push({
  name: '파이어',
  phone: `010-1111-1111`
});
// let search = prompt(`연락처를 찾을 친구의 이름을 입력>`);

friends.forEach(function (item, index, ary) {
  // console.log(item, index, ary);
  // if (search == item.name) {
  //   console.log(`item.name is: ${item.name}, \n phone is: ${item.phone}`);
  // }
});

// data
// 1.급여가 5000이상인 사원 출력, 이름, 급여
// 2. 남자 사원들만 maleAry 변수에 담아서 출력
const maleAry = [];

data.forEach(function (item, index, ary) {
  // console.log(item);
  // if (item.salary >= 5000) {
  //   console.log(`${item.first_name} - ${item.last_name}의 \n급여: ${item.salary}는 5000 이상입니다.`);
  // }
  if (item.gender == `Male`) {
    // maleAry.push(item);
    maleAry.unshift(item);
  }
});
//sort 정렬
console.log(maleAry.sort(function (a, b) {
  if (a.salary < b.salary) {
    return -1;
  } else {
    return 1;
  }
}));

console.log(['사과', '복숭이', '어륁이', '포도'].sort().reverse());
// console.log([10, 34, 23, 1, 100].sort());
// console.log([10, 34, 23, 1, 100].sort().reverse());

console.log([10, 34, 23, 1, 100].sort(function (a, b) {
  if (a - b < 0) {
    return -1;
  } else {
    return 0;
  }
})); // [1, 10, 23, 34, 100]

console.log([10, 34, 23, 1, 100].sort(function (a, b) {
  if (a - b < 0) {
    return 0;
  } else {
    return -1;
  }
})); // [100, 34, 23, 10, 1]
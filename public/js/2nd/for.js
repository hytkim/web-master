// for.js

let sum = 0;
// sum += 1; 
// sum += 2;
// sum += 3;
// sum += 4;
// ...
// sum += 10; //sum == 55

// ↓↓ break point test starting line ↓↓
// for (let i = 1; i <= 10; i++) {
//   sum += i;
//   // console.log("sum is: "+sum +", i is: "+i);
//   console.log(`sum: ${sum}, i: ${i} => ${sum + i}`);
// }
// document.writeln(`<ul style="list-style: none; padding: 0;">`);
// <thead><tr><th>asdf</th></td></thead>
// <thbody><tr><td>asdf</td></tr></thead>

document.writeln(`<table class="table table-striped table-striped-columns">`);
document.writeln(`
                  <thead>
                    <tr>
                      <th>단수</th>
                      <th></th>
                      <th>배수</th>
                      <th></th>
                      <th>결과</th>
                    </tr>
                  </thead>
                  <tbody>`);

for (let i = 1; i <= 9 ; i++) {
  // console.log(`3 * ${i} => ${3 * i}`);
  // document.writeln(`<li> 3 * ${i} => ${3 * i} </li>`);
  document.writeln(`<tr>
                      <td> 3 </td>
                      <td> * </td>
                      <td> ${i}</td>
                      <td>=</td>
                      <td>${3*i}</td>
                    </tr>`)
}
document.writeln(`</tbody></table>`);
// document.writeln(`</ul>`);
// import 'babel-polyfill' 

let func = () => {};
const num = 45;
let arr = [1, 2, 3, 4, 5];
let arrb = arr.map(item => {
  item * 2
});

console.log(new Set(arrb))

function* func() {}
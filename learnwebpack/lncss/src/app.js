import base from './css/base.less'
import common from './css/common.less'

var app = document.getElementById('app');
app.innerHTML = `<div class="${base.box}">base's box</div>`;

// var flag = false;
// setInterval(() => {
//   if (flag) {
//     base.unuse();
//   } else {
//     base.use();
//   }
//   flag = !flag;
// }, 500)
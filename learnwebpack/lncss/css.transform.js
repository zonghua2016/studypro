// 在style-loder将css样式放到html中时执行

module.exports = function (css) {
  console.log(css);
  console.log(window.innerWidth);
  if (window.innerWidth > 800) {
    return css.replace('red', 'yellow')
  }
  return css;

}

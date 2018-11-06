{
  let a1 = Symbol.for('abc')
  let obj = {
    [a1]: '133',
    'abc': 234,
    'c': '444'
  }
  Reflect.ownKeys(obj).forEach(item => {
    console.log(item, obj[item]);

  })
}
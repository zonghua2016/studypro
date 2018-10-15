[markdown视频教程](https://attachments-cdn.shimo.im/OPUpZ1SnvD8Ttwyz/%E4%BB%80%E4%B9%88%E6%98%AF_markdown.MP4 "markdown教程")

# 一级标题

## 二级标题

### 三级标题

## 无序列表

 - 无序子列表1
 - 无序子列表2
 - 无序子列表3

## 有序列表

1. 有序子列表1
2. 有序子列表2
3. 有序子列标3

## 链接
 
 [这是一个链接](https://www.baidu.com)

 ## 带title的链接

  [这是一个链接](https://www.baidu.com "百度") 

## 图片

![](https://images-cdn.shimo.im/K0sOFc2BfioBhrry/html.jpg!thumbnail)

## 带title
![alt](https://images-cdn.shimo.im/K0sOFc2BfioBhrry/html.jpg!thumbnail "html图片")

## 引用方式

![alt][img1]

[img1]:https://images-cdn.shimo.im/K0sOFc2BfioBhrry/html.jpg!thumbnail "引用图片img1"


>文字引用

### 多行引用

>Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
>Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
>注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
>如果只有一个参数，Object.assign会直接返回该参数。
>如果该参数不是对象，则会先转成对象，然后返回。


**加粗方法1**

__加粗方法2__

*斜体方法1*

_斜体方法2_

***粗体+斜体***

~~删除线~~

## 表格

| 姓名 | 年龄 | 三围  |
| ----|:---:|-------:|
| 小王 | 15 | 30.20.50|
| 小王 | 15 | 30.20.50|
| 小王 | 15 | 30.20.50|


## 代码块
 ` Hello World `

## 多行代码块

``` javascript
module.exports = {
  "plugins": {
    "postcss-mpvue-wxss": {}
  }
}
```
``` scss
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
```

 ## 分隔线
 ***
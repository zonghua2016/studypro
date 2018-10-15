##嵌套
**1.父级嵌套**
``` scss
div{
  display: inline-block;
  a{
    color: black;  
    &:hover{
      color: white;
      font-size: 20px;
    }
  }
}
```
**2.属性嵌套**
``` scss
div{
  font{
    weight: bold;
    size: 16px;
    family: "微软雅黑";
  }
}
```
``` scss
div{
  border: 1px solid #000;{
    left: 0;
    right: 0;
  }
}
```
##混合mixin
类似于js中的函数
``` scss
@mixin 名字(参数1， 参数2) {
  ...
}
```
``` scss
@mixin alert {
    color: #eee;
    background-color: #fcf8e3;
    a{
      color: blue;
    }
}
alert-waring {
  @include alert;
}
```
**在mixin中使用参数**
>darken:给指定颜色加深指定数值的颜色值
``` scss
@mixin alert($text-color, $background) {
    color: $text-color;
    background-color: $background;
    a{
      color: darken($text-color, 10%);
    }
}
alert-waring {
  @include alert(#8a6d3b, #fcf8e3);
}
// 指定变量名称后就不用考虑顺序了
alert-info {
  @include alert($background: #fcf8e3, $text-color: #8a6d3b);
}
```

##继承 extend

>用于继承另一个选择器中设定的属性，同时继承其子属性值

``` scss
.alert{
  padding: 12px;
}
.alert a{
  font-size: 20px;
}
.alert-info {
  @extend .alert;
  background-color: blue;
}

```
##Partials
>scss中本身包含了一个导入其他scss文件的功能叫做import
>但是每次import的时候都会发出一个http请求，消耗服务器资源，导致页面变慢
>scss扩这里import的功能：可以把整个的scss文件分隔成小的css块（scss文件），通过import导入进来，但不会编译这些css块，这些小的css块叫做Partials
>Partials使用_下划线开头标识

**_base.scss**
``` scss
background: {
  color: blue;
  font-size: 16px;
}
```
**style.scss**
>在import时候，不用带下划线，会自动查找
``` scss
@import 'base'
.alert{
  padding: 12px;
}
.alert a{
  font-size: 20px;
}
```

##注释

**1、单行注释**
> 不会出现在编译之后的文件
``` scss
// 这是单行注释
```

**2、多行注释**
>多行注释会在编译输出的文件中保留，但在压缩的文件中不会保留
``` scss
/*
 * 这是多行注释
 * 这是多行注释
 */
```
**3、强制注释**
>比多行注释多一个！号，会一直出现在编译文件中和压缩后的文件
``` scss
/*!
 * 这是多行注释
 * 这是多行注释
 */
```
## 指令

**@if**

``` scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```
**@for**
``` scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```
**@each**
``` scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```
``` scss
@each $animal, $color, $cursor in (puma, black, default),
                                  (sea-slug, blue, pointer),
                                  (egret, white, move) {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}
```
**@while**
```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```
## 自定义函数
``` scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }
```
编译为
```scss
#sidebar {
  width: 240px; 
}
```


## 警告
``` scss
@mixin adjust-location($x, $y) {
  @if unitless($x) {
    @warn "Assuming #{$x} to be in pixels";
    $x: 1px * $x;
  }
  @if unitless($y) {
    @warn "Assuming #{$y} to be in pixels";
    $y: 1px * $y;
  }
  position: relative; left: $x; top: $y;
}
```













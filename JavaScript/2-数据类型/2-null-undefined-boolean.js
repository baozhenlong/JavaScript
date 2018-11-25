//---null、undefined、boolean

//1---null和undefined
//1.1---概述
//null和undefined都可以表示"没有"，含义非常相似
//将一个变量赋值为null或undefined，老实说，语法效果几乎没区别
//if语句中，它们都会被自动转为false，相等运算符(==)甚至直接报告两者相等
if (!undefined) {
    console.log("undefined is false");
}
if (!null) {
    console.log("null is false");
}
console.log(undefined == null); //true
//根据C语言的传统，null可以自动变为0
console.log(Number(null)); //0
console.log(5 + null); //5
//区别：
//null是一个表示"空"的对象，转为数值时为0
//undefined是一个表示"此处无定义"的原始值，转为数值时为NaN
//1.2---用法和含义
//null表示空值，即该处的值现在为空
//调用函数函数时，某个参数未设置任何值，这时就可以传入null，表示该参数为空
//undefined表示未定义，下面是返回undefined的典型场景：
//场景1---变量声明了，但没有赋值
var i;
console.log("i = ", i); //undefined
//场景2---调用函数时，应该提供的参数没有提供，该参数等于undefined
function f(x) {
    return x;
}
console.log("f() = ", f()); //undefined
//场景3---对象没有赋值的属性
var o = new Object();
console.log("o.p = ", o.p); //undefined
//场景4---函数没有返回值时，默认返回undefined
function g() {}
console.log("g() = ", g()); //undefined

//2---布尔值
//布尔值代表"真"和"假"2个状态
//"真"用关键字true表示
//"假"用关键字false表示
//布尔值只有这2个值
//下列运算符会返回布尔值：
//前置运算符：!(Not)
//相等运算符：===, !==, ==, !=
//比较运算符：>, >=, <, <=
//如果JavaScript预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值
//转换规则是：除了这6个值(undefined、null、false、0、NaN、""或'')被转为false，其他值都视为true
//布尔值往往用于程序流程的控制，如：
if ("") {
    console.log("true");
}
//没有任何输出
//上面代码中，if命令后面的判断条件，预期应该是一个布尔值，所以JavaScript自动将空字符串，转为布尔值false
//空数组[]和空对象{}对应的布尔值，都是true
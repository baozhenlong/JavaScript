// --- null、undefined、boolean
// 字面量：用于表示固定值的符号，如 undefiend 、 null 、true 、 false

// 1 --- null 和 undefined
// 1.1 --- 概述
{
    // null 和 undefined 都可以表示"没有"，含义非常相似
    // 将一个变量赋值为 null 或 undefined ，老实说，语法效果几乎没区别
    // if 语句中，它们都会被自动转为 false ，相等运算符 (==) 甚至直接报告两者相等
    if (!undefined) {
        console.log("undefined is false");
    }
    if (!null) {
        console.log("null is false");
    }
    console.log('undefiend == null', undefined == null); // true
    // 根据 C 语言的传统， null 可以自动变为 0
    console.log(Number(null)); // 0
    console.log(5 + null); // 5
    // 区别：
    // null
    // 是一个表示"空"的对象，转为数值时为 0
    // 意在保存对象的变量，最好初始化为 null
    console.log('typeof null ', typeof null); // object
    // undefined
    // 是一个表示"此处无定义"的原始值，转为数值时为 NaN
    // 未对声明的变量加以初始化，其值是 undefined
    var msg;
    console.log('not init msg', msg); // undefiend
}
// 1.2 --- 用法和含义
{
    // null 表示空值，即该处的值现在为空
    // 调用函数函数时，某个参数未设置任何值，这时就可以传入 null ，表示该参数为空
    // undefined 表示未定义，下面是返回 undefined 的典型场景：
    // 场景 1 --- 变量声明了，但没有赋值
    var i;
    console.log("i = ", i); // undefined
    // 场景 2 --- 调用函数时，应该提供的参数没有提供，该参数等于 undefined
    function f(x) {
        return x;
    }
    console.log("f() = ", f()); // undefined
    // 场景 3 --- 对象没有赋值的属性
    var o = new Object();
    console.log("o.p = ", o.p); // undefined
    // 场景 4 --- 函数没有返回值时，默认返回 undefined
    function g() {}
    console.log("g() = ", g()); // undefined
}

// 2 --- 布尔值
{
    // 布尔值代表"真"和"假" 2 个状态
    // "真"用关键字 true 表示
    // "假"用关键字 false 表示
    // 布尔值只有这 2 个值
    // 下列运算符会返回布尔值：
    // 前置运算符：!(Not)
    // 相等运算符：===, !==, ==, !=
    // 比较运算符：>, >=, <, <=
    // 如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值
    // 转换规则是：除了这6个值（ undefined 、 null 、 false 、 0 、 NaN 、 "" 或 '' ）被转为 false ，其他值都视为 true
    // 布尔值往往用于程序流程的控制，如：
    if ("") {
        console.log("true");
    }
    // 没有任何输出
    // 上面代码中， if 命令后面的判断条件，预期应该是一个布尔值，所以 JavaScript 自动将空字符串，转为布尔值 false
    // 空数组 [] 和空对象 {} 对应的布尔值，都是 true
}
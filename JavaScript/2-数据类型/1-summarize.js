//---概述

//1---简介
{
    //JavaScript语言的每一个值，都属于每一种数据类型
    //数据类型1---数值：整数和小数，比如1和3.14
    //数据类型2---字符串：文本，比如hello
    //数据类型3---布尔值：表示真伪的2个特殊值，即true(真)和false(假)
    //数据类型4---undefined：表示"未定义"或不存在，即由于目前没有定义，所以此处暂时没有任何值
    //数据类型5---null：表示控制，即此处的值为空
    //数据类型6---对象：各种值组成的集合
    //原始类型的值：数值、字符串、布尔值这3种类型；即它们是最基本的数据类型，不能再细分了
    //合成类型的值：对象；因为一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器
    //特殊值：undefined和null
    //对象是最复杂的数据类型，又可以分成3个子类型：狭义的对象(object)、数组(array)、函数(function)
    //狭义的对象和数组是2种不同的数据组合方式
    //函数其实是处理数据的方法，JavaScript把它当成一种数据类型，可以赋值给变量
}

// 2 --- typeof 运算符
{
    // JavaScript 有 3 种方法，可以确定一个值到底是什么类型
    // typeof 运算、 instanceof 运算符、 Object.prototype.toString 方法
    // typeof 运算符可以返回一个值的数据类型
    // 数值返回 "number"
    console.log(typeof 123); // "number"
    // 字符串返回 "string"
    console.log(typeof "123"); // "string"
    // 布尔值返回 "boolean"
    console.log(typeof false); // "boolean"
    // 函数返回 "function"
    function f() {}
    console.log(typeof f); // "function"
    // undefined 返回 "undefined"
    console.log(typeof undefined); // "undefined"
    // 直接使用未声明的变量会报错；但是放在typeof后面，就不报错了
    if (typeof v === "undefined") {
        console.log("v is undefined");
    }
    // 对象返回 "object"
    console.log(typeof {}); // "object"
    console.log(typeof []); // "object"
    // null 返回 "object"
    console.log(typeof null); // "object"
}
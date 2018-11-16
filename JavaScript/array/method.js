//---数组常用方法

//1---改变原数组的方法
//1.1---pop()：删除尾部的第一个元素，返回这个元素
{
    let a = [1, 2, 3];
    let b = a.pop();
    console.log("[pop]---a = ", a); //[1,2]
    console.log("[pop]---b = ", b); //3
}
//1.2---push()：尾部推入，返回数组长度
//1.3---shift()：顶部弹出，返回该元素
//1.4---unshift()：顶部压入，返回数组长度
//1.5---reverse()：反转数组，返回反转后的数组
//1.6---splice()：返回被删除的数组成的数组，可以为[]

//2---不改变原数组的方法
//2.1---concat：()：返回拼接后的数组
//2.2---join()：返回拼接后的字符串，可以指定间隔
console.log("[join]---", [1, 2, 3].join()); //1,2,3
console.log("[join]---", [1, 2, 3].join('')); //123
//2.3---slice(begin = 0, end = arr.length - 1)：截取数组，返回截取的部分，不改变原始数组
//2.1---forEach()：
//2.1---map；()：

//3---数组的拷贝
//数组属于引用类型，简单的赋值只是添加了一个指向数组的指针
{
    let a = [1, 2],
        b = a;
    b.push(3);
    console.log("[数组的赋值拷贝]---a = ", a); //[ 1, 2, 3 ]
}
//独立的拷贝
//concat
{
    let a = [1, 2],
        b = a.concat();
    a.reverse();
    console.log("[数组的独立拷贝]---concat a = ", a); //[ 2, 1 ]
    console.log("[数组的独立拷贝]---concat b = ", b); //[ 2, 1 ]
}
//slice
{
    let a = [1, 2],
        b = a.slice();
    a.reverse();
    console.log("[数组的独立拷贝]---slice a = ", a); //[ 2, 1 ]
    console.log("[数组的独立拷贝]---slice b = ", b); //[ 2, 1 ]
}
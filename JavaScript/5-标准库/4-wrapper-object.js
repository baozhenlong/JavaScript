// --- 包装对象
// Number 、 String 、 Boolean
//1---定义
{
    //对象是JavaScript语言最主要的数据类型
    //3种原始类型的值(数值、字符串、布尔值)在一定条件下，也会自动转为对象，也就是原始类型的"包装对象"
    //包装对象：分别与数值、字符串、布尔值相对应的Number 、 String 、 Boolean 三个原生对象
    //这3个原生对象可以把原始类型的值变成对象
    var v_1 = new Number(123);
    var v_2 = new String('abc');
    var v_3 = new Boolean(true);
    console.log('[定义]---', typeof v_1);
    //'object'
    console.log('[定义]---', typeof v_2);
    //'object'
    console.log('[定义]---', typeof v_3);
    //'object'
    console.log('[定义]---', v_1 === 123);
    //false
    console.log('[定义]---', v_2 === 'abc');
    //false
    console.log('[定义]---', v_3 === true);
    //false
    //包装对象的最大目的，首先使得JavaScript的对象涵盖所有的值，其次使得原始类型的值可以方便地调用某些方法
    //Numebr、String、Boolean
    //作为构造函数使用(带有new)：可以将原始类型的值转为对象
    //作为普通函数使用(不带有new)：可以将任意类型的值，转为原始类型的值
}

//2---实例方法
{
    //3种包装对象各自提供了许多实例方法；这里介绍它们共同具有、从Object对象继承的方法：valueOf和toString
    //2.1---valueOf()
    {
        //返回包装对象实例对应的原始类型的值
        console.log('[实例方法]---', new Number(123).valueOf());
        //123
        console.log('[实例方法]---', new String('abc').valueOf());
        //'abc'
        console.log('[实例方法]---', new Boolean(true).valueOf());
        //true
    }
    //2.2---toString()
    {
        //返回包装对象实例对用的字符串形式
        console.log('[实例方法]---', new Number(123).toString());
        //'123'
        console.log('[实例方法]---', new String('abc').toString());
        //'abc'
        console.log('[实例方法]---', new Boolean(true).toString());
        //'true'
    }
}

// 3 --- 原始类型与实例对象的自动转换
{
    // 原始类型的值，可以自动当作包装对象调用，即调用包装对象的属性和方法
    // 在读取模式下访问基本类型值时， JavaScript 引擎会自动将原始类型的值转为包装对象实例，在使用后立刻销毁实例
    // 比如，字符串可以调用 length 属性，返回字符串的长度
    var str = 'abc';
    console.log('[自动转换]---', str.length); // 3
    //等同于
    var str_obj = new String(str);
    console.log('[自动转换]---', str_obj); // [String: 'abc']
    console.log('[自动转换]---', str_obj.length); // 3
    str_obj.x = 123;
    console.log('[自动转换]---', str_obj.x); // 123
    // 自动转换成的包装对象是只读的，无法修改，所以字符串无法添加新属性
    str.x = 123;
    console.log('[自动转换]---', str.x); // undefined
    // 另一方面，调用结束后，包装对象实例会自动销毁
    // 这意味着，下一次调用字符串的属性时，实际上调用一个新生成的对象，而不是上一次调用时生成的那个对象
    // 所以取不到赋值在上一个对象的属性
    // 如果要为字符串添加属性，只有在它的原型对象 String.prototype 上定义
}

//4---自定义方法
{
    //除了原生的实例方法，包装对象还可以自定义方法和属性，供原始类型的值直接调用
    //比如，新增一个double方法，使得字符串和数字翻倍
    String.prototype.double = function () {
        return this.valueOf() + this.valueOf();
    };
    console.log('[自定义方法]---', 'abc'.double());
    //abcabc
    Number.prototype.double = function () {
        return this.valueOf() + this.valueOf();
    };
    console.log('[自定义方法]---', (123).double());
    //246
    //上面代码在123外面必须要加上圆括号，否则后面的点运算符会被解释成小数点
    //但是，这种自定义方法和属性的机制，只能定义在包装对象的原型上
    //如果直接对原始类型的变量添加属性，则无效
}
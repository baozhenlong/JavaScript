//---数据类型的转换

//1---概述
{
    //JavaScript是一种动态类型语言，变量没有类型限制，可以随时赋予任意值
    var x = true ? 1 : 'a';
    //虽然变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的
    //如果运算符发现，运算子的类型与预期不符，就会自动转换类型
    //比如，减法运算符预期左右两侧的运算子应该是数值，如果不是，就会自动将它们转为数值
    console.log('[减法]---', '4' - '3'); //1
}

// 2 --- 强制转换
// 2.1 --- Number(Any)
{
    // 可以将任意类型的值转化成数值
    // 参数是原始类型值
    {
        // 数值
        {
            // 转换后还是原来的值
            console.log('[Number]---数值', Number(324)); // 324
        }
        // 字符串
        {
            // 如果可以被解析为数值， Number() 将判断是调用 parseInt() 还是 parseFloat() ，并转换为相应的数值
            console.log('[Number]---字符串', Number('324')); // 324
            // 如果不可以被解析为数值，返回 NaN
            console.log('[Number]---字符串', Number('324abc')); // NaN
            // 空字符串转为 0
            console.log('[Number]---字符串', Number('')); // 0
            // Number 和 parseInt
            // 都会自动过滤一个字符串前导和后缀的空格
            console.log('[Number]---字符串', Number('\t\v\r12.34\n')); // 12
            console.log('[Number]---字符串', parseInt('\t\v\r12.34\n')); // 12.34
            // parseInt() --- 逐个解析字符
            console.log('[Number]---字符串', parseInt('42 cats')); // 42
            // Number() --- 整体转换字符串的类型，只要有一个字符无法转成数值，整个字符串就会被转为 NaN
            console.log('[Number]---字符串', Number('42 cats')); // NaN
            console.log('[Number]---字符串', Number('.12')); // 0.12
        }
        // 布尔值
        {
            // true 转成 1 ， false 转成 0
            console.log('[Number]---布尔值', Number(true)); //1
            console.log('[Number]---布尔值', Number(false)); //0
        }
        // 参数是 undefined 和 null
        {
            console.log('[Number]---undefined', Number(undefined)); // NaN
            console.log('[Number]---null', Number(null)); // 0
        }
    }
    // 参数是对象
    {
        // 简单的规则： Number 方法的参数是对象时，将返回 NaN ，除非是包含单个数值的数组
        console.log('[Number]---对象', Number({
            a: 1
        })); // NaN
        console.log('[Number]---对象', Number([1, 2, 3])); // NaN
        console.log('[Number]---对象', Number([5])); // 5
        // 转换规则：
        // 第一步：调用对象自身的 valueOf 方法；如果返回原始类型的值，则直接对该值使用 Number 函数，不再进行后续步骤
        // 第二步：如果 valueOf 方法返回的还是对象，则改为调用对象自身的 toString 方法；
        // 如果 toString 方法返回原始类型的值，则对该值使用 Number 函数，不再进行后续步骤
        // 第三步：如果 toString 方法返回的是对象，就会报错
        var obj = {
            x: 1
        };
        console.log('[Number]---对象', Number(obj));
        // 等同于
        if (typeof obj.valueOf() === 'object') {
            console.log('[Number]---对象，toString', Number(obj.toString())); // NaN
        } else {
            console.log('[Number]---对象，valueOf', Number(obj.valueOf()));
        }
        // 默认情况下，对象的 valueOf 方法返回对象本身，所以一般总是会调用 toString 方法，
        // 而 toString 方法返回对象的类型字符串（比如 [object object] ），所以结果为 NaN
        console.log('[Number]---对象 自定义valueOf', Number({
            valueOf: function () {
                return 2;
            }
        })); // 2
        console.log('[Number]---对象 自定义toString', Number({
            toString: function () {
                return 3;
            }
        })); // 3
        console.log('[Number]---对象 自定义valueOf，toString', Number({
            valueOf: function () {
                return 2;
            },
            toString: function () {
                return 3;
            }
        })); // 2
        // valueOf方法先于 toString 方法执行
    }
}
// 2.2 --- String()
{
    // 可以将任意类型的值转换为字符串
    // 参数是原始类型值
    {
        // 数值：转为相应的字符串
        console.log('[String]---数值', String(1.2)); // 1.2
        console.log('[String]---数值', String(.2)); // 0.2
        // 字符串：转换后还是原来的值
        console.log('[String]---字符串', String('abc')); // "abc"
        // 布尔值：转为字符串 "true" , "false"
        console.log('[String]---布尔值', String(true)); // "true"
        console.log('[String]---布尔值', String(false)); // "false"
        // undefined：转为字符串 "undefined"
        console.log('[String]---undefined', String(undefined)); // "undefined"
        // null：转为字符串 "null"
        console.log('[String]---null', String(null)); // "null"
    }
    // 参数是对象
    {
        // String 方法的参数如果是对象，返回一个类型字符串；参数是数组，返回该数组的字符串形式
        console.log('[String]---对象', String({
            a: 1
        })); // "[object Object]"
        console.log('[String]---对象', String([1, 2, 3])); // "1,2,3"
        // String 背后的转换规则，与 Number 方法基本相同，只是互换了 valueOf 方法和 toString 方法的执行顺序
        // 第一步：先调用对象自身的 toString 方法；如果返回原始类型的值，则对该值使用 String 函数，不再进行后续步骤
        // 第二步：如果 toString 方法返回的是对象，再调用对象自身的 valueOf 方法；
        // 如果 valueOf 方法返回原始类型的值，则对该值使用 String 函数，不再进行后续步骤
        // 第三步：如果 valueOf 方法返回的是对象，就会报错
        console.log('[String]---对象', String({
            a: 1
        })); // "[object Object]"
        //等同于
        console.log('[String]---对象', String({
            a: 1
        }.toString())); // "[object Object]"
        console.log('[String]---对象 自定义toString', String({
            toString: function () {
                return 3;
            }
        })); // "3"
        console.log('[String]---对象 自定义valueOf', String({
            valueOf: function () {
                return 2;
            }
        })); // "[object Object]"
        console.log('[String]---对象 自定义toString，valueOf', String({
            toString: function () {
                return 3;
            },
            valueOf: function () {
                return 2;
            }
        })); // "3"
        // toString 方法先于 valueOf 方法执行
    }
}
// 2.3 --- Boolean()
{
    // 可以将任意类型的值转为布尔值
    // 除了以下 5 个值得转换结果为 false ，其他的值全部为 true
    // undefined
    console.log('[Boolean]---undefined', Boolean(undefined)); // false
    // null
    console.log('[Boolean]---null', Boolean(null)); // false
    // +0 或 -0
    console.log('[Boolean]---0', Boolean(0)); // false
    // NaN
    console.log('[Boolean]---NaN', Boolean(NaN)); // false
    // ''：空字符串
    console.log('[Boolean]---""', Boolean('')); // false
    // 注意：所有对象（包括空对象）的转换结果都是 true
    console.log('[Boolean]---{}', Boolean({})); // true
    console.log('[Boolean]---[]', Boolean([])); // true
    console.log('[Boolean]---布尔值对象', Boolean(new Boolean(false))); // true
}

//3---自动转换
{
    //它是以强制转换为基础的
    //遇到以下3种情况时，JavaScript会自动转换数据类型，即转换是自动完成的，用户不可见
    //情况---1---不同类型的数据相互运算
    {
        console.log('[自动转换]---不同类型的数据相互运算', 123 + 'abc'); //"123abc"
    }
    //情况---2---对非布尔值类型的数据求布尔值
    if ('abc') {
        console.log('[自动转换]---对非布尔值类型的数据求布尔值', 'if'); //if
    }
    //情况---3---对非数值类型的值使用一元运算符(即+和-)
    {
        console.log('[自动转换]---对非数值类型的值使用一元运算符', +{
            foo: 1
        }); //NaN
        console.log('[自动转换]---对非数值类型的值使用一元运算符', -[1, 2, 3]); //NaN
    }
    //自动转换的规则：预期什么类型的值，就调用该类型的转换函数
    //比如，某个位置预期为字符串，就调用String函数进行转换
    //如果该位置既可以是字符串，也可以是数值，那么默认转为数值
    //由于自动转换具有不确定性，而且不易除错；建议在预期为布尔值、数值、字符串的地方，全部使用Boolean、Number、String函数进行显式转换
}
//3.1---自动转换为布尔值
{
    //JavaScript遇到预期为布尔值的地方(比如if语句的条件部分)，就会将非布尔值的参数自动转换为布尔值；系统内部会自动调用Boolean函数
    //下面2种写法，有时也用于将一个表达式转为布尔值；它们内部调用的也是Boolean函数
    //expression ? true : false
    //!! expression
}
//3.2---自动转换为字符串
{
    //JavaScript遇到预期为字符串的地方，就会将非字符串的值自动转为字符串
    //规则：先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串
    //字符串的自动转换，主要发生在字符串的加法运算时，当一个值为字符串，另一个值为非字符串，则后者转为字符串
    console.log('[自动转换]---为字符串', '5' + 1); //"51"
    console.log('[自动转换]---为字符串', '5' + true); //"5true"
    console.log('[自动转换]---为字符串', '5' + false); //"5false"
    console.log('[自动转换]---为字符串', '5' + {}); //"5[object object]"
    console.log('[自动转换]---为字符串', String([]) === ''); //true
    console.log('[自动转换]---为字符串', '5' + []); //"5"
    console.log('[自动转换]---为字符串', '5' + function () {}); //"5function (){}"
    console.log('[自动转换]---为字符串', '5' + undefined); //"5undefined"
    console.log('[自动转换]---为字符串', '5' + null); //"5null"
}
//3.3---自动转换为数值
{
    //JavaScript遇到预期为数值的地方，就会将参数自动转换为数值；系统内部会自动调用Number函数
    //除了加法运算符(+)有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值
    console.log('[自动转换]---为数值', '5' - '2'); //3
    console.log('[自动转换]---为数值', '5' * '2'); //10
    console.log('[自动转换]---为数值', true - 1); //0
    console.log('[自动转换]---为数值', false - 1); //-1
    console.log('[自动转换]---为数值', '1' - 1); //0
    console.log('[自动转换]---为数值', '5' * []); //0
    console.log('[自动转换]---为数值', 'abc' - 1); //NaN
    console.log('[自动转换]---为数值', null + 1); //1
    console.log('[自动转换]---为数值', undefined + 1); //NaN
    //一元运算符也会把运算子转成数值
    console.log('[自动转换]---为数值', +'abc'); //NaN
    console.log('[自动转换]---为数值', -'abc'); //NaN
    console.log('[自动转换]---为数值', +true); //1
    console.log('[自动转换]---为数值', -false); //0
}
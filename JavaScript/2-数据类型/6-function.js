//---函数

//函数：是一段可以反复调用的代码块
//函数能接受输入的参数，不同的参数会返回不同的值

//1---概述 
//1.1---函数声明
{
    //JavaScript函数声明的三种方式
    //1.1.1---function命令
    {
        //function命令声明的代码区块，就是一个函数
        //function命令后面是函数名，函数名后面是一对圆括号，里面传入函数的参数，函数体放在大括号里
        function print(s) {
            //函数体
            console.log('[函数声明]---s = ', s);
        }
        print('声明'); //[函数声明]---s =  声明
    }
    //1.1.2---函数表达式
    {
        //采用变量赋值的写法
        var print_2 = function x() {
            console.log('[函数表达式]---函数名 typeof x = ', (typeof x));
        };
        //这种写法将一个匿名函数赋值给变量
        //这时，这个匿名函数又称函数表达式，因为赋值语句的等号右侧只能放表达式
        //采用函数表达式声明函数时，function命令后面不带有函数名
        //如果加上函数名，该函数名只在函数体内部有效，在函数体外部无效
        print_2(); //function
        console.log('[函数表达式]---函数名 typeof x = ', (typeof x)); //undefined
        //上面代码在函数表达式中加入了函数名x
        //这个x只在函数体内部可用，指代函数表达式本身，其他地方都不可用
        //这种写法的用处有2个：
        //用处1---可以在函数体内部调用自身
        //用处2---方便除错；除错工具显示函数调用栈时，将显示函数名，而不再显示这里是一个匿名函数
    }
    //注意：
    //函数的表达式需要在语句的结尾加上分号，表示语句结束
    //函数的声明在结尾的大括号后面不用加分号
    //1.1.3---Function构造函数
    {
        var add = new Function(
            'x',
            'y',
            'return x + y;'
        );
        //上面代码中，除了最后一个参数是add函数的函数体，其他参数都是add函数的参数
        //如果只有一个参数，该参数就是函数体
        var foo = new Function(
            'return "hello";'
        );
        //等价于
        // function foo() {
        //     return 'hello';
        // }
        //Function构造函数可以不使用new命令，返回结果完全一样
        //总的来说，这种声明函数的方式非常不直观，几乎无人使用
    }
}
//1.2---函数的重复声明
{
    //如果同一个函数被多次声明，后面的声明就会覆盖前面的声明
    function f() {
        console.log(1);
    }
    f(); //2
    function f() {
        console.log(2);
    }
    f(); //2
    //上面代码中，后一次的函数声明覆盖了前面一次
    //而且，由于函数名的提升，前一次声明在任何时候都是无效的
}
//1.3---圆括号运算符、return语句、递归
{
    //调用函数时，要使用圆括号运算符；圆括号之中，可以加入函数的参数
    function sum(a, b) {
        return a + b;
    }
    console.log('[函数调用]---', sum(1, 2)); //3
    //函数名后面紧跟一对圆括号，就会调用这个函数
    //函数体内部的return语句，表示返回
    //JavaScript引擎遇到return语句，就直接返回return后面的那个表达式的值，如果即使还有语句，也不会得到执行
    //即return语句所带的那个表达式，就是函数的返回值
    //return语句不是必需的，如果没有的话，该函数就不返回任何值，或者说返回undefined
    //函数可以调用自身，这就是递归
    function fib(num) {
        if (num === 0) {
            return 0;
        }
        if (num === 1) {
            return 1
        }
        return fib(num - 2) + fib(num - 1);
    }
    console.log('[递归]---', fib(6)); //8
}
//1.4---第一等公民
{
    //JavaScript语言将函数看作一种值，与其他值(数值、字符串、布尔值等等)地位相同
    //凡是可以使用值的地方，就能使用函数
    //可以把函数赋值给变量和对象的属性
    var operator = sum;
    console.log('[第一等公民]---赋值 ', operator(1, 2)); //3
    //可以当作参数传入其他函数
    //可以作为函数的结果返回
    function copy(op) {
        return op;
    }
    console.log('[第一等公民]---作为函数参数、作为函数结果返回 ', copy(sum(2, 2))); //4   
    //函数只是一个可以执行的值，此外并无特殊之处
    //由于函数与其他数据类型地位平等，所以在JavaScript语言中又称函数第一等公民
}
//1.5---函数名的提升
{
    //JavaScript引擎将函数名视同变量名
    //所以采用function命令声明函数时，整个函数会像变量声明一样，被提升到代码头部
    f();
    //[函数名的提升]---f
    function f() {
        console.log('[函数名的提升]---f');
    }
    //如果采用赋值语句定义函数，JavaScript就会报错
    console.log('[赋值语句定义函数]---', (typeof f_1)); //undefined
    // f_1();
    // f_1 is not a function
    var f_1 = function () {};
    //上面代码等价于
    // var f_1;
    // f_1();
    // f_1 = function(){}
    //调用f_1时，f_1只是被声明了，还没有被赋值，等于undefined，所以会报错
    //不能同时使用var和function声明同一个变量，但可以对function声明的变量赋值
    function same_f() {
        console.log('same_f = function命令');
    }
    same_f = function () {
        console.log('same_f = 赋值语句');
    }
    same_f(); //赋值语句
}

//2---函数的属性和方法
//2.1---name属性
{
    //函数的name属性返回函数的名字
    function f_name() {}
    console.log('[函数名]---', f_name.name); //f_name
    //通过变量赋值定义的函数：
    //如果变量的值是一个匿名函数，那么name属性返回变量名
    var f_name_2 = function () {};
    console.log('[函数名]---', f_name_2.name); //f_name_2
    //如果变量的值是一个具名函数，那么那么属性返回function关键字之后的那个函数名
    var f_name_3 = function my_name() {};
    console.log('[函数名]---', f_name_3.name); //my_name
    //上面代码中，f_name_3.name返回函数表达式的名字
    //注意：真正的函数名还是f_name_3，而my_name这个名字只在函数体内部可用
    //name属性的一个用处：获取参数函数的名字
    function test(f) {
        console.log('[参数函数的名字]---', f.name);
    }
    test(f_name); //f_name
}
//2.2---length属性
{
    //函数的length属性返回函数预期传入的参数个数，即函数定义之中的参数个数
    function f_length(a, b) {
        console.log('[函数定义之中的参数个数]---', f_length.length);
    }
    console.log('[length]---', f_length.length); //2
    f_length(); //2
    //不管调用时，输入了多少个参数，length属性始终等于2
    //length属性提供了一种机制，判断定义时和调用时参数的差异，以便实现对象对象编程的"方法重载"
}
//2.3---toString()
{
    //函数的toString方法返回一个字符串，内容是函数的源码
    function f_to_string() {
        //函数内部的注释也可以返回
        var a = 1;
        a = a + 2 * a;
    }
    console.log('[toString]---', f_to_string.toString());
    // function f_to_string() {
    //     //函数内部的注释也可以返回
    //     var a = 1;
    //     a = a + 2 * a;
    // }
    //利用"函数内部的注释也可以返回"这一点，可以变相实现多行字符串
    var multi_line = function (f) {
        var array = f.toString().split('\n');
        return array.slice(1, array.length - 1).join('\n');
    }
}

//3---函数作用域
//3.1---定义
{
    //作用域指的是变量存在的范围
    //在ES5的规范中，JavaScript只有2种作用域
    //全局作用域：变量在整个程序中一直存在，所有地方都可以读取
    //函数作用域：变量只在函数内部存在
    //ES6新增了块级作用域
    //函数外部声明的变量就是全局变量，它可以在函数内部读取
    var v = 1;
    //函数内部可以读取全局变量v
    function print_v() {
        var v = 2;
        console.log('[函数作用域]---全局变量 ', v);
        var v_inside = 2;
    }
    print_v(); //2
    //函数内部定义的变量，会在该作用域内覆盖同名全局变量
    //在函数内部定义的变量，外部无法读取，称为"局部变量"
    console.log('[函数作用域]---局部变量 ', (typeof v_inside)); //undefined
    //注意：对于var命令来说，局部变量只能在函数内部声明，在其他区块中声明，一律都是全局变量
    if (true) {
        var x = 5;
    }
    console.log('[var命令]---', x); //5
}
//3.2---函数内部的变量提升
{
    //与全局作用域一样，函数作用域内部也会产生"变量提升"现象
    //var命令声明的变量，不管在什么位置，变量声明都会被提升到函数体的头部
    function foo(x) {
        if (x > 100) {
            var tmp = x - 100;
        }
    }
    //等价于
    function foo_2(x) {
        var tmp;
        if (x > 100) {
            tmp = x - 100;
        }
    }
}
//3.3---函数本身的作用域
{
    //函数本身也是一个值，也有自己的作用域
    //它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关
    var a = 1;
    var x = function () {
        console.log(a);
    };

    function f() {
        var a = 2;
        x();
    }
    f(); //1
    //上面代码中，函数x是在函数f的外部声明的，所以它的作用域绑定外层
    //内部变量a不会到函数体f内取值，所以输出1，而不是2
    //总之，函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域
    //很容易犯错的一点是，如果函数A调用B函数，却没考虑到函数B不会引用函数A的内部变量
    var x_1 = function () {
        console.log(b);
    };

    function y(f) {
        var b = 2;
        f();
    }
    // y(x_1); //b is not defined
    //同样的，函数体内部声明的函数，作用域绑定函数体内部
    function foo() {
        var x = 'x';

        function bar() {
            console.log(x);
        }
        return bar;
    }
    var x = 'x_2';
    var foo_copy = foo();
    foo_copy(); //x
    //上面代码中，函数foo内部声明了一个函数bar，bar的作用域绑定foo
    //当在foo外部取出bar执行时，变量x指向的是foo内部的x，而不是foo外部的x
}

//4---参数
//4.1---概述
//4.2---参数的省略
//4.3---传递方式
//4.4---同名参数
//4.5---arguments参数

//5---函数的其他知识点
//5.1---闭包
//5.2---立即调用的函数表达式(IIFE)

//6---eval命令
//6.1---基本用法
//6.2---eval的别名调用
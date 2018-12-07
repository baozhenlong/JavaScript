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

//2---函数的属性和方法
//2.1---name属性
//2.2---length属性
//2.3---toString()

//3---函数作用域
//3.1---定义
//3.2---函数内部的变量提升
//3.3---函数本身的作用域

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
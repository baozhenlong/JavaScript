// --- 函数
// 函数：是一段可以反复调用的代码块
// 函数能接受输入的参数，不同的参数会返回不同的值
// 每个函数都是 Function 类型的实例；与其他引用类型一样，具有属性和方法
// 函数是对象，函数名是一个指向函数对象的指针

// 1 --- 概述 
{
    // 1.1 --- 函数声明
    {
        // JavaScript 函数声明的三种方式
        // 1.1.1 --- function 关键字
        {
            // function 命令声明的代码区块，就是一个函数
            // function 命令后面是函数名，函数名后面是一对圆括号，里面传入函数的参数，函数体放在大括号里
            // 重要特征：函数声明提升；在执行代码之前会先读取函数声明；这意味着可以把函数声明放在调用它的语句后面
            function print(s) {
                // 函数体
                console.log('[函数声明]---s = ', s);
            }
            print('声明'); // 声明
            // 函数名仅仅是指向函数的指针
            let anotherPrint = print;
            anotherPrint(); // 声明
        }
        // 1.1.2 --- 函数表达式
        {
            // 采用变量赋值的写法
            var print2 = function x() {
                console.log('[函数表达式]---函数内 函数名 typeof x = ', (typeof x));
            };
            // 这种写法将一个函数赋值给变量
            // 这时，这个函数又称为函数表达式，因为赋值语句的等号右侧只能放表达式
            // 当 function 命令后面带有函数名时，该函数名只在函数体内部有效，在函数体外部无效
            print2(); // function
            console.log('[函数表达式]---函数外 函数名 typeof x = ', (typeof x)); // undefined
            // 上面代码在函数表达式中加入了函数名 x
            // 这个 x 只在函数体内部可用，指代函数表达式本身，其他地方都不可用
            // 这种写法的用处有 2 个：
            {
                // 用处 1 --- 可以在函数体内部调用自身
                // 用处 2 --- 方便除错；除错工具显示函数调用栈时，将显示函数名，而不再显示这里是一个匿名函数
            }
            // 创建没有名字的函数叫做匿名函数，也叫做拉姆达函数
            // 定义一个匿名函数，并立即执行该匿名函数
            {
                (function () {
                    console.log('[匿名函数]---立即执行');
                })(); // ()必需，表示将函数声明转换成函数表达式
                let num = function (num) {
                    return num;
                }(1);
                console.log('[匿名函数]---立即执行 num', num); // 1
            }
        }
        // 注意：
        {
            // 函数的表达式需要在语句的结尾加上分号，表示语句结束
            // 函数的声明在结尾的大括号后面不用加分号
        }
        // 1.1.3 --- Function 构造函数
        {
            var add = new Function(
                'x',
                'y',
                'return x + y;'
            );
            // 上面代码中，除了最后一个参数是 add 函数的函数体，其他参数都是 add 函数的参数
            // 如果只有一个参数，该参数就是函数体
            var foo = new Function(
                'return "hello";'
            );
            //等价于
            // function foo() {
            //     return 'hello';
            // }
            // Function 构造函数可以不使用 new 命令，返回结果完全一样
            // 总的来说，这种声明函数的方式非常不直观，几乎无人使用
        }
    }

    // 1.2 --- 函数的重复声明；没有重载
    {
        // 函数参数是以一个包含 0 个值或多个值数组形式传递的，所以没有重载
        // 如果同一个函数被多次声明，后面的声明就会覆盖前面的声明
        function f() {
            console.log(1);
        }
        f(); // 2
        function f() {
            console.log(2);
        }
        f(); // 2
        // 上面代码中，后一次的函数声明覆盖了前面一次
        // 而且，由于函数名的提升，前一次声明在任何时候都是无效的
    }

    //1.3 --- 圆括号运算符、return语句、递归
    {
        // 调用函数时，要使用圆括号运算符；圆括号之中，可以加入函数的参数
        function sum(a, b) {
            return a + b;
        }
        console.log('[函数调用]---', sum(1, 2)); //3
        // 函数名后面紧跟一对圆括号，就会调用这个函数
        // 函数体内部的 return 语句，表示返回
        // JavaScript 引擎遇到 return 语句，就直接返回 return 后面的那个表达式的值，如果即使还有语句，也不会得到执行
        // 即 return 语句所带的那个表达式，就是函数的返回值
        // return 语句不是必需的，如果没有的话，该函数就不返回任何值，或者说返回 undefined
        // 函数可以调用自身，这就是递归
        function fib(num) {
            if (num === 0) {
                return 0;
            }
            if (num === 1) {
                return 1
            }
            return fib(num - 2) + fib(num - 1);
        }
        console.log('[递归]---', fib(6)); // 8
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

    // 1.5 --- 函数名的提升
    {
        // JavaScript 引擎将函数名视同变量名
        // 所以采用 function 命令声明函数时，整个函数会像变量声明一样，被提升到代码头部
        f();
        //[函数名的提升]---f
        function f() {
            console.log('[函数名的提升]---f');
        }
        //如果采用赋值语句定义函数，提前调用，JavaScript就会报错
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
}

// 2 --- 函数的属性和方法
{
    // 2.1 --- 属性
    {
        // 2.1.1 --- name 属性
        {
            // 函数的 name 属性返回函数的名字
            function fName() {}
            console.log('[函数名]---', fName.name); // fName
            // 通过变量赋值定义的函数：
            // 如果变量的值是一个匿名函数，那么 name 属性返回变量名
            var fName2 = function () {};
            console.log('[函数名]---', fName2.name); // fName2
            // 如果变量的值是一个具名函数，那么那么属性返回 function 关键字之后的那个函数名
            var fName3 = function myName() {};
            console.log('[函数名]---', fName3.name); // myName
            // 上面代码中， fName3.name 返回函数表达式的名字
            // 注意：真正的函数名还是 fName3 ，而 myName 这个名字只在函数体内部可用
            // name 属性的一个用处：获取参数函数的名字
            function test(f) {
                console.log('[参数函数的名字]---', f.name);
            }
            test(fName); // fName
        }

        // 2.1.2 --- length 属性
        {
            // 函数的 length 属性返回函数预期传入的参数个数，即函数定义之中的参数个数
            function fLength(a, b) {
                console.log('[函数定义之中的参数个数]---', fLength.length);
            }
            console.log('[length]---', fLength.length); // 2
            fLength(); //2
            // 不管调用时，输入了多少个参数， length 属性始终等于 2
            // length 属性提供了一种机制，判断定义时和调用时参数的差异，以便实现对象对象编程的"方法重载"
        }

        // 2.1.3 --- prototype 原型属性
        {
            // 保存所有实例方法的所在
        }
    }

    // 2.2 方法
    {
        // 2.2.1---toString()
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
    }
}

// 3 --- 函数作用域
{
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
}

//4---参数
{
    //4.1---概述
    {
        //函数运行的时候，有时需要提供外部数据，不同的外部数据会得到不同的结果
        //这种外部数据就叫参数
        function square(x) {
            return x * x;
        }
        console.log('[参数]---概述 ', square(2)); //4
    }
    //4.2---参数的省略
    {
        //函数参数不是必需的，JavaScript允许省略参数
        function returnFirst(a, b) {
            return a;
        }
        console.log('[参数]---省略 ', returnFirst(1, 2, 3)); //1
        console.log('[参数]---省略 ', returnFirst(1)); //1
        console.log('[参数]---省略 ', returnFirst()); //undefined
        console.log('[参数]---省略 ', returnFirst.length); //2
        //省略的参数的值就变为undefined
        //注意：函数的length属性与实际传入的参数个数无关，只反映函数预期传入的参数个数
        //但是，没有办法只省略靠前的参数，而保留靠后的参数
        //如果一定要省略靠前的参数，只有显式传入undefined
        console.log('[参数]---省略 ', returnFirst(undefined, 1)); //undefined
        //上面代码中，如果省略第一个参数，就会报错
    }
    //4.3---传递方式
    {
        // 所有参数传递的都是值，不可能通过引用传递参数
        //函数参数如果是原始类型的值(数值、字符串、布尔值)，传递的是值的拷贝
        //这意味着，在函数体内修改参数值，不会影响到函数外部
        var p = 2;

        function pass_param_on_value(x) {
            x = 4;
        }
        pass_param_on_value(p);
        //在函数内部，p的值是原始值的拷贝，无论怎么修改，都不会影响到原始值
        console.log('[参数]---传递方式 ', p); //2
        //函数参数如果是复合类型的值(数组、对象、其他函数)，传递方式是传址传递
        //也就是说，传入函数的原始值是地址，因此在函数内部修改参数，将会影响到原始值
        var obj = {
            p: 1
        };

        function pass_param_on_address(o) {
            o.p = 2
        }
        pass_param_on_address(obj);
        console.log('[参数]---传递方式 修改参数 ', obj); // { p: 2 }
        //上面代码中，传入函数的是参数对象对象obj的地址
        //因此，在函数内部修改obj的属性p，会影响到原始值
        //注意：如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值
        var obj = [1];

        function replace_param(o) {
            o = [1, 2, 3];
        }
        replace_param(obj);
        console.log('[参数]---传递方式 替换参数 ', obj); //[ 1 ]
        //上面代码中，在函数内部，参数对象obj被整个替换成另一个值，这时不会影响到原始值
        //这是因为，形式参数o的值实际是参数obj的地址，重新对o赋值导致o指向另一个地址，保存在原地址上的的值当然不受影响
    }
    //4.4---同名参数
    {
        //如果有同名的参数，则取最后出现的那个值
        function same_name_param(a, a) {
            console.log('[参数]---同名参数 = ', a);
        }
        same_name_param(1, 2); //2
        //上面代码中，函数有2个参数，且参数名都是a；取值的时候，以后面的a为准，即使后面的a没有值或被省略，也是以其为准
        same_name_param(1); //undefined
        //调用函数的时候，没有提供第二个参数，a的取值就变成了undefined
        //这时，如果要获取第一个参数a的值，可以使用arguments对象
        function same_name_param_2(a, a) {
            console.log('[参数]---同名参数 = ', a);
            console.log('[参数]---同名参数中第一个参数 = ', arguments[0]);
        }
        same_name_param_2(1); //undefined;1
    }
    // 4.5 --- arguments 对象
    {
        // 4.5.1 --- 定义
        {
            // 由于 JavaScript 允许函数有不定数目的参数，所以需要一种机制（ arguments 对象 ），可以在函数体内部读取所有参数
            // arguments 对象包含了函数运行时的所有参数，这个对象只有在函数体内部，才可以使用
            // arguments 对象是所有（非箭头）函数中都可用的局部变量
            // arguments[0] 就是第一个参数， arguments[1] 就是第二个参数，以此类推
            var printArguments = function () {
                console.log('[arguments对象]---printArguments = ', arguments[0]);
                console.log('[arguments对象]---printArguments = ', arguments[1]);
                console.log('[arguments对象]---printArguments = ', arguments[2]);
            };
            printArguments(1, 2, 3); // 1,2,3
            // 正常模式下， arguments 对象可以在运行时修改
            var changeArguments = function (a, b) {
                arguments[0] = 2;
                arguments[1] = 2;
                return a + b;
            };
            console.log('[arguments对象]---changeArguments = ', changeArguments(1, 1)); // 4
            // 上面代码中，函数调用时传入的参数，在函数内部被修改成 2 和 2
            // 严格模式下， arguments 对象是一个只读对象，修改它是无效的，但不会报错
            // 通过 arguments 对象的 length 属性，可以判断函数调用时到底带几个参数
            function printArgumentsLength() {
                console.log('[arguments对象]---printArgumentsLength = ', arguments.length);
            }
            printArgumentsLength(1, 2, 3); // 3
            printArgumentsLength(1); // 1
            printArgumentsLength(); // 0
        }
        // 4.5.2 --- 与数组的关系
        {
            // arguments 对象是一个对应于传递给函数的参数的类数组对象；只有 length 和 索引属性
            // 注意：虽然 arguments 很像数组，但它是一个对象；数组专有的方法( 比如 slice 、 forEach )，不能在 arguments 对象上直接使用
            // 如果要让arguments对象使用数组方法，真正的解决方法是将arguments转为真正的数组
            // 转换方法---1---slice
            // 转换方法---2---逐一填入数组
            var convert_to_array = function () {
                var args = Array.prototype.slice.call(arguments);
                console.log('[与数组的关系]---slice args = ', args);
                args = [];
                for (var i = 0; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }
                console.log('[与数组的关系]---push args = ', args);
            }
            convert_to_array(1, 2, 3); // [ 1, 2, 3 ]
        }
        //4.5.3---callee属性
        {
            //arguments对象带有一个callee属性，返回它对应的原函数
            var print_callee = function () {
                console.log('[callee属性]---', arguments.callee === print_callee);
            }
            print_callee(); //true
            //可以通过arguments.callee，达到调用函数自身的目的；这个属性在严格模式里面是禁用的，因此不建议使用
        }
    }
}

// 5 --- 函数的其他知识点
{
    // 5.1 --- 闭包
    {
        // 有权访问另一个函数作用域中的变量的函数
        // 函数内部可以直接读取全局变量
        // 函数外部无法读取函数内部声明的变量
        // 在后台执行环境中，闭包的作用域链包含着它自己的作用域、外部作用域、全局作用域
        // 通常，函数作用域及其所有变量都会在函数执行结束后被销毁
        // 但是，当函数返回一个闭包时，这个函数的作用域将会一直在内存中保存到闭包不存在为止
        // 5.1.1 --- 创建闭包的常见方式：在一个函数内部创建另一个函数
        {
            function f1() {
                var n = 999;

                function f2() {
                    console.log('[闭包]---', n);
                }
                return f2;
            }
            // 上面代码中，函数 f2 就在函数 f1 内部，这时 f1 内部的所有局部变量，对 f2 都是可见的
            // 但是反过来就不行， f2 内部的局部变量，对 f1 就是不可见的
            // 这就是 JavaScript 语言特有的"链式作用域"结构，子对象会一级一级地向上寻找所有父对象的变量
            // 所以，父对象的所有变量，对子对象都是可见的，反之则不成立
            var result = f1();
            result(); // 999
            // 上面代码中，函数 f1 的返回值就是函数 f2 ，由于 f2 可以读取 f1 的内部变量，所以就可以在外部获得 f1 的内部变量
            // 闭包就是函数 f2 ，即能够读取其他函数内部变量的函数
            // 由于在 JavaScript 语言中，只有函数内部的子函数才能读取内部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"

            // 创建函数
            {
                // 会创建一个预先包含全局变量对象的作用域链，这个作用域链被保存在函数的 [[Scope]] 属性中
            }
            // 调用函数
            {
                // 会为函数创建一个执行环境，然后通过复制函数的 [[Scope]] 属性中的对象构建起执行环境的作用域链
                // 此后，使用 arguments 和其他命名参数的值来初始化函数的活动对象，并将该活动对象推入执行环境的作用域链的前端
                // 但在作用域链中，其外部函数的活动对象处于该函数的活动对象的后面（第二位）
            }
            // 作用域链：本质是一个指向变量对象的指针列表，它只引用但不实际包含变量对象（活动对象）
            {
                // f1 的执行环境下的作用域链
                // 作用域链 3
                {
                    // 全局对象
                }
                // 作用域链 2
                {
                    // f1 的活动对象
                }
                // 作用域链 1
                {
                    // f2 的活动对象
                }
            }
            // 可以将返回的闭包函数置为 null ，来解除对函数的引用，以便释放内存
            {
                // 随着闭包函数的作用域链被销毁，其他作用域（除了全局作用域）也可以安全地销毁了
            }
        }

        // 5.1.2 --- 问题
        {
            // 由于闭包闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存
            // 过度使用闭包可能会导致内存占用过多
        }

        // 5.1.3 --- 用处
        {
            // 闭包最大的特点：就是它可以"记住"诞生的环境，比如 f2 记住了它诞生的环境 f1 ，所以从 f2 可以得到 f1 的内部变量
            // 在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁
            // 闭包的用处 ---1--- 可以读取函数内部的变量
            // 闭包的用处 ---2--- 让函数内部的变量始终保持在内存中，即闭包可以使得它诞生环境一直存在
            {
                // 例子：闭包使得内部变量记住上一次调用时的运算结果
                function createIncrementor(start) {
                    return function () {
                        return start++;
                    }
                }
                var inc = createIncrementor(5);
                console.log('[闭包]---', inc()); // 5
                console.log('[闭包]---', inc()); // 6
                console.log('[闭包]---', inc()); // 7
                // 上面代码中， start 是函数 createIncrementor 的内部变量
                // 通过闭包， start 的状态被保留了，每一次调用都是在上一次调用的基础上进行计算
                // 从中可以看到，闭包 inc 使得函数 createIncrementor 的内部环境一直存在
                // 所以，闭包可以看作是函数内部作用域的一个的接口
                // 因为 inc 始终存在内存中，而 inc 的存在依赖于 createIncrementor ，因此也始终在内存中，不会在调用结束后，被垃圾回收机制回收
            }
            // 闭包的用处 ---3--- 封装对象的私有属性和私有方法
            {
                function Person(name) {
                    var age;

                    function setAge(n) {
                        age = n;
                    }

                    function getAge() {
                        return age;
                    }
                    return {
                        name: name,
                        getAge: getAge,
                        setAge: setAge
                    };
                }
                var person = Person('damon');
                person.setAge(25);
                console.log('[闭包]---封装对象的私有属性和私有方法 ', person.getAge()); // 25
                // 上面代码中，函数 Person 的内部变量 age ，通过闭包 getAge 和 setAge ，变成了返回对象 person 的私有变量
                // 注意：外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大
                // 因此，不能滥用闭包，否则会造成网页的性能问题
            }
        }

        // 5.1.4 --- 闭包与变量
        {
            // 闭包只能取得包含函数中任何变量的最后一个值
            // 闭包所保存的是整个变量对象，而不是某个特殊的变量
            function createFuncs() {
                let results = [];
                let i = 0;
                for (i = 0; i < 2; i++) {
                    results[i] = function () {
                        return i;
                    }
                }
                return results;
            }
            let funcs = createFuncs();
            // func ：函数数组，每个函数的作用域中都保存着 createFunc 的活动对象，所以它们引用的都是同一个变量 i
            console.log('[闭包与变量]---funcs', funcs[0]);
            for (let i = 0; i < funcs.length; i++) {
                console.log('[闭包与变量]---value', funcs[i]());
            }
            // 2
            // 2
        }
    }
    //5.2---立即调用的函数表达式(IIFE)
    {
        //在JavaScript中，圆括号()是一种运算符，跟在函数名之后，表示调用该函数
        //function关键字，既可以当作语句，也可以当作表达式
        //JavaScript引擎规定，如果function关键字出现在行首，一律解释成语句
        //语句
        function f_1() {}
        // function f_1() {}()---报错：函数定义不应该以圆括号结尾
        //表达式
        var f_2 = function f_2() {};
        (function () {
            console.log('[IIFE]---1')
        }()); //推荐写法
        (function () {
            console.log('[IIFE]---2')
        })();
        //上面两种写法都是以圆括号开头，引擎就会认为后面跟的是一个表达式，而不是定义语句，所以就避免了错误
        //这就叫做"立即调用的函数表达式"，简称IIFE
        //注意：上面两种写法最后的分号都是必须的；如果省略分号，遇到连着两个IIFE，可能就会报错
        //通常情况下，只对匿名函数使用这种"立即执行的函数表达式"
        //目的---1---不必为函数命名，避免了污染全局变量
        //目的---2---IIFE内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量
    }
}

//6---eval命令
{
    //6.1---基本用法
    {
        //eval命令接受一个字符串作为参数，并将这个字符串当作语句执行
        var return_value = eval('var a = 123;');
        console.log('[eval]---基本用法 ', a); //undefined
        console.log('[eval]---基本用法 return_value = ', return_value); //123
        //上面代码将字符串当作语句运行，生成了变量a
        //如果参数字符串无法当作语句运行，那么就会报错
        // eval('3x');
        //放在eval中的字符串，应该有独自存在的意义，不能用来与eval以外的命令配合使用
        // eval('return;');
        //return不能单独使用，必须在函数中使用
        //如果eval的参数不是字符串，那么会原样返回
        console.log('[eval]---参数不是字符串 ', eval(123));
        //eval没有自己的作用域，都在当前作用域内执行，因此可能会修改当前作用域的变量的值，造成安全问题
        var b = 1;
        eval('b = 2');
        console.log('[eval]--- b = ', b); //2
        //上面代码中，eval命令修改了外部变量b的值；由于这个原因，eval有安全风险
        //为了防止这种风险，JavaScript规定，如果使用严格模式，eval内部声明的变量，不会影响到外部作用域
        // (function () {
        //     'use strict';
        //     eval('var c = 3');
        //     console.log('[eval]--- typeof(c) = ', typeof (c)); //undefined
        //     //上面代码中，函数内部是严格模式，这时eval内部声明的c变量，就不会影响到外部
        //     //不过，即使在严格模式下，eval依然可以读写当前作用域的变量
        //     eval('b = 3');
        //     console.log('[eval]--- b = ', b); //3
        //     //上面代码，严格模式下，eval内部还是改写了外部变量，可见安全风险依然存在
        // }())
        //总之，eval的本质是在当前作用域之中，注入代码
        //由于安全风险和不利于JavaScript引擎优化执行速度，所以一般不推荐使用
        //通常情况下，eval最常见的场合是解析JOSN数据的字符串，不过正确的做法应该是使用原生的JSON.parse方法
    }
    //6.2---eval的别名调用
    {
        //下面这种情况，引擎在静态代码分析的阶段，根本无法分辨执行的是eval
        var m = eval;
        m('var z = 1;');
        console.log('[eval]---别名调用 z = ', z); //1
        //上面代码中，变量m是eval的别名；静态代码分析阶段，引擎分辨不出m('var z = 1;')执行的是eval命令
        //为了保证eval的别名不影响代码优化，JavaScript的标准规定，凡是使用别名执行eval，eval内部一律是全局作用域
        var xx = 11;
        //跟文档有出入！！！！！！
        function alias_eval() {
            var xx = 22;
            var e = eval;
            e('xx = 3');
            // e('console.log("[eval]---别名调用 y = ", y )');
            console.log("[eval]---别名调用 xx = ", xx);
        }
        alias_eval(); //22
        console.log("[eval]---别名调用 xx = ", xx); //11
        // 只要不是直接调用，都属于别名调用
    }
}

// 7 --- 私有变量 
{
    // 任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量
    // 特权方法：有权访问私有变量和私有函数的公有方法
    // 严格来说， JavaScript 中没有私有成员的概念，所有对象属性都是公有的
    // 但可以使用闭包来实现公有方法，而通过公有方法可以访问在包含作用域中定义的变量（函数的参数、局部变量、在函数内部定义的其他函数）
    // 7.1 --- 实现自定义类型的特权方法
    {
        // 7.1.1 --- 在构造函数中定义特权方法
        {
            function MyObject(name) {
                // 私有变量
                let privateVariable = 10;
                // 私有函数
                function privateFunction() {
                    return false;
                }
                // 特权方法
                this.publicMethod = function () {
                    privateVariable++;
                    return privateFunction();
                }
                this.setName = function () {
                    name = value;
                }
                this.getName = function () {
                    return name;
                }
                // 利用特权方法可以隐藏那些不应该被直接修改的数据
                // 私有变量 name 在每个实例中都不相同，因为每次调用构造函数都会重新创建这两个方法
            }
            let myObj1 = new MyObject('damon');
            let myObj2 = new MyObject('stefan');
            console.log('[在构造函数中定义特权方法]---myObj1', myObj1.getName()); // damon
            console.log('[在构造函数中定义特权方法]---myObj2', myObj2.getName()); // stefan
            // 缺点：必须使用构造函数模式来达到这个目的；构造函数模式的缺点是针对每个实例都会创建同样一组新方法
        }

        // 7.1.2 --- 使用原型模式定义特权方法
        {
            // 在私有作用域中定义私有变量和函数
            (function () {
                // 私有变量
                var name = '';
                var privateVariable = 10;
                // 私有函数
                function privateFunction() {
                    return false;
                }
                // 构造函数
                var OtherObject = function (value) {
                    name = value;
                };
                // 特权方法
                OtherObject.prototype.publicMethod = function () {
                    privateVariable++;
                    return privateFunction();
                };
                OtherObject.prototype.getName = function () {
                    return name;
                };
                OtherObject.prototype.setName = function (value) {
                    name = value;
                };
                var other1 = new OtherObject('damon');
                console.log('[使用原型模式定义特权方法]---other1 name', other1.getName()); // damon
                var other2 = new OtherObject('stefan');
                console.log('[使用原型模式定义特权方法]---other1 name', other1.getName()); // stefan
                console.log('[使用原型模式定义特权方法]---other2 name', other2.getName()); // stefan
                other1.setName('nicholas');
                console.log('[使用原型模式定义特权方法]---other1 name', other1.getName()); // nicholas
                console.log('[使用原型模式定义特权方法]---other2 name', other2.getName()); //nicholas
                // 这个模式与在构造函数中定义特权方法的区别：私有变量和函数是由实例共享的
                // name 是一个静态的、由所有实例共享的属性
            })();
        }
    }

    // 7.2 --- 实现单例的特权方法
    {
        // 单例：只有一个实例的对象
        // 按照惯例， JavaScript 是以对象字面量的方式来创建单例对象的
        var singleton = {
            name: 'name',
            method: function () {}
        }

        // 7.2.1 --- 模块模式
        {
            // 适合需要对单例进行某些初始化，同时又需要维护其私有变量
            var application = (function () {
                // 私有变量和函数
                var components = new Array();
                // 初始化
                components.push({
                    name: 'one'
                });
                // 公共
                return {
                    printComponents() {
                        console.log('[模块模式]---components', components);
                    },
                    getComponentsCount() {
                        return components.length;
                    },
                    registerComponent(component) {
                        if (typeof component === 'object') {
                            components.push(component);
                        }
                    }
                };
            })();
            application.printComponents(); // [ { name: 'one' } ]
            application.registerComponent({
                name: 'two'
            });
            application.printComponents(); // [ { name: 'one' }, { name: 'two' } ]
        }

        // 7.2.2 --- 增强的模块模式
        {
            // 在返回之前加入对其增强的代码
            // 适合那些单例必须是某种类型的实例，同时还必须添加某些和方法对其加以增强的情况
            function CustomType() {
                console.log('[增强的模块模式]');
            }
            var app = (function () {
                // 私有变量和函数
                var components = new Array();
                // 初始化
                components.push({
                    name: 'one'
                });
                // 创建对象
                var obj = new CustomType();
                // 添加特权属性和方法
                obj.printComponents = function () {
                    console.log('[增强的模块模式]---components', components);
                };
                obj.getComponentsCount = function () {
                    return components.length;
                };
                obj.registerComponent = function (component) {
                    if (typeof component === 'object') {
                        components.push(component);
                    }
                }
                // 返回这个对象
                return obj;
            })();
            app.printComponents(); // [ { name: 'one' } ]
            app.registerComponent({
                name: 'two'
            });
            app.printComponents(); // [ { name: 'one' }, { name: 'two' } ]
        }
    }
}
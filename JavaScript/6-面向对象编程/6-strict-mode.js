//---严格模式

//除了正常的运行模式，JavaScript还有第二种运行模式：严格模式
//顾名思义，这种模式采用更严格的JavaScript语法
//同样的代码，在正常模式和严格模式中，可能会有不一样的运行结果；一些在正常模式下可以运行的语句，在严格模式下将不能运行

//1---设计目的
{
    //早期的JavaScript语言有很多设计不合理的地方
    //但是为了兼容以前的代码，又不能改变老的语法，只能不断添加新的语法，引导程序员使用新语法
    ///严格模式是从ES5进入标准的，主要目的有以下几个：
    {
        //明确禁止一些不合理、不严谨的语法，减少JavaScript语言的一些怪异行为
        //增加更多报错的场合，消除代码运行的一些不安全之处，保证代码运行的安全
        //提高编译器效率，增加运行速度
        //为未来新版本的JavaScript语法做好铺垫
    }
    //总之，严格模式体现了JavaScript更合理、更安全、更严谨的发展方向
}

//2---启用方法
{
    //进入严格模式的标志，是一行字符串use strict
    //老版本的引擎会把它当作一行普通字符串，加以忽略
    //新版本的引擎就会进入严格模式
    //严格模式可用于整个脚本，也可以只用于单个函数
    //2.1---整个脚本
    {
        //use strict放在脚本文件的第一行，整个脚本都将以严格模式运行
        //如果这行语句不在第一行就无效，整个脚本会以正常模式运行
        //严格地说，只要前面不是产生实际运行结果的语句，use strict可以不在第一行，比如直接跟在一个空的分号后面，或者跟在注释后面
    }
    //2.2---单个函数
    {
        //use strict放在函数体的第一行，则整个函数以严格模式运行
        function strict() {
            'use strict';
            return '这是严格模式';
        }

        function strict_2() {
            'use strict';

            function f() {
                return '这也是严格模式'
            }
            return f();
        }

        function not_strict() {
            return '这是正常模式'
        }
    }
    //有时，需要把不同的脚本合并在一个文件里面
    //如果一个脚本是严格模式，另一个脚本不是，它们的合并就可能出错
    //严格模式的脚本在前，则合并后的脚本都是严格模式
    //正常模式的脚本在前，则合并后的脚本都是正常模式
    //这2种情况下，合并后的结果都是不正确的
    //这时可以考虑把整个脚本文件放在一个立即执行的匿名函数之中
    (function () {
        'use strict';
        // some code here
    }());
}

//3---显式报错
{
    //严格模式使得JavaScript的语法变得更严格，更多的操作会显式报错
    //其中有些操作，在正常模式下只会默默地失败，不会报错
    //3.1---只读属性不可写
    {
        //严格模式下，设置字符串的length属性，会报错
        (function () {
            'use strict';
            try {
                'abc'.length = 5;
            } catch (e) {
                console.log('[显示报错]---', e);
            }
        }());
        //TypeError: Cannot assign to read only property 'length' of string 'abc'
        //上面代码报错，因为length是只读属性，严格模式下不可写；正常模式下，改变length属性是无效的，但不会报错
        //严格模式下，对只读属性赋值，或者删除不可配置属性都会报错
        {
            //对只读属性赋值会报错
            {
                (function () {
                    'use strict';
                    var obj = {};
                    Object.defineProperty(obj, 'a', {
                        value: 37,
                        writable: false
                    });
                    try {
                        obj.a = 123;
                    } catch (e) {
                        console.log('[显示报错]---对只读属性赋值', e);
                    }
                }());
                //TypeError: Cannot assign to read only property 'a' of object '#<Object>'
            }
            //删除不可配置的属性
            {
                (function () {
                    'use strict';
                    var obj = Object.defineProperty({}, 'p', {
                        value: 1,
                        configurable: false
                    });
                    try {
                        delete obj.p;
                    } catch (e) {
                        console.log('[显示报错]---删除不可配置的属性', e);
                    }
                }());
                //TypeError: Cannot delete property 'p' of #<Object>
            }
        }
    }
    //3.2---只设置了取值器的属性不可写
    {
        //严格模式下，对一个只有取值器(getter)，没有存值器(setter)的属性赋值，会报错
        (function () {
            'use strict';
            var obj = {
                get v() {
                    return 1;
                }
            };
            try {
                obj.v = 2;
            } catch (e) {
                console.log('[显示报错]---只设置了取值器的属性不可写', e);
            }
        }());
        //TypeError: Cannot set property v of #<Object> which has only a getter
        //上面代码中，obj.v只有取值器，没有存值器，对它进行赋值就会报错
    }
    //3.3---禁止扩展的对象不可扩展
    {
        //严格模式下，对禁止扩展的对象，添加新属性，会报错
        (function () {
            'use strict';
            var obj = {};
            Object.preventExtensions(obj);
            try {
                obj.v = 2;
            } catch (e) {
                console.log('[显示报错]---禁止扩展的对象不可扩展', e);
            }
        }());
        //TypeError: Cannot add property v, object is not extensible
    }
    //3.4---eval、arguments不可用作标识名
    {
        //严格模式下，使用eval或者arguments作为标识名，将会报错
        // var eval = 17;
        // var arguments = 17;
        //Unexpected eval or arguments in strict mode
    }
    //3.5---函数不能有重名的参数
    {
        //正常模式下，如果函数有多个重名的参数，可以用arguments[i]读取
        //严格模式下，这属于语法错误
        // function f_2(a, a, b) {
        //     'use strict';
        //     return a + b;
        // }
        //SyntaxError: Duplicate parameter name not allowed in this context
    }
    //3.6---进制八进制的前缀0表示法
    {
        //正常模式下，整数的第一位如果是0，表示这是八进制数，比如0100等于十进制的64
        //严格模式进制这种表示法，整数第一位为0，将报错
        {
            // function f_3() {
            //     'use strict';
            //     var n = 0100;
            // }
            //SyntaxError: Octal literals are not allowed in strict mode.
        }
    }
}

//4---增强的安全措施
{
    //严格模式增强了安全保护，从语法上防止了一些不小心会出现的错误
    //4.1---全局变量显式声明
    {
        //正常模式中，如果一个变量没有声明就赋值，默认是全局变量
        //严格模式禁止这种用法，全局变量必须显式声明
        try {
            (function () {
                'use strict';
                v = 1;
            }())
        } catch (e) {
            console.log('[增强的安全措施]---全局变量显式声明', e);
        }
        //ReferenceError: v is not defined
        //因此，严格模式下，变量都必须先声明，然后再使用
    }
    //4.2---禁止this关键字指向全局对象
    {
        //正常模式下，函数内部的this可能会指向全局对象，严格模式禁止这种用法，避免无意间创造全局变量
        //正常模式
        (function () {
            console.log('[增强的安全措施]---禁止this关键字指向全局对象', this === undefined);
        }());
        //false
        (function () {
            'use strict';
            console.log('[增强的安全措施]---禁止this关键字指向全局对象', this === undefined);
        }());
        //true
        //上面代码中，严格模式的函数体内部this是undefined
        //这种限制对于构造函数尤其有用，有时忘了加new，这时this不再指向全局对象，而是报错
        (function () {
            'use strict';
            try {
                this.a = 1;
            } catch (e) {
                console.log('[增强的安全措施]---禁止this关键字指向全局对象', this);
                console.log('[增强的安全措施]---禁止this关键字指向全局对象', e);
            }
        }());
        //undefined
        //TypeError: Cannot set property 'a' of undefined
        //严格模式下，函数直接调用时(不使用new调用)，函数内部的this表示undefined(未定义)
        //因此可以用call、apply、bind方法，将任意值绑定在this上面
        //正常模式下，this指向全局对象，如果绑定的值是非对象，将自动转为对象再绑定上去
        //而null和undefined这2个无法转成对象的值，将被忽略
        function f_call() {
            console.log('[增强的安全措施]---禁止this关键字指向全局对象', this);
        }
        // f_call();
        //全局对象
        f_call.call(2);
        //[Number: 2]
        f_call.call(true);
        //[Boolean: true]
        // f_call.call(null);
        //全局对象
        // f_call.call(undefined);
        //全局对象
        function f_strict_call() {
            'use strict';
            console.log('[增强的安全措施]---禁止this关键字指向全局对象', this);
        }
        f_strict_call();
        //undefined
        f_strict_call.call(2);
        //2
        f_strict_call.call(true);
        //true
        f_strict_call.call(null);
        //null
        f_strict_call.call(undefined);
        //undefined
        //上面代码中，可以把任意类型的值，绑定在this上面
    }
    //4.3---禁止使用fn.callee、fn.caller
    {
        //函数内部不得使用fn.caller、fn.arguments，否则会报错
        //这意味着不能在函数内部得到调用栈了
    }
    //4.4---禁止使用arguments.callee、arguments.caller
    {
        //arguments.callee和arguments.caller是2个历史遗留的变量，从来没有标准化过，现在已经取消了
        //正常模式下调用它们没有什么作用，但是不会报错
        //严格模式明确规定，函数内部使用arguments.callee、arguments.caller将会报错
    }
    //4.5---禁止删除变量
    {
        //严格模式下无法删除变量，如果使用delete命令删除一个变量，会报错
        //只有对象的属性，且属性的描述对象的configurable属性设置为true，才能被delete命令删除
        var num = 2;
        console.log('[增强的安全措施]---禁止删除变量', num);
        //1
        delete num;
        console.log('[增强的安全措施]---禁止删除变量', num);
        //1
        // var strict_num = 3;
        // delete strict_num;
        //语法错误
    }
}

//5---静态绑定
{
    //JavaScript语言的一个特点，就是允许"动态绑定"
    //即某些属性和方法到底属于哪一个对象，不是在编译时确定的，而是在运行时确定的
    //严格模式对动态绑定做了一些限制：
    //某些情况下，只允许静态绑定；也就是说，属性和方法到底归属哪个对象，必须在编译阶段就确定
    //这样做有利于编译效率的提高，也使得代码更容易阅读，更少出现意外
    //5.1---禁止使用with语句
    {
        //严格模式下，使用with语句将报错
        //因为with语句无法在编译时就确定，某个属性到底归属哪个对象，从而影响了编译效果
    }
    //5.2---创设eval作用域
    {
        //正常模式下，JavaScript语言有2种变量作用域：全局作用域和函数作用域
        //严格模式创设了第3种作用域：eval作用域
        //正常模式下，eval语句的作用域，取决于它处于全局作用域，函数作用域
        //严格模式下，eval语句本身是一个作用域，不再能够在其所运行的作用域创设新的变量了
        //也就是说，eval所生成的变量只能用于eval内部
        (function () {
            'use strict';
            var x = 2;
            console.log('[静态绑定]---创设eval作用域', eval('var x = 5; x'));
            //5
            console.log('[静态绑定]---创设eval作用域', x);
            //2
        }());
        //上面代码中，由于eval语句内部是一个独立作用域，所以内部的变量x不会泄露到外部
        //注意：如果希望eval语句也使用严格模式，有2种方式
        {
            //方式一：
            function strict_eval(str) {
                'use strict';
                return eval(str);
            }
            try {
                strict_eval('undeclared_value = 1');
            } catch (e) {
                console.log('[静态绑定]---创设eval作用域', e);
            }
            //ReferenceError: undeclared_value is not defined
            //方式二：
            function strict_eval_2(str) {
                return eval(str);
            }
            try {
                strict_eval_2('"use strict"; undeclared_value = 1');
            } catch (e) {
                console.log('[静态绑定]---创设eval作用域', e);
            }
            //ReferenceError: undeclared_value is not defined
        }
    }
    //5.3---arguments不再追踪参数的变化
    {
        //变量arguments代表函数的参数
        //严格模式下，函数内部改变参数与arguments的联系被切断了，两者不再存在联动关系
        //严格模式下，arguments对象是一个只读对象，修改它是无效的，但不会报错
        (function (a) {
            a = 2;
            console.log('[静态绑定]---arguments不再追踪参数的变化', arguments[0]);
        }(10));
        //2
        (function (a) {
            'use strict';
            a = 2;
            console.log('[静态绑定]---arguments不再追踪参数的变化', arguments[0]);
        }(10));
        //10
    }
}

//6---向下一个版本的JavaScript过渡
{
    //6.1---非函数代码块不得声明函数
    {
        //ES6会引入块级作用域；为了与新版本接轨，ES5的严格模式只允许在全局作用域、函数作用域声明函数
        //也就是说，不允许在非函数的代码块内声明函数
        //注意：ES6允许在代码块之中声明函数
    }
    //6.2---保留字
    {
        //为了向将来JavaScript的新版本过渡，严格模式新增了一些保留字：
        //implements、interface、let、package、private、protected、public、static、yield等
        //使用这些词作为变量名将会报错
    }
}
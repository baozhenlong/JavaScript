//---错误处理机制

//1---Error实例对象
{
    //JavaScript解析或运行时，一旦发生错误，引擎就会抛出一个错误对象
    //JavaScript原生提供Error构造函数，所有抛出的错误都是这个构造函数的实例
    var err = new Error('出错了');
    console.log('[Error实例对象]---', err.message); //"出错了"
    //Error构造函数接受一个参数，表示错误提示，可以从实例的message属性读到这个参数
    //抛出Error实例对象以后，程序就中断在发生错误的地方，不再往下执行
    //Error实例的属性
    //message：错误提示信息
    //name：错误名称(非标准属性)
    //stack：错误的堆栈(非标准属性)
}

//2---原生错误类型
{
    //Error实例对象是最一般的错误类型，在它的基础上，JavaScript还定义了其他6种错误对象；即存在Error的6个派生对象
}
//2.1---SyntaxError对象
{
    //SyntaxError对象：是解析代码时发生的语法错误
    //变量名错误
    // var 1a;
    //缺少括号
    // console.log 'hi');
    //上面代码的错误，都是在语法解析阶段就可以发现，所以会抛出SyntaxError
}
//2.2---ReferenceError对象
{
    //ReferenceError对象：是引用一个不存在的变量时，发生的错误
    //使用一个不存在的变量
    {
        // a; //a is not defined
    }
    //将一个值分配给无法分配的的对象，比如对函数的运行结果或者this赋值
    {
        //等号左侧不是变量
        // console.log() = 1; //Invalid left-hand side in assignment
        //this对象不能手动赋值
        // this = 1; //Invalid left-hand side in assignment
    }
}
//2.3---RangeError对象
{
    //RangeError对象：是一个值超出有效范围时发生的错误
    //主要有几种情况：
    //数组长度为负数
    // new Array(-1); //Invalid array length
    //Number对象的方法参数超出范围
    //函数堆栈超过最大值
}
//2.4---TypeError对象
{
    //TypeError对象：是变量或参数不是预期类型时发生的错误
    //比如字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误；因为new命令的参数应该是一个构造函数
    // new 1; //1 is not a constructor
    // var obj = {};
    // obj.func(); //obj.func is not a function
    //因为obj.func的值是undefined，而不是一个函数
}
//2.5---URIError对象
{
    //URIError对象：是URI相关函数的参数不正确时抛出的错误
    //主要涉及：
    //encodeURI();
    //decodeURI();
    //encodeURIComponent();
    //decodeURIComponent();
    //escape();
    //unescape();
}
//2.6---EvalError对象
{
    //EvalError对象：是eval函数没有被正确执行时抛出的错误
    //该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留
}
//2.7---总结
{
    //以上6种派生错误，连同原始的Error对象，都是构造函数；这些构造函数都接受一个参数，代表错误信息
    //开发者可以使用它们，手动生成错误对象实例
    var err_1 = new Error('出错了');
    var err_2 = new RangeError('出错了，变量超出有效范围');
    var err_3 = new TypeError('出错了，变量类型无效');
    console.log('[总结]---', err_1.message); //出错了
    console.log('[总结]---', err_2.message); //出错了，变量超出有效范围
    console.log('[总结]---', err_3.message); //出错了，变量类型无效
}

//3---自定义错误
{
    //除了JavaScript原生提供的7种错误对象，还可以定义自己的错误对象
    function User_Error(message) {
        this.message = message || '默认信息';
        this.name = 'User_Error';
    }
    User_Error.prototype = new Error();
    User_Error.prototype.constructor = User_Error;
    //上面代码定义了一个错误对象User_Error，让它继承Error对象
    var err = new User_Error('这是一个自定错误');
    console.log('[总结]---', err.message); //这是一个自定错误
}

//4---throw语句
{
    //作用：手动中断程序执行，抛出一个错误
    var x = -1;
    if (x <= 0) {
        // throw new Error('x 必须为整数');
    }
    //throw抛出的错误就是它的参数，这里是一个Error实例
    //throw可以抛出任何类型的值
    //抛出一个字符串
    // throw 'Error';
    //抛出一个数值
    // throw 42;
    //抛出一个布尔值
    // throw true;
    //抛出一个对象
    // throw {
    //     toString: function () {
    //         return 'Error';
    //     }
    // }
    //对于JavaScript引擎来说，遇到throw语句，程序就中止了
    //引擎会接收到throw抛出的信息，可能是一个错误实例，也可能是其他类型的值
}

//5---try...catch结构
{
    //一旦发生错误，程序就中止执行了
    //JavaScript提供了try...catch结构，允许对错误进行处理，选择是否往下执行
    try {
        throw new Error('出错了');
    } catch (e) {
        console.log('[try...catch]---', e.name, ': ', e.message);
        // console.log('[try...catch]---', e.stack);
    }
    //上面代码中，错误被catch代码块捕获了；catch接受一个参数，表示try代码块抛出的值
    //如果不确定某些代码是否会报错，就可以把它们放在try...catch代码块之中，便于进一步对错误进行处理
    try {
        f();
    } catch (e) {
        console.log('[try...catch]---f() error');
    }
    console.log('[try...catch]---继续执行');
    //catch代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去
    //嵌套try...catch
    {
        var n = 100;
        try {
            throw n;
        } catch (e) {
            if (e > 50) {
                try {
                    throw e;
                } catch (err) {
                    console.log('[try...catch]---嵌套', err); //100
                }
            }
        }
    }
    //为了捕捉不同类型的错误，catch代码块之中可以加入判断语句
    try {
        foo.bar();
    } catch (e) {
        if (e instanceof EvalError) {
            console.log('[try...catch]---EvalError', e.name, ': ', e.message);
        } else if (e instanceof ReferenceError) {
            console.log('[try...catch]---ReferenceError', e.name, ': ', e.message);
        } else if (e instanceof RangeError) {
            console.log('[try...catch]---RangeError', e.name, ': ', e.message);
        } else {
            console.log('[try...catch]---其他', e.name, ': ', e.message);
        }
    }
    //ReferenceError :  foo is not defined
}

//6---finally代码块
{
    //try...catch结构允许在最后添加一个finally代码块，表示不管是否出现错误，都必须在最后运行的语句
    //出错执行
    {
        function clean_up() {
            try {
                throw new Error('出错了......');
                console.log('[finally代码块]---clean_up 此行不会执行');
            } finally {
                console.log('[finally代码块]---clean_up 完成清理工作');
            }
        }
        // clean_up();
        //[finally代码块]----clean_up 完成清理工作
        //Error: 出错了......
        //上面代码中，由于没有catch语句块，一旦发生错误，代码就会中断执行
        //中断执行之前，会先执行finally代码块，然后再向用户提示报错信息
    }
    //正常执行
    {
        var cnt = 0;

        function count_up() {
            try {
                console.log('[finally代码块]---count_up');
                return cnt;
            } finally {
                cnt++;
                console.log('[finally代码块]---count_up finally');
            }
        }
        var count_up_value = count_up();
        console.log('[finally代码块]---count_up_value =', count_up_value);
        console.log('[finally代码块]---cnt =', cnt);
        //[finally代码块]---count_up
        //[finally代码块]---count_up finally
        //[finally代码块]---count_up_value = 0
        //[finally代码块]---cnt = 1
        //上面代码中，try代码块没有发生错误，而且里面还包括return语句，但是finally代码块依然会执行
        //try代码块里的return语句的执行是排在finally代码之前，只是等finally代码执行完毕后才返回
    }
    //典型场景
    {
        function open_file() {}

        function write_file(data) {}

        function file_error_handler() {}

        function close_file() {}
        open_file();
        try {
            write_file(1);
        } catch (e) {
            file_error_handler();
        } finally {
            close_file();
        }
        //上面代码首先打开一个文件，然后在try代码块中写入文件
        //如果没有发生错误，则运行finally代码块关闭文件
        //一旦发生错误，则先使用catch代码块处理错误，再使用finally代码块关闭文件
    }
    //try..catch...finally这3者之间的执行顺序
    {
        var test_cnt = 0;

        function test() {
            try {
                console.log('[finally代码块]---执行顺序', 0);
                throw 'bug';
            } catch (e) {
                console.log('[finally代码块]---执行顺序', 1);
                test_cnt = 11;
                return test_cnt; //这句原本会延迟到finally代码块结束再执行；但finally代码块中有return，直接结束执行
                console.log('[finally代码块]---执行顺序', 2); //不会执行
            } finally {
                console.log('[finally代码块]---执行顺序', 3);
                test_cnt = 22;
                return test_cnt; //直接返回，不会回去catch中执行return
                console.log('[finally代码块]---执行顺序', 4); //不会执行
            }
            console.log('[finally代码块]---执行顺序', 5); //不会执行
        }
        var test_result = test();
        console.log('[finally代码块]---test_result =', test_result);
        //[finally代码块]---执行顺序 0
        //[finally代码块]---执行顺序 1
        //[finally代码块]---执行顺序 3
        //[finally代码块]---result = 22
        //上面代码中，catch代码块结束执行之前，会先执行finally代码块
        //catch代码块之中，触发转入finally代码块的标志，不仅有return语句，还有throw语句
        function test_2() {
            try {
                throw '出错了';
            } catch (e) {
                console.log('[finally代码块]---捕捉到内部错误');
                throw e;
            } finally {
                return false;
            }
        }
        try {
            var test_2_result = test_2();
        } catch (e) {
            console.log('[finally代码块]---test_2 此处不会执行');
        }
        console.log('[finally代码块]---test_2_result =', test_2_result);
        //[finally代码块]---捕捉到内部错误
        //[finally代码块]---test_2_result = false
        //上面代码中，进入catch代码块之后，一遇到throw语句，就会去执行finally代码块
        //其中有return false语句，因此就直接返回了，不再会回去执行catch代码块剩下的部分了
        try {
            try {
                xxxxxxx; //报错
            } finally {
                console.log('[finally代码块]---finally');
            }
            console.log('[finally代码块]---wil I run?');
        } catch (e) {
            console.log('[finally代码块]---e.message =', e.message);
        }
        //[finally代码块]---finally
        //[finally代码块]---e.message = xxxxxxx is not defined
        //上面代码中，try里面还有一个try
        //内层的try报错，这时会执行内层的finally代码块，然后抛出错误，被外层的catch捕获
    }
}
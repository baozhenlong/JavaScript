//---编程风格

//1---概述
{
    //编程风格：指的是编写代码的样式规则
}

//2---缩进
{
    //行首的空格和Tab键，都可以产生代码索引效果
}

//3---区块
{
    //如果循环和判断的代码体只有一行，JavaScript允许区块省略大括号
    if (true)
        console.log('[{}]---1');
    console.log('[{}]---2');
    //[区块]---1
    //[区块]---2
    //建议：总是使用大括号
    //建议：区块起首的大括号跟在关键字的后面，不要另起一行；因为JavaScript会自动添加句末的分号
    function get_value() {
        return {
            key: 'value'
        };
    }
    console.log('[{}]---', get_value()); //{ key: 'value' }
    //下面这种写法，会返回undefined；因为JavaScript自动在return语句后面添加了分号
    // return 
    // {
    //     key: 'value'
    // };
}

//4---圆括号
{
    //()在JavaScript中有2种作用：
    //作用---1---表示函数的调用
    console.log('[()]---函数的调用');
    //作用---2---表示表达式的组合
    (1 + 2) * 3;
    //建议：可以用空格，区分这2种不同的括号
    //区分---1---表示函数调用时，函数名与左括号之间没有空格
    console.log('[()]---区分，表示函数调用');
    //区分---2---表示函数定义时，函数名于左括号之间没有空格
    function foo() {}
    //区分---3---其他情况时，前面位置的语法元素与左括号之间，都有一个空格
    if (true) {}
}

//5---行尾的分号
{
    //分号表示一条语句的结束
    //JavaScript允许省略行尾的分号
}
//5.1---不使用分号的情况
{
    //以下3种情况，语法规定本来就不需要在结尾添加分号
    {
        //情况---1---for和while循环
        {
            //没有分号
            for (var i = 0; i < 2; i++) {}
            var a = 0;
            //没有分号
            while (a < 2) {
                a++;
            }
            //注意：do...while循环是有分号的
            //分号不能省略
            do {
                a--;
            } while (a > 0);
        }
        //情况---2---分支语句：if、switch、try
        {
            //没有分号            
            if (true) {}
            //没有分号
            switch (1) {}
            //没有分号
            try {} catch (e) {}
        }
        //情况---3---函数的声明语句
        {
            //没有分号
            function bar() {}
            //函数表达式仍然要使用分号
            var f = function () {};
        }
        //以上3种情况，如果使用了分号，并不会出错；因为，解释引擎会把这个分号解释为空语句
    }
}
//5.2---分号的自动添加
{
    //除了上述的3种情况，所有语句都应该使用分号；如果没有使用分号，大多数情况下，JavaScript会自动添加
    var a = 1
    //等同于
    var a = 1;
    //这种语法特性被称为“分号的自动添加”
    //如果下一行的开始可以与本行的结尾连在一起解释，JavaScript就不会自动添加分号
    {
        'abc'
        .length;
        //等同于
        'abc'.length;
        var get_value = function (a, b) {
            return a +
                b;
            //等同于
            // return a+ b;
        };
        get_value(1,
            3);
        //等同于
        get_value(1, 3);
        2 * 3 +
            4;
        //等同于
        2 * 3 + 4;
        //上面代码都会多行放在一起解释，不会每一行自动添加分号
    }
    //只有下一行的开始与本行的结尾，无法放在一起解释，JavaScript引擎才会自动添加分号
    {
        var a = -1;
        if (a < 0) a = 0
        console.log('[;]---a =', a); //0
        a = -1;
        //等同于
        //因为 0console 没有意义
        if (a < 0) a = 0;
        console.log('[;]---a =', a); //0
        //另外，如果一行的起首是自增(++)或自增(--)运算符，则它们的前面会自动添加分号
        var a = 1,
            b = 1,
            c = 1;
        a
        ++
        b
        --
        c
        console.log('[:]---', a, b, c); //1 2 0
        //等同于
        a = b = c = 1;
        a; //1
        ++b; //2
        --c; //0
    }
    //如果continue、break、return、throw这4个语句后面，直接跟换行符，则会自动添加分号
    //这意味着，如果return语句返回的是一个对象的字面量，起首的大括号一定要写在同一行，否则得不到预期的结果
    var f = function () {
        // return 
        // {
        //     value: 1
        // };
        //等同于
        // return;
        // {
        //     value: 1
        // };
        //返回undefined
        return {
            value: 1
        };
        //返回对象的字面量
    }
    //不省略行尾分号的原因
    //原因---1---解释引擎自动添加分号的行为难以预测
    //原因---2---有些JavaScript代码压缩器不会自动添加分号
    //因此遇到没有分号的结尾，就会让代码保持原状，而不是压缩成一行，使得压缩无法得到最优的结果
    //原因---3---避免脚本合并出错；所以，有的代码库在第一行语句开始前，会加上一个分号
    //;var a = 1;//这种写法就可以避免与其他脚本合并时，排在前面的脚本最后一行语句没有分号，导致运行出错的问题
}

//6---全局变量
{
    //JavaScript最大的语法缺点，可能就是全局变量对于任何一个代码块，都是可读可写
    //这对代码的模块化和重复利用，非常不利
    //因此，建议避免使用全局变量
    //如果不得不使用，可以考虑用大写字母表示变量名，这样更容易看出这是全局变量，比如UPPER_CASE
}

//7---变量的声明
{
    //JavaScript会自动将变量声明"提升"到代码块的头部
    // if (x === undefined) {
    //     var x = 'x';
    // }
    //等同于
    var x;
    if (x === undefined) {
        x = 'x';
    }
    console.log('[变量声明]---x = ', x); //x
    //这意味着，变量x是if代码块之前就存在了
    //为了避免可能出现的问题，最好把变量声明都放在代码块的头部
    //所有函数都应该在使用之前定义；函数内部的变量声明，都应该放在函数的头部
}

//8---with语句
{
    // //可以减少代码的书写，但是会造成混淆
    // with(o) {
    //     foo = bar;
    // }
    // //上面的代码，可以有四种运行结果
    // o.foo = bar;
    // o.foo = o.bar;
    // foo = bar;
    // foo = o.bar;
    // //这四种结果都可能发生，取决于不同的变量是否有定义
    // //因此，不要使用with语句
}

//9---相等和严格相等
{
    //JavaScript有2个表示相等的运算符：==(相等)和===(严格相等)
    //相等运算符会自动转换变量类型，造成很多意想不到的情况
    console.log('[相等和严格相等]---', 0 == ''); //true
    console.log('[相等和严格相等]---', 1 == true); //true
    console.log('[相等和严格相等]---', 0 == false); //true
    //因此，建议不要使用相等运算符==，只使用严格相等运算符===
}

//10---语句的合并
{
    var a = 1;
    var b = 2;
    a = b;
    if (a) {}
    //等同于
    if (a = b) {}
    //建议不要将不同目的的语句，合并成一行
}

//11---自增和自减运算符
{
    //++和--运算符，放在变量的前面或后面，返回值不一样
    ++a;
    //等同于
    a += 1;
    //建议++和--运算符尽量使用+=和-=代替
}

//12--switch...case语句
{
    //switch...case结构要求，在每一个case的最后一行必须是break语句，否则会接着运行下一个case
    //这样不仅容易忘记，还会造成代码的冗长
    function do_action(action) {
        switch (action) {
            case 'walk':
                return 'walk';
            case 'jump':
                return 'jump';
            case 'run':
                return 'run';
            default:
                return 'invalid_action';
        }
    }
    //上面的代码建议改写成对象的结构
    function do_better_action(action) {
        var actions = {
            'walk': function () {
                return 'walk';
            },
            'jump': function () {
                return 'jump';
            },
            'run': function () {
                return 'run;'
            }
        };
        if (typeof actions[aciton] !== 'function') {
            return 'invalid_action';
        }
        return actions[action];
    }
    //因此建议switch...case结构可以用对象结构代替
}
// --- 基本语法

// 1 --- 语句
{
    // JavaScript程序的执行单位为行，也就是一行一行地执行；一般情况下，每一行就是一个语句
    // 语句：是为了完成某种任务而进行的操作，比如下面就是一行赋值语句
    var a = 1 + 3;
    // 这条语句先用 var 命令，声明了变量 a ，然后就将 1+3 的运算结果赋值给变量 a
    // 表达式：指一个为了得到返回值的计算式；如 1+3
    // 语句和表达式的区别在于：
    {
        // 语句：主要为了进行某种操作，一般情况下不需要返回值
        // 表达式：是为了得到返回值，一定会返回一个值
    }
    // 凡是 JavaScript 语言中预期为值的地方，都可以使用表达式；比如赋值语句的等号右边，预期是一个值，因此可以放置各种表达式
    // 语句以分号( ; )结尾，一个分号就表示一个语句结束；多个语句可以写在一行内
    // var b = 1 + 3; var c = "c";
    // 分号前面可以没有任何内容， JavaScript 引擎将其视为空语句
    ;;; // 3 个空语句
    // 表达式不需要分号结尾
    // 一旦在表达式后面添加分号，则 JavaScript 引擎就将表达式视为语句，这样会产生一些没有任何意义的语句
    1 + 3;
    "abc";
    // 上面两行语句只是单纯地产生一个值，并没有任何实际的意义
}

// 2 --- 变量
{
    // 2.1 --- 概念
    {
        // 变量是对"值"的具名引用，是一个用于保存值得占位符
        // 变量就是为"值"起名，然后引用这个名字，就等同于引用这个值
        // 变量的名字就是变量名
        var a = 1;
        //上面的代码先声明变量 a ，然后在变量 a 与数值 1 之间建立引用关系，称为将数值 1 赋值给变量 a
        // 以后引用变量名 a 就会得到数值 1
        // 最前面的 var ，是变量声明命令，它表示通知解释引擎，要创建一个变量 a
        // 变量的声明和赋值，是分开的 2 个步骤，上面的代码将它们合在了一起，实际的步骤是：
        var a;
        a = 1;
        // 如果只是声明变量而没有赋值，则该变量的值是 undefined ； undefined 是一个特殊的值，表示无定义
        var b;
        console.log("b = ", b); // undefined
        // 可以在同一条 var 命令中声明多个变量
        var c, d;
        // JavaScript 是一种动态类型语言，也就是说，变量的类型没有限制，变量可以随时更改类型
        var e = 1;
        e = "hello";
        // 如果使用 var 重新声明一个已经存在的变量，是无效的
        var e;
        console.log("e = ", e); // hello
        // 但是，如果第二次声明的时候还进行了赋值，则会覆盖掉前面的值
        var e = "hi";
        console.log("e = ", e); // hi
        // 等同于
        // e = "hi";
    }
    // 2.2 --- 变量提升
    {
        // JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行
        // 这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升
        console.log("f = ", f); // undefined
        var f = "f";
        // 真正运行的代码：
        // var f;
        // console.log("f = ", f);
        // f = "f";
        //输出 undefined ，表示变量 f 已声明，但还未赋值
    }
    // 2.3 --- 基本类型值
    {
        // 简单的数据段
        // 基本数据类型，可以操作保存在变量中的实际值
        // undefined 、 null 、 boolean 、 number 、 string
        // 按值访问
        // 保存在栈的内存中，在内存中占据固定大小的空间
    }
    // 2.4 --- 引用类型值
    {
        // 保存在内存中的对象， JavaScript 不允许直接访问内存中的位置，即不能直接操作对象的内存空间
        // 按引用访问
        // 保存在堆内存中，数据长度是变化的，同时栈内存中有一个指针指向这个对象
        // 包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针
    }
    // 2.5 --- 复制变量值
    {
        // 2.5.1 --- 复制基本类型值
        {
            // 创建一个值的副本，两个值互不影响
            var num1 = 1;
            var num2 = num1; // num2 中的 1 和 num1 中的 1 是完全独立的，该值只是 num1 中的 1 的一个副本
        }
        // 2.5.2 --- 复制引用类型值
        {
            // 创建一个指针，这个指针指向存储在堆内存中的一个对象
            var obj1 = {};
            var obj2 = obj1;
            obj1.name = 'damon';
            console.log('[复制变量值]---引用类型', obj2.name); // damon
        }
    }
    // 2.6 --- 传递参数
    {
        // ECMAScript 中所有函数的参数都是按值传递的
        // 2.6.1 --- 向参数传递基本类型值
        {
            // 将值的副本复制给一个局部变量（即命名参数， 作为 arguments 对象中的一个元素）
            function addTen(num) {
                num += 10;
                return num;
            }
            var num = 1;
            addTen(num);
            console.log('[传递参数]---基本类型', num); // 1
        }
        // 2.6.2 --- 向参数传递引用类型值
        {
            // 将值在内存中的地址复制给一个局部变量，这个局部变量的变化会反映在函数的外部
            function setName(obj, rewrite = false) {
                // 实际按值传递给形参
                obj.name = 'damon';
                if (rewrite) {
                    obj = {};
                    // 重写 obj （与外部实参无关），此时该变量引用的是一个局部对象，这个对象在函数执行完毕后立即销毁
                    obj.name = 'stefan';
                }
            }
            var person1 = {};
            setName(person1);
            console.log('[传递参数]---引用类型', person1.name); // damon
            var person2 = {};
            setName(person2, true);
            console.log('[传递参数]---引用类型', person2.name); // damon
        }
    }
}

// 3 --- 标识符
{
    // 用来识别各种值的合法名称
    // 最常见的标识符就是变量名、函数名、函数参数、属性
    // JavaScript语言的标识符对大小写敏感，所以 a 和 A 是两个不同的标识符
    // 标识符命名规则：
    {
        // 第一个字符，可以是任意的 Unicode 字母（英文字母和其他语言的字母），以及美元符号( $ )和下划线( _ )
        // 第二个字符及后面的字符，除了 Unicode 字母、美元符号、下划线，还可以用数字 0-9
        // JavaScript 有一些关键字和保留字（用于表示控制语句的开始或结束，或用于执行特定操作），不能用作标识符
    }
}

// 4 --- 注释
{
    // 源码中被 JavaScript 引擎忽略的部分就叫做注释，它的作用是对代码进行解释
    // JavaScript 提供 2 中注释的写法
    // 注释 1 ：单行注释，用 // 起头
    // 单行注释
    // 注释 2 ：多行注释，放在 /* 和 */ 之间
    /*
        多行注释
    */
}

//5---区块
{
    //JavaScript使用大括号，将多个相关的语句组合在一起，称为"区块"(block)
    //对于var命令来说，JavaScript的区块不够成单独的作用域(scope)
    {
        var g = "g";
    }
    console.log("g = ", g); //g
    //上面代码在区块内部，使用var命令声明并赋值了变量g，然后在区块外部，变量g仍然有效
    //区块对于var命令不构成单独的作用域，与不使用区块的情况没有任何区别
}

// 6 --- 条件语句
{
    // JavaScript 提供 if 结构和 switch 结构，完成条件判断，即只有满足预设的条件，才会执行相应的语句
    // 6.1 --- if 结构
    {
        // if 结构先判断一个表达式的布尔值，然后根据布尔值的真伪，执行不同的语句
        // 布尔值，指的的是 JavaScript 的两个特殊值， true 表示真， false 表示伪
        // if(表达式){
        //     //求值结果为true时执行
        // }
        // 表达式放在圆括号中，表示对表达式求值
    }
    // 6.2 --- if...else 结构
    {
        // if 代码块后面，还可以跟一个 else 代码块，表示不满足条件时，所要执行的代码
        var m = 1;
        var n = 2;
        if (m !== 1)
            if (n === 2)
                console.log("hi");
            else console.log("hello");
        // else 代码块总是与离自己最近的那个 if 语句配对
        // 上面代码不会有任何输出， else 代码块不会得到执行，因为它跟着的是最近的那个 if 语句，相当于：
        if (m !== 1) {
            if (n === 2) {
                console.log("hi");
            } else {
                console.log("hello");
            }
        }
    }
    // 6.3 --- switch结构
    {
        // 多个 if...else 连在一起使用的时候，可以转为使用更方便的 switch 结构
        let num = 1;
        switch (num) {
            case 1:
                console.log("num 等于 1");
                break;
            case 2:
                console.log("num 等于 1");
                break;
            default:
                console.log("num 等于 其他值");
        }
        // 输出：num 等于 1
        // 根据 num 的值，选择执行相应的 case ，如果所有的 case 都不符合，则执行最后的 default 部分
        // 注意：如果没有 break 语句，则会接下去执行下一个 case 代码块，而不是跳出 switch 结构
        // switch 语句部分和 case 语句部分，都可以使用表达式
        // 注意： switch 语句后面的表达式，与 case 后面的表达式比较运行结果时，采用的是严格相等运算符( === )
        // 而不是相等运算符( == )，这意味着比较时不会发生类型转换
        switch (num) {
            case "1":
                console.log("==");
                break;
            case true:
                console.log("类型转换");
                break;
            default:
                console.log("default");
        }
        // 输出： default
    }
    // 6.4 --- 三元运算符
    {
        // ?:
        // JavaScript 还有一个三元运算符(即该运算符需要 3 个运算子)，也可以用于逻辑判断
        // (条件) ? 表达式 1 :表达式 2
        // 上面代码中，如果条件求值为 true ，则返回表达式 1 的值，否则返回表达式 2 的值
        var even = (4 % 2 === 0) ? true : false;
        // 等价于
        var even_2;
        if (4 % 2 === 0) {
            even_2 = true;
        } else {
            even_2 = false;
        }
        // 这个三元运算符可以被视为 if...else 的简写形式
    }
}

// 7 --- 循环语句
{
    // 用于重复执行某个操作
    // 7.1 --- while 循环
    {
        // while 语句包括一个循环条件和一段代码块，只要条件为真，就不断循环执行代码块
        // while (条件)
        //     语句;
        // while 语句的循环条件是一个表达式，必须放在圆括号中；代码块部分，如果只有一条语句，可以省略大括号，否则就必须加上大括号
        var i = 0;
        while (i < 2) {
            console.log("当前 i = ", i);
            i = i + 1;
        }
        // 当前 i =  0
        // 当前 i =  1
    }
    // 7.2 --- for 循环
    {
        // for 语句是循环命令的另一种形式，可以指定循环的起点、终点、和终止条件
        // for(初始化表达式; 条件; 递增表达式)
        //     语句;
        // 初始化表达式：确定循环变量的初始值，只在循环开始时执行一次
        // 条件表达式：每轮循环开始时，都要执行这个条件表达式，只有值为真，才继续进行循环
        // 递增表达式：每轮循环的最后一个操作，通常用来递增循环变量
        var x = 2;
        for (var i = 0; i < x; i++) {
            console.log("i = ", i);
        }
        // i =  0
        // i =  1
        // 所有for循环都可以改写成while循环
        // 等价的 while 循环
        var x = 2;
        var i = 0;
        while (i < x) {
            console.log("i = ", i);
            i++;
        }
        // i =  0
        // i =  1
        // for语句的三个部分，可以省略任何一个，当全部省略时，就导致了一个无限循环
    }
    // 7.3 --- do...while循环
    {
        //与 while 循环类似，唯一的区别就是先运行一次循环体，然后判断循环条件
        // do
        //     语句;
        // while(条件);
        // 不管条件是否为真， do...while 循环至少运行一次，这是这种结构最大的特点
        // 另外，while语句后面的分号注意不要省略
        var x = 2;
        var i = 0;
        do {
            console.log("i = ", i);
            i++;
        } while (i < 2);
        // i =  0
        // i =  1
    }
    // 7.4 --- break 语句和 continue 语句
    {
        // 都具有跳转作用，可以让代码不按既有的顺序执行
        {
            //break语句作用于跳出代码块或循环
            var i = 0;
            while (i < 5) {
                console.log("i = ", i);
                i++;
                if (i == 2)
                    break;
            }
            // i =  0
            // i =  1
            //上面代码只会执行 2 次，一旦 i 等于2，就会跳出循环
            for (var i = 0; i < 5; i++) {
                console.log("i = ", i);
                if (i == 1)
                    break;
            }
            // i =  0
            // i =  1
        } {
            //continue语句作用于立即终止本轮循环，返回循环结构的头部，开始下一轮循环
            var i = 0;
            while (i < 3) {
                i++;
                if (i % 2 === 0)
                    continue;
                console.log("i = ", i);
            }
            // i =  1
            // i =  3
            // 上面代码只有在i为奇数时，才会输出i的值；如果i为偶数，则直接进入下一轮循环
        }
        // 如果存在多重循环，不带参数的break语句和continue语句都只针对最内层循环
    }
    //7.5---标签
    {
        //JavaScript语言允许，语句的前面有标签，相当于定位符，用于跳转到程序的任意位置
        // label:
        //     语句;
        //标签可以是任意的标识符，但不能是保留字，语句部分可以是任意语句
        //标签通常与break和continue语句配合使用，跳出特定的循环
        {
            top: for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (i === 1 && j === 1)
                        break top;
                    console.log("i = ", i, ", j = ", j);
                }
            }
            // i =  0 , j =  0
            // i =  0 , j =  1
            // i =  0 , j =  2
            // i =  1 , j =  0
            //上面代码为一个双重循环区域，break命令后面加上了top标签(注意，top不用加引号)；满足条件时，直接跳出双层循环
            //如果break语句后面不使用标签，则只能跳出内层循环，进入下一次的外层循环
            //标签也可以用于跳出代码块：
            foo: {
                console.log(1);
                break foo;
                console.log("2"); //本行不会输出
            }
            //1
        } {
            //continue语句也可以与标签配合使用
            top_2: for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (i === 1 && j === 1)
                        continue top_2;
                    console.log("i = ", i, ", j = ", j);
                }
            }
            // i =  0 , j =  0
            // i =  0 , j =  1
            // i =  0 , j =  2
            // i =  1 , j =  0
            // i =  2 , j =  0
            // i =  2 , j =  1
            // i =  2 , j =  2
            //上面代码中，continue命令后面有一个标签名，满足条件时，会跳过当前循环，直接进入下一轮外层循环
            //如果continue后面不使用标签，则只能进入下一轮的内层循环
        }
    }
}

// 8 --- 执行环境（也称为作用域）
{
    // 8.1 --- 执行环境简介
    {
        // 定义了变量或函数有权访问其他的其他数据
        // 每一个执行环境都一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中
        // 全局执行环境：最外围的一个执行环境
        // 每个函数都有自己的执行环境
        // 当执行流进入一个函数时，函数的环境就会被推入一个环境栈中，在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境
    }
    // 8.2 --- 作用域链
    {
        // 用于搜索变量和函数，每次进入一个新的执行环境时创建
        // 当代码在一个环境中执行时，会创建变量对象的一个作用域链
        {
            // 变量对象 1 - 变量对象 2 ...
            // 本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象
        }
        // 作用域的用途：保证对执行环境有权访问的所有的变量和函数的有序访问
        // 作用域链的前端：始终是当前执行的代码所在环境的变量对象；如果这个对象是函数，则将其活动对象作为变量对象（活动对象在最开始时，只包含一个变量 arguments 对象，在全局环境中是不存在的）
        // 作用域链的下一个变量对象来自包含（外部）环境，再下一个变量对象来自下一个外部环境，一直延续到全局执行环境
        // 全局执行环境的变量始终始终都是作用域链中的最后一个对象
        // 内部环境可以通过作用域访问所有的外部环境，但外部环境不能访问内部环境中的任何变量和函数
        // 每个环境可以向上（外部）搜索作用域链，以查询变量和函数名
        // 例子
        {
            var color = 'blue';

            function changeColor() {
                var anotherColor = 'red';

                function swapColor() {
                    var tempColor = anotherColor;
                    anotherColor = color;
                    color = tempColor;
                }
                swapColor();
            }
            // 全局环境的变量对象：变量 color ，函数 changeColor
            // changeColor （局部环境的变量对象）函数的活动对象：arguments 对象，变量 anotherColor ，函数 swapColor
            // swapColor 的变量对象：arguments 对象，变量 tempColor
        }
    }
    // 8.3 --- 其他
    {
        // 使用 var 声明的变量会自动添加到最接近的环境中
        // 在函数的内部，最接近的环境（函数的局部环境）
        // 查询标识符
        {
            // 搜索过程从作用域链的前端开始，向上逐级查询与给定名字匹配的标识符
            // 步骤
            {
                // 如果在局部环境中找到了该标识符，搜索过程停止，变量就绪
                // 如果在局部环境中没有找到该标识符，则继续沿作用域链向上搜索
                // 搜索过程一直追溯到全局环境的变量对象
                // 如果在全局环境中也没有这个标识符，则意味着该变量尚未声明
            }
        }
    }
}

// 9 --- 垃圾收集
{
    // 9.1 --- 方式
    {
        // 9.1.1 --- 标记清除
        {
            // 当变量进入环境时，就将这个变量标记为“进入环境”，如在函数中声明一个变量
            // 当变量离开环境时，则将其标记为“离开环境”
        }
        // 9.1.2 --- 引用计数（不太常见）
        {
            // 跟踪记录每个值被引用的次数
            // 当声明了一个变量并将一个引用类型值赋给变量时，则这个值的引用次数 为 1
            // 如果同一个值又被赋给另一个变量，则该值的引用计数 +1 ；如果包含这个值引用的变量又取了另一个值，则这个值的引用计数 -1
            // 当这个值的引用计数变为 0 时，则说明没有办法再访问这个值了，因此回收其占用的内存空间
            // 问题：循环引用
        }
        // 9.2 --- 性能问题
        {
            // 垃圾收集器是周期性运行的
        }
        // 9.3 --- 管理内存
        {
            // 解除引用：将值设置为 null 来释放引用，让值脱离执行环境，以便垃圾收集器在下次运行时将其回收，并不意味着自动回收该值所在的内存
        }
    }
}
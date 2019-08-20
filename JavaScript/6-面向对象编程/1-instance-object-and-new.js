// --- 实例对象与 new 命令

// 1 --- 对象是什么
{
    // 面向对象编程 (OOP) ：将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟
    // 每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理信息、发出信息等任务
    // 对象可以复用，通过继承机制还可以定制
    // 因此，面向对象编程具有灵活、代码可复用、高度模块化等特点，容易维护和开发
    // 比起由一系列函数或指令组成的传统的过程式编程，更适合多人合作的大型软件项目
    // 1.1 --- 对象是单个实物的抽象
    {
        // 一本书、一辆汽车、一个数据库、一个与远程服务器的连接都可以是对象
        // 当实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象进行编程
    }
    // 1.2 --- 对象是一个容器，封装了属性和方法
    {
        // 属性是对象的状态
        // 方法是对象的行为(完成某种任务)
        // 比如把动物抽象为 animal 对象，使用属性记录是哪一种动物，使用方法表示动物的某种行为(奔跑、休息等)
    }
}

// 2 --- 构造函数
{
    // 面向对象编程的第一步，就是要生成对象
    // 对象是单个实物的抽象，通常需要一个模板，表示某一类实物的共同特征，然后对象根据这个模板生成
    // 典型的面向对象 编程语言(比如 C++ 和 Java )，都有"类"这个概念"；类"是对象的模板；对象是"类"的实例
    // 但是， JavaScript 语言的对象体系，不是基于"类"的，而是基于构造函数和原型链
    // JavaScript 语言使用构造函数作为对象的模板
    // 构造函数：专门用来生成实例对象的函数，它是对象的模板，描述实例对象的基本结构
    // 一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构
    // 构造函数就是一个普通的函数，但是有自己的特征和用法
    // 没有显式地创建对象，直接将属性和方法赋给了 this 对象
    // 没有 return 语句，默认返回新对象的实例
    {
        var Vehicle = function () {
            this.price = 1000;
        };
        // 上面代码中， Vehicle 就是构造函数；为了与普通函数区别，构造函数名字的第一个字母通常大写
        // 构造函数的特点有 2 个：
        {
            // 特点---1---函数体内部使用 this 关键字，代表了所要生成的对象实例
            // 特点---2---生成对象的时候，必须使用 new 命令
        }
    }
    // 缺点：每个成员无法得到复用，包括函数
}

// 3 --- new命令
{
    // 3.1 --- 基本用法
    {
        // new 命令的作用：就是执行构造函数，返回一个实例对象
        var Vehicle = function (p) {
            this.price = p;
        };
        var v = new Vehicle(1000);
        console.log('[new命令]---基本用法', v.price); // 1000
        // 上面通过new命令，让构造函数 Vehicle 生成一个实例对象，保存在变量 v 中
        // 这个新生成的实例对象，从构造函数 Vehicle 得到了 price 属性
        // new 命令执行时，构造函数内部的 this ，就代表了新生成的实例对象， this.price 表示实例对象有一个 pirce 属性，值是 1000
        // new 命令本身就是可以执行构造函数，所以后面的构造函数可以带括号，也可以不带括号
        // 但是为了表示这里是函数调用，推荐使用括号
        // 如果忘记使用 new 命令直接调用构造函数；这种情况下，构造函数就变成了普通函数，并不会生成实例对象
        {
            var temp = Vehicle(500);
            console.log('[new命令]---基本用法 不使用new命令', temp); // undefined
            console.log('[new命令]---基本用法 不使用new命令', price); // 500
            console.log('[new命令]---基本用法 不使用new命令', this); // {}
            console.log('[new命令]---基本用法 不使用new命令', this.price); // undefined
            // this 这时代表全局对象， price 属性变成了全局变量
            // 因此，应该非常小心，避免不使用 new 命令、直接调用构造函数
        }
        // 为了保证构造函数必须与 new 命令一起使用
        {
            // 解决办法一：构造函数内部使用严格模式；这样的话，一旦忘了使用 new 命令，直接调用构造函数就会报错
            {
                function FubarUseStrict(foo, bar) {
                    'use strict';
                    this._foo = foo;
                    this._bar = bar;
                }
                try {
                    FubarUseStrict(1, 2);
                } catch (e) {
                    console.log('[new命令]---基本用法 构造函数内部使用严格模式', e);
                }
                // TypeError: Cannot set property '_foo' of undefined
                // 上面代码的 FubarUseStrict 为构造函数， use strict 命令保证了该函数在严格模式下运行
                // 由于严格模式中，函数内部的 this 不能指向全局对象，默认等于 undefined ，导致不加 new 调用会报错( JavaScript不允许对 undefined 添加属性 )
            }
            // 解决办法二：构造函数内部判断是否使用 new 命令，如果发现没有使用，则直接返回一个实例对象
            {
                function FubarUseInstanceof(foo, bar) {
                    if (this instanceof FubarUseInstanceof) {
                        this._foo = foo;
                        this._bar = bar;
                    } else {
                        return new FubarUseInstanceof(foo, bar);
                    }
                }
                console.log('[new命令]---基本用法 构造函数内部判断是否使用new命令', FubarUseInstanceof(1, 2)); // { _foo: 1, _bar: 2 }
                console.log('[new命令]---基本用法 构造函数内部判断是否使用new命令', new FubarUseInstanceof(1, 2)); // { _foo: 1, _bar: 2 }
            }
        }
    }
    // 3.2 --- new 命令的原理
    {
        // 使用 new 命令时，它后面的函数依次执行下面的步骤
        {
            // 步骤---1---创建一个空对象，作为将要返回的对象实例
            // 步骤---2---将这个空对象的原型，指向构造函数的 prototype 属性
            // 步骤---3---将这个空对象赋值给函数内部的 this 关键字；即 this 指向这个新对象，
            // 步骤---4---开始执行构造函数内部的代码
            // 步骤---5---返回新对象
        }
        // 可以将实例标识为一种特定的类型
        // 构造函数内部， this 指的是一个新生成的空对象，所有针对 this 的操作，都会发生在这个空对象上
        // 构造函数之所以叫"构造函数"，就是说这个函数的目的，就是操作一个空对象(即 this 对象)，将其"构造"为需要的样子
        // 构造函数和其他函数唯一的区别：在于调用它们的方式不同
        {
            // 作为构造函数调用，使用 new 操作符来调用
            // 作为普通函数调用，不使用 new
        }
        // return 语句
        {
            // 如果构造函数内部有 return 语句，而且 return 后面跟着一个对象， new 命令会返回 return 语句指定的对象
            // 否则就不管 return 语句，返回 this 对象
            var returnNumber = function () {
                this.value = 1000;
                return 2000;
            };
            console.log('[new命令的原理]---return number', new returnNumber()); // returnNumber { value: 1000 }
            var returnObj = function () {
                this.value = 1000;
                return {
                    value: 2000,
                    msg: 'obj'
                };
            };
            var obj = new returnObj();
            console.log('[new命令的原理]---return object', obj); // { value: 2000, msg: 'obj' }
            console.log('[new命令的原理]---return object', obj.msg); // obj
            // 如果对普通函数(内部内有 this 关键字的函数)使用 new 命令，则会返回一个空对象
            function getMessage() {
                return 'this is message';
            }
            var msg = new getMessage();
            console.log('[new命令的原理]---return 返回不是对象的普通函数', msg); // getMessage {}
            console.log('[new命令的原理]---return 返回不是对象的普通函数', typeof msg); // 'object'
            function getMessage2() {
                return {
                    text: 'this is message'
                };
            }
            var msg2 = new getMessage2();
            console.log('[new命令的原理]---return 返回是对象的普通函数', msg2); // { text: 'this is message' }
            console.log('[new命令的原理]---return 返回是对象的普通函数', typeof msg2); // 'object'
            // 这是因为 new 命令总是返回一个对象，要么是实例对象，要么是 return 语句指定的对象
        }
        // new 命令简化的内部流程，可以用下面的代码表示
        {
            function _new( /* 构造函数 */ constructor, /* 构造函数参数*/ params) {
                // 将 arguments 对象转为数组
                var args = [].slice.call(arguments);
                // 取出构造函数
                var constructor = args.shift();
                // 创建一个空对象，继承构造函数的 prototype 属性
                var context = Object.create(constructor.prototype);
                // 执行构造函数
                var result = constructor.apply(context, args);
                //如果返回结果是对象，就直接返回，否则返回 context 对象
                return (typeof result === 'object' && result != null) ? result : context;
            }
        }
    }
    // 3.3 --- new.target
    {
        // 函数内部可以使用 new.target 属性
        // 如果当前函数是 new 命令调用， new.target 指向当前函数，否则为 undefined
        function f() {
            console.log('[new.target]---', new.target === f);
        }
        f(); // false
        new f(); // true
        // 使用这个属性可以判断函数调用的时候，是否使用 new 命令
        function use_new() {
            if (new.target === undefined) {
                console.log('[new.target]---请使用new命令调用！');
            }
        }
        use_new(); // 请使用new命令调用！
    }
    // 4.5 --- 问题
    {
        // 每个方法都要在每个实例上创建一遍（ ECMAScript 中函数是对象，因此，每一个定义函数，也就是实例化了一个对象 ）
        // 不同实例上的同名函数是不相等的
    }
}

// 4 --- Object.create() 创建实例对象
{
    // 构造函数作为模板，可以生成实例对象
    // Object.create() ：以现有的对象作为模板，生成新的实例对象
    var person1 = {
        name: '张三',
        age: 38,
        greet: function () {
            console.log('Hi! I\'m ' + this.name);
        }
    };
    var person2 = Object.create(person1);
    console.log('[Object.create]---', person2.name); // 张三
    person2.greet(); // Hi! I'm 张三
    //上面代码中，对象 person1 是 person2 的模板，后者继承了前者的属性和方法
}
//---实例对象与new命令

//1---对象是什么
{
    //面向对象编程(OOP)：将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟
    //每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理信息、发出信息等任务
    //对象可以复用，通过继承机制还可以定制
    //因此，面向对象编程具有灵活、代码可复用、高度模块化等特点，容易维护和开发
    //比起由一系列函数或指令组成的传统的过程式编程，更适合多人合作的大型软件项目
    //1.1---对象是单个实物的抽象
    {
        //一本书、一辆汽车、一个数据库、一个与远程服务器的连接都可以是对象
        //当实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象进行编程
    }
    //1.2---对象是一个容器，封装了属性和方法
    {
        //属性是对象的状态
        //方法时对象的行为(完成某种任务)
        //比如把动物抽象为animal对象，使用属性记录是哪一种动物，使用方法表示动物的某种行为(奔跑、休息等)
    }
}

//2---构造函数
{
    //面向对象编程的第一步，就是要生成对象
    //对象是单个实物的抽象，通常需要一个模板，表示某一类实物的共同特征，然后对象根据这个模板生成
    //典型的面向对象 编程语言(比如C++和Java)，都有"类"这个概念"；类"是对象的模板；对象是"类"的实例
    //但是，JavaScript语言的对象体系，不是基于"类"的，而是基于构造函数和原型链
    //JavaScript语言使用构造函数作为对象的模板
    //构造函数：专门用来生成实例对象的函数，它是对象的模板，描述实例对象的基本结构
    //一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构
    //构造函数就是一个普通的函数，但是有自己的特征和用法
    {
        var Vehicle = function () {
            this.price = 1000;
        };
        //上面代码中，Vehicle就是构造函数；为了与普通函数区别，构造函数名字的第一个字母通常大写
        //构造函数的特点有2个：
        //特点---1---函数体内部使用this关键字，代表了所要生成的对象实例
        //特点---2---生成对象的时候，必须使用new命令
    }
}

//3---new命令
{
    //3.1---基本用法
    {
        //new命令的作用：就是执行构造函数，返回一个实例对象
        var Vehicle = function (p) {
            this.price = p;
        };
        var v = new Vehicle(1000);
        console.log('[new命令]---基本用法', v.price);
        //1000
        //上面通过new命令，让构造函数Vehicle生成一个实例对象，保存在变量v中
        //这个新生成的实例对象，从构造函数Vehicle得到了price属性
        //new命令执行时，构造函数内部的this，就代表了新生成的实例对象，this.price表示实例对象有一个pirce属性，值是1000
        //new命令本身就是可以执行构造函数，所以后面的构造函数可以带括号，也可以不带括号
        //但是为了表示这里是函数调用，推荐使用括号
        //如果忘记使用new命令直接调用构造函数
        {
            //这种情况下，构造函数就变成了普通函数，并不会生成实例对象
            var temp = Vehicle(500);
            console.log('[new命令]---基本用法 不使用new命令', temp);
            //undefined
            console.log('[new命令]---基本用法 不使用new命令', price);
            //500
            console.log('[new命令]---基本用法 不使用new命令', this);
            //{}
            console.log('[new命令]---基本用法 不使用new命令', this.price);
            //undefined
            //this这时代表全局对象，price属性编程了全局变量
            //因此，应该非常小心，避免不使用new命令、直接调用构造函数
        }
        //为了保证构造函数必须与new命令一起使用
        {
            //解决办法一：构造函数内部使用严格模式；这样的话，一旦忘了使用new命令，直接调用构造函数就会报错
            {
                function Fubar_use_strict(foo, bar) {
                    'use strict';
                    this._foo = foo;
                    this._bar = bar;
                }
                try {
                    Fubar_use_strict(1, 2);
                } catch (e) {
                    console.log('[new命令]---基本用法 构造函数内部使用严格模式', e);
                }
                //TypeError: Cannot set property '_foo' of undefined
                //上面代码的Fubar为构造函数，use strict命令保证了该函数在严格模式下运行
                //由于严格模式中，函数内部的this不能指向全局对象，默认等于undefined，导致不加new调用会报错(JavaScript不允许对undefined添加属性)
            }
            //解决办法二：构造函数内部判断是否使用new命令，如果发现没有使用，则直接返回一个实例对象
            {
                function Fubar_use_instanceof(foo, bar) {
                    if (this instanceof Fubar_use_instanceof) {
                        this._foo = foo;
                        this._bar = bar;
                    } else {
                        return new Fubar_use_instanceof(foo, bar);
                    }
                }
                console.log('[new命令]---基本用法 构造函数内部判断是否使用new命令', Fubar_use_instanceof(1, 2));
                //{ _foo: 1, _bar: 2 }
                console.log('[new命令]---基本用法 构造函数内部判断是否使用new命令', new Fubar_use_instanceof(1, 2));
                //{ _foo: 1, _bar: 2 }
            }
        }
    }
    //3.2---new命令的原理
    {
        //使用new命令时，它后面的函数依次执行下面的步骤
        {
            //步骤---1---创建一个空对象，作为将要返回的对象实例
            //步骤---2---将这个空对象的原型，指向构造函数的prototype属性
            //步骤---3---将这个空对象赋值给函数内部的this关键字
            //步骤---4---开始执行构造函数内部的代码
        }
        //构造函数内部，this指的是一个新生成的空对象，所有针对this的操作，都会发生在这个空对象上
        //构造函数之所以叫"构造函数"，就是说这个函数的目的，就是操作一个空对象(即this对象)，将其"构造"为需要的样子
        //return语句
        {
            //如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象
            //否则就不管return语句，返回this对象
            var return_number = function () {
                this.value = 1000;
                return 2000;
            };
            console.log('[new命令的原理]---return', new return_number());
            //return_number { value: 1000 }
            var return_obj = function () {
                this.value = 1000;
                return {
                    value: 2000
                };
            };
            console.log('[new命令的原理]---return', new return_obj());
            //{ value: 2000 }
            //如果对普通函数(内部内有this关键字的函数)使用new命令，则会返回一个空对象
            function get_message() {
                return 'this is message';
            }
            var msg = new get_message();
            console.log('[new命令的原理]---return', msg);
            //get_message {}
            console.log('[new命令的原理]---return', typeof msg);
            //'object'
            function get_message_2() {
                return {
                    text: 'this is message'
                };
            }
            var msg_2 = new get_message_2();
            console.log('[new命令的原理]---return', msg_2);
            //{ text: 'this is message' }
            console.log('[new命令的原理]---return', typeof msg_2);
            //'object'
            //这是因为new命令总是返回一个对象，要么是实例对象，要么是return语句指定的对象
        }
        //new命令简化的内部流程，可以用下面的代码表示
        {
            function _new( /* 构造函数 */ constructor, /* 构造函数参数*/ params) {
                //将arguments对象转为数组
                var args = [].slice.call(arguments);
                //取出构造函数
                var constructor = args.shift();
                //创建一个空对象，继承构造函数的prototype属性
                var context = Object.create(constructor.prototype);
                //执行构造函数
                var result = constructor.apply(context, args);
                //如果返回结果是对象，就直接返回，否则返回context对象
                return (typeof result === 'object' && result != null) ? result : context;
            }
        }
    }
    //3.3---new.target
    {
        //函数内部可以使用new.target属性
        //如果当前函数是new命令调用，new.target指向当前函数，否则为undefined
        function f() {
            console.log('[new.target]---', new.target === f);
        }
        f();
        //false
        new f();
        //true
        //使用这个属性可以判断函数调用的时候，是否使用new命令
        function use_new() {
            if (new.target === undefined) {
                console.log('[new.target]---请使用new命令调用！');
            }
        }
        use_new();
        //请使用new命令调用！
    }
}

//4---Object.create()创建实例对象
{
    //构造函数作为模板，可以生成实例对象
    //Object.create()：以现有的对象作为模板，生成新的实例对象
    var person_1 = {
        name: '张三',
        age: 38,
        greet: function () {
            console.log('Hi! I\'m ' + this.name);
        }
    };
    var person_2 = Object.create(person_1);
    console.log('[Object.create]---', person_2.name);
    //张三
    person_2.greet();
    //Hi! I'm 张三
    //上面代码中，对象person_1是person_2的模板，后者继承了前者的属性和方法
}
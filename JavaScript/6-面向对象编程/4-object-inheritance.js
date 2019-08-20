//---对象的继承

//1---原型对象概述
{
    //1.1---构造函数的缺点
    {
        //JavaScript通过构造函数生成新对象，因此构造函数可以视为对象的模板
        //实例对象的属性和方法，可以定义在构造函数内部
        function Cat(name, color) {
            this.name = name;
            this.color = color;
        }
        var cat_1 = new Cat('大毛', '白色');
        console.log('[原型对象概述]---构造函数的缺点', cat_1.name);
        //'大毛'
        console.log('[原型对象概述]---构造函数的缺点', cat_1.color);
        //'白色'
        //上面代码中，Cat函数是一个构造函数，函数内部定义了name属性和color属性，所有实例对象都会生成这2个属性，即这2个属性会定义在实例对象上面
        //通过构造函数为实例对象定义属性，虽然很方便，但是有一个缺点：
        //同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费
        {
            function Cat_defect(name, color) {
                this.name = name;
                this.color = color;
                this.meow = function () {
                    console.log('喵喵');
                }
            }
            var cat_1 = new Cat_defect('大毛', '白色');
            var cat_2 = new Cat_defect('二毛', '黑色');
            console.log('[原型对象概述]---构造函数的缺点 无法共享实例属性', cat_1.meow === cat_2.meow);
            //false
            //上面代码中，cat_1和cat_2是同一个构造函数的2个实例，它们都具有meow方法
            //由于meow方法是生成在每个实例对象上面，所以2个实例就生成了2次
            //也就是说，每新建一个实例，就会新建一个meow方法；这既没有必要，又浪费系统资源，因为所有meow方法都是同样的行为，完全应该共享
            //这个问题的解决方法，就是JavaScript的原型对象
        }
    }
    //1.2---prototype属性的作用
    {
        //JavaScript继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享
        //也就是说，如果属性和方法定义在原型上，那么所有实例对象就能共享，不仅节省了内存，还体现了实例对象之间的联系
        //JavaScript规定，每个函数都有一个prototype属性，指向一个对象
        {
            function f() {}
            console.log('[原型对象概述]---prototype属性的作用', typeof f.prototype);
            //'object'
        }
        //对于普通函数来说，该属性基本无用
        //对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型
        {
            function Animal(name) {
                this.name = name;
            }
            Animal.prototype.color = 'white';
            var cat_1 = new Animal('大毛');
            var cat_2 = new Animal('二毛');
            console.log('[原型对象概述]---prototype属性的作用', cat_1.color);
            //'white'
            console.log('[原型对象概述]---prototype属性的作用', cat_2.color);
            //'white'
            //上面代码中，构造函数Animal的prototype属性，就是实例对象cat_1和cat_2的原型对象
            //原型对象上添加一个color属性，结果，实例对象都共享了该属性
            //原型对象的属性不是实例对象自身的属性，只要修改原型对象，变动就立刻会体现所有实例对象上
            Animal.prototype.color = 'yellow';
            console.log('[原型对象概述]---prototype属性的作用', cat_1.color);
            //'yellow'
            console.log('[原型对象概述]---prototype属性的作用', cat_2.color);
            //'yellow'
            //上面代码中，原型对象的color属性的值变为yellow，2个实例对象的color属性立刻跟着变了
            //这是因为实例对象其实没有color属性，都是读取原型对象的color属性
            //也就是说，当实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法；这就是原型对象的特殊之处
            //如果实例对象自身就有某个属性或方法，它就不会再去原型对象寻找这个属性或方法
            cat_1.color = 'black';
            console.log('[原型对象概述]---prototype属性的作用', cat_1.color);
            //'black'
            console.log('[原型对象概述]---prototype属性的作用', cat_2.color);
            //'yellow'
            console.log('[原型对象概述]---prototype属性的作用', Animal.prototype.color);
            //'yellow'
            //上面代码中，实例对象cat_1的color属性改为black，就使得它不再去原型对象读取color属性，cat_2的color属性依然为yellow
        }
        //总结：
        {
            //原型对象的作用：定义所有实例对象共享的属性和方法
            //这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象
        }
    }
    //1.3---原型链
    {
        //JavaScript规定，所有对象都有自己的原型对象
        //一方面，任何一个对象，都可以充当其他对象的原型
        //另一方面，由于原型对象也是对象，所以它也有自己的原型
        //因此，就会形成一个"原型链"：对象到原型，再到原型的原型......
        //如果一层层地上溯，所有对象的原型最终都可以上溯到Object.prototype，即Object构造函数的prototype属性
        //也就是说，所有对象都继承了Object.prototype的属性；这就是所有对象都有valueOf和toString方法的原因，因为这是从Object.prototype继承的
        //Object.prototype的原型是null；null没有任何属性和方法，也没有自己的原型；因此原型链的尽头就是null
        console.log('[原型对象概述]---原型链', Object.getPrototypeOf(Object.prototype));
        //null
        //读取对象的某个属性：
        {
            //JavaScript引擎先寻找对象本身的属性，如果找不到，就到它的原型去找
            //如果还是找不到，就到原型的原型去找
            //如果直到最顶层的Object.prototype还是找不到，则返回undefined
            //如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做"覆盖"
        }
        //注意：
        {
            //一级级向上，在整个原型链上寻找某个属性，对性能是有影响的
            //所寻找的属性在越上层的原型对象，对性能的影响越大
            //如果寻找某个不存在的属性，将会遍历这个原型链
        }
        //举例来说，如果让构造函数的prototype属性指向一个数组，就意味着实例对象可以调用数组方法
        {
            var My_Array = function () {};
            My_Array.prototype = new Array();
            My_Array.prototype.constructor = My_Array;
            var mine = new My_Array();
            mine.push(1, 2, 3);
            console.log('[原型对象概述]---原型链', mine.length);
            //3
            console.log('[原型对象概述]---原型链', mine instanceof Array);
            //true
            //上面代码中，mine是构造函数My_Array的实例对象，由于My_Array.protptype指向一个数组实例，使得mine可以调用数组方法(这些方法定义在数组实例的prototype对象上面)
            //最后那行instanceof表达式，用来比较一个对象是否为某个构造函数的实例
        }
    }
    //1.4---constructor属性
    {
        //prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数
        {
            function P() {}
            console.log('[原型链概述]---constructor属性', P.prototype.constructor === P);
            //true
            //由于constructor属性定义在prototype对象上面，意味着可以被所有实例对象继承
            var p = new P();
            console.log('[原型链概述]---constructor属性', p.constructor === P);
            //true
            console.log('[原型链概述]---constructor属性', p.constructor === P.prototype.constructor);
            //true
            console.log('[原型链概述]---constructor属性', p.hasOwnProperty('constructor'));
            //false
            //上面代码中，p是构造函数P的实例对象，但是p自身没有constructor属性，该属性其实是读取原型链上面的P.prototype.constructor属性
        }
        //constructor属性的作用：可以得知某个实例对象，到底是哪一个构造函数产生的
        {
            function F() {}
            var f = new F();
            console.log('[原型链概述]---constructor属性 作用', f.constructor === F);
            //true
            console.log('[原型链概述]---constructor属性 作用', f.constructor === RegExp);
            //false
        }
        //另一方面，有了constructor属性，就可以从一个实例对象新建另一个实例
        {
            function Constr() {}
            var x = new Constr();
            var y = new x.constructor();
            console.log('[原型链概述]---constructor属性 作用', y instanceof Constr);
            //true
            //上面代码中，x是构造函数Constr的实例，可以从x.constructor简介调用构造函数；这使得在实例方法中，调用自身的构造函数成为可能
            Constr.prototype.create_copy = function () {
                return new this.constructor();
            };
            //上面代码中，create_copy方法调用构造函数，新建另一个实例
        }
        //constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错
        {
            function Person(name) {
                this.name = name;
            }
            console.log('[原型链概述]---constructor属性 关联', Person.prototype.constructor === Person);
            //true
            Person.prototype = {
                method: function () {}
            };
            console.log('[原型链概述]---constructor属性 关联', Person.prototype.constructor === Person);
            //false
            console.log('[原型链概述]---constructor属性 关联', Person.prototype.constructor === Object);
            //true
            console.log(Person.prototype.constructor);
            //[Function: Object]
            //上面代码中，构造函数Person的原型对象改掉了，但是没有修改constructor属性，导致这个属性不再指向Person
            //由于Person的新原型是一个普通对象，而普通对象的constructor属性指向Object构造函数，导致Person.prototype.constructor变成了Object
            //所以，修改原型对象时，一般要同时修改constructor属性的指向
            Person.prototype = {
                constructor: Person,
                method: function () {}
            };
            console.log('[原型链概述]---constructor属性 关联', Person.prototype.constructor === Person);
            //true
        }
        //如果不能确定constructor属性是什么函数，可以通过name属性，从实例得到构造函数的名称
        function Foo() {}
        var f = new Foo();
        console.log('[原型链概述]---constructor属性 关联', f.constructor.name);
        //'Foo'
    }
}

//2---instanceof运算符
{
    //instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例
    function Vehicle() {}
    var v = new Vehicle();
    console.log('[原型链概述]---instanceof运算符', v instanceof Vehicle);
    //true
    //instanceof运算符的左边是实例对象，右边是构造函数；它会检查右边构造函数的原型对象，是否在左边对象的原型链上
    //等价
    console.log('[原型链概述]---instanceof运算符', Vehicle.prototype.isPrototypeOf(v));
    //true
    //由于instanceof检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回true
    //有一种特殊情况，就是左边对象的原型链上，只有null对象；这时，instanceof判断会失真
    {
        var obj = Object.create(null);
        console.log('[原型链概述]---instanceof运算符', obj);
        //{}
        console.log('[原型链概述]---instanceof运算符', typeof obj);
        //'object'
        console.log('[原型链概述]---instanceof运算符', obj instanceof Object);
        //false
        //右边的构造函数Object的prototype属性，不在左边的原型链上，因此instanceof就认为obj不是Object的实例
        //但是，只要一个对象的原型不是null，instanceof运算符的判断就不会失真
    }
    //instanceof运算符的一个用处：判断值的类型
    {
        var x = [1, 2, 3];
        var y = {};
        console.log('[原型链概述]---instanceof运算符', x instanceof Array);
        //true
        console.log('[原型链概述]---instanceof运算符', y instanceof Object);
        //true
    }
    //注意：instanceof运算符只能用于对象，不适用原始类型的值
    {
        var s = 'hello';
        console.log('[原型链概述]---instanceof运算符', s instanceof String);
        //false
        //上面代码中，字符串不是String对象的实例(因为字符串不是对象)，所以返回false
    }
    //此外，对于undefined和null，instanceof运算符总是返回false
    {
        console.log('[原型链概述]---instanceof运算符', undefined instanceof Object);
        //false
        console.log('[原型链概述]---instanceof运算符', null instanceof Object);
        //false
    }
    //利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题
    {
        function Fubar(foo, bar) {
            if (this instanceof Fubar) {
                this._foo = foo;
                this._bar = bar;
            } else {
                return new Fubar(foo, bar);
            }
        }
        //上面代码使用使用instanceof运算符，在函数体内部判断this关键字是否为构造函数Fubar的实例；如果不是，就表明忘了加new命令
    }
}

//3---构造函数的继承
{
    //让一个构造函数继承另一个构造函数，是非常常见的需求
    //这可以分成2步实现：
    //第一步：子类继承父类的实例；在子类的构造函数中，调用父类的构造函数
    function Super() {}

    function Sub(value) {
        Super.call(this);
        this.prop = value;
    }
    //上面代码中，Sub是子类的构造函数，this是子类的实例
    //在实例上调用父类的构造函数Super，就会让子类实例具有父类实例的属性
    //第二步：子类继承父类的原型；让子类的原型指向父类的原型，这样，子类就可以继承父类原型
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.prototype.method = '...';
    //上面代码中，Sub.prototype是子类的原型，要将它赋值为Object.create(Super.prototype)，而不是直接等于Super.prototype
    //否则，后面2行对Sub.prototype的操作，会连父类的原型Super.prototype一起修改掉
    //另一种写法是Sub.prototype等于一个父类的实例
    // Sub.prototype = new Super();
    //上面这种写法也有继承效果，但是子类会具有父类实例的方法；有时，这可能不是我们需要的，所以不推荐使用这种写法
    //举例来说，Shape是一个构造函数
    function Shape() {
        this.x = 0;
        this.y = 0;
    }
    Shape.prototype.move = function (x, y) {
        this.x += x;
        this.y += y;
        console.log('[构造函数的继承]---Shape moved');
    };
    Shape.prototype.print = function () {
        console.log('[构造函数的继承]---Shape')
    };
    //让Rectangle构造函数继承Shape
    //第一步：子类继承父类的实例
    function Rectangle() {
        //调用父类构造函数
        Shape.call(this);
    }
    //另一种写法
    // function Rectangle() {
    //     this.base = Shape;
    //     this.base();
    // }
    //第二步：子类继承父类的原型
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;
    //采用这样的写法以后，instanceof运算符会对子类和父类的构造函数，都返回true
    var rect = new Rectangle();
    console.log('[构造函数的继承]---', rect instanceof Rectangle);
    //true
    console.log('[构造函数的继承]---', rect instanceof Shape);
    //true
    //上面代码中，子类是整体继承父类；有时只需要单个方法的继承，这时可以采用下面的写法
    Rectangle.prototype.print = function () {
        Shape.prototype.print.call(this);
        console.log('[构造函数的继承]---Rectangle');
    };
    rect.print();
    //Shape
    //Rectangle
    //上面代码中，子类rect的print方法先调用父类Shape的print方法，再部署自己的代码，这就等于继承了父类Shape的print方法
}

//4---多重继承
{
    //JavaScript不提供多重继承功能，即不允许一个对象同时继承多个对象
    //但是可以通过变通方法，实现这个功能
    function M_1() {
        this.hello = 'hello';
    }

    function M_2() {
        this.world = 'world';
    }

    function S() {
        M_1.call(this);
        M_2.call(this);
    }
    //继承M_1
    S.prototype = Object.create(M_1.prototype);
    //继承链上加入M_2
    Object.assign(S.prototype, M_2.prototype);
    //指定构造函数
    S.prototype.constructor = S;
    var s = new S();
    console.log('[多重继承]---', s.hello);
    //'hello'
    console.log('[多重继承]---', s.world);
    //'world'
}

//5---模块
{
    //JavaScript不是一种模块化编程语言，ES6才开始支持"类"和"模块"
    //传统做法：利用对象实现模块的效果
    //5.1---基本的实现方法
    {
        //模块：实现特定功能的一组属性和方法的封装
        //简单的做法：把模块写成一个对象，所有模块成员都放到这个对象里面
        var module_1 = new Object({
            _count: 0,
            m_1: function () {},
            m_2: function () {}
        });
        //上面的函数m_1和m_2，都封装在module_1对象里；使用的时候，就是调用这个对象的属性
        module_1.m_1();
        //但是这样的写法会暴露所有模块成员，内部状态可以被外部改
        //比如，外部代码可以直接改变内部计数器的值
        console.log('[模块]---基本', module_1._count);
        //0
        module_1._count = 5;
        console.log('[模块]---基本', module_1._count);
        //5
    }
    //5.2---封装私有变量：构造函数的写法
    {
        //可以利用构造函数，封装私有变量
        function String_Builder() {
            var buffer = [];
            this.add = function (str) {
                buffer.push(str);
            };
            this.toString = function () {
                return buffer.join('');
            };
        }
        //上面代码中，buffer是模块的私有变量；一旦生成实例对象，外部是无法直接访问buffer的
        //但是，这种方法将私有变量封装在构造函数中，导致构造函数与实例对象是一体的，总是存在于内存之中，无法在使用完成后清除
        //这意味着，构造函数有双重作用，既用来塑造实例对象，又用来保存实例对象的数据
        //违背了构造函数与实例对象在数据上相分离的原则(即实例对象的数据，不应该保存在实例对象以外)
        //同时，非常耗费内存
        function String_Bulider_2() {
            this._buffer = [];
        }
        String_Bulider_2.prototype = {
            constructor: String_Bulider_2,
            add: function (str) {
                this._buffer.push(str);
            },
            toString: function () {
                return this._buffer.join('');
            }
        };
        //这种方法将私有变量放入实例对象中，好处是看上去更自然，但是它的私有变量可以从外部读写，不是很安全
    }
    //5.3---封装私有变量：立即执行函数的写法
    {
        //将相关的属性和方法封装在一个函数作用域里面，可以达到不暴露私有成员的目的
        var module_1 = (function () {
            var _count = 0;
            var m_1 = function () {};
            var m_2 = function () {};
            return {
                m_1: m_1,
                m_2: m_2
            };
        })();
        //使用上面的写法，外部代码无法读取内部的_count变量
    }
    //5.4---模块的放大模式
    {
        //如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用"放大模式"
        var module_1 = (function (mod) {
            mod.m_3 = function () {};
            return mod;
        }(module_1));
        //上面代码为module_1模块添加了一个新方法m_3()，然后返回新的module_1模块
        //在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载
        //如果采用上面的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"
        var module_2 = (function (mod) {
            mod.m_3 = function () {};
            return mod;
        }(this.module_2 || {}));
        //与"放大模式"相比，"宽放大模式"就是"立即执行函数"的参数可以是空对象
    }
    //5.5---输入全局变量
    {
        //独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互
        //为了在模块内部调用全局变量，必须显式的将其他变量输入模块
        var module_1 = (function (module_2, module_3) {
            //...
        }(module_2, module_3));
        //上面module_1需要使用module_2和module_3模块，就把这2个模块当作参数输入module_1
        //这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显
        //立即执行函数还可以起到命名空间的作用
        var space = {};
        (function () {
            function go() {}

            function handle_events() {}

            function init() {}

            function destroy() {}
            space.init = init;
            space.destroy = destroy;
        }());
        //上面代码中，space对象输出到全局，对外暴露init和destroy接口，内部方法go、handle_events都是外部无法调用的
    }
}
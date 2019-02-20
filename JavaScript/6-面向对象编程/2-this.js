//---this关键字

//1---涵义
{
    //this可以用在构造函数之中，表示实例对象
    //除此之外，this还可以用在别的场合；但不管是什么场合，this都有一个共同点：它总是返回一个对象
    //简单说，this就是属性或方法"当前"所在的对象
    {
        var person = {
            name: '张三',
            describe: function () {
                return '姓名：' + this.name;
            }
        };
        console.log('[涵义]---', person.describe());
        //姓名：张三
        //上面代码中，this.name表示name属性所在的那个对象
        //由于this.name是在describe方法中调用，而describe方法所在的当前对象是person，因此this指向person，this.name就是 person.name
        //由于对象的属性可以赋值给另一个对象，所以属性所在的当前对象是可变的，即this的指向是可变的
        var person_2 = {
            name: '李四'
        };
        person_2.describe = person.describe;
        console.log('[涵义]---', person_2.describe());
        //姓名：李四
        //person_2.describe表示describe方法所在的当前对象是person_2，所以this.name就指向person_2.name
    }
    //重构上述例子，this的动态指向就能看得更清楚
    {
        function f() {
            return '姓名：' + this.name;
        }
        var a = {
            name: '张三',
            describe: f
        };
        var b = {
            name: '李四',
            describe: f
        };
        console.log('[涵义]---', a.describe());
        //姓名：张三
        console.log('[涵义]---', b.describe());
        //姓名：李四
        //上面代码中，函数f内部使用this关键字，随着f所在的对象不同，this的指向也不同
    }
    //只要函数被赋给另一个变量，this的指向就会变
    //总结：
    {
        //JavaScript语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行
        //this就是函数运行时所在的对象(环境)
    }
}

//2---实质
{
    //JavaScript语言之所以有this的设计，跟内存里面的数据结构有关系
    var obj = {
        foo: 5
    };
    //上面的代码将一个对象赋值给变量obj
    //JavaScript引擎会先在内存里面，生成一个对象{foo: 5}，然后把这个对象的内存地址赋值给变量obj
    //也就是说，变量obj是一个地址
    //如果要读取obj.foo，引擎先从obj拿到内存地址，然后再从该地址读出原始的对象，返回它的foo属性
    //原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象
    //举例来说，上面例子的foo属性，实际上是以下面的形式保存的
    // {
    //     foo: {
    //       [[value]]: 5
    //       [[writable]]: true
    //       [[enumerable]]: true
    //       [[configurable]]: true
    //     }
    // }
    //注意，foo属性的值保存在属性描述对象的value属性里面
    //当属性的值是一个函数时：
    {
        var obj = {
            foo: function () {}
        };
        //引擎会将函数单独保存在内存中，然后将函数的地址赋值给foo属性的value属性
        // {
        //     foo: {
        //       [[value]]: 函数的地址
        //       ...
        //     }
        // }
        //由于函数是一个单独的值，所以它可以在不同的环境(上下文)执行
        var f = function () {}
        var obj = {
            f: f
        };
        //单独执行
        f();
        //obj环境执行
        obj.f();
        //JavaScript允许在函数体内部，引用当前环境的其他变量
        var x = 'x';
        var f_use_varibale = function () {
            console.log('[实质]---在函数体内部 引用当前环境的其他变量', x);
        };
        f_use_varibale();
        //'x'
        //由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境
        //所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境
        f = function () {
            console.log('[实质]---在函数体内部 引用当前环境的其他变量', this.x);
        }
        obj = {
            f: f,
            x: 2
        };
        //单独执行(全局环境)
        f();
        //undefined
        //obj环境执行
        obj.f();
        //2
        //上面代码中，在全局环境执行，this.x指向全局环境的x；在obj环境执行，this.x指向obj.x
    }
}

//3---使用场合
{
    //3.1---全局环境
    {
        //全局环境使用this，它指的就是顶层对象window
        //this === 全局环境
        function global_this() {
            //this === 全局环境
        }
        //不管是不是在函数内部，只要是在全局环境下运行，this就指顶层对象window
    }
    //3.2---构造函数
    {
        //构造函数中的this，指的是实例对象
        var Obj = function (p) {
            this.p = p;
        };
        //上面代码定义了一个构造函数Obj
        //由于this指向实例对象，所以在构造函数内部定义this.p，就相当于定义实例对象有一个p属性
        var o = new Obj('hello world');
        console.log('[使用场合]---构造函数', o.p);
        //'hello world'
    }
    //3.3---对象的方法
    {
        //如果对象的方法里面包含this，this的指向就是方法运行时所在的对象
        //该方法赋值给另一外一个对象，就会改变this的指向
        var obj = {
            foo: function () {
                console.log('[使用场合]---对象的方法', this === obj);
            }
        };
        obj.foo();
        //true
        //上面代码中，obj.foo方法执行时，它内部的this指向obj
        //但是，下面这几种用法，都会改变this的指向
        {
            //情况一：
            (obj.foo = obj.foo)();
            //false
            //this指向window
            //情况二：
            (false || obj.foo)();
            //false
            //this指向window
            //情况三：
            (1, obj.foo)();
            //false
            //this指向window
            //上面代码中，obj.foo就是一个值
            //这个值真正调用的时候，运行环境已经不是obj，而是全局环境，所以this不再指向obj
            //可以这样理解：
            //JavaScript引擎内部，obj和obj.foo存储在2个内存地址，称为地址一和地址二
            //obj.foo()这样调用时，是从地址一调用地址二，因此地址二的运行环境是地址一，this指向obj
            //但是，上面三种情况，都是直接取出地址二进行调用，这样的话，运行环境就是全局环境，因此this指向全局环境
            //上面三种情况等同于下面的代码
            //情况一：
            (function () {
                console.log('[使用场合]---对象的方法', this === obj);
            })();
            //情况二：
            (false || function () {
                console.log('[使用场合]---对象的方法', this === obj);
            })();
            //情况三：
            (1, function () {
                console.log('[使用场合]---对象的方法', this === obj);
            })();
        }
        //如果this所在的方法不在对象的第一层，这时this只是指向当前一层的对象，而不会继承更上面的层
        {
            var a = {
                p: 'hello',
                b: {
                    m: function () {
                        console.log('[使用场合]---对象的方法', this.p);
                    }
                }
            };
            a.b.m();
            //undefined
            //上面代码中，a.b.m方法在a对象的第二层，该方法内部的this不是指向a，而是指向a.b
            //实际执行的是下面的代码
            {
                var b = {
                    m: function () {
                        console.log('[使用场合]---对象的方法', this.p);
                    }
                };
                var a = {
                    p: 'hello',
                    b: b
                };
                a.b.m();
                //undefined
                //等同于
                b.m();
                //undefined
            }
            //如果要达到预期效果，只有写成下面这样
            {
                var a = {
                    b: {
                        p: 'hello',
                        m: function () {
                            console.log('[使用场合]---对象的方法', this.p);
                        }
                    }
                }
                a.b.m();
                //'hello'
                //如果这时将嵌套对象内部的方法赋值给一个变量，this依然会指向全局对象
                var hello = a.b.m;
                hello();
                //undefined
                //为了避免这个问题，可以将m所在的对象赋值给hello，这样调用，this的指向就不会变
                hello = a.b;
                hello.m();
                //'hello'
            }
        }
    }
}

//4---使用注意点
{
    //4.1---避免多层this
    {
        //由于this的指向是不确定的，所以切勿在函数中包含多层的this
        var o = {
            f_1: function () {
                console.log('[使用注意点]---避免多层this', this === o);
                var f_2 = function () {
                    console.log('[使用注意点]---避免多层this', this === o);
                }();
            }
        };
        o.f_1();
        //true
        //false
        //上面代码包含2层this，结果运行后，第一层指向对象o，第二层指向全局对象
        //实际执行执行的是下面的代码
        {
            var temp = function () {
                console.log('[使用注意点]---避免多层this 实际', this === o);
            };
            var o = {
                f_1: function () {
                    console.log('[使用注意点]---避免多层this 实际', this === o);
                    var f2 = temp();
                }
            }
            o.f_1();
            //true
            //false
        }
        //直接通过地址调用函数的运行环境是全局环境
        //一个解决方法：在第二层改用一个指向外层this的变量
        {
            var o = {
                f_1: function () {
                    console.log('[使用注意点]---避免多层this 解决方法', this === o);
                    var that = this;
                    var f_2 = function () {
                        console.log('[使用注意点]---避免多层this 解决方法', that === o);
                    }();
                }
            }
            o.f_1();
            //true
            //true
            //上面代码定义了变量that，固定指向外层的this，然后在内层使用that，就不会发生this指向的改变
        }
        //JavaScript提供了严格模式，也可以硬性避免这种问题
        {
            //严格模式下，如果函数内部的this指向顶层对象，就会报错
            var counter = {
                count: 0
            };
            counter.inc = function () {
                'use strict';
                this.count++;
            };
            var f = counter.inc;
            try {
                f();
            } catch (e) {
                console.log('[使用注意点]---避免多层this 严格模式 e =', e);
            }
            //TypeError: Cannot read property 'count' of undefined
        }
    }
    //4.2---避免数组处理方法中的this
    {
        //数组的map和forEach方法，允许提供一个函数作为参数；这个函数内部不应该使用this
        var o = {
            v: 'hello',
            p: ['a_1', 'a_2'],
            f: function f() {
                this.p.forEach(function (item) {
                    console.log('[使用注意点]---避免数组处理方法中的this item =', item, 'this.v =', this.v);
                });
            }
        }
        o.f();
        //item = a_1 this.v = undefined
        //item = a_2 this.v = undefined
        //上面代码中，forEach方法的回调函数中的this，其实是指向window对象，因此取不到o.v的值
        //解决方法一：使用中间变量固定this
        {
            var o = {
                v: 'hello',
                p: ['a_1', 'a_2'],
                f: function f() {
                    var that = this;
                    this.p.forEach(function (item) {
                        console.log('[使用注意点]---避免数组处理方法中的this item =', item, 'that.v =', that.v);
                    });
                }
            }
            o.f();
            //item = a_1 that.v = hello
            //item = a_2 that.v = hello
        }
        //解决方法二：将this当作forEach方法的第二个参数，固定它的运行环境
        {
            var o = {
                v: 'hello',
                p: ['a_1', 'a_2'],
                f: function f() {
                    this.p.forEach(function (item) {
                        console.log('[使用注意点]---避免数组处理方法中的this item =', item, 'this.v =', this.v);
                    }, this);
                }
            }
            o.f();
            //item = a_1 that.v = hello
            //item = a_2 that.v = hello
        }
    }
    //4.3---避免回调函数中的this
    {
        //回调函数中的this往往会改变指向，最好避免使用
        var o = new Object();
        o.f = function () {
            console.log('[使用注意点]---避免回调函数中的this', this === o);
        }
        // jQuery 的写法
        // $('#button').on('click', o.f);
        //false
        //此时this不再指向o对象，而是指向按钮的DOM对象，因为f方法是在按钮对象的环境中被调用的
        //为了解决这个问题，可以采用下面的一些方法对this进行绑定，也就是使得this固定指向某个对象，减少不确定性
    }
}

//5---绑定this的方法
{
    //this的动态切换，固然为JavaScript创造了巨大的灵活性，但也使得编程变得困难和模糊
    //有时，需要把this固定下来，避免出现意想不到的情况
    //JavaScript提供了call、apply、bind这3个方法，来切换/固定this的指向
    //5.1---Function.prototype.call()
    {
        //函数实例的call，可以指定函数内部this的指向(即函数执行时所在的作用域)，然后在指定的作用域中，调用该函数
        var obj = {};
        var f = function () {
            return this;
        };
        console.log('[绑定this方法]---call', f() === obj);
        //false
        console.log('[绑定this方法]---call', f.call(obj) === obj);
        //true
        //上面代码中，全局环境运行函数f时，this指向全局环境(浏览器为window对象)
        //call方法可以改变this的指向，指定this指向对象obj，然后在对象obj的作用域中运行函数f
        //call方法的参数，应该是一个对象
        //如果参数为空、null、undefined，则默认传入全局对象
        //如果参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入call方法
        console.log('[绑定this方法]---call', f.call(5));
        //[Number: 5]
        //call方法还可以接受多个参数
        {
            //func.call(this_value, arg_1, arg_2, ...)
            //this.value：this所要指向的那个对象
            //后面的参数则是函数调用时所需的参数
            function add(a, b) {
                return a + b;
            }
            console.log('[绑定this方法]---call', add.call(this, 1, 2));
            //3
        }
        //call方法的一个应用是调用对象的原生方法
        {
            var obj = {};
            console.log('[绑定this方法]---call', obj.hasOwnProperty('toString'));
            //false
            //覆盖掉继承的hasOwnProperty方法
            obj.hasOwnProperty = function () {
                return true;
            };
            console.log('[绑定this方法]---call', obj.hasOwnProperty('toString'));
            //true
            console.log('[绑定this方法]---call', Object.prototype.hasOwnProperty.call(obj, 'toString'));;
            //false
            //上面代码中，hasOwnProperty是obj对象继承的方法，如果这个方法一旦被覆盖，就不会得到正确的结果
            //call方法可以解决这个问题，它将hasOwnProperty方法的原始定义放到obj对象上执行，这样无论obj上有没有同名方法，都不会影响结果
        }
    }
    //5.1---Function.prototype.apply()
    {
        //apply方法的作用与call方法类似，也是改变this指向，然后调用该函数
        //唯一的区别是，它接受一个数组作为函数执行时的参数，使用格式如下：
        //func.apply(this_value, [arg_1, arg_2, ...])
        //this.value：this所要指向的那个对象；如果设为null或undefined，则等同于指定全局对象
        //第二个参数：是一个数组，该数组的所有成员依次作为参数，传入原函数
        //原函数的参数，在call方法中必须一个个添加，但是在apply方法中，必须以数组形式添加
        function print_add(x, y) {
            console.log('[绑定this方法]---apply', x + y);
        }
        print_add.call(null, 1, 1);
        //2
        print_add.apply(null, [1, 1]);
        //2
        //上面代码中，print_add函数本来接受2个参数，使用apply方法以后，就变成可以接受一个数组作为参数
        //利用这一点，可以做一些有趣的应用
        //应用---1---找出数组最大元素
        {
            var a = [10, 2, 4, 15, 9];
            console.log('[绑定this方法]---apply 找出数组最大元素', Math.max.apply(null, a));
            //15
        }
        //应用---2---将数组的空元素变为undefined
        {
            var a = ['a', , 'b'];
            console.log('[绑定this方法]---apply 将数组的空元素变为undefined', a);
            //[ 'a', <1 empty item>, 'b' ]
            console.log('[绑定this方法]---apply 将数组的空元素变为undefined', Array.apply(null, a));
            //[ 'a', undefined, 'b' ]
            //空元素与undefined的差别在于，数组的forEach方法会跳过空元素，但是不会跳过undefined
            function print(value) {
                console.log('[绑定this方法]---apply 将数组的空元素变为undefined', value);
            }
            a.forEach(print);
            //a
            //b
            Array.apply(null, a).forEach(print);
            //a
            //undefined
            //b
        }
        //应用---3---转换类似数组的对象
        {
            //利用数组对象的slice方法，可以将一个类似数组的对象(比如arguments对象)转为真正的数组
            console.log('[绑定this方法]---apply 转换类似数组的对象', Array.prototype.slice.apply({
                0: 1,
                length: 1
            }));
            //[ 1 ]
            console.log('[绑定this方法]---apply 转换类似数组的对象', Array.prototype.slice.apply({
                0: 1,
            }));
            //[]
            console.log('[绑定this方法]---apply 转换类似数组的对象', Array.prototype.slice.apply({
                0: 1,
                length: 2
            }));
            //[ 1, <1 empty item> ]
            console.log('[绑定this方法]---apply 转换类似数组的对象', Array.prototype.slice.apply({
                length: 1
            }));
            //[ <1 empty item> ]
            //上面代码的apply方法的参数都是对象，但是返回结果都是数组
            //这个方法起作用的前提是：被处理对象必须有length属性，以及相对应的数字键
        }
        //应用---4---绑定回调函数的对象
        {
            var o = new Object();
            o.f = function () {
                console.log('[绑定this方法]---apply 绑定回调函数的对象', this === o);
            }
            var f = function () {
                o.f.apply(o);
                //或者
                o.f.call(o);
            }
            // 按钮点击事件：jQuery 的写法
            // $('#button').on('click', f);
            //由于apply方法(或者call方法)不仅绑定函数执行时所在的对象，还会立即执行函数，因此不得不把绑定语句写在一个函数体内
            //更简洁的写法是采用下面介绍的bind方法
        }
    }
    //5.1---Function.prototype.bind()
    {
        //bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数
        var d = new Date();
        console.log('[绑定this方法]---bind', d.getTime());
        //1550456081472
        var print = d.getTime;
        try {
            print();
        } catch (e) {
            console.log('[绑定this方法]---bind', e);
        }
        //TypeError: this is not a Date object
        //上面代码中，将d.getTime方法赋给变量print，然后调用print就报错了
        //这是因为getTime方法内部的this，绑定Date对象的实例，赋给变量print以后，内部的this已经不指向Date对象的实例了
        //bind方法可以解决这个问题
        print = d.getTime.bind(d);
        console.log('[绑定this方法]---bind', print());
        //1550456081472
        //bind方法的参数就是所要绑定this的对象
        {
            var counter = {
                count: 0,
                inc: function () {
                    this.count++;
                }
            };
            var func = counter.inc.bind(counter);
            func();
            console.log('[绑定this方法]---bind', counter.count);
            //1
        }
        //this也可以绑定到其他对象
        {
            var counter = {
                count: 0,
                inc: function () {
                    this.count++;
                }
            };
            var obj = {
                count: 100
            };
            var func = counter.inc.bind(obj);
            func();
            console.log('[绑定this方法]---bind', obj.count);
            //101
        }
        //bind还可以接受更多的参数，将这些参数绑定原函数的参数
        {
            var add = function (x, y) {
                return x * this.m + y * this.n;
            };
            var obj = {
                m: 1,
                n: 2
            };
            var new_add = add.bind(obj, 5);
            console.log('[绑定this方法]---bind', new_add(10));
            //25 1*5+2*10
            //上面代码中，bind方法除了绑定this对象，还将add函数的第一个参数x绑定成5
            //然后返回一个新函数new_add，这个函数只要再接受一个参数y就能运行了
            //如果bind方法的第一个参数是null或undefined，等于将this绑定到全局对象，函数运行时this指向顶层对象(浏览器为window)
        }
        //使用注意点
        {
            //1---每一次返回一个新函数
            {
                //bind方法每运行一次，就返回一个新函数，这会产生一些问题
                //比如，监听事件的时候，不能写成下面这样：
                // element.addEventListener('click', o.m.bind(o));
                //上面代码中，click事件bind方法生成的一个匿名函数
                //这样会导致无法取消绑定，所以下面的代码是无效的
                // element.removeEventListener('click', o.m.bind(o));
                //正确方法
                {
                    // var listener = o.m.bind(o);
                    // element.addEventListener('click', listener);
                    // //  ...
                    // element.removeEventListener('click', listener);
                }
            }
            //2---结合回调函数使用
            {
                //回调函数时JavaScript最常用的模式之一，但是一个常见的错误是，将包含this的方法直接当作回调函数
                //解决方法时使用bind方法
                var counter = {
                    count: 0,
                    inc: function () {
                        this.count++;
                    }
                };

                function call_it(callback) {
                    callback();
                }
                call_it(counter.inc.bind(counter));
                //1
                //上面代码中，call_it方法会调用回调函数
                //这时如果直接把counter.inc传入，调用时counter.inc内部的this就会指向全局对象
                //使用bind方法将counter.inc绑定counter以后，就不会有这个问题，this总是指向counter
                //还有一种情况比较隐蔽，就是某些数组方法可以接受一个函数当作参数；这些函数内部的this指向，很可能也会出错
                {
                    var obj = {
                        name: 'damon',
                        times: [1],
                        print: function () {
                            this.times.forEach(function (n) {
                                console.log('[绑定this方法]---bind 使用注意点 结合回调函数使用', this.name);
                                console.log('[绑定this方法]---bind 使用注意点 结合回调函数使用', this === obj);
                            });
                        }
                    };
                    obj.print();
                    //undefined
                    //false
                    //上面代码中，obj.print内部this.times的this是指向obj的；但是forEach方法的回调函数内部的this.name却是指向全局对象，导致没有办法取到值
                    obj.print = function () {
                        this.times.forEach(function (n) {
                            console.log('[绑定this方法]---bind 使用注意点 结合回调函数使用', this.name);
                            console.log('[绑定this方法]---bind 使用注意点 结合回调函数使用', this === obj);
                        }.bind(this));
                    };
                    obj.print();
                    //'damon'
                    //true
                }
            }
            //3---结合call方法使用
            {
                //利用bind方法，可以改写一些JavaScript原生方法的使用形式，以数组的slice方法为例
                console.log('[绑定this方法]---bind 使用注意点 结合call方法使用', [1, 2, 3].slice(0, 1));
                //[ 1 ]
                //等同于
                console.log('[绑定this方法]---bind 使用注意点 结合call方法使用', Array.prototype.slice.call([1, 2, 3], 0, 1));
                //[ 1 ]
                //call方法实质上是调用Function.prototype.call方法，因此，上面的表达式可以用bind方法改写
                var slice = Function.prototype.call.bind(Array.prototype.slice);
                console.log(slice);
                //[Function: bound call]
                console.log('[绑定this方法]---bind 使用注意点 结合call方法使用', slice([1, 2, 3], 0, 1));
                //[ 1 ]
                //上面代码的含义：将Array.prototype.slice变成Function.prototype.call方法所在的对象，调用时就变成了Array.prototype.slice.call
                function print_v() {
                    console.log('[绑定this方法]---bind 使用注意点 结合call方法使用', this.v);
                }
                var o = {
                    v: 123
                };
                var bind = Function.prototype.call.bind(Function.prototype.bind);
                console.log(bind);
                //[Function: bound call]
                bind(print_v, o)();
                //123
                //上面代码的含义：将Function.prototype.bind方法绑定在Function.prototype.call上面
                //所以bind方法就可以直接使用，不需要在函数实例上使用
            }
        }
    }
}
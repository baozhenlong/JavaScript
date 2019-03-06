//---Object对象的相关方法

//1---Object.getPrototypeOf()
{
    //返回参数对象的原型；这是获取原型对象的标准方法
    var F = function () {};
    var f = new F();
    console.log('[getPrototypeOf]---', Object.getPrototypeOf(f) === F.prototype);
    //true
    //下面是几种特殊对象的原型
    {
        //空对象的原型是 Object.prototype
        console.log('[getPrototypeOf]---', Object.getPrototypeOf({}) === Object.prototype);
        //true
        //Object.prototype的原型是 null
        console.log('[getPrototypeOf]---', Object.getPrototypeOf(Object.prototype) === null);
        //true
        //函数的原型是 Function.prototype
        console.log('[getPrototypeOf]---', Object.getPrototypeOf(function () {}) === Function.prototype);
        //true
    }
}

//2---Object.setPrototypeOf()
{
    //为参数对象设置原型，返回参数对象
    //它接受2个参数：第一个是现有对象，第二个是原型对象
    var a = {};
    var b = {
        x: 1
    };
    Object.setPrototypeOf(a, b);
    console.log('[setPrototypeOf]---', Object.getPrototypeOf(a) === b);
    //true
    console.log('[setPrototypeOf]---', a.x);
    //1
    //上面代码中，Object.setPrototypeOf方法将对象a的原型，设置为对象b，因此a可以共享b的属性
    //new命令可以使用Object.setPrototypeOf方法模拟
    {
        var F = function () {
            this.foo = 'foo';
        };
        var f = new F();
        //等同于
        var f_2 = Object.setPrototypeOf({}, F.prototype);
        F.call(f_2);
        //上面代码中，new命令新建实例对象，其实可以分成2不=步
        //第一步：将一个空对象的原型设为构造函数的prototype属性(上例是F.prototype)
        //第二步：将构造函数内部的this绑定这个空对象，然后执行构造函数，使得定义在this上面的方法和属性(上例是this.foo)，都转移到这个空对象上
    }
}

//3---Object.create()
{
    //生成实例对象的常用方法是：使用new命令让构造函数返回一个实例
    //但是，很多时候，只能拿到一个实例对象，它可能根本不是由构造函数生成的
    //JavaScript提供了Object.create方法：从一个实例对象，生成另一个实例对象
    //该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象，该实例完全继承原型对象的属性
    //原型对象
    var A = {
        print: function () {
            console.log('[create]--- hello');
        }
    };
    //实例对象
    var B = Object.create(A);
    console.log('[create]---', Object.getPrototypeOf(B) === A);
    //true
    B.print();
    //'hello'
    console.log('[create]---', B.print === A.print);
    //true
    //上面代码中，Object.create方法以A对象为原型，生成了B对象；B继承了A的所有属性和方法
    //实际上，Object.create方法可以用下面的代码代替
    {
        if (typeof Object.create !== 'function') {
            Object.create = function (obj) {
                function F() {}
                F.prototype = obj;
                return new F();
            }
        }
        //上面代码表明，Object.create方法的实质是新建一个空的构造函数F
        //然后让F.prototype属性指向参数对象obj
        //最后返回一个F的实例，从而实现让该实例继承obj的属性
    }
    //下面3中方式生成的新对象是等价的
    {
        var obj_1 = Object.create({});
        var obj_2 = Object.create(Object.prototype);
        var obj_3 = new Object();
    }
    //如果想要生成一个不继承任何属性(比如没有toString和valueOf方法)的对象，可以将Object.create的参数设为null
    {
        var obj = Object.create(null);
        console.log('[create]---不继承任何属性', obj.valueOf);
        //undefined
        //上面代码中，对象obj的原型是null，它就不具备一些定义在Object.prototype对象上面的属性，比如valueOf方法
    }
    //使用Object.create方法的时候，必须提供原型对象，即参数不能为空，或者不是对象，否则会报错
    {
        try {
            Object.create();
        } catch (e) {
            console.log('[create]---参数为空', e);
        }
        //TypeError: Object prototype may only be an Object or null: undefined
        try {
            Object.create(123);
        } catch (e) {
            console.log('[create]---参数不是对象', e);
        }
        //TypeError: Object prototype may only be an Object or null: 123
    }
    //Object.create方法生成的新对象，动态继承了原型；在原型上添加或修改任何方法，会立刻反映在新对象之上
    {
        var obj_1 = {
            p: 1
        };
        var obj = Object.create(obj_1);
        console.log('[create]---在原型上修改', obj_1.p);
        //1
        obj_1.p = 2;
        console.log('[create]---在原型上修改', obj_1.p);
        //2
    }
    //除了对象的原型，Object.create方法还可以接受第二个参数
    {
        //该参数是一个属性描述对象，它所描述的对象属性，会添加到实例对象，作为该对象自身的属性
        var obj = Object.create({}, {
            p_1: {
                value: 123,
                enumerable: true,
                configurable: true,
                writable: true
            },
            p_2: {
                value: 'abc',
                enumerable: true,
                configurable: true,
                writable: true
            }
        });
        //等同于
        obj = Object.create({});
        obj.p_1 = 123;
        obj.p_2 = 'abc';
    }
    //Object.create方法生成的对象，继承了它的原型对象的构造函数
    {
        function Constr_a() {}
        var a = new Constr_a();
        var b = Object.create(a);
        console.log('[create]---继承了它的原型对象的构造函数', b.constructor === Constr_a);
        //true
        console.log('[create]---继承了它的原型对象的构造函数', b instanceof Constr_a);
        //true
        //上面代码中，b对象的原型是a对象，因此继承了a对象的构造函数Constr_a
    }
}

//4---Object.isPrototypeOf()
{
    //实例对象的isPrototypeOf方法，用来判断该对象是否为参数对象的原型
    var o_1 = {};
    var o_2 = Object.create(o_1);
    var o_3 = Object.create(o_2);
    console.log('[isPrototypeOf]---', o_1.isPrototypeOf(o_3));
    //true
    console.log('[isPrototypeOf]---', o_2.isPrototypeOf(o_3));
    //true
    //上面代码中，o_1和o_2都是o_3的原型
    //这表明只要实例对象处在参数对象的原型链上，isPrototypeOf方法都返回true
    console.log('[isPrototypeOf]---{}', Object.prototype.isPrototypeOf({}));
    //true
    console.log('[isPrototypeOf]---[]', Object.prototype.isPrototypeOf([]));
    //true
    console.log('[isPrototypeOf]---RegExp', Object.prototype.isPrototypeOf(/xyz/));
    //true
    console.log('[isPrototypeOf]---', Object.prototype.isPrototypeOf(Object.create(null)));
    //false
    console.log('[isPrototypeOf]---null', Object.prototype.isPrototypeOf(null));
    //false
    //上面代码中，由于Object.prototype处于原型链的最顶端，所以对各种实例都返回true
    //只有直接继承自null的对象除外
}

//5---Object.prototype.__proto__
{
    //实例对象的__proto__属性(前后各2个下划线)，返回该对象的原型；该属性可读写
    var obj = {};
    var p = {};
    obj.__proto__ = p;
    console.log('[__proto__]---', Object.getPrototypeOf(obj) === p);
    //true
    //根据语言标准，__proto__属性只有浏览器才需要部署，其他环境可以没有这个属性
    //它前后的2根下划线，表明它本质是一个内部属性，不应该对使用者暴露
    //因此，应该尽量少用这个属性，而是用Object.getPrototypeOf()和Object.setPrototypeOf()，进行原型对象的读写操作
    //原型链可以用__proto__很直观地表示
    {
        var a = {
            name: 'damon'
        };
        var b = {
            name: 'stefan'
        };
        var proto = {
            print: function () {
                console.log('[__proto__]---name =', this.name);
            }
        };
        a.__proto__ = proto;
        b.__proto__ = proto;
        a.print();
        //'damon'
        b.print();
        //'stefan'
        console.log('[__proto__]---print', a.print === b.print);
        //true
        console.log('[__proto__]---print', a.print === proto.print);
        //true
        console.log('[__proto__]---print', a.print === proto.print);
        //true
        //上面代码中，a对象和b对象的原型都是proto对象，它们都共享proto对象的print
        //也就是说，a和b的print方法都是在调用proto对象的print方法
    }
}

//6---获取原型对象方法的比较
{
    //__proto__属性指向当前对象的原型对象，即构造函数的prototype属性
    {
        var obj = new Object();
        console.log('[获取原型对象方法]---', obj.__proto__ === Object.prototype)
        //true
        console.log('[获取原型对象方法]---', obj.__proto__ === obj.constructor.prototype)
        //true
        //上面代码首先创建了一个对象obj，它的__proto__属性指向构造函数的prototype属性
    }
    //获取实例对象obj的原型对象，有3种方法
    {
        //方法---1---obj.__proto__
        //方法---2---obj.constructor.prototype
        //方法---3---Object.getPrototypeOf(obj)
        //上面3种方法之中，前2种都不是很可靠
        //__proto__属性只有浏览器才需要部署，其他环境可以不部署
        //obj.constructor.prototype在手动改变原型对象时，可能会失效
        var P = function () {};
        var p = new P();
        var C = function () {};
        C.prototype = p;
        var c = new C();
        console.log('[获取原型对象方法]---构造函数', c.constructor === p.constructor);
        //true
        console.log('[获取原型对象方法]---构造函数', p.constructor === P);
        //true
        console.log('[获取原型对象方法]---构造函数', P.constructor.prototype === Function.prototype);
        //true
        console.log('[获取原型对象方法]---原型', c.constructor.prototype === P.prototype);
        //true
        console.log('[获取原型对象方法]--原型', c.constructor.prototype === Object.getPrototypeOf(p));
        //true
        console.log('[获取原型对象方法]---原型', c.constructor.prototype === p);
        //false
        //上面代码中，构造函数C的原型对象被改成了p，但是实例对象的c.constructor.prototype却没有指向p
        //所以，在改变原型对象时，一般要同时设置constructor属性
        C.prototype = p;
        C.prototype.constructor = C;
        var c = new C();
        console.log('[获取原型对象方法]---原型', c.constructor.prototype === p);
        //true
        console.log('[获取原型对象方法]---', P.prototype);
        //{}
        console.log('[获取原型对象方法]---', P.prototype.constructor);
        //function () {}
        console.log('[获取原型对象方法]---', P.prototype.constructor === P);
        //true
        console.log('[获取原型对象方法]---', Object.getPrototypeOf(P.prototype) === Object.prototype);
        //true
        console.log('[获取原型对象方法]---', Object.prototype.constructor);
        //function Object() { [native code] }
    }
    //因此，推荐使用第三种Object.getPrototypeOf方法，获取原型对象
}

//7---Object.getOwnPropertyNames()
{
    //返回一个数组，成员是参数对象本身的所有属性的键名，不包含继承的属性键名
    //对象本身的属性之中，有的是可以遍历的，有的是不可以遍历的
    //Object.getOwnPropertyNames方法返回所有键名，不管是否可以遍历
    //Object.keys方法返回可以遍历的属性的键名
}

//8---Object.prototype.hasOwnProperty()
{
    //对象实例的hasOwnProperty方法返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上
    console.log('[hasOwnProperty]---', Date.hasOwnProperty('length'));
    //true
    //length：构造函数Date可以接受多少个参数，是自身的属性
    console.log('[hasOwnProperty]---', Date.hasOwnProperty('toString'));
    //false
    //toString：是继承的属性
    //另外，hasOwnProperty方法是JavaScript之中唯一一个处理对象属性时，不会遍历原型链的方法
}

//9---in运算符和for...in循环
{
    //in运算符：返回一个布尔值，表示一个对象是否具有某个属性；它不区分该属性是对象自身的属性，还是继承的属性
    {
        console.log('[in]---', 'length' in Date);
        //true
        console.log('[in]---', 'toString' in Date);
        //true
        //in运算符常用于检查一个属性是否存在
    }
    //获得对象的所有可遍历属性(不管是自身的还是继承的)，可以使用for...in循环
    {
        var o_1 = {
            p_1: 123
        };
        var o_2 = Object.create(o_1, {
            p_2: {
                value: 'abc',
                enumerable: true
            }
        });
        for (let p in o_2) {
            console.log('[for...in]---', p);
        }
        //p_2
        //p_1
    }
    //为了在for...in循环中获得对象自身的属性，可以采用hasOwnProperty方法判断一下
    //获得对象的所有属性(不管是自身的还是继承的，也不管是否可枚举)，可以使用下面的函数
    function inherited_property_names(obj) {
        var props = {}
        while (obj) {
            Object.getOwnPropertyNames(obj).forEach(function (p) {
                props[p] = true;
            });
            obj = Object.getPrototypeOf(obj);
        }
        return Object.getOwnPropertyNames(props);
    }
}

//10---对象的拷贝
{
    //如果要拷贝一个对象，需要做到下面2件事情
    {
        //确保拷贝后的对象，与原对象具有同样的原型
        //确保拷贝后的对象，与原对象具有同样的实例属性
    }

    function copy_object(orig) {
        var copy = Object.create(Object.getPrototypeOf(orig));
        copy_own_properties_from(copy, orig);
        return copy;
    }

    function copy_own_properties_from(target, source) {
        Object
            .getOwnPropertyNames(source)
            .forEach(function (prop_key) {
                var desc = Object.getOwnPropertyDescriptor(source, prop_key);
                Object.defineProperty(target, prop_key, desc);
            });
        return target;
    }
    //另一种更简单的写法，利用ES2017才引入标准的Object.getOwnPropertyDescriptors方法
    function easier_copy_object(orig) {
        return Object.create(
            Object.getPrototypeOf(orig),
            Object.getOwnPropertyDescriptors(orig)
        );
    }
}
//---Object对象

//1---概述
{
    //JavaScript的所有其他对象都继承自Object对象，即那些对象都是Object的实例
    //Object对象的原生方法分为2类：Object对象本身的方法和Object的实例方法
    //1.1---Object对象本身的方法(静态方法)
    {
        //本身的方法：直接定义在Object对象的方法
        Object.print = function (o) {
            console.log(o);
        }
    }
    //1.2---Object的实例方法
    {
        //实例方法：定义在Object原型对象Object.prototype上的方法
        //它可以被Object实例直接使用
        Object.prototype.print = function () {
            console.log(this);
        }
        var obj = new Object();
        obj.print(); //{}
        //上面代码中
        //Object.prototype定义了一个print方法
        //生成一个实例obj
        //obj直接继承了Object.prototype的属性和方法，可以直接使用obj.print调用print方法
        //即obj的print方法实质上就是调用Object.prototype.print方法
    }
}

//2---Object()：将任意值转为对象
{
    //Object本身是一个函数，可以当作工具方法使用，将任意值转为对象
    //这个方法常用于保证某个值一定是对象
    //如果参数为空、或为undefined、或为null，Object()返回一个空对象
    var obj = Object();
    console.log('[Object()]---', obj); //{}
    obj = Object(undefined);
    console.log('[Object(undefined)]---', obj); //{}
    obj = Object(null);
    console.log('[Object(null)]---', obj); //{}
    console.log('[Object(null)]---', obj instanceof Object); //true
    //instanceof：验证一个对象是否为指定的构造函数的实例
    //如果参数是一个原始类型的值，Object方法将其转为对应的包装对象的实例
    {
        obj = Object(1);
        console.log('[Object(数值)]---', obj); //[Number: 1]
        console.log('[Object(数值)]---', obj instanceof Object); //true
        console.log('[Object(数值)]---', obj instanceof Number); //true
        obj = Object('foo');
        console.log('[Object(字符串)]---', obj); //[String: 'foo']
        console.log('[Object(字符串)]---', obj instanceof Object); //true
        console.log('[Object(字符串)]---', obj instanceof String); //true
        obj = Object(true);
        console.log('[Object(布尔值)]---', obj); //[Boolean: true]
        console.log('[Object(布尔值)]---', obj instanceof Object); //true
        console.log('[Object(布尔值)]---', obj instanceof Boolean); //true
    }
    //如果参数是一个对象，它总是返回该对象，即不用转换
    {
        var arr = [];
        console.log('[Object(数组)]---', [] === arr); //false
        obj = Object(arr);
        console.log('[Object(数组)]---', obj === arr); //true
        var value = {};
        obj = Object(value);
        console.log('[Object(对象)]---', obj === value); //true
        var fn = function () {};
        obj = Object(fn);
        console.log('[Object(函数)]---', obj === fn); //true
    }
    //判断变量是否为对象
    function is_object(value) {
        return value === Object(value)
    }
    console.log('[Object()---[]是否为对象]', is_object([])); //true
    console.log('[Object()---true是否为对象]', is_object(true)); //false
}

//3---Object构造函数：生成一个新对象
{
    //Object不仅可以当作工具函数使用，还可以当作构造函数使用(使用new命令)
    //Object构造函数的首要用途：生成新对象
    var obj = new Object();
    //等价，简写形式
    obj = {};
    //构造函数的用法与工具方法很相似，几乎一模一样
    //使用时，可以接受一个参数
    //如果该参数是一个对象，则直接返回这个对象
    var obj_1 = {
        a: 1
    };
    var obj_2 = new Object(obj_1);
    console.log('[Object构造函数---]', obj_1 === obj_2); //true
    //如果该参数是一个原始类型的值，则返回该值对应的包装对象
    obj = new Object(123);
    console.log('[Object构造函数---]', obj instanceof Number); //true
}

// 4 --- Object 的静态方法
// 静态方法：指部署在 Object 对象自身的方法
{
    // 4.1 --- Object.keys() 和 Object.getOwnPropertyNames()
    {
        // Object.keys() 和 Object.getOwnPropertyNames() ：用来遍历对象的属性
        // Object.keys 方法的参数是一个对象，返回一个数组；该包含了该对象自身的(而不是继承的)所有属性名
        var obj = {
            p_1: 123,
            p_2: 456
        };
        console.log('[Object的静态方法]---', Object.keys(obj)); //[ 'p_1', 'p_2' ]
        // Object.getOwnPropertyNames() 方法的参数是一个对象，返回一个数组，包含了该对象自身的所有属性名
        console.log('[Object的静态方法]---', Object.getOwnPropertyNames(obj)); //[ 'p_1', 'p_2' ]
        // 区别：
        var arr = ['hello', 'world'];
        // Object.keys() ：只返回可枚举的属性名
        console.log('[Object的静态方法]---', Object.keys(arr)); //[ '0', '1' ]
        // Object.getOwnPropertyNames() ：返回可枚举的属性名 + 不可枚举的属性名
        console.log('[Object的静态方法]---', Object.getOwnPropertyNames(arr)); //[ '0', '1', 'length' ]
        // 数组的length属性是不可枚举的属性
        // 由于 JavaScript 没有提供计算对象属性个数的方法，所以可以用这两个方法代替
        console.log('[Object的静态方法]---', Object.keys(obj).length); //2
        console.log('[Object的静态方法]---', Object.getOwnPropertyNames(obj).length); //2
        // 一般情况下，几乎总是使用Object.keys方法，遍历数组的属性
    }
    //4.2---其他方法
    {
        //4.2.1---对象属性模型的相关方法
        {
            //Object.getOwnPropertyDescriptor()：获取某个属性的描述对象
            //Object.defineProperty()：通过描述对象，定义某个属性
            //Object.defineProperties()：通过描述对象，定义多个属性
        }
        //4.2.2---控制对象状态的方法
        {
            //Object.preventExtensions()：防止对象扩展
            //Object.isExtensible()：判断对象是否可扩展
            //Object.seal()：禁止对象配置
            //Object.isSeald()：判断一个对象是否可配置
            //Object.freeze()：冻结一个对象
            //Object.isFrozen()：判断一个对象是否被冻结
        }
        //4.2.3---原型链相关方法
        {
            //Object.create()：该方法可以指定原型对象和属性，返回一个新的对象
            //Object.getPrototypeOf()：获取对象的Prototype对象
        }
        // 4.2.4 --- 合并对象
        {
            // Object.assign(target, spurce1, ..., sourceN)
            // 将源对象(source)的所有可枚举自身属性，复制到目标对象(target)
            // 参数 target ：目标对象
            // 可选参数 source ：源对象
            // 返回值 ：目标对象
            // 只有 target 参数时， 直接返回 target 参数
            {
                var target = {
                    a: 1
                };
                console.log('[assign]---only target', Object.assign(target)); // { a: 1 }
            }
            // 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
            {
                var target = {
                    a: 1
                };
                var source1 = {
                    a: 2,
                    b: {
                        name: 'bb',
                        value: 11
                    }
                };
                var source2 = {
                    a: 3
                };
                console.log('[assign]---同名属性', Object.assign(target, source1, source2)); // { a: 3, b: { name: 'bb', value: 11 } }
            }
            // 实行的是浅拷贝；如果源对象的某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用
            {
                // 对于这种嵌套对象，一旦遇到同名属性，处理方法是替换
                var target = {
                    a: 0
                };
                var source1 = {
                    a: {
                        name: 'a1',
                        value: 1
                    }
                };
                var source2 = {
                    a: {
                        name: 'a2',
                        value: 2
                    }
                };
                var value = Object.assign(target, source1, source2);
                console.log('[assign]---浅拷贝 value', value); // { a: { name: 'a2', value: 2 } }
                source1.a = 10;
                console.log('[assign]---浅拷贝 value', value); // { a: { name: 'a2', value: 2 } }
                value.a.value = 22;
                console.log('[assign]---浅拷贝 source2', source2); // { a: { name: 'a2', value: 22 } }
                source2.a.value = 222;
                console.log('[assign]---浅拷贝 value', value); // { a: { name: 'a2', value: 222 } }
                source2 = {};
                console.log('[assign]---浅拷贝 value', value); // { a: { name: 'a2', value: 222 } }
                value.a.value = 22;
                console.log('[assign]---浅拷贝 source2', source2); // {}
            }
        }
    }
}

//5---Object的实例方法
//实例方法：定义在Object.prototype对象上的方法
//所有Object的实例对象都继承了这些方法
//Object实例对象的方法，主要有以下6个：
{
    //5.1---Object.prototype.valueOf()：返回当前对象对应的值
    {
        //默认情况下，返回对象本身
        var obj = new Object();
        var value = obj.valueOf();
        console.log('[Object的实例方法]---valueOf', value); //{}
        console.log('[Object的实例方法]---valueOf', value === obj); //true
        //valueOf方法的主要用途：JavaScript自动类型转换时会默认调用这个方法
        console.log('[Object的实例方法]---valueOf', 1 + value); //"1[object Object]"
        obj.valueOf = function () {
            return 2;
        };
        console.log('[Object的实例方法]---valueOf', 1 + value); //3
        //上面代码自定义了obj对象的valueOf方法，覆盖了Object.prototype.valueOf
    }
    //5.2---Object.prototype.toString()：返回当前对象对应的字符串形式
    {
        //默认情况下，返回类型字符串，该字符串说明对象的类型
        var o_1 = new Object();
        console.log('[Object的实例方法]---toString', o_1.toString()); //"[object Object]"
        var o_2 = {
            a: 1
        };
        console.log('[Object的实例方法]---toString', o_2.toString()); //"[object Object]"
        //字符串[object Object]本身没太大的用处，但是通过自定义toString方法，可以让对象在自动类型转换时，得到想要的字符串形式
        var obj = new Object();
        obj.toString = function () {
            return 'hello';
        };
        console.log('[Object的实例方法]---toString', obj + ' world'); //"hello world"
        //上面代码表示，当对象用于字符串加法时，会自动调用toString方法
        //数组、字符串、函数、Date对象都分别部署了自定义的toString方法，覆盖了Object.prototype.toString方法
        console.log('[Object的实例方法]---toString', [1, 2, 3].toString()); //"1,2,3"        
        console.log('[Object的实例方法]---toString', '123'.toString()); //"123"        
        console.log('[Object的实例方法]---toString', (function () {
            return 321;
        }).toString()); //"function () { return 321; }"
        console.log('[Object的实例方法]---toString', (new Date()).toString()); //"Mon Jan 28 2019 14:35:33 GMT+0800 (中国标准时间)"        
        //toString()的应用：判断数据类型
        {
            //"[object Object]"：其中第二个Object表示该值的构造函数；这是一个十分有用的判断数据类型的方法
            //由于实例对象可能会自定义toString方法，覆盖掉Object.prototype.toString方法
            //所以为了得到类型字符串，最好直接使用Object.prototype.toString方法
            //通过函数的call方法，可以在任意值上调用这个方法
            console.log('[Object的实例方法]---toString', Object.prototype.toString.call(0)); //"[object Number]"     
            console.log('[Object的实例方法]---toString', Object.prototype.toString.call('')); //"[object String]"       
            console.log('[Object的实例方法]---toString', Object.prototype.toString.call(true)); //"[object Boolean]"      
            console.log('[Object的实例方法]---toString', Object.prototype.toString.call(undefined)); //"[object Undefined]"      
            console.log('[Object的实例方法]---toString', Object.prototype.toString.call(null)); //"[object Null]" 
            console.log('[Object的实例方法]---toString', Object.prototype.toString.call([])); //"[object Array]"   
            console.log('[Object的实例方法]---toString', Object.prototype.toString.call(function () {})); //"[object Function]"    
            console.log('[Object的实例方法]---toString', Object.prototype.toString.call(new Error())); //"[object Error]"   
            console.log('[Object的实例方法]---toString', Object.prototype.toString.call(new Date())); //"[object Date]" 
            console.log('[Object的实例方法]---toString', Object.prototype.toString.call(new RegExp())); //"[object RegExp]"       
            console.log('[Object的实例方法]---toString', Object.prototype.toString.call(Math)); //"[object Math]"
            let print_arguments = function () {
                console.log('[Object的实例方法]---toString', Object.prototype.toString.call(arguments)); //"[object Arguments]"                
            };
            print_arguments();
            //其他对象：返回"[object Object]"   
        }
    }
    //5.3---Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式
    {
        //与toString的返回结果相同，也是返回一个值的字符串形式
        var obj = {};
        console.log('[Object的实例方法]---toLocaleString', obj.toLocaleString()); //"[object Object]"
        //这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的toLocaleString，用来返回针对某些地域的特定的值
        var person = {
            toString: function () {
                return 'damon';
            },
            toLocaleString: function () {
                return '达蒙';
            }
        }
        console.log('[Object的实例方法]---toLocaleString', person.toString()); //"damon"
        console.log('[Object的实例方法]---toLocaleString', person.toLocaleString()); //"达蒙"
        //目前，主要有三个对象自定了toLocaleString方法
        {
            //Array.prototype.toLocaleString
            //Number.prototype.toLocaleString
            //Date.prototype.toLocaleString
            var date = new Date();
            console.log('[Object的实例方法]---toLocaleString', date.toString()); //"Mon Jan 28 2019 15:34:50 GMT+0800 (中国标准时间)"
            console.log('[Object的实例方法]---toLocaleString', date.toLocaleString()); //"2019-1-28 15:34:50"
        }
        //toLocaleString的返回值跟用户设定的所在地域相关
    }
    //5.4---Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性
    {
        //接受一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性
        var obj = {
            p: 1
        };
        console.log('[Object的实例方法]---hasOwnProperty', obj.hasOwnProperty('p')); //true
        console.log('[Object的实例方法]---hasOwnProperty', obj.hasOwnProperty('toString')); //false
        //上面代码中，对象obj自身具有p属性，所以返回true
        //toString属性是继承的，所以返回false
    }
    //5.5---Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型
    //5.6---Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举
}
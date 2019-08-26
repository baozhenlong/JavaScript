// --- 对象

// 1 --- 概述
{
    // 1.1 --- 生成方法
    {
        // 对象 (object) 是 JavaScript 语言的核心概念，也是最重要的数据类型
        // 对象：一组"键值对"的集合，是一种无序的复合数据集合
        // 创建 Object 类型实例的方式
        // 方式 1 --- 使用 new + 构造函数
        var obj = new Object();
        // 方式 2 --- 使用对象字面量表示法（定义对象的简写形式）
        var obj = {
            foo: 'hello',
            bar: 'world'
        };
        // 上面代码中，大括号就定义了一个对象，它被赋值给变量 obj ，所以变量 obj 就指向一个对象
        // 该对象内部包含 2 个键值对（又称为 2 个"成员"）
        // foo、bar：键名；成员的名称
        // "hello"、"world"：键值；成员的值
        // 键名与键值之间用冒号 (:) 分隔
        // 键值对之间用逗号 (,) 分隔
    }
    // 1.2 --- 键名
    {
        // 对象的所有键名都是字符串（ ES6又引入了 Symbol 值也可以作为键名 ） ，所以加不加引号都可以
        // 上述等价声明
        var obj = {
            'foo': 'hello',
            'bar': 'world'
        };
        // 如果键名是数值，会被自动转为字符串
        var obj = {
            1: 'a',
            1e2: 'b',
            .234: true,
            0xff: true
        };
        console.log('obj = ', obj);
        // obj = {
        //     '1': 'a',
        //     '100': 'b',
        //     '255': true,
        //     '0.234': true
        // }
        // 如果键名不符合标识名的条件（比如第一个字符为数字，或者含有空格或运算符），且也不是数字，则必须加上引号，否则会报错
        var obj = {
            // 1p: 'hello', // 报错
            '1p': 'hello'
        };
        // 对象的每一个键名又称为"属性"，它的键值可以是任何数据类型
        // 如果一个属性的值为函数，通常把这个属性称为"方法"，它可以像函数那样调用
        var obj = {
            p: function (x) {
                return 2 * x;
            }
        };
        console.log(obj.p(1)); // 2
        // 如果属性的值还是一个对象，就形成了链式引用
        var obj1 = {};
        var obj2 = {
            bar: 'hello'
        };
        obj1.foo = obj2;
        console.log(obj1.foo.bar); // hello
        // 上面代码中，对象 obj1 的属性 foo 指向对象 obj2 ，就可以链式引用 obj2 的属性
        // 对象的属性之间用逗号(,)分隔，最后一个属性后面可以加逗号，也可以不加
        // 属性可以动态创建，不必在对象声明时就指定
        var obj = {};
        obj.foo = 123;
        console.log(obj.foo); // 123
    }
    // 1.3 --- 对象的引用
    {
        // 如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址
        // 修改其中一个变量，会影响到其他所有变量
        var obj_1 = {};
        var obj_2 = obj_1;
        obj_1.a = 1;
        console.log(obj_2.a); // 1
        obj_2.b = 2;
        console.log(obj_1.b) // 2
        // 此时，如果取消一个变量对于原对象的引用，不会影响到另一个变量
        obj_2 = 2;
        console.log(obj_1); //{ a: 1, b: 2 }
        // 但是这种引用只局限于对象，如果 2 个变量指向同一个原始类型的值，那么，变量这时都是值的拷贝
        var x = 1;
        var y = x;
        y = 2;
        console.log('x = ', x); //1
        console.log('y = ', y); //2
    }
    // 1.4 --- 表达式还是语句？
    {
        // 行首 {} ： V8 引擎规定为对象；但在 eval 语句（对字符串求值）中理解为一个代码块
        // 行首 ({}) ： V8 引擎规定为对象；在 eval 语句理解为对象
        console.log(eval('{foo: 123}')); // 123
        console.log(eval('({foo: 123})')); // { foo: 123 }
    }
}

// 2 --- 属性的操作
{
    // 2.1 --- 属性的读取
    {
        // 读取对象的属性，有 2 种方法：使用点运算符 (.) 和使用方括号 ([]) 运算符
        var obj = {
            p: 'hello'
        };
        console.log(obj.p); //hello
        console.log(obj['p']); //hello
        // 注意：如果使用方括号运算符，键名必须放在引号里面，否则会被当作变量处理
        var p_name = 'p';
        console.log(obj[p_name]); //hello
        // 使用点运算符，p是字符串
        // 使用方括号运算符，并不使用引号，p_name是一个变量
        // 方括号内部还可以使用表达式
        obj['1' + '2'] = 12;
        console.log(obj[12]); //12
        obj[1 + 2] = 3;
        console.log(obj[3]); //3
        // 数字键可以不加引号，因为会自动转成字符串
        // 注意：数值键名不能使用点运算符（会被当成小数点），只能使用方括号运算符
    }
    // 2.2 --- 属性的赋值
    {
        // 点运算符和方括号运算符，不仅可以用来读取值，还可以用来赋值
        var obj = {};
        obj.foo = 'hello';
        obj['bar'] = 'world';
        // JavaScript 允许属性的"后绑定"，即可以在任意时刻新增属性，没必要在定义对象的时候，就定义好属性
        // 等价于
        var obj_2 = {
            foo: 'hello',
            bar: 'world'
        };
    }
    // 2.3 --- 属性的查看
    {
        // 2.3.1 --- Object.keys(obj)
        {
            // 以任意顺序遍历一个对象本身的可枚举属性
            // 参数 obj (Object) ：要返回其枚举自身属性的对象
            // 返回值 (Array[String]) ：一个表示给定对象的所有可枚举属性的字符串数组；这些属性的顺序与手动遍历时一致(for...in)
            // 简单数组
            {
                var arr = ['a', 'b', 'c'];
                console.log(JSON.stringify(Object.keys(arr))); // ['0', '1', '2']
            }
            // 属性像数组下标的对象
            {
                var obj = {
                    '0': 'a',
                    '1': 'b',
                    '2': 'c'
                };
                console.log(JSON.stringify(Object.keys(obj))); // ['0', '1', '2']
            }
            // 属性随机排序的对象
            {
                var anObj = {
                    '100': 'a',
                    '2': 'b',
                    '7': 'c'
                };
                console.log(JSON.stringify(Object.keys(anObj))); // ['2', '7', '100']
            }
        }
        // 2.3.2 --- for...in 循环
        {
            // for (let key in obj)
            // 用来遍历一个对象的全部属性
            // key ：在每次迭代时，将不同的属性名分配变量
            // obj ：被迭代枚举其属性的对象
            var obj = {
                a: 1,
                b: 2,
                c: 3
            };
            for (var key in obj) {
                console.log('[for...in]---key = ', key);
                console.log('[for...in]---value = ', obj[key]);
            }
            // [for...in]---key =  a
            // [for...in]---value =  1
            // [for...in]---key =  b
            // [for...in]---value =  2
            // [for...in]---key =  c
            // [for...in]---value =  3
            // 注意：
            {
                // 它遍历的是对象所有可遍历(Enumerrable)的属性，会跳过不可遍历的属性
                // 它不仅遍历对象自身的属性，还遍历继承的属性
                // 只想遍历对象自身的属性，结合使用 hasOwnProperty() 方法，在循环内部判断，某个属性是否对象自身的属性
            }
            var person = {
                name: 'damon'
            };
            for (var key in person) {
                if (person.hasOwnProperty(key)) {
                    console.log(key); // name
                }
            }
        }
    }
    // 2.4 --- 属性的删除： delete 命令
    {
        // object.delete(property) 用于删除对象的属性，删除成功后返回 true
        // 参数 property --- 要删除的属性
        // 返回值 --- 对于所有情况都是 true， 除非属性是一个不可配置的属性，在这种情况下，非严格模式返回 false
        var obj = {
            p: 1
        };
        console.log('[delete]---', Object.keys(obj)); // [ 'p' ]
        console.log('[delete]---', delete obj.p); // true
        console.log('[delete]---', obj.p); // undefined
        console.log('[delete]---', Object.keys(obj)); // []
        // 注意：删除一个不存在的属性， 非严格模式下 delete 不报错，而且返回 true
        var obj_2 = {};
        console.log('[delete]---', delete obj_2.p); // true
        // 因此不能根据 delete 命令的结果，认定某个属性是存在的
        // 只有一种情况， delete 命令会返回 false ，那就是该属性存在，且不得删除
        var obj_3 = Object.defineProperty({}, 'p', {
            value: 123,
            configurable: false //属性不可删除
        });
        console.log('[delete]---', delete obj_3.p); // false
        // 注意： delete 命令只能删除对象本身的属性，无法删除继承的属性
        var obj_4 = {};
        console.log('[delete]---', delete obj_4.toString); // true
        console.log('[delete]---', obj_4.toString); // function toString() { [native code] }
        // toString 是对象obj_4继承的属性，虽然 delete 命令返回 true ，但该属性并没有被删除，依然存在
        // 即使 delete 返回 true ，该属性依然可能读取到值
    }
    //2.5---属性是否存在：in运算符
    {
        //in运算符用于检查对象是否包含某个属性(注意：检查的是键名，不是键值)
        //如果包含就返回true，否则返回false
        //它的左边是一个字符串，表示属性名，右边是一个对象
        var obj = {
            p: 1
        };
        console.log('[in]---', ('p' in obj)); //true
        console.log('[in]---', ('toString' in obj)); //true
        //in运算符的一个问题：它不能识别哪些属性是对象自身的，哪些属性是继承的
        //这时，可以使用对象的hasOwnProperty()方法判断一下，是否为对象自身的属性
        if ('toString' in obj) {
            console.log('[in]---', obj.hasOwnProperty('toString')); //false
        }
    }
}

// 3 --- with语句
{
    //格式
    // with(对象){
    //     语句;
    // }
    //作用：操作用一个对象的多个属性时，提供一些书写的方便
    var obj = {
        p_1: 1,
        p_2: 2,
    };
    with(obj) {
        p_1 = 3;
        p_2 = 4;
    };
    console.log('[with]---', obj.p_1); //3
    console.log('[with]---', obj.p_2); //4
    //等价于
    obj.p_1 = 5;
    obj.p_2 = 6;
    console.log('[with]---', obj.p_1); //5
    console.log('[with]---', obj.p_2); //6
    //注意：如果with区块内部有变量赋值操作，必须是当前对象已经存在的属性，否则会创造一个当前作用域的全局变量
    var obj_2 = {};
    with(obj_2) {
        p = 1;
    };
    console.log('[with]---', obj_2.p); //undefined
    console.log('[with]---', p); //1
    //这是因为with区块没有改变作用域，它的内部依然是当前作用域
    //这就造成了with语句的一个很大的弊病，就是绑定对象不明确
    with(obj) {
        console.log('[with]---', x); //1；前面的定义
    }
    //单从上面的代码块，根本无法判断x是全局变量，还是obj的一个属性
    //这非常不利于代码的除错和模块化，编译器也无法对这段代码进行优化，只能留到运行时判断，这就拖慢了运行速度
    //因此，建议不要使用with语句，可以考虑使用一个临时变量代替with
    var obj_3 = {
        x: {
            y: {
                z: 3
            }
        }
    };
    with(obj_3.x.y) {
        console.log('[with]---', z); //3
    }
    //可以写成
    var temp = obj_3.x.y;
    console.log('[with]---', temp.z); //3
}
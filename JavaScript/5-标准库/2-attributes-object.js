// --- 属性描述对象

// 1 --- 概述
{
    // JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等
    // 这个内部数据结构称为：属性描述对象
    // 每个属性都有自己对应的属性描述对象，保存该属性的一些元信息
    // 属性描述对象提供 6 个元属性
    {
        var attributesObj = {
            value: 123,
            // 表示该属性的属性值，默认为 undefined
            writable: false,
            // 表示属性值是否可写，是一个布尔值，默认为 true
            enumerable: true,
            // 表示该属性是否可遍历，是一个布尔值，默认为 true
            // 如果设为 false ，会使得某些操作( 比如 for...in 循环、 Object.keys() )跳过该属性
            configurable: false,
            // 表示可配置性，是一个布尔值，默认为 true
            // 如果设为 false ，将阻止某些操作改写属性，比如无法删除该属性，也不得改变该属性的属性描述对象( value 属性除外 )
            // configurable 属性控制了属性描述对象的可写性
            get: undefined,
            // 表示该属性的取值函数(getter)，是一个函数，默认为 undefined
            set: undefined
            // 表示该属性的存值函数(setter)，是一个函数，默认为 undefined
        };
    }

    // ECMAScript 中有两种属性：数据属性和访问器属性
    {
        // 数据属性
        {
            // 包含一个数据值的位置，在这个位置可以读取和写入值
            // 数据属性的 4 个描述其行为的特性
            // 特性 ---1--- [[Configurable]]
            {
                // 表示能否通过 delete 删除属性，从而重新定义属性
                // 表示能否修改属性的特性
                // 表示能否把属性修改为访问器属性
                // 默认值为 true
            }
            // 特性 ---2--- [[Enumerable]]
            {
                // 表示能否通过 for...in 循环返回属性（对象的枚举属性）
                // 默认值为 true
            }
            // 特性 ---3--- [[Writable]]
            {
                // 表示能否修改属性的值
                // 默认值为 true
            }
            // 特性 ---4--- [[Value]]
            {
                // 包含这个属性的数据值
                // 读取属性时，从这个位置读
                // 写入属性时，把新值保存在这个位置
                // 默认值为 undefined
            }
        }

        // 访问器属性
        {
            // 不包含数据值，包含一对 getter 和 setter 函数（这两个函数不是必需）
            // 在读取访问器属性时，会调用 getter 函数，这个函数负责返回有效的值
            // 在写入访问器属性时，会调用 setter 函数，并传入新值，这个函数负责决定如何处理数据
            // 访问器的 4 个 特性
            // 特性 ---1--- [[Configurable]]
            {
                // 表示能否通过 delete 删除属性，从而重新定义属性
                // 表示能否修改属性的特性
                // 或者能否把属性改为访问器属性
            }
            // 特性 ---2--- [[Enumerable]]
            {
                // 表示能否通过 for...in 循环返回属性（对象的枚举属性）
            }
            // 特性 ---3--- [[Get]]
            {
                // 在读取属性时调用的函数，默认值为 undefined
            }
            // 特性 ---4--- [[Set]]
            {
                // 在写入属性时调用的函数，默认值为 undefined
            }
            // 访问器属性不能直接定义，必须使用 Object.defineProperty() 来定义
            // 例子---使用访问器属性的常见方式：设置一个属性的值，会导致其他属性发生变化
            {
                let book = {
                    // 定义两个默认属性
                    _year: 2004, // _下划线表示只能通过对象方法访问的属性
                    edition: 1
                };
                // 定义一个访问器属性
                Object.defineProperty(book, 'year', {
                    get() {
                        console.log('[get]---_year', this._year);
                        return this._year;
                    },
                    set(value) {
                        if (value > this._year) {
                            console.log('[set]---value', value);
                            this._year = value;
                            this.edition += value - 2004;
                        }
                    }
                });
                // year 和 _year 是两个不同的属性
                book.year = 2006; // set 2006
                console.log('[访问器属性]---edition', book.edition); // 3
                console.log('[访问器属性]---year', book.year); // get 2006
            }
        }
    }
}

// 2 --- Object.getOwnPropertyDescriptor(obj, propertyName)
{
    // 获取属性的描述对象
    // 参数 obj ：属性所在的对象
    // 参数 propertyName ：要读取其描述对象的属性名称
    // 返回值 ：obj
    var obj = {
        p: 'a'
    };
    // 如果是数据属性，这个对象的属性有 configurable 、 enumerable 、 writable 、 value
    {
        console.log('[getOwnPropertyDescriptor]---数据属性', Object.getOwnPropertyDescriptor(obj, 'p'));
        // value: 'a',
        // writable: true,
        // enumerable: true,
        // configurable: true
    }
    // 如果是访问器属性，这个对象的属性有 configurable 、 enumerable 、 get 、 set
    {
        Object.defineProperty(obj, 'msg', {
            get() {},
            set(value) {}
        });
        console.log('[getOwnPropertyDescriptor]---访问器属性', Object.getOwnPropertyDescriptor(obj, 'msg'));
        // get: [Function: get],
        // set: [Function: set],
        // enumerable: false,
        // configurable: false
    }
    // 注意：getOwnPropertyDescriptor方法只能用于对象自身的属性，不能用于继承的属性
    console.log('[getOwnPropertyDescriptor]---自身属性', Object.getOwnPropertyDescriptor(obj, 'toString'));
    // undefined
}

//3---Object.getOwnPropertyNames()
{
    //返回一个数组，成员是参数对象自身的全部属性的属性名，不管该对象是否可遍历
    var obj = Object.defineProperties({}, {
        p_1: {
            value: 1,
            enumerable: true
        },
        p_2: {
            value: 2,
            enumerable: true
        }
    });
    console.log('[getOwnPropertyNames]---', Object.getOwnPropertyNames(obj));
    //[ 'p_1', 'p_2' ]
    //这跟Object.keys的行为不同，Object.keys只返回对象自身的可遍历属性的全部属性名
    console.log('[getOwnPropertyNames]---', Object.keys([]));
    //[]
    console.log('[getOwnPropertyNames]---', Object.getOwnPropertyNames([]));
    //[ 'length' ]
    //上面代码中，数组自身的length属性是不可遍历的，Object.keys不会返回该属性
}

// 4 --- Object.defineProperty() , Object.defineProperties()
{
    // 4.1 --- defineProperty(obj, propName, descriptor)
    {
        // 允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象
        // 参数 obj (Obejct) ：属性所在的对象
        // 参数 propName (String) ：属性名
        // 参数 descriptor ：属性描述对象；描述对象必须是 Configurable 、 Enumerable 、 Writable 、 Value 中的一个或多个
        // 返回值 ：obj
        // 如果属性已存在，相当于更新该属性的属性描述对象
        var obj = Object.defineProperty({}, 'p', {
            value: 123,
            writable: false,
            enumerable: true,
            configurable: false
        });
        console.log('[defineProperty]---', obj.p); // 123
        obj.p = 456;
        console.log('[defineProperty]---', obj.p); // 123
    }

    // 4.2 --- defineProperties(obj, descriptors)
    {
        // 一次性定义或修改多个属性
        // 参数 obj ：需要添加或修改属性的对象
        // 参数 descriptors ：包含一个或多个属性描述对象；每个描述对象描述一个数据属性或访问器属性
        // 返回值 obj
        obj = Object.defineProperties({}, {
            p1: {
                value: 123,
                enumerable: true
            },
            p2: {
                value: 'abc',
                enumerable: true
            },
            p3: {
                get: function () {
                    return this.p_1 + this.p_2;
                },
                enumerable: true,
                configurable: true
            }
        });
        console.log('[defineProperties]---', obj.p1); // 123
        console.log('[defineProperties]---', obj.p2); // "abc"
        console.log('[defineProperties]---', obj.p3); // "123abc"
    }
    // 注意：一旦定义了取值函数 get 或存值函数 set ，就不能将 writable 属性设为 true 或同时定义 value 属性，否则会报错
    // defineProperty 和 defineProperties 参数里面的属性描述对象， writable 、 configurable 、 enumerable 这 3 个属性的默认值都为 false
    Object.defineProperty(obj, 'foo', {});
    console.log('[defineProperty]---', Object.getOwnPropertyDescriptor(obj, 'foo'));
    // { 
    //     value: undefined,
    //     writable: false,
    //     enumerable: false,
    //     configurable: false 
    // }
}

//5---Object.prototype.propertyIsEnumerable()
{
    //返回一个布尔值，用来判断某个属性是否可遍历
    //注意：这个方法只能用于判断自身的属性，对于继承的属性一律返回false
    var obj = {};
    obj.p = 123;
    console.log('[propertyIsEnumerable]---', obj.propertyIsEnumerable('p'));
    //true
    console.log('[propertyIsEnumerable]---', obj.propertyIsEnumerable('toString'));
    //false
}

//6---元属性
{
    //属性描述对象的各个属性称为"元属性"，因为它们可以看作是控制属性的属性
    //6.1---value
    {
        //value属性：是目标属性的值
        var obj = {};
        obj.p = 123;
        console.log('[元属性]---value', Object.getOwnPropertyDescriptor(obj, 'p').value);
        //123
        Object.defineProperty(obj, 'p', {
            value: 246
        });
        console.log('[元属性]---value', obj.p);
        //246
    }
    //6.2---writable
    {
        //writable属性：是一个布尔值，决定了目标属性(value)是否可以被改变
        var obj = {};
        Object.defineProperty(obj, 'a', {
            value: 37,
            writable: false
        });
        console.log('[元属性]---writable', obj.a);
        //37
        obj.a = 25;
        console.log('[元属性]---writable', obj.a);
        //37
        //注意：正常模式下，对writable为false的属性赋值不会报错，只会默默失败
        //但是，严格模式下会报错，即使对a属性重新赋予一个同样的值
        //如果原型对象的某个属性的writable为false，那么子对象将无法自定义这个属性
        var proto = Object.defineProperty({}, 'foo', {
            value: 'a',
            writable: false
        });
        obj = Object.create(proto);
        obj.foo = 'b';
        console.log('[元属性]---writable', obj.foo);
        //"a"
        //上面代码中，proto是原型对象，它的foo属性不可写
        //obj对象继承proto，也不可以再自定义这个属性了；如果是严格模式，这样做还会抛出一个错误
        //规避方法：通过覆盖属性描述对象，绕过这个限制；原因是这种情况下，原型链会被完全忽视
        obj = Object.create(proto);
        Object.defineProperty(obj, 'foo', {
            value: 'b'
        });
        console.log('[元属性]---writable', obj.foo);
        //"b"
    }
    //6.3---enumerable
    {
        //enumerable属性：表示目标属性是否可遍历，返回一个布尔值
        //JavaScript规定toString这一类实例对象继承的原生属性，都是不可遍历的
        //如果一个属性的enumerable为false，下面3个操作不会取到该属性
        //for...in循环、Object.keys方法、JSON.stringify方法
        var obj = {};
        Object.defineProperty(obj, 'x', {
            value: 123,
            enumerable: false
        });
        console.log('[enumerable]---', obj.x);
        //123
        for (var key in obj) {
            console.log('[enumerable]---', key);
        }
        console.log('[enumerable]---', Object.keys(obj));
        //[]
        console.log('[enumerable]---', JSON.stringify(obj));
        //{}
        //注意：for...in循环包括继承的属性；Object.keys方法不包括继承的属性
        //如果需要获取对象自身的所有属性，不管是否可遍历，可以使用Object.getOwnPropertyNames方法
    }
    //6.4---configurable
    {
        //configurable属性：可配置性，返回一个布尔值，决定了是否可以修改属性描述对象
        //当configurable为false时，value、writable、enumerable、configurable都不能被修改了
        var obj = Object.defineProperty({}, 'p', {
            vlaue: 1,
            writable: false,
            enumerable: false,
            configurable: false
        });
        try {
            Object.defineProperty(obj, 'p', {
                value: 2
            });
        } catch (e) {
            console.log('[configurable]---', e);
            //TypeError: Cannot redefine property: p
        }
        try {
            Object.defineProperty(obj, 'p', {
                writable: true
            });
        } catch (e) {
            console.log('[configurable]---', e);
            //TypeError: Cannot redefine property: p
        }
        try {
            Object.defineProperty(obj, 'p', {
                enumerable: true
            });
        } catch (e) {
            console.log('[configurable]---', e);
            //TypeError: Cannot redefine property: p
        }
        try {
            Object.defineProperty(obj, 'p', {
                configurable: true
            });
        } catch (e) {
            console.log('[configurable]---', e);
            //TypeError: Cannot redefine property: p
        }
        console.log('[configurable]---注意');
        //注意：
        {
            //writable：只有在false改为true会报错，true改为false是允许的
            {
                var obj = Object.defineProperty({}, 'p', {
                    writable: true,
                    configurable: false
                });
                Object.defineProperty(obj, 'p', {
                    writable: false
                });
                console.log('[configurable]---writable 修改成功');
            }
            //value：只要writable和configurable有一个为true，就允许改动
            {
                var obj = Object.defineProperty({}, 'p', {
                    value: 1,
                    writable: true,
                    configurable: false
                });
                Object.defineProperty(obj, 'p', {
                    value: 2
                });
                console.log('[configurable]---value 修改成功', obj.p);
                //2
                var obj = Object.defineProperty({}, 'p', {
                    value: 1,
                    writable: false,
                    configurable: true
                });
                Object.defineProperty(obj, 'p', {
                    value: 3
                });
                console.log('[configurable]---value 修改成功', obj.p);
                //3
            }
            //另外：configurable为false时，直接给目标属性赋值，不报错，但不会成功
            {
                var obj = Object.defineProperty({}, 'p', {
                    value: 1,
                    configurable: false
                });
                console.log('[configurable]---另外', Object.getOwnPropertyDescriptor(obj, 'p').writable);
                //false
                obj.p = 2;
                console.log('[configurable]---另外', obj.p);
                //1
                //上面代码中，obj.p的configurable为false，对obj.p赋值是不会生效的；如果是严格模式，还会报错
            }
        }
        //可配置性决定了目标属性是否可以被删除
        {
            var obj = Object.defineProperties({}, {
                p_1: {
                    value: 1,
                    configurable: true
                },
                p_2: {
                    value: 2,
                    configurable: false
                },
            });
            console.log('[configurable]---删除属性', delete obj.p_1);
            //true
            console.log('[configurable]---删除属性', delete obj.p_2);
            //如果属性是一个自己不可配置的属性，非严格模式会返回false；严格模式会抛出异常
            console.log('[configurable]---删除属性', obj.p_1);
            //undefined
            console.log('[configurable]---删除属性', obj.p_2);
            //2
        }
    }
}

//7---存取器
{
    //除了直接定义以外，属性还可以用存取器定义
    //存值函数：setter，使用属性描述对象的set属性
    //取值函数：getter，使用属性描述对象的get属性
    //一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数
    //利用这个功能，可以实现许多高级特性，比如某个属性禁止赋值
    var obj = Object.defineProperty({}, 'p', {
        get: function () {
            return 'getter';
        },
        set: function (value) {
            console.log('[存取器]---', value);
        }
    });
    console.log('[存取器]---', obj.p);
    //"getter"
    obj.p = 123;
    //123
    //上面代码中，obj.p定义了get和set属性
    //obj.p取值时，就会调用get；赋值时，就会调用set
    //JavaScript还提供了存取器的另外一种写法
    obj = {
        get p() {
            return 'getter';
        },
        set p(value) {
            console.log('[存取器]---', value);
        }
    };
    //上面的写法与定义属性描述对象时等价的，而且使用更广泛
    //注意：取值函数get不能接受参数，存值函数set只能接受一个参数(即属性的值)
    //存取器往往用于：属性的值依赖对象内部数据的场合
    obj = {
        $n: 5,
        get next() {
            return this.$n++;
        },
        set next(n) {
            if (n >= this.$n) {
                this.$n = n;
            } else {
                throw new Error('新的值必须大于当前值');
            }
        }
    };
    console.log('[存取器]---', obj.next);
    //5
    obj.next = 10;
    console.log('[存取器]---', obj.next);
    //10
    console.log('[存取器]---', obj.next);
    //11
    //上面代码中，next属性的存值函数和取值函数，都依赖于内部属性$n
}

//8---对象的拷贝
{
    var extend = function (to, from) {
        for (var property in from) {
            to[property] = from[property];
        }
        return to;
    };
    console.log('[对象的拷贝]---', extend({}, {
        a: 1
    }));
    //{ a: 1 }
    //上面这个方法的问题在于，如果遇到存取器定义的属性，会只拷贝值
    console.log('[对象的拷贝]---', extend({}, {
        get a() {
            return 1;
        }
    }));
    //{ a: 1 }
    //为了解决这个问题，可以通过Object.defineProperty方法来拷贝属性
    extend = function (to, from) {
        for (var property in from) {
            if (from.hasOwnProperty(property)) {
                Object.defineProperty(
                    to,
                    property,
                    Object.getOwnPropertyDescriptor(from, property)
                );
            }
        }
        return to;
    };
    console.log('[对象的拷贝]---', extend({}, {
        get a() {
            return 1;
        }
    }));
    //{ a: [Getter] }
    //上面代码中，hasOwnProperty用来过滤掉继承的属性，否则可能会报错，因为 Object.getOwnPropertyDescriptor读不到继承属性的属性描述对象
}

//9---控制对象状态
{
    //有时需要冻结对象的读写状态，防止对象被改变
    //JavaScript提供了3种冻结方法，最弱的一种是Object.preventExtensions，其次是Object.seal，最强的是Object.freeze
    //9.1---Object.preventExtensions()
    {
        //使得一个对象无法再添加新的属性
        var obj = new Object();
        Object.preventExtensions(obj);
        try {
            Object.defineProperty(obj, 'p', {
                value: 'hello'
            });
        } catch (e) {
            console.log('[控制对象状态]---preventExtensions', e);
            //TypeError: Cannot define property p, object is not extensible
        }
        obj.p = 1;
        console.log('[控制对象状态]---preventExtensions', obj.p);
        //undefined
    }
    //9.2---Object.isExtensible()
    {
        //用于检查一个对象是否使用了Object.preventExtensions；即检查是否可以为一个对象添加属性
        var obj = new Object();
        console.log('[控制对象状态]---isExtensible', Object.isExtensible(obj));
        //true
        Object.preventExtensions(obj);
        console.log('[控制对象状态]---isExtensible', Object.isExtensible(obj));
        //false
    }
    //9.3---Object.seal()
    {
        //使得一个对象既无法添加新的属性，也无法删除旧属性
        var obj = {
            p: 'hello'
        };
        Object.seal(obj);
        obj.x = 'world';
        console.log('[控制对象状态]---seal', obj.x);
        //undefined
        delete obj.p;
        console.log('[控制对象状态]---seal', obj.p);
        //hello
        //实质：把属性描述对象的 configurable属性设为false，因此属性描述对象不能再改变了
        obj = {
            p: 'a'
        };
        console.log('[控制对象状态]---seal', Object.getOwnPropertyDescriptor(obj, 'p'));
        // { 
        //     value: 'a',
        //     writable: true,
        //     enumerable: true,
        //     configurable: true 
        // }
        Object.seal(obj);
        console.log('[控制对象状态]---seal', Object.getOwnPropertyDescriptor(obj, 'p'));
        // { 
        //     value: 'a',
        //     writable: true,
        //     enumerable: true,
        //     configurable: false 
        // }
        //Object.seal只是禁止新增或删除属性，并不影响修改某个属性的值
        obj.p = 'b';
        console.log('[控制对象状态]---seal', obj.p);
        //'b'
    }
    //9.4---Object.isSealed()
    {
        //用于检查一个对象是否使用了Object.isSeal方法
        var obj = {
            p: 'a'
        };
        Object.seal(obj);
        console.log('[控制对象状态]---isSealed', Object.isSealed(obj));
        //true
        console.log('[控制对象状态]---isSealed', Object.isExtensible(obj));
        //false
    }
    //9.5---Object.freeze()
    {
        //使得一个对象无法添加新属性、无法删除旧属性、无法修改属性的值
        //使得这个对象实际上变成了常量
        var obj = {
            p: 'hello'
        };
        Object.freeze(obj);
        obj.p = 'world';
        console.log('[控制对象状态]---freeze', obj.p);
        //hello
        obj.t = 'world';
        console.log('[控制对象状态]---freeze', obj.t);
        //undefined
        console.log('[控制对象状态]---freeze', delete obj.p);
        //false
        console.log('[控制对象状态]---freeze', obj.p);
        //hello
        //上面代码中，对obj对象进行了Object.freeze()以后，修改属性、新增属性、删除属性都无效了
        //这些操作并不报错，只是默默地失败；如果在严格模式下，则会报错
    }
    //9.6---Object.isFrozen()
    {
        //用于检查一个对象是否使用了Object.freeze方法
        var obj = {
            p: 'hello'
        };
        Object.freeze(obj);
        console.log('[控制对象状态]---isFrozen', Object.isFrozen(obj));
        //true
        console.log('[控制对象状态]---isFrozen', Object.isSealed(obj));
        //true
        console.log('[控制对象状态]---isFrozen', Object.isExtensible(obj));
        //false
        //一个用途：确保某个对象没有被冻结后，再对它的属性赋值
    }
    //9.7---局限性
    {
        //上面的3个锁定对象的可写性有一个漏洞：可以通过改变原型对象，来为对象增加属性
        var obj = new Object();
        Object.preventExtensions(obj);
        var proto = Object.getPrototypeOf(obj);
        console.log('[局限性]---', Object.getPrototypeOf({}));
        //{}
        console.log('[局限性]---', proto);
        //{}
        proto.t = 'hello';
        console.log('[局限性]---', obj.t);
        //'hello'
        delete proto.t;
        //重置原型
        //上面代码中，对象obj本身不能新增属性，但是可以在它的原型对象上新增属性，就依然能够在obj读到
        //一种解决方案是，把obj的原型也冻结住
        obj = new Object();
        Object.preventExtensions(obj);
        proto = Object.getPrototypeOf(obj);
        Object.preventExtensions(proto);
        proto.t = 'hello';
        console.log('[局限性]---', proto.t);
        //undefined
        //另外一个局限是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容
        obj = {
            foo: 1,
            bar: ['a', 'b']
        };
        Object.freeze(obj);
        obj.bar.push('c');
        console.log('[局限性]---', obj.bar);
        //[ 'a', 'b', 'c' ]
        //上面代码中，obj.bar属性指向一个数组，obj对象被冻结以后，这个指向无法改变，即无法指向其他值
        //但是所指向的数组是可以改变的
    }
}
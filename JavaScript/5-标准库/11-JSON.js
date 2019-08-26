// JSON对象

// 1 --- JSON 格式
{
    // JSON格式 ( JavaScript Object Notation 的缩写 )：是一种用于数据交换的文本格式
    // 相比于 XML 格式， JSON 格式有 2 个显著的优点：
    // 书写简单，一目了然
    // 符合 JavaScript 原生语法，可以由解释引擎直接处理，不用另外添加解析代码
    // 每个 JSON 对象就是一个值，可能是一个数组或对象，也可能是一个原始类型的值；总之，只能是一个值，不能是 2 个或更多的值
    // JSON 对值的类型和格式有严格的规定：
    {
        // 1 ：复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象
        // 2 ：原始类型的值只有四种：字符串、数值(必须以十进制表示)、布尔值、 null ；不能使用 NaN 、 Infinity 、 -Infinity 、 undefined
        // 3 ：字符串必须使用双引号表示，不能使用单引号
        // 4 ：对象的键名必须放在双引号里面
        // 5 ：数组或对象最后一个成员不能加逗号
    }
    //以下都是合法的 JSON
    var arr = ["one", "two", "three"];
    var obj = {
        "one": 1,
        "two": 2,
        "three": 3
    };
    // 注意： null 、 [] 、 {} 都是合法的 JSON 值
}

// 2 --- JSON 对象
{
    // JSON 对象：是 JavaScript 的原生对象，用来处理 JSON 格式数据
    // 有 2 个静态方法： JSON.stringify() 、 JSON.parse()
}

// 3 --- JSON.stringify()
{
    // 3.1 --- 基本用法
    {
        // 用于将一个值转为 JSON 字符串；该字符串符合 JSON 格式，并且可以被 JSON.parse 方法还原
        // 将各种类型的值，转成 JSON 字符串
        {
            console.log('[stringify]---基本用法', JSON.stringify('abc')); // ""abc""
            console.log('[stringify]---基本用法', JSON.stringify(1)); // "1"
            console.log('[stringify]---基本用法', JSON.stringify(false)); // "false"
            console.log('[stringify]---基本用法', JSON.stringify([])); // "[]"
            console.log('[stringify]---基本用法', JSON.stringify({})); // "{}"
            console.log('[stringify]---基本用法', JSON.stringify([1, 'false', false])); // '[1,"false",false]'
            console.log('[stringify]---基本用法', JSON.stringify({
                name: '张三'
            })); // '{"name":"张三"}'
        }
        // 注意对于原始类型的字符串，转换结果会带双引号
        {
            console.log('[stringify]---基本用法', JSON.stringify('foo') === 'foo'); // false
            console.log('[stringify]---基本用法', JSON.stringify('foo') === '\"foo\"'); // true
            console.log('[stringify]---基本用法', JSON.stringify(false)); // "false"
            console.log('[stringify]---基本用法', JSON.stringify('false')); // '\"false\"'
        }
        // 如果对象的属性是 undefined 、函数、 XML 对象，该属性会被 JSON.stringify 过滤
        {
            var obj = {
                a: undefined,
                b: function () {},
            };
            console.log('[stringify]---基本用法', JSON.stringify(obj)); // '{}'
        }
        // 如果数组成员是 undefined 、函数、 XML 对象，则这些值被转成 null
        {
            var arr = [undefined, function () {}];
            console.log('[stringify]---基本用法', JSON.stringify(arr)); // '[null,null]'
        }
        // 正则对象会被转成空对象
        {
            console.log('[stringify]---基本用法', JSON.stringify(/foo/)); // '{}'
        }
        // JSON.stringify 方法会忽略对象的不可遍历的属性
        {
            var obj = {};
            Object.defineProperties(obj, {
                foo: {
                    value: 1,
                    enumerable: true
                },
                bar: {
                    value: 2,
                    enumerable: false
                }
            });
            console.log('[stringify]---基本用法', JSON.stringify(obj)); // '{"foo":1}'
        }
    }
    // 3.2 --- 第二个参数
    {
        // 当第二个参数是数组：指定需要转成字符串的属性
        {
            var obj = {
                prop1: 1,
                prop2: 2,
                prop3: 3
            };
            var selectedProperties = ['prop1', 'prop2'];
            console.log('[stringify]---第二个参数 数组', JSON.stringify(obj, selectedProperties)); // '{"prop1":1,"prop2":2}'
            // 这个类似白名单的数组，只对对象的属性有效，对数组无效
            console.log('[stringify]---第二个参数 数组', JSON.stringify(['0', '1'], ['0'])); // '["0","1"]'
            console.log('[stringify]---第二个参数 数组', JSON.stringify({
                '0': 0,
                '1': 1
            }, ['0'])); // '{"0":0}'
        }
        // 当第二个参数是函数：用来更改 JSON.stringify 的返回值
        {
            // 该函数接受 2 个参数：被转换的对象的键名和键值
            console.log('[stringify]---第二个参数 函数', JSON.stringify({
                a: 1,
                b: 2
            }, function (key, value) {
                console.log('key =', key, 'value = ', value);
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            }));
            //key =  value =  { a: 1, b: 2 }
            //key = a value =  1
            //key = b value =  2
            //'{"a":2,"b":4}'
            //注意：该函数是递归处理所有的键
            {
                console.log('[stringify]---第二个参数 函数', JSON.stringify({
                    a: {
                        b: 1
                    }
                }, function (key, value) {
                    console.log('key =', key, 'value = ', value);
                    return value;
                }));
                //key =  value =  { a: { b: 1 } }
                //key = a value =  { b: 1 }
                //key = b value =  1
                //{"a":{"b":1}}
                //上面代码中，对象一共被函数处理3次
                //第一次键名为空，键值为整个对象{ a: { b: 1 } }
                //第二次键名为a，键值为{ b: 1 }
                //第三次键名为b，键值为1
            }
            //递归处理中，每一次处理的对象，都是前一次返回的值
            function f(key, value) {
                let type = typeof value;
                if (type === 'number') {
                    return 123;
                }
                if (type === 'object') {
                    return {
                        b: 1
                    };
                }
            }
            console.log('[stringify]---第二个参数 函数', JSON.stringify(1, f));
            //'123'
            console.log('[stringify]---第二个参数 函数', JSON.stringify({
                a: 1
            }, f));
            //'{"b":123}'
            //如果处理函数返回undefined或没有返回值，则该属性会被忽略
            console.log('[stringify]---第二个参数 函数', JSON.stringify({
                a: 'a',
                b: 123,
                c: true
            }, function (key, value) {
                let type = typeof value;
                if (type === 'object' || type === 'boolean') {
                    return value;
                }
                if (type === 'string') {
                    return undefined;
                }
                if (type === 'number') {}
            }));
            //'{"c":true}'
        }
    }
    //3.3---第三个参数
    {
        //用于增加返回的JSON字符串的可读性
        //如果是数字：表示每个属性前面添加的空格(最多不超过10个)
        console.log(JSON.stringify({
            p_1: 1,
            p_2: 2
        }, null, 4));
        // {
        //     "p_1": 1,
        //     "p_2": 2
        // }
        //如果是字符串(不超过10个字符)：则该字符串会添加在每行前面
        console.log(JSON.stringify({
            p_1: 1,
            p_2: 2
        }, null, '|-|-|'));
        // {
        // |-|-|"p_1": 1,
        // |-|-|"p_2": 2
        // }
    }
    //3.4---参数对象的toJSON方法
    {
        //如果参数对象有自定义的toJSON方法，那么JSON.stringify会使用这个方法的返回值作为参数，而忽略原对象的其他的属性
        //普通对象
        var user = {
            first_name: '三',
            last_name: '张',
            get full_name() {
                return this.last_name + this.first_name;
            }
        };
        console.log('[stringify]---toJSON', JSON.stringify(user));
        //'{"first_name":"三","last_name":"张","full_name":"张三"}'
        //添加toJSON方法
        user.toJSON = function () {
            return {
                name: this.last_name + this.first_name
            };
        };
        console.log('[stringify]---toJSON', JSON.stringify(user));
        //'{"name":"张三"}'
        //toJSON方法的一个应用：将正则对象自动转为字符串
        //因为JSON.stringify默认不能转换正则对象，但设置了toJSON方法以后，就可以转换正则对象了
        var obj = {
            reg: /foo/
        };
        console.log('[stringify]---toJSON', JSON.stringify(obj));
        //{"reg":{}}
        RegExp.prototype.toJSON = RegExp.prototype.toString;
        console.log('[stringify]---toJSON', JSON.stringify(obj));
        //'{"reg":"/foo/"}'
    }
}

//4---JSON.parse()
{
    //用于将JSON字符串转成对应的值
    {
        console.log('[parse]---', JSON.parse('{}'));
        //{}
        console.log('[parse]---', JSON.parse('true'));
        //true
        console.log('[parse]---', JSON.parse('"foo"'));
        //'foo'
        console.log('[parse]---', JSON.parse('[1, 5, "false"]'));
        //[ 1, 5, 'false' ]
        console.log('[parse]---', JSON.parse('null'));
        //null
        console.log('[parse]---', JSON.parse('{"name":"张三"}'));
        //{ name: '张三' }
    }
    //如果传入的字符串不是有效的JSON格式，JSON.parse方法将报错
    {
        try {
            JSON.parse("'String'");
        } catch (e) {
            console.log('[parse]---err');
        }
        //err
    }
    //JSON.parse方法可以接受一个处理函数，作为第二个参数，用法与JSON.stringify方法类似
    console.log('[parse]---', JSON.parse('{"a":1,"b":2}', function (key, value) {
        console.log('key =', key, 'value =', value);
        if (key === 'a') {
            return value + 10;
        }
        return value;
    }));
    // key = a value = 1
    // key = b value = 2
    // key =  value = { a: 11, b: 2 }
    //{ a: 11, b: 2 }
}
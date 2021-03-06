// --- Array 对象

// 1--- 构造函数
{
    // Array 是 JavaScript 的原生对象，同时也是一个构造函数，可以用它生成新的数组
    var arr = new Array(2);
    console.log('[构造函数]---', arr.length); // 2
    console.log('[构造函数]---', arr); // [ <2 empty items> ]
    // 上面代码中，参数 2 表示生成一个 2 个成员的数组，每个位置都是空值
    // 等同于
    arr = Array(2); // 把构造函数当作函数调用，不使用 new 运算符时，它的行为与使用 new 运算符调用它时的行为完全一样
    // Array 构造函数有一个很大的缺陷，就是不同的参数，会导致它的行为不一致
    {
        // 无参数时，返回一个空数组
        {
            console.log('[构造函数]---缺陷 无参数', new Array()); // []
        }
        // 单个正整数参数或 0 ，表示返回的新数组的长度
        {
            console.log('[构造函数]---缺陷 单个正整数参数', new Array(0));
            //[]
            console.log('[构造函数]---缺陷 单个正整数参数', new Array(1));
            //[ <1 empty item> ]
            console.log('[构造函数]---缺陷 单个正整数参数', new Array(2));
            //[ <2 empty item> ]
        }
        // 非正整数的数值作为参数，会报错
        {
            try {
                new Array(-1); // 或 3.2 等
            } catch (e) {
                console.log('[构造函数]---缺陷  非正整数的数值参数', e); // RangeError: Invalid array length
            }
        }
        // 单个非数值（比如字符串、布尔值、对象等）作为参数，则该参数是返回的新数组的成员
        {
            console.log('[构造函数]---缺陷 单个非数值参数', new Array('abc')); // [ 'abc' ]
            console.log('[构造函数]---缺陷 单个非数值参数', new Array([1])); // [ [ 1 ] ]
        }
        // 多参数时，所有参数都是返回的新数组的成员
        {
            console.log('[构造函数]---缺陷', new Array(1, 2)); // [ 1, 2 ]
            console.log('[构造函数]---缺陷', new Array('a', 'b', 'c')); // [ 'a', 'b', 'c' ]
        }
    }
    // 可以看到， Array 作为构造函数，行为很不一致
    // 因此，不建议使用它生成新数组，直接使用数组字面量是更好的做法
    // 注意
    {
        // 如果参数是一个正整数或 0 （有效的数组长度），返回数组的成员都是空位
        // 虽然读取的时候返回 undefined ，但实际上该位置没有任何值
        // 虽然可以取到 length 属性，但取不到键名
        var a = new Array(3);
        var b = [undefined, undefined, undefined];
        console.log('[构造函数]---注意', a); // [ <3 empty items> ]
        console.log('[构造函数]---注意', b); // [ undefined, undefined, undefined ]
        console.log('[构造函数]---注意', a.length); // 3
        console.log('[构造函数]---注意', b.length); // 3
        console.log('[构造函数]---注意', a[0]); // undefined
        console.log('[构造函数]---注意', b[0]); // undefined
        console.log('[构造函数]---注意', 0 in a); // false
        console.log('[构造函数]---注意', 0 in b); // true
        // 上面代码中， a 是一个长度为 3 的空数组， b 是一个 3 个都是 undefined 的数组
        // 读取键值的时候， a 和 b 都返回 undefined ；但是 a 的键位是空的， b 的键位是有值的
    }
}

// 2 --- 静态方法
{
    // 2.1 --- Array.isArray(value)
    {
        // 返回一个布尔值，表示参数 value 是否为数组；它可以弥补 typeof 运算符的不足
        var arr = [1, 2, 3];
        console.log('[静态方法]---isArray', typeof arr); // 'object'
        console.log('[静态方法]---isArray', Array.isArray(arr)); // true
    }
}

// 3 --- 实例方法
{
    //3.1---valueOf()，toString()
    {
        //valueOf：是一个所有对象都拥有的方法，表示对该对象求值
        {
            //不同对象的valueOf方法不尽一致，数组的valueOf方法返回数组本身
            var arr = [1, 2, 3];
            console.log('[实例方法]---valueOf', arr.valueOf());
            //[ 1, 2, 3 ]
            console.log('[实例方法]---valueOf', [1].valueOf());
            //[ 1 ]
        }
        //toString：也是对象的通用方法，数组的toString方法返回数组的字符串形式
        {
            console.log('[实例方法]---toString', arr.toString());
            //'1,2,3'
            arr = [1, 2, 3, [4, 5, 6]];
            console.log('[实例方法]---toString', arr.toString());
            //'1,2,3,4,5,6'
            console.log('[实例方法]---toString', [1].toString());
            //'1'
            console.log('[实例方法]---toString', [].toString() === '');
            //true
        }
    }
    // 3.2 --- push() ， pop()
    {
        // push(ele, ele2, ..., eleX)
        // 用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度
        // 注意：该方法会改变原数组
        // 参数 ele1, ele2, eleX --- 要添加到数组的多个元素
        // 返回值 --- 数组的新长度
        {
            var arr = [];
            console.log('[实例方法]---push', arr.push(1)); // 1
            console.log('[实例方法]---push', arr.push('a')); // 2
            console.log('[实例方法]---push', arr.push(true, {})); // 4
            console.log('[实例方法]---push', arr); // [ 1, 'a', true, {} ]
        }
        // pop()
        // 用于删除数组的最后一个元素，并返回该元素；减少数组的 length - 1
        // 如果数组是空的，那么 pop() 方法将不进行任何操作，返回 undefined 值
        // 注意：该方法会改变原数组
        {
            var arr = ['a', 'b', 'c'];
            console.log('[实例方法]---pop', arr.pop()); // 'c'
            console.log('[实例方法]---pop', arr); // [ 'a', 'b' ]
            // 对空数组使用 pop 方法，不会报错，而是返回 undefined
            console.log('[实例方法]---pop', [].pop()); // undefined
        }
        // push 和 pop 结合使用，就构成了"后进先出"的栈结构
        {
            var arr = [];
            arr.push(1, 2);
            arr.push(3);
            arr.pop();
            console.log('[实例方法]---后进先出', arr); // [ 1, 2 ]
        }
    }
    // 3.3 --- shift() ， unshift()
    {
        // unshift(ele1, ele2, ..., eleX)
        // 用于在数组的第一个位置添加一个或多个元素，并返回添加新元素后的数组长度
        // 该方法把参数插入到数组的头部，并将已经存在的元素顺次地移到较高的下标处
        // 注意：该方法会改变原数组
        // 参数 ele1, ele2, eleX --- 要添加到数组开头的多个元素
        // 返回值 --- 数组的新长度
        {

            var arr = ['a'];
            console.log('[实例方法]---unshift', arr.unshift('x'));
            //2
            console.log('[实例方法]---unshift', arr.unshift('z', 'y'));
            //4
            console.log('[实例方法]---unshift', arr);
            //[ 'z', 'y', 'x', 'a' ]
        }
        // shift()
        // 用于删除数组的第一个元素，并返回该元素；同时将数组的 length - 1
        // 如果数组是空的，那么 shift() 方法将不进行任何操作，返回 undefined 值
        // 注意：该方法会改变原数组
        {
            var arr = ['a', 'b', 'c'];
            console.log('[实例方法]---shift', arr.shift()); // 'a'
            console.log('[实例方法]---shift', arr); // [ 'b', 'c' ]
            // shift 方法可以遍历并清空一个数组
            var list = [1, 2, 3, 4];
            var item;
            while (item = list.shift()) {
                console.log('[实例方法]---shift', item);
                // 1
                // 2
                // 3
                // 4
            }
            console.log('[实例方法]---shift', list); // []
            // push 和 shift 结合使用，就构成了"先进先出"的队列结构
        }
    }
    // 3.4 --- join(separator)
    {
        // 以指定参数 separator 作为分隔符，将所有数组成员连接为一个字符串返回；如果不提供参数，默认用逗号分隔
        // 参数 separator (String) --- 分隔符，默认为 ','
        // 返回值 (String) --- 返回一个字符串；该字符串是通过把数组的每个元素转换为字符串，然后把这些字符串连接起来，在两个元素之间插入 separator 字符 而生成的
        var arr = [1, 2, 3, 4];
        console.log('[实例方法]---join', arr.join()); // '1,2,3,4'
        console.log('[实例方法]---join', arr.join(' ')); // '1 2 3 4'
        console.log('[实例方法]---join', arr.join('|')); // '1|2|3|4'
        //数组成员是 undefined 或 null 或 空位，会被转成空字符串
        console.log('[实例方法]---join', [undefined, null].join('#')); // '#'
        console.log('[实例方法]---join', ['a', , 'b'].join('-')); // 'a--b'
        //通过 call 方法，这个方法也可以用于字符串或类似数组的对象
        console.log('[实例方法]---join', Array.prototype.join.call('hello', '-')); // 'h-e-l-l-o'
        var obj = {
            0: 'a',
            1: 'b',
            length: 2
        };
        console.log('[实例方法]---join', Array.prototype.join.call(obj, '-')); // 'a-b'
    }
    // 3.5 --- concat(arr1, arr2, ..., arrX)
    {
        // 用于多个数组的合并
        // 它将新数组的成员（操作的是数组中的元素），添加到原数组成员的后部，然后返回一个新数组，原数组不变
        console.log('[实例方法]---concat', ['hello'].concat(['world'])); // [ 'hello', 'world' ]
        console.log('[实例方法]---concat', ['hello'].concat(['world'], ['!', '~', [1, 2, 3]]));
        // [ 'hello', 'world', '!', '~', [ 1, 2, 3 ] ]
        //除了数组作为参数，concat也接受其他类型的值作为参数，添加到目标数组的尾部
        console.log('[实例方法]---concat', [1].concat({
            a: 1
        }, 2, 3));
        // [ 1, { a: 1 }, 2, 3 ]
        // 如果数组成员包括对象， concat 方法返回当前数组的一个浅拷贝
        // 浅拷贝：指的是新数组拷贝的是对象的引用
        var obj = {
            a: 1
        };
        var old_arr = [obj];
        var new_arr = old_arr.concat();
        obj.a = 2;
        console.log('[实例方法]---concat', new_arr[0]); // { a: 2 }
        // 上面代码中，原数组包含一个对象， concat 方法生成的新数组包含这个对象的引用
        // 所以，改变原对象以后，新数组跟着改变
    }
    // 3.6 --- reverse()
    {
        // 用于颠倒排列数组元素，返回改变后的数组
        // 注意：该方法将改变原数组
        var arr = ['a', 'b', 'c'];
        arr.reverse()
        console.log('[实例方法]---reverse', arr); // [ 'c', 'b', 'a' ]
    }
    // 3.7 --- slice(start, end)
    {
        // 用于提取目标数组的一部分，返回一个新数组，原数组不变
        // 参数 start --- 起始位置；如果是负数，那么它规定从数组尾部开始算起， -1 表示最后一个元素， -2 表示倒数第二个元素，以此类推
        // 可选参数 end --- 终止位置；但该位置的元素本身不包括在内；默认值为目标数组的长度；如果是负数，那么它规定从数组尾部开始算起
        // 返回值 --- 返回一个新数组，包含从 start 到 end （不包括该元素）的目标数组中的元素
        var arr = ['a', 'b', 'c'];
        console.log('[实例方法]---slice', arr.slice(0)); // [ 'a', 'b', 'c' ]
        console.log('[实例方法]---slice', arr.slice(1)); // [ 'b', 'c' ]
        console.log('[实例方法]---slice', arr.slice(1, 2)); // [ 'b' ]
        console.log('[实例方法]---slice', arr.slice(2, 6)); // [ 'c' ]
        console.log('[实例方法]---slice', arr.slice()); // [ 'a', 'b', 'c' ]
        // slice 没有参数，实际上等于返回一个原数组的拷贝
        // 如果 slice 方法的参数是负数，则表示倒数计算的位置
        console.log('[实例方法]---slice', arr.slice(-2)); // [ 'b', 'c' ]
        // -2 表示倒数计算的第二个位置；即索引为 -2 + 3 = 1 的位置
        console.log('[实例方法]---slice', arr.slice(-2, -1)); // [ 'b' ]
        // -1 表示倒数计算的第一个位置；即索引为 -1 + 3 = 2 的位置
        // 如果第一个参数 >= 数组的长度，或者第一个参数 >= 第二个参数，则返回空数组
        console.log('[实例方法]---slice', arr.slice(4)); // []
        console.log('[实例方法]---slice', arr.slice(2, 1)); // []
        console.log('[实例方法]---slice', arr.slice(2, 2)); // []
        // 重要应用：将类似数组的对象转为真正的数组
        var obj = {
            0: 'a',
            1: 'b',
            length: 2
        };
        console.log('[实例方法]---slice', Array.prototype.slice.call(obj)); // [ 'a', 'b' ]
    }
    // 3.8 --- splice(index, howmany, item1, ..., itemX)
    {
        // 用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素
        // index --- 删除的起始位置；使用负数可以从数组结尾处规定位置
        // howmany --- 被删除的元素个数；如果设置为 0 ，则不会删除呀U尿素
        // 可选参数 item1, item2, itemX --- 表示要被插入数组的新元素
        // 返回值 --- 包含被删除元素的新数组，否则返回空数组
        //注意：该方法会改变原数组
        var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
        console.log('[实例方法]---splice', arr.splice(4, 2)); // [ 'e', 'f' ]
        console.log('[实例方法]---splice', arr); // [ 'a', 'b', 'c', 'd' ]
        arr = ['a', 'b', 'c', 'd', 'e', 'f'];
        console.log('[实例方法]---splice', arr.splice(4, 2, 1, 2)); // [ 'e', 'f' ]
        console.log('[实例方法]---splice', arr); // [ 'a', 'b', 'c', 'd', 1, 2 ]
        //起始位置如果是负数，就表示从倒数位置开始删除
        arr = ['a', 'b', 'c', 'd', 'e', 'f'];
        console.log('[实例方法]---splice', arr.splice(-4, 2)); // [ 'c', 'd' ]
        //单纯地插入元素
        arr = [1, 1, 1];
        console.log('[实例方法]---splice', arr.splice(1, 0, 2)); // []
        console.log('[实例方法]---splice', arr); // [ 1, 2, 1, 1 ]
        //如果只提供第一个参数，等同于将原数组在指定位置拆分成 2 个数组
        arr = [1, 2, 3, 4];
        console.log('[实例方法]---splice', arr.splice(2)); // [ 3, 4 ]
        console.log('[实例方法]---splice', arr); // [ 1, 2 ]
    }

    // 3.9 --- sort(func) --- 对数组排序
    {
        // 可选参数 func (Function) --- 比较函数，规定排序顺序
        // 返回值 --- 排序后的数组，在原数组上进行排序
        // 3.9.1 --- sort()
        {
            // 按照升序排列数组项：最小值位于最前面，最大值位于最后面
            // 调用每个数组项的 toString 方法，然后按照字典顺序比较得到的字符串，以确定如何排序
            console.log('[实例方法]---sort', ['d', 'c', 'b', 'a'].sort()); // [ 'a', 'b', 'c', 'd' ]
            console.log('[实例方法]---sort', [4, 3, 2, 1].sort()); // [ 1, 2, 3, 4 ]
            console.log('[实例方法]---sort', [11, 101].sort()); // [ 101, 11 ]
            console.log('[实例方法]---sort', [10111, 1101, 111].sort()); // [ 10111, 1101, 111 ]
        }
        // 3.9.2 --- sort(func)
        {
            console.log('[实例方法]---sort', [10111, 1101, 111].sort(function (a, b) {
                return a - b;
            })); // [ 111, 1101, 10111 ]
            // 上面代码中， sort 的参数函数本身接受 2 个参数，表示进行比较的 2 个数组成员
            // 如果该函数的返回值 > 0，表示第一个成员排在第二个成员后面
            // 其他情况下，都是第一个元素排在第二个元素前面
            var arr = [{
                    name: ' damon',
                    age: 30
                },
                {
                    name: 'elena',
                    age: 24
                },
                {
                    name: 'stetan',
                    age: 28
                }
            ];
            console.log('[实例方法]---sort', arr.sort(function (o_1, o_2) {
                return o_1.age - o_2.age;
            }));
            // [ 
            //     { name: 'elena', age: 24 },
            //     { name: 'stetan', age: 28 },
            //     { name: ' damon', age: 30 } 
            // ]
        }
    }

    // 3.10 --- map(callback, thisArg)
    {
        // 将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回
        // function (currentValue, index, arr)
        // 函数参数 currentValue --- 当前元素的值
        // 函数参数 index --- 当前元素的索引值
        // 函数参数 arr --- 当前元素所属的数组对象
        var numbers = [1, 2, 3];
        console.log('[实例方法]---map', numbers.map(function (n) {
            return n + 1;
        })); // [ 2, 3, 4 ]
        console.log('[实例方法]---map', numbers); // [ 1, 2, 3 ]
        console.log('[实例方法]---map', numbers.map(function (elem, index, arr) {
            return elem * index;
        })); // [ 0, 2, 6 ]
        // map 方法还可以接受第二个参数，用来绑定回调函数内部的 this 变量
        // 如果数组有空位， map 方法的回调函数在这个位置不会执行，会跳过数组的空位
        var f = function (n) {
            return 'a';
        };
        console.log('[实例方法]---map', [1, undefined, 2].map(f));
        // [ 'a', 'a', 'a' ]
        console.log('[实例方法]---map', [1, null, 2].map(f));
        // [ 'a', 'a', 'a' ]
        console.log('[实例方法]---map', [1, , 2].map(f));
        // [ 'a', <1 empty item>, 'a' ]
        // 上面代码代码中，map方法不会跳过 undefined 和 null ，但是会跳过空位
    }
    // 3.11 --- forEach(callback, thisArg)
    {
        //与 map 方法很相似，也是对数组的所有成员依次执行参数函数
        //但是，forEach 方法不返回值，只用来操作数据
        // function (currentValue, index, arr)
        // 函数参数 currentValue --- 当前元素的值
        // 函数参数 index --- 当前元素的索引值
        // 函数参数 arr --- 当前元素所属的数组对象
        function log(element, index, array) {
            console.log('[实例方法]---forEach index =', index, 'element =', element);
        }
        [1, 2].forEach(log);
        // index = 0 element = 1
        // index = 1 element = 2
        // forEach 方法也可以接受第二个参数，绑定参数函数的 this 变量
        // 注意： forEach 方法无法中断执行，总是会将所有成员遍历完
        // 如果希望符合某种条件时，就中断遍历，要使用 for 循环
        // forEach 方法也会跳过数组的空位
        [1, undefined, 2].forEach(log);
        // index = 0 element = 1
        // index = 1 element = undefined
        // index = 2 element = 2
        [1, null, 2].forEach(log);
        // index = 0 element = 1
        // index = 1 element = null
        // index = 2 element = 2
        [1, , 2].forEach(log);
        //index = 0 element = 1
        //index = 2 element = 2
    }
    // 3.12 --- filter(callback, thisArg)
    {
        // 用于过滤数组成员，满足条件的成员组成一个新数组返回
        // 它的参数是一个函数，所有数组成员依次执行该函数，返回结果为 true 的成员组成一个新数组返回
        // function (currentValue, index, arr)
        // 函数参数 currentValue --- 当前元素的值
        // 函数参数 index --- 当前元素的索引值
        // 函数参数 arr --- 当前元素所属的数组对象
        // 该方法不会改变原数组
        console.log('[实例方法]---filter', [1, 2, 3, 4, 5].filter(function (elem) {
            return elem > 3;
        })); // [ 4, 5 ]
        // 返回大于3的数组成员
        console.log('[实例方法]---filter', [0, 1, 'a', false].filter(Boolean)); // [ 1, 'a' ]
        // 返回布尔值为true的数组成员
        // filter 方法还可以接受第二个参数，用来绑定参数函数内部的 this 变量
    }
    // 3.13 --- some() ， every()
    {
        // 这 2 个方法类似"断言"，返回一个布尔值，表示判断数组成员是否符合某种条件
        // 它们接受一个函数作为参数，所有数组成员依次执行该函数
        // 该函数接受 3 个参数，然后返回一个布尔值
        // function (currentValue, index, arr)
        // 函数参数 currentValue --- 当前元素的值
        // 函数参数 index --- 当前元素的索引值
        // 函数参数 arr --- 当前元素所属的数组对象
        // some(callback, thisArg)
        // 返回值 true --- 如果数值中检测到有一项返回 true， 则返回 true ，且剩余项不会再进行检测
        // 返回值 false --- 如果所有项都返回 false ，则返回 false
        var arr = [1, 2, 3, 4, 5];
        console.log('[实例方法]---some', arr.some(function (elem) {
            return elem >= 3;
        })); // true
        // every(callback, thisArg)
        // 返回值 false --- 当数组中检测到有一项返回 false 时，则返回 false ，且剩余项不会再进行检测
        // 返回值 true --- 如果所有项都返回 true ，则返回 true
        console.log('[实例方法]---every', arr.every(function (elem) {
            return elem >= 3;
        })); // false
        //注意：对于空数组， some 方法返回 false ， every 返回 true ，回调函数都不会执行
        console.log('[实例方法]---some', [].some(function () {
            console.log('[实例方法]---some 执行');
            return true;
        })); // false

        console.log('[实例方法]---every', [].every(function () {
            console.log('[实例方法]---every 执行');
            return true;
        })); // true
        // some 和 every 方法还可以接受第二个参数 thisArg ，用来绑定参数函数内部的 this 变量
    }
    // 3.14 --- reduce(callback, initialValue) ， reduceRight(callback, initialValue)
    {
        // 依次处理数组的每个成员，最终累计为一个值
        // 差别：
        // reduce：从左到右处理(从第一个成员到最后一个成员)
        // reduceRight：从右到左处理(从最后一个成员到第一个成员)
        // 参数 callback function (accumulator, currentValue, currentIndex, arr)
        // 函数参数 accumulator --- 累积值
        // 函数参数 currentValue --- 当前元素的值
        // 函数参数 currentIndex --- 当前元素的索引值
        // 函数参数 arr --- 当前元素所属的数组对象
        // 参数 initialValue --- 累积值的初始值
        // 当不传 initialValue 时，迭代从第二项开始， accumulator = arr[0], currentValue = arr[1], index = 1
        // 当传 initialValue 时，accumulator = initialValue, cuurentValue = arr[0], index = 0
        var result = [1, 2, 3, 4, 5].reduce(function (a, b, index) {
            console.log('[实例方法]---reduce a =', a, 'b =', b, 'index =', index);
            return a + b;
        });
        // a = 1 b = 2 index = 1
        // 第一次执行： a 是第一个成员； b 是第二个成员
        // a = 3 b = 3 index = 2
        // 第二次执行： a 是上一轮的返回值； b 是第三个成员
        // a = 6 b = 4 index = 3
        // 第三次执行： a 是上一轮的返回值； b 是第四个成员
        // a = 10 b = 5 index = 4
        // 第四次执行： a 是上一轮的返回值； b 是第五个成员
        console.log('[实例方法]---reduce', result); // 15
        result = [1, 2, 3].reduce(function (a, b) {
            console.log('[实例方法]---reduce a =', a, 'b =', b);
            return a + b;
        }, 10);
        // 当指定累积变量的初始值时，当前变量从数组的第一个成员开始遍历
        // a = 10 b = 1
        // a = 11 b = 2
        // a = 13 b = 3
        console.log('[实例方法]---reduce', result); // 16
        // 设定累积变量的初始值，对处理空数组尤其有用
        function add(prev, cur) {
            return prev + cur;
        }
        try {
            console.log('[实例方法]---reduce', [].reduce(add));
        } catch (e) {
            console.log('[实例方法]---reduce', e);
        }
        // TypeError: Reduce of empty array with no initial value
        // 由于空数组取不到初始值， reduce 方法会报错
        console.log('[实例方法]---reduce', [].reduce(add, 1)); // 1
        // 由于这两个方法会遍历数组，所以实际上还可以用来做一些遍历相关的操作
        // 比如，找出字符长度最长的数组成员
        function find_longest(entries) {
            return entries.reduce(function (longest, entry) {
                return entry.length > longest.length ? entry : longest;
            }, '');
        }
        console.log('[实例方法]---reduce', find_longest(['aaa', 'bb', 'c']));
        //'aaa'
        //上面代码中，reduce的参数函数会将字符长度较长的那个数组成员，最为累积值
        //这导致遍历所有成员之后，累积值就是字符长度最长的那个成员
    }
    // 3.15 --- indexOf() ， lastIndexOf()
    {
        // indexOf(searchElement, fromIndex = 0)
        // 从前往后查找
        // 返回给定元素在数组中第一次出现的位置，如果没有出现则返回 -1
        // 从数组指定的位置向后，查找元素的位置（ 使用 === ）
        // 参数 searchElement --- 要查找的元素
        // 参数 fromIndex --- 开始查找的位置，默认为 0 ；可以通过给 fromIndex + 1 来查找所有元素
        // 如果 fromIndex >= 数组长度，意味着不会在数组里查找，返回 -1
        // 如果 fromIndex 是一个负值，将其作为数组末尾的一个抵消，即 -1 表示从最后一个元素开始， -2 表示从倒数第二个元素开始
        // 如果抵消后的索引值仍 < 0 ，则整个数组将会被查询
        var arr = ['a', 'b', 'c'];
        console.log('[实例方法]---indexOf', arr.indexOf('b')); // 1
        console.log('[实例方法]---indexOf', arr.indexOf('y')); // -1
        console.log('[实例方法]---indexOf', arr.indexOf('a', 1)); // -1
        // lastIndexOf(searchElement, fromIndex = 0)
        // 从后往前查找
        // 返回给定元素在数组中最后一次出现的位置，如果没有出现则返回 -1
        arr = [2, 5, 9, 2];
        console.log('[实例方法]---lastIndexOf', arr.lastIndexOf(2)); // 3
        console.log('[实例方法]---lastIndexOf', arr.lastIndexOf(7)); // -1
        // 注意：这 2 个方法不能用来搜索 NaN 的位置，即它们无法确定数组是否包含 NaN
        console.log('[实例方法]---indexOf', [NaN].indexOf(NaN)); // -1
        console.log('[实例方法]---lastIndexOf', [NaN].lastIndexOf(NaN)); // -1
        // 因为这 2 个方法内部，使用严格相等运算符 (===) 进行比较，而 NaN 是唯一一个不等于自身的值
    }
    // 3.16 --- 链式使用
    {
        // 上面这些数组方法中，有不少返回的还是数组，所以可以链式使用
    }
}
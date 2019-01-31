//---Array对象

//1---构造函数
{
    //Array是JavaScript的原生对象，同时也是一个构造函数，可以用它生成新的数组
    var arr = new Array(2);
    console.log('[构造函数]---', arr.length);
    //2
    console.log('[构造函数]---', arr);
    //[ <2 empty items> ]
    //上面代码中，参数2表示生成一个2个成员的数组，每个位置都是空值
    //等同于
    arr = Array(2);
    //Array构造函数有一个很大的缺陷，就是不同的参数，会导致它的行为不一致
    {
        //无参数时，返回一个空数组
        {
            console.log('[构造函数]---缺陷', new Array());
            //[]
        }
        //单个正整数参数或0，表示返回的新数组的长度
        {
            console.log('[构造函数]---缺陷', new Array(0));
            //[]
            console.log('[构造函数]---缺陷', new Array(1));
            //[ <1 empty item> ]
            console.log('[构造函数]---缺陷', new Array(2));
            //[ <2 empty item> ]
        }
        //非正整数的数值作为参数，会报错
        {
            try {
                new Array(-1); //或3.2等
            } catch (e) {
                console.log('[构造函数]---缺陷', e);
                //RangeError: Invalid array length
            }
        }
        //单个非数值(比如字符串、布尔值、对象等)作为参数，则该参数是返回的新数组的成员
        {
            console.log('[构造函数]---缺陷', new Array('abc'));
            //[ 'abc' ]
            console.log('[构造函数]---缺陷', new Array([1]));
            //[ [ 1 ] ]
        }
        //多参数时，所有参数都是返回的新数组的成员
        {
            console.log('[构造函数]---缺陷', new Array(1, 2));
            //[ 1, 2 ]
            console.log('[构造函数]---缺陷', new Array('a', 'b', 'c'));
            //[ 'a', 'b', 'c' ]
        }
    }
    //可以看到，Array作为构造函数，行为很不一致
    //因此，不建议使用它生成新数组，直接使用数组字面量是更好的做法
    //注意
    {
        //如果参数是一个正整数或0(有效的数组长度)，返回数组的成员都是空位
        //虽然读取的时候返回undefined，但实际上该位置没有任何值
        //虽然可以取到length属性，但取不到键名
        var a = new Array(3);
        var b = [undefined, undefined, undefined];
        console.log('[构造函数]---注意', a);
        //[ <3 empty items> ]
        console.log('[构造函数]---注意', b);
        //[ undefined, undefined, undefined ]
        console.log('[构造函数]---注意', a.length);
        //3
        console.log('[构造函数]---注意', b.length);
        //3
        console.log('[构造函数]---注意', a[0]);
        //undefined
        console.log('[构造函数]---注意', b[0]);
        //undefined
        console.log('[构造函数]---注意', 0 in a);
        //false
        console.log('[构造函数]---注意', 0 in b);
        //true
        //上面代码中，a是一个长度为3的空数组，b是一个3个都是undefined的数组
        //读取键值的时候，a和b都返回undefined；但是a的键位是空的，b的键位是有值的
    }
}

//2---静态方法
{
    //2.1---Array.isArray()
    {
        //返回一个布尔值，表示参数是否为数组；它可以弥补typeof运算符的不足
        var arr = [1, 2, 3];
        console.log('[静态方法]---isArray', typeof arr);
        //'object'
        console.log('[静态方法]---isArray', Array.isArray(arr));
        //true
    }
}

//3---实例方法
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
    //3.2---push()，pop()
    {
        //push：用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度
        {
            //注意：该方法会改变原数组
            var arr = [];
            console.log('[实例方法]---push', arr.push(1));
            //1
            console.log('[实例方法]---push', arr.push('a'));
            //2
            console.log('[实例方法]---push', arr.push(true, {}));
            //4
            console.log('[实例方法]---push', arr);
            //[ 1, 'a', true, {} ]
        }
        //pop：用于删除数组的最后一个元素，并返回该元素
        {
            //注意：该方法会改变原数组
            var arr = ['a', 'b', 'c'];
            console.log('[实例方法]---pop', arr.pop());
            //'c'
            console.log('[实例方法]---pop', arr);
            //[ 'a', 'b' ]
            //对空数组使用pop方法，不会报错，而是返回undefined
            console.log('[实例方法]---pop', [].pop());
            //undefined
        }
        //push和pop结合使用，就构成了"后进先出"的栈结构
        {
            var arr = [];
            arr.push(1, 2);
            arr.push(3);
            arr.pop();
            console.log('[实例方法]---后进先出', arr);
            //[ 1, 2 ]
        }
    }
    //3.3---shift()，unshift()
    {
        //shift：用于删除数组的第一个元素，并返回该元素
        {
            //注意：该方法会改变原数组
            var arr = ['a', 'b', 'c'];
            console.log('[实例方法]---shift', arr.shift());
            //'a'
            console.log('[实例方法]---shift', arr);
            //[ 'b', 'c' ]
            //shift方法可以遍历并清空一个数组
            var list = [1, 2, 3, 4];
            var item;
            while (item = list.shift()) {
                console.log('[实例方法]---shift', item);
                //1
                //2
                //3
                //4
            }
            console.log('[实例方法]---shift', list);
            //[]
            //push和shift结合使用，就构成了"先进先出"的队列结构
        }
        //unshift：用于在数组的第一个位置添加一个或多个元素，并返回添加新元素后的数组长度
        {
            //注意：该方法会改变原数组
            var arr = ['a'];
            console.log('[实例方法]---unshift', arr.unshift('x'));
            //2
            console.log('[实例方法]---unshift', arr.unshift('z', 'y'));
            //4
            console.log('[实例方法]---unshift', arr);
            //[ 'z', 'y', 'x', 'a' ]
        }
    }
    //3.4---join()
    {
        //以指定参数作为分隔符，将所有数组连接为一个字符串返回；如果不提供参数，默认用逗号分隔
        var arr = [1, 2, 3, 4];
        console.log('[实例方法]---join', arr.join());
        //'1,2,3,4'
        console.log('[实例方法]---join', arr.join(' '));
        //'1 2 3 4'
        console.log('[实例方法]---join', arr.join('|'));
        //'1|2|3|4'
        //数组成员是undefined或null或空位，会被转成空字符串
        console.log('[实例方法]---join', [undefined, null].join('#'));
        //'#'
        console.log('[实例方法]---join', ['a', , 'b'].join('-'));
        //'a--b'
        //通过call方法，这个方法也可以用于字符串或类似数组的对象
        console.log('[实例方法]---join', Array.prototype.join.call('hello', '-'));
        //'h-e-l-l-o'
        var obj = {
            0: 'a',
            1: 'b',
            length: 2
        };
        console.log('[实例方法]---join', Array.prototype.join.call(obj, '-'));
        //'a-b'
    }
    //3.5---concat()
    {
        //用于多个数组的合并
        //它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变
        console.log('[实例方法]---concat', ['hello'].concat(['world']));
        //[ 'hello', 'world' ]
        console.log('[实例方法]---concat', ['hello'].concat(['world'], ['!', '~']));
        //[ 'hello', 'world', '!', '~' ]
        //除了数组作为参数，concat也接受其他类型的值作为参数，添加到目标数组的尾部
        console.log('[实例方法]---concat', [1].concat({
            a: 1
        }, 2, 3));
        //[ 1, { a: 1 }, 2, 3 ]
        //如果数组成员包括对象，concat方法返回当前数组的一个浅拷贝
        //浅拷贝：指的是新数组拷贝的是对象的引用
        var obj = {
            a: 1
        };
        var old_arr = [obj];
        var new_arr = old_arr.concat();
        obj.a = 2;
        console.log('[实例方法]---concat', new_arr[0]);
        //{ a: 2 }
        //上面代码中，原数组包含一个对象，concat方法生成的新数组包含这个对象的引用
        //所以，改变原对象以后，新数组跟着改变
    }
    //3.6---reverse()
    {
        //用于颠倒排列数组元素，返回改变后的数组
        //注意：该方法将改变原数组
        var arr = ['a', 'b', 'c'];
        arr.reverse()
        console.log('[实例方法]---reverse', arr);
        //[ 'c', 'b', 'a' ]
    }
    //3.7---slice(start, end)
    {
        //用于提取目标数组的一部分，返回一个新数组，原数组不变
        //第一个参数start：起始位置；从0开始
        //第二个参数end：终止位置；但该位置的元素本身不包括在内；
        //如果省略第二个参数，则一直返回到原数组的最后一个成员
        var arr = ['a', 'b', 'c'];
        console.log('[实例方法]---slice', arr.slice(0));
        //[ 'a', 'b', 'c' ]
        console.log('[实例方法]---slice', arr.slice(1));
        //[ 'b', 'c' ]
        console.log('[实例方法]---slice', arr.slice(1, 2));
        //[ 'b' ]
        console.log('[实例方法]---slice', arr.slice(2, 6));
        //[ 'c' ]
        console.log('[实例方法]---slice', arr.slice());
        //[ 'a', 'b', 'c' ]
        //slice没有参数，实际上等于返回一个原数组的拷贝
        //如果slice方法的参数是负数，则表示倒数计算的位置
        console.log('[实例方法]---slice', arr.slice(-2));
        //[ 'b', 'c' ]
        //-2表示倒数计算的第二个位置；即索引为-2 + 3 = 1的位置
        console.log('[实例方法]---slice', arr.slice(-2, -1));
        //[ 'b' ]
        //-1表示倒数计算的第一个位置；即索引为-1 + 3 = 2的位置
        //如果第一个参数 >= 数组的长度，或者第一个参数 >= 第二个参数，则返回空数组
        console.log('[实例方法]---slice', arr.slice(4));
        //[]
        console.log('[实例方法]---slice', arr.slice(2, 1));
        //[]
        console.log('[实例方法]---slice', arr.slice(2, 2));
        //[]
        //重要应用：将类似数组的对象转为真正的数组
        var obj = {
            0: 'a',
            1: 'b',
            length: 2
        };
        console.log('[实例方法]---slice', Array.prototype.slice.call(obj));
        //[ 'a', 'b' ]
    }
    //3.8---splice(start, count, add_element_1, add_element_2, ...)
    {
        //用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素
        //注意：该方法会改变原数组
        //第一个参数：删除的起始位置(从0开始)
        //第二个参数：被删除的元素个数
        //后面更多的参数：表示要被插入数组的新元素
        var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
        console.log('[实例方法]---splice', arr.splice(4, 2));
        //[ 'e', 'f' ]
        console.log('[实例方法]---splice', arr);
        //[ 'a', 'b', 'c', 'd' ]
        arr = ['a', 'b', 'c', 'd', 'e', 'f'];
        console.log('[实例方法]---splice', arr.splice(4, 2, 1, 2));
        //[ 'e', 'f' ]
        console.log('[实例方法]---splice', arr);
        //[ 'a', 'b', 'c', 'd', 1, 2 ]
        //起始位置如果是负数，就表示从倒数位置开始删除
        arr = ['a', 'b', 'c', 'd', 'e', 'f'];
        console.log('[实例方法]---splice', arr.splice(-4, 2));
        //[ 'c', 'd' ]
        //单纯地插入元素
        arr = [1, 1, 1];
        console.log('[实例方法]---splice', arr.splice(1, 0, 2));
        //[]
        console.log('[实例方法]---splice', arr);
        //[ 1, 2, 1, 1 ]
        //如果只提供第一个参数，等同于将原数组在指定位置拆分成2个数组
        arr = [1, 2, 3, 4];
        console.log('[实例方法]---splice', arr.splice(2));
        //[ 3, 4 ]
        console.log('[实例方法]---splice', arr);
        //[ 1, 2 ]
    }

    //3.9---sort()
    {
        //对数组成员进行排序，默认是按照字典顺序排序；排序后，原数组将被改变
        console.log('[实例方法]---sort', ['d', 'c', 'b', 'a'].sort());
        //[ 'a', 'b', 'c', 'd' ]
        console.log('[实例方法]---sort', [4, 3, 2, 1].sort());
        //[ 1, 2, 3, 4 ]
        console.log('[实例方法]---sort', [11, 101].sort());
        //[ 101, 11 ]
        console.log('[实例方法]---sort', [10111, 1101, 111].sort());
        //[ 10111, 1101, 111 ]
        //按照字典顺序，数值会先被转成字符串，再按照字典顺序进行比较
        //让sort方法按照自定义方式排序，可以传入一个函数作为参数
        console.log('[实例方法]---sort', [10111, 1101, 111].sort(function (a, b) {
            return a - b;
        }));
        //[ 111, 1101, 10111 ]
        //上面代码中，sort的参数函数本身接受2个参数，表示进行比较的2个数组成员
        //如果该函数的返回值 > 0，表示第一个成员排在第二个成员后面
        //其他情况下，都是第一个元素排在第二个元素前面
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

    //3.10---map()
    {
        //将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回
        var numbers = [1, 2, 3];
        console.log('[实例方法]---map', numbers.map(function (n) {
            return n + 1;
        }));
        //[ 2, 3, 4 ]
        console.log('[实例方法]---map', numbers);
        //[ 1, 2, 3 ]
        //map方法接受一个函数作为参数
        //该函数调用时，map方法向它传入3个参数：当前成员、当前位置、数组本身
        console.log('[实例方法]---map', numbers.map(function (elem, index, arr) {
            return elem * index;
        }));
        //[ 0, 2, 6 ]
        //map方法还可以接受第二个参数，用来绑定回调函数内部的this变量
        //如果数组有空位，map方法的回调函数在这个位置不会执行，会跳过数组的空位
        var f = function (n) {
            return 'a';
        };
        console.log('[实例方法]---map', [1, undefined, 2].map(f));
        //[ 'a', 'a', 'a' ]
        console.log('[实例方法]---map', [1, null, 2].map(f));
        //[ 'a', 'a', 'a' ]
        console.log('[实例方法]---map', [1, , 2].map(f));
        //[ 'a', <1 empty item>, 'a' ]
        //上面代码代码中，map方法不会跳过undefined和null，但是会跳过空位
    }
    //3.11---forEach()
    {
        //与map方法很相似，也是对数组的所有成员依次执行参数函数
        //但是，forEach方法不返回值，只用来操作数据
        //参数是一个函数，该函数同样接受3个参数：当前值，当前位置、整个数组
        function log(element, index, array) {
            console.log('[实例方法]---forEach index =', index, 'element =', element);
        }
        [1, 2].forEach(log);
        //index = 0 element = 1
        //index = 1 element = 2
        //forEach方法也可以接受第二个参数，绑定参数函数的this变量
        //注意：forEach方法无法中断执行，总是会将所有成员遍历完
        //如果希望符合某种条件时，就中断遍历，要使用for循环
        //forEach方法也会跳过数组的空位
        [1, undefined, 2].forEach(log);
        //index = 0 element = 1
        //index = 1 element = undefined
        //index = 2 element = 2
        [1, null, 2].forEach(log);
        //index = 0 element = 1
        //index = 1 element = null
        //index = 2 element = 2
        [1, , 2].forEach(log);
        //index = 0 element = 1
        //index = 2 element = 2
    }
    //3.12---filter()
    {
        //用于过滤数组成员，满足条件的成员组成一个新数组返回
        //它的参数是一个函数，所有数组成员依次执行该函数，返回结果为true的成员组成一个新数组返回
        //该方法不会改变原数组
        console.log('[实例方法]---filter', [1, 2, 3, 4, 5].filter(function (elem) {
            return elem > 3;
        }));
        //[ 4, 5 ]
        //返回大于3的数组成员
        console.log('[实例方法]---filter', [0, 1, 'a', false].filter(Boolean));
        //[ 1, 'a' ]
        //返回布尔值为true的数组成员
        //参数函数可以接受3个参数：当前成员，当前当前位置、整个数组
        //filter方法还可以接受第二个参数，用来绑定参数函数内部的this变量
    }
    //3.13---some()，every()
    {
        //这2个方法类似"断言"，返回一个布尔值，表示判断数组成员是否符合某种条件
        //它们接受一个函数作为参数，所有数组成员依次执行该函数
        //该函数接受3个参数：当前成员、当前位置、整个数组，然后返回一个布尔值
        //some：只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false
        var arr = [1, 2, 3, 4, 5];
        console.log('[实例方法]---some', arr.some(function (elem) {
            return elem >= 3;
        }));
        //true
        //every：所有成员的返回值都是true，整个every方法才返回true，否则返回false
        console.log('[实例方法]---every', arr.every(function (elem) {
            return elem >= 3;
        }));
        //false
        //注意：对于空数组，some方法返回false，every返回true，回调函数都不会执行
        console.log('[实例方法]---some', [].some(function () {
            console.log('[实例方法]---some 执行');
            return true;
        }));
        //false
        console.log('[实例方法]---every', [].every(function () {
            console.log('[实例方法]---every 执行');
            return true;
        }));
        //true
        //some和every方法还可以接受第二个参数，用来绑定参数函数内部的this变量
    }
    //3.14---reduce()，reduceRight()
    {
        //依次处理数组的每个成员，最终累计为一个值
        //差别：
        //reduce：从左到右处理(从第一个成员到最后一个成员)
        //reduceRight：从右到左(从最后一个成员到第一个成员)
        var result = [1, 2, 3, 4, 5].reduce(function (a, b) {
            console.log('[实例方法]---reduce a =', a, 'b =', b);
            return a + b;
        });
        //a = 1 b = 2
        //第一次执行：a是第一个成员；b是第二个成员
        //a = 3 b = 3
        //第二次执行：a是上一轮的返回值；b是第三个成员
        //a = 6 b = 4
        //第三次执行：a是上一轮的返回值；b是第四个成员
        //a = 10 b = 5
        //第四次执行：a是上一轮的返回值；b是第五个成员
        console.log('[实例方法]---reduce', result);
        //15
        //result是最后一轮的返回值
        //reduce和reduceRight方法的第一个参数都是一个函数
        //该函数接受以下4个参数：
        //参数---1---累积变量(必须)：默认为数组的第一个成员
        //参数---2---当前变量(必须)：默认为数组的第二个成员
        //参数---3---当前位置(可选)：从0开始
        //参数---4---原数组(可选)
        //如果要对累积变量指定初值，可以把它放在reduce方法和reduceRight方法的第二个参数
        result = [1, 2, 3].reduce(function (a, b) {
            console.log('[实例方法]---reduce a =', a, 'b =', b);
            return a + b;
        }, 10);
        //当指定累积变量的初始值时，当前变量从数组的第一个成员开始遍历
        //a = 10 b = 1
        //a = 11 b = 2
        //a = 13 b = 3
        console.log('[实例方法]---reduce', result);
        //16
        //设定累积变量的初始值，对处理空数组尤其有用
        function add(prev, cur) {
            return prev + cur;
        }
        try {
            console.log('[实例方法]---reduce', [].reduce(add));
        } catch (e) {
            console.log('[实例方法]---reduce', e);
        }
        //TypeError: Reduce of empty array with no initial value
        //由于空数组取不到初始值，reduce方法会报错
        console.log('[实例方法]---reduce', [].reduce(add, 1));
        //1
        //由于这两个方法会遍历数组，所以实际上还可以用来做一些遍历相关的操作
        //比如，找出字符长度最长的数组成员
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
    //3.15---indexOf()， lastIndexOf()
    {
        //indexOf：返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1
        var arr = ['a', 'b', 'c'];
        console.log('[实例方法]---indexOf', arr.indexOf('b'));
        //1
        console.log('[实例方法]---indexOf', arr.indexOf('y'));
        //-1
        //indexOf方法还可以接受第二个参数，表示搜索的的开始位置
        console.log('[实例方法]---indexOf', arr.indexOf('a', 1));
        //-1
        //lastIndexOf：返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1
        arr = [2, 5, 9, 2];
        console.log('[实例方法]---lastIndexOf', arr.lastIndexOf(2));
        //3
        console.log('[实例方法]---lastIndexOf', arr.lastIndexOf(7));
        //-1
        //lastIndexOf方法还可以接受第二个参数，表示搜索的的开始位置
        //注意：这2个方法不能用来搜索NaN的位置，即它们无法确定数组是否包含NaN
        console.log('[实例方法]---indexOf', [NaN].indexOf(NaN));
        //-1
        console.log('[实例方法]---lastIndexOf', [NaN].lastIndexOf(NaN));
        //-1
        //因为这2个方法内部，使用严格相等运算符(===)进行比较，而NaN是唯一一个不等于自身的值
    }
    //3.16---链式使用
    {
        //上面这些数组方法中，有不少返回的还是数组，所以可以链式使用
    }
}
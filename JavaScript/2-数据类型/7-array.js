//---数组(array)

//1---定义
{
    //数组是按次序排列的一组值；每个值的位置都有编号(从0开始)，整个数组用方括号表示
    var arr = ['a', 'b', 'c'];
    //上面代码中的a、b、c就构成一个数组，两端的方括号是数组的标志
    //a是0号位置，b是1号位置，c是2号位置
    //除了在定义时赋值，数组也可以先定义后赋值
    var arr_2 = [];
    arr_2[0] = 'a';
    arr_2[0] = 'b';
    arr_2[0] = 'c';
    //任何类型的数据，都可以放入数组
    var arr_3 = [{
            a: 1
        },
        [1, 2, 3],
        function () {
            return true;
        }
    ];
    console.log('[定义]---arr3[0] = ', arr_3[0]); //{ a: 1 }
    console.log('[定义]---arr3[1] = ', arr_3[1]); //[ 1, 2, 3 ]
    console.log('[定义]---arr3[2] = ', arr_3[2]); //function () { return true;}
    //上面数组arr_3的3个成员依次是对象、数组、函数
    //如果数组的元素还是数组，就形成了多维数组
    var a = [
        [1, 2],
        [3, 4]
    ];
    console.log('[定义]---a[0][1] = ', a[0][1]); //2
    console.log('[定义]---a[0][1] = ', a[1][1]); //4
}

//2---数组的本质
{
    //本质上，数组属于一种特殊的对象；typeof运算符会返回数组的类型是object
    console.log('[数组的本质]---typeof ', typeof []); //object
    //数组的特殊性体现在，它的键名是按次序排列的一组整数(0、1、2...)
    var arr = ['a', 'b', 'c'];
    console.log('[数组的本质]---keys = ', Object.keys(arr)); //[ '0', '1', '2' ]
    //由于数组成员的键名是固定的的(默认总是0、1、2...)
    //因此数组不用为每个元素指定键名，而对象的每个成员都必须指定键名
    //JavaScript语言规定，对象的键名一律为字符串，所以，数组的键名其实也是字符串
    //之所以用数值读取，是因为非字符串的键名会被转为字符串
    console.log('[数组的本质]---数值键名 = ', arr[0]); //a
    console.log('[数组的本质]---字符串键名 = ', arr['0']); //a
    //数值键名被自动转为字符串
    //注意：这一点在赋值时也成立
    var a = [];
    a[1.00] = 6; //1.00转成字符串是1
    console.log('[数组的本质]---数值键名 = ', a[1]); //6
    console.log('[数组的本质]---a = ', a); //[ <1 empty item>, 6 ]
    //对象有2中读取成员的方法：点结构(object.key)和方括号(object[key])
    //但对于数值的键名，不能使用点结构
    var arr_2 = [1, 2, 3];
    // arr.0---报错
    //上面代码中，arr.0的写法不合法，因为单独的数值不能作为标识符
    //所以，数组成员只能用方括号arr[0]表示(方括号是运算符，可以接受数值)
}

//3---length属性
{
    //length的定义
    {
        //数组的length属性，返回数组的成员数量
        //JavaScript使用一个32位整数，保存数组的元素个数；这意味着，数组成员最多只有2^32-1个；即length属性的最大值就是2^32-1
        //只要是数组，就一定有length属性；该属性是一个动态的值，等于键名中的最大整数+1
        var arr = ['a', 'b'];
        console.log('[length属性]---length = ', arr.length); //2
        arr[2] = 'c';
        console.log('[length属性]---length = ', arr.length); //3
        arr[9] = 'd';
        console.log('[length属性]---length = ', arr.length); //10
        console.log('[length属性]--- ', arr[8]); //undefined
        console.log('[length属性]--- ', arr); //[ 'a', 'b', 'c', <6 empty items>, 'd' ]
        //上面代码表示，数组的数字键不需要连续，length属性的值总是比最大的那个整数键大1
        //这表明数组是一种动态的数据结构，可以随时增减数组的成员
    }
    //修改length
    {
        //length属性是可写的；如果人为设置一个小于(<)当前成员个数的值，该数组的成员会自动减少到length设置的值
        arr.length = 2;
        console.log('[length属性]--- ', arr); //[ 'a', 'b' ]
        //清空数组的一个有效方法，就是将length属性设为0
        arr.length = 0;
        console.log('[length属性]--- ', arr); //[]
        //如果人为设置length大于(>)当前元素个数，则数组的成员数量会增加到这个值，新增的位置都是空位
        arr.length = 2;
        console.log('[length属性]--- ', arr); //[ <2 empty items> ]
        console.log('[length属性]--- ', arr[0]); //undefined
        //上面代码表示，当length属性设为大于(>)数组个数时，读取新增的位置都会返回undefined
    }
    //如果认为设置length为不合法的值，JavaScript会报错
    {
        //length不合法---1---设置负值
        try {
            [].length = -1;
        } catch (err) {
            console.log('[length属性]---', err); //Invalid array length
        }
        //length不合法---2---数组元素个数大于等于(>=)2^32
        try {
            [].length = Math.pow(2, 32);
        } catch (err) {
            console.log('[length属性]---', err); //Invalid array length
        }
        //length不合法---3---设置字符串
        try {
            [].length = 'abc';
        } catch (err) {
            console.log('[length属性]---', err); //Invalid array length
        }
    }
    //为数组添加属性
    {
        //注意：由于数组本质上是一种对象，所以可以为数组添加属性，但是这不影响length属性的值
        var a = [];
        a['p'] = 'abc';
        console.log('[length属性]---length = ', a.length); //0
        a[2.1] = 'abc';
        console.log('[length属性]---length = ', a.length); //0
        //上面代码将数组的键分别设为字符串和小数，结果都不影响length属性
        //因为，length属性的值就是等于最大的数字键+1，而这个数组没有整数键，所以length属性保持为0
        //如果数组的键名是添加超出范围的数值，该键名会自动转为字符串
        var a = [];
        a[-1] = 'a';
        a[Math.pow(2, 32)] = 'b';
        console.log('[length属性]---length = ', a.length); //0
        console.log('[length属性]---非法数字键 = ', a[-1]); //a
        console.log('[length属性]---非法数字键 = ', a[4294967296]); //b
        //上面代码中，为数组a添加了2个不合法的数字键，结果length属性没有发生变化
        //这些数字键都变成了字符串键名，取键值时，数字键名会默认转为字符串
    }
}

//4---in运算符
{
    //检查某个键名是否存在的运算符in，适用于对象，也适用于数组
    var arr = ['a', 'b', 'c'];
    console.log('[in运算符]---', 2 in arr); //true
    console.log('[in运算符]---', '2' in arr); //true
    console.log('[in运算符]---', 4 in arr); //false
    //上面代码表明，数组存在键名为2的键；由于键名都是字符串，所以数值2会自动转成字符串
    //注意：如果数组的某个位置是空位，in运算符返回false
}

//5---for-in循环和数组的遍历
{
    //for-in循环不仅可以遍历对象，也可以遍历数组，毕竟数组只是一种特殊对象
    var a = [1, 2, 3];
    for (var i in a) {
        console.log('[for-in]---', a[i]); //1,2,3
    }
    //但是，for-in不仅会遍历数组所有的数字键，还会遍历非数字键
    a.foo = true;
    for (var i in a) {
        console.log('[for-in]---', a[i]); //1,2,3,true
    }
    //所以不推荐使用for-in遍历数组
    //数组的遍历可以考虑使用for循环或while循环
    {
        //for循环
        for (var i = 0; i < a.length; i++) {
            console.log('[for]---', a[i]); //1,2,3
        }
        //while循环
        var i = 0;
        while (i < a.length) {
            console.log('[while]---', a[i]); //1,2,3
            i++;
        }
        var l = a.length;
        while (i--) {
            console.log('[while]---', a[i]); //3,2,1
        }
        //上面代码是3种遍历数组的写法
        //最后一种写法是逆向遍历，即从最后一个元素向第一个元素遍历
    }
    //数组的forEach方法，也可以用来遍历数组
    a.forEach(function (ele) {
        console.log('[Each]---', ele); //1,2,3
    });
}

//6---数组的空位
{
    //当数组的某个位置是空元素，即2个逗号之间没有任何值，称该数组存在空位
    var a = [1, , 1];
    console.log('[数组的空位]---', a.length); //3
    //上面代码表明，数组的空位不影响length属性
    //注意：如果最后一个元素后面有逗号(,)，并不会产生空位；即有没有这个逗号结果都是一样的
    var a = [1, 2, ];
    console.log('[数组的空位]---', a.length); //2
    console.log('[数组的空位]---', a); //[ 1, 2 ]
    //数组的空位是可以读取的，返回undefined
    var a = [, , , ];
    console.log('[数组的空位]---', a.length); //3
    console.log('[数组的空位]---读取 ', a[1]); //undefined
    //使用delete命令删除一个数组成员，会形成空位，并不会影响length属性
    var a = [1, 2, 3];
    delete a[1];
    console.log('[数组的空位]---delete ', a[1]); //undefined
    console.log('[数组的空位]---delete ', a.length); //3
    //length属性不过滤空位；所以使用length属性进行数组遍历，一定要非常小心
    //数组的某个位置是空位，与某个位置是undefined，是不一样的
    {
        //如果是空位，使用数组的forEach方法、for-in结构、以及Object.keys方法进行遍历，空位都会被跳过
        {
            var a = [, , ];
            a.forEach(function (ele, i) {
                console.log('[数组的空位]---forEach i = ', i, ', ele = ', ele);
            });
            //不产生任何输出
            for (var i in a) {
                console.log('[数组的空位]---for-in i = ', i, ', a[i] = ', a[i]);
            }
            //不产生任何输出
            console.log('[数组的空位]---Object.keys = ', Object.keys(a)); //[]
        }
        //如果某个位置是undefined，遍历的时候就不会被跳过
        {
            var a = [undefined, undefined];
            a.forEach(function (ele, i) {
                console.log('[数组的undefined值]---forEach i = ', i, ', ele = ', ele);
            });
            // [数组的undefined值]---forEach i =  0 , ele =  undefined
            // [数组的undefined值]---forEach i =  1 , ele =  undefined
            for (var i in a) {
                console.log('[数组的undefined值]---for-in i = ', i, ', a[i] = ', a[i]);
            }
            // [数组的undefined值]---for-in i =  0 , a[i] =  undefined
            // [数组的undefined值]---for-in i =  1 , a[i] =  undefined
            console.log('[数组的undefined值]---Object.keys = ', Object.keys(a)); //[ '0', '1' ]
        }
        //空位：就是数组没有这个元素，所以不会被遍历到
        //undefined值：表示数组有这个元素，值是undefined，所以遍历不会跳过
    }
}

//7---类似数组的对象
{
    //如果一个对象的所有键名都是正整数或零，并且有length属性，那么这个对象就很像数组，语法上称为"类似数组的对象"
    var obj = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3
    };
    console.log('[类似数组的对象]---', obj[0]); //a
    console.log('[类似数组的对象]---', obj[1]); //b
    console.log('[类似数组的对象]---', obj.length); //3
    try {
        obj.push('d');
    } catch (err) {
        console.log('[类似数组的对象]---err = ', err); //obj.push is not a function
    }
    //上面代码中，对象obj就是一个类似数组的对象
    //但是，"类似数组的对象"并不是数组，因为它们不具备数组特有的方法
    //对象obj没有数组的push方法，使用该方法就会报错
    //"类似数组的对象"的根本特征：就是具有length属性；只要有length属性，就可以认为这个对象类似于数组
    //问题：这种length属性不是动态值，不会随着成员的变化而变化
    var obj = {
        length: 0
    };
    obj[3] = 'd';
    console.log('[类似数组的对象]---', obj.length); //0
    //典型的"类数组对象"
    {
        //函数的arguments对象
        {
            function args() {
                return arguments; //[Arguments] { '0': 'a', '1': 'b' }
            }
            var array_like = args('a', 'b');
            console.log('[类似数组的对象]---函数的arguments对象 ', array_like[0]); //a
            console.log('[类似数组的对象]---函数的arguments对象 ', array_like.length); //2
            console.log('[类似数组的对象]---函数的arguments对象 ', array_like instanceof Array); //false
        }
        //大多数DOM元素集
        //字符串
        {
            console.log('[类似数组的对象]---字符串 ', 'abc' [1]); //b
            console.log('[类似数组的对象]---字符串 ', 'abc'.length); //3
            console.log('[类似数组的对象]---字符串 ', ('abc'
                instanceof Array)); //false
        }
    }
    //数组的slice方法可以将"类似数组的对象"变成真正的数组
    var arr = Array.prototype.slice.call(array_like);
    console.log('[类似数组的对象]---slice ', arr); //[ 'a', 'b' ]
    //除了转为真正的数组，"类似数组的对象"还有一个办法可以使用数组的方法，就是通过call()把数组的方法放到对象上面
    function print(value, index) {
        console.log('[类似数组的对象]---call index = ', index, ', value = ', value);
    }
    Array.prototype.forEach.call(array_like, print);
    // [类似数组的对象]---call index =  0 , value =  a
    // [类似数组的对象]---call index =  1 , value =  b
    //上面代码中，array_like代表一个类似数组的对象，本来是不可以使用数组的forEach()方法的
    //但是通过call()，可以把forEach()嫁接到array_like上面调用
    function log_args() {
        Array.prototype.forEach.call(arguments, function (ele, i) {
            console.log('[类似数组的对象]---call  i = ', i, ', value = ', value);
        });
    }
    //等同于for循环
    function same_log_args() {
        for (var i = 0; i < arguments.length; i++) {
            console.log('[类似数组的对象]---call i = ', i, ', value = ', arguments[i]);
        }
    }
    //字符串也是类似数组的对象，所以也可以用Array.prototype.forEach.call遍历
    Array.prototype.forEach.call('abc', function (char) {
        console.log('[类似数组的对象]---str char = ', char);
    });
    //a,b,c
    //注意：这种方法比直接使用数组的原生的forEach要慢
    //所以最好还是先将"类似数组的对象"转为真正的数组，然后直接调用数组的forEach方法
    var arr = Array.prototype.slice.call('abc');
    arr.forEach(function (char) {
        console.log('[类似数组的对象]---str转为数组 char = ', char);
    });
    //a,b,c
}
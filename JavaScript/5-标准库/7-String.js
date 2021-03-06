//---String对象

//1---概述
{
    //String对象是JavaScript原生提供的3个包装对象之一
    //用作构造函数：用来生成字符串对象
    var s_1 = 'abc';
    var s_2 = new String('abc');
    console.log('[概述]---', typeof s_1);
    //'string'
    console.log('[概述]---', typeof s_2);
    //'object'
    console.log('[概述]---', s_2.valueOf());
    //'abc'
    //字符串对象是一个类似数组的对象
    console.log('[概述]---', s_2[1]);
    //'b'
    //字符串abc对应的字符串对象，有数值键(0、1、2)和length属性，所以可以像数组那样取值
    //用作工具方法：将任意类型的值转为字符串
    console.log('[概述]---', String(true));
    //'true'
    console.log('[概述]---', String(5));
    //'5'
}

//2---静态方法
{
    //定义在对象本身，而不是定义在对象实例的方法
    //2.1---String.fromCharCode()
    {
        //参数是一个或多个数值，代码Unicode码点，返回值是这些码点组成的字符串
        console.log('[静态方法]---fromCharCode', String.fromCharCode());
        //''
        console.log('[静态方法]---fromCharCode', String.fromCharCode(97));
        //'a'
        console.log('[静态方法]---fromCharCode', String.fromCharCode(104, 101, 108, 108, 111));
        //'hello'
        //若参数为空，返回空字符串；否则，返回参数对应的Unicode字符串
        //注意：该方法不支持Unicode码点大于0xFFFF的字符，即传入的参数大于0xFFFF(即十进制的65535)
        console.log('[静态方法]---fromCharCode', String.fromCharCode(0x20BB7));
        //'ஷ'
        console.log('[静态方法]---fromCharCode', String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7));
        //true
        //0x20BB7大于0xFFFF，导致返回结果出错
        //0x20BB7对应的字符是汉子吉，但返回结果却是另一个字符(码点0x0BB7)
        //这是因为String.fromCharCode发现参数值大于0xFFFF，就会忽略多出的位(即忽略0x20BB7里面的2)
        //根本原因在于，码点大于0xFFFF的字符占用4个字节，而JavaScript默认支持2个字节的字符
        //这种情况下，必须把0x20BB7拆成2个字符表示
        console.log('[静态方法]---fromCharCode', String.fromCharCode(0xD842, 0xDFB7));
        //'𠮷'
        //上面代码中，0x20BB7拆成2个字符0xD842和0xDFB7(即2个两字节字符，合成一个四字节字符)，就能得到正确的结果
        //码点大于0xFFFF的字符的四字节表示法，由UTF-16编码方法决定
    }
}

//3---实例属性
{
    //3.1---String.prototype.length
    {
        //字符串实例的length属性返回字符串的长度
        console.log('[实例属性]---length', 'abc'.length); //3
    }
}

// 4 --- 实例方法
{

    // 4.1---String.prototype.charAt(index)
    {
        // 返回指定位置的字符，参数是从 0 开始编号的位置
        // 参数 index ：字符在字符串中的下标；在 [0, str.length) 之间，否则返回一个空字符串
        // 返回值 (String) ：长度为 1 的字符串； JavaScript 并没有一种有别于字符串类型的字符数据类型
        var s = new String('abc');
        console.log('[实例方法]---charAt', s.charAt(1)); // 'b'
        console.log('[实例方法]---charAt', s.charAt(s.length - 1)); // 'c'
        // 这个方法完全可以用数组下标代替
        console.log('[实例方法]---charAt', 'abc' [1]); // 'b'
        //如果参数为负数，或 >= 字符串的长度， charAt 返回空字符串，数组下标返回 undefined
        console.log('[实例方法]---charAt', 'abc'.charAt(1)); // ''
        console.log('[实例方法]---charAt', 'abc'.charAt(3)); // ''
        console.log('[实例方法]---charAt', 'abc' [-1]); // undefined
        console.log('[实例方法]---charAt', 'abc' [3]); // undefined
    }
    // 4.2 --- String.prototype.charCodeAt(index = 0)
    {
        // 返回字符串指定位置的 Unicode 码点(十进制表示)，相当于 String.fromCharCode() 的逆操作
        // 参数 index ：字符在字符串中的下标；在 [0, str.length) 之间，否则返回 NaN
        // 返回值 (Number) ：字符的 Unicode 编码，[0, 65535] 的整数
        console.log('[实例方法]---charCodeAt', 'abc'.charCodeAt(1)); // 98
        // 如果没有任何参数，则返回首字符的 Unicode 码点
        console.log('[实例方法]---charCodeAt', 'abc'.charCodeAt()); // 97
        console.log('[实例方法]---charCodeAt', ''.charCodeAt()); // NaN
        //如果参数为负数，或 >= 字符串的长度，则返回 NaN
        console.log('[实例方法]---charCodeAt', 'abc'.charCodeAt(-1)); // NaN
        console.log('[实例方法]---charCodeAt', 'abc'.charCodeAt(4)); // NaN
        //注意：
        {
            // charCodeAt 方法返回的 Unicode 码点不会大于 0xFFFF(65536)
            // 也就是说，只返回2个字节的字符的码点
            // 如果遇到码点大于 65536 的字符(四个字节的字符)，必需连续使用 2 次 charCodeAt 
            // 不仅读入 charCodeAt(i) ，还要读 入charCodeAt(i+1) ，将 2 个值放在一起，才能得到准确的字符
        }
    }
    // 4.3 --- String.prototype.concat(str1, str2, ...strn)
    {
        // 用于连接 2 个或多个字符串，返回一个新字符串，不改变原字符串
        var s_1 = 'abc';
        var s_2 = 'def';
        console.log('[实例方法]---concat', s_1.concat(s_2)); //'abcdef'
        console.log('[实例方法]---concat', s_1); // 'abc'
        // 如果参数不是字符串， concat 方法会将其先转为字符串，然后再连接
        var one = 1;
        var two = 2;
        var three = '3';
        console.log('[实例方法]---concat', ''.concat(one, two, three)); // '123'
        console.log('[实例方法]---concat', one + two + three); // '33'
    }
    // 4.4 --- String.prototype.slice(start, end = str.length)
    {
        // 用于从原字符串取出子字符串并返回，不改变原字符串
        // 参数 start ：表示子字符串的开始位置(从 0 开始计算)
        // 参数 end ：表示子字符串的结束位置(不含该位置)
        // 返回值：一个新的字符串，从 start （包括）开始到 end （不包括）结束为止的所有字符
        console.log('[实例方法]---slice', 'JavaScript'.slice(0, 4)); // 'Java'
        // 如果省略 end ，则表示子字符串一直到原字符串结束
        console.log('[实例方法]---slice', 'JavaScript'.slice(4)); // 'Script'
        // 如果参数时负值，表示从结尾开始倒数计算的位置，即该负值 + 字符串长度
        console.log('[实例方法]---slice', 'JavaScript'.slice(-6)); // 'Script'
        console.log('[实例方法]---slice', 'JavaScript'.slice(0, -6)); // 'Java'
        console.log('[实例方法]---slice', 'JavaScript'.slice(-2, -1)); // 'p'
        //如果 start >= end，或 start >= str.length ， slice 方法返回一个空字符串
        console.log('[实例方法]---slice', 'JavaScript'.slice(2, 1)); // ''
        console.log('[实例方法]---slice', 'JavaScript'.slice(1, 1)); // ''
        console.log('[实例方法]---slice', 'JavaScript'.slice(10)); // ''
    }
    // 4.5 --- String.prototype.substring(start, end = str.length)
    {
        // 用于从原字符串取出子字符串并返回，不改变原字符串
        // 跟 slice 方法很像
        // 参数 start ：表示子字符串的开始位置(从 0 开始计算)
        // 参数 end ：表示子字符串的结束位置(不含该位置)
        // 返回值：内容为原字符串 [start, end - 1] 处的所有字符
        console.log('[实例方法]---substring', 'JavaScript'.substring(0, 4)); // 'Java'
        // 如果省略 end ，则表示子字符串一直到原字符串的结束
        console.log('[实例方法]---substring', 'JavaScript'.substring(4)); // 'Script'
        // 如果 start > end ， substring 方法会自动更换 2 个参数的位置
        console.log('[实例方法]---substring', 'JavaScript'.substring(10, 4)); // 'Script'
        //等同于
        console.log('[实例方法]---substring', 'JavaScript'.substring(4, 10)); // 'Script'
        // 如果参数是负数， substring 方法会自动将负数转为 0
        console.log('[实例方法]---substring', 'JavaScript'.substring(-3)); // 'JavaScript'
        console.log('[实例方法]---substring', 'JavaScript'.substring(4, -3)); // 'Java'
        //由于这些规则违反直觉，因此不建议使用 substring 方法，应该优先使用 slice
    }
    // 4.6 --- String.prototype.substr(start, len = str.length)
    {
        // 用于从原字符串取出子字符串并返回，不改变原字符串
        // 跟 slice 和 substring 方法的作用相同
        // start ：表示子字符串的开始位置(从 0 开始计算)
        // len ：表示子字符串的长度
        console.log('[实例方法]---substr', 'JavaScript'.substr(4, 6)); // 'Script'
        // 如果省略 len ，则表示子字符串一直到原字符串的结束
        console.log('[实例方法]---substr', 'JavaScript'.substr(4)); // 'Script'
        // 如果 start 是负数，表示倒数计算的字符位置
        console.log('[实例方法]---substr', 'JavaScript'.substr(-6)); // 'Script'
        // 如果 end 是负数，将被自动转为 0 ，因此会返回空字符串
        console.log('[实例方法]---substr', 'JavaScript'.substr(4, -1)); // ''
    }
    // 4.7---String.prototype.indexOf(searchValue, fromIndex) ， String.prototype.lastIndexOf(searchValue, fromIndex)
    {
        // 从一个字符串中查找给定的字符串，然后返回字符串的位置，如果没找到，则返回 -1
        // 参数 searchValue ：需检索的字符串值
        // 参数 fromIndex ：开始检索的位置；合法取值为 [0, str.length - 1]
        // indexOf ：用于确定一个字符串在另一个字符串中第一次出现的位置
        // 返回结果是匹配开始的位置，如果返回-1，就表示不匹配
        console.log('[实例方法]---indexOf', 'hello world'.indexOf('o')); // 4
        console.log('[实例方法]---indexOf', 'JavaScript'.indexOf('script')); // -1
        // indexOf 方法还可以接受第二个参数，表示从该位置开始向后匹配
        console.log('[实例方法]---indexOf', 'hello world'.indexOf('o', 4)); // 4
        console.log('[实例方法]---indexOf', 'hello world'.indexOf('o', 6)); // 7
        // lastIndexOf 用于确定一个字符串在另一个字符串中最后一次出现的位置
        console.log('[实例方法]---indexOf', 'hello world'.lastIndexOf('o', 6)); // 4
    }
    //4.8---String.prototype.trim()
    {
        //用于去除字符串两端的空格，返回一个新字符串，不改变原字符串
        console.log('[实例方法]---trim', ' hello world');
        //' hello world'
        console.log('[实例方法]---trim', ' hello world'.trim());
        //'hello world'
        //该方法去除的不仅是空格，还包括制表符(\t、\v)、换行符(\n)、回车符(\r)
        console.log('[实例方法]---trim', '\r\nab\nc \t'.trim());
        //'ab
        //c'
    }
    // 4.9 --- String.prototype.toLowerCase()，String.prototype.toUpperCase()
    {
        // toLowerCase ：用于将一个字符串全部转为小写
        // toUpperCase ：用于将一个字符串全部转为大写
        // 它们都返回一个新字符串，不改变原字符串
        console.log('[实例方法]---toLowerCase', 'Hello World'.toLowerCase()); // 'hello world'
        console.log('[实例方法]---toUpperCase', 'Hello World'.toUpperCase()); // 'HELLO WORLD'
    }
    //4.10---String.prototype.match()
    {
        //用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串
        //如果没有找到匹配，则返回null
        var result = 'cat, bat, sat, fat'.match('at');
        console.log('[实例方法]---match', result);
        //[ 'at', index: 1, input: 'cat, bat, sat, fat', groups: undefined ]
        console.log('[实例方法]---match', result[0]);
        //'at'
        console.log('[实例方法]---match', result[1]);
        //undefined
        //返回的数组还有index属性(表示匹配字符串开始的位置)和input属性(表示原始字符串)
        console.log('[实例方法]---match', 'cat, bat, sat, fat'.match('xt'));
        //null
        //match方法还可以使用正则表达式作为参数
    }
    // 4.11 --- String.prototype.search() ， String.prototype.replace()
    {
        //search：用法基本等同于match，但是返回值为匹配的第一个位置
        //如果没有找到匹配，则返回-1
        console.log('[实例方法]---search', 'cat, bat, sat, fat'.search('at')); // 1
        // replace(regexp | substr, replacement)
        {
            // 参数 regexp (RegExp) | substr (String) ：规定要替换的模式的 RegExp 对象| 子字符串
            // 参数 replacement (String) ：一个字符串值；规定了替换文本或生成替换文本的函数
            // 返回值 (String) ：一个新的字符串；是用 replacement 替换第一次匹配或所有匹配之后得到的
            // 用于替换匹配的子字符串，一般情况下只替换第一个匹配(除非使用带有g修饰的正则表达式) 
            console.log('[replace]---第一次匹配', 'aaa'.replace('a', 'b')); // baa
            console.log('[replace]---全局匹配', 'aaa'.replace(/a/g, 'b')); // bbb
        }
    }
    // 4.12 --- String.protoytpe.split(separator， howmany = str.length)
    {
        // 参数 separator (String) ：字符串或正则表达式，从该参数指定的地方分隔字符串
        // 可选参数 howmany (Number) ：指定返回的数组的最大长度
        // 返回值 [String] ：一个字符串数组，该数组是通过 separator 指定的边界处将字符串分隔成子串创建的，返回的数组中子串不包括 separator 本身
        console.log('[实例方法]---split', 'a|b|c'.split('|')); // [ 'a', 'b', 'c' ]
        // 如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符
        console.log('[实例方法]---split', 'a|b|c'.split('')); // [ 'a', '|', 'b', '|', 'c' ]
        // 如果省略参数，则返回数组的唯一成员就是原字符串
        console.log('[实例方法]---split', 'a|b|c'.split()); // [ 'a|b|c' ]
        // 如果满足分割规则的 2 个部分紧邻着(即 2 个分割符中间没有其他字符)，则返回数组之中会有一个空字符串
        console.log('[实例方法]---split', 'a||c'.split('|')); // [ 'a', '', 'c' ]
        // 如果满足分割规则的部分处于字符串的开头或结尾(即它的前面或后面没有其他字符)，则返回数组的第一个或最后一个成员是一个空字符串
        console.log('[实例方法]---split', '|b|c'.split('|')); // [ '', 'b', 'c' ]
        console.log('[实例方法]---split', 'a|b|'.split('|')); // [ 'a', 'b', '' ]
        // split 方法还可以接受第二个参数，限定返回数组的最大成员数
        console.log('[实例方法]---split', 'a|b|c'.split('|', 0)); // []
        console.log('[实例方法]---split', 'a|b|c'.split('|', 1)); // [ 'a' ]
        console.log('[实例方法]---split', 'a|b|c'.split('|', 2)); // [ 'a', 'b' ]
        console.log('[实例方法]---split', 'a|b|c'.split('|', 3)); // [ 'a', 'b', 'c' ]
        console.log('[实例方法]---split', 'a|b|c'.split('|', 4)); // [ 'a', 'b', 'c' ]
    }
    //4.13---String.prototype.localeCompare()
    {
        //用于比较2个字符串，它返回一个整数
        //如果 < 0：表示第一个字符串 < 第二个字符串
        //如果 === 0：表示两者相等
        //如果 > 0：表示第一个字符串 > 第二个字符串
        console.log('[实例方法]---localeCompare', 'apple'.localeCompare('banana'));
        //-1
        console.log('[实例方法]---localeCompare', 'apple'.localeCompare('apple'));
        //0
        //该方法的最大特点：就是会考虑自然语言的顺序
        //举例来说，正常情况下，大写的英文字母 < 小写的英文字母
        console.log('[实例方法]---localeCompare', 'B' > 'b');
        //false
        //因为JavaScript采用的是Unicode码点比较，B的码点是66，b的码点是98
        //但是localeCompare方法会考虑自然语言的排序情况，将B排在b的前面
        console.log('[实例方法]---localeCompare', 'B'.localeCompare('b'));
        //1
        //localeCompare还可以有第二个参数，指定所使用的语言(默认是英语)，然后根据该语言的规则进行比较
    }
}
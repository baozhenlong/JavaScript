// RegExp 对象提供正则表达式的功能

// 1 --- 概述
{
    // 正则表达式：是一种表达文本模式(即字符串结构)的方法，有点像字符串的模板，常常用来按照"给定模式"匹配文本
    // 包括普通字符(如 a-z 之间的字母)和特殊字符(称为元字符)
    // 普通字符
    {
        // 没有显式指定为元字符的所有可打印和不可打印字符
        // 包括所有大写和小写字母、所有数字、所有标点符号、一些其他符号
    }
    // 元字符
    {
        // 用来规定其前导字符（即位于元字符前面的字符）在目标对象中的出现模式
        // 定位符
        {
            // 用来描述字符串或单词的边界；不能将定位符与限定符一起使用
            // ^ ：匹配输入字符串的开始位置；如果设置了 RegExp 对象的 multiline 属性，则 ^ 也匹配 \n 或 \r 之后的位置
            // $ ：匹配输入字符串的结尾位置；如果设置了 RegExp 对象的 multiline 属性，则 $ 也匹配 \n 或 \r 之后的位置
            // \b ：匹配一个单词边界，即单词和空格间的位置；例如： er\b 可以匹配 never 中 er 名单不能匹配 verb 中的 er
            // \B ：匹配非单词边界； er\B 能匹配 verb 中的 er ，但不能匹配 never 中的 er
        }
        // 限定符
        {
            // 用来指定正则表达式的一个给定组件必须出现多少次才能满足匹配
            // * ：匹配前面的子表达 0 次或多次；例如： zo* 能匹配 z 以及 zoo ；等价于 {0,}
            // + ：匹配前面的子表达 1 次或多次； 例如： zo+ 能匹配 zo 以及 zoo ，但不能匹配 z ；等价于 {1,}
            // ? ：匹配前面的子表达 0 次或 1 次，或指明一个非贪婪限定符；例如： do(es)? 能匹配 do does doxy ；等价于 {0,1}
            // {n} ： n 是一个非负整数，匹配确定的 n 次；例如： o{2} 不能匹配 Bob 中的 o ，但能匹配 food 中的 2 个 o
            // {n,} ： n 是一个非负整数，至少匹配 n 次；例如： o{2,} 不能匹配 Bob 中的 o ，但能匹配 fooood 中的所有 o
            // {n, m} ： n 和 m 均是一个非负整数，其中 n<=m ；最少匹配 n 次，最多匹配 m 次；例如： o{1,3} 将匹配 fooood 中的前 3 个 o ；逗号和 n m 之间不能有空格
            // ?其他限定符 ：当 ? 紧跟在任何一个其他限定符( *, +, {n}, {n,}, {n,m})后面，匹配模式是非贪婪的
            // 默认的贪婪模式：尽可能多的匹配所搜素的字符串
            // 非贪婪模式：尽可能少的匹配所搜索的字符串
        }
    }
    // 常用非匹配模式
    {
        // . ：匹配除了换行符(\n)之外的任何单字符
        // [.] ：只会匹配 . 字符
        // (pattern) ：匹配 pattern 并获取这一匹配，所获取的匹配可以从产生的 matches 集合得到
        // x|y ：匹配 x 或 y；例如： (z|f)ood 匹配 zood 或 food
        // [^指定字符串] ：除指定字符串以外的其他字符串
        // [xyz] ：字符集合；匹配所包含的任意一个字符；例如： [abc] 匹配 plain 中的 a
        // [^xyz] ：负值字符集合；匹配未包含的任意一个字符；例如： [^abc] 匹配 plain 中 p l i n
        // [a-z] ： 字符范围；匹配指定范围内的任意一个字符；例如： [a-z] 匹配 a-z 范围的任意小写字母字符
        // [^a-z] ： 负值字符范围；匹配任何不在指定范围内的任意字符；例如： [^a-z] 匹配任何不在 a-z 范围内的任意字符
    }
    // 新建正则表达式的 2 种方法：
    {
        // 方法一：使用字面量
        {
            // 以斜杠表示开始和结束
            var regex = /xyz/;
        }
        // 方法二：使用 RegExp 构造函数
        {
            regex = new RegExp('xyz');
        }
        // 上面 2 种写法是等价的，都新建了一个内容为 xyz 的正则表达式对象
        // 区别：
        // 使用字面量在引擎编译代码时，就会新建正则表达式
        // RegExp 构造函数在运行时，新建正则表达式
        // 使用字面量的效率较高
    }
    // 运算符优先级
    {
        // 正则表达式从左到右进行计算，并遵循优先级顺序
        // 从高到低
        {
            // \ ：转义符
            // (), [] ：圆括号，方括号
            // *, +, ?, {n}, {n,}, {n,m} ：限定符
            // ^, $, 任何元字符, 任何字符 ： 定位点和序列，即位置和顺序
            // | ：或操作
        }
    }
    // 示例
    {
        // 简单表达式
        {
            // 在搜索字符串汇总匹配其本身的单个普通字符
            // /a/ ：匹配 a
            // 可以将许多单字符组合起来以形成大的表达式
            // /a7/ ：匹配 a7
        }
        // 字符匹配
        {
            // . ：匹配字符串中的各种打印或非打印字符，除了换行符
            // /a.c/ ：匹配 aac abc 等
        }
        // 中括号表达式
        {
            // 创建匹配字符组的一个列表，在 [] 内放置一个或多个字符
            // 与在任何别的位置一样，普通字符在中括号内表示其本身，即它在输入文本中匹配一次其本身
            // 括在中括号表达式中的字符只匹配处于正则表达式中该位置的单个字符
            // /abc[12345]/ 等价于 /abc[1-5]/ 匹配 abc1 abc2 abc3 abc4 abc5
        }
    }
}

//2---实例属性
{
    //正则对象的实例属性分为2类：
    //2.1---与修饰符相关，返回一个布尔值，表示对应的修饰符是否设置
    {
        //RegExp.prototype.ignoreCase：返回一个布尔值，表示是否设置了 i 修饰符
        //RegExp.prototype.global：返回一个布尔值，表示是否设置了 g 修饰符
        //RegExp.prototype.multiline：返回一个布尔值，表示是否设置了 m 修饰符
        //这3个属性都是只读的
    }
    //2.1---与修饰符无关
    {
        //RegExp.prototype.lastIndex：返回一个整数，表示下一次开始搜素的位置
        //该属性可读写，但是只在进行连续搜索时有意义
        //RegExp.prototype.source：返回正则表达式的字符串形式(不包括反斜杠)
        //该属性只读
    }
}

//3---实例方法
{
    //3.1---RegExp.prototype.test()
    {
        //返回一个布尔值，表示当前模式是否匹配参数字符串
        console.log('[实例方法]---test', /cat/.test('cats and dogs'));
        //true
        //上面代码验证参数字符串之中是否包含cat，结果返回true
        //如果正则表达式都有g修饰符(表示全局搜索)，则每一次test方法都从上一次结束的位置开始向后匹配
        var r = /x/g;
        var s = '_x_x';
        console.log('[实例方法]---test', r.lastIndex);
        //0
        console.log('[实例方法]---test', r.test(s));
        //true
        console.log('[实例方法]---test', r.lastIndex);
        //2
        console.log('[实例方法]---test', r.test(s));
        //true
        console.log('[实例方法]---test', r.lastIndex);
        //4
        console.log('[实例方法]---test', r.test(s));
        //false
        //带有g修饰符时，可以通过正则对象的lastIndex属性指定开始搜索的位置
        r.lastIndex = 4;
        console.log('[实例方法]---test', r.test(s));
        //false；同时lastIndex属性重置为0
        console.log('[实例方法]---test', r.lastIndex);
        //0
        console.log('[实例方法]---test', r.test(s));
        //true
        //注意：带有g修饰符时，正则表达式内部会记住上一次的lastIndex属性，这是不应该更换所要匹配的字符串
        //lastIndex只对同一个正则表达式有效
        //如果正则模式是一个空字符串，则匹配所有字符串
        console.log('[实例方法]---test', new RegExp('').test('abc'));
        //true
    }
    //3.2---RegExp.prototype.exec()
    {
        //用来返回匹配结果；如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回null
        var s = '_x_x';
        var r_1 = /x/;
        var r_2 = /y/;
        console.log('[实例方法]---exec', r_1.exec(s));
        //[ 'x', index: 1, input: '_x_x', groups: undefined ]
        console.log('[实例方法]---exec', r_2.exec(s));
        //null
        //如果正则表达式包含圆括号(即含有"组匹配")，则返回的数组会包含多个成员
        //第一个成员是整个匹配成功的结果，后面的成员是圆括号对应的匹配成功的组
        //即第二个成员对应第一个括号，第三个成员对应第二个括号，以此类推 ，整个数组的length属性等于组匹配的数量再加1
        var r_3 = /_(x)/;
        console.log('[实例方法]---exec', r_3.exec(s));
        //[ '_x', 'x', index: 0, input: '_x_x', groups: undefined ]
        //exec方法返回的数组还包含以下2个属性：
        //input：整个原字符串
        //index：整个模式匹配成功的开始位置；从0开始计数
        var reg = /a/g;
        var str = 'abc_abc_abc';
        console.log('[实例方法]---exec', reg.exec(str));
        //[ 'a', index: 0, input: 'abc_abc_abc', groups: undefined ]
        console.log('[实例方法]---exec', reg.lastIndex);
        //1
        console.log('[实例方法]---exec', reg.exec(str));
        //[ 'a', index: 4, input: 'abc_abc_abc', groups: undefined ]
        console.log('[实例方法]---exec', reg.lastIndex);
        //5
        console.log('[实例方法]---exec', reg.exec(str));
        //[ 'a', index: 8, input: 'abc_abc_abc', groups: undefined ]
        console.log('[实例方法]---exec', reg.lastIndex);
        //9
        console.log('[实例方法]---exec', reg.exec(str));
        //null
        console.log('[实例方法]---exec', reg.lastIndex);
        //0
        //整个字符串已经到达尾部，匹配结果返回null，正则实例对象的lastIndex也重置为0
    }
}

//4---字符串的实例方法
{
    //字符串的实例方法之中，有4中与正则表达式有关
    //4.1---String.prototype.match()：返回一个数组，成员是所有匹配的子字符串
    {
        var s = '_x_x';
        var r_1 = /x/;
        var r_2 = /y/;
        console.log('[字符串实例方法]---match', s.match(r_1));
        //[ 'x', index: 1, input: '_x_x', groups: undefined ]
        //匹配成功，返回一个数组
        console.log('[字符串实例方法]---match', s.match(r_2));
        //null
        //匹配失败返回null
        //如果正则表达式带有g修饰符，会一次性返回所有匹配成功的结果
        s = 'abba';
        var r = /a/g;
        console.log('[字符串实例方法]---match', s.match(r));
        //[ 'a', 'a' ]
        //设置正则表达式的lastIndex属性，对match方法无效，匹配总是从字符串的第一个字符开始
    }
    //4.2---String.prototype.search()：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置
    {
        //返回第一个满足条件的匹配结果在整个字符串中的位置；如果没有任何匹配，则返回-1
        console.log('[字符串实例方法]---search', '_x_x'.search(/x/));
        //1
    }
    //4.3---String.prototype.replace()：按照给定的正则表达式进行替换，返回替换后的字符串
    {
        //可以替换匹配的值
        //它接受2个参数，第一个是正则表达式，表示搜索模式；第二个是替换的内容
        //str.replace(search, replacement)
        //正则表达式如果不加g修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值
        console.log('[字符串实例方法]---replace', 'aaa'.replace('a', 'b'));
        //"baa"
        console.log('[字符串实例方法]---replace', 'aaa'.replace(/a/, 'b'));
        //"baa"
        console.log('[字符串实例方法]---replace', 'aaa'.replace(/a/g, 'b'));
        //"bbb"
        //replace方法的第二个参数可以使用美元符号$，用来指代所替换的内容
        {
            //$&：匹配的字字符串
            //$`：匹配结果前面的文本
            //$'：匹配结果后面的文本
            //$n：匹配成功的第n组内容，n是从1开始的自然数
            //$$：指代美元符号
            console.log('[字符串实例方法]---replace', 'abc'.replace('b', '[$`-$\'-$$-$&]'));
            //"a[a-c-$-b]c"
        }
        //replace方法的第二个参数还可以是一个函数，将每一个匹配内容替换为函数返回值
        //该替换函数，可以接受多个参数：
        //第一个参数是捕捉到的内容
        //第二个参数是捕捉到的组匹配(有多少个组匹配，就有多少个对应的参数)
        //倒数第二个参数是捕捉到的内容在整个字符串中的位置
        //最后一个参数是原字符串
        console.log('[字符串实例方法]---replace', '3 and 5'.replace(/[0-9]+/g, function (match) {
            return match * 2;
        }));
        //6 and 10
    }
    //4.4---String.prototype.split()：按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员
    {
        //该方法接受2个参数：
        //第一个参数时正则表达式，表示分隔规则
        //第二个参数是返回数组的最大成员数
        //非正则分隔
        console.log('[字符串实例方法]---split', 'a, b,c, d'.split(','));
        //[ 'a', ' b', 'c', ' d' ]
        //正则分隔
        console.log('[字符串实例方法]---split', 'a, b,c, d'.split(/, */));
        //[ 'a', 'b', 'c', 'd' ]
        console.log('[字符串实例方法]---split', 'a, b,c, d'.split(/, */, 2));
        //[ 'a', 'b' ]
    }
}

//5---匹配规则
{
    //5.1---字面量字符和元字符
    {
        //字面量字符：在正则表达式之中，某个字符只表示它字面的含义；如/a/匹配a
        //元字符：有特殊含义
        {
            //点字符(.)
            {
                //匹配除回车(\r)、换行(\n)、分隔符(\u20207)、段分隔符(\u2029)以外的所有字符
                //注意：对于码点大于0xFFFF字符，点字符不能正确匹配，会认为这是2个字符
                //c.t匹配c和t之间包含任意一个字符的情况，只要这3个字符在同一行，比如cat、c2t等，但是不匹配coot
            }
            //位置字符
            {
                //用来提示字符所处的位置
                //^：表示字符串开始的位置
                //$：表示字符串结束的位置
                console.log('[匹配规则]---位置字符', /^test/.test('test123'));
                //true
                console.log('[匹配规则]---位置字符', /test$/.test('new test'));
                //true
                console.log('[匹配规则]---位置字符', /^test$/.test('test'));
                //true                
                console.log('[匹配规则]---位置字符', /^test$/.test('test test'));
                //false
            }
            //选择符(|)
            {
                //cat|dog表示匹配cat或dog
                //选择符会包括它前后的多个字符，比如/ab|cd/指的是匹配ab或cd
            }
        }
    }
    //5.2---转义符
    {
        //正则表达式中那些有特殊含义的元字符，如果要匹配它们本身，就需要在它们前面要加上反斜杠
        //正则表达式中，需要反斜杠转义的，一共有12个字符：
        //^
        //.
        //[
        //$
        //(
        //)
        //|
        //*
        //+
        //?
        //{
        //\
        //注意：如果使用RegExp方法生成正则对象，转义需要使用2个斜杠，因为字符串内部会先转义一次，再被正则表达式转义一次
        console.log('[匹配规则]---转义符', new RegExp('1\+1').test('1+1'));
        //false
        console.log('[匹配规则]---转义符', new RegExp('1\\+1').test('1+1'));
        //true
    }
    //5.3---特殊字符
    {
        //\cX：表示Ctrl-[X]，其中X是A-Z之中任一个英文字母，用来匹配控制字符
        //[\b]：匹配退格键
        //\n：匹配换行键
        //\r：匹配回车键
        //\t：匹配制表符tab
        //\v：匹配垂直制表符
        //\f：匹配换页符
        //\0：匹配null字符
        //\xhh：匹配一个以2位16进制数表示的字符
        //\uhhh：匹配一个以4位16进制表示的Unicode字符
    }
    //5.4---字符类
    {
        //表示有一系列字符可供选择，只要匹配其中一个就可以了
        //所有可供选择的字符都放在方括号内，比如[xyz]表示x、y、z之中任选一个匹配
        console.log('[匹配规则]---字符类', /[abc]/.test('hello world'));
        //false
        console.log('[匹配规则]---字符类', /[abc]/.test('apple'));
        //true
        //有2个字符在字符类中有特殊含义
        //脱字符(^)
        {
            //如果方括号内的第一个字符是[^]，则表示除了字符类之中的字符，其他字符都可以匹配
            //比如，[^xyz]表示除了x、y、z之外都可以匹配
            console.log('[匹配规则]---字符类 脱字符', /[^abc]/.test('hello world'));
            //true
            console.log('[匹配规则]---字符类 脱字符', /[^abc]/.test('a'));
            //flase
            //如果方括号内没有其他字符，即只有[^]，就表示匹配一切字符，其中包括换行符
            var s = 'yes\nno';
            console.log('[匹配规则]---字符类 脱字符', s.match(/yes.no/));
            //null
            console.log('[匹配规则]---字符类 脱字符', s.match(/yes[^]no/));
            //[ 'yes\nno', index: 0, input: 'yes\nno', groups: undefined ]
            //注意：脱字符只有在字符类的第一个位置才有特殊含义，否则就是字面含义
        }
        //连字符(-)
        {
            //某些情况下，对于连续序列的字符，连字符(-)用来提供简写形式
            //表示字符的连续范围；比如[abc]可以写成[a-c]
            console.log('[匹配规则]---字符类 连字符', /a-z/.test('b'));
            //false
            console.log('[匹配规则]---字符类 连字符', /[a-z]/.test('b'));
            //true
            //只有当连字号用在方括号之中，才表示连续的字符序列
            //[1-31]：表示1到3
        }
    }
    //5.5---预定义模式
    {
        //指的是某些常见模式的简写方式
        //\d：匹配0-9之间的任一数字，相当于[0-9]
        //\D：匹配所有0-9以外的字符，相当于[^0-9]
        //\w：匹配任意的字母、数字、下划线，相当于[A-Za-z0-9_]
        //\W：匹配除所有字母、数字、下划线以外的字符，相当于[^A-Za-z0-9_]
        //\s：匹配空格；包含换行符、制表符、空格符，相当于[\n\t\v\r\f]
        //\S：匹配非空格的字符，相当于[^\n\t\v\r\f]
        //\b：匹配词的边界；词首必须独立(词尾是否独立未指定)
        //\B：匹配非词边界，即词的内部；词首不独立
        //通常正则表达式遇到换行符就会停止匹配
        console.log('[预定义模式]---\b', /\bworld/.test('hello world'));
        //true
        console.log('[预定义模式]---\b', /\bworld/.test('hello-world'));
        //true
        console.log('[预定义模式]---\b', /\bworld/.test('helloworld'));
        //false
        console.log('[预定义模式]---\B', /\Bworld/.test('hello-world'));
        //false
        console.log('[预定义模式]---\B', /\Bworld/.test('helloworld'));
        //true
    }
    //5.6---重复类
    {
        //模式的精确匹配次数，使用大括号表示
        //{n}：表示恰好重复n次
        //{n,}：表示至少重复n次
        //{n,m}：表示重复不少于n次，不多于m次
        console.log('[重复类]---', /lo{2}k/.test('look'));
        //true
    }
    //5.7---量词符
    {
        //用来设定某个模式出现的次数
        //?：表示某个模式出现0次或1次，等同于{0, 1}
        //*：表示某个模式出现0次或多次，等同于{0,}
        //+：表示某个模式出现1次或多次，等同于{1,}
    }
    //5.8---贪婪模式
    {
        //?*+默认情况下都是最大可能匹配，即匹配直到下一个字符不满足匹配规则位置，这被称为贪婪模式
        var s = 'aaba';
        console.log('[贪婪模式]---', s.match(/a+/));
        //[ 'aa', index: 0, input: 'aaba', groups: undefined ]
        //将贪婪模式改为非贪婪模式：模式结尾+?
        //??：表示某个模式出现0次或1次，匹配时采用非贪婪模式
        //*?：表示某个模式出现0次或多次，匹配时采用非贪婪模式
        //+?：表示某个模式出现1次或多次，匹配时采用非贪婪模式
    }
    //5.9---修饰符
    {
        //修饰符表示模式的附加规则，放在正则模式的最尾部
        //修饰符可以单个使用，也可以多个使用
        //test/ig
        //5.9.1---g修饰符
        {
            //默认情况下，第一次匹配成功后，正则对象就停止向下匹配了
            //g修饰符：表示全局匹配，加上它以后，正则对象将匹配全部符合条件的结果，主要用于搜索和替换
            var regex = /b/;
            var str = 'abba';
            console.log('[修饰符]---g', regex.test(str));
            //true
            console.log('[修饰符]---g', regex.test(str));
            //true
            console.log('[修饰符]---g', regex.test(str));
            //true
            regex = /b/g;
            console.log('[修饰符]---g', regex.test(str));
            //true
            console.log('[修饰符]---g', regex.test(str));
            //true
            console.log('[修饰符]---g', regex.test(str));
            //false
            //正则模式不含g修饰符，每次都从字符串头部开始匹配
            //正则模式含有g修饰符，每次都是从上一次匹配成功处，开始向后匹配
        }
        //5.9.2---i修饰符
        {
            //默认情况下，正则对象区分字母的大小写，加上i修饰符以后表示忽略大小写
            console.log('[修饰符]---i', /abc/.test('ABC'));
            //false
            console.log('[修饰符]---i', /abc/i.test('ABC'));
            //true
        }
        //5.9.3---m修饰符
        {
            //表示多行模式，会修改^和$的行为
            //^匹配字符串的开始处
            //$匹配字符串的结尾处
            //加上m修饰符后
            //^还会匹配行首
            //$还会匹配行尾
            console.log('[修饰符]---m', /world$/.test('hello world\n'));
            //false
            console.log('[修饰符]---m', /world$/m.test('hello world\n'));
            //true
        }
    }
    //5.10---组匹配
    {
        //5.10.1---概述
        {
            //正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容
            console.log('[组匹配]---概述', 'abcabc'.match(/(.)b(.)/));
            //[ 'abc', 'a', 'c', index: 0, input: 'abcabc', groups: undefined ]
            //上面代码中，第一个括号捕获a，第二个括号捕获c
            console.log('[组匹配]---概述', 'abcabc'.match(/(.)b(.)/g));
            //[ 'abc', 'abc' ]
            //注意：使用组匹配时，不宜使用g修饰符，否则match方法不会捕获分组的内容
            //上面代码中，match方法只捕获了匹配整个表达式的部分
            //这是必须使用正则表达式的exec方法，配合循环，才能读到每一轮匹配的组捕获
            var str = 'abcabc';
            var reg = /(.)b(.)/g;
            while (true) {
                var result = reg.exec(str);
                if (result) {
                    console.log('[组匹配]---概述', result);
                } else {
                    break;
                }
            }
            //[ 'abc', 'a', 'c', index: 0, input: 'abcabc', groups: undefined ]
            //[ 'abc', 'a', 'c', index: 3, input: 'abcabc', groups: undefined ]
            //正则表达式内部，还可以用\n引用括号匹配的内容，n是从1开始的自然数，表示对应顺序的括号
            console.log('[组匹配]---概述', /(.)b(.)\1b\2/.test('abcabc'));
            //true
            //上面代码中，\1表示第一个括号匹配的内容(即a)，\2表示第二个括号内匹配的内容(即c)
            //括号还可以嵌套
            console.log('[组匹配]---概述', /y((..)\2)\1/.test('yabababab'));
            //true
            //上面代码中，\1指向外层括号，\2指向内层括号
        }
        //5.10.2---非捕获组
        {
            //(?:x)：称为非捕获组，表示不返回该组匹配的内容，即匹配的结果中不计入这个括号
            console.log('[组匹配]---非捕获组', 'abc'.match(/(?:.)b(.)/));
            //[ 'abc', 'c', index: 0, input: 'abc', groups: undefined ]
            //上面代码中，一共使用了2个括号；其中第一个括号是非捕获组，所以最后返回的结果中没有第一个括号，只有第二个括号匹配的内容
        }
        //5.10.3---先行断言
        {
            //x(?=y)：称为先行断言，x只有在y前面才匹配，y不会被计入返回结果
            //比如要匹配后面跟着百分号的数字，可以写成/\d+(?=%)/
            //先行断言中，括号里的部分是不会返回的
            console.log('[组匹配]---先行断言', 'ababc'.match(/b(?=c)/));
            //[ 'b', index: 3, input: 'ababc', groups: undefined ]
            console.log('[组匹配]---先行断言', 'ababc'.match(/b(c)/));
            //[ 'bc', 'c', index: 3, input: 'ababc', groups: undefined ]
        }
        //5.10.4---先行否定断言
        {
            //x(?!y)：称为先行否定断言，x只有不在y前面才匹配，y不会被计入返回结果
            //比如：要匹配后面的不是百分号的数字，/\d+(?!%)/
            console.log('[组匹配]---先行否定断言', 'abd'.match(/b(?!c)/));
            //[ 'b', index: 1, input: 'abd', groups: undefined ]
        }
    }
}
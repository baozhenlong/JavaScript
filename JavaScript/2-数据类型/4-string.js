//---字符串

//1---概述
//1.1---定义
{
    //字符串：0个或多个排在一起的字符，放在单引号('')或双引号("")之中
    //'abc'
    //"abc"
    //单引号字符串的内部，可以使用双引号
    //双引号字符串的内部，可以使用单引号
    //如果要在单引号字符串的内部，使用单引号，就必须在内部的单引号前面加上反斜杠\，用来转义
    //双引号字符串内部使用双引号，也是如此
    'Did she say \'hello\'';
    "Did she say \"hello\"";
    //由于HTML语言的属性值使用双引号，所以很多项目约定JavaScript语言的字符串只使用单引号
    //字符串默认只能写在一行内，分成多行将会报错
    //如果长字符串必须分成多行，可以在每一行的尾部使用反斜杠\，输出的是单行
    //注意：反斜杠\的后面必须是换行符，而且不能有其他字符(比如空格)，否则会报错
    var long_string = 'Long\
        long\
        long\
        string ';
    console.log(long_string); //Longlonglongstring
    //连接运算符(+)可以连接多个单行字符串，将字符串拆成多行书写，输出的是单行
    var long_string_2 = 'Long' +
        'long' +
        'long' +
        'string';
    console.log(long_string_2); //Longlonglongstring
}
//1.2---转义
{
    //反斜杠\在字符串内部有特殊含义，用来表示一些特殊字符，所以又称为转义符
    //需要用反斜杠转义的特殊字符：
    //\0：null
    //\b：后退键
    //\f：换页符
    //\n：换行符
    //\r：回车键
    //\t：制表符
    //\v：垂直制表符
    //\'：单引号
    //\""：双引号
    //\\：反斜杠
    console.log('1\n2');
    //1
    //2
    //反斜杠的3种特殊用法：待补充
    //如果在非特殊字符前面使用反斜杠，则反斜杠会被忽略
    console.log('\a'); //a
}
//1.3---字符串和数组
{
    //字符串可以被视为字符数组，因此可以使用数组的方括号运算符，用来返回某个位置的字符(位置编号从0开始)
    var s = "hello";
    console.log(s[0]); //h
    console.log(s[1]); //e
    console.log(s[4]); //o
    //如果方括号中的数字超过字符串的长度，或者方括号中根本不是数字，则返回undefined
    console.log('abc' [3]); //undefined
    console.log('abc' [-1]); //undefined
    console.log('abc' ['x']); //undefined
    //但是，字符串与数组的相似性仅此而已
    //实际上无法改变字符串之中的单个字符
    s[1] = 'a';
    s[5] = '!';
    delete s[0];
    console.log(s); //hello
    //字符串内部的单个字符无法通过方括号形式改变和增删，这些操作会默默地失败
}
//1.4---length属性
{
    //length属性返回字符串的长度，该属性也是无法改变的
    console.log(s.length); //5
    s.length = 3;
    console.log(s.length); //5
}

//2---字符集
{
    //JavaScript使用Unicode字符集；JavaScript引擎内部，所有字符都用Unicode表示
    //JavaScript不仅以Unicode存储字符，还允许直接在程序中使用Unicode码点表示字符
    //即将字符写成\uxxxx的形式，其中xxxx代表该字符的Unicode码点，比如\u00A9代表版权符号
    console.log('\u00A9'); //©
    //解析代码的时候，JavaScript会自动识别一个字符是字面形式表示，还是Unicode形式表示
    //输出给用户的时候，所有字符都会转成字面形式
    // var f\u006F\u006F = 'abc';
    // console.log(foo); //abc
    //每个字符在JavaScript内部都是以16位(即2个字符)的UTF-16格式存储，即JavaScript的单位字符长度固定为16位长度，即2个字节
    //UTF-16有2种长度：待补充
    //JavaScript对于UTF-16的支持是不完整的：待补充
}

//3---Base64转码
{
    //有时，文本里面包含一些不可打印的符号，比如ASCII码0到31的符号都无法打印出来
    //这时，可以使用Base64编码，将它们转成可以打印的字符
    //有时，需要以文本格式传递二进制数据，那么也可以使用Base编码
    //Base就是一种编码方法，可以将任意值转成0~9、A~Z、a~z、+和/这64个字符组成的可打印字符
    //使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理
    //JavaScript原生提供2个Base64相关的方法
    //btoa：任意值转为Base64编码
    //atob：Base64编码转为原来的值
    //注意：这2个方法不适合非ASCII码的字符，会报错
}
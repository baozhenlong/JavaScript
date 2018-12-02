//---数值

//1---概述
//1.1---整数和浮点数
{
    //JavaScript内部，所有数字都是以64位浮点数形式存储，即使整数也是如此；所以1和1.0是相同的，是同一个数
    console.log(1 === 1.0); //true
    //这就是说，JavaScript语言的底层根本没有整数，所有数字都是小数(64位浮点数)
    //容易造成混淆的是，某些运算只有整数才能完成，此时JavaScript会自动把64位浮点数，转为32位整数，然后再进行运算
    //由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心
    console.log(0.1 + 0.2 === 0.3); //false
    console.log(0.3 / 0.1); //2.9999999999999996
    console.log((0.3 - 0.2) === (0.2 - 0.1)); //false
}
//1.2---数值精度
{
    //根据国际标准IEEE 754，JavaScript浮点数的64个二进制位，从最左边开始，是这样组成的：
    //第1位：符号位；0表示正数，1表示负数---决定了一个数的正负
    //第2位到12位(共11位)：指数部分---决定了数值的大小
    //第13位到64位(共52)：小数部分；即有效数字---决定了数值的精度
    //指数部分一共有11个二进制位，因此大小范围就是0到2047
    //IEEE 754规定如果指数部分的值在0到2047之间(不含2个端点)，那么有效数字的第一位默认总是1，不保存在在64位浮点数之中
    //也就是说有效数字这时总是1.xx...xx的形式，其中xx...xx的部分保存在64位浮点数之中，最长可能为52位
    //因此JavaScript提供的有效数字最长为53个二进制位
    //(-1)符号位 * 1.xx...xx * 2^指数部分
    //上面公式是正常情况下(指数部分在0到2047之间)，一个数在JavaScript内部实现的表示形式
    //精确度最多只能到53个二进制位，这意味着，绝对值小于2的53次方的整数，即-2^53到2^53，都可以精确表示
    console.log(Math.pow(2, 53)); //9007199254740992
    console.log(Math.pow(2, 53) + 1); //9007199254740992
    console.log(Math.pow(2, 53) + 2); //9007199254740994
    console.log(Math.pow(2, 53) + 3); //9007199254740996
    console.log(Math.pow(2, 53) + 4); //9007199254740996
    //上面代码中，大于2的53次方以后，整数运算的结果开始出现错误；所以大于2的53次方的数值，都无法保持精度
}
//1.3--数值范围
{
    //根据标准，64位浮点数的指数部分的长度是11个二进制位，意味着指数部分的最大值是2047(2^11-1)
    //也就是说，64位浮点数的指数部分的值最大为2047，分出一半表示负数
    //则JavaScript能够表示的数值范围为2^1024到2^-1023(开区间)，超出这个范围的数无法表示
    //如果一个数>=2^1024，那么就会发生"正向溢出"，即JavaScript无法表示这么大的数，这是会返回Infinity
    console.log(Math.pow(2, 1024)); //Infinity
    //如果一个数<=2^-1075(指数部分最小值-1023，再加上小数部分的52位)，那么就会发生"负向溢出"，即JavaScript无法表示这么小的数，这是会直接返回0
    console.log(Math.pow(2, -1075)); //5e-324
    console.log(Math.pow(2, -1076)); //0
    var x = 0.5;
    for (var i = 0; i < 25; i++) {
        x = x * x;
    }
    console.log("x = ", x); //0
    //上面代码中，对0.5连续做25次平方，由于最后结果太接近0，超出可表示的范围，JavaScript就直接将其转为0
    //JavaScript提供Number对象的MAX_VALUE和MIN_VALUE属性，返回可以表示的具体的最大值和最小值
    console.log(Number.MAX_VALUE); //1.7976931348623157e+308
    console.log(Number.MIN_VALUE); //5e-324
}

//2---数字的表示法
{
    //JavaScript的数值有很多种表示方法，可以用字面形式直接表示，比如35(十进制)和0xFF(十六进制)
    //数值也可以采用科学计数法表示：
    console.log(123e3); //123000
    console.log(123e-3); //0.123
    console.log(-3.E2); //-300
    console.log(-3.E+2); //-300
    console.log(.2e-2); //0.002
    //科学计数法允许字母e或E的后面，跟着一个整数，表示则个数值的指数部分
    //以下2中情况，JavaScript会自动将数值转为科学计数法表示，其他情况都采用字面形式直接表示：
    //情况1---小数点前的数字>21位
    console.log(123456789012345678901); //123456789012345678901
    console.log(1234567890123456789012); //1.2345678901234568e+21
    //情况2---小数点后紧跟5个以上的0
    console.log(0.000005); //0.000005
    console.log(0.0000006); //6e-7
}

//3---数值的进制
{
    //使用字面量表示一个数值时，JavaScript对整数提供4种进制的表示方法：十进制、十六进制、八进制、二进制
    //十进制：没有前导0的数值
    //八进制：有前缀0o或0O的数值；或者有前导0，且只用到0-7的八个阿拉伯数字的数值
    //十六进制：有前缀0x或0X的数值
    //二进制：有前缀0b或0B的数值
    //默认情况下，JavaScript内部会自动将八进制、十六进制、二进制转为十进制
    console.log(0o377); //255
    console.log(0O377); //255
    console.log(0xff); //255
    console.log(0b11); //3
    //如果八进制、十六进制、二进制的数值里面，出现不属于该进制的数字，就会报错
}

//4---特殊数值
//4.1---正零和负零
{
    //JavaScript的64位浮点数之中，有一个二进制位是符号位；这意味着，任何一个数都有一个对应的负值，就连0也不例外
    //JavaScript内部实际上存在2个0：+0和-0；区别就是64位浮点数表示法的符号位不同；它们是等价的
    console.log(0 === +0); //true
    console.log(0 === -0); //true
    console.log(-0 === +0); //true
    //几乎所有场合，+0和-0都会被当作正常的0
    console.log("+0 = ", +0); //0
    console.log("-0 = ", -0); //0
    console.log((+0).toString()); //"0"
    console.log((-0).toString()); //"0"
    //唯一有区别的场合是，+0或-0当作分母，返回值是不相等的
    console.log(1 / +0); //Infinity
    console.log(1 / -0); //-Infinity
}
//4.2---NaN
{
    //4.2.1---含义
    {
        //NaN是JavaScript的特殊值，表示"非数字"
        //主要出现在将字符串解析成数字出错的场合
        console.log(5 - "x"); //NaN
        //另外一些数学函数的运算结果会出现NaN
        console.log(Math.acos(2)); //NaN
        //0除以0也会得到NaN
        console.log(0 / 0); //NaN
        //需要注意的是：NaN不是独立的数据类型，而是一个特殊数值，它的数据类型依然属于Number
        console.log(typeof NaN); //"number"
    }
    //4.2.2---运算规则
    {
        //NaN不等于任何值，包括它本身
        console.log(NaN === NaN); //false
        //数组的indexOf方法内部使用的是严格相等运算符，所以该方法对NaN不成立
        console.log([NaN].indexOf(NaN)); //-1
        //NaN在布尔运算时被当作false
        console.log(Boolean(NaN)); //false
        //NaN与任何数(包括它自己)的运算，得到的都是NaN
        console.log(NaN + 1); //NaN
        console.log(NaN - 1); //NaN
        console.log(NaN * 1); //NaN
        console.log(NaN / 1); //NaN
    }
}
//4.3---Infinity
{
    //4.3.1---含义
    {
        //Infinity表示"无穷"，用来表示2种场景：
        //场景1---正的数值太大、负的数值太小，无法表示
        console.log(Math.pow(2, 1024)); //Infinity
        //场景2---非0数值除以0，得到Infinity
        console.log(0 / 0); //NaN
        console.log(1 / 0); //Infinity
        //Infinity有正负之分，Infinity表示正的无穷，-Infinity表示负的无穷
        //Infinity>一切数值(除了NaN)；-Infinity<一切数值(除了NaN)
        console.log(Infinity === -Infinity); //false
        console.log(1 / -0); //-Infinity
        console.log(-1 / -0); //Infinity
        console.log(-1 / 0); //-Infinity
        //Infinity和NaN比较，总是返回false
    }
    //4.3.2---运算规则
    {
        //Infinity的四则运算，符合无穷的数学计算规则
        console.log("[有限数]---", 5 * Infinity); //Infinity
        console.log("[有限数]---", 5 - Infinity); //-Infinity
        console.log("[有限数]---", 5 / Infinity); //0
        console.log("[有限数]---", Infinity / 5); //Infinity
        console.log("[0]---", 0 * Infinity); //NaN
        console.log("[0]---", 0 / Infinity); //0
        console.log("[0]---", Infinity / 0); //Infinity
        console.log("[0]---", -Infinity / 0); //-Infinity
        console.log("[Infinity]---", Infinity + Infinity); //Infinity
        console.log("[Infinity]---", Infinity * Infinity); //Infinity
        console.log("[Infinity]---", Infinity - Infinity); //NaN
        console.log("[Infinity]---", Infinity / Infinity); //NaN
        //Infinity与null计算时，null会转成0，等同于与0的计算
        console.log("[null]---", null * Infinity); //NaN
        console.log("[null]---", null / Infinity); //0
        console.log("[null]---", Infinity / null); //Infinity
        //Infinity与undefined计算，返回的都是NaN
    }
}

//5---与数值相关的全局方法
//5.1---parseInt()
{
    //5.1.1---基本用法
    {
        //parseInt方法用于将字符串转为整数
        console.log("[parseInt]---基本用法= ", parseInt("123")); //123
        //如果字符串头部有空格 ，空格会被自动去除
        console.log("[parseInt]---基本用法= ", parseInt("   81")); //81
        //如果parseInt的参数不是字符串，则会先转为字符串再转换
        console.log("[parseInt]---基本用法= ", parseInt(1.23)); //1
        //等价于
        console.log("[parseInt]---基本用法= ", parseInt("1.23")); //1
        //字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分
        console.log("[parseInt]---基本用法= ", parseInt("8a")); //8
        console.log("[parseInt]---基本用法= ", parseInt("12**")); //12
        console.log("[parseInt]---基本用法= ", parseInt("12.34")); //12
        console.log("[parseInt]---基本用法= ", parseInt("15e2")); //15
        console.log("[parseInt]---基本用法= ", parseInt("15px")); //15
        //如果字符串的第一个字符不能转为数字(后面跟着数字的正负号除外)，返回NaN
        console.log("[parseInt]---基本用法= ", parseInt("abc")); //NaN
        console.log("[parseInt]---基本用法= ", parseInt(".3")); //NaN
        console.log("[parseInt]---基本用法= ", parseInt("")); //NaN
        console.log("[parseInt]---基本用法= ", parseInt("+")); //NaN
        console.log("[parseInt]---基本用法= ", parseInt("+1")); //1
        //如果字符串以0x或0X开头，将其按照十六进制解析
        console.log("[parseInt]---基本用法= ", parseInt("0x10")); //16
        //如果字符串以0开头，将其按照十进制解析
        console.log("[parseInt]---基本用法= ", parseInt("011")); //11
        //parseInt会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果
        console.log("[parseInt]---基本用法= ", parseInt("1000000000000000000000.5")); //1e+21???
        console.log("[parseInt]---基本用法= ", parseInt("1e+21")); //1
        console.log("[parseInt]---基本用法= ", parseInt("0.00000008")); //0???
        console.log("[parseInt]---基本用法= ", parseInt("8e-7")); //8
    }
    //5.1.2---进制转换
    {
        //parseInt方法还可以接受第2个参数([2,36])；表示被解析的值的进制，返回该值对应的十进制数
        //默认情况下，parseInt的第2个参数为10，即默认十进制转十进制
        console.log("[parseInt]---进制转换= ", parseInt("1000")); //1000
        //等价于
        console.log("[parseInt]---进制转换= ", parseInt("1000", 10)); //1000
        //指定进制
        console.log("[parseInt]---进制转换= ", parseInt("1000", 2)); //8
        console.log("[parseInt]---进制转换= ", parseInt("1000", 6)); //246
        console.log("[parseInt]---进制转换= ", parseInt("1000", 8)); //512
        //如果第2个参数不是数值，会自动转为一个整数；这个整数只有在2到36之间，才能得到有意义的结果，超出这个范围，则返回NaN
        //如果第2个参数是0、undefined、null，则直接忽略
        console.log("[parseInt]---进制转换= ", parseInt("10", 1)); //NaN
        console.log("[parseInt]---进制转换= ", parseInt("10", 37)); //NaN
        console.log("[parseInt]---进制转换= ", parseInt("10", 0)); //10
        console.log("[parseInt]---进制转换= ", parseInt("10", null)); //10
        console.log("[parseInt]---进制转换= ", parseInt("10", undefined)); //10
        //如果字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值；如果最高位无法转换，则直接返回NaN
        console.log("[parseInt]---进制转换= ", parseInt("1546", 2)); //1
        console.log("[parseInt]---进制转换= ", parseInt("546", 2)); //NaN
    }
}
//5.2---parseFloat()
{
    //parseFloat()用于将一个字符串转为浮点数
    console.log("[parseFloat]---= ", parseFloat("3.14")); //3.14
    //如果字符串符合科学计数法，则会进行相应的转换
    console.log("[parseFloat]---= ", parseFloat("314e-2")); //3.14
    console.log("[parseFloat]---= ", parseFloat("0.0314E+2")); //3.14
    //如果字符串包含不能转为浮点数的字符，则不进行往后转换，返回已经转好的部分
    console.log("[parseFloat]---= ", parseFloat("3.14more")); //3.14
    //parseFloat会自动过滤字符串前导的空格
    console.log("[parseFloat]---= ", parseFloat("\t\v\r12.34\n")); //12.14
    //如果参数不是字符串，或者字符串的第一个字符不能转化为浮点数，则返回NaN
    console.log("[parseFloat]---= ", parseFloat("[]")); //NaN
    console.log("[parseFloat]---= ", parseFloat("ff2")); //NaN
    console.log("[parseFloat]---= ", parseFloat("")); //NaN
    //这些特点使得parseFloat的转换结果不同于Number函数
    console.log("[parseFloat]---= ", parseFloat(true)); //NaN
    console.log("[Number]---= ", Number(true)); //1
    console.log("[parseFloat]---= ", parseFloat(null)); //NaN
    console.log("[Number]---= ", Number(null)); //0
    console.log("[parseFloat]---= ", parseFloat("")); //NaN
    console.log("[Number]---= ", Number("")); //0
    console.log("[parseFloat]---= ", parseFloat("123.45#")); //123.45
    console.log("[Number]---= ", Number("123.45#")); //NaN
}
//5.3---isNaN()
{
    //isNaN方法可以用来判断一个值是否为NaN
    console.log("[isNaN]---= ", isNaN("NaN")); //true
    console.log("[isNaN]---= ", isNaN(123)); //false
    //但是，isNaN只对数值有效，如果传入其他值，会被先转成数值
    //比如，传入字符串的时候，字符串会被先转成NaN，所以最后返回true
    //isNaN为true的值，有可能不是NaN，而是一个字符串
    console.log("[isNaN]---= ", isNaN("hi")); //true
    //等价于
    console.log("[isNaN]---= ", isNaN(Number("hi"))); //true
    //出于同样的原因，对于对象和数组，isNaN也返回true
    console.log("[isNaN]---= ", isNaN({})); //true
    //等价于
    console.log("[isNaN]---= ", isNaN(Number({}))); //true
    console.log("[isNaN]---= ", isNaN(["xyz"])); //true
    //等价于
    console.log("[isNaN]---= ", isNaN(Number(["xyz"]))); //true
    //但是对于空数组和只有一个数值成员的数组，isNaN返回false
    console.log("[isNaN]---= ", isNaN([])); //false
    console.log("[isNaN]---= ", isNaN([123])); //false
    console.log("[isNaN]---= ", isNaN(["123"])); //false
    //这些数组能被Number函数转成数值
    //因此使用isNaN之前，最好判断一下数据类型
    function my_is_NaN(value) {
        return typeof value === "number" && isNaN(value);
    }
    //判断NaN更可靠的方法是，利用NaN为唯一不等于自身的值的这个特点，进行判断
    function my_is_NaN_better(value) {
        return value !== value;
    }
}
//5.4---isFinite()
{
    //isFinite方法返回一个布尔值，表示某个值是否为正常的数值
    console.log("[isFinite]---= ", isFinite(Infinity)); //false
    console.log("[isFinite]---= ", isFinite(-Infinity)); //false
    console.log("[isFinite]---= ", isFinite(NaN)); //false
    console.log("[isFinite]---= ", isFinite(undefined)); //false
    console.log("[isFinite]---= ", isFinite(null)); //true
    console.log("[isFinite]---= ", isFinite(-1)); //true
    //除了Infinity、-Infinity、NaN、undefined这几个值会返回false。isFinite对于其他的数值都会返回true
    console.log("[isFinite]---= ", isFinite("1")); //true
    console.log("[isFinite]---= ", isFinite("x")); //false
}
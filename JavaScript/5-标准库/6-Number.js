//---Number对象

//1---概述
{
    //Number对象是数值对应的包装对象，
    //作为构造函数使用：用于生成值为数值的对象
    var n = new Number(1);
    console.log('[概述]---', typeof n);
    //'object'
    //作为工具函数使用：可以将任何类型的值转为数值
    console.log('[概述]---', Number(true));
    //1
}

//2---静态属性
{
    //Number对象拥有以下一些静态属性(即直接定义在Number对象上的属性，而不是定义在实例上的属性)
    //Number.POSITIVE_INFINITY：正的无限，指向Infinity
    console.log('[概述]---', Number.POSITIVE_INFINITY);
    //Infinity
    //Number.NEGATIVE_INFINITY：负的无限，指向-Infinity
    console.log('[概述]---', Number.NEGATIVE_INFINITY);
    //-Infinity
    //Number.NaN：表示非数值，指向NaN
    console.log('[概述]---', Number.NaN);
    //NaN
    //Number.MIN_VALUE：表示最小的正数(即最接近0的正数，在64位浮点数体系中为5e-324)；相应的，最接近0的负数为-Number.MIN_VALUE
    console.log('[概述]---', Number.MIN_VALUE);
    //5e-324
    //Number.MIN_SAFE_INTEGER：表示能够精确表示的最小整数，即-9007199254740991
    console.log('[概述]---', Number.MIN_SAFE_INTEGER);
    //-9007199254740991
    //Number.MAX_SAFE_INTEGER：表示能够精确表示的最大整数，即9007199254740991
    console.log('[概述]---', Number.MAX_SAFE_INTEGER);
    //9007199254740991
}

//3---实例方法
{
    //Number对象有4个实例方法，都跟将数值转换成指定格式有关
    //3.1---Number.prototype.toString()
    {
        //用来将一个数值转为字符串形式
        console.log('[实例方法]---toString', (10).toString());
        //'10'
        //toString方法可以接受一个参数，表示输出的进制
        //如果省略这个参数，默认将数值先转为十进制，再输出字符串
        //否则，就根据参数指定的进制，将一个数字转化成某个进制的字符串
        console.log('[实例方法]---toString', (10).toString(2));
        //'1010'
        console.log('[实例方法]---toString', (10).toString(8));
        //'12'
        console.log('[实例方法]---toString', (10).toString(16));
        //'a'
        //上面代码中，10一定要放在括号里，这样表明后面的点表示调用对象属性
        //如果不加括号，这个点会被JavaScript引擎解释成小数点，从而报错
        //除了为10加上括号，还可以在10后面加2个点，JavaScript会吧第一个点理解成小数点(即10.0)，把第二个点理解成调用对象属性，从而得到正确结果
        console.log('[实例方法]---toString', 10..toString());
        //10
        //这意味着，可以直接对一个小数使用toString方法
        //通过方括号也可以调用toString方法
        console.log('[实例方法]---toString', 10['toString']());
        //10
        //toString方法只能将十进制的数，转为其它进制的字符串
        //如果要将其他进制的数，转回十进制，需要使用parseInt方法
    }
    //3.2---Number.prototype.toFixed()
    {
        //先将一个数转为指定位数的小数，然后返回这个小数对应的字符串
        console.log('[实例方法]---toFixed', (10).toFixed(2));
        //'10.00'
        console.log('[实例方法]---toFixed', 10.005.toFixed(2));
        //'10.01'
        //参数是小数位数，有效范围为0到20，超出这个范围将抛出RangeError错误
    }
    //3.3---Number.prototype.toExponential()
    {
        //用于将一个数转为科学计数法形式
        console.log('[实例方法]---toExponential', (10).toExponential());
        //'1e+1'
        console.log('[实例方法]---toExponential', (10).toExponential(1));
        //'1.0e+1'
        console.log('[实例方法]---toExponential', (10).toExponential(2));
        //'1.00e+1'
        console.log('[实例方法]---toExponential', (1234).toExponential());
        //'1.234e+3'
        console.log('[实例方法]---toExponential', (1234).toExponential(1));
        //'1.2e+3'
        console.log('[实例方法]---toExponential', (1234).toExponential(2));
        //'1.23e+3'
        //参数是小数点后有效数字的位数，范围为0到20，超出这个范围，会抛出一个RangeError错误
        //默认值为指定数字所需的任意位数。
    }
    //3.4---Number.prototype.toPrecision()
    {
        //用于将一个数转为指定位数的有效数字
        console.log('[实例方法]---toPrecision', (12.34).toPrecision(1));
        //1e+1
        console.log('[实例方法]---toPrecision', (12.34).toPrecision(2));
        //12
        console.log('[实例方法]---toPrecision', (12.34).toPrecision(3));
        //12.3
        console.log('[实例方法]---toPrecision', (12.34).toPrecision(4));
        //12.34
        console.log('[实例方法]---toPrecision', (12.34).toPrecision(5));
        //12.340
        //参数是有效数字的位数，范围是1到21，超出这个范围会抛出RangeError错误
        //该方法用于四舍五入时不太可靠，跟浮点数不是精确存储有关
        console.log('[实例方法]---toPrecision', (12.35).toPrecision(3));
        //12.3
        console.log('[实例方法]---toPrecision', (12.25).toPrecision(3));
        //12.3
        console.log('[实例方法]---toPrecision', (12.15).toPrecision(3));
        //12.2
        console.log('[实例方法]---toPrecision', (12.45).toPrecision(3));
        //12.4
    }
}

//4---自定义方法
{
    //Number.prototype对象上面可以自定义方法，被Number的实例继承
    Number.prototype.add = function (x) {
        return this + x;
    };
    console.log('[自定义方法]---add', 8['add'](2));
    //10
    //在数值上调用某个方法，数值会自动转为Number的实例对象
    //注意：
    //数值的自定义方法，只能定义在它的原型对象Number.prototype上面，
    //数值本身是无法自定义属性的
    //数值自动转为Number的实例对象，调用结束后，该对象自动销毁
}
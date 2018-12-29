//---数据类型的转换

//1---概述
{
    //JavaScript是一种动态类型语言，变量没有类型限制，可以随时赋予任意值
    var x = true ? 1 : 'a';
    //虽然变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的
    //如果运算符发现，运算子的类型与预期不符，就会自动转换类型
    //比如，减法运算符预期左右两侧的运算子应该是数值，如果不是，就会自动将它们转为数值
    console.log('[减法]---', '4' - '3'); //1
}

//2---强制转换
//2.1---Number()
{
    //可以将任意类型的值转化成数值
    //参数是原始类型值
    {
        //数值
        {
            //转换后还是原来的值
            console.log('[Number]---数值', Number(324)); //324
        }
        //字符串
        {
            //如果可以被解析为数值，则转换为相应的数值
            console.log('[Number]---', Number('324')); //324
            //如果不可以被解析为数值，返回NaN
            console.log('[Number]---', Number('324abc')); //NaN
            //空字符串转为0
            console.log('[Number]---', Number('')); //0
            //Number和parseInt

            //parseInt()---逐个解析字符
            //Number()---整体转换字符串的类型，只要有一个字符无法转成数值，整个字符串就会被转为NaN
        }
        //布尔值
        {
            //true转成1，false转成0
            console.log('[Number]---', Number(true)); //1
            console.log('[Number]---', Number(false)); //0
        }
    }
    //参数是undefined和null
    {
        console.log('[Number]---', Number(undefined)); //NaN
        console.log('[Number]---', Number(null)); //0
    }
    //参数是对象
    {

    }
}
//2.2---String()
{

}
//2.3---Boolean()
{

}

//3---自动转换
//3.1---自动转换为布尔值
{

}
//3.2---自动转换为字符串
{

}
//3.3---自动转换为数值
{

}
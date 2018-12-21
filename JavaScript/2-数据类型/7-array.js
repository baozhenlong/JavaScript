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
    //如果认为设置length为不合法的值，JavaScript会报错
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
    //注意：由于数组本质上是一种对象，所以可以为数组添加属性，但是这不影响length属性的值
    var a = [];
    a['p'] = 'abc';
    console.log('[length属性]---length = ', a.length); //0
    a[2.1] = 'abc';
    console.log('[length属性]---length = ', a.length); //0
    //上面代码将数组的键分别设为字符串和小数，结果都不影响length属性
    //因为，length属性的值就是等于最大的数字键+1，而这个数组没有整数键，所以length属性保持为0
    //如果数组的键名是添加超出范围的数值，该键名会自动转为字符串

}

//4---in运算符

//5---for-in循环和数组的遍历

//6---数组的空位

//7---类似数组的对象
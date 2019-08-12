// --- Math对象
{
    // Math 是 JavaScript 的原生对象，提供各种数学功能
    // 该对象不是构造函数，不能生成实例，所有的属性和方法都必须在 Math 对象上调用
}

// 1 --- 静态属性
{
    // Math对象的静态属性，提供以下一些数学常数
    // Math.E ：常数 e
    // Math.LN2 ： 2 的自然对数
    // Math.LN10 ： 10 的自然对数
    // Math.LOG2E ：以 2 为底的 e 的对数
    // Math.LOG10E ：以 10 为底的 e 的对数
    // Math.PI ：常数 π
    // Math.SQRT1_2 ： 0.5 的平方根
    // Math.SQRT2  ： 2 的平方根
    // 这些属性都是只读的，不能修改
}

// 2 --- 静态方法
{
    // 2.1 --- Math.abs(value)
    {
        // 返回参数值的绝对值
        console.log('[静态方法]---abs', Math.abs(1)); // 1
        console.log('[静态方法]---abs', Math.abs(-1)); // 1
    }
    // 2.2 --- Math.max([value1[, value2[, ...]]]) ， Math.min()
    {
        // Math.max([value1[, value2[, ...]]])
        {
            // 返回参数之中最大的那个值
            // 如果没有参数，则返回 -Infinity
            // 如果有某个参数为 NaN，或是不能转换成数字的非数字值，则返回 NaN
            console.log('[静态方法]---max no arguments', Math.max()); // -Infinity
            console.log('[静态方法]---max not number', Math.max(1, 'a', 2)); // NaN
            console.log('[静态方法]---max', Math.max(2, -1, 5)); // 5
        }
        // Math.min([value1[, value2[, ...]]])
        {
            // 返回参数之中最小的那个值
            // 如果没有参数，则返回 Infinity
            // 如果有某个参数为 NaN，或是不能转换成数字的非数字值，则返回 NaN
            console.log('[静态方法]---min no arguments', Math.min()); // Infinity
            console.log('[静态方法]---min not number', Math.min(1, 'a', 2)); // NaN
            console.log('[静态方法]---min', Math.min(2, -1, 5)); // -1
        }
        // 例子：确定一组数的最值，避免多余的循环和 if 语句
        let values = [1, 2, 3];
        console.log('[静态方法]---求最值 max', Math.max.apply(Math, values)); // 3
    }
    // 2.3 --- Math.floor() ， Math.ceil()
    {
        // Math.floor(value)
        {
            // 返回小于参数值的最大整数（地板值）；向下舍入
            // 返回值 <= value
            console.log('[静态方法]---floor', Math.floor(3.2)); // 3
            console.log('[静态方法]---floor', Math.floor(-3.2)); // -4
        }
        // Math.ceil(value)
        {
            // 返回大于参数值的最小整数（天花板值）；向上舍入
            // 返回值 >= value
            console.log('[静态方法]---ceil', Math.ceil(3.2)); // 4
            console.log('[静态方法]---ceil', Math.ceil(-3.2)); // -3
        }
        // 这两个方法可以结合起来，实现一个总是返回数值的整数部分的函数
        function toInteger(x) {
            x = Number(x);
            return x < 0 ? Math.ceil(x) : Math.floor(x);
        }
        console.log('[静态方法]---floor ceil', toInteger(3.2)); // 3
        console.log('[静态方法]---floor ceil', toInteger(3.8)); // 3
        console.log('[静态方法]---floor ceil', toInteger(-3.2)); // 3
        console.log('[静态方法]---floor ceil', toInteger(-3.8)); // 3
    }
    // 2.4 --- Math.round()
    {
        // 对一个数进行标准舍入，四舍五入为最接近的整数
        // 如果参数的小数部分 > 0.5 ，则参数将四舍五入为具有较高绝对值的整数
        // 如果参数的小数部分 < 0.5 ，则参数将四舍五入为具有较低绝对值的整数
        // 如果参数的小数部分 = 0.5 ，则参数将四舍五入为正无穷方向的下一个整数
        console.log('[静态方法]---round', Math.round(0.1)); // 0
        console.log('[静态方法]---round', Math.round(0.5)); // 1
        console.log('[静态方法]---round', Math.round(0.6)); // 1
        // 等同于
        function toRound(x) {
            return Math.floor(x + 0.5);
        }
        console.log('[静态方法]---round', toRound(0.1)); // 0
        console.log('[静态方法]---round', toRound(0.5)); // 1
        console.log('[静态方法]---round', toRound(0.6)); // 1
        //注意：它对负数的处理(主要是对 0.5 的处理)
        console.log('[静态方法]---round', Math.round(-1.1)); // -1
        console.log('[静态方法]---round', Math.round(-1.5)); // -1
        console.log('[静态方法]---round', Math.round(-1.6)); // -2
    }
    // 2.5 --- Math.pow(base, exponent)
    {
        // 返回以第一个参数为底数，第二个参数为幂的指数值
        // 参数 base ：底数
        // 参数 exponent ：指数
        console.log('[静态方法]---pow', Math.pow(2, 2)); // 4
        //等同于
        console.log('[静态方法]---pow', 2 ** 2); // 4
    }
    // 2.6 --- Math.sqrt()
    {
        //返回参数值的平方根
        //如果参数是一个负值，则返回NaN
        console.log('[静态方法]---sqrt', Math.sqrt(4));
        //2
        console.log('[静态方法]---sqrt', Math.sqrt(-4));
        //NaN
    }
    //2.7---Math.log()
    {
        //返回以e为底的自然对数值
        console.log('[静态方法]---log', Math.log(Math.E));
        //1
        //如果要计算以10为底的对数，可以先用Math.log求出自然对数，然后除以Math.LN10
        console.log('[静态方法]---log', Math.log(100) / Math.LN10);
        //2
        //如果要计算以2为底的对数，可以先用Math.log求出自然对数，然后除以Math.LN12
        console.log('[静态方法]---log', Math.log(8) / Math.LN2);
        //3
    }
    // 2.8 --- Math.exp()
    {
        //返回常数e参数次方
        console.log('[静态方法]---exp', Math.E);
        //2.718281828459045
        console.log('[静态方法]---exp', Math.exp(1));
        //2.718281828459045
    }
    // 2.9 --- Math.random()
    {
        // 返回值 [0, 1)
        // 返回 0 到 1 之间的一个伪随机数，可能等于 0 ，但是一定小于 1
        // 任意范围的随机数生成函数
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
        // 任意范围的随机整数生成函数
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        // 返回随机字符
        function randomStr(len) {
            var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            alphabet += 'abcdefghijklmnopqrstuvwxyz';
            alphabet += '0123456789-_';
            var str = '';
            for (var i = 0; i < len; i++) {
                var rand = Math.floor(Math.random() * alphabet.length);
                str += alphabet.substring(rand, rand + 1);
            }
            return str;
        }
    }
    //2.10---三角函数方法
    {
        //参数为弧度值
        //Math.sin()：返回参数的正弦
        //Math.cos()：返回参数的余弦
        //Math.tan()：返回参数的正切
        //Math.asin()：返回参数的反正弦
        //Math.acos()：返回参数的反余弦弦
        //Math.atan()：返回参数的反正切
    }
}
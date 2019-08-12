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
    // 2.1 --- Math.abs()
    {
        // 返回参数值的绝对值
        console.log('[静态方法]---abs', Math.abs(1)); // 1
        console.log('[静态方法]---abs', Math.abs(-1)); // 1
    }
    // 2.2 --- Math.max() ， Math.min()
    {
        // Math.max() 
        // 返回参数之中最大的那个值
        console.log('[静态方法]---max', Math.max(2, -1, 5)); // 5
        // Math.min()
        // 返回参数之中最小的那个值
        console.log('[静态方法]---min', Math.min(2, -1, 5)); // -1
        // 如果参数为空， max 返回 -Infinity ； min 返回 Infinity
        console.log('[静态方法]---max', Math.max()); // -Infinity
        console.log('[静态方法]---min', Math.min()); // Infinity
    }
    // 2.3 --- Math.floor() ， Math.ceil()
    {
        //Math.floor：返回小于参数值的最大整数(地板值)
        console.log('[静态方法]---floor', Math.floor(3.2));
        //3
        console.log('[静态方法]---floor', Math.floor(-3.2));
        //-4
        //Math.ceil：返回大于参数值的最小整数(天花板值)
        console.log('[静态方法]---ceil', Math.ceil(3.2));
        //4
        console.log('[静态方法]---ceil', Math.ceil(-3.2));
        //-3
        //这两个方法可以结合起来，实现一个总是返回数值的整数部分的函数
        function to_integer(x) {
            x = Number(x);
            return x < 0 ? Math.ceil(x) : Math.floor(x);
        }
        console.log('[静态方法]---floor ceil', to_integer(3.2));
        //3
        console.log('[静态方法]---floor ceil', to_integer(3.8));
        //3
        console.log('[静态方法]---floor ceil', to_integer(-3.2));
        //-3
        console.log('[静态方法]---floor ceil', to_integer(-3.8));
        //-3
    }
    //2.4---Math.round()
    {
        //用于四舍五入
        console.log('[静态方法]---round', Math.round(0.1));
        //0
        console.log('[静态方法]---round', Math.round(0.5));
        //1
        console.log('[静态方法]---round', Math.round(0.6));
        //1
        //等同于
        function to_round(x) {
            return Math.floor(x + 0.5);
        }
        console.log('[静态方法]---round', to_round(0.1));
        //0
        console.log('[静态方法]---round', to_round(0.5));
        //1
        console.log('[静态方法]---round', to_round(0.6));
        //1
        //注意：它对负数的处理(主要是对0.5的处理)
        console.log('[静态方法]---round', Math.round(-1.1));
        //-1
        console.log('[静态方法]---round', Math.round(-1.5));
        //-1
        console.log('[静态方法]---round', Math.round(-1.6));
        //-2
    }
    //2.5---Math.pow()
    {
        //返回以第一个参数为底数，第二个参数为幂的指数值
        console.log('[静态方法]---pow', Math.pow(2, 2));
        //4
        //等同于
        console.log('[静态方法]---pow', 2 ** 2);
        //4
        console.log('[静态方法]---pow', Math.pow(2, 3));
        //8
        //等同于
        console.log('[静态方法]---pow', 2 ** 3);
        //8
    }
    //2.6---Math.sqrt()
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
    //2.8---Math.exp()
    {
        //返回常数e参数次方
        console.log('[静态方法]---exp', Math.E);
        //2.718281828459045
        console.log('[静态方法]---exp', Math.exp(1));
        //2.718281828459045
    }
    //2.9---Math.random()
    {
        //返回0到1之间的一个伪随机数，可能等于0，但是一定小于1
        //任意范围的随机数生成函数
        function get_random_arbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
        //任意范围的随机整数生成函数
        function get_random_int(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        //返回随机字符
        function random_str(len) {
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
// --- Boolean 对象

// 1 --- 概述
{
    // Boolean 对象是 JavaScript 的 3 个包装对象之一
    // 作为构造函数，它主要用于生成布尔值的包装对象实例
    var b = new Boolean(true);
    console.log('[概述]---', typeof b); // 'object'
    console.log('[概述]---', b.valueOf()); // true
    //注意： false 对应的包装对象实例，布尔值运算结果也是 true
    if (new Boolean(false)) {
        console.log('[概述]---true');
    }
    // true
    // false 对应的包装对象实例是一个对象，进行逻辑运算时，被自动转化成布尔值 true
    // 因为所有对象对应的布尔值都是 true
    if (new Boolean(false).valueOf()) {
        console.log('[概述]---true');
    }
    // 无输出
    // 实例的 valueOf 方法返回实例对应的原始值，本例为 false
}

// 2 --- Boolean 函数的类型转换作用
{
    // 作为工具方法使用：将任意值转为布尔值
    console.log('[工具方法]---', Boolean(undefined));
    console.log('[工具方法]---', Boolean(null));
    console.log('[工具方法]---', Boolean(0));
    console.log('[工具方法]---', Boolean(''));
    console.log('[工具方法]---', Boolean(NaN));
    // false
    console.log('[工具方法]---', Boolean(1));
    console.log('[工具方法]---', Boolean('false'));
    console.log('[工具方法]---', Boolean([]));
    console.log('[工具方法]---', Boolean({}));
    console.log('[工具方法]---', Boolean(function () {}));
    console.log('[工具方法]---', Boolean(/foo/));
    // true
    // 使用双重的否运算符也可以将任意值转为对应的布尔值
    console.log('[工具方法]---', !!undefined);
    console.log('[工具方法]---', !!null);
    console.log('[工具方法]---', !!0);
    console.log('[工具方法]---', !!'');
    console.log('[工具方法]---', !!NaN);
    // false
    console.log('[工具方法]---', !!1);
    console.log('[工具方法]---', !!'false');
    console.log('[工具方法]---', !![]);
    console.log('[工具方法]---', !!{});
    console.log('[工具方法]---', !! function () {});
    console.log('[工具方法]---', !!/foo/);
    // true
    // 对于一些特殊值， Boolean 对象前面加不加 new ，会得到完全相反的结果
    if (Boolean(false)) {
        console.log('[工具方法]---true');
    }
    // 无输出
    if (new Boolean(false)) {
        console.log('[构造函数]---true');
    }
    // true
    if (Boolean(null)) {
        console.log('[工具方法]---true');
    }
    // 无输出
    if (new Boolean(null)) {
        console.log('[构造函数]---true');
    }
    // true
}
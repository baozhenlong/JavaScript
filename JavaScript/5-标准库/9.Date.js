// Date 对象

// Date 对象是 JavaScript 原生的时间库
// 它以国际标准时间(UTC) 1970 年 1 月 1 日 00:00:00 作为时间的零点，可以表示的时间范围是前后各 1 亿天(单位为毫秒)

// 1 --- 普通函数的用法
{
    // Date 对象可以作为普通函数直接调用，返回一个代表当前时间的字符串
    console.log('[普通函数]---', Date());
    // Mon Feb 11 2019 10:02:48 GMT+0800 (中国标准时间)
}

// 2 --- 构造函数的用法
{
    // 返回一个 Date 对象的实例
    // 如果不加参数，实例代表的就是当前时间
    {
        var today = new Date();
        // Date 实例有一个独特的地方：
        // 其他对象求值的时候，都是默认调用 .valueOf 方法
        // 但是 Date 实例求值的时候，默认调用的是 toString 方法，返回的是一个字符串，代表该实例对应的时间
        console.log('[构造函数]---无参', today); // 2019-02-11T02:06:55.031Z
        console.log('[构造函数]---无参', today.toString()); // 2019-02-11T02:06:55.031Z
    }
    // 接受多种格式的参数，返回一个该参数对应的时间实例
    {
        // 参数为时间零点开始计算的毫秒数；可以是负整数，代表 1970 元旦之前的时间
        {
            console.log('[构造函数]---毫秒数', new Date(1378218728000)); // 2013-09-03T14:32:08.000Z
            console.log('[构造函数]---毫秒数', new Date(-1378218728000)); // 1926-04-30T09:27:52.000Z
        }
        // 参数为日期字符串；只要是能被 Date.parse 方法解析的字符串，都可以当参数
        {
            console.log('[构造函数]---日期字符串', new Date('January 6, 2013')); // 2013-01-05T16:00:00.000Z
            console.log('[构造函数]---日期字符串', new Date('2013-1-6')); // 2013-01-05T16:00:00.000Z
        }
        // 参数为多个整数，代表年、月、日、小时、分钟、秒、毫秒；年月必需，其他参数可选
        {
            console.log('[构造函数]---多个整数', new Date(2013, 0, 6, 1, 2, 3, 4)); // 2013-01-05T17:02:03.004Z
            // 各个参数的取值范围：
            {
                // 年：使用四位数年份；如果写成 2 位数或个位数，则加上 1900，即 10 代表 1910 ；如果是负数，表示公元前
                // 月： 0 表示 1 月，依次类推， 11 表示 12 月
                // 日： 1-31 ；默认值为 1
                // 小时： 0-23 ；默认值为 0
                // 分钟： 0-59 ；默认值为 0
                // 秒： 0-59 ；默认值为 0
                // 毫秒： 0-999 ；默认值为 0
                // 这些参数如果超出了正常范围，会被自动折算
                // 月 15 ：折算为下一年的 4 月
                // 日 0 ：代表上个月的最后一天
                // 负数，表示扣去的时间
            }
        }
    }
}

// 3 --- 日期的运算
{
    // 类型自动转换时， Date 实例
    // 如果转为数值，则等于对应的毫秒数
    // 2 个日期实例对象进行减法运算时，返回的是它们间隔的毫秒数
    // 如果转为字符串，则等于对应的日期字符串
    // 2 个日期实例对象进行加法运算时，返回的是 2 个字符串连接而成的新字符串
}

// 4 --- 静态方法
{
    // 时间零点： 1970 年 1 月 1 日 00:00:00 UTC
    // 4.1 --- Date.now()
    {
        // 返回当前时间距离时间零点的毫秒数
        console.log('[静态方法]---now', Date.now()); // 1549853457076
    }
    // 4.2--- Date.parse()
    {
        // 用来解析日期字符串，返回该时间距离时间零点的毫秒数
        // 日期字符串一般符合 RFC 2822 和 ISO 8061 这两个标准
        // 即 YYYY-MM-DDTHH:mm:ss.sssZ 格式，其中最后的 Z 表示时区
        // 如果解析失败，返回 NaN
    }
    // 4.3 --- Date.UTC()
    {
        // 接受年、月、日等变量作为参数，返回该时间距离时间零点的毫秒数
        // 格式
        // Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])
        console.log('[静态方法]---now', Date.UTC(2011, 0, 1, 2, 3, 4, 567)); // 1293847384567
        // 该方法的参数用法与 Date 构造函数完全一致
        // 区别：
        // Date.UTC 方法的参数，会被解释为 UTC 时间(世界标准时间)
        // Date 构造函数的参数，会被解释为当前时区的时间
    }
}

// 5 --- 实例方法
{
    // Date 的实例对象，有几十个自己的方法，除了 valueOf 和 toString ，可以分为以下三类
    // to 类：从 Date 对象返回一个字符串，表示指定的时间
    // get 类：获取 Date 对象的日期和时间
    // set 类：设置 Date 对象的日期和时间
    var d = new Date();
    // 5.1 --- Date.prototype.valueOf()
    {
        // 返回实例对象距离时间零点对应的毫秒数，该方法等同于 getTime 方法
        console.log('[实例方法]---valueOf', d.valueOf()); // 1549854772139
        console.log('[实例方法]---getTime', d.getTime()); // 1549854772139
        // 预期为数值的场合， Date 实例会自动调用该方法
    }
    // 5.2 --- to 类方法
    {
        // 5.2.1 --- Date.prototype.toString()
        {
            // 返回一个完整的日期字符串
            console.log('[实例方法]---toString', d.toString());
            // Mon Feb 11 2019 11:15:22 GMT+0800 (中国标准时间)
        }
        // 5.2.2 --- Date.prototype.toUTCString()
        {
            // 返回对应的UTC时间，也就是比北京时间晚8个小时
            console.log('[实例方法]---toUTCString', d.toUTCString());
            // Mon, 11 Feb 2019 03:16:52 GMT
        }
        // 5.2.3 --- Date.prototype.toISOString()
        {
            // 返回对应时间的 ISO8601 写法
            console.log('[实例方法]---toISOString', d.toISOString());
            // 2019-02-11T03:18:12.143Z
        }
        // 5.2.4 --- Date.prototype.toJSON()
        {
            // 返回一个符合 JSON 格式的 ISO 日期字符串，与 toISOString 方法的返回结果完全相同
            console.log('[实例方法]---toJSON', d.toJSON());
            // 2019-02-11T03:19:48.798Z
        }
        // 5.2.5 --- Date.prototype.toDateString()
        {
            // 返回日期字符串(不含小时、分、秒)
            console.log('[实例方法]---toDateString', d.toDateString());
            // Mon Feb 11 2019
        }
        // 5.2.6 --- Date.prototype.toTimeString()
        {
            // 返回日期字符串(不含年、月、日)
            console.log('[实例方法]---toTimeString', d.toTimeString());
            // 11:22:00 GMT+0800 (中国标准时间)
        }
        // 5.2.7 --- 本地时间
        {
            // Date.prototype.toLocaleString()：完整的本地时间
            console.log('[实例方法]---toLocaleString', d.toLocaleString()); // 2019-2-11 11:25:01
            // Date.prototype.toLocaleDateString()：本地日期(不含小时、分、秒)
            console.log('[实例方法]---toLocaleDateString', d.toLocaleDateString()); // 2019-2-11
            // Date.prototype.toLocaleTimeString()：本地时间(不含年、月、日)
            console.log('[实例方法]---toLocaleTimeString', d.toLocaleTimeString()); // 11:25:01
            // 这 3 个方法都有 2 个可选参数
            // locales ：指定所用语言的字符串
            // options ：配置对象
        }
    }
    // 5.3 --- get类方法；用来获得实例对象的某个方面的值
    {
        // getTime() ：返回实例对象距离时间零点的毫秒数，等同于 valueOf 方法
        console.log('[实例方法]---getTime', d.getTime()); // 1549857256284
        // getFullYear() ：返回四位的年份
        console.log('[实例方法]---getFullYear', d.getFullYear()); // 2019
        // getMonth() ：返回月份； 0 表示 1 月， 11 表示 12 月
        console.log('[实例方法]---getMonth', d.getMonth()); // 1
        // getDate() ：返回实例对象对应每个月的几号；从 1 开始
        console.log('[实例方法]---getDate', d.getDate()); // 11
        // getHours() ：返回小时； 0-23
        console.log('[实例方法]---getHours', d.getHours()); // 11
        // getMinutes() ：返回分钟； 0-59
        console.log('[实例方法]---getMinutes', d.getMinutes()); // 54
        // getSeconds() ：返回秒； 0-59
        console.log('[实例方法]---getSeconds', d.getSeconds()); // 16
        // getMilliseconds() ：返回毫秒； 0-999
        console.log('[实例方法]---getMilliseconds', d.getMilliseconds()); // 284
        // getTimezoneOffset() ：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素
        // 所有这些 get 方法返回的都是当前时区的时间(整数)
        // Date对象还提供了这些方法对应的 UTC 版本，用来返回 UTC 时间
    }
    // 5.4 --- set类方法
    {
        // Date 对象提供了一系列 set 方法，用来设置实例对象的各个方面
        // setFullYear(year [, month, date]) ：设置 4 位年份
        // setMonth(month [, date]) ：设置月份； 0-11
        // setDate(date) ：设置实例对象对应的每个月的几号； 1-31 ，返回改变后毫秒时间戳
        // setHours(hours [, min, sec, ms]) ：设置小时； 0-23
        // setMinutes(min [, sec, ms]) ：设置分钟； 0-59
        // setSeconds(sec [, ms]) ：设置秒； 0-59
        // setMilliseconds(ms) ：设置毫秒； 0-999
        // setTime(ms) ：设置毫秒时间戳
        // 这些方法基本是跟 get 方法一一对应，但是没有 setDay 方法，因为星期几是计算出来的，而不是设置的
        // set 方法的参数都会自动折算：
        // 如果参数超过当月的最大天数，则向下一个月顺延
        // 如果参数是负数，表示从上个月的最后一天开始减去的天数
        // set 系列方法除了 setTime() ，都有对应的 UTC 版本，即设置 UTC 时区的时间
    }
}
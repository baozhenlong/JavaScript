//---console对象与控制台

//1---console对象
{
    //console对象是JavaScript的原生对象
    //console的常见用途有2个：
    {
        //用途---1---调试程序，显示网页代码运行时的错误信息
        //用途---2---提供了一个命令行接口，用来与网页代码互动
    }
    //console对象的浏览器实现，包含在浏览器自带的开发工具之中，包含多个面板：
    {
        //Elements：查看网页的HTML源码和CSS代码
        //Resources：查看网页加载的各种资源文件(比如代码文件、字体文件、CSS文件等)，
        //以及在硬盘上创建的各种内容(比如本地缓存、Cookie、Local Storage)
        //Network：查看网页的HTTP通讯情况
        //Sources：查看网页加载的脚本源码
        //Timeline：查看各种网页行为随时间变化的情况
        //Performance：查看网页的性能情况，如CPU和内存消耗
    }
    //console面板又称为控制台，基本上就是一个命令行窗口，可以在提示符下，键入各种命令
}

//2---console对象的静态方法
{
    //2.1---console.log(), console.info(), console.debug()
    {
        //console.log方法用于在控制台输出信息；它可以接受一个或多个参数，将它们连接起来输出
        console.log('hello world'); //hello world
        console.log('a', 'b', 'c'); //a b c
        //console.log方法会自动在每次输出的结尾，添加换行符
        console.log(1);
        console.log(2);
        //1
        //2
        //如果第一个参数是格式字符串(使用了格式占位符)，console.log方法将依次用后面的参数替换占位符，然后再进行输出
        console.log('%s + %s = %s', 1, 2, 3);
        //1 + 2 = 3
        //console.log方法支持以下占位符，不同类型的数据必须使用对应的占位符
        {
            //%s：字符串
            //$d：整数
            //%i：整数
            //%f：浮点数
            //%o：对象的链接
            //%c：CSS格式字符串
            var number = 7;
            var color = 'red';
            console.log('%d %s balloons', number, color);
            //7 red balloons
            //使用%c占位符时，对应的参数必须是CSS代码，用来对输出内容进行CSS渲染
            // console.log(
            //     '%cThis text is styled!',
            //     'color: red; background: yellow; font-size 24px;'
            // );
            //输出的内容将显示为黄底红字
        }
        //console.log方法的2种参数格式，可以结合在一起使用
        console.log('%s + %s', 1, 1, '= 2');
        //1 + 1 = 2
        //如果参数是一个对象，console.log会显示该对象的值
        console.log({
            foo: 'bar'
        });
        //{ foo: 'bar' }
        console.log(Date);
        //[Function: Date]
        //console.info是console.log方法别名，用法完全一样
        //只不过console.info方法会在输出信息的前面，加上一个蓝色图标
        //console.debug与console.log方法类似，会在控制台输出调试信息但是
        //默认情况下，console.debug输出的信息不会显示，只有在打开显示级别在verbose的情况下，才会显示
        //console对象的所有方法，都可以被覆盖
        //因此可以按照自己的需要，定义console.log方法
        ['log', 'info', 'warn', 'error'].forEach(function (method) {
            console[method] = console[method].bind(
                console,
                new Date().toISOString()
            );
        });
        console.log('测试');
        //上面代码表示，使用自定义的console.log方法，可以在显示结果前添加当前时间
    }
    //2.2---console.warn(), console.error()
    {

    }
    //2.3---console.table()
    {

    }
    //2.4---console.count()
    {

    }
    //2.5---console.dir(), console.dirxml()
    {

    }
    //2.6---console.assert()
    {

    }
    //2.7---console.time(), console.timeEnd()
    {

    }
    //2.8---console.group(), console.groupEnd(), console.groupCollapsed()
    {

    }
    //2.9---console.trace(), console.clear()
    {

    }
}

//3---控制台命令行的API

//4---debugger语句
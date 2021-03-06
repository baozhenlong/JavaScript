//---定时器
//JavaScript提供定时执行代码的功能，叫做定时器
//主要由setTimeout()和setInterval()这2个函数来完成
//它们向任务队列添加定时任务

//1---setTimeout
{
    //用来指定某个函数或某段代码，在多少毫秒之后执行
    //它返回一个值，用来标识定时器，以后可以用来取消这个定时器
    // var timer_id = setTimeout(func|ConvolverNode, delay)
    //setTimeout函数接受2个参数
    //第一个参数func|code：是将要推迟执行的函数名或者一段代码
    //第二个参数delay：是推迟执行的毫秒数；如果省略，则默认为0
    //允许更多的参数：它们将依次传入推迟执行的函数(回调函数)
    console.log('[setTimeout]---', 1);
    var timer_id = setTimeout(function (a, b) {
        console.log('[setTimeout]---', 2, '更多参数', (a + b));
    }, 1000, 2, 3);
    console.log('[setTimeout]---', 3);
    //1
    //3
    //2 更多参数 5
    //注意：如果回调函数是对象的方法，那么setTimeout使得方法内部的this关键字指向全局环境，而不是定义时所在的那个对象
    {
        var obj = {
            x: 2,
            y: function () {
                console.log('[setTimeout]---', this === obj);
            }
        };
        setTimeout(obj.y, 1000);
        //false
    }
    //解决方法一：将obj.y放入一个函数
    {
        setTimeout(function () {
            obj.y();
        }, 1000);
        //true
    }
    //解决方法二：使用bind方法，将obj.y这个方法绑定在obj上面
    {
        setTimeout(obj.y.bind(obj), 1000);
        //true
    }
}

//2---setInterval()
{
    //用法与setTimeout完全一致，区别仅仅在于setInterval指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行
    //setInterval指定的是"开始执行"之间的间隔，并不考虑每次任务执行本身所消耗的时间
    //因此实际上，2次执行之间的间隔会小于指定的时间
    //比如，setInterval指定每 100ms 执行一次，每次执行需要 5ms ，那么第一次执行结束后95ms，第二次执行就会开始
    //如果某次执行耗时特别长，比如需要 105ms ，那么它结束后，下一次执行就会立即开始
    //为了确保 2 次执行之间有固定的间隔，可以不用 setInterval ，而是每次执行结束后，使用setTimeout指定下一次执行的具体时间
    {
        var i = 0;
        setTimeout(function f() {
            i++;
            console.log('[setInterval]---i =', i);
            if (i < 3) {
                setTimeout(f, 2000);
            }
        }, 2000);
        //1
        //2
        //3
        //上面代码可以确保，下一次执行总是在本次执行结束之后的 2000ms 开始
    }
}

//3---clearTimeout(), clearInterval()
{
    // setTimeout 和 setInterval 函数，都返回一个值，用来标识定时器
    //将该值传入 clearTimeout 和 clearInterval 函数，就可以 取消对应的定时器
}

//4---实例：debounce函数
{
    //有时，不希望回调函数被频繁调用
    // debounce (防抖动)做法：
    //如果在间隔时间内，发生新的事件，则不触发回调函数，并重新开始计时
    //如果过了指定时间，没有发生新的事件，再触发回调函数
    function debounce(fn, delay, obj) {
        var timer = null;
        return function () {
            var args = arguments;
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                fn.apply(obj, args);
                timer = null;
            }, delay);
        }
    }
    //上面代码中，只要在指定时间间隔内，发生新的时间，就会取消上一次的定时器，然后新建一个定义时
    //这样就保证了回调函数之间的调用间隔，至少是指定的时间间隔
}

//5---运行机制
{
    // setTimeout 和 setInterval 的运行机制：
    //是将指定的代码移出本轮事件循环，等到下一轮事件循环，再检查是否到了指定时间
    //如果到了，就执行对应的代码；如果不到，就继续等待
    //这意味着， setTimeout 和 setInterval 指定的回调函数，必须等到本轮事件循环的所有同步任务都执行完，才会开始执行
    //由于前面的任务到底需要多少时间执行完，是不确定的，所以没办法保证， setTimeout 和setInterval 指定的任务，一定会按照预定时间执行
    //注意：生效后 setInterval 不会产生累积效应
}

//6---setTimeout(f, 0)
{
    //6.1---含义
    {
        //setTimeout的作用是将代码推迟到指定时间执行，如果指定时间为0，那么会立刻执行吗
        //答案是不会；因为必须要等到当前脚本的同步任务，全部处理完以后，才会执行 setTimeout 指定的回调函数
        //也就是说， setTimeout(f, 0) 会在下一轮事件循环一开始就执行
        setTimeout(function () {
            console.log('[setTimeout(f, 0)]---1');
        });
        console.log('[setTimeout(f, 0)]---2');
        console.log('[setTimeout(f, 0)]---3');
        console.log('[setTimeout(f, 0)]---4');
        console.log('[setTimeout(f, 0)]---5');
        // [setTimeout(f, 0)]---2
        // [setTimeout(f, 0)]---3
        // [setTimeout(f, 0)]---4
        // [setTimeout(f, 0)]---5
        // [setTimeout(f, 0)]---1
        //同步任务，在本轮事件循环执行；而异步任务 setTimeout 则是在下一轮事件循环执行
        //总之， setTimeout(f, 0) 这种写法的目的是，尽可能早地执行 f ，但是并不能保证立刻就执行 f
        //实际上， setTimeout(f, 0) 不会真的在 0ms 之后运行，不同的浏览器有不同的实现
    }
    //6.2---应用
    {
        //调整事件的发生顺序
        //由于 setTimeout(f, 0) 实际上意味着，将任务放到浏览器最早可得的空闲时段执行
        //所以那些计算量大、耗时长的任务，常常会被放到几个小部分，分别放到 setTimeout(f, 0) 里面执行
    }
}
//--- Promise 对象

//1---概述
{
    // Promise 对象是 JavaScript 异步操作解决方案，为异步操作提供统一接口
    //它起到代理作用，充当异步操作与回调函数之间的中介，使得异步操作具备同步操作的接口
    // Promise 可以让异步操作写起来，就像在写同步操作的流程，而不必一层层地嵌套回调函数

    //首先， Promise 是一个对象，也是一个构造函数
    function f_1(resolve, reject) {
        //异步代码
    }
    var p_1 = new Promise(f_1);
    //上面代码中， Promise 构造函数接受一个回调函数 f_1 作为参数， f_1 里面是异步操作的代码
    //然后，返回的 p_1 是一个 Promise 实例

    // Promise 的设计思想是，所有异步任务都返回一个 Promise 实例
    // Promise 实例有一个 then 方法，用来指定下一步的回调函数
    function f_2(resolve, reject) {}
    var p_2 = new Promise(f_1);
    p_2.then(f_2);
    //上面代码中， f_1 的异步操作执行完成，就会执行 f_2 

    //总的来说，传统的回调函数写法使得代码混成一团，变得横向发展而不是向下发展
    // Promise 就是解决这个问题，使得异步流程可以写成同步流程
}

//2--- Promise 对象的状态
{
    // Promise 对象通过自身的状态，来控制异步操作
    // Promise 实例具有三种状态：
    {
        //异步操作未完成：pending
        //异步操作成功：fulfilled
        //异步操作失败：rejected
    }
    // fulfilled 和 rejected 合在一起称为resolved(已定型)
    //这 3 种的状态变化途径只有 2 种
    {
        //从未完成到成功
        //从未完成到失败
    }
    //一旦状态发生发生变化，就凝固了，不会再有新的状态变化
    //这意味着， Promise 实例的状态变化只可能发生一次
    //因此， Promise 实例的状态变化只可能发生一次， Promise 的最终结果只有 2 种：
    {
        //异步操作成功， Promise 实例传回一个值，状态变为 fulfilled
        //异步操作失败， Promise 实例抛出一个错误，状态变为 rejected
    }
}

//3--- Promise 构造函数
{
    var promise = new Promise(function (resolve, reject) {
        //...
        var is_fulfilled = true;
        if (is_fulfilled) {
            //异步操作成功
            let value = '成功';
            resolve(value);
        } else {
            //异步操作失败
            reject(new Error('失败'));
        }
    });
    //上面代码中， Promise 构造函数接受一个函数作为参数，该函数的 2 个参数分别是 resolve 和 reject
    //它们是 2 个函数，由 JavaScript 引擎提供，不用自己实现
    // resolve 函数的作用：将 Promise 实例的状态从"未完成"变为"成功"
    //在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
    // reject 函数的作用：将 Promise 实例的状态从"未完成"变为"失败"
    //在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去
    //例子
    {
        function timeout(ms) {
            return new Promise((resolve, reject) => {
                console.log('[Promise 构造函数]---');
                setTimeout(resolve, ms, 'done');
            });
        }
        timeout(100);
        //上面代码中， timeout(100) 返回一个 Promise 实例； 100ms 以后，该实例的状态会变成fulfilled
    }
}

//4--- Promise.prototype.then()
{
    //用来添加回调函数
    // then 方法可以接受 2 个回调函数：
    //第一个是异步操作成功时的回调函数
    //第二个是异步操作失败时的回调函数，可以省略
    //一旦状态改变，就调用相应的回调函数
    var p_1 = new Promise(function (resolve, reject) {
        resolve('p_1 成功');
    });
    p_1.then(console.log, console.error);
    var p_2 = new Promise(function (resolve, reject) {
        reject(new Error('p_1 失败'));
        // reject('失败');
    });
    p_2.then(console.log, console.error);
    // p_1 成功
    // Error: p_1 失败
    //上面代码中， p_1 和 p_2 都是 Promise 实例，它们的 then 方法绑定 2 个回调函数
    //成功时的回调函数 console.log， 失败时的回调函数 console.error
    // p_1 的状态变为成功， p_2 的状态变为失败，对应的回调函数会收到异步操作传回的值，然后再控制台输出
    // then 方法可以链式使用
    {
        //成功：
        {
            function p_fulfilled() {
                var p = new Promise(function (resolve, reject) {
                    resolve('p 成功');
                });
                p
                    .then(function (value) {
                        console.log('[then]---成功 1', value);
                        return 1;
                    }, function (value) {
                        console.log('[then]---失败 11', value);
                        return 11;
                    })
                    .then(function (value) {
                        console.log('[then]---成功 2', value);
                        return 2;
                    }, function (value) {
                        console.log('[then]---失败 22', value);
                        return 22;
                    })
                    .then(function (value) {
                        console.log('[then]---成功 3', value);
                        return 3;
                    }, function (value) {
                        console.log('[then]---失败 33', value);
                        return 33;
                    })
                    .then(console.log, console.error);
            }
            // p_fulfilled();
            // [then]---成功 1 p 成功
            // [then]---成功 2 1
            // [then]---成功 3 2
            // 3
        }
        //失败：
        {
            function p_reject() {
                var p = new Promise(function (resolve, reject) {
                    reject('p 失败');
                });
                p
                    .then(function (value) {
                        console.log('[then]---成功 1', value);
                        return 1;
                    })
                    .then(function (value) {
                        console.log('[then]---成功 2', value);
                        return 2;
                    })
                    .then(function (value) {
                        console.log('[then]---成功 3', value);
                        return 3;
                    })
                    .then(console.log, console.error);
            }
            p_reject();
            // p 失败
        }
        //上面代码中， p 后面有 4 个 then ，意味着依次有 4 个回调函数 
        //最后一个 then 方法，回调函数时 console.log 和 console.error，用法有一点重要的区别：
        // console.log 只显示 前一次回调函数的返回值
        // console.error 可以显示之前所有回调函数中发生的任意一个错误
        //这就是说， Promise 对象的报错具有传递性
    }
}

//5--- then 用法辨析
{
    // Promise 的用法：使用then方法添加回调函数
    //但是不同的写法有一些细微的差别
    function get_num() {
        return 110;
    }

    function print_num(num) {
        console.log('[then 用法辨析]---num ', num);
    }

    function create_p() {
        return new Promise(function (resolve, reject) {
            resolve('成功');
        });
    }
    create_p()
        .then(function () {
            return get_num();
        })
        .then(print_num);
    // [then 用法辨析]---num  110
    //print_num的回调函数的参数，是 get_num 的运行结果 110
    create_p()
        .then(function () {
            get_num();
            return;
        })
        .then(print_num);
    //[then 用法辨析]---num  undefined
    //print_num的回调函数的参数，是 undefined
    create_p()
        .then(get_num())
        .then(print_num);
    //[then 用法辨析]---num  成功
    //print_num的回调函数的参数，是 create_p 返回的结果
    create_p()
        .then(get_num)
        .then(print_num);
    // [then 用法辨析]---num  110
    //print_num的回调函数的参数，是 get_num 的返回值 110
}

//7---小结
{
    // Promise 的优点在于，让回调函数变成了规范的链式写法，程序流程可以看得很清楚
    //它有一套接口，可以实现许多强大的功能
    //比如同时执行多个异步操作，等到它们的状态都改变以后，再执行一个回调函数
    //比如，为多个回调函数中抛出的错误，统一指定处理方法等等

    //而且， Promise 还有一个传统写法没有的好处：它的状态一旦改变，无论何时查询，都能得到这个状态
    //这意味着，无论何时为 Promise 实例添加回调函数，该函数都能正确执行
    //所以，不用担心是否错过了某个事件或信号
    //如果是传统写法，通过事件监听来执行回调函数，一旦错过了事件，再添加回调函数是不会执行的

    // Promise 的缺点，编写的难度比传统写法高，而且阅读代码也不是一眼可以看懂
    //只会看到一堆 then ，必须在 then 的回调函数里面理清逻辑
}

//8---微任务
{
    // Promise 的回调函数属于异步任务，会在同步任务之后执行
    setTimeout(function () {
        console.log('[微任务]---1');
    });
    new Promise(function (resolve, reject) {
        console.log('[微任务]---2');
        resolve('[微任务]--3');
    }).then(console.log);
    console.log('[微任务]---4');
    // [微任务]--2
    // [微任务]--4
    // [微任务]--3
    // [微任务]--1
    //上面代码会先输出 2 ，再输出 4 ，然后输出 3 ，最后输出 1
    //因为 console.log 是同步任务， 而 then 的回调函数属于异步任务，一定晚于同步任务执行
    //但是， Promise 的回调函数不是正常的异步任务，而是微任务
    //它们的却别在于，正常任务追加到下一轮事件循环；微任务追加到本轮事件循环
    //这意味着，微任务的执行时间一定早于正常任务
}
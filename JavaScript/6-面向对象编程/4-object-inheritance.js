// 对象的继承
// 许多 OO 语言都支持 2 种继承方式
// 接口继承：只继承方法和签名
// 实现继承：继承实际的方法
// 在 ECMAScript 中，由于函数没有签名，无法实现接口继承，只支持实现继承
// 实现继承主要是依靠原型链来实现的

// 1 --- 原型链
{
    // 1.1 --- 概述
    {
        // JavaScript规定，所有对象都有自己的原型对象
        // 一方面，任何一个对象，都可以充当其他对象的原型
        // 另一方面，由于原型对象也是对象，所以它也有自己的原型
        // 因此，就会形成一个"原型链"：对象到原型，再到原型的原型......
        // 如果一层层地上溯，所有对象的原型最终都可以上溯到 Object.prototype ，即 Object 构造函数的 prototype 属性
        // 也就是说，所有对象都继承了 Object.prototype 的属性；这就是所有对象都有 valueOf 和 toString 方法的原因，因为这是从 Object.prototype 继承的
        // Object.prototype 的原型是 null ； null 没有任何属性和方法，也没有自己的原型；因此原型链的尽头就是 null
        console.log('[原型对象概述]---原型链', Object.getPrototypeOf(Object.prototype)); // null
    }
    // 1.2 --- 原型链的构建
    {
        // 通过将一个类型的实例赋值给另一个构造函数的原型实现的
        // 基本思想：利用原型，让一个引用类型继承另一个引用类型的属性和方法
        // 构造函数、原型、实例的关系
        {
            // 每个构造函数都有一个原型对象
            // 原型对象都包含一个指向构造函数的指针
            // 实例都包含一个指向原型对象的内部指针
        }
    }
    // 1.3 --- 实现原型链的基本模式
    {
        // 1.3.1 --- 实现方式
        {
            // 定义 SuperType
            function SuperType() {
                this.property = true;
            }
            SuperType.prototype.getSuperValue = function () {
                console.log('[SuperType]');
                return this.property;
            }
            // 定义 SubType
            function SubType() {
                this.subProperty = false;
            }
            SubType.prototype = new SuperType();
            // 继承了 SuperType
            // 继承是通过创建 SuperType 的实例，并将该实例赋给 SubType.prototype 实现的
            // 实现的本质是重写原型对象；即原来存在于 SuperType 的实例中的所有属性和方法，现在也存在于 SubType.prototype中了
        }
        // 1.3.2 --- 实例、构造函数、原型之间的关系
        {
            // SubType 没有使用默认提供的原型，而是使用 SuperType 的实例作为新原型
            // 新原型不仅具有作为一个 SuperType 实例所拥有的全部属性和方法，而且其内部还有一个指针，指向了 SuperType 的原型
            var instance = new SubType();
            // instance 指向 SubType 的原型， SubType 的原型又指向 SuperType
            // getSuperValue 方法在 SuperType.prototype 中
            // property 属性 在 SubType.prototype 中
        }
    }
    // 2 --- 默认的原型
    {
        // 所有引用类型默认都继承了 Object ，而这个继承是通过原型链实现的
        // 所有函数的默认原型都是 Object ，因此默认原型会包含一个内部指针，指向 Object.prototype
    }
    // 3 --- 确定原型和实例的关系
    {
        // 3.1 --- instanceof
        {
            // object instanceof constructor
            // 用来检测 constructor.prototype （原型对象） 是否存在于参数 object 的原型链上
            // 参数 object ：要检测的对象
            // 参数 constructor ：某个构造函数
            // 返回值 ：一个布尔值，表示对象是否为某个构造函数的实例（包含对父类的检测）
            console.log('[原型链概述]---instanceof运算符', instance instanceof SubType); // true
            // 等价
            console.log('[原型链概述]---instanceof运算符', SubType.prototype.isPrototypeOf(instance)); // true
            // 由于 instanceof 检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回 true
            // 有一种特殊情况，就是左边对象的原型链上，只有 null 对象；这时， instanceof 判断会失真
            {
                var obj = Object.create(null);
                console.log('[原型链概述]---instanceof运算符', obj); // {}
                console.log('[原型链概述]---instanceof运算符', typeof obj); // 'object'
                console.log('[原型链概述]---instanceof运算符', obj instanceof Object); // false
                // 右边的构造函数 Object 的 prototype 属性，不在左边的原型链上，因此 instanceof 就认为 obj 不是 Object 的实例
                // 但是，只要一个对象的原型不是 null ， instanceof 运算符的判断就不会失真
            }
            // instanceof 运算符的一个用处：判断值的类型
            {
                var x = [1, 2, 3];
                var y = {};
                console.log('[原型链概述]---instanceof运算符', x instanceof Array); // true
                console.log('[原型链概述]---instanceof运算符', y instanceof Object); // true
            }
            // 注意： instanceof 运算符只能用于对象，不适用原始类型的值
            {
                var s = 'hello';
                console.log('[原型链概述]---instanceof运算符', s instanceof String); // false
                // 上面代码中，字符串不是 String 对象的实例(因为字符串不是对象)，所以返回 false
            }
            // 此外，对于 undefined 和 null ， instanceof 运算符总是返回 false
            {
                console.log('[原型链概述]---instanceof运算符', undefined instanceof Object); // false
                console.log('[原型链概述]---instanceof运算符', null instanceof Object); // false
            }
            // 利用 instanceof 运算符，还可以巧妙地解决，调用构造函数时，忘了加 new 命令的问题
            {
                function Fubar(foo, bar) {
                    if (this instanceof Fubar) {
                        this._foo = foo;
                        this._bar = bar;
                    } else {
                        return new Fubar(foo, bar);
                    }
                }
                // 上面代码使用使用 instanceof 运算符，在函数体内部判断 this 关键字是否为构造函数 Fubar 的实例；如果不是，就表明忘了加 new 命令
            }
        }
        // 3.2 --- obj1.prototype.isPrototypeOf(obj2)
        {
            // 检测一个对象是否是另一个对象的原型
            // 只要原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，返回 true
        }
    }
    // 4 --- 谨慎地定义方法
    {
        // 子类有时候需要重写超类型中的某个方法，或者需要添加超类型中不存在的某个方法
        // 但不管怎样，给原型添加方法的代码一定要放在替换原型的语句之后
        // 添加新方法
        {
            SubType.prototype.getSubValue = function () {
                console.log('[新方法]');
                return this.subProperty;
            };
        }
        // 重写超类型中的方法，会屏蔽超类型中的同名方法
        {
            SubType.prototype.getSuperValue = function () {
                console.log('[重写]');
                return false;
            }
        }
        var ins = new SubType();
        ins.getSubValue(); // 新方法
        ins.getSuperValue(); // 重写
        delete SubType.prototype.getSuperValue;
        ins.getSuperValue(); // SuperType
        // 在通过原型链实现继承时，不能使用对象字面量创建原型方法，这样会重写原型链
    }
    // 5 --- 原型链的问题
    {
        // 对象实例共享所有继承的属性和方法（这也是为什么要在构造函数中，而不是原型对象中定义属性的原因）
        {
            // 在通过原型来实现继承时，原型实际上会变成另一个类型的实例，原先的实例属性也就顺理成章地变成了现在的原型属性了
            function TestSuper() {
                this.numList = [1, 2];
                this.num = 2;
            }
            // 继承 TestSuper
            function TestSub() {}
            TestSub.prototype = new TestSuper();
            console.log('[原型链的问题]---', Object.getOwnPropertyNames(TestSub.prototype)); // [ 'numList', 'num' ]
            // 超类型的实例：每个实例都会有各自的属性
            {
                var insSuper1 = new TestSuper();
                var insSuper2 = new TestSuper();
                insSuper2.num = 3;
                insSuper2.numList.push(3);
                console.log('[超类型的实例]---insSuper1', Object.getOwnPropertyNames(insSuper1)); // [ 'numList', 'num' ]
                console.log('[超类型的实例]---insSuper1.num', insSuper1.num); // 2
                console.log('[超类型的实例]---insSuper1.numList', insSuper1.numList); // [ 1, 2 ]
                console.log('[超类型的实例]---insSuper2.num', insSuper2.num); // 3
                console.log('[超类型的实例]---insSuper2.numList', insSuper2.numList); // [ 1, 2, 3 ]
            }
            // 子类型的实例
            {
                var insSub1 = new TestSub();
                console.log('[子类型的实例]---insSub1', Object.getOwnPropertyNames(insSub1)); // []
                var insSub2 = new TestSub();
                // 创建实例属性
                insSub1.num = 3;
                // 操作原型中的属性
                insSub2.numList.push(3);
                // 访问实例属性
                console.log('[子类型的实例]---insSub1.num', insSub1.num); // 3
                // 访问原型属性
                console.log('[子类型的实例]---insSub1.numList', insSub1.numList); // [ 1, 2, 3 ]
                console.log('[子类型的实例]---insSub1', Object.getOwnPropertyNames(insSub1)); // [ 'num' ]
                // 访问原型属性
                console.log('[子类型的实例]---insSub2.num', insSub2.num); // 2
                console.log('[子类型的实例]---insSub2.numList', insSub2.numList); // [ 1, 2, 3 ]
                // 创建实例属性
                insSub1.numList = [1];
                console.log('[子类型的实例]---insSub1.numList', insSub1.numList); //  [ 1 ]
                console.log('[子类型的实例]---insSub2.numList', insSub2.numList); // [ 1, 2, 3 ]
                console.log('[子类型的实例]---insSub1', Object.getOwnPropertyNames(insSub1)); // [ 'num', 'numList' ]
                console.log('[子类型的实例]---insSub1', Object.getOwnPropertyNames(insSub2)); // []
            }
        }
        // 在创建子类型的实例时，不能向超类型的构造函数中传递参数
        {
            // 没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数
        }
    }
}

// 2 --- 继承模式
{
    // 2.1 --- 借用构造函数（伪造对象或经典继承）
    {
        // 解决原型中包含引用类型值所带来的问题
        // 基本思想：在子类型构造函数的内部调用超类型构造函数
        // 函数只不过是在特定环境中执行代码的对象，因此通过使用 apply 和 call 方法也可以在新创建的对象上执行构造函数
        // 参数传递：相对于原型链而言，借用构造函数有一个很大的优势（在子类型构造函数中向超类型构造函数传递参数）
        function JieSuper(name) {
            this.name = name;
            this.numList = [1, 2];
        }
        // 为了确保超类型构造函数不会重写子类型的属性，可以在调用超类型构造函数后，再添加应该在子类型中定义的属性
        function JieSub() {
            // 继承了 JieSuper ，同时还传递了参数
            JieSuper.call(this, 'damon'); // this ：表示构造函数的实例
            // 实例属性
            this.age = 18;
        }
        var ins1 = new JieSub();
        ins1.numList.push(3);
        var ins2 = new JieSub();
        console.log('[借用构造函数]---ins1.name', ins1.name); // damon
        console.log('[借用构造函数]---ins1.numList', ins1.numList); // [ 1, 2, 3 ]
        console.log('[借用构造函数]---ins2.name', ins2.name); // damon
        console.log('[借用构造函数]---ins2.numList', ins2.numList); // [ 1, 2 ]
        // 借用构造函数的问题
        {
            // 如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题：方法在构造函数中定义，因此函数复用就无从谈起了
            // 超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型只能使用构造函数模式
            // 因此，借用构造函数的技术很少单独使用
        }
    }
    // 2 --- 组合继承（伪经典继承）
    {
        // 将原型链和借用构造函数的技术组合到一块，从而发挥两者之长的一种继承模式
        // 使用最多的继承模式
        // 思路：使用原型链实现对原型属性和方法的继承；通过构造函数来实现对实例属性的继承
        // 这样既通过在原型上定义方法实现了函数复用，又能保证每个实例都有它自己的属性
        // 不足
        {
            // 无论在什么情况下，都会调用 2 次超类型构造函数（第一次在创建子类型原型的时候；第二次在子类型构造函数的内部）
            // 子类型会最终包括超类型对象的全部实例属性，但不得不在调用子类型构造函数时，重写这些属性
        }

        function ZuSuper(name) {
            this.name = name;
            this.numList = [1, 2];
        }
        ZuSuper.prototype.sayName = function () {
            console.log('[组合继承]---', this.name);
        }
        // 继承
        function ZuSub(name) {
            // 继承实例属性
            ZuSuper.call(this, name); // 第 2 次：在新对象上创建实例属性，屏蔽原型中的同名属性
        }
        // 继承原型属性和方法
        ZuSub.prototype = new ZuSuper('ZuSuper'); // 第 1 次：得到 ZuSuper 的实例属性
        ZuSub.prototype.constructor = ZuSub;
        var zu1 = new ZuSub('damon');
        zu1.numList.push(3);
        var zu2 = new ZuSub('stefan');
        console.log('[组合继承]---zu1.numList', zu1.numList); // [ 1, 2, 3 ]
        console.log('[组合继承]---zu2.numList', zu2.numList); // [ 1, 2 ]
        zu1.sayName(); // damon
        zu2.sayName(); // stefan
        console.log('[组合继承]---', zu1.sayName === zu2.sayName); // true
    }
    // 3 --- 原型式继承
    {
        // 借助原型，可以基于已有的对象创建新对象，同时还不必因此创建自定义类型
        // 本质：执行对给定对象的浅复制，而复制得到的副本还可以进一步改造
        // 可以在不必预先定义构造函数的情况下，实现继承
        function cObject(o) {
            // 创建一个临时构造函数
            function F() {}
            // 将传入的对象作为这个构造函数的原型
            F.prototype = o;
            // 返回这个临时类型的一个新实例
            return new F();
        }
        var person = {
            name: 'damon',
            friendList: ['stefan', 'nicholas']
        };
        var p1 = cObject(person);
        var p2 = cObject(person);
        console.log('[原型式继承]---propertyNames', Object.getOwnPropertyNames(p1)); // []
        p1.friendList.push('tyler');
        p2.friendList.push('bonnie');
        console.log('[原型式继承]---p1.name', p1.name); // damon
        console.log('[原型式继承]---p1.friendList', p1.friendList); // [ 'stefan', 'nicholas', 'tyler', 'bonnie' ]
        console.log('[原型式继承]---p2.name', p2.name); // damon
        console.log('[原型式继承]---p2.friendList', p2.friendList); // [ 'stefan', 'nicholas', 'tyler', 'bonnie' ]
        console.log('[原型式继承]---person', person); //  { name: 'damon', friendList: [ 'stefan', 'nicholas', 'tyler', 'bonnie' ] }
        p1.name = 'elena';
        console.log('[原型式继承]---p2.name', p2.name); // damon 原型属性
        console.log('[原型式继承]---person.name', person.name); // damon 原型属性
        p1.friendList = ['stefan'];
        console.log('[原型式继承]---p2.friendList', p2.friendList); // [ 'stefan', 'nicholas', 'tyler', 'bonnie' ] 原型属性
        console.log('[原型式继承]---person.friendList', person.friendList); // [ 'stefan', 'nicholas', 'tyler', 'bonnie' ] 原型属性
        // 规范原型式继承
        {
            // Object.create(prototype, descriptors)
            // 参数 prototype ：要用作原型的对象，可以为 null
            // 参数 descriptors ：包含一个或多个属性描述对象
            // 返回值 ：一个具有指定的内部原型且包含指定属性的新对象
            var p3 = Object.create(person); // 等价于，上述的 cObject 方法
        }
        // 在没有必要兴师动众地创建构造函数，而只想让一个对象保持类似的情况下，原型式继承是完全可以胜任的
    }
    // 4 --- 寄生式继承
    {
        // 创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真的是它做了所有工作一样返回对象
        // 与原型式继承紧密相关的一种思路
        // 与寄生构造函数和工厂模式类似
        function cAnother(original) {
            var clone = cObject(original);
            clone.sayHi = function () {
                console.log('[寄生式继承]---sayHi');
            };
            return clone;
        }
        var aP = cAnother(person);
        aP.sayHi(); // sayHi
        // 基于 person 返回了一个新对象 aP ，新对象不仅具有 person 的所有属性和方法，而且还有自己的 sayHi 方法
        // cObject 函数不是必需的，任何能够返回新对象的函数都适用于此模式
        // 在主要考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式
        // 使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率，这一点与构造函数模式类似
    }
    // 5 --- 寄生组合式继承
    {
        // 引用类型最理想的继承范式
        // 集寄生式继承和组合继承的优点于一身，是实现基于类型继承的最有效方式
        // 通过借用构造函数来继承属性；通过原型链的混成形式来继承方法
        // 基本思路：不必为了指定子类型的原型而调用超类型构造函数，所需的无非就是超类型原型的一个副本而已
        // 本质：使用寄生式继承超类型的原型，然后将结果指定给子类型的原型
        // 为子类型原型赋值
        function inheritPrototype(subType, superType) {
            // 创建对象：超类型原型的一个副本
            var prototype = cObject(superType.prototype);
            // 增强对象：为副本添加 constructor 属性，从而弥补因重写原型而失去的默认的 constructor 属性
            prototype.constructor = subType;
            // 指定对象：把副本赋值给子类型的原型
            subType.prototype = prototype;
        }
        // 超类型
        function NewSuper(name) {
            this.name = name;
            this.numList = [1, 2];
        }
        // 子类型
        function NewSub(name, age) {
            NewSuper.call(this, name);
            this.age = age;
        }
        inheritPrototype(NewSub, NewSuper);
        NewSub.prototype.sayAge = function () {
            console.log('[寄生组合式继承]---', this.age);
        };
        // 高效率：只调用了一次超类型构造函数，并因此避免了在子类型原型上创建不必要、多余的属性
        // 与此同时，原型链还能保持不变
    }
}


// 3 --- 构造函数的继承
{
    // 让一个构造函数继承另一个构造函数，是非常常见的需求
    // 这可以分成 2 步实现：
    // 第一步：子类继承父类的实例；在子类的构造函数中，调用父类的构造函数
    function Super() {}

    function Sub(value) {
        Super.call(this);
        this.prop = value;
    }
    // 上面代码中， Sub 是子类的构造函数， this 是子类的实例
    // 在实例上调用父类的构造函数 Super ，就会让子类实例具有父类实例的属性
    // 第二步：子类继承父类的原型；让子类的原型指向父类的原型，这样，子类就可以继承父类原型
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.prototype.method = '...';
    //上面代码中， Sub.prototype 是子类的原型，要将它赋值为 Object.create(Super.prototype) ，而不是直接等于 Super.prototype
    // 否则，后面 2 行对 Sub.prototype 的操作，会连父类的原型 Super.prototype 一起修改掉
    // 另一种写法是 Sub.prototype 等于一个父类的实例
    // Sub.prototype = new Super();
    // 上面这种写法也有继承效果，但是子类会具有父类实例的方法；有时，这可能不是我们需要的，所以不推荐使用这种写法
    // 举例来说， Shape 是一个构造函数
    function Shape() {
        this.x = 0;
        this.y = 0;
    }
    Shape.prototype.move = function (x, y) {
        this.x += x;
        this.y += y;
        console.log('[构造函数的继承]---Shape moved');
    };
    Shape.prototype.print = function () {
        console.log('[构造函数的继承]---Shape')
    };
    // 让 Rectangle 构造函数继承 Shape
    // 第一步：子类继承父类的实例
    function Rectangle() {
        // 调用父类构造函数
        Shape.call(this);
    }
    // 另一种写法
    // function Rectangle() {
    //     this.base = Shape;
    //     this.base();
    // }
    // 第二步：子类继承父类的原型
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;
    // 采用这样的写法以后， instanceof 运算符会对子类和父类的构造函数，都返回 true
    var rect = new Rectangle();
    console.log('[构造函数的继承]---', rect instanceof Rectangle); // true
    console.log('[构造函数的继承]---', rect instanceof Shape); // true
    // 上面代码中，子类是整体继承父类；有时只需要单个方法的继承，这时可以采用下面的写法
    Rectangle.prototype.print = function () {
        Shape.prototype.print.call(this);
        console.log('[构造函数的继承]---Rectangle');
    };
    rect.print();
    // Shape
    // Rectangle
    // 上面代码中，子类 rect 的 print 方法先调用父类 Shape 的 print 方法，再部署自己的代码，这就等于继承了父类 Shape 的 print 方法
}

// 4 --- 多重继承
{
    // JavaScript 不提供多重继承功能，即不允许一个对象同时继承多个对象
    // 但是可以通过变通方法，实现这个功能
    function m1() {
        this.hello = 'hello';
    }

    function m2() {
        this.world = 'world';
    }

    function S() {
        m1.call(this);
        m2.call(this);
    }
    // 继承m1
    S.prototype = Object.create(m1.prototype);
    // 继承链上加入m2
    Object.assign(S.prototype, m2.prototype);
    // 指定构造函数
    S.prototype.constructor = S;
    var s = new S();
    console.log('[多重继承]---', s.hello); // 'hello'
    console.log('[多重继承]---', s.world); // 'world'
}


// 5 --- 模块
{
    // JavaScript 不是一种模块化编程语言， ES6 才开始支持"类"和"模块"
    // 传统做法：利用对象实现模块的效果
    // 5.1 --- 基本的实现方法
    {
        // 模块：实现特定功能的一组属性和方法的封装
        // 简单的做法：把模块写成一个对象，所有模块成员都放到这个对象里面
        var module1 = new Object({
            _count: 0,
            m1: function () {},
            m2: function () {}
        });
        // 上面的函数 m1 和 m2 ，都封装在 module1 对象里；使用的时候，就是调用这个对象的属性
        module1.m1();
        // 但是这样的写法会暴露所有模块成员，内部状态可以被外部改
        // 比如，外部代码可以直接改变内部计数器的值
        console.log('[模块]---基本', module1._count); // 0
        module1._count = 5;
        console.log('[模块]---基本', module1._count); // 5
    }
    // 5.2 --- 封装私有变量：构造函数的写法
    {
        // 可以利用构造函数，封装私有变量
        function String_Builder() {
            var buffer = [];
            this.add = function (str) {
                buffer.push(str);
            };
            this.toString = function () {
                return buffer.join('');
            };
        }
        // 上面代码中， buffer 是模块的私有变量；一旦生成实例对象，外部是无法直接访问 buffer 的
        // 但是，这种方法将私有变量封装在构造函数中，导致构造函数与实例对象是一体的，总是存在于内存之中，无法在使用完成后清除
        // 这意味着，构造函数有双重作用，既用来塑造实例对象，又用来保存实例对象的数据
        // 违背了构造函数与实例对象在数据上相分离的原则(即实例对象的数据，不应该保存在实例对象以外)
        // 同时，非常耗费内存
        function String_Bulider_2() {
            this._buffer = [];
        }
        String_Bulider_2.prototype = {
            constructor: String_Bulider_2,
            add: function (str) {
                this._buffer.push(str);
            },
            toString: function () {
                return this._buffer.join('');
            }
        };
        // 这种方法将私有变量放入实例对象中，好处是看上去更自然，但是它的私有变量可以从外部读写，不是很安全
    }
    // 5.3 --- 封装私有变量：立即执行函数的写法
    {
        // 将相关的属性和方法封装在一个函数作用域里面，可以达到不暴露私有成员的目的
        var module1 = (function () {
            var _count = 0;
            var m1 = function () {};
            var m2 = function () {};
            return {
                m1: m1,
                m2: m2
            };
        })();
        // 使用上面的写法，外部代码无法读取内部的 _count 变量
    }
    // 5.4 --- 模块的放大模式
    {
        // 如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用"放大模式"
        var module1 = (function (mod) {
            mod.m3 = function () {};
            return mod;
        }(module1));
        // 上面代码为 module1 模块添加了一个新方法 m3() ，然后返回新的 module1 模块
        // 在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载
        // 如果采用上面的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"
        var module2 = (function (mod) {
            mod.m3 = function () {};
            return mod;
        }(this.module2 || {}));
        // 与"放大模式"相比，"宽放大模式"就是"立即执行函数"的参数可以是空对象
    }
    // 5.5 --- 输入全局变量
    {
        // 独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互
        // 为了在模块内部调用全局变量，必须显式的将其他变量输入模块
        var module1 = (function (module2, module3) {
            //...
        }(module2, module3));
        // 上面 module1 需要使用 module2 和 module3 模块，就把这 2 个模块当作参数输入 module1
        // 这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显
        // 立即执行函数还可以起到命名空间的作用
        var space = {};
        (function () {
            function go() {}

            function handleEvents() {}

            function init() {}

            function destroy() {}
            space.init = init;
            space.destroy = destroy;
        }());
        // 上面代码中， space 对象输出到全局，对外暴露 init 和 destroy 接口，内部方法 go 、 handleEvents 都是外部无法调用的
    }
}
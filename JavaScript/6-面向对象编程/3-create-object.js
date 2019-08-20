// 创建对象

// 1 --- 工厂模式
{
    // 一种设计模式，抽象了创建具体对象的过程
    // 使用建的函数创建对象，为对象添加属性和方法，然后返回对象
    // 解决了对象创建多个相似对象的问题，但没有解决对象的识别问题（即怎样知道一个对象的类型）
    function createPerson(name, age) {
        var o = new Object();
        o.name = name;
        o.age = age;
        o.sayName = function () {
            console.log('[工厂模式]---person name', this.name);
        };
        return o;
    }
    var person = createPerson('damon', 18);
    person.sayName(); // damon
}

// 2 --- 构造函数模式
{
    // 见 1-instance-object-and-new
}

// 3 --- 原型模式
{
    // 使用构造函数的 prototype 属性来指定那些应该共享的属性和方法
    // 3.1 --- 理解原型对象
    {
        // 3.1.1 --- 构造函数.prototype
        {
            // 指向原型对象的指针
            // 只要创建一个新函数，就会根据一组特定的规则为该函数创建一个原型属性： prototype
            // 这个对象的用途是包含可以有特性类型的所有实例共享的属性和方法
        }
        // 3.1.2 --- prototype.constructor
        {
            // 指向构造函数的指针
            // 默认情况下，所有原型对象都会自动获得一个 constructor 属性（构造函数）
            // 这个属性是指向 prototype 属性所在的函数的指针
            // 使用原型对象的好处
            {
                // 好处---1---让所有对象实例共享它所包含的属性和方法
                // 好处---2---不必在构造函数中定义对象实例的属性，而是可以将这些直接添加到原型对象中
            }

            function Student() {}
            Student.prototype.name = 'damon';
            Student.prototype.age = 18;
            Student.prototype.sayName = function () {
                console.log('[prototype]---', name);
            }
        }
        // 3.1.3 --- Object.getPrototypeOf(obj)
        {
            // 获取原型对象
            // 参数 obj ：引用原型的对象
            // 返回值 ： obj 的原型，原型也是对象
            var stu = new Student();
            console.log('[getPrototypeOf()]---', Object.getPrototypeOf(stu) === Student.prototype); // true
        }
        // 3.1.4 --- 读取属性
        {
            // 每当代码读取对象的某个属性，都会执行一次搜索操作，目标是给定名字的属性
            // 搜索步骤
            {
                // 搜索首先从对象实例本身开始
                // 如果在实例中找到了具有给定名字的属性，则返回该属性的值
                // 如果没找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性
                // 如果在原型对象中找到了这个属性，则返回该属性
            }
        }
        // 3.1.5 --- 可以通过对象实例访问保存在原型对象的值，但不能通过对象实例重写原型中的值
        {
            // 如果在实例中添加了一个属性（与实例原型中的一个属性同名）
            // 那么就在该实例中创建该属性，该属性会屏蔽原型中的同名属性
            // 使用 delete 操作符可以完全删除实例属性，从而可以重新访问原型中的属性
            var stu = new Student();
            stu.name = 'stefan';
            console.log('[同名属性]---', stu.name); // stefan
            delete stu.name;
            console.log('[同名属性]---', stu.name); // damon
        }
        // 3.1.6 --- obj.hasOwnProperty(propertyName)
        {
            // 作用：检测给定的名字是否是对象的自由属性，如果是继承属性，则返回 false
            // 参数 propertyName ：给定的属性名
            // 返回值 ：只在给定属性存在于对象实例中，才返回 true ，否则返回 false
            var stu = new Student();
            console.log('[hasOwnProperty]---', stu.hasOwnProperty('name')); // false
        }
    }
    // 3.2 --- 原型与 in 操作符
    {
        var stu = new Student();
        // 3.2.1 --- propertyName in obj
        {
            // 单独使用：当属性存在实例（自由属性）或原型（继承属性）中，返回 true ，否则返回 false
            console.log('[in]---', 'name' in stu);
            // 同时使用 in 操作符 和 hasOwnProperty 方法，可以确定属性是存在于对象中，还是原型中
            // return !obj.hasOwnProperty(name) && (name in obj)
        }
        // 3.2.2 --- for...in
        {
            // 返回所有能够通过对象访问的、可枚举的属性；其中包括存在于实例中的自由属性和存在于原型中的继承属性
            //　屏蔽了原型中不可枚举的属性：[[Enumerable]] 标记为 false
        }
    }
    // 3.3 --- 获取属性
    {
        // 3.3.1 --- Object.keys(obj)
        {
            // 获取自身可枚举属性
            // 参数 obj ：要返回其枚举自身属性的对象
            // 返回值 [Strig] ：一个表示给定对象的所有可枚举属性的字符串数组；这些属性的顺序与手动遍历该对象属性时一致（for...in）
            // 原型对象的属性
            console.log('[keys()]---原型对象', Object.keys(Student.prototype)); // [ 'name', 'age', 'sayName' ]
            // 实例属性
            var obj = new Student();
            obj.sex = 'm';
            console.log('[keys()]---实例', Object.keys(obj)); // [ 'sex' ]
        }
        // 3.3.2 --- Object.getOwnPropertyNames(obj)
        {
            // 获取所有属性
            // 参数 obj ：要返回自身属性的对象
            // 返回值 [String] ：元素为对象属性的数组
            var obj = new Student();
            obj.sex = 'm';
            console.log('[getOwnPropertyNames()]---', Object.getOwnPropertyNames(obj)); // [ 'sex' ]
        }
    }
    // 3.4 --- 更简单的原型语法
    {
        // 使用对象字面量
        // 将构造函数.prototype 设置为一个对象字面量形式的创建的新对象
        // 最终结果相同，除了 constructor 属性不再指向构造函数
        // 每创建一个函数，就会同时创建它的 prototype 属性，这个对象也会自动获得 constructor 属性
        // 当使用对象字面量时，本质上完全重写了默认的 prototype
        function Teacher() {}
        Teacher.prototype = {};
        var t = new Teacher();
        console.log('[{}]---', t.constructor === Object); // true
        console.log('[{}]---', t.constructor === Teacher); // false
    }
    // 3.5 --- 原型的动态性
    {
        // 由于在原型中查找值的过程是一次搜索，因此对原型对象所做的任何修改都能立即从实例上反映出来（即使先创建了实例，后修改了原型）
        {
            function Search() {}
            var s = new Search();
            Search.prototype.name = 'search';
            console.log('[原型的动态性]---', s.name); // search
        }
        // 调用构造函数时，会为实例添加一个指向最初原型对象的指针([[Prototype]])
        // 而把原型修改为另一个对象，等于切断了构造函数与最初原型之间的联系
        {
            function Friend() {}
            var f = new Friend();
            Friend.prototype = {
                constructor: Friend,
                name: 'friend'
            };
            // 重写原型对象，切断构造函数与最初原型对象的联系
            // 已经存在的实例引用仍然是最初的原型对象
            // 后来创建的实例引用的是现有原型对象
            var newF = new Friend();
            console.log('[原型的动态性]---', f.name); // undefined
            console.log('[原型的动态性]---', newF.name); // friend
        }
    }
    // 3.6 --- 问题
    {
        // 忽略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值
    }
}

// 4 --- 组合使用构造函数和原型模式
{
    // 构造函数模式：用于定义实例属性
    // 原型模式：用于定于方法和共享的属性
    function People(name, age) {
        this.name = name;
        this.age = age;
        this.friendList = ['damon', 'stefan'];
    }
    People.prototype = {
        constructor: People,
        sayName() {
            console.log('[组合使用构造函数和原型模式]---', this.name);
        }
    };
    // 每个实例都会有一份自己的实例属性的副本，但同时又共享对象方法的引用，最大限度地节省了内存
    var p1 = new People('hi', 1);
    var p2 = new People('hello', 2);
    console.log('[组合使用构造函数和原型模式]---friendList', p1.friendList === p2.friendList); // false
    console.log('[组合使用构造函数和原型模式]---sayName', p1.sayName === p2.sayName); // true
}

// 5 --- 动态原型模式
{
    // 把所有信息都封装在了构造函数中，而通过在构造函数中初始化原型（仅在必要情况下）
    function DynamicPeople(name, age) {
        this.name = name;
        this.age = age;
        this.friendList = ['damon', 'stefan'];
        if (typeof this.sayName !== 'function') {
            // 只有在 sayName 方法不存在的情况下，才会将它添加到原型中
            DynamicPeople.prototype.sayName = function () {
                console.log('[动态原型模式]---', this.name);
            };
        }
    }
    var dP = new DynamicPeople('hi', 1);
    dP.sayName(); // hi
}

// 6 --- 寄生构造函数模式
{
    // 基本思想：创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象
    // 但从表面上看，这个函数又很像是经典的构造函数
    // 除了使用 new 操作符，并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的
    // 构造函数在不返回值的情况下，默认会返回新对象实例，而通过在构造函数的末尾添加一个 return 语句，可以重写调用构造函数时的返回值
    // 返回的对象与构造函数或者构造函数的原型属性之间没有关系，即返回的对象与在构造函数外部创建的对象没有什么不同
    // 不能依赖 instanceof 操作符来确定对象类型
    function Animal(name) {
        var o = new Object();
        o.name = name;
        o.sayName = function () {
            console.log('[寄生构造函数]---', this.name);
        };
        return o;
    }
    var animal = new Animal('pig');
    animal.sayName(); // pig
    // 这个模式可以在特殊的情况下，用来为对象创建构造函数，如创建一个具有额外方法的特殊数组
    function SpecialArray() {
        // 创建数组
        var values = new Array();
        // 添加值
        values.push.apply(values, arguments);
        console.log('[寄生构造函数]---', values);
        // 添加方法
        values.toPipedString = function () {
            return this.join('|');
        };
        // 返回数组
        return values;
    }
    var colors = new SpecialArray('red', 'yellow'); // [ 'red', 'yellow' ]
    console.log('[寄生构造函数]---', colors.toPipedString()); //red|yellow
}

// 7--- 稳妥构造函数
{
    // 稳妥对象的概念：没有公共属性，而且其他方法也不引用 this 的对象
    // 稳妥对象的适合环境：禁止使用 this 和 new ，或者防止数据被其它应用程序改动时使用
    // 与寄生构造函数类似；不同：新创建对象的实例方法不引用 this ，不能用 new 操作符调用构造函数
    // 使用稳妥构造函数模式创建的对象与构造函数之间也没有什么关系，因此 instanceof 操作符对这种对象也没什么意义
    function SimilarAnimal(name) {
        // 创建要返回的对象
        var o = new Object();
        // 可以在这里定义私有变量和函数
        o.name = name;
        o.sayName = function () {
            console.log('[稳妥构造函数]---', name);
        };
        // 返回对象
        return o;
    }
    var similarAnimal = SimilarAnimal('an');
    // 变量 similarAnimal 中保存的是一个稳妥对象
    // 除了使用 sayName 方法外，没有其他方法访问 name 属性
    // 即使有其他代码为这个对象添加方法和数据成员，但也不能有别的方法访问传入到构造函数中的原始数据
    similarAnimal.sayName(); // an
}
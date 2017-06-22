

//继承

//1、对象冒充  可以支持多重继承

//原理：构造函数使用this关键字，给所有的属性和方法赋值（即采用类声明的够着函数方式），例如
function ClassA(color){
    this.color = color;
    this.sayColor = function(){
        console.log(this.color);
    }
}
function ClassB(color,name){
    //把ClassA作为常规函数来建立继承机制，而不是作为构造函数
    this.newMethod = ClassA;
    this.newMethod(color);
    delete this.newMethod;

    //所有的新属性和新方法都必须在删除了新方法的代码行后定义，
    //否则会覆盖超类的相关属性和方法
    this.name=name;
    this.sayName = function(){
        console.log(this.name);
    }
}
var objA=new ClassA('red'),
    objB=new ClassB('blue','Nicholas');
objA.sayColor();   //red
objB.sayColor();   //blue
objB.sayName();     //Nicholas

//call 方法 是与对象冒充方法最相似的方法
function sayColor(prefix,suffix){
    console.log(prefix+this.color+suffix);
}
var obj=new Object();
obj.color = 'red';

//第一个参数是obj，说明应该赋予sayColor()函数中this关键字值是obj。
sayColor.call(obj,'the color is ','a nice color'); //the color is reda nice color


// 这里，原始的对象冒充 就可以改为：
var ClassA=function (color){
    this.color = color;
    this.sayColor = function(){
        console.log(this.color);
    }
};
var ClassB=function(color,name){

    //把ClassA作为常规函数来建立继承机制，而不是作为构造函数
    ClassA.call(this,color);

    //所有的新属性和新方法都必须在删除了新方法的代码行后定义，
    //否则会覆盖超类的相关属性和方法
    this.name=name;
    this.sayName = function(){
        console.log(this.name);
    }
};
var objA=new ClassA('red'),
    objB=new ClassB('blue','Nicholas');
objA.sayColor();   //red
objB.sayColor();   //blue
objB.sayName();     //Nicholas


//apply 方法

//call 方法 是与对象冒充方法最相似的方法
function sayColor(prefix,suffix){
    console.log(prefix+this.color+suffix);
}
var obj=new Object();
obj.color = 'red';

//第一个参数是obj，说明应该赋予sayColor()函数中this关键字值是obj。
sayColor.apply(obj,new Array('the color is ','a nice color')); //the color is reda nice color



// 这里，原始的对象冒充 就可以改为：
var ClassA=function (color){
    this.color = color;
    this.sayColor = function(){
        console.log(this.color);
    }
};
var ClassB=function(color,name){

    //把ClassA作为常规函数来建立继承机制，而不是作为构造函数
    ClassA.apply(this,[color]);

    //所有的新属性和新方法都必须在删除了新方法的代码行后定义，
    //否则会覆盖超类的相关属性和方法
    this.name=name;
    this.sayName = function(){
        console.log(this.name);
    }
};
var objA=new ClassA('red'),
    objB=new ClassB('blue','Nicholas');
objA.sayColor();   //red
objB.sayColor();   //blue
objB.sayName();     //Nicholas























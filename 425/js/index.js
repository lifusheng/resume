

//crush boy
var fragmentImg=function(){
    var _default={
        container : '.img-flex',
        line : 10,  //the line of img
        column : 24, //the column of img
        width : '100%',
        animeTime : 4000,  //the time of load
        img : 'img/boy.png'
    };
    var container = $(_default.container);
    container.append("<ul class='clearfix'></ul>");

    container.css({
        width : _default.width
    });

    var containerUl = container.find(" > ul");
    for(var i = 0;i < (_default.line*_default.column);i++){
        containerUl.append("<li></li>");
    }
    var	containerItem = containerUl.find("li");

    var Img = new Image();
    Img.src = _default.img;

    Img.onload = function(){
        var multiple = container.width() / Img.width,
            width = Img.width * multiple,
            height = Img.height * multiple,
            findWidth = width/_default.column,
            findHeight = height/_default.line;

        var windowWidth = screen.width,
            windowHeight = screen.height;

        containerItem.css({
            width : findWidth,
            height : findHeight,
            'background-image' : 'url('+Img.src+')',
            '-moz-background-image' : 'url('+Img.src+')',
            'background-size' : width+'px '+height+'px',
            '-moz-background-size' : width+'px '+height+'px',
            opacity : 0
        });
        var x,y;
        for(i = 0; i < containerItem.length; i++){
            x = i%_default.column;
            y = Math.floor(i/_default.column);
            containerItem.eq(i).css({
                'background-position' : -x*findWidth+'px '+(-y*findHeight)+'px',
                '-moz-background-position' : -x*findWidth+'px '+(-y*findHeight)+'px',
                left : Math.ceil(Math.random()*windowWidth*2) - windowWidth,
                top : Math.ceil(Math.random()*windowHeight*2) - windowHeight
            }).animate({
                left : 0,
                top : 0,
                opacity : 1
            },Math.ceil(Math.random()*(0.66*_default.animeTime))+(0.33*_default.animeTime));
        }

    }
};

$('#header').load('tpl/include/header.html');
$('#right-aside-nav').load('tpl/include/right-nav.html');
$('#footer').load('tpl/include/footer.html');

$('#floor1').load('tpl/floor1.html',function(){
    fragmentImg();
});


var changeRightAside=function(aTarget){
    $('.right-aside-div li').removeClass('active');
    aTarget.parent('li').addClass('active');
    $('.right-aside-div li em').removeClass('open');
    aTarget.find('em').addClass('open');
};

var scrollToAnchor=function(target){
    var arr = target.split('');
    var h = $('.floor').height()*(arr[arr.length-1]-1);
    $("html, body").animate({
        scrollTop: h + "px"
    }, {
        duration: 300,
        easing: "swing"
    });

    return false;
};

//toggle two class
var toggleC1C2=function(handler,c1,c2){
    handler.toggleClass(c1);
    handler.toggleClass(c2);
};
// pro slider
var startSlider = function(){

    var requestAnimFrame = (function(){   //兼容性
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    var  TIMER =null,curSlide= 1,
         autoSlide = '',
        $slider = $('.slider');


    var cloneNode=$('.slide:last').clone().removeClass('sw');
    $slider.children('.slide.sw').first().before(cloneNode);

    var numOfBanner=$slider.find('.slide').length,  // 轮播图个数
        w=$('.content').width();
    $slider.css({'width':w*numOfBanner+'px' });

    var toggleSlide=function(target){
        $('.nav .nav-slide').removeClass('nav-active');
        $('.nav li[data-target='+target+']').addClass('nav-active');
    };

    var slideRight=function(target){

        $slider.animate({
                'left': '0'
            },
            '750',
            function(){
                $slider.css({'left': '-100%'});
                for(var i=0;i<Math.abs(target);i++){
                    $slider.children('.slide.sw').last().after(
                        $slider.children('.slide.sw').first()
                    );
                }
            }
        );

    };
    var slideLeft=function(target){
        $slider.animate({
                'left': '-200%'
            },
            '750',
            function(){
                $slider.css({'left': '-100%'});
                for(var i=0;i<Math.abs(target);i++){
                    $slider.children('.slide.sw').first().before(
                        $slider.children('.slide.sw').last()
                    );
                }
            }
        );
    };
    var slideBanner=function(direction){
        if(direction>0){  //左移
            slideLeft(direction);
        }else{   //右移
            slideRight(direction);
        }
    };
    var run=function(target,direction){
        slideBanner(direction);
        if(target){       //是通过点击导航圆点的
            curSlide=target;
        }else if(direction>0){
            curSlide=++curSlide<=3?curSlide:1;
        }else{
            curSlide=--curSlide>=1?curSlide:3;
        }
        toggleSlide(curSlide);
    };

    var start=function(){
        var time=new Date(),timestamp=time.getTime();
        autoSlide = function(timestamp, elapsed){
            if (elapsed > 4000 ) {   //控制程序 2s执行一次
                run(null,1);
                elapsed = 0;
            }
            var time=new Date();
            var _timestamp=time.getTime();
            TIMER = requestAnimFrame(function(_timestamp) {
                autoSlide(_timestamp, elapsed + _timestamp - timestamp)
            });
        };
        TIMER = requestAnimFrame( timestamp=> autoSlide(timestamp, 0));
    };
    $('.cont').on('click', '.nav-slide:not(.nav-active)', function () {
        var target =+$(this).attr('data-target');  //使用 + 将string 转换为number
        run(target,curSlide-target);
    });

    $('.cont').on('click', '.side-nav', function () {
        var target = $(this).attr('data-target');
        if (target === 'left'){
            run(null,1);  //向左移动
        } else if (target === 'right'){
            run(null,-1);   //向右移动
        }
    });

    /*鼠标悬停事件*/
    $('.cont').hover(function () {
        window.cancelAnimationFrame(TIMER);   //鼠标悬停时清除定时器
    }, function () {
        //run(null,1);  //向左移动
        start(); //鼠标移出时启动定时器
    });

    start();
};

var startSalary = function(){
    var box=document.getElementById('boomCont'),
        ball=document.getElementsByClassName('item-ball')[0],
        frag=document.createDocumentFragment(),
        dia=10,   // diameter of per ball
        off= 10,  // offset of img
        rNum=parseInt(box.getBoundingClientRect().height/dia),
        cNum=parseInt(box.getBoundingClientRect().width/dia) ;
    ball.style.width=dia+'px';ball.style.height=dia+'px';
    for(var r=0;r<rNum;r++){
        for (var c=0;c<cNum;c++){
            var cl=ball.cloneNode(true);
            ball.style.backgroundPosition='-'+(c*dia+off)+'px '+'-'+r*dia+'px';

            console.log('');  //延迟一下，让浏览器将生成的节点插入dom
            frag.appendChild(cl);
        }
    }

    box.appendChild(frag);

    var showMonkeyImg = function (){
        $('.monkey-popup-container').fadeIn(2000);
    };

    var rollSalary = function(){
        var u = $(".num").height();   //height of per num img
        var isBegin = false;

        if(isBegin) return false;
        isBegin = true;    // 互斥变量
        $(".num").css('backgroundPositionY',0);

        //var result = 13000;
//        var num_arr = (result+'').split('');  //
//        var num_arr = (result+'').split('').reverse();   //
        // the num of money
        var num_arr = ['0','0','0','10','10'];   // 10 is x
        var len = num_arr.length-1;
        $(".num").each(function(index){
            var _num = $('.num_box div').eq(len-index);
//                console.log(num_arr[index],index);
//                console.log(u*(10 - num_arr[index]));
            setTimeout(function(){
                _num.animate(
                    {backgroundPositionY: u*(66 - num_arr[index])
                    },
                    {
                        duration: 2000+index*2000,
                        easing: "easeInOutCirc",
                        complete: function(){
                            if(index==4) isBegin = false;
                        }
                    });
            }, index * 300);
        });

    };

    var randNum = function(min,max){
        return (Math.random()*(max - min)+min);
    };
    var disappear= function(){
        $('.test-img').fadeOut(800);
        $('.item-ball').each(function(i){
            console.log('');   //延迟一下，让浏览器将生成的节点插入dom
            $(this).animate({
                'top':randNum(-110,110)+'px',
                'left':randNum(-200,200)+'px',
                'transform':'scale('+randNum(0.3,1.8)+')',
                'opacity':0
            });
        });
        $('.num_box').addClass('num-w-grow');
        setTimeout(rollSalary,4000);
        setTimeout(showMonkeyImg,16000);
    };
    $('body').on('click','.rh-box',function(){
        $(this).children('.js-redheart').remove();
        $(this).children('.js-boomCont').removeClass('vis-hid');
        setTimeout(disappear,800);
    });
};

$('body').on('click','.right-aside-div li,.top-header-left li,.js-shine-arrow',function(){
    var target = $(this).children('a').attr('href'),
        anchor=target.split('#')[1],
        aTarget=$('.right-aside-div a[href='+target+']');
    $('#'+anchor).load('tpl/'+anchor+'.html',function(){
        if(anchor=='floor2'){
            startSlider();
        }else if(anchor=='floor1'){
            fragmentImg();
        }else if(anchor=='floor4'){
            startSalary();
        }
    });
    changeRightAside(aTarget);
    scrollToAnchor(target);
});

//the ani of top menu
$('body').on('click','.nav-menu',function(){
    var handler=$('.nav-list ul');
    if(handler.hasClass('bounceInRight')){
        handler.removeClass('bounceInRight');
        handler.addClass('bounceInLeft');
    }else{
        toggleC1C2(handler,'goLeft','bounceInLeft');
    }
});



setTimeout(function(){
    $('.s-xguide-down').fadeIn();
},6000);



// hobbyhouse
$('.cert-cont img').hover(function(){
    $('.cert-cont').removeClass('cert-ani');
    $(this).addClass('cert-big-img');

},function(){
    $('.cert-cont').addClass('cert-ani');
    $(this).removeClass('cert-big-img');
});


!function(){
    var winH = window.screen.availHeight;
    var totalpage = 5,i=1;
    var pageH = $(document.body).height();
    $(window).scroll(function() {
        var scrollT = $(window).scrollTop();
        if (i <= totalpage ) { // if not over
            var rate = (pageH - winH - scrollT) / winH;
            if (rate < 0.01) {
                $('#floor'+i).load('tpl/floor'+i+'.html',function(){
                    if(i===2){
                        setTimeout(startSlider,300);   //延迟一段时间，防止滚动过快，加载不出图片
                    }else if(i===1){
                        fragmentImg();
                    }else if(i===4){
                        startSalary();
                    }
                });
                i++;
            }
        } else { // over
            console.log('....');
        }

        //console.log(scrollT,winH);
        if(scrollT>0.8*winH && scrollT<0.8*winH+20){
            changeRightAside($('.right-aside-div a[href=#floor1]'));
        }else if((scrollT>1.7*winH &&scrollT<1.7*winH +20)||(scrollT>1*winH && scrollT<1*winH +20)){
            changeRightAside($('.right-aside-div a[href=#floor2]'));
        }else if((scrollT>2.7*winH &&scrollT<2.7*winH +20)||(scrollT>1.8*winH && scrollT<2*winH +20)){
            changeRightAside($('.right-aside-div a[href=#floor3]'));
        }else if((scrollT>3.7*winH &&scrollT<3.7*winH +20)||(scrollT>2.8*winH && scrollT<3*winH +20)){
            changeRightAside($('.right-aside-div a[href=#floor4]'));
        }else if((scrollT>4.7*winH &&scrollT<4.7*winH +20)||(scrollT>3.8*winH && scrollT<4*winH +20)){
            changeRightAside($('.right-aside-div a[href=#floor5]'));
        }
    });
}();

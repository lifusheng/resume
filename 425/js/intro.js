


var gObj={
    scWidth:window.screen.availWidth,
    scHeight:window.screen.availHeight,
    fBbImg:{
        f1:'img/winter.jpg',
        f2:'img/winter.jpg',
        f3:'img/winter.jpg',
        f4:'img/winter.jpg',
        f5:'img/winter.jpg',
        fbg:'img/footer-bg.jpg'
    }
};
var loadFoorList=new Array();
var init=function(){
    loadFoorList.push(loadFoor1,loadFoor2,loadFoor3,loadFoor4,loadFoor5,loadBottomFooter);
};

var loadFoor1=function(){
    $('.floor-1').css({
        'width':gObj.scWidth+'px',
        'height':gObj.scHeight+'px',
        'background-size':gObj.scWidth+'px '+gObj.scHeight+'px',
        'background-image':'url('+gObj.fBbImg.f1+')'
    });
    var f1Img=$('.floor-1 .f1-figure-pic');
    f1Img.css({'margin-top':(gObj.scHeight-f1Img.height()*2.5)+'px'});
};
var loadFoor2=function(){
    $('.floor-2').css({
        'width':gObj.scWidth+'px',
        'height':gObj.scHeight+'px',
        'background-size':gObj.scWidth+'px '+gObj.scHeight+'px',
        'background-image':'url('+gObj.fBbImg.f2+')'
    });
};
var loadFoor3=function(){
    $('.floor-3').css({
        'width':gObj.scWidth+'px',
        'height':gObj.scHeight+'px',
        'background-size':gObj.scWidth+'px '+gObj.scHeight+'px',
        'background-image':'url('+gObj.fBbImg.f3+')'
    });
};

var loadFoor4=function(){
    $('.floor-4').css({
        'width':gObj.scWidth+'px',
        'height':gObj.scHeight+'px',
        'background-size':gObj.scWidth+'px '+gObj.scHeight+'px',
        'background-image':'url('+gObj.fBbImg.f4+')'
    });
};

var loadFoor5=function(){
    $('.floor-5').css({
        'width':gObj.scWidth+'px',
        'height':gObj.scHeight+'px',
        'background-size':gObj.scWidth+'px '+gObj.scHeight+'px',
        'background-image':'url('+gObj.fBbImg.f5+')'
    });
};

var loadBottomFooter=function(){
    $('.bottom-footer').css({
        'width':gObj.scWidth+'px',
        'height':'350px',
        'background-size':gObj.scWidth+'px '+'350px',
        'background-attachment':'fixed',
        'background-image':'url('+gObj.fBbImg.fbg+')'
    });
};

//��һ��Ԫ������ c1 �� c2 �����л�
var toggleC1C2=function(handler,c1,c2){
    handler.toggleClass(c1);  //c1 c2 ��ʼ״̬��ͬ
    handler.toggleClass(c2);
};
var changeRightAside=function(aTarget){
    $('.right-aside-div li').removeClass('active');
    aTarget.parent('li').addClass('active');
    $('.right-aside-div li em').removeClass('open');
    aTarget.find('em').addClass('open');
};
var scrollToAnchor=function(target){

    //console.log(target,$(target).offset());
    $("html, body").animate({
        scrollTop: $(target).offset().top + "px"
    }, {
        duration: 300,
        easing: "swing"
    });

    return false;
};


$('.right-aside-div li,.top-header-left li,.js-shine-arrow').click(function(){
    var target = $(this).children('a').attr('href'),
        aTarget=$('.right-aside-div a[href='+target+']');
    changeRightAside(aTarget);
    scrollToAnchor(target);
});


$('.nav-menu').click(function(){
    var handler=$('.nav-list ul');
    if(handler.hasClass('bounceInRight')){
        //ֻ�ڵ�һ�μ���ҳ��ʱ ��ʾbounceInRight
        handler.removeClass('bounceInRight');
        handler.addClass('bounceInLeft');
    }else{
        toggleC1C2(handler,'goLeft','bounceInLeft');
    }
});

setTimeout(function(){
    $('.s-xguide-down').fadeIn();
},6000);
var scrollEvent=function(){
    loadFoorList[0]();
    var totalpage = loadFoorList.length,i=0; //��ҳ������ֹ������ҳ����������
    var winH = gObj.scHeight; //�Ǵ��ڵĿ�ߣ�����һֱ����
    var pageH = $(document.body).height();//���ĵ������й�������ʱ��Զ����$(window).height();

    $(window).scroll(function() {
        var scrollT = $(window).scrollTop(); //������top
        if (i < totalpage ) { // ��������ҳ��С����ҳ����ʱ�򣬼�������
            var rate = (pageH - winH - scrollT) / winH;
            if (rate < 0.01) {
                loadFoorList[i++]();
                //var aTarget=$('.right-aside-div a[href=#floor-'+i+']');
                //console.log('.right-aside-div a[href=#floor-'+i+']');
                //changeRightAside(aTarget);
            }
        } else { //������ʾ������
            console.log('....');
        }
        //console.log(scrollT,winH);
        if(scrollT>0.8*winH && scrollT<0.8*winH+20){
            changeRightAside($('.right-aside-div a[href=#floor-1]'));
        }else if((scrollT>1.7*winH &&scrollT<1.7*winH +20)||(scrollT>1*winH && scrollT<1*winH +20)){
            changeRightAside($('.right-aside-div a[href=#floor-2]'));
        }else if((scrollT>2.7*winH &&scrollT<2.7*winH +20)||(scrollT>1.8*winH && scrollT<2*winH +20)){
            changeRightAside($('.right-aside-div a[href=#floor-3]'));
        }else if((scrollT>3.7*winH &&scrollT<3.7*winH +20)||(scrollT>2.8*winH && scrollT<3*winH +20)){
            changeRightAside($('.right-aside-div a[href=#floor-4]'));
        }else if((scrollT>4.7*winH &&scrollT<4.7*winH +20)||(scrollT>3.8*winH && scrollT<4*winH +20)){
            changeRightAside($('.right-aside-div a[href=#floor-5]'));
        }
    });
};



//��Ƭ��Ƭ��Ч����
var fragmentImg=function(){
    var _default={
        container : '.img-flex',//��ʾ����
        line : 10,//������
        column : 24,//������
        width : '100%',//��ʾ�����Ŀ��

        animeTime : 4000,//�����ʱ��,ͼƬ��ȡֵ���� animeTime*0.33 + animeTime*0.66֮ǰȡֵ
        img : 'img/boy.png'//ͼƬ·��
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
    //����ͼƬ
    var Img = new Image();
    Img.src = _default.img;
    //ͼƬ�������ʱ

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
            'background-size' : width+'px '+height+'px',
            opacity : 0
        });


        var x,y;
        for(i = 0; i < containerItem.length; i++){
            x = i%_default.column;
            y = Math.floor(i/_default.column);
            containerItem.eq(i).css({
                'background-position' : -x*findWidth+'px '+(-y*findHeight)+'px',
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

//��Ŀ�����ֲ� start

var timer=setInterval(silder,3000);
function silder(){
    var nItem=$('.bd .slider_item.active').next();

    if(!nItem.html()){   //�������һ��Ԫ��
        nItem=$('.bd .slider_item').first();
    }
    var eq=nItem.index();
    //console.log(eq);
    nItem.addClass('active').siblings().removeClass('active');
    $('.hd li:eq('+eq+')').addClass('on').siblings().removeClass('on');
}
$('#floor-2').on('mouseenter','.slider',function(){
    clearInterval(timer);
});
$('#floor-2').on('mouseleave','.slider',function(){
    timer=setInterval(silder,3000);
});


//��Ŀ�����ֲ� end

!function(){
    init();
    fragmentImg();
    scrollEvent();
}();


//����н��
!function(){
    var box=document.getElementById('boomCont'),
        ball=document.getElementsByClassName('item-ball')[0],
        frag=document.createDocumentFragment(),
        dia=10,   //ֱ��
        off= 10,  //ͼ�񱳾�ƫ���� �������������
    //���ĵ�����
        xC= box.getBoundingClientRect().left+box.getBoundingClientRect().width/ 2,
        yC= box.getBoundingClientRect().top+box.getBoundingClientRect().height/ 2,
        rNum=parseInt(box.getBoundingClientRect().height/dia),
        cNum=parseInt(box.getBoundingClientRect().width/dia) ;

    ball.style.width=dia+'px';ball.style.height=dia+'px';
    for(var r=0;r<rNum;r++){
        for (var c=0;c<cNum;c++){
            var cl=ball.cloneNode(true);
            ball.style.backgroundPosition='-'+(c*dia+off)+'px '+'-'+r*dia+'px';
            frag.appendChild(cl);
        }
    }

    box.appendChild(frag);
    //console.log(box);
    $('body').on('click','.rh-box',function(){
        $(this).children('.js-redheart').remove();
//        $(this).children('.js-img-mask').removeClass('vis-hid');
//        $(this).children('.js-img-mask').addClass('little-img');//
//        $(this).children('.js-img-mask').addClass('vis-hid');
        $(this).children('.js-boomCont').removeClass('vis-hid');

        setTimeout(disappear,800);
    });
    function randNum(min,max){
        return (Math.random()*(max - min)+min);
    }
    function disappear(){
        $('.test-img').fadeOut(800);
        $('.item-ball').each(function(){
            $(this).animate({
                'top':randNum(-110,110)+'px',
                'left':randNum(-200,200)+'px',
                'transform':'scale('+randNum(0.3,1.8)+')',
                'opacity':0
            });
        });
        $('.num_box').addClass('num-w-grow');
        setTimeout(rollSalary,4000);

        setTimeout(showMonkeyImg,15000);

    }

    //��Ƭ��Ƭ��Ч����
    function showMonkeyImg(){
        $('.monkey-popup-container').fadeIn(2000);
    }

    function rollSalary(){
        var u = 113.4;   //num-80 ���ܸ߶� 1248px һ����11���� ��ÿ��113.4545
        var isBegin = false;

        if(isBegin) return false;
        isBegin = true;    //���������������תû����ʱ�������ٴε��
        $(".num").css('backgroundPositionY',0);
//            var result = numRand();

        //ֱ��ָ�� ����
        //var result = 13000;
//        var num_arr = (result+'').split('');  //����߿�ʼ
//        var num_arr = (result+'').split('').reverse();   // ���ұ߿�ʼ

        //����ָ�� ����
        var num_arr = ['0','0','0','10','10'];   // ���ұ߿�ʼ  10����X


        var len = num_arr.length-1;
        $(".num").each(function(index){
//                var _num = $(this);  //����߿�ʼ
            var _num = $('.num_box div').eq(len-index); // ���ұ߿�ʼ
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

    }
}()



//֤��

$('.cert-cont img').hover(function(){
    $('.cert-cont').removeClass('cert-ani');
    $(this).addClass('cert-big-img');

},function(){
    $('.cert-cont').addClass('cert-ani');
    $(this).removeClass('cert-big-img');
})
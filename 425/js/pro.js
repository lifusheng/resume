



$(function(){
    var requestAnimFrame = (function(){   //������
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    var  TIMER =null,curSlide= 1,
        $slider = $('.slider');

    var cloneNode=$('.slide:last').clone().removeClass('sw');
    $slider.children('.slide.sw').first().before(cloneNode);

    var numOfBanner=$slider.find('.slide').length;  // �ֲ�ͼ����

    $slider.css({'width':1200*numOfBanner+'px' });

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
    var slideBanner=function(target){

        if(target>0){  //����
            slideLeft(target);
        }else{   //����
            slideRight(target);
        }
    };
    var run=function(target,direction){
        slideBanner(direction);
        if(target){       //��ͨ���������Բ���
            curSlide=target;
        }else if(direction>0){
            curSlide=++curSlide<=3?curSlide:1;
        }else{
            curSlide=--curSlide>=1?curSlide:3;
        }
        toggleSlide(curSlide);
    };
    var autoSlide;
    var start=function(){
        var time=new Date(),timestamp=time.getTime();
        autoSlide = function(timestamp, elapsed){
            if (elapsed > 2000 ) {   //���Ƴ��� 2sִ��һ��
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
        var target =+$(this).attr('data-target');  //ʹ�� + ��string ת��Ϊnumber
        run(target,curSlide-target);
    });

    $('.cont').on('click', '.side-nav', function () {
        var target = $(this).attr('data-target');
//            console.log(typeof target,target);
        if (target === 'left'){
            run(null,1);  //�����ƶ�
        } else if (target === 'right'){
            run(null,-1);   //�����ƶ�
        }
    });

    ///*�����ͣ�¼�*/
    //$('.cont').hover(function () {
    //    window.cancelAnimationFrame(TIMER);   //�����ͣʱ�����ʱ��
    //}, function () {
    //    run();
    //    start(); //����Ƴ�ʱ������ʱ��
    //});
    //
    //start();

});


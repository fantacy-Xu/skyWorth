window.onload = function(){

    //商品列表的下拉动画效果
    $(".menu-left").hover(function () {
        $(".nav-cont").stop().slideDown(500);
    },function () {
        $(".nav-cont").stop().slideUp(500);
    });



    //动态添加商品数据

    $.ajax({
        type:'get',
        url:'../json/details.json',
        dataType:'json',

        success:function (data) {
            //拿到当前页面的url
            var uname =  location.search.split("?")[1].split('&')[1] ;

            //拿到数据的id
            /* var indexId = page_url.split("=")[1]; */
            if(uname){
                var indexId = location.search.split("?")[1].split('&')[0].split('=')[1];
            }else{
                var indexId =location.search.split("=")[1];
            }
            
            /* console.log(indexId); */

            for(var k in data){

            if(data[k].id == indexId){
                    var imgData = ` <b><img class="boxImg" src="../images/detailsImg/${data[k].img}.jpg" alt=""></b>`;
                    var bigImgData = `<img class="bigImg" src="../images/detailsImg/${data[k].img}.jpg" alt="">`;
                    var smallImgData = `<span class="sel"><img class="" src="../images/detailsImg/${data[k].img}.jpg" alt=""></span>
                            <span><img src="../images/detailsImg/201807251027030018.jpg" alt=""></span>
                            <span><img src="../images/detailsImg/201807251027036382.jpg" alt=""></span>
                            <span><img src="../images/detailsImg/201807251027037840.jpg" alt=""></span>`;
                    var proName =  `${data[k].title}`;
                    var proDesc = `${data[k].contents}`;
                    var proPrice =  `¥ ${data[k].price}`;
                    var proVersion = `<a id="acLi_14647922" href="javascript:;"><li>43M9</li></a>
                            <a id="acLi_14647900" href="javascript:;"><li>50M9</li></a>
                            <a id="acLi_13249031"  href="javascript:;"><li class="current">55M9</li></a>
                            <a id="acLi_13249034" href="javascript:;"><li>65M9</li></a>`;



                    $('.showbox_b').append(imgData);
                    $('.bigBox').append(bigImgData);
                    $('.imgList').append(smallImgData);
                    $('.pro_detail_title').append(proName);
                    $('.pro_detail_title_er').eq(0).append(proDesc);
                    $('.detail_price').append(proPrice);
                    $('.detail_version').append(proVersion);


                    // 放大镜特效
                    /*获取目标元素*/
                    var imgList = $('.imgList').children();

                    /*监听鼠标进入小盒子*/
                    $('#showbox').hover(function () {
                        $('.showbox_span').css('display','block');
                        $('.bigBox').css('display','block');

                        /*监听鼠标的移动*/
                        $('#showbox').mousemove(function (event) {

                            /*求出鼠标的坐标*/

                            var pointX = event.pageX - $('#showbox').parent().offset().left - $('.showbox_span').width()*0.5;
                            var pointY = event.pageY - $('#showbox').parent().offset().top - $('.showbox_span').height()*0.5;

                            /*边界检测*/

                            /*边界最大值*/
                            var maxW = $('#showbox').width() - $('.showbox_span').width();
                            var maxH = $('#showbox').height() - $('.showbox_span').height();

                            pointX = pointX < 0 ? 0 : (pointX > maxW ? maxW : pointX);
                            pointY = pointY < 0 ? 0 : (pointY > maxH ? maxH : pointY);

                            /*让放大镜动起来*/

                            $('.showbox_span').css({
                                'left':pointX + 'px',
                                'top': pointY + 'px'
                            })

                            /*让大图动起来*/
                            /*
                              smallX / bigX = smallBox.width / 大图的宽度
                              bigX = smallX / ( smallBox.width / 大图的宽度 )
                           */
                            bigImgL = - pointX / ($('#showbox').width() / $('.bigBox').width());
                            bigImgT = - pointY / ($('#showbox').height() / $('.bigBox').height()) ;

                            $('.bigImg').css({
                                'left': bigImgL +'px',
                                'top': bigImgT +'px'
                            })

                        })
                        /*监听鼠标离开小盒子*/
                    },function () {

                        /*把显示的内容隐藏*/
                        $('.showbox_span').css('display','none');
                        $('.bigBox').css('display','none');
                    });

                    /*遍历列表图片*/


                    for(var k in imgList){
                        //遍历到时立即执行
                        (function(k){
                            // 获取到当前鼠标移到的图片
                            var img = imgList.eq(k);
                            // 当鼠标移入图片时
                            img.on('mouseover',function(){

                                var index = $(this).index();
                                // 切换边框橙色
                                $(".imgList").children().eq(k).addClass('sel').siblings().removeClass('sel');
                                var newSrc = $(this).children().attr('src');

                                $('.boxImg').attr('src',newSrc);
                                $('.bigImg').attr('src',newSrc);
                            })
                        })(k);

                    }

                    $("#showlast").on("click", function () {
                        var index = $(".sel").index();
                        if (index == 0) {
                            index = 0;
                        } else {
                            index--;
                        }

                        $("#showsum span").eq(index).addClass("sel").siblings().removeClass("sel");
                        var newSrc = $("#showsum span").eq(index).children().attr('src');

                        $('.boxImg').attr('src',newSrc);
                        $('.bigImg').attr('src',newSrc);

                    })
                    //右边箭头到下一张图片
                    $("#shownext").on("click", function () {
                        var index = $(".sel").index();
                        if (index == $(".imgList").children().size()) {
                            index = $(".imgList").children().size()
                        } else {
                            index++;
                        }
                        $("#showsum span").eq(index).addClass("sel").siblings().removeClass("sel");
                        var newSrc = $("#showsum span").eq(index).children().attr('src');

                        $('.boxImg').attr('src',newSrc);
                        $('.bigImg').attr('src',newSrc);

                    })

                }
            }
        }
    });






    /*当页面滚动到详情页的时候出现的页面效果*/
    document.onscroll = function(){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop >= 1000){
                $('.all_title ').addClass('proCenTabOn').css({
                    'top':"0px",
                    'height':'57px',
                });
                $('.width_all').css({
                    'margin':'0 auto',
                    'width':'1210'
                });
                $('.main_service').css('display','block');
                $('.ripple').css('position','absolute');

            }else{
                $('.all_title ').removeClass('proCenTabOn').css('top',"1000px");
                $('.main_service').css('display','none');
                $('.ripple').css('position','relative');

            }
        if(scrollTop >= 767){   //返回顶部
            $('.btnBackTop').css('display','block');
        }else{
            $('.btnBackTop').css('display','none');
        }
    };

    //商品介绍和售后服务和客户评价之间的切换


    //事件委托切换
    $('.main_content').eq(0).css('display','block');
    $('.main_content').eq(1).css('display','none');
    $('.main_content').eq(2).css('display','none');

    $(".main_er").delegate("li","click",function(){

        $('html , body').scrollTop(920);
        //给当前点击的元素添加e_active类，同辈元素要移除e_active类
        $(this).addClass('e_active').siblings().removeClass('e_active');

        //获取点击的当前下标
        var index = $(this).index();
        // console.log($('.main_content').eq(index)[0]);
        // $('.main_content').eq(index).addClass('on').siblings().removeClass('on');

        //找到对应的div内容，加上类selected，同辈移除类selected。
        $('.main_content').eq(index).css('display','block').siblings().css('display','none');
    });


    //版本号选择
    /*$('.detail_version li').eq(0).css()*/

    $(".detail_version").on("click","li",function(event){
        // console.log($(this).addClass('current').parent()[0]);
        $(this).addClass('current').parent().siblings().children().removeClass('current');
    });


    //返回顶部
    $('.btnBackTop').click(function(){
        $('html , body').animate({scrollTop: 0},'slow');
    })

};

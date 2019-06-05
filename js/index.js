(function(){
    //登录状态获取
    var uname = location.search;
    //点击logo跳回主页，根据登录状态来判断进行跳转方式
    if(uname){
        uNameUrl= uname.split('?')[1].split('=')[1];
        $('.backIndex').attr('href',`./index.html?uname=${uNameUrl}`);
    }
    //swiper轮播图插件
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        /* slidesPerView: 1, */
        touchRatio : 0.4,//设置为0.4后slide滑动距离只有触摸距离的一半，变得难以滑动
        preventLinksPropagation : false,
        speed:600,
        autoplay:2000,
        loop: true,
        paginationClickable: true,
        pagination: '.swiper-pagination',
    });
    //鼠标移入
    $('.banner').mouseenter(function(){
        $('.arrow').animate({
            opacity:'1'
        },500);
        swiper.stopAutoplay();
    });
    //鼠标移出
    $('.banner').mouseleave(function(){
        swiper.startAutoplay();
        $('.arrow').animate({
            opacity:'0'
        },500);
    });

    
    /* console.log(uname); */
    if(uname){
        uname = uname.split('?')[1].split('=')[1]
        $('.login').children().attr("href",'javascript:').text(uname);
        $('.register').addClass('exit').children().attr("href",'javascript:').text("退出");
        $('.goodsList').children().attr("href",`./ziye.html?uname=${uname}`);
        //退出账号
        $('.exit').click(function(){
            location.href = './index.html';
        })
        //跳转去购物车
        $('.shop-btn').click(function(){
            location.href = `./shopCar.html?uname=${uname}`;   
        })
        //循环获取多个数据
        function getStr(startIndex,endIndex,data){
            var str = ``;
            for(var i=startIndex; i < endIndex;i++){
                str += `
                        <div class="listCon">
                            <div class="list_pro">
                                <a href="../html/details.html?id=${data[i].id}&uname=${uname}" target="_blank">
                                    <img lazyload="true" data-original="../images/indexImg/${data[i].img}.jpg" src="" alt="" height="190">
                                </a>
                            </div>
                            <div class="list_bottom">
                                <h5><a href="../html/details.html?id=${data[i].id}&uname=${uname}" target="_blank">${data[i].title}</a></h5>
                                <p>${data[i].contents}</p>
                                <div class="price">￥${data[i].price}</div>
                            </div>
                            <div class="hot">
                                <i>
                                    <img src="" alt="">
                                </i>
                            </div>
                            <div class="list_hover">
                                <span class="hover_price">￥${data[i].price}</span>
                                <span class="shop_car ripple">
                                    <a href="../html/details.html?id=${data[i].id}&uname=${uname}">加入购物车</a>
                                </span>
                            </div>
                        </div>
                `;
            }
            return str;
        }
        //获取单个数据
        function oneStr(index,data){
            var str = ``;
            str = `
                    <div class="listCon list_cont_two">
                        <div class="list_pro">
                            <a href="../html/details.html?id=${data[index].id}&uname=${uname}">
                            <img lazyload="true" data-original="../images/indexImg/${data[index].img}.jpg" src="" alt="" height="240"></a>
                        </div>
                        <div class="list_bottom">
                            <h5><a href="../html/details.html?id=${data[index].id}&uname=${uname}">${data[index].title}</a></h5>
                            <P>${data[index].contents}</P>
                            <div class="price">￥${data[index].price}</div>
                        </div>
                        <div class="hot"><i><img src="../images/indexImg/imageTag1.png" alt=""></i></div>
                        <div class="list_hover">
                            <span class="hover_price">￥${data[index].price}</span>
                            <span class="shop_car ripple">
                                <a href="../html/details.html?id=${data[index].id}&uname=${uname}">加入购物车</a>
                            </span>
                        </div>
                    </div>
            `;
            return str;
        }
    }else{
        //跳转去购物车
        $('.shop-btn').click(function(){
            location.href = `./shopCar.html`;   
        })
        $('.goodsList').children().attr("href",`./ziye.html`);
        
        //循环获取多个数据
        function getStr(startIndex,endIndex,data){
            var str = ``;
            for(var i=startIndex; i < endIndex;i++){
                str += `
                        <div class="listCon">
                            <div class="list_pro">
                                <a href="../html/details.html?id=${data[i].id}" target="_blank">
                                    <img lazyload="true" data-original="../images/indexImg/${data[i].img}.jpg" src="" alt="" height="190">
                                </a>
                            </div>
                            <div class="list_bottom">
                                <h5><a href="../html/details.html?id=${data[i].id}" target="_blank">${data[i].title}</a></h5>
                                <p>${data[i].contents}</p>
                                <div class="price">￥${data[i].price}</div>
                            </div>
                            <div class="hot">
                                <i>
                                    <img src="" alt="">
                                </i>
                            </div>
                            <div class="list_hover">
                                <span class="hover_price">￥${data[i].price}</span>
                                <span class="shop_car ripple">
                                    <a href="../html/details.html?id=${data[i].id}">加入购物车</a>
                                </span>
                            </div>
                        </div>
                `;
            }
            return str;
        }
        //获取单个数据
        function oneStr(index,data){
            var str = ``;
            str = `
                    <div class="listCon list_cont_two">
                        <div class="list_pro">
                            <a href="../html/details.html?id=${data[index].id}">
                            <img lazyload="true" data-original="../images/indexImg/${data[index].img}.jpg" src="" alt="" height="240"></a>
                        </div>
                        <div class="list_bottom">
                            <h5><a href="../html/details.html?id=${data[index].id}">${data[index].title}</a></h5>
                            <P>${data[index].contents}</P>
                            <div class="price">￥${data[index].price}</div>
                        </div>
                        <div class="hot"><i><img src="../images/indexImg/imageTag1.png" alt=""></i></div>
                        <div class="list_hover">
                            <span class="hover_price">￥${data[index].price}</span>
                            <span class="shop_car ripple">
                                <a href="../html/details.html?id=${data[index].id}">加入购物车</a>
                            </span>
                        </div>
                    </div>
            `;
            return str;
        }
    }
    
    

   
    //goods ajax
    $.get('../json/goods.json',function(data){
        var hot = getStr(0,5,data); //热销
        var flex_wrap = oneStr(5,data); //
        var str_tv = getStr(6,9,data);  //电视
        var box_wrap = oneStr(9,data);
        var other_box = getStr(10,13,data);
        var lighting_wrap = oneStr(13,data);
        var icebox_wrap = oneStr(14,data);  //冰箱
        var icebox_other = getStr(15,16,data);
        var washer_wrap = oneStr(16,data);  //洗衣机
        var washer_other = getStr(17,20,data);
        var airIce_wrap = oneStr(20,data);  //空调
        var airIce_other = getStr(21,24,data);
        var sound_wrap = oneStr(24,data);   //音响
        var sound_other = getStr(25,28,data);
        var scope_wrap = oneStr(28,data);   //显示器
        var scope_other = getStr(29,32,data);
        var lock_wrap = oneStr(32,data);    //智能锁
        var lock_other = getStr(33,36,data);

        $('.on').append(hot);   //热销
        $('.tv').append(flex_wrap); //电视
        $('.tv').append(str_tv);    //电视
        $('.box').append(box_wrap); //盒子
        $('.box').append(other_box);
        $('.lighting').append(lighting_wrap);  //灯饰
        $('.icebox').append(icebox_wrap);   //冰箱
        $('.icebox').append(icebox_other);
        $('.washer').append(washer_wrap);   //洗衣机
        $('.washer').append(washer_other);
        $('.airIce').append(airIce_wrap);   //洗衣机
        $('.airIce').append(airIce_other);
        $('.sound').append(sound_wrap);   //音响
        $('.sound').append(sound_other);
        $('.scope').append(scope_wrap);   //显示器
        $('.scope').append(scope_other);
        $('.lock').append(lock_wrap);   //智能锁
        $('.lock').append(lock_other);

    },'json');

    
    
    
})()
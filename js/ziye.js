window.onload = function(){
    document.onscroll = function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop >= 41){
            $('.top-wrap').addClass('proCenTabOn').css('top',"0px");
            
        }else{
            $('.top-wrap').removeClass('proCenTabOn').css('top',"41px");
            
        }
    }
}
//循环获取多个数据
    function getStr(index,data){
        var str =``;
        str +=`
                <div style="float:left" class="content-list">
                    <a href="../html/details.html?id=${data[index].id}" target="_blank"><img src="../images/ziyeImg/${data[index].img}.jpg" alt=""></a>
                    <div class="product_font">
                        <div class="product_top">
                        <a href="../html/details.html?id=${data[index].id}"> <div class="top_left">￥${data[index].price}</div></a>
                        </div>
                        <div class="product_mid">
                            <h3><a href="../html/details.html?id=${data[index].id}" target="_blank">${data[index].title}</a></h3>
                            <p>${data[index].contents}</p>
                        </div>
                        <div class="product_bottom">
                            <div>
                                <span class="store_name">创维-RGB电子有限公司</span>
                                <span><a href="#"><i style="color:#2e8ae4" class="iconfont iconkefu"></i></a> </span>
                            </div>
                            <div class="bottom_right">销量：56</div>
                            <div class="bottom_left"><a href="../html/details.html?id=${data[index].id}"><i class="iconfont icongouwuche"></i>购物车</a></div>
                        </div>
                    </div>
                    
                </div>

        `;
        
        return str;
    }
    $.get('../json/goods.json',function(data){
        var one = getStr(36,data);
        $('.ico:eq(0)').before(one);
        var two = getStr(37,data);
        $('.ico:eq(1)').before(two);
        var three = getStr(38,data);
        $('.ico:eq(2)').before(three);
        var four = getStr(39,data);
        $('.four').append(four);
        var five = getStr(40,data);
        $('.five').append(five);
        var six = getStr(41,data);
        $('.six').append(six);
        var seven = getStr(42,data);
        $('.seven').append(seven);
        var eight = getStr(43,data);
        $('.ico:eq(3)').before(eight);
        var nine = getStr(44,data);
        $('.ico:eq(4)').before(nine);
        var ten = getStr(45,data);
        $('.ico:eq(5)').before(ten);
        var eleven = getStr(46,data);
        $('.ico:eq(6)').before(eleven);
        var twelve = getStr(47,data);
        $('.twelve').append(twelve);
        var thirteen = getStr(48,data);
        $('.thirteen').append(thirteen);
        var fourteen = getStr(49,data);
        $('.fourteen').append(fourteen);
        var fifteen = getStr(50,data);
        $('.ico:eq(7)').before(fifteen);
        var sixteen = getStr(51,data);
        $('.sixteen').append(sixteen);
        
    },'json')
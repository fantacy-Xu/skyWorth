(function(){
   
    $.get('../php/shopCart.php',{"id":2},function(data){
        localStorage.setItem('cartList',JSON.stringify(data));
        var localData = JSON.parse(localStorage.getItem('cartList'));

        console.log(localData);
        var str = ``;
        for(var i=0; i<localData.length; i++){
            var flodMoney = Math.round(localData[i].price *0.9).toFixed(2);
            str += `
                <ul class="lists-dir">
                    <li class="checkall single">
                        <div class="checkall-box">
                            <input type="checkbox" id='${localData[i].id}' onclick="checkOne(this)"/>
                            <label  for="${localData[i].id}"><i class="iconfont icongou-copy toggle"></i></label>
                        </div>
                    </li>
                    <li class="productInfo">
                        <div class="contents">
                            <a href="#"><img src="../images/indexImg/${localData[i].img}.jpg" alt=""></a>
                            <div class="goods-dir">
                                <h3><a href="#">${localData[i].title}</a></h3><br><br>
                                <p>${localData[i].contents}</p>
                                <p>配送公司：创维-RGB电子有限公司</p>
                            </div>
                        </div>
                    </li>
                    <li class="price font-center">
                        <p>￥<span class="realMoney">${flodMoney}</span></p>
                        <p class="line-throught">￥<span>${localData[i].price}</span></p>
                    </li>
                    <li class="goodsNum font-center">
                        <div class="count-box">
                            <a class="reduceGoods" href="javascript:">-</a>
                            <input class="countNum" value="1" onchange="operate(this)"/>
                            <a class="addGoods" href="javascript:">+</a>
                        </div>
                    </li>
                    <li class="allMoney font-center">
                        <p>￥<span class="calMoney">${flodMoney}</span></p>
                    </li>
                    <li class="operate font-center">
                        <a class="delGoods" href="#">移除商品</a>
                    </li>
                </ul>
            `;
        } 
        $('.oreder-content').append(str);
    },'json');
    //数量增加
    $('.oreder-content').on('click','a',function(event){
        var singlePrice = $(this).parent().parent().siblings('.price').children().children('.realMoney').text();
        if($('.countNum').val() != ''){ //input框中值不为空
            var num = parseInt($('.countNum').val());
            if($(this)[0].className == 'addGoods'){ //增加商品
                num++;
                $('.calMoney').text((singlePrice * num).toFixed(2));
                $('.countNum').val(num);
            }else if($(this)[0].className == 'reduceGoods'){    //减少商品
                if(num == 1){
                    return;
                }
                num--;
                $('.calMoney').text((singlePrice * num).toFixed(2));
                $('.countNum').val(num);
            }
        }else{
            layer.msg("不是正确的数量格式！");
        }
    })
    
   

})()
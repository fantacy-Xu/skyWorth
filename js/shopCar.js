
//以下用于hover时菜单出现和消失操作
$('.menu-left').hover(function(){
    $('.nav-cont').stop().slideDown(500);
},function(){
    $('.nav-cont').stop().slideUp(500);
});

//构造函数创建一个对象模型用于对本地数据的增删查改
function Car(){};
//获取购物车中的商品--在Car的原型中添加方法
    //获取购物车中的物品
Car.prototype.getCar = function(){
    //没有数据返回空数组，以防出错
    return JSON.parse(localStorage.getItem("carList")) || [];
}

//添加商品到购物车
Car.prototype.addToCar = function(product){
    var carList = this.getCar();
    //1、判断购物车中有无此商品
    if(this.hasGoods(product.id)){
        for(var i = 0; i < carList.length;i++){
            if(product.id == carList[i].id){
                carList[i].number = product.number;
            }
        }
    }else{
        //没有，直接加入carList这个数组中
        carList.push(product);
    }
    //整个再一起存入本地存储
    localStorage.setItem("carList",JSON.stringify(carList));
}

//判断购物车中有无此商品
Car.prototype.hasGoods = function(id){
    var carList = this.getCar();
    //判断购物车中有无此商品
    for(var i = 0;i < carList.length; i++){
        if(id == carList[i].id){//有返回真
            return true;
        }
    }
    //无返回假
    return false;
}

//删除指定的商品
Car.prototype.delGoods = function(id){
    var carList = this.getCar();
    for(var i = 0; i<carList.length; i++){
        if(id == carList[i].id){
            carList.splice(i,1);//在数组中删除从下标为i位置的元素，删除一个，改变原数组
            localStorage.setItem('carList',JSON.stringify(carList));
            return true;
        }
    }
    return false;
}

function carChange(carList,id,num){//购物车数据发生改变的时候，加减按钮及input框操作
    for(var i = 0; i <carList.length; i++){
        if(carList[i].id == id){
            if(num){
                carList[i].number = num;
            }
        }
    }
    localStorage.setItem('carList',JSON.stringify(carList));
}

var car = new Car();
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

function noIdgetGoods(){
    var carList = car.getCar();
    var str = ``;
    if(carList.length != 0){//判断购物车有无商品，无的话直接退出函数
        for(var i = 0; i < carList.length; i++){
            str +=`
                    <ul class="newbox">
                        <li class="list_check">
                            <div class="checkboxFive">
                                <input onclick = 'check(this)' type="checkbox" id="checkboxFive${carList[i].id}" class="checkbox">
                                <label for="checkboxFive${carList[i].id}"></label>
                            </div>
                        </li>
                        <li class="list_con">
                            <div class="list_img">
                                <a href="#">
                                    <img src="../images/indexImg/${carList[i].img}.jpg" alt="">
                                </a>
                            </div>
                            <div class="list_text">
                                <a href="../html/details.html?id=${carList[i].id}" id="marque">${carList[i].title}</a>
                                <p class="p_padding">${carList[i].contents}</p>
                                <p class="p_padding">配送公司:创维-RGB电子有限公司</p>
                            </div>
                        </li>
                        <li class="list_price">
                            <p class="price">
                                ${parseInt(parseInt(carList[i].price*(0.9*10))/10)}.00¥
                            </p>
                            <p class="discount">
                                ${carList[i].price}¥
                            </p>
                        </li>
                        <li class="list_amount">
                            <div class="amount_box">
                                <a href="javascript:;" onclick = "reduce(${carList[i].id},this)" class="iconfont iconjianhao"></a>
                                <input type="text" class="cnum" onblur = "change(this,${carList[i].id},${carList[i].price})" value = ${carList[i].number}>
                                <a href="javascript:;" onclick = "add(${carList[i].id},this)" class="iconfont iconjiahao" style="right: 0" ></a>
                            </div>
                        </li>
                        <li class="list_sum">
                            <p class="sum_price">
                                ${parseInt(parseInt(carList[i].price*(0.9*10))/10)*carList[i].number}.00¥
                            </p>
                        </li>
                        <li class="list_operation">
                            <a href="#" onclick = 'del(${carList[i].id})'>移除商品</a>
                        </li>
                    </ul>
                    `
                    $(".car_box").css('padding',0);
                    $('.car_bottom').css('border',0);
        }
        $('.car_box').html(str);
    }
}

function hasIdgetGoods(){
    $.get('../json/shopCar.json','',function(res){
        for(var i = 0; i < res.length; i++){
            if(id == res[i].id){
                res[i].number = number;
                var result = res[i];
            }
        }
        car.addToCar(result);
        var carList = car.getCar();
        var str = ``;
        if(carList.length == 0){//判断购物车有无商品，无的话直接退出函数
            return;
        }
        for(var i = 0; i < carList.length; i++){
            str +=`
                    <ul class="newbox">
                        <li class="list_check">
                            <div class="checkboxFive">
                                <input onclick = 'check(this)' type="checkbox" id="checkboxFive${carList[i].id}" class="checkbox">
                                <label for="checkboxFive${carList[i].id}" class = 'checkoneLabel'></label>
                            </div>
                        </li>
                        <li class="list_con">
                            <div class="list_img">
                                <a href="#">
                                    <img src="../images/indexImg/${carList[i].img}.jpg" alt="">
                                </a>
                            </div>
                            <div class="list_text">
                                <a href="../html/details.html?id=${carList[i].id}" id="marque">${carList[i].title}</a>
                                <p class="p_padding">${carList[i].contents}</p>
                                <p class="p_padding">配送公司:创维-RGB电子有限公司</p>
                            </div>
                        </li>
                        <li class="list_price">
                            <p class="price">
                                ${parseInt(parseInt(carList[i].price*(0.9*10))/10)}.00¥
                            </p>
                            <p class="discount">
                                ${carList[i].price}¥
                            </p>
                        </li>
                        <li class="list_amount">
                            <div class="amount_box">
                                <a href="javascript:;" onclick = "reduce(${carList[i].id},this)" class="iconfont iconjianhao"></a>
                                <input type="text" class="cnum" onblur = "change(this,${carList[i].id},${carList[i].price})" value = ${carList[i].number}>
                                <a href="javascript:;" onclick = "add(${carList[i].id},this)" class="iconfont iconjiahao" style="right: 0" ></a>
                            </div>
                        </li>
                        <li class="list_sum">
                            <p class="sum_price">
                                ${parseInt(parseInt(carList[i].price*(0.9*10))/10)*carList[i].number}.00¥
                            </p>
                        </li>
                        <li class="list_operation">
                            <a href="#" onclick = 'del(${carList[i].id})'>移除商品</a>
                        </li>
                    </ul>
                    `
                    $(".car_box").css('padding',0);
                    $('.car_bottom').css('border',0);
        }
        $('.car_box').html(str);
    },'json');
}



// 页面加载后发送ajax请求
var stringInfo =  location.search;
var uname = 'uname';
/* console.log(arr); */
    if(stringInfo){
        //用户名是否存在，存在则修改账号状态
        /* console.log(stringInfo); */
        var arr = stringInfo.split('?')[1].split('&');
        if(stringInfo.indexOf(uname) != -1){   //存在用户名
            if(arr.length == 3){    //商品ID存在，地址栏的截取方式
                uname = stringInfo.split('?')[1].split("&")[2].split('=')[1];
                var id = location.search.split('?')[1].split("&")[0].split('=')[1];
                var number = location.search.split('?')[1].split("&")[1].split('=')[1];

                hasIdgetGoods();

            }else{//商品ID不存在，地址栏的截取方式
                uname = stringInfo.split('?')[1].split('=')[1];
                //账号处于登录状态
                noIdgetGoods();
            }
            //点击logo跳回主页，根据登录状态来判断进行跳转方式
            $('.backIndex').attr('href',`./index.html?uname=${uname}`);
            $('.login').children().attr("href",'javascript:').text(uname);
            $('.register').addClass('exit').children().attr("href",'javascript:').text("退出");
            //退出账号
            $('.exit').click(function(){
                location.href = './index.html';
            })
        }else{
            var id = location.search.split('?')[1].split("&")[0].split('=')[1];
            var number = location.search.split('?')[1].split("&")[1].split('=')[1];
            hasIdgetGoods();
        }
    }else{
        //地址栏没有任何数据
        noIdgetGoods();
    
    }


//点击移出商品按钮时执行以下函数
function del(id){
    if(!confirm("您确定要删除宝贝吗?")){//不删除直接退出
        return;
    }
    if(car.delGoods(id)){
        if(stringInfo.indexOf(uname) != -1){
            location.href = `../html/shopCar.html?uname=${uname}`;
        }else{
            location.href = '../html/shopCar.html';
        }
       
    }else{
        alert("删除失败");
    }

}
//点击多选框实现全选
$($(".checkAll")[0]).click(function(){
        //用于给多选框添加样式--仿造
        var carList = car.getCar();
        var num = 0;
        var totalMoney = 0;
        for(var i=0; i < carList.length; i++){
            num += parseInt(carList[i].number);
            totalMoney += parseFloat(parseInt(carList[i].price*9/10)*carList[i].number);

        }
    if(this.checked){
        $('label').addClass('iconfont icongou').css("color",'blue');
        $("input[type = 'checkbox']").prop('checked',true);
        $("#num").text(num);
        $(".totalMoney > .total").text(totalMoney + ".00¥");
    }else{
        $("input[type = 'checkbox']").prop('checked',false);
        $('label').removeClass('iconfont icongou');
        $("#num").text(0);
        $(".totalMoney > .total").text(0 + ".00¥");
    }
});
//取消全选
$($(".checkAll")[1]).click(function(){
        //用于给多选框添加样式--仿造
        var carList = car.getCar();
        var num = 0;
        var totalMoney = 0;
        for(var i=0; i < carList.length; i++){
            num += parseInt(carList[i].number);
            totalMoney += parseFloat(carList[i].price*carList[i].number);
        }
        if(this.checked){
        $('label').addClass('iconfont icongou').css("color",'blue');
        $("input[type = 'checkbox']").prop('checked',true);
        $("#num").text(num);
        $(".totalMoney > .total").text(totalMoney + ".00¥");
    }else{
        $('label').removeClass('iconfont icongou')
        $("input[type = 'checkbox']").prop('checked',false);
        $("#num").text(0);
        $(".totalMoney > .total").text(0 + '.00¥');
    }
});

//根据单选按钮的checked的状态对总金额及总数量进行修改操作
function check(ele){
    $(ele).siblings().toggleClass('iconfont icongou').css("color",'blue');
    var numEle = $($(ele).parent().parent().siblings()[2]).children().children()[1];
    var num = parseInt(numEle.value);
    var priceEle =  $($(ele).parent().parent().siblings()[3]).children()[0];
    var totalMoney = parseFloat(priceEle.innerText);
    if(ele.checked){
        // console.log(totalMoney)
        var checkoneLabel = [];
        for(var i = 0; i < $('.checkoneLabel').length; i++){
            if($($('.checkoneLabel')[i]).siblings()[0].checked){
                checkoneLabel.push($('.checkoneLabel')[i]);
            }
        }
        if(checkoneLabel.length == $('.checkoneLabel').length){
            $('.checkAll').prop('checked',true).siblings().addClass('iconfont icongou');
        }
         $("#num").text(parseInt($("#num").text())+num);
        $(".totalMoney > .total").text(parseInt($(".totalMoney > .total").text())+totalMoney +".00¥");
    }else{
        $("#num").text(parseInt($("#num").text())-num);
        $('.checkAll').prop('checked',false).siblings().removeClass('iconfont icongou');
        $(".totalMoney > .total").text(parseInt($(".totalMoney > .total").text()) - totalMoney +".00¥");
    }
}

//以下功能实现点击加减按钮减少购物车中的商品数量
    //减少按钮
function reduce(id,ele){
    var carList = car.getCar();
    var totalmoneyPar = $(ele).parent().parent().siblings()[3];
    var totalmoneyEle = $(totalmoneyPar).children();
    var pricePar = $(ele).parent().parent().siblings()[2];
    var priceEle = $(pricePar).children()[0];
    var money =parseFloat(priceEle.innerText);
    var checkboxEle =  $($(totalmoneyPar).siblings()[0]).children().children()[0];
    for(var i = 0; i < carList.length; i++){
        if(id == carList[i].id){
            if(carList[i].number <= 1){
                alert("已经是最后一件了,不能再减少了");
                return;
            }
            carList[i].number-- ;
            $(ele).siblings().val(carList[i].number);
            totalmoneyEle.text("¥ " + parseInt(carList[i].number)*money + ".00");
                if(checkboxEle.checked){
                    $("#num").text(parseInt($("#num").text())-1);
                    $(".totalMoney > .total").text(parseInt($(".totalMoney > .total").text()) - money +".00¥");
                }
            }
    }
    localStorage.setItem('carList',JSON.stringify(carList));
}

    //添加按钮
function add(id,ele){
    var carList = car.getCar();
    var totalmoneyPar = $(ele).parent().parent().siblings()[3];
    var totalmoneyEle = $(totalmoneyPar).children();
    var pricePar = $(ele).parent().parent().siblings()[2];
    var priceEle = $(pricePar).children()[0];
    var money =parseFloat(priceEle.innerText);
    var checkboxEle =  $($(totalmoneyPar).siblings()[0]).children().children()[0];
    for(var i = 0; i < carList.length; i++){
        if(id == carList[i].id){
            carList[i].number++ ;
            $(ele).siblings().val(carList[i].number);
            totalmoneyEle.text("¥ " + parseInt(carList[i].number)*money +".00");
            if(checkboxEle.checked){
                $("#num").text(parseInt($("#num").text())+1);
                $(".totalMoney > .total").text(parseInt($(".totalMoney > .total").text()) + money +".00¥");
            }
        }
    }
    localStorage.setItem('carList',JSON.stringify(carList));
}

changeReg = /^\d{1,2}$/;
//input对购物车产品进行修改修改正则
function change(ele,id,price){//ele为input框本身，num为购物车数据number
    var val = ele.value;
    var carList =car.getCar();
    var numChange = ele.value;
    var priceEle = $($(ele).parent().parent().siblings().eq(3)).children();
    var checkboxEle = $($(ele).parent().parent().siblings().eq(0)).children().children()[0];
    for(var i = 0; i< carList.length; i++){
        if(carList[i].id == id){
            var num = carList[i].number;
        }
    }
    var moneyChange = price*(numChange - num);
    var changeNum = numChange - num;
    if(!changeReg.test(val)){
        ele.value = num;
        alert('您输入的数据不符合商品规则，请重新输入');
        return;
    }else{
        priceEle.html(numChange*price + ".00¥");
        if(checkboxEle.checked){
            $("#num").text(parseInt($("#num").text())+ changeNum);
            $(".totalMoney > .total").text(parseInt($(".totalMoney > .total").text()) + moneyChange +".00¥");
        }
        carChange(carList,id,numChange);
    }
}
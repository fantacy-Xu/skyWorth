(function(){
    document.onscroll = function(){ //滚动吸顶效果
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop >= 41){
            $('.top-wrap').addClass('proCenTabOn').css('position',"fixed").css('top',"0px");
        }else{
            $('.top-wrap').css('position',"static").removeClass('proCenTabOn');
        }
        if(scrollTop >= 767){   //返回顶部
            $('.btnBackTop').css('display','block');
        }else{
            $('.btnBackTop').css('display','none');
        }
    };
    document.onscroll();
    //返回顶部
    $('.btnBackTop').click(function(){
        /* document.body.scrollTop = document.documentElement.scrollTop = 0; */
        $('html,body').animate({scrollTop:0},'slow');//动画返回顶部
    });
     //懒加载
        //获取可视区高度
    var viewHeiht = document.documentElement.clientHeight || document.body.clientHeight;
    function lazyload(){
        var eles = document.querySelectorAll('img[data-original][lazyload]');
        Array.prototype.forEach.call(eles,function(item,index){
            var rect;
            if(item.dataset.original === ''){
                return;
            }
            rect = item.getBoundingClientRect();//获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
            if(rect.bottom >= 0 && rect.top < viewHeiht){
                !function(){
                    var img = new Image();
                    img.src = item.dataset.original;
                    img.onload = function(){
                        item.src = img.src;
                    };
                    item.removeAttribute("data-original");
                    item.removeAttribute("lazyload");
                }();
            }
        })
    }
    lazyload();//初始化，先触发一次函数
    document.addEventListener('scroll',lazyload);

})();
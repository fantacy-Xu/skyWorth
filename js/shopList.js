$('.b_active_l').eq(0).children().css('border','1px solid #2e8ae4 ');
$('.b_active_l').eq(1).children().css('border','none');
// console.log($('.b_active').eq(1).children()[0]);

$('.inside_border li ').on('click',function(){
//    $('.inside_gray ul li').addClass('b_active').siblings().removeClass('b_active');
   $(this).parents('ul').find('li').removeClass('b_active');
   $(this).addClass('b_active')
})
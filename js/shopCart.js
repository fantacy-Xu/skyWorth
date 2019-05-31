(function(){
    var flag = true;
    $('.checkall-box label').click(function(){
        if(flag){
            $(this).children().removeClass('toggle');
            flag = false;
        }else{
            $(this).children().addClass('toggle');
            flag = true;
        }
        
    })

})()
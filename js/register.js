
document.getElementById("btn_a").onclick();
function checkCodeofRandom() {
    // 所需随机抽取的样本数组 
    var nums = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
    // 初始化 拼接字符串
    var str = "";
    //颜色需要的数组元素
    var nums1 = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
    var n1 = "";
    //字号需要的数组元素
    var nums2 = new Array("5");
    var n2;
    for (i = 0; i < 4; i++) {
        //遍历拼接颜色色值 eg 000000
        for (var j = 0; j < 6; j++) {
            var k = Math.floor(Math.random() * 100) % 16;
            n1 = n1 + nums1[k];
        }
        //每次生成一个随机的字号
        var o = Math.floor(Math.random() * 100) % 8;
        n2 = nums2[o];
        //每次生成一个0 - 61 之间的 number 作为随机获取验证码的下标
        var p = Math.floor(Math.random() * 1000) % 10;
        //拼接验证码  随机颜色 随机字号 随机抽取大小写字母和数字
        str += "<font color='#" + n1 + "' size='" + n2 + "'>" + nums[p] + "</font>";
    }
    //验证码
    document.getElementById("checkCode").innerHTML = str;
}
//显示注册页面 一
$('.content').eq(0).css('display', 'block');
//给注册页面加一个点击事件
$(".btn").click(function () {
    // alert("dasda");
    //获取账号val值
    var uname = $("#uname").val();
    var yz = $("#yz").val();
    var sj = $("#sj").val();
    var phone = /^[1][3,4,5,7,8][0-9]{9}$/;//给手机好添加正则
    //点击一次换一个验证码
    var str = document.getElementById("checkCode").innerText;
    document.getElementById("btn_a").onclick();
    //console.log(uname);
    //判断 框中内容
    if (uname == "") {
        alert("手机号不能为空");
        return;
    }
    if (!phone.test(uname)) {
        alert("请输入正确的手机号")
        return;
    }
    if (yz == "" || sj == "") {
        alert("验证码不能为空");
        return;
    }
    if (yz != str) {
        alert("验证码错误请重新输入");
        // console.log(str);
        return;
    }
    //console.log($('.content').eq(0)[0]);
    //连接  查看数据库 是否已有相同账号
    $.ajax({
        'type': 'post',
        'url': '../php/register.php',
        'data': {
            'uname': uname,
        },
        'dataType': 'json',
        'success': function (res) {
            //console.log(res);
            //如果手机号已存在则不跳转
            if (res.code == -1) {
                alert(res.message);
                return;
            } else {
                //给 1 2 3 添加样式
                $($('.ul').children()[1]).addClass('wire_a');
                $('.content').eq(0).css('display', 'none').next().css('display', 'block');

                //显示密码 2  
                $('.btn1').click(function () {
                    // console.log(yz1.value);
                    //获取密码框的val 值
                    var pwd = $("#pwd").val();
                    var pwd_a = $("#pwd_a").val();
                    var passWord = /^(\w){6,16}$/;//只能输入 6-16字母、数字、下划线。
                    //判断密码是否符合要求
                    if (!passWord.test(pwd)) {
                        alert('密码格式错误');
                        return;
                    };
                    //判断两次密码是否一致
                    if (pwd != pwd_a) {
                        alert("两次密码不一样，请重新输入");
                        return;
                    };
                    //跳转到注册页 三
                    $($('.ul').children()[2]).addClass('wire_a');
                    $('.content').eq(1).css('display', 'none').next().css('display', 'block');
                    //给 库中 添加账号密码
                    $.ajax({
                        'type': 'post',
                        'url': '../php/search.php',
                        'data': {
                            'uname': uname,
                            'pwd': pwd
                        },
                        'dataType': 'json',
                        'success': function (res) {
                            if (res.code == 200) {
                                //alert(res.message);
                            }
                        }
                    });
                });
            }
        }
    });
});

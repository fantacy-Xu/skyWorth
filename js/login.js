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
    //刷新页面显示一次随机验证码
    document.getElementById("checkCode").innerHTML = str;
}
//给登陆点击事件
$(".btn").click(function () {
    // alert("dasda");
    //获取标签的val值
    var uname = $("#uname").val();
    var pwd = $("#pwd").val();
    var yz = $("#yz").val();
    //点击一下登陆换一次验证码
    var str = document.getElementById("checkCode").innerText;
    //随机验证码
    document.getElementById("btn_a").onclick();
    //console.log(str);
    //判断 账户密码
    if (uname == "" || pwd == "") {
        alert("账户不能为空");
        return;
    }
    if (yz == "") {
        alert("验证码不能为空");
        return;
    } if (yz != str) {
        alert("验证码错误请重新输入");
        //console.log(str);
    };
    //用ajax判断 账号密码
    if (yz == str) {
        $.post("../php/login.php", { "uname": uname, "pwd": pwd }, function (res) {
            if (res.code == 200) {
                alert(res.message);
                window.location.href = './index.html';//跳转页面链接
            } else {
                alert(res.message);
            }
        }, 'json');
    }
});
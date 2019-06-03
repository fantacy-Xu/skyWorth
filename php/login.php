<?php
mysql_connect('127.0.0.1','root','root');
mysql_query('use xiong');

$uname = $_POST['uname'];
$password = $_POST['pwd'];

$sql = "select * from user where uname='$uname' and password='$password'";
$result = mysql_query($sql);

//获取结果集的数据
$row = mysql_fetch_assoc($result);

if($row){
    $response = [
        'code' => 200,
        'message' => '登陆成功'
    ];
}else{
    $response = [
        'code' => -1,
        'message' => '用户名或密码错误'
    ];
}

echo json_encode($response);
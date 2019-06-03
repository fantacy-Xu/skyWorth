<?php
mysql_connect('127.0.0.1','root','root');
mysql_query('use xiong');

$uname = $_POST['uname'];
// $password = $_POST['pwd'];

// $sql = "select * from user where uname='$uname' and password='$password'";
$sql = "select * from user where uname='$uname'";

$result = mysql_query($sql);

//获取结果集的数据

$row = mysql_fetch_assoc($result);
if($row > 0){
    $response = [
        'code' => -1,
        'message' => '手机号已存在'
    ];
}else{
    $response = [
        'code' => 200,
        'message' => '注册成功'
    ];
}

echo json_encode($response);
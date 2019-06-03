<?php
mysql_connect('127.0.0.1','root','root');
mysql_query('use xiong');

$uname = $_POST['uname'];
$password = $_POST['pwd'];

$sql = "insert into user (uname,password) values('$uname','$password')";

$result = mysql_query($sql);

//获取结果集的数据

$row = mysql_affected_rows();
if($row > 0){
    $response = [
        'code' => 200,
        'message' => '注册成功'
    ];
}else{
    $response = [
        'code' => -1,
        'message' => '注册失败'
    ];
}

echo json_encode($response);
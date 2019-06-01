<?php
    header('Content-type:text/html;charset=utf-8');
    mysql_connect('localhost','root','root');

    mysql_query('use skyworth');

    $id = $_GET['id'];

    $sql = "select * from goods where id='$id'";

    $results = mysql_query($sql);
    
    $rows = [];

    while($row = mysql_fetch_assoc($results)){
        $rows[] = $row;
    }

    if($rows > 0){
        echo json_encode($rows);
    }

?>
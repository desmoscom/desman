<?php
header('X-Powered-By: Express');
header('Cache-Control: no-cache');
header('Pragma: no-cache');
header('Expires: 0');
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD']=='POST')
{
$req=json_decode(file_get_contents('php://input'),true);
$id=$req['id'];
$isdone=$req['isDone'];
$name=$req['name'];
$state=$req['state'];

/*$txt=file_get_contents('data.txt');
$ar=json_decode($txt);

$newuser=true;

foreach ($ar as $user)
{
if ($user['name']==$name) { $user=$req; $newuser=false; break; }
}

if ($newuser)
{
$ar[$id]=$req;
}*/
//print_r($req);
//file_put_contents('data.txt',json_encode($ar));
echo 'ok';
}
else
{
//echo '{}';
echo '{"5251751b3af4975e3700000e":{"state":{"graph":{"viewport":{"xmin":-10,"ymin":-1.514,"xmax":10,"ymax":1.507},"showLabels":true,"degreeMode":false,"showGrid":true,"polarMode":false,"showAxes":true,"squareAxes":true,"labelXMode":"","labelYMode":""},"expressions":{"list":[{"id":1,"latex":"x","domain":{"min":0,"max":1},"userRequestedGraphing":"default","color":"#C0504D","style":"normal"}]}},"time":"2013-10-06T15:19:48.954Z","lastModified":"2013-10-06T15:19:48.954Z","name":"artem","isDone":false},"52517f813af4975e37000017":{"state":{"graph":{"viewport":{"xmin":-10,"ymin":-6.109,"xmax":10,"ymax":6.109},"showLabels":true,"degreeMode":false,"showGrid":true,"polarMode":false,"showAxes":true,"squareAxes":true,"labelXMode":"","labelYMode":""},"expressions":{"list":[{"id":1,"latex":"","domain":{"min":0,"max":1},"userRequestedGraphing":"default","color":"#C0504D","style":"normal"}]}},"time":"2013-10-06T15:19:31.292Z","lastModified":"2013-10-06T15:19:31.292Z","name":"artem","isDone":false}}';
//echo file_get_contents('data.txt');
}
?>
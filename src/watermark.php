<?php
// ���� � �����
//����� ������� ���� ��� �������� ��� ������� �������� �� php
//$_SERVER['DOCUMENT_ROOT'] = '/home/tu1.ru/e/eb/eblackboard/htdocs/www/';
$path = $_SERVER['DOCUMENT_ROOT'].$_SERVER['REQUEST_URI'];
$path_watermark = $_SERVER['DOCUMENT_ROOT'].$_SERVER['REQUEST_URI'];

// �������� ��������
$image = imagecreatefromstring(file_get_contents($path));
$w = imagesx($image);
$h = imagesy($image);

// �������� ����� watermark
$watermark = imagecreatefrompng(file_get_contents($path_watermark));
$ww = imagesx($watermark);
$wh = imagesy($watermark);

// -- ������� �� js �� ����� "150"
if( ($w > 150) & ($h > 150) ) {
    imagecopy($image, $watermark, $w-$ww, $h-$wh, 0, 0, $ww, $wh);
}

// ����� ��������
header('Content-type: image/jpeg');

imagejpeg($image,null,95);
exit();
?>

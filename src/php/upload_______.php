<?php

  header('Content-Type: application/json');

  use PHPImageWorkshop\ImageWorkshop;
  require_once('PHPImageWorkshop/ImageWorkshop.php');


  $path = 'uploads/';
  $file = '';
  $validTypes = array('image/gif', 'image/png', 'image/jpeg', 'image/jpg');
  $blackList = array(".php", ".phtml", ".php3", ".php4");
  $maxSize = 10 * 1024 * 1024; // 10mb
  $minWidth = 650;
  $minHeight = 550;


  if ($_SERVER['REQUEST_METHOD'] == 'POST') {


    if (isset($_FILES['picture'])) {
      $file = $_FILES['picture'];
    }
    else if (isset($_FILES['watermark'])) {
      $file = $_FILES['watermark'];
    }


    if ($file['error'] > 0) {
      die(json_encode(array('status' => 'error', 'message' => 'Ошибка, попробуйте ещё раз')));
    }


    // Проверяем тип файла
    if (!in_array($file['type'], $validTypes))
      die(json_encode(array('status' => 'error', 'message' => 'Запрещённый тип файла')));


    // проверяем на скрипты
    foreach ($blackList as $item) {
      if (preg_match("/$item\$/i", $file['name'])) {
        die(json_encode(array('status' => 'error', 'message' => 'Запрещено загружать скрипты')));
      }
    }


    // Проверяем размер файла
    if ($file['size'] > $maxSize)
      die(json_encode(array('status' => 'error', 'message' => 'Слишком большой размер файла')));



    $newFileName = time().'-'.strtolower($file['name']);

    if (move_uploaded_file($file['tmp_name'], $newFileName)) {

      echo 'WOW!';
      //echo json_encode(array('status' => 'success', 'url' => 'php/'.$path.$newFileName, 'width' => $width, 'height' => $height));


    }
    else {
      die(json_encode(array('status' => 'error', 'message' => 'Ошибка, попробуйте ещё раз')));
    }


    //$processImage = WideImage::load($file['tmp_name']);
    $processImage = ImageWorkshop::initFromPath($newFileName);

    

    //$resizedImage = $processImage->resize($minWidth, $minHeight, 'inside', 'down');
    //$resizedImage->saveToFile($path.$newFileName);

    //$width = $resizedImage->getWidth();
    //$height = $resizedImage->getHeight();


    
    
  }

?>
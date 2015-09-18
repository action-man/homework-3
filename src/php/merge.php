<?php

  include 'wideimage/WideImage.php';
  include '../../vendor/autoload.php';
  use PHPImageWorkshop\ImageWorkshop;


  $imageURL = $_POST['main-image-file'];
  $watermarkURL = $_POST['watermark-file'];
  $positionX = $_POST['x'];
  $positionY = $_POST['y'];
  $opacity = $_POST['opacity'] * 100;



  $image = ImageWorkshop::initFromPath($imageURL);
  $watermark = ImageWorkshop::initFromPath($watermarkURL);

  $watermark->opacity($opacity);

  $image->addLayer(1, $watermark, $positionX, $positionY, "LT");
  $image->save(__DIR__, 'result.jpg', true, null, 95);



  file_force_download(__DIR__.'/result.jpg');
  exit;


  function file_force_download($result) {
    if (file_exists($result)) {
      /*if (ob_get_level()) {
        ob_end_clean();
      }*/
 
      //header('Content-Description: File Transfer');
      //header('Content-Type: application/octet-stream');
      header('Content-Disposition: attachment; filename=' . basename($result));
      //header('Content-Transfer-Encoding: binary');
      header('Expires: 0');
      header('Cache-Control: must-revalidate');
      //header('Pragma: public');
      //header('Content-Length: ' . filesize($result));

      readfile($result);
      exit;
    }
  }


?>
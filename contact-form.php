<?php
$to = 'cooperation@artlavrik.com';
$desired = '';

$name  = substr( $_POST['name'], 0, 64 );
$email   = substr( $_POST['email'], 0, 64 );
$message = substr( $_POST['message'], 0, 250 );

if ( !empty( $_FILES['file']['tmp_name'] ) and $_FILES['file']['error'] == 0 ) {
	$filepath = $_FILES['file']['tmp_name'];
	$filename = $_FILES['file']['name'];
} else {
	$filepath = '';
	$filename = '';
}

$body = "Name:\r\n".$name."\r\n\r\n";
$body .= "E-mail:\r\n".$email."\r\n\r\n";
$body .= "About project:\r\n".$message."\r\n\r\n";

if($formName == 'contact-us' ) {
	$formName = 'Форма Contact Us Artlavrik.com';
	if ( !empty( $_POST['NativeApp'] ) ) {
		$desired  .= "Native app, ";
	}
	if ( !empty( $_POST['Ecommerce'] ) ) {
		$desired  .= "Ecommerce, ";
	}
	if ( !empty( $_POST['Design'] ) ) {
		$desired  .= "Design System, ";
	}
	if ( !empty( $_POST['SAAS'] ) ) {
		$desired  .= "SAAS, ";
	}
	if ( !empty( $_POST['Fintech'] ) ) {
		$desired  .= "Fintech, ";
	}
	if ( !empty( $_POST['Crypto'] ) ) {
		$desired  .= "Crypto, ";
	}
	if ( !empty( $_POST['Other'] ) ) {
		$desired  .= "Other ";
	}
	$body .= "Desired category:\r\n".$desired;
}

if($formName == 'join-team' ) {
	$formName = 'Форма Join Us Artlavrik.com';
	if ( !empty( $_POST['ui-design'] ) ) {
		$desired  .= "ui-design, ";
	}
	if ( !empty( $_POST['ux-design'] ) ) {
		$desired  .= "ux-design, ";
	}
	if ( !empty( $_POST['managment'] ) ) {
		$desired  .= "managment, ";
	}
	if ( !empty( $_POST['sales'] ) ) {
		$desired  .= "sales, ";
	}
	if ( !empty( $_POST['code'] ) ) {
		$desired  .= "code, ";
	}
	if ( !empty( $_POST['testing'] ) ) {
		$desired  .= "testing, ";
	}
	if ( !empty( $_POST['other'] ) ) {
		$desired  .= "other ";
	}
	$body .= "Join category:\r\n".$desired;
}

send_mail($to, $body, $email, $filepath, $filename, $formName);


function send_mail($to, $body, $email, $filepath, $filename, $formName)
{
  $subject = $formName;
  $boundary = "--".md5(uniqid(time()));
  $headers = "From: ".$email."\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .="Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";
  $multipart = "--".$boundary."\r\n";
  $multipart .= "Content-type: text/plain; charset=\"utf-8\"\r\n";
  $multipart .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";

  $body = $body."\r\n\r\n";

  $multipart .= $body;

  $file = '';
  if ( !empty( $filepath ) ) {
    $fp = fopen($filepath, "r");
    if ( $fp ) {
      $content = fread($fp, filesize($filepath));
      fclose($fp);
      $file .= "--".$boundary."\r\n";
      $file .= "Content-Type: application/octet-stream\r\n";
      $file .= "Content-Transfer-Encoding: base64\r\n";
      $file .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
      $file .= chunk_split(base64_encode($content))."\r\n";
    }
  }
  $multipart .= $file."--".$boundary."--\r\n";
  mail($to, $subject, $multipart, $headers);
}

?>
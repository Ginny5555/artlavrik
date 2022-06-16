<?php
$to = 'cooperation@artlavrik.com';
$desired = '';
if ( !empty( $_POST['NativeApp'] ) ) {
	$desired  .= "Native app ";
}
if ( !empty( $_POST['Ecommerce'] ) ) {
	$desired  .= "Ecommerce ";
}
if ( !empty( $_POST['Design'] ) ) {
	$desired  .= "Design System ";
}
if ( !empty( $_POST['SAAS'] ) ) {
	$desired  .= "SAAS ";
}
if ( !empty( $_POST['Fintech'] ) ) {
	$desired  .= "Fintech ";
}
if ( !empty( $_POST['Crypto'] ) ) {
	$desired  .= "Crypto ";
}
if ( !empty( $_POST['Other'] ) ) {
	$desired  .= "Other ";
}

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

$body = "Имя:\r\n".$name."\r\n\r\n";
$body .= "E-mail:\r\n".$email."\r\n\r\n";
$body .= "About project:\r\n".$message."\r\n\r\n";
$body .= "Desired category:\r\n".$desired;

mail($to, $body, $email, $filepath, $filename);

?>
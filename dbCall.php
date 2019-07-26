<?php
header('Access-Control-Allow-Origin: *');

function sendMessage($message, $status) {
	$messageData = (object) [
		'message' => $message,
		'status' => $status
	];
	return print_r(json_encode($messageData));
}

$_POST = json_decode(file_get_contents('php://input'), true);

// $servername = "logikonemp2019.mysql.db";
// $username = "logikonemp2019";
// $password = "6xeWNez33Eor8Ay5TjEL";
// $dbmane = "logikonemp2019";

$servername = "localhost";
$username = "root";
$password = "root";
$dbmane = "service";

$conn = new mysqli($servername, $username, $password, $dbmane);
$conn->set_charset("utf8");

if (isset($_POST["checkSession"])) {
	$sessionId = $_POST['session_id'];
	$userId = $_POST['user_id'];
	$profile = $_POST['profile'];
	$sql = "SELECT * FROM SESSIONS WHERE user_id = $userId AND session_id = '$sessionId' AND profile = '$profile'";
	$result = $conn->query($sql);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	if(sizeof($outLista) != 0) {
		sendMessage('Sesja ok', 1);
		return;
	} else {
		sendMessage('Brak sesji', 0);
	}
}

if (isset($_POST["register"])) {
	$login = $_POST['login'];
	$password = md5($_POST['password']);
	$email = $_POST['email'];
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$company = $_POST['company'];
	$address = $_POST['address'];
	$tel = $_POST['tel'];

	$sql = "SELECT * from USER where login = '$login';";
	$result = $conn->query($sql);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	if(sizeof($outLista) != 0) {
		sendMessage('Podany użytkownik juz istnieje', 0);
		return;
	}
	
	$sql2 = "INSERT INTO USER (login, password, email, firstname, lastname, company, address, tel) VALUES ('$login', '$password', '$email', '$firstname', '$lastname', '$company', '$address', '$tel');";
	$result2 = $conn->query($sql2);
	sendMessage('Użytkownik zarejestrowany', 1);
}

if (isset($_POST["loginToApp"])) {
	$login = $_POST['login'];
	$password = md5($_POST['password']);
	$sessionId = $_POST['session_id'];

	$sql = "SELECT * from USER where login = '$login' && password = '$password';";
	$result = $conn->query($sql);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	if(sizeof($outLista) == 0) {
		sendMessage('Błędne hasło lub użytkownik nie istnieje', 0);
	} else {
		$profile = $outLista[0]['profile'];
		$sessionSql = "INSERT INTO SESSIONS (user_id, session_id, profile) VALUES (".$outLista[0]['id'].", '$sessionId', '$profile')";
		$sessionResult = $conn->query($sessionSql);
		if($sessionResult) {
			$loginToAppInfo = (object) [
				'login' => $outLista[0]['login'],
				'firstname' => $outLista[0]['firstname'],
				'lastname' => $outLista[0]['lastname'],
				'profile' => $outLista[0]['profile'],
				'id' => $outLista[0]['id'],
				'email' => $outLista[0]['email'],
				'session_id' => $sessionId,
				'status' => 1
			];
			print_r(json_encode($loginToAppInfo));
		} else {
			sendMessage('Błąd', 0);
		}
	}
}

if ($_GET['action'] == 'getProducts') {
	$id = $_GET['id'];
	$sql = "SELECT * FROM PRODUCTS";
	$result = $conn->query($sql);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	print_r(json_encode($outLista));	
}

if (isset($_POST["addUserProduct"])) {
	$userId = $_POST['userId'];
	$productId = $_POST['productId'];
	$orderDate = $_POST['orderDate'];
	$vin = $_POST['vin'];
	$wariancy = $_POST['wariancy'];
	$sql = "INSERT INTO USER_PRODUCTS (product_id, user_id, vin, order_date, status, wariancy) VALUES ('$productId', $userId, $vin, '$orderDate', 0, '$wariancy')";
	$result = $conn->query($sql);
	if($result) {
		sendMessage('Dodano produkt', 1);
	} else {
		sendMessage('Wystąpił błąd', 0);
	}
}

if ($_GET['action'] == 'getUserProducts') {
	$userId = $_GET['userId'];
	$sql = "SELECT a.*, b.name, b.properties FROM USER_PRODUCTS a, PRODUCTS b WHERE a.user_id = $userId AND a.product_id = b.id ORDER BY id";
	$result = $conn->query($sql);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	print_r(json_encode($outLista));	
}

if (isset($_POST["setStatusService"])) {
	$id = $_POST['id'];
	$userId = $_POST['userId'];
	$type = $_POST['type'];
	$status = $_POST['status'];
	$date = $_POST['date'];

	$select = "SELECT * FROM SERVICE WHERE product_id = $productId AND user_id = $userId AND status = 1 AND type = '$type';";
	$result = $conn->query($select);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	if(sizeof($outLista) == 0) {
		$update = 'UPDATE USER_PRODUCTS SET status_reqular_fix = 1 WHERE id = '.$id.';';
		$resultUpdate = $conn->query($update);
		$sql = "INSERT INTO SERVICE (product_id, user_id, type, status, date) VALUES ($id, $userId, '$type', $status, '$date')";
		$result2 = $conn->query($sql);
		if($result2) {
			$user = "SELECT email FROM USER WHERE id = $userId";
			$ruser = $conn->query($user);
			$outLista = [];
			while($row = mysqli_fetch_assoc($ruser)) {
				array_push($outLista,$row);
			}

			$email_from = "serwis@logikon.eu";
			$email_to = "patzaw1992@gmail.com";
			$email_subject = "Serwis";
			
			$userMail = $outLista[0]['email'];
			$wiadomosc = "Zgłoszono serwis";
		
			function clean_string( $string ) {
				$bad = array( "content-type", "bcc:", "to:", "cc:", "href" );
				return str_replace( $bad, "", $string );
			}
		
			$data =  json_decode($valuses, true);
		
			$email_message = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/strict.dtd"><html><head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/> <title>Wiadomość</title> <style>@media only screen and (max-width: 300px){body{width: 218px !important; margin: auto !important;}thead, tbody{width: 100%}.table{width: 195px !important; margin: auto !important;}.logo, .titleblock, .linkbelow, .box, .footer, .space_footer{width: auto !important; display: block !important;}span.title{font-size: 20px !important; line-height: 23px !important}span.subtitle{font-size: 14px !important; line-height: 18px !important; padding-top: 10px !important; display: block !important;}td.box p{font-size: 12px !important; font-weight: bold !important;}.table-recap table, .table-recap thead, .table-recap tbody, .table-recap th, .table-recap td, .table-recap tr{display: block !important;}.table-recap{width: 200px!important;}.table-recap tr td, .conf_body td{text-align: center !important;}.address{display: block !important; margin-bottom: 10px !important;}.space_address{display: none !important;}}@media only screen and (min-width: 301px) and (max-width: 500px){body{width: 425px!important; margin: auto!important;}thead, tbody{width: 100%}.table{margin: auto!important;}.logo, .titleblock, .linkbelow, .box, .footer, .space_footer{width: auto!important; display: block!important;}.table-recap{width: 295px !important;}.table-recap tr td, .conf_body td{text-align: center !important;}.table-recap tr th{font-size: 10px !important}}@media only screen and (min-width: 501px) and (max-width: 768px){body{width: 478px!important; margin: auto!important;}thead, tbody{width: 100%}.table{margin: auto!important;}.logo, .titleblock, .linkbelow, .box, .footer, .space_footer{width: auto!important; display: block!important;}}@media only screen and (max-device-width: 480px){body{width: 340px!important; margin: auto!important;}thead, tbody{width: 100%}.table{margin: auto!important;}.logo, .titleblock, .linkbelow, .box, .footer, .space_footer{width: auto!important; display: block!important;}.table-recap{width: 295px!important;}.table-recap tr td, .conf_body td{text-align: center!important;}.address{display: block !important; margin-bottom: 10px !important;}.space_address{display: none !important;}}</style></head><body style="-webkit-text-size-adjust:none;background-color:#fff;width:650px;font-family:Open-sans, sans-serif;color:#555454;font-size:13px;line-height:18px;margin:auto"> <table class="table table-mail" style="width:100%;margin-top:10px;-moz-box-shadow:0 0 5px #afafaf;-webkit-box-shadow:0 0 5px #afafaf;-o-box-shadow:0 0 5px #afafaf;box-shadow:0 0 5px #afafaf;filter:progid:DXImageTransform.Microsoft.Shadow(color=#afafaf,Direction=134,Strength=5)"> <tr> <td class="space" style="width:20px;padding:7px 0">&nbsp;</td><td align="center" style="padding:7px 0"> <table class="table" bgcolor="#ffffff" style="width:100%"> <tr> <td align="center" class="titleblock" style="padding:7px 0"> <font size="2" face="Open-sans, sans-serif" color="#555454"> <span class="title" style="font-weight:500;font-size:28px;text-transform:uppercase;line-height:33px">Wiadomość</span> <br/> </font> </td></tr><tr> <td class="space_footer" style="padding:0!important">&nbsp;</td></tr><tr> <td class="box" style="border:1px solid #D6D4D4;background-color:#f8f8f8;padding:7px 0"> <table class="table" style="width:100%"> <tr> <td width="10" style="padding:7px 0">&nbsp;</td><td style="padding:7px 0"> <font size="2" face="Open-sans, sans-serif" color="#555454"> <p data-html-only="1" style="border-bottom:1px solid #D6D4D4;margin:3px 0 7px;text-transform:uppercase;font-weight:500;font-size:18px;padding-bottom:10px"> Treść wiadomości: </p><table>';
			$email_message .='<tr><td style="font-weight: 600; padding-right: 20px;">Email:</td><td>'.$userMail.'</td></tr>';
			$email_message .='<tr><td style="font-weight: 600; padding-right: 20px;">Wiadomość:</td><td>'.$wiadomosc.'</td></tr>';
			$email_message .='</table></font> </td><td width="10" style="padding:7px 0">&nbsp;</td></tr></table> </td></tr></table> </td><td class="space" style="width:20px;padding:7px 0">&nbsp;</td></tr></table></body></html>';
		
			$headers = 'From: ' . $email_from . "\r\n" .
			'Reply-To: ' . $email . "\r\n" .
			'X-Mailer: PHP/' . phpversion();
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
			@mail( $email_to, $email_subject, $email_message, $headers );
			
			sendMessage('Status zmieniony', 1);

		} else {
			sendMessage('Coś poszło nie tak', 0);
		}
	} else {
		sendMessage('Zgłoszenie już istnieje', 0);
	}
}

if (isset($_POST["changeServiceStatus"])) {
	$id = $_POST['id'];
	$userId = $_POST['userId'];
	$type = $_POST['type'];
	$status = $_POST['status'];

	$select = "SELECT * FROM SERVICE WHERE product_id = $productId AND user_id = $userId AND status = 0 AND type = '$type';";
	$result = $conn->query($select);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	if(sizeof($outLista) == 0) {
		$update = 'UPDATE USER_PRODUCTS SET status_reqular_fix = 0 WHERE id = '.$id.';';
		$resultUpdate = $conn->query($update);
		$sql = "UPDATE SERVICE SET status = 0 WHERE product_id = $id AND user_id = $userId AND type = '$type';";
		$result2 = $conn->query($sql);
		if($result2) {
			sendMessage('Zmieniono status', 1);
		} else {
			sendMessage('Coś poszło nie tak', 0);
		}
	} else {
		sendMessage('Serwis skończony', 0);
	}
}

if (isset($_POST["changeReportStatus"])) {
	$id = $_POST['id'];
	$userId = $_POST['userId'];
	$type = $_POST['type'];
	$status = $_POST['status'];

	$select = "SELECT * FROM SERVICE WHERE product_id = $productId AND user_id = $userId AND status = 0 AND type = '$type';";
	$result = $conn->query($select);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	if(sizeof($outLista) == 0) {
		$update = 'UPDATE USER_PRODUCTS SET status = 0 WHERE id = '.$id.';';
		$resultUpdate = $conn->query($update);
		$sql = "UPDATE SERVICE SET status = 0 WHERE product_id = $id AND user_id = $userId AND type = '$type';";
		$result2 = $conn->query($sql);
		if($result2) {
			sendMessage('Zmieniono status', 1);
		} else {
			sendMessage('Coś poszło nie tak', 0);
		}
	} else {
		sendMessage('Naprawiono usterkę wcześniej', 0);
	}
}

if (isset($_POST["saveErrorData"])) {
	$productId = $_POST['productId'];
	$userId = $_POST['userId'];
	$type = $_POST['type'];
	$title = $_POST['title'];
	$description = $_POST['description'];
	$file = $_POST['file'];
	$date = $_POST['date'];

	$select = "SELECT * FROM SERVICE WHERE product_id = $productId AND user_id = $userId AND status = 1 AND type = '$type';";
	$result = $conn->query($select);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	if(sizeof($outLista) == 0) {
		$update = 'UPDATE USER_PRODUCTS SET status = 1 WHERE id = '.$productId.';';
		$resultUpdate = $conn->query($update);
		$sql = '';
		if($file) {
			$sql = "INSERT INTO SERVICE (product_id, user_id, title, description, type, status, image, date) VALUES ($productId, $userId, '$title', '$description', '$type', 1, '$file', '$date')";
		} else {
			$sql = "INSERT INTO SERVICE (product_id, user_id, title, description, type, status, date) VALUES ($productId, $userId, '$title', '$description', '$type', 1, '$date')";
		}
		$result2 = $conn->query($sql);
		if($result2) {
			$user = "SELECT email, login, company, tel, address FROM USER WHERE id = $userId";
			$ruser = $conn->query($user);
			$outLista = [];
			while($row = mysqli_fetch_assoc($ruser)) {
				array_push($outLista,$row);
			}

			$email_from = "serwis@logikon.eu";
			$email_to = "patzaw1992@gmail.com";
			$email_subject = "Serwis";
			
			$userMail = $outLista[0]['email'];
			$login = $outLista[0]['login'];
			$company = $outLista[0]['company'];
			$tel = $outLista[0]['tel'];
			$wiadomosc = "Zgłoszono usterkę";
		
			function clean_string( $string ) {
				$bad = array( "content-type", "bcc:", "to:", "cc:", "href" );
				return str_replace( $bad, "", $string );
			}
		
			$data =  json_decode($valuses, true);
		
			$email_message = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/strict.dtd"><html><head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/> <title>Wiadomość</title> <style>@media only screen and (max-width: 300px){body{width: 218px !important; margin: auto !important;}thead, tbody{width: 100%}.table{width: 195px !important; margin: auto !important;}.logo, .titleblock, .linkbelow, .box, .footer, .space_footer{width: auto !important; display: block !important;}span.title{font-size: 20px !important; line-height: 23px !important}span.subtitle{font-size: 14px !important; line-height: 18px !important; padding-top: 10px !important; display: block !important;}td.box p{font-size: 12px !important; font-weight: bold !important;}.table-recap table, .table-recap thead, .table-recap tbody, .table-recap th, .table-recap td, .table-recap tr{display: block !important;}.table-recap{width: 200px!important;}.table-recap tr td, .conf_body td{text-align: center !important;}.address{display: block !important; margin-bottom: 10px !important;}.space_address{display: none !important;}}@media only screen and (min-width: 301px) and (max-width: 500px){body{width: 425px!important; margin: auto!important;}thead, tbody{width: 100%}.table{margin: auto!important;}.logo, .titleblock, .linkbelow, .box, .footer, .space_footer{width: auto!important; display: block!important;}.table-recap{width: 295px !important;}.table-recap tr td, .conf_body td{text-align: center !important;}.table-recap tr th{font-size: 10px !important}}@media only screen and (min-width: 501px) and (max-width: 768px){body{width: 478px!important; margin: auto!important;}thead, tbody{width: 100%}.table{margin: auto!important;}.logo, .titleblock, .linkbelow, .box, .footer, .space_footer{width: auto!important; display: block!important;}}@media only screen and (max-device-width: 480px){body{width: 340px!important; margin: auto!important;}thead, tbody{width: 100%}.table{margin: auto!important;}.logo, .titleblock, .linkbelow, .box, .footer, .space_footer{width: auto!important; display: block!important;}.table-recap{width: 295px!important;}.table-recap tr td, .conf_body td{text-align: center!important;}.address{display: block !important; margin-bottom: 10px !important;}.space_address{display: none !important;}}</style></head><body style="-webkit-text-size-adjust:none;background-color:#fff;width:650px;font-family:Open-sans, sans-serif;color:#555454;font-size:13px;line-height:18px;margin:auto"> <table class="table table-mail" style="width:100%;margin-top:10px;-moz-box-shadow:0 0 5px #afafaf;-webkit-box-shadow:0 0 5px #afafaf;-o-box-shadow:0 0 5px #afafaf;box-shadow:0 0 5px #afafaf;filter:progid:DXImageTransform.Microsoft.Shadow(color=#afafaf,Direction=134,Strength=5)"> <tr> <td class="space" style="width:20px;padding:7px 0">&nbsp;</td><td align="center" style="padding:7px 0"> <table class="table" bgcolor="#ffffff" style="width:100%"> <tr> <td align="center" class="titleblock" style="padding:7px 0"> <font size="2" face="Open-sans, sans-serif" color="#555454"> <span class="title" style="font-weight:500;font-size:28px;text-transform:uppercase;line-height:33px">Wiadomość</span> <br/> </font> </td></tr><tr> <td class="space_footer" style="padding:0!important">&nbsp;</td></tr><tr> <td class="box" style="border:1px solid #D6D4D4;background-color:#f8f8f8;padding:7px 0"> <table class="table" style="width:100%"> <tr> <td width="10" style="padding:7px 0">&nbsp;</td><td style="padding:7px 0"> <font size="2" face="Open-sans, sans-serif" color="#555454"> <p data-html-only="1" style="border-bottom:1px solid #D6D4D4;margin:3px 0 7px;text-transform:uppercase;font-weight:500;font-size:18px;padding-bottom:10px"> Treść wiadomości: </p><table>';
			$email_message .='<tr><td style="font-weight: 600; padding-right: 20px;">Wiadomość:</td><td>'.$wiadomosc.'</td></tr>';
			$email_message .='<tr><td style="font-weight: 600; padding-right: 20px;">Login:</td><td>'.$login.'</td></tr>';
			$email_message .='<tr><td style="font-weight: 600; padding-right: 20px;">Firma:</td><td>'.$company.'</td></tr>';
			$email_message .='<tr><td style="font-weight: 600; padding-right: 20px;">Telefon:</td><td>'.$tel.'</td></tr>';
			$email_message .='<tr><td style="font-weight: 600; padding-right: 20px;">Email:</td><td>'.$userMail.'</td></tr>';
			$email_message .='<tr><td style="font-weight: 600; padding-right: 20px;">Opis:</td><td>'.$description.'</td></tr>';
			$email_message .='</table></font> </td><td width="10" style="padding:7px 0">&nbsp;</td></tr></table> </td></tr></table> </td><td class="space" style="width:20px;padding:7px 0">&nbsp;</td></tr></table></body></html>';
		
			$headers = 'From: ' . $email_from . "\r\n" .
			'Reply-To: ' . $email . "\r\n" .
			'X-Mailer: PHP/' . phpversion();
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
			@mail( $email_to, $email_subject, $email_message, $headers );

			sendMessage('Dodano zgłoszenie', 1);
		} else {
			sendMessage('Coś poszło nie tak', 0);
		}
	} else {
		sendMessage('Zgłoszenie już istnieje', 0);
	}
}

if (isset($_POST["checkReportstatus"])) {
	$productId = $_POST['productId'];
	$userId = $_POST['userId'];
	$type = $_POST['type'];

	$select = "SELECT * FROM SERVICE WHERE product_id = $productId AND user_id = $userId AND status = 1 AND type = '$type';";
	$result = $conn->query($select);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	if(sizeof($outLista) == 0) {
		sendMessage('Zgłoszenie nie istnieje', 1);
	} else {
		sendMessage('Zgłoszenie już istnieje', 0);
	}
}

if ($_GET['action'] == 'getProductHistory') {
	$productId = $_GET['productId'];
	$userId = $_GET['userId'];
	$sql = "SELECT * FROM SERVICE WHERE product_id = $productId AND user_id = $userId ORDER BY id DESC";
	$result = $conn->query($sql);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	print_r(json_encode($outLista));	
}

if ($_GET['action'] == 'getUserProduct') {
	$productId = $_GET['productId'];
	$sql = "SELECT a.*, b.name, b.properties FROM USER_PRODUCTS a, PRODUCTS b WHERE a.id = $productId and a.product_id = b.id";
	$result = $conn->query($sql);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	print_r(json_encode($outLista));	
}

if ($_GET['action'] == 'getUsers') {
	$sql = "SELECT id, login, firstname, lastname, email, tel, company, address FROM USER WHERE profile = 'client'";
	$result = $conn->query($sql);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	print_r(json_encode($outLista));	
}

if ($_GET['action'] == 'getOrders') {
	$sql = "SELECT a.*, b.firstname, b.lastname, b.company, b.email, b.tel, b.address, b.login, b.id as 'user_id', c.vin, c.product_id as 'prod', c.order_date as 'order_date', c.wariancy as 'wariancy', d.name FROM SERVICE a LEFT JOIN USER b on a.user_id = b.id LEFT JOIN USER_PRODUCTS c on a.product_id = c.id LEFT JOIN PRODUCTS d on c.product_id = d.id WHERE a.status = 1";
	$result = $conn->query($sql);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	print_r(json_encode($outLista));	
}

if ($_GET['action'] == 'getOrder') {
	$id = $_GET['id'];
	$sql = "SELECT a.*, b.firstname, b.lastname, b.company, b.email, b.tel, b.address, b.login, b.id as 'user_id', c.vin, c.product_id as 'prod', c.order_date as 'order_date', c.wariancy as 'wariancy', d.name FROM SERVICE a LEFT JOIN USER b on a.user_id = b.id LEFT JOIN USER_PRODUCTS c on a.product_id = c.id LEFT JOIN PRODUCTS d on c.product_id = d.id WHERE a.id = $id";
	$result = $conn->query($sql);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	print_r(json_encode($outLista));
}

if (isset($_POST["changeStatus"])) {
	$id = $_POST['id'];
	$productId = $_POST['productId'];
	$userId = $_POST['userId'];
	$type = $_POST['type'];
	$statusType = $_POST['statusType'];

	$select = "SELECT * FROM SERVICE WHERE id = $id AND user_id = $userId AND status = 0 AND type = '$type';";
	$result = $conn->query($select);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	if(sizeof($outLista) == 0) {
		$update = "UPDATE USER_PRODUCTS SET $statusType = 0 WHERE id = $productId;";
		$resultUpdate = $conn->query($update);
		$sql = "UPDATE SERVICE SET status = 0 WHERE id = $id AND type = '$type';";
		$result2 = $conn->query($sql);
		if($result2) {
			sendMessage('Zmieniono status', 1);
		} else {
			sendMessage('Coś poszło nie tak', 0);
		}
	} else {
		sendMessage('Zgłoszenie zamknięte', 0);
	}
}

if (isset($_POST["addProduct"])) {
	$name = $_POST['name'];
	$file = $_POST['file'];
	$props = $_POST['props'];
	$sql = "INSERT INTO PRODUCTS (name, properties, image) VALUES ('$name', '$props', '$file')";
	$result = $conn->query($sql);
	if($result) {
		sendMessage('Dodano produkt', 1);
	} else {
		sendMessage('Wystąpił błąd', 0);
	}
}

if ($_GET['action'] == 'getProduct') {
	$productId = $_GET['id'];
	$sql = "SELECT * FROM PRODUCTS WHERE id = $productId";
	$result = $conn->query($sql);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}
	print_r(json_encode($outLista));	
}

if (isset($_POST["updateProduct"])) {
	$id = $_POST['id'];
	$name = $_POST['name'];
	$file = $_POST['file'];
	$props = $_POST['props'];
	$sql = "UPDATE PRODUCTS SET name = '$name', image = '$file', properties = '$props' WHERE id = $id";
	$result = $conn->query($sql);
	if($result) {
		sendMessage('Edycja udana', 1);
	} else {
		sendMessage('Wystąpił błąd', 0);
	}
}

if (isset($_POST["removeUser"])) {
	$id = $_POST['id'];

	$sql = "DELETE FROM SERVICE WHERE user_id = $id";
	$result = $conn->query($sql);
	$sql2 = "DELETE FROM USER WHERE id = $id";
	$result2 = $conn->query($sql2);
	if($result2) {
		sendMessage('Użytkownik usunięty', 1);
	} else {
		sendMessage('Wystąpił błąd', 0);
	}
}
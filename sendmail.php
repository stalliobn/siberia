<?php 
	if($_POST['name']=='' || $_POST['phone']=='' || $_POST['email']==''){
?>
	<span<?php if($_POST['name']==''){ echo ' style="color:red;"';} ?>>* Введите Ваше имя:</span>
	<input type="text" name="name" value="<?=$_POST['name']?>"/>
	<span<?php if($_POST['phone']==''){ echo ' style="color:red;"';} ?>>* Телефон:</span>
	<input type="text"  name="phone" value="<?=$_POST['phone']?>"/>
	<span<?php if($_POST['email']==''){ echo ' style="color:red;"';} ?>>* E-mail:</span>
	<input type="email" name="email" value="<?=$_POST['email']?>"/>
	<input type="hidden" name="mailtitle" value="<?=$_POST['mailtitle']?>"/>
	<input type="hidden" name="adminemail" value="<?=$_POST['adminemail']?>"/>
	<input type="submit" class="button" onclick="sendform(); return false;"/>
<?php
	}else{
$to      = $_POST['adminemail'];
$subject = $_POST['mailtitle'];
$message = '
Имя:'.$_POST['name'].'
Телефон:'.$_POST['phone'].'
E-mail:'.$_POST['email'];

$headers = 'From: SiberiaTech<'.$_POST['email'] .'>' . "\r\n" .
    'Reply-To: '.$_POST['email'] . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

?>
<p><?=$_POST['name']?>, Ваша заявка принята!</p>
<p>Спасибо за обращение в нашу компанию!</p>
<?php
	}
?>


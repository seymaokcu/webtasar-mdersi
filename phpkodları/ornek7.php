<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<title>PHP Form Örneği</title>
</head>
<body>
<?php
echo $mesaj;
?>
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
<label for="ad">Adınız:</label>
<input type="text" id="ad" name="kullanici_adi">
<input type="submit" value="Gönder">
</form>
<hr>
<?php
if (isset($_GET["urun"])) { 
$urun_adi = htmlspecialchars($_GET["urun"]);
echo "<p>Şu anda '$urun_adi' adlı ürünü inceliyorsunuz.</p>";
}
?>
</body>
</html>
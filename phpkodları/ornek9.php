<?php
$sunucu = "localhost"; 
$vt_adi = "test_db";
$kullanici = "root"; 
$sifre = ""; 
try {
$db = new PDO("mysql:host=$sunucu;dbname=$vt_adi;charset=utf8", $kullanici, $sifre);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
echo "Veritabanı bağlantısı başarılı! <br><hr>";
$stmt = $db->prepare("INSERT INTO kullanicilar (ad, email) VALUES (:ad, :email)");
$stmt->bindParam(':ad', $ad);
$stmt->bindParam(':email', $email);
echo "<h3>Kullanıcı Listesi</h3>";
$sorgu = $db->query("SELECT * FROM kullanicilar");
while ($satir = $sorgu->fetch(PDO::FETCH_ASSOC)) {
echo "ID: " . $satir['id'] . " - Ad: " . $satir['ad'] . " - Email: " . $satir['email'] . "<br>";
}
} catch (PDOException $e) {
echo "HATA: " . $e->getMessage();
}
$db = null;
?>
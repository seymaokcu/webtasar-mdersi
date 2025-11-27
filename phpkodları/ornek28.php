<?php
try {
$yeni_email = "ali.yeni@veli.com";
$guncellenecek_id = 1; 
$stmt = $db->prepare("UPDATE kullanicilar SET email = :email WHERE id = :id");
$stmt->bindParam(':email', $yeni_email);
$stmt->bindParam(':id', $guncellenecek_id);
$stmt->execute();
echo "ID: $guncellenecek_id olan kullanıcının e-postası güncellendi.<br>";
} catch (PDOException $e) {
echo "Güncelleme Hatası: " . $e->getMessage();
}
?>
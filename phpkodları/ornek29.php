<?php
try {
$silinecek_id = 2; 
$stmt = $db->prepare("DELETE FROM kullanicilar WHERE id = :id");
$stmt->execute([':id' => $silinecek_id]);
$etkilenen_satir_sayisi = $stmt->rowCount();
if ($etkilenen_satir_sayisi > 0) {
echo "ID: $silinecek_id olan kullanıcı başarıyla silindi. (Etkilenen satır:
$etkilenen_satir_sayisi)";
} else {
echo "Silinecek kullanıcı bulunamadı (ID: $silinecek_id).";
}
} catch (PDOException $e) {
echo "Silme Hatası: " . $e->getMessage();
}
?>
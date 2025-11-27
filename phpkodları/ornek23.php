<?php
$gecerlilik_suresi = time() + (60 * 60 * 24); // 1 gün
setcookie("tercih_renk", "mavi", $gecerlilik_suresi);
echo "Tercih edilen renk 'mavi' olarak cookie'ye kaydedildi.<br>";
if (isset($_COOKIE["tercih_renk"])) {
echo "Kaydedilen tercihiniz: " . $_COOKIE["tercih_renk"];
} else {
echo "Renk tercihiniz kayıtlı değil.";
}
?>
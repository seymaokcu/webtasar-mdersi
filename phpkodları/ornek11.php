<?php
$sicaklik = 15;
if ($sicaklik > 10) {
$durum = "Hava ılık.";
} else {
$durum = "Hava soğuk.";
}
echo $durum . "<br>";
$durum_kisa = ($sicaklik > 10) ? "Hava ılık." : "Hava soğuk.";
echo $durum_kisa;
?>
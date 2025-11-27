<?php
$rakamlar = [3, 1, 4, 1, 5, 9, 2];
echo "Eleman sayısı: " . count($rakamlar) . "<br>"; 
if (in_array(5, $rakamlar)) {
echo "Dizide '5' rakamı var.<br>";
}
sort($rakamlar);
print_r($rakamlar); 
echo "<br>";
rsort($rakamlar);
print_r($rakamlar);
echo "<br>";
$kisi = ["ad" => "Ahmet", "yas" => 30];
$anahtarlar = array_keys($kisi);
print_r($anahtarlar); 
?>
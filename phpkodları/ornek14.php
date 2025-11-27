<?php
$ogrenciler = [
[
"ad" => "Ali",
"puanlar" => [80, 90, 85]
],
[
"ad" => "Veli",
"puanlar" => [75, 95, 100]
],
[
"ad" => "Ayşe",
"puanlar" => [90, 90, 90]
]
];
echo $ogrenciler[1]["ad"] . " adlı öğrencinin 2. puanı: " . $ogrenciler[1]["puanlar"][1]; 
echo "<hr><h3>Tüm Öğrenci Notları</h3>";
foreach ($ogrenciler as $ogrenci) {
echo "<b>{$ogrenci['ad']}</b>: ";
foreach ($ogrenci['puanlar'] as $puan) {
echo "$puan ";
}
echo "<br>";
}
?>
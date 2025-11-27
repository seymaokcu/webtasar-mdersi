<?php
$veri_dizisi = [
"id" => 101,
"isim" => "Hızlı ve Öfkeli",
"kategoriler" => ["Aksiyon", "Suç"]
];
$json_metni = json_encode($veri_dizisi, JSON_PRETTY_PRINT); 
echo "<h3>PHP Dizisinden JSON'a:</h3>";
echo "<pre>$json_metni</pre>"; 
$gelen_json = '{ "kullanici": "admin", "sifre_hash": "abc123xyz" }';
$php_nesnesi = json_decode($gelen_json);
$php_dizisi = json_decode($gelen_json, true);
echo "<h3>JSON'dan PHP Nesnesine:</h3>";
echo "Kullanıcı (Nesne): " . $php_nesnesi->kullanici . "<br>"; 
echo "<h3>JSON'dan PHP Dizisine:</h3>";
echo "Kullanıcı (Dizi): " . $php_dizisi["kullanici"] . "<br>"; 
?>
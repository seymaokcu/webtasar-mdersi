<?php
function selamVer() {
echo "Merhaba! <br>";
}
selamVer();
function selamIsimle($isim) {
echo "Merhaba, $isim! <br>";
}
selamIsimle("Ayşe");
selamIsimle("Mehmet");
function topla($sayi1, $sayi2) {
$sonuc = $sayi1 + $sayi2;
return $sonuc; 
}
$toplam = topla(10, 15);
echo "10 + 15 = $toplam";
?>
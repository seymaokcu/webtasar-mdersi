<?php
$sayac = 10;
while ($sayac < 5) {
echo "Bu yazı hiç görünmeyecek.";
$sayac++;
}
echo "<hr>";
do {
echo "Sayaç: $sayac (Koşul yanlış olsa bile 1 kez çalıştı) <br>";
$sayac++;
} while ($sayac < 5); 
?>
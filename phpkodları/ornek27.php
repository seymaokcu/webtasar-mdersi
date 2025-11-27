<?php
class Matematik {
public static $pi = 3.14159;
public static function topla(int $a, int $b): int {
return $a + $b;
}
public static function daireAlan($yaricap) {
return self::$pi * $yaricap * $yaricap;
}
}
echo "5 + 8 = " . Matematik::topla(5, 8) . "<br>";
echo "Pi sayısı: " . Matematik::$pi . "<br>";
echo "Yarıçapı 10 olan dairenin alanı: " . Matematik::daireAlan(10);
?>
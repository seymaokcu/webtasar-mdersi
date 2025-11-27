<?php
$sayilar = [1, 2, 3, 4, 5];
$kareler = array_map(function($n) {
return $n * $n;
}, $sayilar);
print_r($kareler);
echo "<hr>";
$carpma = function(int $a, int $b): int {
return $a * $b;
};
echo $carpma(5, 6); 
?>
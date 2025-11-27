<?php
function karesiniAl($n) {
return $n * $n;
}
$sayilar = [1, 2, 3, 4, 5];
$kareler = array_map("karesiniAl", $sayilar);
print_r($kareler);
?>
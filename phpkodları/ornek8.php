<?php
class Araba {

public $marka;
public $renk;
private $hiz = 0;
public function __construct($marka, $renk) {
$this->marka = $marka; 
$this->renk = $renk;
echo "$this->marka ($this->renk) nesnesi oluşturuldu.<br>";
}
public function hizlan($artis) {
$this->hiz += $artis;
echo "$this->marka hızlandı. Yeni hız: $this->hiz km/s <br>";
}
public function yavasla($azalis) {
$this->hiz -= $azalis;
if ($this->hiz < 0) {
$this->hiz = 0;
}
echo "$this->marka yavaşladı. Yeni hız: $this->hiz km/s <br>";
}
public function mevcutHiz() {
return $this->hiz;
}
}
$araba1 = new Araba("BMW", "Siyah");
$araba2 = new Araba("Mercedes", "Beyaz");
echo "<hr>";
$araba1->hizlan(50);
$araba1->hizlan(20);
$araba1->yavasla(30);
echo "<hr>";
$araba2->hizlan(80);
echo "<hr>";
echo "BMW'nin son hızı: " . $araba1->mevcutHiz() . " km/s <br>";
echo "Mercedes'in son hızı: " . $araba2->mevcutHiz() . " km/s <br>";
?>
<?php
class Hayvan {
public $isim;
protected $ses; 
public function __construct($isim, $ses) {
$this->isim = $isim;
$this->ses = $ses;
}
public function sesCikar() {
echo "$this->isim '$this->ses' diye ses çıkarır.<br>";
}
}
class Kedi extends Hayvan {
public function __construct($isim) {
parent::__construct($isim, "Miyav");
}
public function mirlar() {
echo "$this->isim mırıldıyor...<br>";
}
}
$tekir = new Kedi("Tekir");
$tekir->sesCikar(); 
$tekir->mirlar(); 
?>
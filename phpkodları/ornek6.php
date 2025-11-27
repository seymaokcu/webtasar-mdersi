<?php
$mesaj = ""; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$ad = htmlspecialchars($_POST["kullanici_adi"]);
if (empty($ad)) {
$mesaj = "<p style='color: red;'>Lütfen adınızı giriniz.</p>";
} else {
$mesaj = "<p style='color: green;'>Hoş geldin, $ad!</p>";
}
}
?>
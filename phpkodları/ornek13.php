<?php
echo "<h3>Continue (Çift sayıları atla)</h3>";
for ($i = 1; $i <= 10; $i++) {
if ($i % 2 == 0) { 
continue; 
}
echo "$i <br>";
}
echo "<h3>Break (5'i bulunca dur)</h3>";
for ($i = 1; $i <= 10; $i++) {
if ($i == 5) {
break; 
}
echo "$i <br>";
}
?>
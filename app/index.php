<?php

$filelist = glob("*.html");

$count = 1;

foreach ($filelist as $value) {
	echo "$count) <a href='$value' style='color: #000; font-size: 18px; text-transform: uppercase;' >$value</a>";
	echo "<br><br>";
	$count++;
}


?>
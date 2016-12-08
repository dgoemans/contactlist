<?php
	$name = uniqid("img_");

	$request_body = file_get_contents('php://input');

	$file = fopen("images/$name", "w");

	fwrite($file, $request_body);

	fclose($file);

	echo $name;
?>
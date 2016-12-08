<?php

	include 'db.php';

	$request_body = file_get_contents('php://input');

	$result = json_decode($request_body, true);

	$connection = getDatabaseConnection();

	$sql = "INSERT INTO people (id, image, name, phoneWork, phoneMobile, emailWork, emailPrivate, address, note, favorite) 
			VALUES ('$result[id]', '$result[image]', '$result[name]', '$result[phoneWork]', '$result[phoneMobile]', '$result[emailWork]', '$result[emailPrivate]', '$result[address]', '$result[note]', '$result[favorite]')";

	$response = array();

	if ($connection->query($sql)) 
	{
		$response['result'] = 'success';
	} 
	else 
	{
	    $response['result'] = 'fail';
	    $response['message'] = $connection->error;
	}
	
	echo json_encode($response);

?>
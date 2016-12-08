<?php
	include 'db.php';

	$request_body = file_get_contents('php://input');

	$data = json_decode($request_body, true);

	$connection = getDatabaseConnection();

	$sql = "SELECT * FROM people where id='$data[id]'";

	$result = $connection->query($sql);

	if ($result->num_rows > 0) 
	{
		$sql = "UPDATE people SET 
				name='$data[name]', 
				image='$data[image]',
				phoneWork='$data[phoneWork]', 
				phoneMobile='$data[phoneMobile]', 
				emailWork='$data[emailWork]', 
				emailPrivate='$data[emailPrivate]', 
				address='$data[address]', 
				note='$data[note]',
				favorite='$data[favorite]'
				WHERE id='$data[id]'";
	}
	else 
	{
	    $sql = "INSERT INTO people (id, image, name, phoneWork, phoneMobile, emailWork, emailPrivate, address, note, favorite) 
			VALUES ('$data[id]', '$data[image]', '$data[name]', '$data[phoneWork]', '$data[phoneMobile]', '$data[emailWork]', '$data[emailPrivate]', '$data[address]', '$data[note]', '$data[favorite]')";
	}

	$response = array();

	if ($connection->query($sql)) 
	{
		$response['result'] = 'success';
	} 
	else 
	{
	    $response['result'] = 'fail';
	    $response['message'] = $connection->error;
	    $response['sql'] =  $sql;
	}
	
	echo json_encode($response);
?>
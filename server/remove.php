<?php

	include 'db.php';

	$request_body = file_get_contents('php://input');

	$result = json_decode($request_body, true);

	$connection = getDatabaseConnection();

	$sql = "DELETE FROM people WHERE id='$result[id]'";

	$response = array();

	if ($connection->query($sql)) 
	{
		$response['result'] = 'success';
		$response['removed'] = $result["id"];
	} 
	else 
	{
	    $response['result'] = 'fail';
	    $response['message'] = $connection->error;
		$response['sql'] = $sql;
	}
	
	echo json_encode($response);

?>
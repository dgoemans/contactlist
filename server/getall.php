<?php
	include 'db.php';

	$connection = getDatabaseConnection();

	$sql = "SELECT * FROM people";

	$result = $connection->query($sql);

	$response = array();

	if ($result->num_rows > 0) 
	{
		while($row = $result->fetch_assoc()) 
		{
	        $response[] = $row;
	    }
	}

	echo json_encode($response);
?>
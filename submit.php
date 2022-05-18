<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "laukapui";
 
// Create connection
$conn = new mysqli( $servername, $username, $password, $dbname );
// Check connection
if ( $conn->connect_error ) {
  die( "Connection failed: " . $conn->connect_error );
}

if ( isset( $_POST[ "submit" ] )) {
        $no = $_POST['a']; 
        $holder = $_POST['b']; 
        $month = $_POST['c'];
        $year = $_POST['d']; 
        $cvv = $_POST['e']; // display the results
    } else die( "data insufficient" );
    
    echo $no. '<br>';
    echo $holder. '<br>';
    echo $month.'<br>';
    echo $year.'<br>';
    echo $cvv.'<br>';

    $result = $conn->query( "INSERT INTO `orders` (`cc_no`, `cc_holder`, `cc_month`, `cc_year`, `cc_cvv`) VALUES ('$no', '$holder', '$month', '$year', '$cvv')" );
    
    if ( $result === TRUE ) {
        echo "Record inserted successfully<br>";
      } else {
        echo "Error inserting reocrd" . $conn->error . "<br>";
      }
      $conn->close();

        ?>
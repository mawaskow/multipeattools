<?php
//$mysqli = new mysqli("localhost", "postgres", "", "geo_app");
$mysqli = new mysqli("localhost", "postgres", "", "bog_test");

if($mysqli->connect_error) {
  exit('Could not connect');
}

$sql = "SELECT name, level, class, link FROM geo_pol 
WHERE level = ?";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $_GET['q']);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($name, $lvl, $class, $link);
$stmt->fetch();
$stmt->close();

echo "<p>" . $name . "</p>";
echo "<p>" . $lvl . "</p>";
?>
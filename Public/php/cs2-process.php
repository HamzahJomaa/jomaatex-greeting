<?php
$name = $_POST["cs2Name"];
$email = $_POST["cs2Email"];
 
$EmailTo = "moradxd@gmail.com";
$Subject = "Message from " . $name;
 
// prepare email body text
$Body = "Name: ";
$Body .= $name;
$Body .= "\n";
 
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
   
// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);
 
// redirect to success page
if ($success){
   echo "success";
}else{
    echo "invalid";
}
 
?>
<?php
include_once "config.php";
session_start();

if (isset($_POST['auth'])) { 

    $loginRequest = json_decode($_POST['auth']);
    $response = array();

    $sql = "SELECT * FROM " . TBL_USERS . " WHERE email = '" . $loginRequest->email . "'";
    $results = $connection->query($sql);

    $users = array();

    while ($row = $results->fetch_assoc()) {
        array_push($users, $row);
    }

    $response = createResponse(401, "Log-in Failed", "Account doesn't exist");

    foreach ($users as $user) {

        if (password_verify($loginRequest->password, $user['password'])) {

            if($user['isAdmin'] == 1){
                $response = createResponse(200, "Successful", "Admin Access");
                if (empty($_SESSION['logged-in-user'])) {
                    $_SESSION['logged-in-user'] = $user;
                }
            }

            else{
                $response = createResponse(200, "Successful", "User Access");
                if (empty($_SESSION['logged-in-user'])) {
                    $_SESSION['logged-in-user'] = $user;
                }
            }
        }

        else {
            $response = createResponse(401, "Log-in Failed!", "Username/Password does not match");
        }
    }


    echo json_encode($response);
}



if (isset($_POST['store'])) {
    $registerRequest = json_decode($_POST['store']);
    $response = array();

    if ($registerRequest->password != $registerRequest->confirmPassword) {
        $response = createResponse(401, "Error", "Password does not match");
        
    } else {
        $password = password_hash($registerRequest->password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `createdOn`) VALUES (NULL, '{$registerRequest->fname}', '{$registerRequest->lname}', '{$registerRequest->email}', '{$password}', current_timestamp());";
        
        // $sql = "INSERT INTO `TBL_USERS`(`first_name`, `last_name`, `email`, `password`) 
        // VALUES ('{$registerRequest->fname}','{$registerRequest->lname}','{$registerRequest->email}','{$password}')";

        $isInserted = $connection->query($sql);


        if ($isInserted) {
            $response = createResponse(200, "Successful", "Successfully Saved");
           
            
            
        } else {
            $response = createResponse(300, "Error", "Error while saving user");
        }
    }

    
    echo json_encode($response);
}


if (isset($_POST['sessionCheck'])) {
    
    if (isset($_SESSION['logged-in-user'])) {
        
        $response = array();
        
        $response = createResponse(200, "Successful", "isActive", $_SESSION['logged-in-user']);
        
    }
    else {
        
        $response = array();
        
        $response = createResponse(200, "Successful", "notActive");
    }
    
    echo json_encode($response);
}

if (isset($_POST['logout'])) {
    
    session_destroy();

    $response = array();
    $response = createResponse(200, "Successful", "Successfully Logout");
    
    echo json_encode($response);
}
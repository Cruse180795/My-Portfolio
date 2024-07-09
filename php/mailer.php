<?php

use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

header('Content-Type: application/json');

// Function to sanitize input data
function sanitize_input($data)
{
    return htmlspecialchars(stripslashes(trim($data)));
}

// Validate email address
function validate_email($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Sanitize and validate input data
$name = sanitize_input($_REQUEST['name']);
$email = sanitize_input($_REQUEST['email']);
$subject = sanitize_input($_REQUEST['subject']);
$message = sanitize_input($_REQUEST['message']);

if (empty($name) || strlen($name) < 2 || strlen($name) > 50) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid name']);
    exit;
}

if (!validate_email($email)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address']);
    exit;
}

if (empty($subject) || strlen($subject) < 2 || strlen($subject) > 100) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid subject']);
    exit;
}

if (empty($message) || strlen($message) < 10 || strlen($message) > 2000) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid message']);
    exit;
}

$username = $_ENV['GMAIL_USER'];
$password = $_ENV['GMAIL_PASSWORD'];



$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $username;
    $mail->Password = $password;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Preferred constant over 'ssl'
    $mail->Port = 465;
    $mail->setFrom($email, $name);
    $mail->addAddress($username, 'Recipient Name');
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = nl2br($message); // Converts newlines to <br> tags for HTML email

    $mail->send();
    error_log('Email sent successfully.');
    echo json_encode(['status' => 'success', 'message' => 'Message sent successfully']);
} catch (Exception $e) {
    error_log('Mailer Error: ' . $mail->ErrorInfo);
    echo json_encode(['status' => 'error', 'message' => "Message couldn't be sent. Mailer Error: {$mail->ErrorInfo}"]);
}

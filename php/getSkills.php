<?php

$executionStartTime = microtime(true);

header('Content-Type: application/json'); // Ensure the response is JSON

try {
    $data = json_decode(file_get_contents('./data/skills.json'), true);

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['executedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $data;

    echo json_encode($output);
} catch (Exception $e) {
    echo 'Error' . $e;
}

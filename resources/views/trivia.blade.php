<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trivia</title>
    <link rel="stylesheet" href="css/trivia.css">
</head>
<body>
    <h1>Trivia</h1>
    <p id="question-node"></p>
    <div id="variants-node"></div>
    <p id="score-node"></p>
    <script src="/js/trivia.js"></script>
</body>
</html>

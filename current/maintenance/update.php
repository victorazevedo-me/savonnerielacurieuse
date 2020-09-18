<?php

    function test_input($var) {
        $var = trim($var);
        $var = htmlspecialchars($var);
        return $var;
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST" && test_input($_POST["psw"]) == "cCjuoT2ZPAtPH3m6GRDYqSo8XidianXV") {

        $data = test_input($_POST["data"]);

        $f = fopen("database.json", "w") or die("Unable to open file!");
        fwrite($f, $data);
        fclose($f);

        echo 'Correctement mit à jour !';
    } else {
        echo 'Mot de passe incorrect';
    }
?>
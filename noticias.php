<?php
// Define que a resposta será em formato JSON
header('Content-Type: application/json');

// Sua chave secreta fica protegida aqui no servidor!
$apiKey = 'bb25efcd54937e120bd839a438d2f9c2';

// A URL da API
$url = "https://gnews.io/api/v4/search?q=carros+tendencias&lang=pt&country=br&max=4&apikey=" . $apiKey;

// Busca os dados da API
$resposta = file_get_contents($url);

// Devolve os dados para o seu site
echo $resposta;
?>
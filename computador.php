<?php
session_start();

class Computador {
    public $marca;
    public $ligado = false;
    public $wallpaper = '';

    public $wallpapers = [
        'Positivo' => 'https://i.imgur.com/RMbPU0k.jpeg',
        'Acer' => 'https://images7.alphacoders.com/757/thumb-1920-757517.jpg',
        'Asus' => 'https://wallpapercave.com/wp/wp7414752.jpg',
        'HP' => 'https://c4.wallpaperflare.com/wallpaper/712/945/295/logo-flooring-office-wallpaper-preview.jpg',
        'Lenovo' => 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2bda9881-73c4-4475-9d1a-41321879ce7d/dg5flec-a7cfeb86-5a35-43a0-b367-32bd06bc34cf.png/v1/fill/w_1192,h_670,q_70,strp/lenovo_tech_wallpaper_by_vincemendneck_dg5flec-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mLzJiZGE5ODgxLTczYzQtNDQ3NS05ZDFhLTQxMzIxODc5Y2U3ZC9kZzVmbGVjLWE3Y2ZlYjg2LTVhMzUtNDNhMC1iMzY3LTMyYmQwNmJjMzRjZi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.GgzIkFL2bmmGtRB3m-PXFiUfvrkoU3h7OmqZPPuqJd0',
    ];

    public function __construct($marca) {
        $this->marca = $marca;
        $this->wallpaper = $this->wallpapers[$marca] ?? $this->wallpapers['positivo'];
    }

    public function toggleStatus() {
        if ($this->ligado == false) {
            $this->ligado = true;
        }
        else {
            $this->ligado = false;
        }
    }
}
// Indicate the server will respond with JSON
header('Content-Type: application/json');

// Get the raw POST data from the request body
// This is necessary for fetch() when sending a JSON payload
$json_input = file_get_contents('php://input');

// Decode the JSON data into a PHP associative array [Dict?]
$data = json_decode($json_input, true);

// Initialize a response array
$response = ['success' => false, 'action' => '', 'log' => ['message' => '', 'color' => '']]; #something else //'newText' => ''

// $currentTime = getdate();

if ($data && isset($data['action'])) {
    switch ($data['action']) {
        case 'initializeClass':
            $mainComputer = new Computador($data['brand']);
            $_SESSION['mainComputer'] = serialize($mainComputer);
            // $response['action'] = $data['action'];
            $response['imageUrl'] = $mainComputer->wallpapers[$mainComputer->marca];
            $response['brand'] = $data['brand'];
            // $response['log'] = 'Class Initialized at ';
            $response['success'] = true;
            $response['log']['message'] = 'SUCESSO: Computador iniciado {'. $data['brand'] .'}';
            $response['log']['color'] = 'blue';
            break;
            
        case 'deleteClass':
            if (isset($_SESSION['mainComputer'])) {
                $mainComputer = unserialize($_SESSION['mainComputer']);
                $response['brand'] = $mainComputer->marca;
                unset($_SESSION['mainComputer']);
                $response['success'] = true;
                $response['log']['message'] = 'SUCESSO: Computador deletado';
                $response['log']['color'] = 'blue';
            } else {
                $response['success'] = false;
                $response['log']['message'] = 'ERRO: Impossível deletar computador. (inexistente)';
                $response['log']['color'] = 'crimson fw-bold';
            }
            
            break;
                
        case 'toggleScreen':
            $mainComputer = unserialize($_SESSION['mainComputer']);
            $mainComputer->toggleStatus();
            $_SESSION['mainComputer'] = serialize($mainComputer); // Update session

            // $response['action'] = $data['action'];
            $response['status'] = $mainComputer->ligado;
            $response['log']['message'] = 'Computador '. ($response['status'] ? 'ligado' : 'desligado');
            $response['log']['color'] = ($response['status'] ? 'green' : 'red');
            break;
        
        case 'toggleWallpaper':
            $mainComputer = unserialize($_SESSION['mainComputer']);
            if ($mainComputer->ligado == true) {
                if (!isset($data['imageUrl']) || empty($data['imageUrl'])) {
                    $response['imageUrl'] = $mainComputer->wallpapers[$mainComputer->marca] ?? $mainComputer->wallpaper;
                    $response['log']['message'] = 'Papel de parede padrão. {'. $mainComputer->marca .'}';
                } else {
                    $mainComputer->wallpaper = $data['imageUrl'];
                    $_SESSION['mainComputer'] = serialize($mainComputer);
                    $response['imageUrl'] = $mainComputer->wallpaper;
                    $response['log']['message'] = 'Papel de parede alterado. {'. $data['imageUrl'] .'}';
                }
                $response['status'] = true;
                $response['success'] = true;
            } else {
                $response['imageUrl'] = $mainComputer->wallpaper;
                $response['status'] = false;
                $response['success'] = false;
            }
            $response['log']['color'] = 'yellow';
            break;

        default:
            $response['status'] = false;
            break;
        }
    } else {
        $response['error'] = 'Class not initialized';
    }

    // Encode the PHP associative array as a JSON string and send it back to the client
    // echo json_encode($response);
    $response['action'] = $data['action'];
    echo json_encode($response);
?>
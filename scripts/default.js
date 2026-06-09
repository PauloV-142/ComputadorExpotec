function verifyResponse(response) {
    // Check if the response was successful (status code 200-299)
    if (!response.ok) {
        throw new Error('Resposta do localhost não deu ok.');
    }

    // Parse the JSON response from the server
    return response.json()
}

function showErrorMessage(error) {
    alert('Um erro ocorreu. Veja o console para mais detalhes.');
    log.console({message: 'Erro:' + error, color: 'crimson fw-bold'})
}

const serverUrl = 'computador.php';
const led = document.querySelector('.led');
const txtBrand = document.querySelector('.brand-name');
const txtWallpaper = document.querySelector('.wallpaper-link');
const monitorScreen = document.querySelector('.screen');
const screenContent = monitorScreen.querySelector('.content');
let initiated = false;

let brand = document.querySelector('#brand_selector');
const btnCreateComputer = document.querySelector('#create_computer');
const btnDeleteComputer = document.querySelector('#delete_computer');
const classTitle = document.querySelector('.title');

function toggleComputerClass(action) {
    // Fetch the PHP Server

    const data = {
        action: action,
        brand: brand.value
    };

    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // console.log(response.json());
        return response.json() // verifyResponse(response);
    })
    .then(responseData => {
        // window.alert('Creating your class...' + JSON.stringify(responseData));
        if (responseData.action === 'initializeClass') {
            classTitle.innerHTML = `<h1>${responseData.brand}</h1>`;
            // window.alert(`${responseData.brand} Iniciado!`);
            led.classList.add('red-led');
            initiated = true;
            backgroundImageUrl = responseData.imageUrl;
        } else if (responseData.action === 'deleteClass') {
            if (responseData.success == true) {
                classTitle.innerHTML = '<h1>Computador</h1>';
                // window.alert(`${responseData.brand} Deletado!`);
                monitorScreen.style.backgroundImage = '';
                monitorScreen.classList.remove('power-on');
                monitorScreen.classList.add('power-off');
                screenContent.classList.remove('d-flex');
                screenContent.classList.add('d-none');
                led.classList.remove('green-led');
                led.classList.remove('red-led');
                monitorScreen.classList.remove('power-on');
                screenContent.style.display = 'none';
                initiated = false;
                
            } else {
                window.alert('Computador inexistente!');
            }
        }
        log.console(responseData.log);
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage();
    });

}

btnCreateComputer.addEventListener('click', () => {
    if (typeof initiated !== 'undefined' && initiated) {
        window.alert('Classe já foi iniciada!');
        log.console({'message': 'ERRO: Impossível iniciar classe Computador. (já existente)', 'color': 'crimson fw-bold'});
        return;
    }
    toggleComputerClass('initializeClass');
})

btnDeleteComputer.addEventListener('click', () => {
    toggleComputerClass('deleteClass');
})

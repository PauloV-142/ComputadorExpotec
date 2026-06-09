let backgroundImageUrl = monitorScreen.style.backgroundImage;
let iframe = document.querySelector('iframe');

// const substitutions = {
//     monitorScreen: ['power-off', 'power-on'],
//     led: ['red-led', 'green-led']
// }

function toggleScreen(responseData) {
    if (responseData.status === true){
        // Object.entries(substitutions).map(([e, values])=>{
        //     e.classList.replace(values[0], values[1])
        // })
        monitorScreen.classList.remove('power-off');
        monitorScreen.classList.add('power-on');
        led.classList.remove('red-led');
        led.classList.add('green-led');
        screenContent.classList.remove('d-none');
        screenContent.classList.add('d-flex');

        monitorScreen.style.backgroundImage = `url(${backgroundImageUrl})`;
        monitorScreen.style.backgroundSize = 'cover';
        monitorScreen.style.backgroundPosition = 'center';
    } else {
        monitorScreen.classList.remove('power-on');
        monitorScreen.classList.add('power-off');
        screenContent.classList.remove('d-flex');
        screenContent.classList.add('d-none');
        led.classList.remove('green-led');
        led.classList.add('red-led');
        // console.log('Background Image URL:', backgroundImageUrl);
        monitorScreen.style.backgroundImage = '';
        // screen.classList.add('power-off');
    }
    log.console(responseData.log);
}

led.addEventListener('click', () => {
    if (initiated === true) {
        const data = {
            action: 'toggleScreen',
            state: monitorScreen.classList.contains('power-on') ? 'off' : 'on'
        };

        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json() // verifyResponse(response.json); 
        })
        .then(responseData => {
            if (responseData.action === 'toggleScreen') {
                toggleScreen(responseData);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage(error);
        });
    }
});

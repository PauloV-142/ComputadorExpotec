// POO - toggle wallpaper
// Similar way toggle.js and initialize.js
// This one prompts the user for a link of an image from the internet
document.querySelector('.wallpaper-toggle').addEventListener('click', () => {
    if (initiated === true) {
        const data = {
            action: 'toggleWallpaper',
            imageUrl: prompt("Insira a URL do novo papel de parede:")
        };

        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json(); // verifyResponse(response);
        })
        .then(responseData => {
            if (responseData.action === 'toggleWallpaper') {
                if (responseData.imageUrl) {
                    monitorScreen.style.backgroundImage = `url(${responseData.imageUrl})`;
                    backgroundImageUrl = responseData.imageUrl
                    monitorScreen.style.backgroundSize = 'cover';
                    monitorScreen.style.backgroundPosition = 'center';
                } else {
                    monitorScreen.style.backgroundImage = '';
                }
            }
            if (responseData.imageUrl !== '') {
                // log.console({message: JSON.stringify(responseData), color: 'white'});
                log.console(responseData.log);
                console.log(responseData);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage(error);
        });
    }
});

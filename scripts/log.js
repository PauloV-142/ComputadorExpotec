const logField = document.querySelector(".log");

const log = {
    bottom: () => {
        logField.scroll(0, logField.scrollHeight);
    },
    console: (logData) => {
        // console.log(JSON.stringify(logData))
        logField.innerHTML += `<li><span class='${logData.color}'>${logData.message}</span></li>`;
        log.bottom()
    },
    error: (message) => {
        logField.innerHTML += `<li><span class='white'>${message}</span></li>`;
        log.bottom()
    }        
};
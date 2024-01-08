function addKeyEvent(key, element, callback) {
    element.addEventListener("keyup", (event) => {
        if(event.key === key) {
            callback();
        }
    })
}

function addClickEvent(element, callback) {
    element.addEventListener("click", (event) => {
        callback();
    })
}

function addKeyEvent(element, key, callback) {
    element.addEventListener("keyup", (event) => {
        if(event.key === key) {
            callback();
        }
    });
}

function addClickEvent(element, callback) {
    element.addEventListener("click", (event) => {
        callback();
    });
}

function addDoubleClickEvent(element, callback) {
    element.addEventListener("dblclick", (event) => {
        callback();
    });
}

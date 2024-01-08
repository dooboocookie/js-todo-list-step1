class ToDoElement extends HTMLElement {

    constructor(element) {
        super();
    }

    addKeyEvent(key, callback) {
        this.addEventListener("keyup", (event) => {
            if(event.key === key) {
                callback();
            }
        })
    }

    addClickEvent(callback) {
        this.addEventListener("click", (event) => {
            callback();
        })
    }

    addDoubleClickEvent(callback) {
        this.addEventListener("dblclick", (event) => {
            callback();
        })
    }
}

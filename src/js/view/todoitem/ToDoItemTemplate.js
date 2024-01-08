class ToDoItemTemplate {
    #element;

    constructor(element) {
        this.#element = element;
    }

    addEditStartEvent() {
        addDoubleClickEvent(this.#element, () => {
            if (!this.#element.classList.contains("editing")) {
                this.#element.classList.add("editing");
            }
        })
    }

    toggle() {
        throw "사용할 수 없는 함수입니다.";
    }

    get element() {
        return this.#element;
    }
}

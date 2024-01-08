class ToDoContentEditInput {
    #element;

    constructor(element) {
        this.#element = element;
    }

    static init(content) {
        const toDoContentEditInput = new ElementBuilder("input")
            .addClass("edit")
            .value(content).build();

        return new ToDoContentEditInput(toDoContentEditInput);
    }

    addEditDoneEvent() {
        const parentLi = this.#element.closest("li");
        const label = parentLi.querySelector("label");
        addKeyEvent(this.#element, Key.ENTER, () => {
            parentLi.classList.remove("editing")
            label.innerText = this.#element.value
        });
        addKeyEvent(this.#element, Key.ESC, () => {
            parentLi.classList.remove("editing")
            this.#element.value = label.innerText
        });
    }

    get element() {
        return this.#element;
    }
}

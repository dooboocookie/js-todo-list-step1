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

    addEditDoneEvent(toDoItemTemplate, toDoContent) {
        addKeyEvent(this.#element, Key.ENTER, () => {
            toDoItemTemplate.endEdit();
            toDoContent.edit(this.#element.value);
        });
        addKeyEvent(this.#element, Key.ESC, () => {
            toDoItemTemplate.endEdit();
            this.#element.value = toDoContent.getValue();
        });
    }

    get element() {
        return this.#element;
    }
}

class ToDoContent {
    #element;

    constructor(element) {
        this.#element = element;
    }

    static init(content) {
        const toDoContent = new ElementBuilder("label")
            .innerText(content).build();

        return new ToDoContent(toDoContent);
    }

    get element() {
        return this.#element;
    }
}

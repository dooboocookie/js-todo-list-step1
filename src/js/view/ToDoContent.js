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

    edit(value) {
        console.log(value)
        this.#element.innerText = value;
    }

    getValue() {
        return this.#element.innerText
    }

    get element() {
        return this.#element;
    }
}

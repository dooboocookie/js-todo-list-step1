class CheckBox {
    #element;

    constructor(element) {
        this.#element = element;
    }

    static init() {
        const checkBox = new ElementBuilder("input")
            .addClass("toggle")
            .type("checkbox").build();

        return new CheckBox(checkBox);
    }

    addToggleEvent(toDoItemTemplate) {
        console.log(toDoItemTemplate);
        addClickEvent(this.#element, () => {
            toDoItemTemplate = toDoItemTemplate.toggle();
        })

        addClickEvent(this.#element, () => {
            filterToDoList();
        })
    }

    get element() {
        return this.#element;
    }
}

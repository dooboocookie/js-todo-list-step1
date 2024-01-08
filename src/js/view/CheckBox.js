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

    addToggleEvent() {
        addClickEvent(this.#element, () => {
            const parentLi = this.#element.closest("li");
            if(this.#element.checked) {
                parentLi.classList.add("completed")
            } else {
                parentLi.classList.remove("completed");
            }
        })

        addClickEvent(this.#element, () => {
            filterToDoList();
        })
    }


    get element() {
        return this.#element;
    }
}

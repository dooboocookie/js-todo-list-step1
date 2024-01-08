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
        this.#element.addEventListener("click", (event) => {
            const parentLi = this.#element.closest("li");
            if(this.#element.checked) {
                parentLi.classList.add("completed")
            } else {
                parentLi.classList.remove("completed");
            }
        })

        this.#element.addEventListener("click", (event) => {
            filterToDoList();
        })
    }


    get element() {
        return this.#element;
    }
}

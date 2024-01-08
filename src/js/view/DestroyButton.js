class DestroyButton {
    #element;

    constructor(element) {
        this.#element = element;
    }

    static init(parent) {
        const destroyButton = new ElementBuilder("button")
            .addClass("destroy").build();

        return new DestroyButton(destroyButton);
    }

    addRemoveEvent() {
        addClickEvent(this.#element, () => {
            const parentLi = this.#element.closest("li");
            if(confirm("삭제하시겠습니까?")) {
                parentLi.remove();
            }
        })
    }


    get element() {
        return this.#element;
    }
}

class ElementBuilder {
    #tag;
    #type;
    #id;
    #classList;
    #value;
    #innerText;
    #innerHtml;

    constructor(tag) {
        this.#tag = tag;
        this.#type = null;
        this.#id = null;
        this.#classList = [];
        this.#value = null;
        this.#innerText = null;
        this.#innerHtml = null;
    }

    type(type) {
        this.#type = type;
        return this;
    }

    id(id) {
        this.#id = id;
        return this;
    }

    addClass(className) {
        this.#classList.push(className);
        return this;
    }

    value(value) {
        this.#value = value;
        return this;
    }

    innerText(innerText) {
        this.#innerText = innerText;
        return this;
    }

    innerHtml(innerHtml) {
        this.#innerHtml = innerHtml;
        return this;
    }

    build() {
        if(this.#tag === null) {
            throw "태그가 없으면 요소를 생성할 수 없습니다";
        }
        const element = document.createElement(this.#tag);
        if(this.#type !== null) {
            element.type = this.#type;
        }
        if (this.#id !== null) {
            element.id = this.#id;
        }
        if(this.#classList.length !== 0) {
            this.#classList.forEach((className) => {
                element.classList.add(className);
            });
        }
        if(this.#value) {
            element.value = this.#value;
        }
        if(this.#innerText) {
            element.innerText = this.#innerText;
        }
        if(this.#innerHtml) {
            element.innerHtml = this.#innerHtml;
        }
        return element;
    }
}

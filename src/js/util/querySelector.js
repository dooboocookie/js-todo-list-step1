function findByCssSelector(cssSelector) {
    const element = document.querySelector(cssSelector);
    if (element == null) {
        throw "찾을 수 없는 요소입니다."
    }
    return element
}

function findChildrenByCssSelector(element, cssSelector) {
    const nodes = document.querySelectorAll(cssSelector);
    if (nodes === null || nodes.length === 0) {
        throw "찾을 수 없는 요소입니다."
    }
    return nodes
}

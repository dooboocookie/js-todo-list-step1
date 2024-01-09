export function findByCssSelector(cssSelector: string): HTMLElement {
  const element = document.querySelector(cssSelector);
  if (element == null) {
    throw "찾을 수 없는 요소입니다.";
  }
  if (element instanceof HTMLElement) {
    return element;
  }
  throw "HTML 요소가 아닙니다";
}

export function findChildrenByCssSelector(
  element: HTMLElement,
  cssSelector: string,
): HTMLElement[] {
  const nodes = document.querySelectorAll(cssSelector);
  if (nodes === null || nodes.length === 0) {
    throw "찾을 수 없는 요소입니다.";
  }
  const elements: HTMLElement[] = [];
  nodes.forEach((element) => {
    if (element instanceof HTMLElement) {
      elements.push(element);
    }
  });
  if (nodes.length !== elements.length) {
    throw "HTML 요소가 아닙니다";
  }
  return elements;
}

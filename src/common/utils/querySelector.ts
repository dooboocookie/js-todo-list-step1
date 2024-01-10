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
  const children = element.querySelectorAll(cssSelector);
  if (children === null || children.length === 0) {
    throw "찾을 수 없는 요소입니다.";
  }
  const elements: HTMLElement[] = [];
  children.forEach((child) => {
    if (child instanceof HTMLElement) {
      elements.push(child);
    }
  });
  if (children.length !== elements.length) {
    throw "HTML 요소가 아닙니다";
  }
  return elements;
}

export function findParentByCssSelector(
  element: HTMLElement,
  cssSelector: string,
): HTMLElement {
  const parent = element.closest(cssSelector);
  if (parent == null) {
    throw "찾을 수 없는 부모 요소입니다.";
  }
  if (parent instanceof HTMLElement) {
    return parent;
  }
  throw "HTML 요소가 아닙니다";
}

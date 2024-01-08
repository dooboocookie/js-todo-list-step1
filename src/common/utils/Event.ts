import Key from "../constants/Key";

export function addKeyEvent(
  element: HTMLElement,
  key: Key,
  callback: () => void,
) {
  element.addEventListener("keyup", (event) => {
    if (event.key === key) {
      callback();
    }
  });
}

export function addClickEvent(element: HTMLElement, callback: () => void) {
  element.addEventListener("click", (event) => {
    callback();
  });
}

export function addDoubleClickEvent(
  element: HTMLElement,
  callback: () => void,
) {
  element.addEventListener("dblclick", (event) => {
    callback();
  });
}

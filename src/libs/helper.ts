const getElement = (selector: string): HTMLElement | null => document.querySelector(selector) || null;

export {
  getElement,
}
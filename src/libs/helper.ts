const offset: number = 15;
const getElement = (selector: string): HTMLElement | null => document.querySelector(selector) || null;
const calculatePositions = (element: HTMLElement, description: HTMLElement, placement: string): any => {
  const elemBoundaries = element.getBoundingClientRect();
  const descBoundaries = description.getBoundingClientRect();
  const position = { x: 0, y: 0 };
  const factor = descBoundaries.width > elemBoundaries.width ? -1 : 1;
  const verticalX = Math.round(elemBoundaries.x + (factor * Math.abs(elemBoundaries.width - descBoundaries.width) / 2));
  switch(placement) {
    case 'top': {
      position.x = verticalX;
      position.y = Math.round(elemBoundaries.y - descBoundaries.height - offset);
      break;
    }
    case 'right': {
      position.x = Math.round(elemBoundaries.x + elemBoundaries.width + offset);
      position.y = Math.round(elemBoundaries.y + elemBoundaries.height / 2 - descBoundaries.height / 2);
      break;
    }
    case 'bottom': {
      position.x = verticalX;
      position.y = Math.round(elemBoundaries.y + elemBoundaries.height + offset);
      break;
    }
    case 'left': {
      position.x = Math.round(elemBoundaries.x - descBoundaries.width - offset);
      position.y = Math.round(elemBoundaries.y + elemBoundaries.height / 2 - descBoundaries.height / 2);
      break;
    }
    default: {
      position.x = verticalX;
      position.y = Math.round(elemBoundaries.y - descBoundaries.height - offset);
      break;
    }
  }
  return position;
};
const calculateArrowPosition = (element: HTMLElement, placement: string, descPosition: any, active: HTMLElement, description: HTMLElement) => {
  const position = { x: 0, y: 0 };
  const activeBoundaries = active.getBoundingClientRect();
  const descBoundaries = description.getBoundingClientRect();
  switch(placement) {
    case 'top':{
      element.removeAttribute('class');
      element.classList.add('tooltip-helper-arrow', 'tooltip-helper-arrow-down');
      position.x = Math.round(activeBoundaries.x + (activeBoundaries.width / 2) - 20);
      position.y = Math.round(descPosition.y + descBoundaries.height - 10);
      break;
    }
    case 'right': {
      element.removeAttribute('class');
      element.classList.add('tooltip-helper-arrow', 'tooltip-helper-arrow-left');
      position.x = Math.round(descPosition.x - 10);
      position.y = Math.round(activeBoundaries.y + (activeBoundaries.height / 2) - 20);
      break;
    }
    case 'bottom': {
      element.removeAttribute('class');
      element.classList.add('tooltip-helper-arrow', 'tooltip-helper-arrow-up');
      position.x = Math.round(activeBoundaries.x + (activeBoundaries.width / 2) - 20);
      position.y = Math.round(descPosition.y - 10);
      break;
    }
    case 'left': {
      element.removeAttribute('class');
      element.classList.add('tooltip-helper-arrow', 'tooltip-helper-arrow-right');
      position.x = Math.round(descPosition.x + descBoundaries.width - 10);
      position.y = Math.round(activeBoundaries.y + (activeBoundaries.height / 2) - 20);
      break;
    }
    default: {
      element.removeAttribute('class');
      element.classList.add('tooltip-helper-arrow', 'tooltip-helper-arrow-up');
      position.x = Math.round(activeBoundaries.x + (activeBoundaries.width / 2) - 20);
      position.y = Math.round(descPosition.y - 10);
      break;
    }
  }
  return position;
};

export {
  getElement,
  calculatePositions,
  calculateArrowPosition,
};
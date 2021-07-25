import { calculateArrowPosition, calculatePositions, getElement } from './libs/helper';
import './style.css'

class TooltipSequence {
  #references = {
    // classes
    target: "body",
    next: "tooltip-helper-next-sequence",
    prev: "tooltip-helper-prev-sequence",
    end: "tooltip-helper-end-sequence",
    backdrop: "tooltip-helper-backdrop",
    arrow: "tooltip-helper-arrow",
    active: "tooltip-helper-active",
    active_description: "tooltip-helper-active-description",
    active_description_text: "tooltip-helper-active-description-text",
    footer: "tooltip-helper-footer",
    disabled_button: "tooltip-disabled-btn",
    stop_scroll: "stop-scroll",
    // text
    next_text: "Next",
    prev_text: "Previous",
    quit_text: "Quit",
    end_text: "Finish",
  };
  #index = 0;
  #data = {
    welcomeText: "Do you want to take the tour of the page?",
    confirmText: "Yes",
    cancelText: "No", 
    backdropColor: "#1b1b1b8e",
    sequence: [],
    onComplete: function() { console.log('Ended') }
  };
  constructor(data: any) {
    this.#data = { ...this.#data, ...data };
  }
  handleEvent(e: any): void {
    if (!e.target || !e.target.id) return;
    const targetId = e.target.id;
    switch(targetId) {
      case this.#references.next: return this.next();
      case this.#references.prev: return this.prev();
      case this.#references.end: 
      case this.#references.active: 
      case this.#references.backdrop: return this.end();
      default: return;
    }
  }
  listeners(off: boolean = false): void {
    const backdrop = getElement(`#${this.#references.backdrop}`);
    if (!backdrop) return;
    if (off) {
      backdrop.removeEventListener("click", this.handleEvent.bind(this));
      if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
    } else {
      backdrop.addEventListener("click", this.handleEvent.bind(this));
    }
  }
  createActive(backdrop: HTMLElement, elemBoundaries: any, styles: any): HTMLElement {
    function addStyles(element: HTMLElement): HTMLElement {
      element.style.top = Math.round(elemBoundaries.top) + "px";
      element.style.left = Math.round(elemBoundaries.left) + "px";
      element.style.height = elemBoundaries.height + "px";
      element.style.width = elemBoundaries.width + "px";
      element.style.borderRadius = styles.borderRadius;
      element.style.boxShadow = "0 0 0 9999px " + backdropColor;
      return element;
    }
    const { backdropColor } = this.#data;
    const activeElement = getElement(`#${this.#references.backdrop} .${this.#references.active}`);
    if (!activeElement) {
      const activeElement = document.createElement("div");
      activeElement.setAttribute("id", this.#references.active);
      activeElement.classList.add(this.#references.active);
      backdrop.append(activeElement);
      return addStyles(activeElement);
    }
    return addStyles(activeElement);
  }
  createDescription(backdrop: HTMLElement, description: string): HTMLElement | undefined {
    const { sequence } = this.#data;
    let descriptionElement = getElement(`#${this.#references.backdrop} .${this.#references.active_description}`);
    if (!descriptionElement) {
      descriptionElement = document.createElement("div");
      descriptionElement.style.willChange = "transform";
      descriptionElement.classList.add(this.#references.active_description);
      descriptionElement.innerHTML += `<p id=${this.#references.active_description_text}></p>`;
      descriptionElement.innerHTML += `<div class=${this.#references.footer}>
        <button id=${this.#references.end} class=${this.#references.end}>${this.#references.quit_text}</button>
        <div>
          <button id=${this.#references.prev} class=${this.#references.prev}>${this.#references.prev_text}</button>
          <button id=${this.#references.next} class=${this.#references.next}>${this.#references.next_text}</button>
        </div>
      </div>`;
      backdrop.append(descriptionElement);
    }
    const prevBtn = getElement(`#${this.#references.prev}`);
    const nextBtn = getElement(`#${this.#references.next}`);
    if (prevBtn) {
      if (this.#index === 0) {
        prevBtn.setAttribute('disabled', 'true');
        prevBtn.classList.add(this.#references.disabled_button);
      } else {
        prevBtn.removeAttribute('disabled');
        prevBtn.classList.remove(this.#references.disabled_button);
      }
    };
    if (nextBtn) {
      if (sequence.length === 1 || this.#index === sequence.length - 1) {
        nextBtn.innerText = this.#references.end_text;
      } else nextBtn.innerText = this.#references.next_text;
    };
    const descTextElem = getElement(`#${this.#references.active_description_text}`);
    if (!descTextElem) return;
    descTextElem.innerHTML = description;
    return descriptionElement;
  }
  createArrow(backdrop: HTMLElement): HTMLElement {
    const arrowElement = getElement(`#${this.#references.backdrop} #${this.#references.arrow}`);
    if (!arrowElement) {
      const arrowElement = document.createElement("div");
      arrowElement.setAttribute("id", this.#references.arrow);
      backdrop.append(arrowElement);
      return arrowElement;
    }
    return arrowElement;
  }
  createBackdrop(): HTMLElement {
    const backdrop = document.createElement("div");
    backdrop.id = this.#references.backdrop;
    backdrop.classList.add(this.#references.backdrop);
    return backdrop;
  }
  stage(): void {
    const { sequence } = this.#data;
    const { element, description, placement } = sequence[this.#index];
    const backdrop = getElement(`#${this.#references.backdrop}`);
    if (!backdrop) return;
    let position: any = { x: 0, y: 0 };
    let arrowPosition: any = { x: 0, y: 0 };
    let block: ScrollLogicalPosition = 'center';
    let newPlacement: string = placement;
    if (window.innerWidth <= 400 && (placement === 'left' || placement === 'right')) newPlacement = 'bottom'; 

    const elem = getElement(element);
    if (!elem) return this.end();
    const body = getElement(this.#references.target);
    if (!body) return;
    body.classList.add(this.#references.stop_scroll);
    elem.scrollIntoView({ behavior: 'smooth', block });

    let styles = getComputedStyle(elem);
    let elemBoundaries = elem.getBoundingClientRect();
    let activeElement = this.createActive(backdrop, elemBoundaries, styles);
    let descriptionElement = this.createDescription(backdrop, description);
    let arrowElement = this.createArrow(backdrop);
  
    if (!descriptionElement) return;
    position = calculatePositions(elem, descriptionElement, newPlacement);
    
    let desc = descriptionElement.getBoundingClientRect();
    if (position.x + desc.width >= window.innerWidth) {
      position.x = Math.round(elemBoundaries.right - desc.width + 15);
    } else if (position.x <= 0) {
      position.x = Math.round(elemBoundaries.x - 15);
      if (desc.width >= window.innerWidth) {
        descriptionElement.style.width = (window.innerWidth - (position.x * 2)) + "px";
      }
    }
    descriptionElement.style.transform = "translate3d(" + position.x + "px, " + position.y + "px, 0px)";
    arrowPosition = calculateArrowPosition(arrowElement, newPlacement, position, activeElement, descriptionElement);
    arrowElement.style.transform = "translate3d(" + arrowPosition.x + "px, " + arrowPosition.y + "px, 0px)";
    // if (sequence.hasOwnProperty('events') && sequence.events.hasOwnProperty('on')) { sequence.events.on(sequence) };
  }
  next(): void {
    this.#index += 1;
    return this.stage();
  }
  prev(): void {
    this.#index -= 1;
    return this.stage();
  }
  end(): void {
    const body = getElement(this.#references.target);
    if (!body) return;
    body.classList.remove(this.#references.stop_scroll);
    this.listeners(true);
    return this.#data.onComplete()
  }
  createSequence(): void {
    try {
      const body = getElement(this.#references.target)
      if (!body) return;
      body.appendChild(this.createBackdrop())
      this.listeners();
      this.stage();
    } catch (err) {
      console.log(err);
    }
  }
}

const sequence = new TooltipSequence({ 
  sequence: [{
    element:"#element",
    description:"This is an element.",
    placement:"bottom"
  }] 
});
sequence.createSequence();

// export default (options: any) => new TooltipSequence(options);

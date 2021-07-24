import { getElement } from './libs/helper';
import './style.css'

class TooltipSequence {
  #references = {
    next: "tooltip-helper-next-sequence",
    prev: "tooltip-helper-prev-sequence",
    end: "tooltip-helper-end-sequence",
    active: "tooltip-helper-active",
    backdrop: "tooltip-helper-backdrop",
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
  stage() {
    // const { sequence } = this.#data;
    // const { element, description, placement = 'bottom' } = sequence[this.#index];
    // const backdrop = getElement(`#${this.#references.backdrop}`);
    // if (!backdrop) return;
    // const position = { x: 0, y: 0 };
    // const arrowPosition = { x: 0, y: 0 };
    // if (window.innerWidth <= 400 && (placement === 'left' || placement === 'right')) placement = 'bottom'; 
    // let block = 'center';
  }
  next() {
    this.#index += 1;
    return this.stage();
  }
  prev() {
    this.#index -= 1;
    return this.stage();
  }
  end(): void {
    const body = getElement('body');
    if (!body) return;
    body.classList.remove('stop-scroll');
    this.listeners(true);
    // index = 0;
    return this.#data.onComplete()
  }
  renderBackdrop(): HTMLDivElement {
    const backdrop = document.createElement("div");
    backdrop.id = this.#references.backdrop;
    backdrop.classList.add(this.#references.backdrop);
    return backdrop;
  }
  createSequence(): void {
    const body = getElement("body")
    if (!body) return;
    console.log('Loaded document body');
    body.appendChild(this.renderBackdrop())
    this.listeners();
    this.stage();
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

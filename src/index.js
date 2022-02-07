class TooltipSequence {
  #references = {
    // classes
    target: "body",
    next: "tooltip-helper-next-sequence",
    prev: "tooltip-helper-prev-sequence",
    end: "tooltip-helper-end-sequence",
    backdrop: "tooltip-helper-backdrop",
    arrow: "tooltip-helper-arrow",
    arrow_down: "tooltip-helper-arrow-down",
    arrow_left: "tooltip-helper-arrow-left",
    arrow_up: "tooltip-helper-arrow-up",
    arrow_right: "tooltip-helper-arrow-right",
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
  #elementOffset = 15;
  #elementOffsetMin = 10;
  #elementOffsetMax = 20;
  #startPosition = { x: 0, y: 0 };
  static resizeEvent = 0;
  static resizeHandler = null;
  constructor(data) {
    this.#data = { ...this.#data, ...data };
  };
  #getElement(selector) { return document.querySelector(selector) || null };
  #calculateArrowPosition(element, placement, descPosition, active, description) {
    const position = this.#startPosition;
    const activeBoundaries = active.getBoundingClientRect();
    const descBoundaries = description.getBoundingClientRect();
    element.removeAttribute('class');
    switch(placement) {
      case 'top':{
        element.classList.add(this.#references.arrow, this.#references.arrow_down);
        position.x = Math.round(activeBoundaries.x + (activeBoundaries.width / 2) - this.#elementOffsetMax);
        position.y = Math.round(descPosition.y + descBoundaries.height - this.#elementOffsetMin);
        break;
      }
      case 'right': {
        element.classList.add(this.#references.arrow, this.#references.arrow_left);
        position.x = Math.round(descPosition.x - this.#elementOffsetMin);
        position.y = Math.round(activeBoundaries.y + (activeBoundaries.height / 2) - this.#elementOffsetMax);
        break;
      }
      case 'bottom': {
        element.classList.add(this.#references.arrow, this.#references.arrow_up);
        position.x = Math.round(activeBoundaries.x + (activeBoundaries.width / 2) - this.#elementOffsetMax);
        position.y = Math.round(descPosition.y - this.#elementOffsetMin);
        break;
      }
      case 'left': {
        element.classList.add(this.#references.arrow, this.#references.arrow_right);
        position.x = Math.round(descPosition.x + descBoundaries.width - this.#elementOffsetMin);
        position.y = Math.round(activeBoundaries.y + (activeBoundaries.height / 2) - this.#elementOffsetMax);
        break;
      }
      default: {
        element.classList.add(this.#references.arrow, this.#references.arrow_up);
        position.x = Math.round(activeBoundaries.x + (activeBoundaries.width / 2) - this.#elementOffsetMax);
        position.y = Math.round(descPosition.y - this.#elementOffsetMin);
        break;
      }
    }
    return position;
  };
  #calculatePositions(element, description, placement) {
    const elemBoundaries = element.getBoundingClientRect();
    const descBoundaries = description.getBoundingClientRect();
    const position = this.#startPosition;
    const factor = descBoundaries.width > elemBoundaries.width ? -1 : 1;
    const verticalX = Math.round(elemBoundaries.x + (factor * Math.abs(elemBoundaries.width - descBoundaries.width) / 2));
    switch(placement) {
      case 'top': {
        position.x = verticalX;
        position.y = Math.round(elemBoundaries.y - descBoundaries.height - this.#elementOffset);
        break;
      }
      case 'right': {
        position.x = Math.round(elemBoundaries.x + elemBoundaries.width + this.#elementOffset);
        position.y = Math.round(elemBoundaries.y + elemBoundaries.height / 2 - descBoundaries.height / 2);
        break;
      }
      case 'bottom': {
        position.x = verticalX;
        position.y = Math.round(elemBoundaries.y + elemBoundaries.height + this.#elementOffset);
        break;
      }
      case 'left': {
        position.x = Math.round(elemBoundaries.x - descBoundaries.width - this.#elementOffset);
        position.y = Math.round(elemBoundaries.y + elemBoundaries.height / 2 - descBoundaries.height / 2);
        break;
      }
      default: {
        position.x = verticalX;
        position.y = Math.round(elemBoundaries.y - descBoundaries.height - this.#elementOffset);
        break;
      }
    }
    return position;
  };
  handleEvent(e) {
    if (!e.target || !e.target.id) return;
    const targetId = e.target.id;
    switch(targetId) {
      case this.#references.next: return this.next();
      case this.#references.prev: return this.prev();
      case this.#references.end: return this.end();
      case this.#references.active: return this.end();
      case this.#references.backdrop: return this.end();
      default: return;
    }
  };
  listeners(off = false) {
    const backdrop = this.#getElement(`#${this.#references.backdrop}`);
    if (!backdrop) return;
    if (off) {
      backdrop.removeEventListener("click", this.handleEvent.bind(this));
      if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
    } else {
      backdrop.addEventListener("click", this.handleEvent.bind(this));
    }
  };
  createActive(backdrop, elemBoundaries, styles) {
    function addStyles(element) {
      element.style.top = Math.round(elemBoundaries.top) + "px";
      element.style.left = Math.round(elemBoundaries.left) + "px";
      element.style.height = elemBoundaries.height + "px";
      element.style.width = elemBoundaries.width + "px";
      element.style.borderRadius = styles.borderRadius;
      element.style.boxShadow = "0 0 0 9999px " + backdropColor;
      return element;
    }
    const { backdropColor } = this.#data;
    const activeElement = this.#getElement(`#${this.#references.backdrop} .${this.#references.active}`);
    if (!activeElement) {
      const activeElement = document.createElement("div");
      activeElement.setAttribute("id", this.#references.active);
      activeElement.classList.add(this.#references.active);
      backdrop.append(activeElement);
      return addStyles(activeElement);
    }
    return addStyles(activeElement);
  };
  createDescription(backdrop, description) {
    const { sequence } = this.#data;
    let descriptionElement = this.#getElement(`#${this.#references.backdrop} .${this.#references.active_description}`);
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
    const prevBtn = this.#getElement(`#${this.#references.prev}`);
    const nextBtn = this.#getElement(`#${this.#references.next}`);
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
    const descTextElem = this.#getElement(`#${this.#references.active_description_text}`);
    if (!descTextElem) return;
    if (typeof description === "string") descTextElem.innerHTML = description;
    else descTextElem.appendChild(description);
    return descriptionElement;
  };
  createArrow(backdrop) {
    const arrowElement = this.#getElement(`#${this.#references.backdrop} #${this.#references.arrow}`);
    if (!arrowElement) {
      const arrowElement = document.createElement("div");
      arrowElement.setAttribute("id", this.#references.arrow);
      backdrop.append(arrowElement);
      return arrowElement;
    }
    return arrowElement;
  };
  #createBackdrop() {
    const backdrop = document.createElement("div");
    backdrop.id = this.#references.backdrop;
    backdrop.classList.add(this.#references.backdrop);
    return backdrop;
  };
  stage() {
    const { sequence } = this.#data;
    const { element, description, placement } = sequence[this.#index];
    const backdrop = this.#getElement(`#${this.#references.backdrop}`);
    if (!backdrop) return;
    let position = { x: 0, y: 0 };
    let arrowPosition = { x: 0, y: 0 };
    let block = 'center';
    let newPlacement = placement;
    if (window.innerWidth <= 400 && (placement === 'left' || placement === 'right')) newPlacement = 'bottom'; 

    const elem = this.#getElement(element);
    if (!elem) return this.end();
    const body = this.#getElement(this.#references.target);
    if (!body) return;
    body.classList.add(this.#references.stop_scroll);
    elem.scrollIntoView({ behavior: 'smooth', block });

    let styles = getComputedStyle(elem);
    let elemBoundaries = elem.getBoundingClientRect();
    let activeElement = this.createActive(backdrop, elemBoundaries, styles);
    let descriptionElement = this.createDescription(backdrop, description);
    let arrowElement = this.createArrow(backdrop);
  
    if (!descriptionElement) return;
    position = this.#calculatePositions(elem, descriptionElement, newPlacement);
    
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
    arrowPosition = this.#calculateArrowPosition(arrowElement, newPlacement, position, activeElement, descriptionElement);
    arrowElement.style.transform = "translate3d(" + arrowPosition.x + "px, " + arrowPosition.y + "px, 0px)";
    // if (sequence.hasOwnProperty('events') && sequence.events.hasOwnProperty('on')) { sequence.events.on(sequence) };
  };
  next() {
    this.#index += 1;
    return this.stage();
  };
  prev() {
    this.#index -= 1;
    return this.stage();
  };
  end() {
    const body = this.#getElement(this.#references.target);
    if (!body) return;
    body.classList.remove(this.#references.stop_scroll);
    this.listeners(true);
    if (this.#data.onComplete) return this.#data.onComplete();   
  };
  handleResize(e) {
    this.stage();
  }
  createSequence() {
    try {
      const body = this.#getElement(this.#references.target)
      if (!body) return;
      body.appendChild(this.#createBackdrop())
      this.listeners();
      this.stage();
      // Handle window resize
      if (TooltipSequence.resizeEvent < 1) {
        TooltipSequence.resizeEvent = 1;
        TooltipSequence.resizeHandler = window.addEventListener('resize', this.handleResize.bind(this));
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default {
  TooltipSequence
}




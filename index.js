class TooltipSequence {
  #references = {
    // classes
    target: "body",
    next: "tooltip-helper-next-sequence",
    prev: "tooltip-helper-prev-sequence",
    end: "tooltip-helper-end-sequence",
    quit: "tooltip-helper-quit-sequence",
    backdrop: "tooltip-helper-backdrop",
    arrow: "tooltip-helper-arrow",
    arrow_hidden: "tooltip-helper-arrow-hidden",
    arrow_down: "tooltip-helper-arrow-down",
    arrow_left: "tooltip-helper-arrow-left",
    arrow_up: "tooltip-helper-arrow-up",
    arrow_right: "tooltip-helper-arrow-right",
    active: "tooltip-helper-active",
    active_description: "tooltip-helper-active-description",
    active_description_animate: "tooltip-helper-active-description-animate",
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
    backdropColor: "#1b1b1b8e",
    sequence: [],
    onComplete: function() {}
  };
  #elementOffset = 15;
  #arrowSize = 15;
  #elementOffsetMin = 10;
  #startPosition = { x: 0, y: 0 };
  static resizeEventHandler = null;
  static keystrokeEventHandler = null;
  constructor(data) {
    this.#data = { ...this.#data, ...data };
  };
  #getElement(selector) { return document.querySelector(selector) || null };
  #getElementById(id) { return this.#getElement('#' + id) };
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
  #handleEvent(e) {
    if (!e.target || !e.target.id) return;
    const targetId = e.target.id;
    switch(targetId) {
      case this.#references.next: return this.#next();
      case this.#references.prev: return this.#prev();
      case this.#references.end: return this.#end();
      case this.#references.quit: return this.#end();
      case this.#references.backdrop: return this.#end();
      default: return;
    }
  };
  #handleResize() {
    try {
      this.#stage();
    } catch (err) {
      throw new Error('Oops something went wrong while resizing!');
    }
  };
  #handleKey(e) {
    const { keyCode, which } = e;
    const keyPressed = which || keyCode || 0;

    if (keyPressed === 39 && this.#index < this.#data.sequence.length - 1) {
      return this.#next();
    } else if (keyPressed === 37 && this.#index > 0) {
      return this.#prev();
    } else if (keyPressed === 81) {
      return this.#end();
    }
  }
  #listeners(off = false) {
    const backdrop = this.#getElementById(this.#references.backdrop);
    if (!backdrop) return;
    if (off) {
      window.removeEventListener("resize", TooltipSequence.resizeEventHandler);
      TooltipSequence.resizeEventHandler = null;
      window.removeEventListener("keydown", TooltipSequence.keystrokeEventHandler);
      TooltipSequence.resizeEventHandler = null;
      backdrop.removeEventListener("click", this.#handleEvent.bind(this));
      if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
    } else {
      TooltipSequence.resizeEventHandler = this.#handleResize.bind(this);
      window.addEventListener("resize", TooltipSequence.resizeEventHandler);
      TooltipSequence.keystrokeEventHandler = this.#handleKey.bind(this);
      window.addEventListener("keydown", TooltipSequence.keystrokeEventHandler);
      backdrop.addEventListener("click", this.#handleEvent.bind(this));
    }
  };
  #createActive(backdrop, elemBoundaries, styles) {
    function addStyles(element) {
      element.style.height = elemBoundaries.height + "px";
      element.style.width = elemBoundaries.width + "px";
      element.style.borderRadius = styles.borderRadius;
      element.style.boxShadow = "0 0 0 9999px " + backdropColor;
      element.style.transform = `translate3d(${elemBoundaries.x}px, ${elemBoundaries.y}px, 0px)`;
      return element;
    }
    const { backdropColor } = this.#data;
    const activeElement = this.#getElement(`#${this.#references.backdrop} .${this.#references.active}`);
    const html = this.#getElement(this.#data.sequence[this.#index].element).innerHTML;
    if (!activeElement) {
      const activeElement = document.createElement("div");
      activeElement.setAttribute("id", this.#references.active);
      activeElement.classList.add(this.#references.active);
      activeElement.innerHTML = html;
      backdrop.append(activeElement);
      return addStyles(activeElement);
    }
    activeElement.innerHTML = html;
    return addStyles(activeElement);
  };
  #createDescription(backdrop, description) {
    const { sequence } = this.#data;
    let descriptionElement = this.#getElement(`#${this.#references.backdrop} .${this.#references.active_description}`);
    if (!descriptionElement) {
      descriptionElement = document.createElement("div");
      descriptionElement.style.willChange = "transform";
      descriptionElement.classList.add(this.#references.active_description);
      descriptionElement.innerHTML += `<p id=${this.#references.active_description_text}></p>`;
      descriptionElement.innerHTML += `<div class=${this.#references.footer}>
        <button id=${this.#references.quit} class=${this.#references.quit}>${this.#references.quit_text}</button>
        <div>
          <button id=${this.#references.prev} class=${this.#references.prev}>${this.#references.prev_text}</button>
          <button id=${this.#references.next} class=${this.#references.next}>${this.#references.next_text}</button>
        </div>
      </div>`;
      backdrop.append(descriptionElement);
    }
    const prevBtn = this.#getElementById(this.#references.prev);
    const nextBtn = this.#getElementById(this.#references.next);
    const finishBtn = this.#getElementById(this.#references.end);
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
        nextBtn.setAttribute('id', this.#references.end);
      } else nextBtn.innerText = this.#references.next_text;
    };
    if (finishBtn && this.#index < sequence.length - 1) {
      finishBtn.innerText = this.#references.next_text;
      finishBtn.setAttribute('id', this.#references.next);
    }
    const descTextElem = this.#getElement(`#${this.#references.active_description_text}`);
    if (!descTextElem) return;
    if (typeof description === "string") descTextElem.innerHTML = description;
    else descTextElem.appendChild(description);
    return descriptionElement;
  };
  #renderArrow(description, newPlacement, desc) {
    let arrowElement = this.#getElement(`#${this.#references.backdrop} #${this.#references.arrow}`);
    if (!arrowElement) {
      arrowElement = document.createElement("div");
      arrowElement.setAttribute("id", this.#references.arrow);
      description.append(arrowElement);
      arrowElement.classList.add(this.#references.arrow_hidden);
    }
    arrowElement.removeAttribute('class');
    arrowElement.classList.add(this.#references.arrow);
    const transform = { x: 0, y: 0, rotation: 45 };
    if (newPlacement === 'top') {
      transform.x = transform.x + (desc.width / 2) - (this.#arrowSize / 2);
      transform.y = transform.y + (this.#arrowSize / 2);
    } else if (newPlacement === 'right') {
      transform.x = transform.x - (this.#arrowSize / 2);
      transform.y = transform.y - (desc.height / 2) + (this.#arrowSize / 2);
    } else if (newPlacement === 'bottom') {
      transform.x = transform.x + (desc.width / 2) - (this.#arrowSize / 2);
      transform.y = transform.y - (desc.height) + (this.#arrowSize / 2);
    } else {
      transform.x = transform.x + desc.width - (this.#arrowSize / 2);
      transform.y = transform.y - (desc.height / 2) + (this.#arrowSize / 2);
    }
    arrowElement.style.transform = `translate3d(${transform.x}px, ${transform.y}px, 0px) rotateZ(${transform.rotation}deg)`
  }
  #createBackdrop() {
    const backdrop = document.createElement("div");
    backdrop.id = this.#references.backdrop;
    backdrop.classList.add(this.#references.backdrop);
    return backdrop;
  };
  #stage() {
    const { sequence } = this.#data;
    const { element, description, placement } = sequence[this.#index];
    const backdrop = this.#getElementById(this.#references.backdrop);
    if (!backdrop) return;
    let position = this.#startPosition;
    let block = 'center';
    let newPlacement = placement;
    // for mobile devices
    if (window.innerWidth <= 400 && (placement === 'left' || placement === 'right')) newPlacement = 'bottom'; 

    const elem = this.#getElement(element);
    if (!elem) return this.end();
    const body = this.#getElement(this.#references.target);
    if (!body) return;
    body.classList.add(this.#references.stop_scroll);
    elem.scrollIntoView({ behavior: 'smooth', block });

    let styles = getComputedStyle(elem);
    let elemBoundaries = elem.getBoundingClientRect();
    let activeElement = this.#createActive(backdrop, elemBoundaries, styles);
    let descriptionElement = this.#createDescription(backdrop, description);
    
    if (!descriptionElement) return;
    position = this.#calculatePositions(elem, descriptionElement, newPlacement);
    
    let desc = descriptionElement.getBoundingClientRect();
    if (position.x + desc.width >= window.innerWidth) {
      position.x = Math.round(elemBoundaries.right - desc.width + this.#elementOffsetMin);
    } else if (position.x <= 0) {
      position.x = Math.round(elemBoundaries.x - this.#elementOffsetMin);
      if (desc.width >= window.innerWidth) {
        descriptionElement.style.width = (window.innerWidth - (position.x * 2)) + "px";
      }
    }
    descriptionElement.style.transform = "translate3d(" + position.x + "px, " + position.y + "px, 0px)";
    this.#renderArrow(descriptionElement, newPlacement, desc);
    if (window.innerWidth < 480 && window.innerWidth > 20) { 
      descriptionElement.style.width = window.innerWidth - 20 + "px";
    }
  };
  #next() {
    this.#index += 1;
    return this.#stage();
  };
  #prev() {
    this.#index -= 1;
    return this.#stage();
  };
  #end() {
    const body = this.#getElement(this.#references.target);
    if (!body) return;
    body.classList.remove(this.#references.stop_scroll);
    this.#listeners(true);
    this.#index = 0;
    if (this.#data.onComplete) return this.#data.onComplete();   
  };
  createSequence() {
    try {
      const body = this.#getElement(this.#references.target)
      if (!body) return;
      body.appendChild(this.#createBackdrop())
      this.#listeners();
      this.#stage();
    } catch (err) {
      console.log(err);
      throw new Error('Oops, something went wrong while creating the sequence');
    }
  };
}

export default {
  TooltipSequence
}
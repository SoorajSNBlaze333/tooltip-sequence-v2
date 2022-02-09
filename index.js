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
    arrow_hide: "tooltip-helper-arrow-hide",
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
  #arrowSize = 17;
  #arrowHideSize = this.#arrowSize - 2;
  #startPosition = { x: 0, y: 0 };
  static resizeEventHandler = null;
  static keystrokeEventHandler = null;
  constructor(data) {
    this.#data = { ...this.#data, ...data };
  };
  #getElement(selector) { return document.querySelector(selector) || null };
  #getElementById(id) { return this.#getElement('#' + id) };
  #getBoundingClientRect(element) { return element.getBoundingClientRect() };
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
  #renderButtons() {
    const { sequence } = this.#data;
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
    return { prevBtn, nextBtn, finishBtn };
  }
  #createDescription(elem, backdrop, description, active, placement) {
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
    this.#renderButtons();

    const descTextElem = this.#getElement(`#${this.#references.active_description_text}`);
    if (!descTextElem) return;
    if (typeof description === "string") descTextElem.innerHTML = description;
    else descTextElem.appendChild(description);
    
    const descBoundaries = this.#getBoundingClientRect(descriptionElement);
    const activeBoundaries = this.#getBoundingClientRect(active);
    const elemBoundaries = this.#getBoundingClientRect(elem);

    const position = { x: 0, y: 0 };
    position.x = elemBoundaries.x + (elemBoundaries.width / 2) - (descBoundaries.width / 2);
    position.y = elemBoundaries.y + (elemBoundaries.height / 2) - (descBoundaries.height / 2);
    if (placement === 'top') position.y = position.y - (descBoundaries.height / 2) - 40;
    else if (placement === 'right') position.x = position.x + (descBoundaries.width / 2) + 40;
    else if (placement === 'bottom') position.y = position.y + (descBoundaries.height / 2) + 40;
    else if (placement === 'left') position.x = position.x - (descBoundaries.width / 2) - 40;


    descriptionElement.style.transform = "translate3d(" + position.x + "px, " + position.y + "px, 0px)";
    if (window.innerWidth < 480 && window.innerWidth > 20) { 
      descriptionElement.style.width = window.innerWidth - 20 + "px";
    }
    // if (placement === 'right' && constraints.right < descBoundaries.width) {
    //   descriptionElement.style.width = constraints.right - 30 + "px";
    // }

    // const position = this.#calculatePositions(elem, descBoundaries, placement);
    // const constraints = {
    //   left: activeBoundaries.x,
    //   right: window.innerWidth - (activeBoundaries.x + activeBoundaries.width)
    // }    
    return { descBoundaries, descriptionElement }
  };
  #renderArrow(description, newPlacement, desc) {
    let arrowElement = this.#getElement(`#${this.#references.backdrop} #${this.#references.arrow}`);
    let arrowHideElement = this.#getElement(`#${this.#references.backdrop} #${this.#references.arrow_hide}`);
    if (!arrowElement) {
      arrowElement = document.createElement("div");
      arrowElement.setAttribute("id", this.#references.arrow);
      description.append(arrowElement);
      // arrowElement.classList.add(this.#references.arrow_hidden);
    }
    arrowElement.removeAttribute('class');
    arrowElement.classList.add(this.#references.arrow);
    const transform = { x: 0, y: 0, rotation: -45 };
    if (newPlacement === 'top') {
      transform.x = transform.x + (desc.width / 2) - (this.#arrowSize / 2);
      transform.y = transform.y + (this.#arrowSize / 2);
    } else if (newPlacement === 'right') {
      transform.x = transform.x - (this.#arrowSize / 2);
      transform.y = transform.y - (desc.height / 2) + (this.#arrowSize / 2);
      transform.rotation = 45;
    } else if (newPlacement === 'bottom') {
      transform.x = transform.x + (desc.width / 2) - (this.#arrowSize / 2);
      transform.y = transform.y - (desc.height) + (this.#arrowSize / 2) + 2;
      transform.rotation = 135;
    } else {
      transform.x = transform.x + desc.width - (this.#arrowSize / 2) - 2;
      transform.y = transform.y - (desc.height / 2) + (this.#arrowSize / 2);
      transform.rotation = 225;
    }
    arrowElement.style.transform = `translate3d(${transform.x}px, ${transform.y}px, 0px) rotateZ(${transform.rotation}deg)`;
    if (!arrowHideElement) {
      arrowHideElement = document.createElement("div");
      arrowHideElement.setAttribute("id", this.#references.arrow_hide);
      description.append(arrowHideElement);
      // arrowHideElement.classList.add(this.#references.arrow_hidden);
    }
    arrowHideElement.removeAttribute('class');
    arrowHideElement.classList.add(this.#references.arrow_hide);
    transform.x = 0;
    transform.y = 0;
    transform.rotation = -45;
    if (newPlacement === 'top') {
      transform.x = transform.x + (desc.width / 2) - (this.#arrowHideSize / 2);
      transform.y = transform.y + (this.#arrowHideSize / 2) - this.#arrowSize + 2;
    } else if (newPlacement === 'right') {
      transform.x = transform.x - (this.#arrowHideSize / 2);
      transform.y = transform.y - (desc.height / 2) + (this.#arrowHideSize / 2) - this.#arrowSize + 2;
      transform.rotation = 45;
    } else if (newPlacement === 'bottom') {
      transform.x = transform.x + (desc.width / 2) - (this.#arrowHideSize / 2);
      transform.y = transform.y - (desc.height) + (this.#arrowHideSize / 2) + 2 - this.#arrowSize + 2;
      transform.rotation = 135;
    } else {
      transform.x = transform.x + desc.width - (this.#arrowHideSize / 2) - 2;
      transform.y = transform.y - (desc.height / 2) + (this.#arrowHideSize / 2) - this.#arrowSize + 2;
      transform.rotation = 225;
    }
    arrowHideElement.style.transform = `translate3d(${transform.x}px, ${transform.y}px, 0px) rotateZ(${transform.rotation}deg)`
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
    let block = 'center';
    let newPlacement = placement;
    // for mobile devices
    if (window.innerWidth <= 480 && (placement === 'left' || placement === 'right')) newPlacement = 'bottom'; 

    const elem = this.#getElement(element);
    if (!elem) return this.end();
    const body = this.#getElement(this.#references.target);
    if (!body) return;
    body.classList.add(this.#references.stop_scroll);
    elem.scrollIntoView({ behavior: 'smooth', block });

    const styles = getComputedStyle(elem);
    const elemBoundaries = this.#getBoundingClientRect(elem);
    const activeElement = this.#createActive(backdrop, elemBoundaries, styles);
    const { descBoundaries, descriptionElement } = this.#createDescription(elem, backdrop, description, activeElement, newPlacement);
    if (!descriptionElement) return; 
    this.#renderArrow(descriptionElement, newPlacement, descBoundaries);
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
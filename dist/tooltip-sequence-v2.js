var TooltipSequenceV2;(()=>{"use strict";var e={d:(t,r)=>{for(var s in r)e.o(r,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:r[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>s});class r{#e={target:"body",next:"tooltip-helper-next-sequence",prev:"tooltip-helper-prev-sequence",end:"tooltip-helper-end-sequence",backdrop:"tooltip-helper-backdrop",arrow:"tooltip-helper-arrow",arrow_down:"tooltip-helper-arrow-down",arrow_left:"tooltip-helper-arrow-left",arrow_up:"tooltip-helper-arrow-up",arrow_right:"tooltip-helper-arrow-right",active:"tooltip-helper-active",active_description:"tooltip-helper-active-description",active_description_text:"tooltip-helper-active-description-text",footer:"tooltip-helper-footer",disabled_button:"tooltip-disabled-btn",stop_scroll:"stop-scroll",next_text:"Next",prev_text:"Previous",quit_text:"Quit",end_text:"Finish"};#t=0;#r={welcomeText:"Do you want to take the tour of the page?",confirmText:"Yes",cancelText:"No",backdropColor:"#1b1b1b8e",sequence:[],onComplete:function(){console.log("Ended")}};#s=15;#i=10;#n=20;#o={x:0,y:0};static resizeEvent=0;static resizeHandler=null;constructor(e){this.#r={...this.#r,...e}}#a(e){return document.querySelector(e)||null}#h(e){return this.#a("#"+e)}#c(e,t,r,s,i){const n=this.#o,o=s.getBoundingClientRect(),a=i.getBoundingClientRect();switch(e.removeAttribute("class"),t){case"top":e.classList.add(this.#e.arrow,this.#e.arrow_down),n.x=Math.round(o.x+o.width/2-this.#n),n.y=Math.round(r.y+a.height-this.#i);break;case"right":e.classList.add(this.#e.arrow,this.#e.arrow_left),n.x=Math.round(r.x-this.#i),n.y=Math.round(o.y+o.height/2-this.#n);break;case"bottom":default:e.classList.add(this.#e.arrow,this.#e.arrow_up),n.x=Math.round(o.x+o.width/2-this.#n),n.y=Math.round(r.y-this.#i);break;case"left":e.classList.add(this.#e.arrow,this.#e.arrow_right),n.x=Math.round(r.x+a.width-this.#i),n.y=Math.round(o.y+o.height/2-this.#n)}return n}#d(e,t,r){const s=e.getBoundingClientRect(),i=t.getBoundingClientRect(),n=this.#o,o=i.width>s.width?-1:1,a=Math.round(s.x+o*Math.abs(s.width-i.width)/2);switch(r){case"top":default:n.x=a,n.y=Math.round(s.y-i.height-this.#s);break;case"right":n.x=Math.round(s.x+s.width+this.#s),n.y=Math.round(s.y+s.height/2-i.height/2);break;case"bottom":n.x=a,n.y=Math.round(s.y+s.height+this.#s);break;case"left":n.x=Math.round(s.x-i.width-this.#s),n.y=Math.round(s.y+s.height/2-i.height/2)}return n}#l(e){if(!e.target||!e.target.id)return;const t=e.target.id;switch(console.log(t),t){case this.#e.next:return this.#f();case this.#e.prev:return this.#p();case this.#e.end:case this.#e.active:case this.#e.backdrop:default:return this.#u()}}#x(e=!1){const t=this.#h(this.#e.backdrop);t&&(e?(t.removeEventListener("click",this.#l.bind(this)),t.parentNode&&t.parentNode.removeChild(t)):t.addEventListener("click",this.#l.bind(this)))}#g(e,t,r){function s(e){return e.style.top=Math.round(t.top)+"px",e.style.left=Math.round(t.left)+"px",e.style.height=t.height+"px",e.style.width=t.width+"px",e.style.borderRadius=r.borderRadius,e.style.boxShadow="0 0 0 9999px "+i,e}const{backdropColor:i}=this.#r,n=this.#a(`#${this.#e.backdrop} .${this.#e.active}`);if(!n){const t=document.createElement("div");return t.setAttribute("id",this.#e.active),t.classList.add(this.#e.active),e.append(t),s(t)}return s(n)}#w(e,t){const{sequence:r}=this.#r;let s=this.#a(`#${this.#e.backdrop} .${this.#e.active_description}`);s||(s=document.createElement("div"),s.style.willChange="transform",s.classList.add(this.#e.active_description),s.innerHTML+=`<p id=${this.#e.active_description_text}></p>`,s.innerHTML+=`<div class=${this.#e.footer}>\n        <button id=${this.#e.end} class=${this.#e.end}>${this.#e.quit_text}</button>\n        <div>\n          <button id=${this.#e.prev} class=${this.#e.prev}>${this.#e.prev_text}</button>\n          <button id=${this.#e.next} class=${this.#e.next}>${this.#e.next_text}</button>\n        </div>\n      </div>`,e.append(s));const i=this.#a(`#${this.#e.prev}`),n=this.#a(`#${this.#e.next}`);i&&(0===this.#t?(i.setAttribute("disabled","true"),i.classList.add(this.#e.disabled_button)):(i.removeAttribute("disabled"),i.classList.remove(this.#e.disabled_button))),n&&(console.log(this.#t),1===r.length||this.#t===r.length-1?(n.innerText=this.#e.end_text,n.setAttribute("id",this.#e.end)):n.innerText=this.#e.next_text);const o=this.#a(`#${this.#e.active_description_text}`);if(o)return"string"==typeof t?o.innerHTML=t:o.appendChild(t),s}#m(e){const t=this.#a(`#${this.#e.backdrop} #${this.#e.arrow}`);if(!t){const t=document.createElement("div");return t.setAttribute("id",this.#e.arrow),e.append(t),t}return t}#b(){const e=document.createElement("div");return e.id=this.#e.backdrop,e.classList.add(this.#e.backdrop),e}#v(){const{sequence:e}=this.#r,{element:t,description:r,placement:s}=e[this.#t],i=this.#h(this.#e.backdrop);if(!i)return;let n=this.#o,o=this.#o,a=s;window.innerWidth<=400&&("left"===s||"right"===s)&&(a="bottom");const h=this.#a(t);if(!h)return this.end();const c=this.#a(this.#e.target);if(!c)return;c.classList.add(this.#e.stop_scroll),h.scrollIntoView({behavior:"smooth",block:"center"});let d=getComputedStyle(h),l=h.getBoundingClientRect(),f=this.#g(i,l,d),p=this.#w(i,r),u=this.#m(i);if(!p)return;n=this.#d(h,p,a);let x=p.getBoundingClientRect();n.x+x.width>=window.innerWidth?n.x=Math.round(l.right-x.width+this.#i):n.x<=0&&(n.x=Math.round(l.x-this.#i),x.width>=window.innerWidth&&(p.style.width=window.innerWidth-2*n.x+"px")),p.style.transform="translate3d("+n.x+"px, "+n.y+"px, 0px)",o=this.#c(u,a,n,f,p),u.style.transform="translate3d("+o.x+"px, "+o.y+"px, 0px)"}#f(){return this.#t+=1,this.#v()}#p(){return this.#t-=1,this.#v()}#u(){const e=this.#a(this.#e.target);if(e)return e.classList.remove(this.#e.stop_scroll),this.#x(!0),this.#t=0,this.#r.onComplete?this.#r.onComplete():void 0}#y(e){try{this.#v()}catch(e){throw new Error("Oops something went wrong while resizing!")}}createSequence(){try{const e=this.#a(this.#e.target);if(!e)return;e.appendChild(this.#b()),this.#x(),this.#v(),r.resizeEvent<1&&(console.log("Attached resize handlers!"),r.resizeEvent=1,r.resizeHandler=window.addEventListener("resize",this.#y.bind(this)))}catch(e){throw new Error("Oops, something went wrong while creating the sequence")}}}const s={TooltipSequence:r};TooltipSequenceV2=t})();
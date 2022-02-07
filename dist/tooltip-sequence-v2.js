var TooltipSequenceV2;(()=>{"use strict";var e={d:(t,i)=>{for(var r in i)e.o(i,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:i[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>r});class i{#e={target:"body",next:"tooltip-helper-next-sequence",prev:"tooltip-helper-prev-sequence",end:"tooltip-helper-end-sequence",quit:"tooltip-helper-quit-sequence",backdrop:"tooltip-helper-backdrop",arrow:"tooltip-helper-arrow",arrow_down:"tooltip-helper-arrow-down",arrow_left:"tooltip-helper-arrow-left",arrow_up:"tooltip-helper-arrow-up",arrow_right:"tooltip-helper-arrow-right",active:"tooltip-helper-active",active_description:"tooltip-helper-active-description",active_description_animate:"tooltip-helper-active-description-animate",active_description_text:"tooltip-helper-active-description-text",footer:"tooltip-helper-footer",disabled_button:"tooltip-disabled-btn",stop_scroll:"stop-scroll",next_text:"Next",prev_text:"Previous",quit_text:"Quit",end_text:"Finish"};#t=0;#i={backdropColor:"#1b1b1b8e",sequence:[],onComplete:function(){}};#r=15;#s=10;#n=20;#o={x:0,y:0};static resizeEventHandler=null;static keystrokeEventHandler=null;constructor(e){this.#i={...this.#i,...e}}#a(e){return document.querySelector(e)||null}#h(e){return this.#a("#"+e)}#c(e,t,i,r,s){const n=this.#o,o=r.getBoundingClientRect(),a=s.getBoundingClientRect();switch(e.removeAttribute("class"),t){case"top":e.classList.add(this.#e.arrow,this.#e.arrow_down),n.x=Math.round(o.x+o.width/2-this.#n),n.y=Math.round(i.y+a.height-this.#s);break;case"right":e.classList.add(this.#e.arrow,this.#e.arrow_left),n.x=Math.round(i.x-this.#s),n.y=Math.round(o.y+o.height/2-this.#n);break;case"bottom":default:e.classList.add(this.#e.arrow,this.#e.arrow_up),n.x=Math.round(o.x+o.width/2-this.#n),n.y=Math.round(i.y-this.#s);break;case"left":e.classList.add(this.#e.arrow,this.#e.arrow_right),n.x=Math.round(i.x+a.width-this.#s),n.y=Math.round(o.y+o.height/2-this.#n)}return n}#d(e,t,i){const r=e.getBoundingClientRect(),s=t.getBoundingClientRect(),n=this.#o,o=s.width>r.width?-1:1,a=Math.round(r.x+o*Math.abs(r.width-s.width)/2);switch(i){case"top":default:n.x=a,n.y=Math.round(r.y-s.height-this.#r);break;case"right":n.x=Math.round(r.x+r.width+this.#r),n.y=Math.round(r.y+r.height/2-s.height/2);break;case"bottom":n.x=a,n.y=Math.round(r.y+r.height+this.#r);break;case"left":n.x=Math.round(r.x-s.width-this.#r),n.y=Math.round(r.y+r.height/2-s.height/2)}return n}#l(e){if(!e.target||!e.target.id)return;switch(e.target.id){case this.#e.next:return this.#f();case this.#e.prev:return this.#p();case this.#e.end:case this.#e.quit:case this.#e.active:case this.#e.backdrop:default:return this.#u()}}#x(){try{console.log("Resizing!"),this.#g()}catch(e){throw new Error("Oops something went wrong while resizing!")}}#m(e){const{keyCode:t,which:i}=e,r=i||t||0,s=this.#a(`.${this.#e.active_description}`);function n(){s.classList.remove(this.#e.active_description_animate)}return console.log(r),39===r&&this.#t<this.#i.sequence.length-1?(setTimeout(n.bind(this),200),this.#f()):(s.classList.add(this.#e.active_description_animate),37===r&&this.#t>0?(setTimeout(n.bind(this),200),this.#p()):(s.classList.add(this.#e.active_description_animate),81===r?this.#u():void 0))}#v(e=!1){const t=this.#h(this.#e.backdrop);t&&(e?(window.removeEventListener("resize",i.resizeEventHandler),i.resizeEventHandler=null,window.removeEventListener("keydown",i.keystrokeEventHandler),i.resizeEventHandler=null,t.removeEventListener("click",this.#l.bind(this)),t.parentNode&&t.parentNode.removeChild(t)):(i.resizeEventHandler=this.#x.bind(this),window.addEventListener("resize",i.resizeEventHandler),i.keystrokeEventHandler=this.#m.bind(this),window.addEventListener("keydown",i.keystrokeEventHandler),t.addEventListener("click",this.#l.bind(this))))}#w(e,t,i){function r(e){return e.style.top=Math.round(t.top)+"px",e.style.left=Math.round(t.left)+"px",e.style.height=t.height+"px",e.style.width=t.width+"px",e.style.borderRadius=i.borderRadius,e.style.boxShadow="0 0 0 9999px "+s,e}const{backdropColor:s}=this.#i,n=this.#a(`#${this.#e.backdrop} .${this.#e.active}`);if(!n){const t=document.createElement("div");return t.setAttribute("id",this.#e.active),t.classList.add(this.#e.active),e.append(t),r(t)}return r(n)}#b(e,t){const{sequence:i}=this.#i;let r=this.#a(`#${this.#e.backdrop} .${this.#e.active_description}`);r||(r=document.createElement("div"),r.style.willChange="transform",r.classList.add(this.#e.active_description),r.innerHTML+=`<p id=${this.#e.active_description_text}></p>`,r.innerHTML+=`<div class=${this.#e.footer}>\n        <button id=${this.#e.quit} class=${this.#e.quit}>${this.#e.quit_text}</button>\n        <div>\n          <button id=${this.#e.prev} class=${this.#e.prev}>${this.#e.prev_text}</button>\n          <button id=${this.#e.next} class=${this.#e.next}>${this.#e.next_text}</button>\n        </div>\n      </div>`,e.append(r));const s=this.#h(this.#e.prev),n=this.#h(this.#e.next),o=this.#h(this.#e.end);s&&(0===this.#t?(s.setAttribute("disabled","true"),s.classList.add(this.#e.disabled_button)):(s.removeAttribute("disabled"),s.classList.remove(this.#e.disabled_button))),n&&(1===i.length||this.#t===i.length-1?(n.innerText=this.#e.end_text,n.setAttribute("id",this.#e.end)):n.innerText=this.#e.next_text),o&&this.#t<i.length-1&&(o.innerText=this.#e.next_text,o.setAttribute("id",this.#e.next));const a=this.#a(`#${this.#e.active_description_text}`);if(a)return"string"==typeof t?a.innerHTML=t:a.appendChild(t),r}#y(e){const t=this.#a(`#${this.#e.backdrop} #${this.#e.arrow}`);if(!t){const t=document.createElement("div");return t.setAttribute("id",this.#e.arrow),e.append(t),t}return t}#_(){const e=document.createElement("div");return e.id=this.#e.backdrop,e.classList.add(this.#e.backdrop),e}#g(){const{sequence:e}=this.#i,{element:t,description:i,placement:r}=e[this.#t],s=this.#h(this.#e.backdrop);if(!s)return;let n=this.#o,o=this.#o,a=r;window.innerWidth<=400&&("left"===r||"right"===r)&&(a="bottom");const h=this.#a(t);if(!h)return this.end();const c=this.#a(this.#e.target);if(!c)return;c.classList.add(this.#e.stop_scroll),h.scrollIntoView({behavior:"smooth",block:"center"});let d=getComputedStyle(h),l=h.getBoundingClientRect(),f=this.#w(s,l,d),p=this.#b(s,i),u=this.#y(s);if(!p)return;n=this.#d(h,p,a);let x=p.getBoundingClientRect();n.x+x.width>=window.innerWidth?n.x=Math.round(l.right-x.width+this.#s):n.x<=0&&(n.x=Math.round(l.x-this.#s),x.width>=window.innerWidth&&(p.style.width=window.innerWidth-2*n.x+"px")),p.style.transform="translate3d("+n.x+"px, "+n.y+"px, 0px)",o=this.#c(u,a,n,f,p),u.style.transform="translate3d("+o.x+"px, "+o.y+"px, 0px)"}#f(){return this.#t+=1,this.#g()}#p(){return this.#t-=1,this.#g()}#u(){const e=this.#a(this.#e.target);if(e)return e.classList.remove(this.#e.stop_scroll),this.#v(!0),this.#t=0,this.#i.onComplete?this.#i.onComplete():void 0}createSequence(){try{const e=this.#a(this.#e.target);if(!e)return;e.appendChild(this.#_()),this.#v(),this.#g()}catch(e){throw new Error("Oops, something went wrong while creating the sequence")}}}const r={TooltipSequence:i};TooltipSequenceV2=t})();
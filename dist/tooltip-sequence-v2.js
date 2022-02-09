var TooltipSequenceV2;(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>r});class n{#e={target:"body",next:"tooltip-helper-next-sequence",prev:"tooltip-helper-prev-sequence",end:"tooltip-helper-end-sequence",quit:"tooltip-helper-quit-sequence",backdrop:"tooltip-helper-backdrop",arrow:"tooltip-helper-arrow",arrow_hide:"tooltip-helper-arrow-hide",arrow_down:"tooltip-helper-arrow-down",arrow_left:"tooltip-helper-arrow-left",arrow_up:"tooltip-helper-arrow-up",arrow_right:"tooltip-helper-arrow-right",active:"tooltip-helper-active",active_description:"tooltip-helper-active-description",active_description_animate:"tooltip-helper-active-description-animate",active_description_text:"tooltip-helper-active-description-text",header:"tooltip-helper-header",footer:"tooltip-helper-footer",disabled_button:"tooltip-disabled-btn",stop_scroll:"stop-scroll",step_count:"tooltip-helper-sequence-count",next_text:"Next",prev_text:"Prev",quit_text:"x",end_text:"Finish"};#t={backdropColor:"#1b1b1b8e",sequence:[],onComplete:function(){}};#n=0;#r=15;#i={x:0,y:0};#s=null;#o=null;static resizeEventHandler=null;static keystrokeEventHandler=null;constructor(e){this.#t={...this.#t,...e}}#d(e){return document.querySelector(e)||null}#h(e){return this.#d("#"+e)}#l(e){return e.getBoundingClientRect()}#c(e,t,n){const r=e.getBoundingClientRect(),i=this.#i,s=t.width>r.width?-1:1,o=Math.round(r.x+s*Math.abs(r.width-t.width)/2);switch(n){case"top":default:i.x=o,i.y=Math.round(r.y-t.height-this.#r);break;case"right":i.x=Math.round(r.x+r.width+this.#r),i.y=Math.round(r.y+r.height/2-t.height/2);break;case"bottom":i.x=o,i.y=Math.round(r.y+r.height+this.#r);break;case"left":i.x=Math.round(r.x-t.width-this.#r),i.y=Math.round(r.y+r.height/2-t.height/2)}return i}#a(e){if(!e.target||!e.target.id)return;switch(e.target.id){case this.#e.next:return this.#p();case this.#e.prev:return this.#u();case this.#e.end:case this.#e.quit:case this.#e.backdrop:return this.#f();default:return}}#x(){try{this.#m()}catch(e){throw new Error("Oops something went wrong while resizing!")}}#g(e){const{keyCode:t,which:n}=e,r=n||t||0;return 39===r&&this.#n<this.#t.sequence.length-1?this.#p():37===r&&this.#n>0?this.#u():81===r?this.#f():void 0}#p(){return this.#n+=1,this.#m()}#u(){return this.#n-=1,this.#m()}#f(){const e=this.#d(this.#e.target);if(e)return e.classList.remove(this.#e.stop_scroll),this.#v(!0),this.#n=0,this.#t.onComplete?this.#t.onComplete():void 0}#v(e=!1){if(this.#o)try{return e?(window.removeEventListener("resize",n.resizeEventHandler),n.resizeEventHandler=null,window.removeEventListener("keydown",n.keystrokeEventHandler),n.resizeEventHandler=null,this.#o.removeEventListener("click",this.#a.bind(this)),this.#o.parentNode&&this.#o.parentNode.removeChild(this.#o)):(n.resizeEventHandler=this.#x.bind(this),window.addEventListener("resize",n.resizeEventHandler),n.keystrokeEventHandler=this.#g.bind(this),window.addEventListener("keydown",n.keystrokeEventHandler),this.#o.addEventListener("click",this.#a.bind(this))),!0}catch(e){return console.log(e),!1}}#y(e,t,n){function r(e){return e.style.height=t.height+"px",e.style.width=t.width+"px",e.style.borderRadius=n.borderRadius,e.style.boxShadow="0 0 0 9999px "+i,e.style.transform=`translate3d(${t.x}px, ${t.y}px, 0px)`,e}const{backdropColor:i}=this.#t,s=this.#d(`#${this.#e.backdrop} .${this.#e.active}`),o=this.#d(this.#t.sequence[this.#n].element).innerHTML;if(!s){const t=document.createElement("div");return t.setAttribute("id",this.#e.active),t.classList.add(this.#e.active),t.innerHTML=o,e.append(t),r(t)}return s.innerHTML=o,r(s)}#b(e,t,n,r,i){let s=this.#d(`#${this.#e.backdrop} .${this.#e.active_description}`);s||(s=document.createElement("div"),s.style.willChange="transform",s.classList.add(this.#e.active_description),s.innerHTML+=`<div class=${this.#e.header}>\n        <svg id=${this.#e.quit} class=${this.#e.quit} xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="16"></circle><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="160" y1="160" x2="96" y2="96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>\n      </div>`,s.innerHTML+=`<p id=${this.#e.active_description_text}></p>`,s.innerHTML+=`<div class=${this.#e.footer}>\n        <button id=${this.#e.prev} class=${this.#e.prev}>${this.#e.prev_text}</button>\n        <div id=${this.#e.step_count} class=${this.#e.step_count}></div>\n        <button id=${this.#e.next} class=${this.#e.next}>${this.#e.next_text}</button>\n      </div>`,t.append(s)),this.#w();const o=this.#d(`#${this.#e.active_description_text}`);if(!o)return;"string"==typeof n?o.innerHTML=n:o.appendChild(n);this.#h(this.#e.step_count).innerText=`${this.#n+1} / ${this.#t.sequence.length}`;const d=this.#l(s),h=this.#l(r),l=this.#l(e),c=h.x,a=window.innerWidth-(h.x+h.width);"top"===i?s.style.width="100%":"right"===i&&a<d.width?(s.style.height="auto",s.style.width=a-30+"px"):"bottom"===i?s.style.width="100%":"left"===i&&c-60<d.width&&(s.style.height="auto",s.style.width=c-30+"px");const p=getComputedStyle(s),u=+p.getPropertyValue("height").replace("px",""),f=+p.getPropertyValue("width").replace("px",""),x={x:0,y:0};return x.x=l.x+l.width/2-f/2,x.y=l.y+l.height/2-u/2,"top"===i?x.y=x.y-u/2-20:"right"===i?x.x=x.x+f/2+50:"bottom"===i?x.y=x.y+u/2+20:"left"===i&&(x.x=x.x-f/2-50),s.style.transform="translate3d("+x.x+"px, "+x.y+"px, 0px)",{descBoundaries:d,descriptionElement:s}}#w(){const{sequence:e}=this.#t,t=this.#h(this.#e.prev),n=this.#h(this.#e.next),r=this.#h(this.#e.end);return t&&(0===this.#n?(t.setAttribute("disabled","true"),t.classList.add(this.#e.disabled_button)):(t.removeAttribute("disabled"),t.classList.remove(this.#e.disabled_button))),n&&(1===e.length||this.#n===e.length-1?(n.innerText=this.#e.end_text,n.setAttribute("id",this.#e.end)):n.innerText=this.#e.next_text),r&&this.#n<e.length-1&&(r.innerText=this.#e.next_text,r.setAttribute("id",this.#e.next)),{prevBtn:t,nextBtn:n,finishBtn:r}}#E(){return this.#o=document.createElement("div"),this.#o.id=this.#e.backdrop,this.#o.classList.add(this.#e.backdrop),this.#s.appendChild(this.#o),this.#o}#k(){return this.#s=this.#d(this.#e.target),this.#s}#m(){const{element:e=null,description:t="",placement:n="bottom"}=this.#t.sequence[this.#n];if(!e)return;const r=this.#o;if(!r)return;let i=n;const s=this.#d(e);if(!s)return this.end();const o=this.#s;if(!o)return;o.classList.add(this.#e.stop_scroll),s.scrollIntoView({behavior:"smooth",block:"center"});const d=getComputedStyle(s),h=this.#l(s),l=this.#y(r,h,d),{descriptionElement:c}=this.#b(s,r,t,l,i)}createSequence(){try{if(!this.#k())return;if(!this.#E())return;if(!this.#v())return;this.#m()}catch(e){throw console.log(e),new Error("Oops, something went wrong while creating the sequence")}}}const r={TooltipSequence:n};TooltipSequenceV2=t})();
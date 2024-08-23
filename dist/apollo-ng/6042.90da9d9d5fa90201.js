"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[6042],{6042:(jt,y,r)=>{r.r(y),r.d(y,{KanbanAppModule:()=>Pt});var p=r(6814),_=r(853),w=r(8007),q=r(7394),t=r(8926),x=r(8645),H=r(5619),F=r(9862);let u=(()=>{class n{constructor(e){this.http=e,this._lists=[],this.selectedCard=new x.x,this.selectedListId=new x.x,this.lists=new H.X(this._lists),this.listNames=new x.x,this.lists$=this.lists.asObservable(),this.selectedCard$=this.selectedCard.asObservable(),this.selectedListId$=this.selectedListId.asObservable(),this.listNames$=this.listNames.asObservable(),this.http.get("assets/demo/data/kanban.json").toPromise().then(a=>a.data).then(a=>{this.updateLists(a)})}updateLists(e){this._lists=e;let a=e.map(i=>({listId:i.listId,title:i.title}));this.listNames.next(a),this.lists.next(e)}addList(){const i={listId:this.generateId(),title:"Untitled List",cards:[]};this._lists.push(i),this.lists.next(this._lists)}addCard(e){const s={id:this.generateId(),title:"Untitled card",description:"",progress:"",assignees:[],attachments:0,comments:[],startDate:"",dueDate:"",completed:!1,taskList:{title:"Untitled Task List",tasks:[]}};let l=[];l=this._lists.map(c=>c.listId===e?{...c,cards:[...c.cards||[],s]}:c),this.updateLists(l)}updateCard(e,a){let i=this._lists.map(s=>s.listId===a?{...s,cards:s.cards.map(l=>l.id===e.id?{...e}:l)}:s);this.updateLists(i)}deleteList(e){this._lists=this._lists.filter(a=>a.listId!==e),this.lists.next(this._lists)}copyList(e){let i={...e,listId:this.generateId()};this._lists.push(i),this.lists.next(this._lists)}deleteCard(e,a){let i=[];for(let s=0;s<this._lists.length;s++){let l=this._lists[s];l.listId===a&&l.cards&&(l.cards=l.cards.filter(c=>c.id!==e)),i.push(l)}this.updateLists(i)}copyCard(e,a){let i=[];for(let s=0;s<this._lists.length;s++){let l=this._lists[s];if(l.listId===a&&l.cards){let c=l.cards.indexOf(e),f=this.generateId(),Et={...e,id:f};l.cards.splice(c,0,Et)}i.push(l)}this.updateLists(i)}moveCard(e,a,i){if(e.id){this.deleteCard(e.id,i);let s=this._lists.map(l=>l.listId===a?{...l,cards:[...l.cards||[],e]}:l);this.updateLists(s)}}onCardSelect(e,a){this.selectedCard.next(e),this.selectedListId.next(a)}generateId(){let e="";for(var i=0;i<5;i++)e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return e}isMobileDevice(){return/iPad|iPhone|iPod/.test(navigator.userAgent)||/(android)/i.test(navigator.userAgent)}static#t=this.\u0275fac=function(a){return new(a||n)(t.LFG(F.eN))};static#e=this.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac})}return n})();function U(n,o){if(1&n&&t._UZ(0,"app-kanban-list",4),2&n){const e=o.$implicit,a=t.oxw();t.Q6J("list",e)("listIds",a.listIds)("cdkDragDisabled",a.isMobileDevice)}}let h=(()=>{class n{constructor(e){this.kanbanService=e,this.sidebarVisible=!1,this.lists=[],this.listIds=[],this.subscription=new q.w0,this.isMobileDevice=!1,this.subscription=this.kanbanService.lists$.subscribe(a=>{this.lists=a,this.listIds=this.lists.map(i=>i.listId||"")})}ngOnInit(){this.removeLayoutResponsive(),this.isMobileDevice=this.kanbanService.isMobileDevice()}toggleSidebar(){this.sidebarVisible=!0}addList(){this.kanbanService.addList()}dropList(e){(0,_.bA)(e.container.data,e.previousIndex,e.currentIndex)}removeLayoutResponsive(){this.style=document.createElement("style"),this.style.innerHTML="\n                .layout-content {\n                    width: 100%;\n                }\n                \n                .layout-topbar {\n                    width: 100%;\n                }\n            ",document.head.appendChild(this.style)}ngOnDestroy(){this.subscription.unsubscribe(),document.head.removeChild(this.style)}static#t=this.\u0275fac=function(a){return new(a||n)(t.Y36(u))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["ng-component"]],decls:5,vars:2,consts:[["id","kanban-wrapper","cdkDropList","","cdkDropListOrientation","horizontal",1,"grid","grid-nogutter","w-full","flex-column","md:flex-row","flex-nowrap","gap-5","lg:overflow-y-hidden","overflow-x-auto",3,"cdkDropListData","cdkDropListDropped"],["cdkDrag","","cdkDragHandle","","class","p-kanban-list",3,"list","listIds","cdkDragDisabled",4,"ngFor","ngForOf"],[1,"px-3","py-1","mb-3","md:w-25rem","flex-shrink-0"],["pButton","","pRipple","","label","New List","icon","pi pi-plus font-semibold",1,"py-3","justify-content-center","font-semibold","w-full","border-round",3,"click"],["cdkDrag","","cdkDragHandle","",1,"p-kanban-list",3,"list","listIds","cdkDragDisabled"]],template:function(a,i){1&a&&(t.TgZ(0,"div",0),t.NdJ("cdkDropListDropped",function(l){return i.dropList(l)}),t.YNc(1,U,1,3,"app-kanban-list",1),t.TgZ(2,"div",2)(3,"button",3),t.NdJ("click",function(){return i.addList()}),t.qZA()(),t._UZ(4,"app-kanban-sidebar"),t.qZA()),2&a&&(t.Q6J("cdkDropListData",i.lists),t.xp6(1),t.Q6J("ngForOf",i.lists))},styles:["[_nghost-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar{height:6px}[_nghost-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-track{background:transparent}[_nghost-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:var(--gray-500);border-radius:20px}[_nghost-%COMP%]     .p-button-label{flex:0;white-space:nowrap}[_nghost-%COMP%]     .p-inplace .p-inplace-content .p-inputtext{border-top-right-radius:0;border-bottom-right-radius:0}[_nghost-%COMP%]     .p-inplace .p-inplace-content .p-button{border-top-left-radius:0;border-bottom-left-radius:0;width:3rem;height:3rem}[_nghost-%COMP%]     .p-inplace .p-inplace-display{padding:0}.p-kanban-list[_ngcontent-%COMP%]{cursor:pointer;height:min-content}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:.25}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}"]})}return n})(),V=(()=>{class n{static#t=this.\u0275fac=function(a){return new(a||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[w.Bz.forChild([{path:"",data:{breadcrumb:"Board"},component:h}]),w.Bz]})}return n})();var d=r(6223),m=r(707),g=r(5219),b=r(4480),C=r(3714),I=r(1122),v=r(3259),M=r(7778);function G(n,o){1&n&&t.GkF(0)}const Y=function(n){return{"p-disabled":n}};function P(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"div",3),t.NdJ("click",function(i){t.CHM(e);const s=t.oxw();return t.KtG(s.onActivateClick(i))})("keydown",function(i){t.CHM(e);const s=t.oxw();return t.KtG(s.onKeydown(i))}),t.Hsn(1),t.YNc(2,G,1,0,"ng-container",4),t.qZA()}if(2&n){const e=t.oxw();t.Q6J("ngClass",t.VKq(2,Y,e.disabled)),t.xp6(2),t.Q6J("ngTemplateOutlet",e.displayTemplate)}}function E(n,o){1&n&&t.GkF(0)}function j(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"button",9),t.NdJ("click",function(i){t.CHM(e);const s=t.oxw(3);return t.KtG(s.onDeactivateClick(i))}),t.qZA()}if(2&n){const e=t.oxw(3);t.Q6J("icon",e.closeIcon),t.uIk("aria-label",e.closeAriaLabel)}}function B(n,o){1&n&&t._UZ(0,"TimesIcon")}function $(n,o){}function R(n,o){1&n&&t.YNc(0,$,0,0,"ng-template")}function z(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"button",10),t.NdJ("click",function(i){t.CHM(e);const s=t.oxw(3);return t.KtG(s.onDeactivateClick(i))}),t.YNc(1,B,1,0,"TimesIcon",6),t.YNc(2,R,1,0,null,4),t.qZA()}if(2&n){const e=t.oxw(3);t.Q6J("ngClass","p-button-icon-only"),t.uIk("aria-label",e.closeAriaLabel),t.xp6(1),t.Q6J("ngIf",!e.closeIconTemplate),t.xp6(1),t.Q6J("ngTemplateOutlet",e.closeIconTemplate)}}function X(n,o){if(1&n&&(t.ynx(0),t.YNc(1,j,1,2,"button",7),t.YNc(2,z,3,4,"button",8),t.BQk()),2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("ngIf",e.closeIcon),t.xp6(1),t.Q6J("ngIf",!e.closeIcon)}}function W(n,o){if(1&n&&(t.TgZ(0,"div",5),t.Hsn(1,1),t.YNc(2,E,1,0,"ng-container",4),t.YNc(3,X,3,2,"ng-container",6),t.qZA()),2&n){const e=t.oxw();t.xp6(2),t.Q6J("ngTemplateOutlet",e.contentTemplate),t.xp6(1),t.Q6J("ngIf",e.closable)}}const tt=[[["","pInplaceDisplay",""]],[["","pInplaceContent",""]]],et=function(n){return{"p-inplace p-component":!0,"p-inplace-closable":n}},nt=["[pInplaceDisplay]","[pInplaceContent]"];let Z=(()=>{class n{cd;active=!1;closable=!1;disabled=!1;preventClick;style;styleClass;closeIcon;closeAriaLabel;onActivate=new t.vpe;onDeactivate=new t.vpe;templates;hover;displayTemplate;contentTemplate;closeIconTemplate;constructor(e){this.cd=e}ngAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"display":this.displayTemplate=e.template;break;case"closeicon":this.closeIconTemplate=e.template;break;case"content":this.contentTemplate=e.template}})}onActivateClick(e){this.preventClick||this.activate(e)}onDeactivateClick(e){this.preventClick||this.deactivate(e)}activate(e){this.disabled||(this.active=!0,this.onActivate.emit(e),this.cd.markForCheck())}deactivate(e){this.disabled||(this.active=!1,this.hover=!1,this.onDeactivate.emit(e),this.cd.markForCheck())}onKeydown(e){"Enter"===e.code&&(this.activate(e),e.preventDefault())}static \u0275fac=function(a){return new(a||n)(t.Y36(t.sBO))};static \u0275cmp=t.Xpm({type:n,selectors:[["p-inplace"]],contentQueries:function(a,i,s){if(1&a&&t.Suo(s,g.jx,4),2&a){let l;t.iGM(l=t.CRH())&&(i.templates=l)}},hostAttrs:[1,"p-element"],inputs:{active:"active",closable:"closable",disabled:"disabled",preventClick:"preventClick",style:"style",styleClass:"styleClass",closeIcon:"closeIcon",closeAriaLabel:"closeAriaLabel"},outputs:{onActivate:"onActivate",onDeactivate:"onDeactivate"},ngContentSelectors:nt,decls:3,vars:9,consts:[[3,"ngClass","ngStyle"],["class","p-inplace-display","tabindex","0","role","button",3,"ngClass","click","keydown",4,"ngIf"],["class","p-inplace-content",4,"ngIf"],["tabindex","0","role","button",1,"p-inplace-display",3,"ngClass","click","keydown"],[4,"ngTemplateOutlet"],[1,"p-inplace-content"],[4,"ngIf"],["type","button","pButton","",3,"icon","click",4,"ngIf"],["type","button","pButton","",3,"ngClass","click",4,"ngIf"],["type","button","pButton","",3,"icon","click"],["type","button","pButton","",3,"ngClass","click"]],template:function(a,i){1&a&&(t.F$t(tt),t.TgZ(0,"div",0),t.YNc(1,P,3,4,"div",1),t.YNc(2,W,4,2,"div",2),t.qZA()),2&a&&(t.Tol(i.styleClass),t.Q6J("ngClass",t.VKq(7,et,i.closable))("ngStyle",i.style),t.uIk("aria-live","polite"),t.xp6(1),t.Q6J("ngIf",!i.active),t.xp6(1),t.Q6J("ngIf",i.active))},dependencies:function(){return[p.mk,p.O5,p.tP,p.PC,m.Hq,M.q]},styles:["@layer primeng{.p-inplace .p-inplace-display{display:inline;cursor:pointer}.p-inplace .p-inplace-content{display:inline}.p-fluid .p-inplace.p-inplace-closable .p-inplace-content{display:flex}.p-fluid .p-inplace.p-inplace-closable .p-inplace-content>.p-inputtext{flex:1 1 auto;width:1%}}\n"],encapsulation:2,changeDetection:0})}return n})(),it=(()=>{class n{static \u0275fac=function(a){return new(a||n)};static \u0275mod=t.oAB({type:n});static \u0275inj=t.cJS({imports:[p.ez,m.hJ,g.m8,M.q,m.hJ,g.m8]})}return n})();var k=r(6651),T=r(8039),D=r(8676),A=r(315);function at(n,o){if(1&n&&(t.TgZ(0,"div",12),t._uU(1),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Oqu(e.card.description)}}const st=function(){return{height:".5rem"}};function ot(n,o){if(1&n&&t._UZ(0,"p-progressBar",13),2&n){const e=t.oxw();t.Akn(t.DdM(4,st)),t.Q6J("value",e.card.progress)("showValue",!1)}}function lt(n,o){1&n&&t._UZ(0,"p-avatar",14),2&n&&t.MGl("image","assets/demo/images/avatar/",o.$implicit.image,"")}function rt(n,o){if(1&n&&t._UZ(0,"p-avatar",15),2&n){const e=t.oxw();t.MGl("label","+ ",e.card.assignees.length-3,"")}}function ct(n,o){if(1&n&&(t.TgZ(0,"span",2),t._UZ(1,"i",18),t._uU(2),t.qZA()),2&n){const e=t.oxw(2);t.xp6(2),t.Oqu(e.generateTaskInfo())}}function pt(n,o){if(1&n&&(t.TgZ(0,"span",2),t._UZ(1,"i",19),t._uU(2),t.qZA()),2&n){const e=t.oxw(2);t.xp6(2),t.Oqu(e.card.attachments)}}function dt(n,o){if(1&n&&(t.TgZ(0,"span",2),t._UZ(1,"i",20),t._uU(2),t.qZA()),2&n){const e=t.oxw(2);t.xp6(2),t.Oqu(e.parseDate(e.card.dueDate))}}function _t(n,o){if(1&n&&(t.TgZ(0,"div",16),t.YNc(1,ct,3,1,"span",17),t.YNc(2,pt,3,1,"span",17),t.YNc(3,dt,3,1,"span",17),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.card.taskList.tasks.length),t.xp6(1),t.Q6J("ngIf",e.card.attachments),t.xp6(1),t.Q6J("ngIf",e.card.dueDate)}}let mt=(()=>{class n{constructor(e){this.kanbanService=e,this.menuItems=[],this.subscription=this.kanbanService.lists$.subscribe(a=>{let i=a.map(s=>({id:s.listId,label:s.title,command:()=>this.onMove(s.listId)}));this.generateMenu(i)})}parseDate(e){return new Date(e).toDateString().split(" ").slice(1,3).join(" ")}onDelete(){this.kanbanService.deleteCard(this.card.id,this.listId)}onCopy(){this.kanbanService.copyCard(this.card,this.listId)}onMove(e){this.kanbanService.moveCard(this.card,e,this.listId)}generateMenu(e){this.menuItems=[{label:"Copy card",command:()=>this.onCopy()},{label:"Move card",items:e},{label:"Delete card",command:()=>this.onDelete()}]}generateTaskInfo(){let e=this.card.taskList.tasks.length;return`${this.card.taskList.tasks.filter(i=>i.completed).length} / ${e}`}ngOnDestroy(){this.subscription.unsubscribe()}static#t=this.\u0275fac=function(a){return new(a||n)(t.Y36(u))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-kanban-card"]],inputs:{card:"card",listId:"listId"},decls:16,vars:13,consts:[[1,"flex","surface-card","flex-column","w-full","border-1","surface-border","p-3","gap-5","hover:surface-ground","cursor-pointer","border-round",3,"id"],[1,"flex","justify-content-between","align-items-center"],[1,"text-900","font-semibold"],["pButton","","pRipple","","type","button","icon","pi pi-ellipsis-v",1,"p-button-rounded","p-button-text","p-button-secondary","p-trigger",3,"click"],["appendTo","body",3,"model","popup"],["menu",""],["style","word-break: break-word","class","text-700",4,"ngIf"],[3,"value","showValue","style",4,"ngIf"],[1,"flex","align-items-center","justify-content-between","flex-column","md:flex-row","gap-4","md:gap-0"],["shape","circle","styleClass","border-2 surface-border",3,"image",4,"ngFor","ngForOf"],["shape","circle","styleClass","border-2 surface-border mb-1 surface-ground",3,"label",4,"ngIf"],["class","flex align-items-center gap-3",4,"ngIf"],[1,"text-700",2,"word-break","break-word"],[3,"value","showValue"],["shape","circle","styleClass","border-2 surface-border",3,"image"],["shape","circle","styleClass","border-2 surface-border mb-1 surface-ground",3,"label"],[1,"flex","align-items-center","gap-3"],["class","text-900 font-semibold",4,"ngIf"],[1,"pi","pi-check-square","text-700","mr-2"],[1,"pi","pi-paperclip","text-700","mr-2"],[1,"pi","pi-clock","text-700","mr-2"]],template:function(a,i){if(1&a){const s=t.EpF();t.TgZ(0,"div",0)(1,"div",1)(2,"span",2),t._uU(3),t.qZA(),t.TgZ(4,"div")(5,"button",3),t.NdJ("click",function(c){t.CHM(s);const f=t.MAs(7);return t.KtG(f.toggle(c))}),t.qZA(),t._UZ(6,"p-tieredMenu",4,5),t.qZA()(),t.YNc(8,at,2,1,"div",6),t.YNc(9,ot,1,5,"p-progressBar",7),t.TgZ(10,"div",8)(11,"p-avatarGroup"),t.YNc(12,lt,1,1,"p-avatar",9),t.ALo(13,"slice"),t.YNc(14,rt,1,1,"p-avatar",10),t.qZA(),t.YNc(15,_t,4,3,"div",11),t.qZA()()}2&a&&(t.Q6J("id",i.card.id),t.xp6(3),t.Oqu(i.card.title?i.card.title:"Untitled"),t.xp6(3),t.Q6J("model",i.menuItems)("popup",!0),t.xp6(2),t.Q6J("ngIf",i.card.description),t.xp6(1),t.Q6J("ngIf",i.card.taskList.tasks.length),t.xp6(3),t.Q6J("ngForOf",t.Dn7(13,9,i.card.assignees,0,3)),t.xp6(2),t.Q6J("ngIf",i.card.assignees&&i.card.assignees.length>3),t.xp6(1),t.Q6J("ngIf",i.card.attachments||i.card.dueDate))},dependencies:[p.sg,p.O5,m.Hq,b.H,k.k,T.q,D.H,A.yp,p.OU],encapsulation:2})}return n})();const ut=["inputEl"],gt=["listEl"];function bt(n,o){if(1&n&&(t.TgZ(0,"span",14),t._uU(1),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Oqu(e.list.title)}}function ft(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"input",15,16),t.NdJ("ngModelChange",function(i){t.CHM(e);const s=t.oxw();return t.KtG(s.list.title=i)})("keydown.enter",function(){t.CHM(e),t.oxw();const i=t.MAs(3);return t.KtG(i.deactivate())}),t.qZA()}if(2&n){const e=t.oxw();t.Q6J("value",e.list.title)("ngModel",e.list.title)}}function ht(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"app-kanban-card",17),t.NdJ("click",function(i){const l=t.CHM(e).$implicit,c=t.oxw();return t.KtG(c.onCardClick(i,l))}),t.qZA()}if(2&n){const e=o.$implicit,a=t.oxw();t.Q6J("card",e)("listId",a.list.listId)("cdkDragDisabled",a.isMobileDevice)}}let xt=(()=>{class n{constructor(e,a){this.parent=e,this.kanbanService=a,this.menuItems=[],this.title="",this.timeout=null,this.isMobileDevice=!1}ngOnInit(){this.isMobileDevice=this.kanbanService.isMobileDevice(),this.menuItems=[{label:"List actions",items:[{separator:!0},{label:"Copy list",command:()=>this.onCopy(this.list)},{label:"Remove list",command:()=>{this.list.listId&&this.onDelete(this.list.listId)}}]}]}toggleSidebar(){this.parent.sidebarVisible=!0}onDelete(e){this.kanbanService.deleteList(e)}onCopy(e){this.kanbanService.copyList(e)}onCardClick(e,a){const i=e.target;i.classList.contains("p-button-icon")||i.classList.contains("p-trigger")||(this.list.listId&&this.kanbanService.onCardSelect(a,this.list.listId),this.parent.sidebarVisible=!0)}insertCard(){this.list.listId&&this.kanbanService.addCard(this.list.listId)}dropCard(e){e.previousContainer===e.container?(0,_.bA)(e.container.data,e.previousIndex,e.currentIndex):(0,_.EA)(e.previousContainer.data,e.container.data,e.previousIndex,e.currentIndex)}focus(){this.timeout=setTimeout(()=>this.inputEl.nativeElement.focus(),1)}insertHeight(e){e.container.element.nativeElement.style.minHeight="10rem"}removeHeight(e){e.container.element.nativeElement.style.minHeight="2rem"}static#t=this.\u0275fac=function(a){return new(a||n)(t.Y36(h),t.Y36(u))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-kanban-list"]],viewQuery:function(a,i){if(1&a&&(t.Gf(ut,5),t.Gf(gt,5)),2&a){let s;t.iGM(s=t.CRH())&&(i.inputEl=s.first),t.iGM(s=t.CRH())&&(i.listEl=s.first)}},inputs:{list:"list",listIds:"listIds"},decls:15,vars:7,consts:[[1,"card","md:w-25rem","overflow-hidden"],[1,"flex","justify-content-between","align-items-center","w-full","h-3rem"],["closeIcon","pi pi-check","styleClass","h-auto",3,"closable","onActivate"],["inplace",""],["pTemplate","display"],["pTemplate","content"],["pButton","","pRipple","","type","button","icon","pi pi-ellipsis-h",1,"p-button-rounded","p-button-text","p-button-secondary",3,"click"],[3,"model","popup"],["menu",""],["cdkDropList","",1,"flex","flex-column","gap-5","overflow-y-auto","mt-4","scrollable","kanban-list",2,"min-height","2rem",3,"id","cdkDropListData","cdkDropListConnectedTo","cdkDropListDropped","cdkDropListEntered","cdkDropListExited"],["listEl",""],["cdkDrag","","cdkDragHandle","",3,"card","listId","cdkDragDisabled","click",4,"ngFor","ngForOf"],[1,"px-4","mb-3","w-full","mt-4","flex"],["pButton","","pRipple","","label","New Card","icon","pi pi-plus font-semibold",1,"py-3","justify-content-center","font-semibold","w-full","border-round",3,"click"],["pTooltip","Click to edit","tooltipPosition","top",1,"block","text-900","font-semibold","mt-4","pl-2","text-lg",2,"word-break","break-word"],["type","text","pInputText","",1,"w-10rem","sm:w-15rem","h-3rem","text-900","text-lg",3,"value","ngModel","ngModelChange","keydown.enter"],["inputEl",""],["cdkDrag","","cdkDragHandle","",3,"card","listId","cdkDragDisabled","click"]],template:function(a,i){if(1&a){const s=t.EpF();t.TgZ(0,"div",0)(1,"div",1)(2,"p-inplace",2,3),t.NdJ("onActivate",function(){return i.focus()}),t.YNc(4,bt,2,1,"ng-template",4),t.YNc(5,ft,2,2,"ng-template",5),t.qZA(),t.TgZ(6,"div")(7,"button",6),t.NdJ("click",function(c){t.CHM(s);const f=t.MAs(9);return t.KtG(f.toggle(c))}),t.qZA(),t._UZ(8,"p-menu",7,8),t.qZA()(),t.TgZ(10,"div",9,10),t.NdJ("cdkDropListDropped",function(c){return i.dropCard(c)})("cdkDropListEntered",function(c){return i.insertHeight(c)})("cdkDropListExited",function(c){return i.removeHeight(c)}),t.YNc(12,ht,1,3,"app-kanban-card",11),t.qZA(),t.TgZ(13,"div",12)(14,"button",13),t.NdJ("click",function(){return i.insertCard()}),t.qZA()()()}2&a&&(t.xp6(2),t.Q6J("closable",!0),t.xp6(6),t.Q6J("model",i.menuItems)("popup",!0),t.xp6(2),t.Q6J("id",i.list.listId)("cdkDropListData",i.list.cards)("cdkDropListConnectedTo",i.listIds),t.xp6(2),t.Q6J("ngForOf",i.list.cards))},dependencies:[p.sg,d.Fj,d.JJ,d.On,_.Wj,_.Zt,_.Bh,m.Hq,g.jx,b.H,C.o,I.v2,v.u,Z,mt],styles:["[_nghost-%COMP%]     .p-button-label{flex:0;white-space:nowrap}[_nghost-%COMP%]     .scrollable{scroll-behavior:smooth;max-height:70vh}[_nghost-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar{width:6px}[_nghost-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-track{background:transparent}[_nghost-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:var(--gray-500);border-radius:20px}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:.25}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}"]})}return n})();var Ct=r(9753),K=r(6760),L=r(6218),S=r(9246),J=r(7327),N=r(8454),O=r(8057);const vt=["inputTitle"],kt=["inputTaskListTitle"];function Tt(n,o){if(1&n&&(t.TgZ(0,"span",41),t._uU(1),t.qZA()),2&n){const e=t.oxw(3);t.xp6(1),t.Oqu(e.formValue.title?e.formValue.title:"Untitled")}}function yt(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"input",42,43),t.NdJ("ngModelChange",function(i){t.CHM(e);const s=t.oxw(3);return t.KtG(s.formValue.title=i)})("keydown.enter",function(){t.CHM(e),t.oxw();const i=t.MAs(3);return t.KtG(i.deactivate())}),t.qZA()}if(2&n){const e=t.oxw(3);t.Q6J("ngModel",e.formValue.title)}}function wt(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"span",48),t.NdJ("click",function(){const s=t.CHM(e).$implicit,l=t.oxw(4);return t.KtG(l.onMove(s.listId||""))}),t._uU(1),t.qZA()}if(2&n){const e=o.$implicit;t.xp6(1),t.Oqu(e.title)}}function It(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"div",44)(1,"div",45)(2,"span",46),t._uU(3,"Move to..."),t.qZA(),t.YNc(4,wt,2,1,"span",47),t.qZA(),t.TgZ(5,"div",45)(6,"span",46),t._uU(7,"Tasks"),t.qZA(),t.TgZ(8,"span",48),t.NdJ("click",function(){t.CHM(e);const i=t.oxw(3);return t.KtG(i.addTaskList())}),t._uU(9,"Create a tasklist"),t.qZA()()()}if(2&n){const e=t.oxw(3);t.xp6(4),t.Q6J("ngForOf",e.listNames)}}function Mt(n,o){if(1&n&&(t.TgZ(0,"div",49)(1,"div",50)(2,"span",51),t._uU(3,"Progress"),t.qZA(),t.TgZ(4,"span",51),t._uU(5),t.qZA()(),t._UZ(6,"p-progressBar",52),t.qZA()),2&n){const e=t.oxw(3);t.xp6(5),t.hij("",e.formValue.progress,"%"),t.xp6(1),t.Q6J("value",e.formValue.progress)("showValue",!1)}}function Zt(n,o){if(1&n&&(t.TgZ(0,"span",58),t._uU(1),t.qZA()),2&n){const e=t.oxw(4);t.xp6(1),t.Oqu(e.formValue.taskList.title)}}function Dt(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"input",59,60),t.NdJ("ngModelChange",function(i){t.CHM(e);const s=t.oxw(4);return t.KtG(s.formValue.taskList.title=i)})("keydown.enter",function(){t.CHM(e),t.oxw();const i=t.MAs(3);return t.KtG(i.deactivate())}),t.qZA()}if(2&n){const e=t.oxw(4);t.Q6J("ngModel",e.formValue.taskList.title)}}const At=function(n,o){return{"text-600 line-through":n,"text-900":o}};function Kt(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"li",63)(1,"p-checkbox",64),t.NdJ("ngModelChange",function(i){const l=t.CHM(e).$implicit;return t.KtG(l.completed=i)})("onChange",function(){t.CHM(e);const i=t.oxw(5);return t.KtG(i.calculateProgress())}),t.qZA(),t.TgZ(2,"span",65),t._uU(3),t.qZA()()}if(2&n){const e=o.$implicit,a=o.index;t.xp6(1),t.Q6J("name",e.text+a)("ngModel",e.completed)("binary",!0)("inputId",e.text),t.xp6(1),t.Q6J("ngClass",t.WLB(6,At,e.completed,!e.completed)),t.xp6(1),t.hij(" ",e.text," ")}}function Lt(n,o){if(1&n&&(t.TgZ(0,"ul",61),t.YNc(1,Kt,4,9,"li",62),t.qZA()),2&n){const e=t.oxw(4);t.xp6(1),t.Q6J("ngForOf",null==e.formValue.taskList?null:e.formValue.taskList.tasks)}}function St(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"div",49)(1,"div",53)(2,"p-inplace",54,55),t.NdJ("onActivate",function(){t.CHM(e);const i=t.oxw(3);return t.KtG(i.focus(2))}),t.YNc(4,Zt,2,1,"ng-template",8),t.YNc(5,Dt,2,1,"ng-template",3),t.qZA()(),t.TgZ(6,"textarea",56),t.NdJ("ngModelChange",function(i){t.CHM(e);const s=t.oxw(3);return t.KtG(s.taskContent=i)})("keydown.enter",function(i){t.CHM(e);const s=t.oxw(3);return t.KtG(s.addTask(i))}),t.qZA(),t.YNc(7,Lt,2,1,"ul",57),t.qZA()}if(2&n){const e=t.oxw(3);t.xp6(2),t.Q6J("closable",!0),t.xp6(4),t.Q6J("ngModel",e.taskContent),t.xp6(1),t.Q6J("ngIf",0!==(null==e.formValue.taskList||null==e.formValue.taskList.tasks?null:e.formValue.taskList.tasks.length))}}function Jt(n,o){if(1&n&&(t.TgZ(0,"div",66),t._UZ(1,"img",67),t.TgZ(2,"span",68),t._uU(3),t.qZA()()),2&n){const e=o.$implicit;t.xp6(1),t.MGl("src","assets/demo/images/avatar/",e.image,"",t.LSH),t.Q6J("alt",e.name),t.xp6(2),t.Oqu(e.name)}}function Nt(n,o){if(1&n&&(t.TgZ(0,"div",69),t._UZ(1,"img",67),t.TgZ(2,"span",68),t._uU(3),t.qZA()()),2&n){const e=o.$implicit;t.xp6(1),t.MGl("src","assets/demo/images/avatar/",e.image,"",t.LSH),t.Q6J("alt",e.name),t.xp6(2),t.Oqu(e.name)}}function Ot(n,o){if(1&n&&t._UZ(0,"p-avatar",77),2&n){const e=t.oxw().$implicit;t.MGl("image","assets/demo/images/avatar/",e.image,"")}}function Qt(n,o){1&n&&t._UZ(0,"p-avatar",78)}function qt(n,o){if(1&n&&(t.TgZ(0,"div",69),t.YNc(1,Ot,1,1,"p-avatar",70),t.YNc(2,Qt,1,0,"p-avatar",71),t.TgZ(3,"div",72)(4,"div",73)(5,"span",74),t._uU(6),t.qZA(),t.TgZ(7,"span",75),t._uU(8,"1 Jun 17:58 pm"),t.qZA()(),t.TgZ(9,"span",76),t._uU(10),t.qZA()()()),2&n){const e=o.$implicit;t.xp6(1),t.Q6J("ngIf",e.image),t.xp6(1),t.Q6J("ngIf",!e.image),t.xp6(4),t.Oqu(e.name),t.xp6(4),t.Oqu(null==e?null:e.text)}}const Q=function(){return{height:"3.5rem"}},Ht=function(){return{height:"2.5rem"}};function Ft(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"form",4),t.NdJ("submit",function(i){t.CHM(e);const s=t.oxw(2);return t.KtG(s.onSave(i))}),t.TgZ(1,"div",5)(2,"p-inplace",6,7),t.NdJ("onActivate",function(){t.CHM(e);const i=t.oxw(2);return t.KtG(i.focus(1))}),t.YNc(4,Tt,2,1,"ng-template",8),t.YNc(5,yt,2,1,"ng-template",3),t.qZA(),t.TgZ(6,"div",9)(7,"button",10),t.NdJ("click",function(i){t.CHM(e);const s=t.MAs(10);return t.KtG(s.toggle(i))}),t.qZA(),t.TgZ(8,"button",11),t.NdJ("click",function(){t.CHM(e);const i=t.oxw(2);return t.KtG(i.close())}),t.qZA(),t.TgZ(9,"p-overlayPanel",null,12),t.YNc(11,It,10,1,"ng-template",13),t.qZA()()(),t.TgZ(12,"div",14)(13,"div",15)(14,"label",16),t._uU(15,"Description"),t.qZA(),t.TgZ(16,"textarea",17),t.NdJ("ngModelChange",function(i){t.CHM(e);const s=t.oxw(2);return t.KtG(s.formValue.description=i)}),t.qZA()(),t.TgZ(17,"div",18)(18,"div",19)(19,"label",16),t._uU(20,"Start Date"),t.qZA(),t.TgZ(21,"span",20),t._UZ(22,"i",21),t.TgZ(23,"p-calendar",22),t.NdJ("ngModelChange",function(i){t.CHM(e);const s=t.oxw(2);return t.KtG(s.formValue.startDate=i)}),t.qZA()()(),t.TgZ(24,"div",19)(25,"label",23),t._uU(26,"Due Date"),t.qZA(),t.TgZ(27,"span",20),t._UZ(28,"i",21),t.TgZ(29,"p-calendar",24),t.NdJ("ngModelChange",function(i){t.CHM(e);const s=t.oxw(2);return t.KtG(s.formValue.dueDate=i)}),t.qZA()()()(),t.YNc(30,Mt,7,3,"div",25),t.YNc(31,St,8,3,"div",25),t.TgZ(32,"div",26)(33,"label",27),t._uU(34,"Assignees"),t.qZA(),t.TgZ(35,"p-autoComplete",28),t.NdJ("ngModelChange",function(i){t.CHM(e);const s=t.oxw(2);return t.KtG(s.formValue.assignees=i)})("completeMethod",function(i){t.CHM(e);const s=t.oxw(2);return t.KtG(s.filterAssignees(i))}),t.YNc(36,Jt,4,3,"ng-template",29),t.YNc(37,Nt,4,3,"ng-template",30),t.qZA()(),t.TgZ(38,"div",31)(39,"span",32),t._uU(40,"Comments"),t.qZA(),t.TgZ(41,"div",33),t._UZ(42,"p-avatar",34),t.TgZ(43,"textarea",35),t.NdJ("ngModelChange",function(i){t.CHM(e);const s=t.oxw(2);return t.KtG(s.comment=i)})("keydown.enter",function(i){t.CHM(e);const s=t.oxw(2);return t.KtG(s.onComment(i))}),t.qZA()(),t.YNc(44,qt,11,4,"div",36),t.qZA()(),t.TgZ(45,"div",37),t._UZ(46,"button",38),t.TgZ(47,"button",39),t.NdJ("click",function(){t.CHM(e);const i=t.oxw(2);return t.KtG(i.onDelete())}),t.qZA(),t._UZ(48,"button",40),t.qZA()()}if(2&n){t.oxw();const e=t.MAs(1),a=t.oxw();t.xp6(2),t.Q6J("closable",!0),t.xp6(14),t.Q6J("rows",5)("ngModel",a.formValue.description),t.xp6(7),t.Q6J("appendTo",e)("showTime",!1)("required",!0)("inputStyle",t.DdM(23,Q))("ngModel",a.formValue.startDate),t.xp6(6),t.Q6J("appendTo",e)("showTime",!1)("required",!0)("inputStyle",t.DdM(24,Q))("ngModel",a.formValue.dueDate),t.xp6(1),t.Q6J("ngIf",a.formValue.taskList.tasks.length||a.showTaskContainer),t.xp6(1),t.Q6J("ngIf",a.formValue.taskList.tasks.length||a.showTaskContainer),t.xp6(4),t.Q6J("appendTo",e)("ngModel",a.formValue.assignees)("suggestions",a.filteredAssignees)("multiple",!0)("showEmptyMessage",!0)("inputStyle",t.DdM(25,Ht)),t.xp6(8),t.Q6J("ngModel",a.comment),t.xp6(1),t.Q6J("ngForOf",a.formValue.comments)}}function Ut(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"p-sidebar",1,2),t.NdJ("visibleChange",function(i){t.CHM(e);const s=t.oxw();return t.KtG(s.parent.sidebarVisible=i)}),t.YNc(2,Ft,49,26,"ng-template",3),t.qZA()}if(2&n){const e=t.oxw();t.Q6J("visible",e.parent.sidebarVisible)("baseZIndex",1e4)("showCloseIcon",!1)}}let Vt=(()=>{class n{constructor(e,a,i){this.parent=e,this.memberService=a,this.kanbanService=i,this.card={id:"",taskList:{title:"Untitled Task List",tasks:[]}},this.listId="",this.filteredAssignees=[],this.assignees=[],this.newComment={id:"123",name:"Jane Cooper",text:""},this.newTask={text:"",completed:!1},this.comment="",this.taskContent="",this.timeout=null,this.showTaskContainer=!1,this.menuItems=[],this.listNames=[],this.memberService.getMembers().then(s=>this.assignees=s),this.cardSubscription=this.kanbanService.selectedCard$.subscribe(s=>{this.card=s,this.formValue={...s}}),this.listSubscription=this.kanbanService.selectedListId$.subscribe(s=>this.listId=s),this.listNameSubscription=this.kanbanService.listNames$.subscribe(s=>this.listNames=s)}ngOnDestroy(){this.cardSubscription.unsubscribe(),this.listSubscription.unsubscribe(),this.listNameSubscription.unsubscribe(),clearTimeout(this.timeout)}close(){this.parent.sidebarVisible=!1,this.resetForm()}filterAssignees(e){let a=[],i=e.query;for(let s=0;s<this.assignees.length;s++){let l=this.assignees[s];l.name&&0==l.name.toLowerCase().indexOf(i.toLowerCase())&&a.push(l)}this.filteredAssignees=a}onComment(e){e.preventDefault(),this.comment.trim().length>0&&(this.newComment={...this.newComment,text:this.comment},this.formValue?.comments?.unshift(this.newComment),this.comment="")}onSave(e){e.preventDefault(),this.card={...this.formValue},this.kanbanService.updateCard(this.card,this.listId),this.close()}onMove(e){this.kanbanService.moveCard(this.formValue,e,this.listId)}onDelete(){this.kanbanService.deleteCard(this.formValue?.id||"",this.listId),this.parent.sidebarVisible=!1,this.resetForm()}resetForm(){this.formValue={id:"",taskList:{title:"Untitled Task List",tasks:[]}}}addTaskList(){if(this.showTaskContainer=!this.showTaskContainer,this.showTaskContainer&&!this.formValue.taskList){let e=this.kanbanService.generateId();this.formValue={...this.formValue,taskList:{id:e,title:"Untitled Task List",tasks:[]}}}}addTask(e){e.preventDefault(),this.taskContent.trim().length>0&&(this.newTask={text:this.taskContent,completed:!1},this.formValue.taskList?.tasks.unshift(this.newTask),this.taskContent="",this.calculateProgress())}focus(e){1==e&&(this.timeout=setTimeout(()=>this.inputTitle.nativeElement.focus(),1)),2==e&&(this.timeout=setTimeout(()=>this.inputTaskListTitle.nativeElement.focus(),1))}calculateProgress(){if(this.formValue.taskList){let e=this.formValue.taskList.tasks.filter(a=>a.completed).length;this.formValue.progress=Math.round(e/this.formValue.taskList.tasks.length*100)}}static#t=this.\u0275fac=function(a){return new(a||n)(t.Y36(h),t.Y36(Ct.n),t.Y36(u))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-kanban-sidebar"]],viewQuery:function(a,i){if(1&a&&(t.Gf(vt,5),t.Gf(kt,5)),2&a){let s;t.iGM(s=t.CRH())&&(i.inputTitle=s.first),t.iGM(s=t.CRH())&&(i.inputTaskListTitle=s.first)}},decls:1,vars:1,consts:[["position","right","styleClass","w-full md:w-8 lg:w-6 xl:w-5",3,"visible","baseZIndex","showCloseIcon","visibleChange",4,"ngIf"],["position","right","styleClass","w-full md:w-8 lg:w-6 xl:w-5",3,"visible","baseZIndex","showCloseIcon","visibleChange"],["sidebar",""],["pTemplate","content"],[3,"submit"],[1,"px-4","py-6","border-bottom-1","surface-border","flex","align-items-center","justify-content-between","h-4rem"],["closeIcon","pi pi-check","styleClass","h-3rem","styleClass","white-space-nowrap",3,"closable","onActivate"],["inplace",""],["pTemplate","display"],[1,"flex"],["pButton","","pRipple","","type","button","icon","pi pi-cog","pTooltip","card actions","tooltipPosition","left",1,"p-button-rounded","p-button-text","p-button-secondary",3,"click"],["pButton","","pRipple","","type","button","icon","pi pi-times",1,"p-button-rounded","p-button-text","p-button-secondary",3,"click"],["op",""],["pTemplate",""],[1,"grid","grid-nogutter","gap-5","pt-5","flex-wrap","flex-1","flex","flex-column"],[1,"col-12","field","px-5"],["for","start",1,"block","text-900","font-semibold"],["id","description","name","description","type","text","pInputTextarea","",1,"w-full",2,"resize","none",3,"rows","ngModel","ngModelChange"],[1,"col-12","px-5","flex","gap-5"],[1,"flex","flex-column","field","w-full"],[1,"p-input-icon-left","w-full",2,"height","3.5rem"],[1,"pi","pi-clock","z-1",2,"left","1.5rem"],["name","startDate","dateFormat","yy-mm-dd","inputId","start","inputStyleClass","w-full pl-7 text-900 font-semibold","styleClass","w-full",3,"appendTo","showTime","required","inputStyle","ngModel","ngModelChange"],["for","due",1,"block","text-900","font-semibold"],["name","endDate","dateFormat","yy-mm-dd","inputId","due","inputStyleClass","w-full pl-7 text-900 font-semibold","styleClass","w-full",3,"appendTo","showTime","required","inputStyle","ngModel","ngModelChange"],["class","col-12 flex flex-column px-5",4,"ngIf"],[1,"col-12","flex","flex-column","field","px-5"],["for","assignees",1,"block","text-900","font-semibold","mb-3"],["name","assignees","field","name","emptyMessage","No results found","placeholder","Choose assignees",3,"appendTo","ngModel","suggestions","multiple","showEmptyMessage","inputStyle","ngModelChange","completeMethod"],["pTemplate","selectedItem"],["pTemplate","item"],[1,"col-12","flex","flex-column","row-gap-4","px-5","mb-6"],[1,"block","text-900","font-semibold"],[1,"flex","align-items-center"],["icon","pi pi-user","shape","circle","size","large",1,"mr-3"],["type","text","pInputTextarea","","name","comment","placeholder","Write a comment...",1,"w-full",2,"resize","none",3,"ngModel","ngModelChange","keydown.enter"],["class","flex align-items-center border-round",4,"ngFor","ngForOf"],[1,"flex","w-full","justify-content-end","border-top-1","surface-border","py-5","px-5","gap-3"],["pButton","","pRipple","","type","button","icon","pi pi-paperclip",1,"p-button-outlined","p-button-secondary","surface-border","text-900","w-3rem","h-3rem"],["pButton","","pRipple","","type","button","icon","pi pi-trash",1,"p-button-outlined","p-button-secondary","surface-border","text-900","w-3rem","h-3rem",3,"click"],["pButton","","pRipple","","type","submit","icon","pi pi-check","label","Save",1,"p-button-primary","h-3rem"],["pTooltip","Click to edit",1,"block","text-900","font-semibold","text-lg","pl-2"],["type","text","name","title","pInputText","",1,"w-13rem","sm:w-18rem","h-3rem","text-900","text-lg",3,"ngModel","ngModelChange","keydown.enter"],["inputTitle",""],[1,"grid","grid-nogutter","flex-column","gap-5","w-15rem"],[1,"col-12","flex","flex-column"],[1,"text-900","font-semibold","block","w-full","border-bottom-1","surface-border","pb-3","mb-2"],["pRipple","","class","text-700 block p-2 cursor-pointer hover:surface-ground select-none border-round",3,"click",4,"ngFor","ngForOf"],["pRipple","",1,"text-700","block","p-2","cursor-pointer","hover:surface-ground","select-none","border-round",3,"click"],[1,"col-12","flex","flex-column","px-5"],[1,"flex","justify-content-between","mb-3"],[1,"text-900","font-semibold"],["name","progress",3,"value","showValue"],[1,"h-4rem","-mb-4"],["closeIcon","pi pi-check","styleClass","h-4rem",3,"closable","onActivate"],["inplace2",""],["type","text","pInputTextarea","","name","taskContent","placeholder","Add a task",1,"w-full","mt-4",2,"resize","none",3,"ngModel","ngModelChange","keydown.enter"],["class","list-none p-4 flex flex-column gap-3 surface-ground surface-border border-1 border-round",4,"ngIf"],["pTooltip","Click to edit","tooltipPosition","left",1,"block","text-900","font-semibold","text-lg","mt-3"],["type","text","name","title","pInputText","",1,"w-20rem","h-3rem","text-900","mt-2","text-lg",3,"ngModel","ngModelChange","keydown.enter"],["inputTaskListTitle",""],[1,"list-none","p-4","flex","flex-column","gap-3","surface-ground","surface-border","border-1","border-round"],["class","flex align-items-start gap-3",4,"ngFor","ngForOf"],[1,"flex","align-items-start","gap-3"],[3,"name","ngModel","binary","inputId","ngModelChange","onChange"],[2,"word-break","break-all",3,"ngClass"],[1,"flex","align-items-center","gap-3","border-round"],[1,"h-2rem","w-2rem","border-2","border-circle","surface-border","mr-2",3,"src","alt"],[1,"text-900"],[1,"flex","align-items-center","border-round"],["class","mb-4","shape","circle","size","large",3,"image",4,"ngIf"],["icon","pi pi-user","class","mb-4","shape","circle","size","large",4,"ngIf"],[1,"ml-3","w-full"],[1,"flex","justify-content-between","mb-2"],[1,"block","text-900"],[1,"block","text-700"],[1,"block","text-900","border-1","surface-ground","surface-border","p-2","border-round",2,"word-break","break-all"],["shape","circle","size","large",1,"mb-4",3,"image"],["icon","pi pi-user","shape","circle","size","large",1,"mb-4"]],template:function(a,i){1&a&&t.YNc(0,Ut,3,3,"p-sidebar",0),2&a&&t.Q6J("ngIf",i.formValue)},dependencies:[p.mk,p.sg,p.O5,d._Y,d.Fj,d.JJ,d.JL,d.Q7,d.On,d.F,m.Hq,g.jx,b.H,k.k,T.q,C.o,K.f,L.g,S.Y,v.u,Z,J.Qc,N.T,O.XZ],styles:["[_nghost-%COMP%]     .p-autocomplete{display:block}[_nghost-%COMP%]     .p-autocomplete .p-autocomplete-multiple-container{gap:.5rem}[_nghost-%COMP%]     .p-autocomplete .p-autocomplete-multiple-container .p-autocomplete-token{background:var(--surface-ground);border:1px solid var(--surface-border)}[_nghost-%COMP%]     .p-sidebar .p-sidebar-header{display:none}[_nghost-%COMP%]     .p-sidebar .p-sidebar-content{padding:0;display:flex;flex-direction:column;justify-content:space-between;height:100%;overflow:auto}"]})}return n})();var Gt=r(1480),Yt=r(3965);let Pt=(()=>{class n{static#t=this.\u0275fac=function(a){return new(a||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({providers:[u],imports:[p.ez,d.u5,_._t,V,m.hJ,b.T,k.q,T.F,D.Q,C.j,Gt.Gg,K._8,Yt.kW,L.A,S.l,I.$9,it,J.WN,v.z,A.QK,N.y,O.nD]})}return n})();t.B6R(h,[p.sg,_.Wj,_.Zt,_.Bh,m.Hq,b.H,xt,Vt],[])}}]);
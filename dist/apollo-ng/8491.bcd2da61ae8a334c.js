"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[8491],{5072:(m,p,e)=>{e.r(p),e.d(p,{AsginaCursoDocenteModule:()=>U,HttpLoaderFactory:()=>I});var o=e(6814),a=e(1214),u=e(6223),g=e(9552),r=e(707),h=e(3714),c=e(1230),d=e(5061),i=e(3999),Z=e(2538),t=e(8926),T=e(3859),v=e(5219);function f(n,D){1&n&&(t.TgZ(0,"span",2),t._uU(1,"Asignar Curso al Docente"),t.qZA())}function A(n,D){1&n&&(t.TgZ(0,"div",3)(1,"div",4)(2,"div",5)(3,"span",6),t._UZ(4,"i",7)(5,"input",8),t.TgZ(6,"label",9),t._uU(7,"Nombre de Instituci\xf3n"),t.qZA()(),t.TgZ(8,"small",10),t._uU(9,"Campo obligatorio *"),t.qZA()(),t.TgZ(10,"div",5)(11,"span",6),t._UZ(12,"i",7)(13,"input",11),t.TgZ(14,"label",12),t._uU(15,"Director"),t.qZA()(),t.TgZ(16,"small",10),t._uU(17,"Campo obligatorio *"),t.qZA()()()(),t.TgZ(18,"div",3)(19,"div",4)(20,"div",5)(21,"span",6),t._UZ(22,"i",7)(23,"input",13),t.TgZ(24,"label",14),t._uU(25,"Siglas"),t.qZA()(),t.TgZ(26,"small",10),t._uU(27,"Campo obligatorio *"),t.qZA()(),t.TgZ(28,"div",5)(29,"span",6),t._UZ(30,"i",7)(31,"input",15),t.TgZ(32,"label",16),t._uU(33,"Logotipo"),t.qZA()(),t.TgZ(34,"small",10),t._uU(35,"Campo obligatorio *"),t.qZA()()()(),t.TgZ(36,"div",3)(37,"div",4)(38,"div",5)(39,"span",6),t._UZ(40,"i",7)(41,"input",17),t.TgZ(42,"label",18),t._uU(43,"Color de fondo"),t.qZA()(),t.TgZ(44,"small",10),t._uU(45,"Campo obligatorio *"),t.qZA()(),t.TgZ(46,"div",5)(47,"span",6),t._UZ(48,"i",7)(49,"input",19),t.TgZ(50,"label",20),t._uU(51,"Color de texto"),t.qZA()(),t.TgZ(52,"small",10),t._uU(53,"Campo obligatorio *"),t.qZA()()()(),t.TgZ(54,"div",21),t._UZ(55,"button",22)(56,"button",23),t.qZA())}let y=(()=>{class n{constructor(s,l,C,b){this.layoutService=s,this.router=l,this.primengConfig=C,this.translate=b,this.calendarOptions={initialView:"dayGridMonth",locale:Z.Z}}get dark(){return"light"!==this.layoutService.config.colorScheme}ngOnInit(){this.tipodocu=[{name:"DNI",value:1,code:"NY"},{name:"PASAPORTE",value:2,code:"RM"}],this.translate?this.translateChange("es"):console.error("TranslateService is not initialized.")}cambiarIdioma(){this.translateService.use("es")}translateChange(s){this.translate?this.translate.use(s):console.error("TranslateService is not initialized.")}onDropdownChangetipoDni(s){console.log("Dropdown value changed:",s)}static#t=this.\u0275fac=function(l){return new(l||n)(t.Y36(T.P),t.Y36(a.F0),t.Y36(v.b4),t.Y36(i.sK))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-asigna-curso-docente"]],decls:3,vars:0,consts:[["pTemplate","header"],["pTemplate","content"],[1,"text-primary","font-semibold","text-xl"],[1,"row"],[1,"grid","p-fluid"],[1,"field","md:col-6"],[1,"p-float-label","p-input-icon-left"],[1,"pi","pi-user-edit"],["type","text","id","nombreInstitucion","pInputText",""],["for","nombreInstitucion"],[2,"color","brown"],["type","text","id","director","pInputText",""],["for","director"],["type","text","id","siglas","pInputText",""],["for","siglas"],["type","text","id","logotipo","pInputText",""],["for","logotipo"],["type","text","id","colorFondo","pInputText",""],["for","colorFondo"],["type","text","id","colorTexto","pInputText",""],["for","colorTexto"],[1,"row","mb-5","text-right"],["pButton","","label","Guardar","icon","pi pi-plus","id","btnGuardar",1,"p-button-success","mr-2"],["pButton","","label","Cancelar","icon","pi pi-times","id","btnCancelar",1,"p-button-danger"]],template:function(l,C){1&l&&(t.TgZ(0,"p-panel"),t.YNc(1,f,2,0,"ng-template",0),t.YNc(2,A,57,0,"ng-template",1),t.qZA())},dependencies:[r.Hq,v.jx,h.o,c.s]})}return n})(),x=(()=>{class n{static#t=this.\u0275fac=function(l){return new(l||n)};static#e=this.\u0275mod=t.oAB({type:n});static#o=this.\u0275inj=t.cJS({imports:[a.Bz.forChild([{path:"",component:y}]),a.Bz]})}return n})();function I(n){return new d.w(n,"./assets/i18n/",".json")}let U=(()=>{class n{static#t=this.\u0275fac=function(l){return new(l||n)};static#e=this.\u0275mod=t.oAB({type:n});static#o=this.\u0275inj=t.cJS({imports:[o.ez,x,o.ez,c.Q,h.j,r.hJ,g.U$,u.u5,a.Bz,i.aw]})}return n})()},2538:(m,p,e)=>{e.d(p,{Z:()=>o});var o={code:"es",week:{dow:1,doy:4},buttonText:{prev:"Ant",next:"Sig",today:"Hoy",year:"A\xf1o",month:"Mes",week:"Semana",day:"D\xeda",list:"Agenda"},buttonHints:{prev:"$0 antes",next:"$0 siguiente",today:a=>"D\xeda"===a?"Hoy":("Semana"===a?"Esta":"Este")+" "+a.toLocaleLowerCase()},viewHint:a=>"Vista "+("Semana"===a?"de la":"del")+" "+a.toLocaleLowerCase(),weekText:"Sm",weekTextLong:"Semana",allDayText:"Todo el d\xeda",moreLinkText:"m\xe1s",moreLinkHint:a=>`Mostrar ${a} eventos m\xe1s`,noEventsText:"No hay eventos para mostrar",navLinkHint:"Ir al $0",closeHint:"Cerrar",timeHint:"La hora",eventHint:"Evento"}},3983:(m,p,e)=>{e.d(p,{p:()=>g});var o=e(8926),a=e(4713),u=e(2332);let g=(()=>{class r extends a.s{pathId;ngOnInit(){this.pathId="url(#"+(0,u.Th)()+")"}static \u0275fac=function(){let c;return function(i){return(c||(c=o.n5z(r)))(i||r)}}();static \u0275cmp=o.Xpm({type:r,selectors:[["PlusIcon"]],standalone:!0,features:[o.qOj,o.jDz],decls:6,vars:7,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M7.67742 6.32258V0.677419C7.67742 0.497757 7.60605 0.325452 7.47901 0.198411C7.35197 0.0713707 7.17966 0 7 0C6.82034 0 6.64803 0.0713707 6.52099 0.198411C6.39395 0.325452 6.32258 0.497757 6.32258 0.677419V6.32258H0.677419C0.497757 6.32258 0.325452 6.39395 0.198411 6.52099C0.0713707 6.64803 0 6.82034 0 7C0 7.17966 0.0713707 7.35197 0.198411 7.47901C0.325452 7.60605 0.497757 7.67742 0.677419 7.67742H6.32258V13.3226C6.32492 13.5015 6.39704 13.6725 6.52358 13.799C6.65012 13.9255 6.82106 13.9977 7 14C7.17966 14 7.35197 13.9286 7.47901 13.8016C7.60605 13.6745 7.67742 13.5022 7.67742 13.3226V7.67742H13.3226C13.5022 7.67742 13.6745 7.60605 13.8016 7.47901C13.9286 7.35197 14 7.17966 14 7C13.9977 6.82106 13.9255 6.65012 13.799 6.52358C13.6725 6.39704 13.5015 6.32492 13.3226 6.32258H7.67742Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(d,i){1&d&&(o.O4$(),o.TgZ(0,"svg",0)(1,"g"),o._UZ(2,"path",1),o.qZA(),o.TgZ(3,"defs")(4,"clipPath",2),o._UZ(5,"rect",3),o.qZA()()()),2&d&&(o.Tol(i.getClassNames()),o.uIk("aria-label",i.ariaLabel)("aria-hidden",i.ariaHidden)("role",i.role),o.xp6(1),o.uIk("clip-path",i.pathId),o.xp6(3),o.Q6J("id",i.pathId))},encapsulation:2})}return r})()}}]);
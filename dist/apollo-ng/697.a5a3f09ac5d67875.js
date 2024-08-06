"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[697],{697:(U,v,n)=>{n.r(v),n.d(v,{BandejaUsuariosModule:()=>at});var s=n(6814),r=n(8007),h=n(2538),a=n(6223),t=n(8926),g=n(3859),d=n(5219),u=n(3999),p=n(5118),f=n(4474),b=n(5516),T=n(9862);let A=(()=>{class i{constructor(e){this.http=e,this.baseUrl=`${b.N.API_BASE}`,this.urlparametro=`${b.N.API_BASE}`}getUsuarios(){return this.http.get(`${this.baseUrl}usuarios`)}saveUsuario(e){return this.http.post(`${this.baseUrl}usuarios`,e)}deleteUsuario(e){return this.http.delete(`${this.baseUrl}usuarios/${e}`)}static#t=this.\u0275fac=function(o){return new(o||i)(t.LFG(T.eN))};static#e=this.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var x=n(8672),y=n(375),C=n(707),Z=n(3714),I=n(3965),S=n(1230);function E(i,c){1&i&&(t.TgZ(0,"span",3),t._uU(1,"Registrar Usuarios"),t.qZA())}function M(i,c){if(1&i&&(t.TgZ(0,"div",5)(1,"div",6)(2,"div",7)(3,"label",25),t._uU(4,"Instituci\xf3n"),t.qZA(),t._UZ(5,"p-dropdown",26),t.qZA()()()),2&i){const e=t.oxw(2);t.xp6(5),t.Q6J("options",e.institutionsList)}}function D(i,c){if(1&i){const e=t.EpF();t.TgZ(0,"form",4),t.NdJ("ngSubmit",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.saveUsuario())}),t.TgZ(1,"div",5)(2,"div",6)(3,"div",7)(4,"label",8),t._uU(5,"Nombres"),t.qZA(),t._UZ(6,"input",9),t.qZA(),t.TgZ(7,"div",7)(8,"label",10),t._uU(9,"Apellidos"),t.qZA(),t._UZ(10,"input",11),t.qZA()()(),t.TgZ(11,"div",5)(12,"div",6)(13,"div",7)(14,"label",12),t._uU(15,"Email"),t.qZA(),t._UZ(16,"input",13),t.qZA(),t.TgZ(17,"div",7)(18,"label",14),t._uU(19,"Contrase\xf1a"),t.qZA(),t._UZ(20,"input",15),t.qZA()()(),t.TgZ(21,"div",5)(22,"div",6)(23,"div",7)(24,"label",16),t._uU(25,"DNI"),t.qZA(),t._UZ(26,"input",17),t.qZA(),t.TgZ(27,"div",7)(28,"label",18),t._uU(29,"Rol"),t.qZA(),t.TgZ(30,"span",19),t._UZ(31,"p-dropdown",20),t.qZA()()()(),t.YNc(32,M,6,1,"div",21),t.TgZ(33,"div",22),t._UZ(34,"button",23),t.TgZ(35,"button",24),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.closeModal())}),t.qZA()()()}if(2&i){const e=t.oxw();t.Q6J("formGroup",e.userForm),t.xp6(31),t.Q6J("options",e.listciclos),t.xp6(1),t.Q6J("ngIf",e.isSuperAdmin)}}function N(i,c){1&i&&t._UZ(0,"ngx-spinner",27)}let R=(()=>{class i{constructor(e,o,l,m,_,rt,lt,pt,ut,dt,ct){this.layoutService=e,this.router=o,this.primengConfig=l,this.translate=m,this.ref=_,this.translateService=rt,this.commonService=lt,this.userServicio=pt,this.fb=ut,this.spinner=dt,this.helpersService=ct,this.contsylabus="",this.calendarOptions={initialView:"dayGridMonth",locale:h.Z},this.loading=!1,this.dialogVisible=!1,this.visible=!1,this.isSuperAdmin=!1,this.institutionsList=[],this.selectedInstitution=null,this.dominioId=0,this.userForm=this.fb.group({name:["",a.kI.required],lastname:["",a.kI.required],email:["",a.kI.required],password:["",a.kI.required],dni:["",a.kI.required],rolId:["",a.kI.required],dominioId:["",a.kI.required]})}ngOnInit(){this.isSuperAdmin=this.helpersService.isSuperAdmin(),this.listciclos=[],this.dominioId=this.helpersService.getDominioId(),this.listcarrera=[{name:"DNI",value:1,code:"NY"},{name:"PASAPORTE",value:2,code:"RM"}],this.listareaformativa=[{name:"\xc1rea de formaci\xf3n 1",value:1,code:"NY"},{name:"\xc1rea de formaci\xf3n 2",value:2,code:"RM"},{name:"\xc1rea de formaci\xf3n 3",value:2,code:"RM"}],this.lsitadocente=[{name:"Docente 1",value:1,code:"NY"},{name:"Docente 2",value:2,code:"RM"},{name:"Docente 3",value:2,code:"RM"}],this.translate?this.translateChange("es"):console.error("TranslateService is not initialized."),this.getRolesDropdown(),this.isSuperAdmin&&this.getInstitutionsDropdown()}cambiarIdioma(){this.translateService.use("es")}getInstitutionsDropdown(){this.commonService.getInstitutionsDropdown().subscribe(e=>{this.institutionsList=e.map(o=>({name:o.name,value:o.domain_id}))},e=>{console.error("Error obteniendo instituciones",e)})}getRolesDropdown(){this.commonService.getRolesDropdown().subscribe(e=>{this.listciclos=e.map(o=>({name:o.nombre,value:o.id}))},e=>{console.error("Error obteniendo carreras",e)})}translateChange(e){this.translate?this.translate.use(e):console.error("TranslateService is not initialized.")}onDropdownChangetipoDni(e){console.log("Dropdown value changed:",e)}saveUsuario(){if(this.userForm.valid){const e=new FormData;e.append("name",this.userForm.get("name")?.value+""+this.userForm.get("lastname")?.value),e.append("email",this.userForm.get("email")?.value),e.append("dni",this.userForm.get("dni")?.value),e.append("password",this.userForm.get("password")?.value),e.append("rol_id",this.userForm.get("rolId")?.value),e.append("domain_id",this.isSuperAdmin?this.userForm.get("dominioId")?.value:this.dominioId.toString()),this.spinner.show(),this.loading=!0,this.userServicio.saveUsuario(e).subscribe(o=>{this.spinner.hide(),this.loading=!1,this.helpersService.showSuccessMessage("Usuario registrado correctamente"),this.ref.close({register:!0})},o=>{this.spinner.hide(),this.loading=!1,console.error("Error registrando usuario",o.error),this.helpersService.showErrorMessage(o.error.message)})}}closeDialog(){this.visible=!1}closeModal(){this.ref.close({register:!1})}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(g.P),t.Y36(r.F0),t.Y36(d.b4),t.Y36(u.sK),t.Y36(p.E7),t.Y36(u.sK),t.Y36(f.v),t.Y36(A),t.Y36(a.qu),t.Y36(x.t2),t.Y36(y.$))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-registra-usuario"]],decls:4,vars:1,consts:[["pTemplate","header"],["pTemplate","content"],["bdColor","rgba(0,0,0,0.5)","size","large","color","white","type","ball-spin",4,"ngIf"],[1,"text-primary","font-semibold","text-xl"],[3,"formGroup","ngSubmit"],[1,"row"],[1,"grid","p-fluid"],[1,"field","md:col-6"],["for","name"],["id","name","type","text","pInputText","","formControlName","name",1,"w-full"],["for","lastname"],["id","lastname","type","text","pInputText","","formControlName","lastname",1,"w-full"],["for","email"],["id","email","type","text","pInputText","","formControlName","email",1,"w-full"],["for","password"],["id","password","type","password","pInputText","","formControlName","password",1,"w-full"],["for","dni"],["id","dni","type","text","pInputText","","formControlName","dni",1,"w-full"],["for","rolId"],[1,"p-float-label"],["inputId","rolId","formControlName","rolId","optionLabel","name","optionValue","value","placeholder","Selecciona una Rol",3,"options"],["class","row",4,"ngIf"],[1,"row","mb-5","text-right"],["pButton","","label","Guardar","icon","pi pi-plus","type","submit"],["pButton","","label","Cerrar","icon","pi pi-times","iconPos","right",1,"p-button-close-clean",3,"click"],["for","institucion"],["inputId","dominioId","formControlName","dominioId","optionLabel","name","optionValue","value","placeholder","Selecciona una opci\xf3n","appendTo","body",3,"options"],["bdColor","rgba(0,0,0,0.5)","size","large","color","white","type","ball-spin"]],template:function(o,l){1&o&&(t.TgZ(0,"p-panel"),t.YNc(1,E,2,0,"ng-template",0),t.YNc(2,D,36,3,"ng-template",1),t.YNc(3,N,1,0,"ngx-spinner",2),t.qZA()),2&o&&(t.xp6(3),t.Q6J("ngIf",l.loading))},dependencies:[s.O5,a._Y,a.Fj,a.JJ,a.JL,C.Hq,d.jx,Z.o,I.Lt,S.s,a.sg,a.u,x.Ro],styles:[".swal2-custom-class[_ngcontent-%COMP%]{z-index:9999!important}"]})}return i})();var w=n(9552);const B=["filter"],F=["dt1"];function Y(i,c){1&i&&(t.TgZ(0,"span",2),t._uU(1,"Buscar Usuarios"),t.qZA())}function j(i,c){if(1&i){const e=t.EpF();t.TgZ(0,"div",13)(1,"div",14)(2,"span",15)(3,"input",16,17),t.NdJ("input",function(l){t.CHM(e),t.oxw();const m=t.MAs(4),_=t.oxw();return t.KtG(_.onGlobalFilter(m,l))}),t.qZA()()(),t.TgZ(5,"div",18)(6,"button",19),t.NdJ("click",function(){t.CHM(e);const l=t.oxw(2);return t.KtG(l.navigateToNuevo())}),t.qZA()()()}}function z(i,c){1&i&&(t.TgZ(0,"tr")(1,"th",20)(2,"div",21),t._uU(3," Nombres y Apellidos "),t.qZA()(),t.TgZ(4,"th",20)(5,"div",21),t._uU(6," Email "),t.qZA()(),t.TgZ(7,"th",20)(8,"div",21),t._uU(9," Cargo "),t.qZA()(),t.TgZ(10,"th",20)(11,"div",21),t._uU(12," Configuraciones "),t.qZA()()())}function H(i,c){if(1&i){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._UZ(8,"button",22)(9,"button",23),t.TgZ(10,"button",24),t.NdJ("click",function(){const m=t.CHM(e).$implicit,_=t.oxw(2);return t.KtG(_.eliminar(m.id))}),t.qZA()()()}if(2&i){const e=c.$implicit;t.xp6(2),t.Oqu(e.name),t.xp6(2),t.Oqu(e.email),t.xp6(2),t.hij("",e.nombre," ")}}function L(i,c){1&i&&(t.TgZ(0,"tr")(1,"td",25),t._uU(2,"No se encontraron registros"),t.qZA()())}function O(i,c){1&i&&(t.TgZ(0,"tr")(1,"td",25),t._uU(2,"Cargando registros. Por favor espere."),t.qZA()())}function $(i,c){1&i&&t._UZ(0,"ngx-spinner",26)}function P(i,c){if(1&i&&(t.TgZ(0,"div",3)(1,"div",4)(2,"div",5)(3,"p-table",6,7),t.YNc(5,j,7,0,"ng-template",8),t.YNc(6,z,13,0,"ng-template",0),t.YNc(7,H,11,3,"ng-template",9),t.YNc(8,L,3,0,"ng-template",10),t.YNc(9,O,3,0,"ng-template",11),t.qZA()()()(),t.YNc(10,$,1,0,"ngx-spinner",12)),2&i){const e=t.oxw();t.xp6(3),t.Q6J("value",e.usuarios)("rows",10)("loading",e.loading)("rowHover",!0)("paginator",!0),t.xp6(7),t.Q6J("ngIf",e.loading)}}let G=(()=>{class i{constructor(e,o,l,m,_){this.router=e,this.dialogService=o,this.userServicio=l,this.helpersService=m,this.spinner=_,this.usuarios=[],this.loading=!1}ngOnInit(){this.cargaInicial()}eliminar(e){this.spinner.show(),this.loading=!0,this.userServicio.deleteUsuario(e).subscribe(o=>{this.helpersService.showSuccessMessage("Usuario eliminado correctamente"),this.loading=!1,this.spinner.hide(),this.cargaInicial()},o=>{this.helpersService.showErrorMessage("Error al eliminar el usuario"),this.loading=!1,this.spinner.hide(),console.log(o)})}cargaInicial(){this.loading=!0,this.userServicio.getUsuarios().subscribe(e=>{this.usuarios=e,this.loading=!1},e=>{console.log(e),this.loading=!1})}navigateToNuevo(){this.ref=this.dialogService.open(R,{width:"60%",styleClass:"custom-dialog-header"}),this.ref.onClose.subscribe(e=>{this.router.routeReuseStrategy.shouldReuseRoute=()=>!1,this.router.onSameUrlNavigation="reload"})}onGlobalFilter(e,o){e.filterGlobal(o.target.value,"contains")}onRowSelect(e){console.log("Organo-colegaido-sect")}onRowUnselect(e){}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(r.F0),t.Y36(p.xA),t.Y36(A),t.Y36(y.$),t.Y36(x.t2))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-bandeja-usuarios"]],viewQuery:function(o,l){if(1&o&&(t.Gf(B,5),t.Gf(F,5)),2&o){let m;t.iGM(m=t.CRH())&&(l.filter=m.first),t.iGM(m=t.CRH())&&(l.tabledt1=m.first)}},decls:3,vars:0,consts:[["pTemplate","header"],["pTemplate","content"],[1,"text-primary","font-semibold","text-xl"],[1,"row","mb-4"],[1,"grid","p-fluid"],[1,"field","md:col-12"],["styleClass","p-datatable-gridlines","responsiveLayout","scroll",1,"custom-search-input",3,"value","rows","loading","rowHover","paginator"],["dt1",""],["pTemplate","caption"],["pTemplate","body"],["pTemplate","emptymessage"],["pTemplate","loadingbody"],["bdColor","rgba(0,0,0,0.5)","size","large","color","white","type","ball-spin",4,"ngIf"],[1,"flex","justify-content-between","flex-wrap"],[1,"flex-grow-1","mb-2","mr-2"],[1,"p-input-icon-left","w-full"],["pInputText","","type","text","placeholder","Buscar Usuario",1,"w-full",3,"input"],["filter",""],[1,"mb-2"],["pButton","","label","Nuevo","icon","pi pi-user-plus","id","btnNuevo",1,"p-button-primary","mr-2",2,"border-radius","30px",3,"click"],["scope","col",2,"min-width","10rem"],[1,"flex","justify-content-between","align-items-center"],["pButton","","icon","pi pi-user-plus","title","Perfil",1,"p-button-rounded","p-button-text","p-button-action"],["pButton","","icon","pi pi-user-edit","title","Editar",1,"p-button-rounded","p-button-text","p-button-action"],["pButton","","icon","pi pi-trash","title","Eliminar",1,"p-button-rounded","p-button-text","p-button-action",3,"click"],["colspan","8"],["bdColor","rgba(0,0,0,0.5)","size","large","color","white","type","ball-spin"]],template:function(o,l){1&o&&(t.TgZ(0,"p-panel"),t.YNc(1,Y,2,0,"ng-template",0),t.YNc(2,P,11,6,"ng-template",1),t.qZA())},dependencies:[s.O5,C.Hq,d.jx,w.iA,Z.o,S.s,x.Ro]})}return i})(),J=(()=>{class i{static#t=this.\u0275fac=function(o){return new(o||i)};static#e=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[r.Bz.forChild([{path:"",component:G}]),r.Bz]})}return i})();var K=n(6760),Q=n(6022),V=n(7902),q=n(6218),W=n(6804),X=n(4480),k=n(4055),tt=n(6651),et=n(3259),it=n(3722),nt=n(4104),ot=n(1494),st=n(3904);let at=(()=>{class i{static#t=this.\u0275fac=function(o){return new(o||i)};static#e=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({providers:[p.xA,p.E7],imports:[s.ez,J,a.u5,K._8,w.U$,Q.Xt,C.hJ,V.JH,Z.j,q.A,W.KZ,X.T,k.q4,I.kW,S.Q,tt.q,nt.EV,ot.n,it.O,et.z,st.D,p.DL,u.aw,a.UX,x.ef]})}return i})()},4474:(U,v,n)=>{n.d(v,{v:()=>a});var s=n(9862),r=n(5516),h=n(8926);let a=(()=>{class t{constructor(d,u,p){this.http=d,this.httpClientFormData=u,this.handler=p,this.baseUrl=`${r.N.API_BASE}`,this.urlparametro=`${r.N.API_BASE}`,this.httpOptions={headers:new s.WM({"Content-Type":"application/json"})},this.httpClientFormData=new s.eN(this.handler)}getCarrerasDropdown(d){return this.http.get(`${this.baseUrl}carreras-dropdown/${d}`)}getCiclosDropdown(d){return this.http.get(`${this.baseUrl}ciclos-dropdown/${d}`)}getRolesDropdown(){return this.http.get(`${this.baseUrl}roles-dropdown`)}getDocentesDropdown(d){return this.http.get(`${this.baseUrl}docentes-dropdown/${d}`)}getInstitutionsDropdown(){return this.http.get(`${this.baseUrl}institutions-dropdown`)}static#t=this.\u0275fac=function(u){return new(u||t)(h.LFG(s.eN),h.LFG(s.eN),h.LFG(s.jN))};static#e=this.\u0275prov=h.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})()},2538:(U,v,n)=>{n.d(v,{Z:()=>s});var s={code:"es",week:{dow:1,doy:4},buttonText:{prev:"Ant",next:"Sig",today:"Hoy",year:"A\xf1o",month:"Mes",week:"Semana",day:"D\xeda",list:"Agenda"},buttonHints:{prev:"$0 antes",next:"$0 siguiente",today:r=>"D\xeda"===r?"Hoy":("Semana"===r?"Esta":"Este")+" "+r.toLocaleLowerCase()},viewHint:r=>"Vista "+("Semana"===r?"de la":"del")+" "+r.toLocaleLowerCase(),weekText:"Sm",weekTextLong:"Semana",allDayText:"Todo el d\xeda",moreLinkText:"m\xe1s",moreLinkHint:r=>`Mostrar ${r} eventos m\xe1s`,noEventsText:"No hay eventos para mostrar",navLinkHint:"Ir al $0",closeHint:"Cerrar",timeHint:"La hora",eventHint:"Evento"}},6218:(U,v,n)=>{n.d(v,{A:()=>t,g:()=>a});var s=n(8926),r=n(6814),h=n(6223);let a=(()=>{class g{el;ngModel;control;cd;autoResize;onResize=new s.vpe;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;constructor(u,p,f,b){this.el=u,this.ngModel=p,this.control=f,this.cd=b}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewChecked(){this.updateState()}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(u){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}resize(u){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(u||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(p){return new(p||g)(s.Y36(s.SBq),s.Y36(h.On,8),s.Y36(h.a5,8),s.Y36(s.sBO))};static \u0275dir=s.lG2({type:g,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(p,f){1&p&&s.NdJ("input",function(T){return f.onInput(T)}),2&p&&s.ekj("p-filled",f.filled)("p-inputtextarea-resizable",f.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}})}return g})(),t=(()=>{class g{static \u0275fac=function(p){return new(p||g)};static \u0275mod=s.oAB({type:g});static \u0275inj=s.cJS({imports:[r.ez]})}return g})()}}]);
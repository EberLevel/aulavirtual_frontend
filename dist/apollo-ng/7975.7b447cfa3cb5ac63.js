"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[7975],{7975:(Y,b,l)=>{l.r(b),l.d(b,{BandejaAlumnoModule:()=>Pe});var c=l(6814),r=l(6223),f=l(258),w=l(2538),v=l(5219),d=l(3519),I=l.n(d),e=l(8926),u=l(5118),h=l(4067),y=l(3999),m=l(9862),N=l(5516);let z=(()=>{class o{constructor(t,n,i){this.http=t,this.httpClientFormData=n,this.handler=i,this.baseUrl=`${N.N.API_BASE}`,this.urlparametro=`${N.N.API_BASE}`,this.httpOptions={headers:new m.WM({"Content-Type":"application/json"})},this.httpClientFormData=new m.eN(this.handler)}saveAlumno(t){return this.http.post(`${this.baseUrl}alumnos`,t)}getAlumnos(){return this.http.get(`${this.baseUrl}alumnos`)}deleteAlumno(t){return this.http.delete(`${this.baseUrl}alumnos/${t.id}/${t.domain_id}`)}editAlumno(t,n){return this.http.put(`${this.baseUrl}alumnos/${n.id}/${n.domain_id}`,t)}showAlumno(t){return this.http.get(`${this.baseUrl}alumnos/${t.id}/${t.domain_id}`)}static#e=this.\u0275fac=function(n){return new(n||o)(e.LFG(m.eN),e.LFG(m.eN),e.LFG(m.jN))};static#t=this.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})(),$=(()=>{class o{constructor(t,n,i){this.http=t,this.httpClientFormData=n,this.handler=i,this.baseUrl=`${N.N.API_BASE}`,this.urlparametro=`${N.N.API_BASE}`,this.httpOptions={headers:new m.WM({"Content-Type":"application/json"})},this.httpClientFormData=new m.eN(this.handler)}getCarrerasDropdown(){return this.http.get(`${this.baseUrl}carreras-dropdown`)}getCiclosDropdown(){return this.http.get(`${this.baseUrl}ciclos-dropdown`)}static#e=this.\u0275fac=function(n){return new(n||o)(e.LFG(m.eN),e.LFG(m.eN),e.LFG(m.jN))};static#t=this.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();var V=l(5619),k=l(8645),K=l(2181),X=l(9773),g=l(6825),W=l(6593);const ee=["overlay"];function te(o,s){1&o&&e._UZ(0,"div")}function ne(o,s){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,te,1,0,"div",6),e.qZA()),2&o){const t=e.oxw(2);e.Tol(t.spinner.class),e.Udp("color",t.spinner.color),e.xp6(1),e.Q6J("ngForOf",t.spinner.divArray)}}function oe(o,s){if(1&o&&(e._UZ(0,"div",7),e.ALo(1,"safeHtml")),2&o){const t=e.oxw(2);e.Q6J("innerHTML",e.lcZ(1,1,t.template),e.oJD)}}function ie(o,s){if(1&o&&(e.TgZ(0,"div",1,2),e.YNc(2,ne,2,5,"div",3),e.YNc(3,oe,2,3,"div",4),e.TgZ(4,"div",5),e.Hsn(5),e.qZA()()),2&o){const t=e.oxw();e.Udp("background-color",t.spinner.bdColor)("z-index",t.spinner.zIndex)("position",t.spinner.fullScreen?"fixed":"absolute"),e.Q6J("@.disabled",t.disableAnimation)("@fadeIn","in"),e.xp6(2),e.Q6J("ngIf",!t.template),e.xp6(1),e.Q6J("ngIf",t.template),e.xp6(1),e.Udp("z-index",t.spinner.zIndex)}}const le=["*"],ae={"ball-8bits":16,"ball-atom":4,"ball-beat":3,"ball-circus":5,"ball-climbing-dot":4,"ball-clip-rotate":1,"ball-clip-rotate-multiple":2,"ball-clip-rotate-pulse":2,"ball-elastic-dots":5,"ball-fall":3,"ball-fussion":4,"ball-grid-beat":9,"ball-grid-pulse":9,"ball-newton-cradle":4,"ball-pulse":3,"ball-pulse-rise":5,"ball-pulse-sync":3,"ball-rotate":1,"ball-running-dots":5,"ball-scale":1,"ball-scale-multiple":3,"ball-scale-pulse":2,"ball-scale-ripple":1,"ball-scale-ripple-multiple":3,"ball-spin":8,"ball-spin-clockwise":8,"ball-spin-clockwise-fade":8,"ball-spin-clockwise-fade-rotating":8,"ball-spin-fade":8,"ball-spin-fade-rotating":8,"ball-spin-rotate":2,"ball-square-clockwise-spin":8,"ball-square-spin":8,"ball-triangle-path":3,"ball-zig-zag":2,"ball-zig-zag-deflect":2,cog:1,"cube-transition":2,fire:3,"line-scale":5,"line-scale-party":5,"line-scale-pulse-out":5,"line-scale-pulse-out-rapid":5,"line-spin-clockwise-fade":8,"line-spin-clockwise-fade-rotating":8,"line-spin-fade":8,"line-spin-fade-rotating":8,pacman:6,"square-jelly-box":2,"square-loader":1,"square-spin":1,timer:1,"triangle-skew-spin":1},D="primary";class _{constructor(s){Object.assign(this,s)}static create(s){return!s?.template&&!s?.type&&console.warn('[ngx-spinner]: Property "type" is missed. Please, provide animation type to <ngx-spinner> component\n        and ensure css is added to angular.json file'),new _(s)}}let j=(()=>{class o{constructor(){this.spinnerObservable=new V.X(null)}getSpinner(t){return this.spinnerObservable.asObservable().pipe((0,K.h)(n=>n&&n.name===t))}show(t=D,n){return new Promise((i,a)=>{setTimeout(()=>{n&&Object.keys(n).length?(n.name=t,this.spinnerObservable.next(new _({...n,show:!0})),i(!0)):(this.spinnerObservable.next(new _({name:t,show:!0})),i(!0))},10)})}hide(t=D,n=10){return new Promise((i,a)=>{setTimeout(()=>{this.spinnerObservable.next(new _({name:t,show:!1})),i(!0)},n)})}static#e=this.\u0275fac=function(n){return new(n||o)};static#t=this.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();const U=new e.OlP("NGX_SPINNER_CONFIG");let re=(()=>{class o{constructor(t){this._sanitizer=t}transform(t){if(t)return this._sanitizer.bypassSecurityTrustHtml(t)}static#e=this.\u0275fac=function(n){return new(n||o)(e.Y36(W.H7,16))};static#t=this.\u0275pipe=e.Yjl({name:"safeHtml",type:o,pure:!0,standalone:!0})}return o})(),se=(()=>{class o{constructor(t,n,i,a){this.spinnerService=t,this.changeDetector=n,this.elementRef=i,this.globalConfig=a,this.disableAnimation=!1,this.spinner=new _,this.ngUnsubscribe=new k.x,this.setDefaultOptions=()=>{const{type:p}=this.globalConfig??{};this.spinner=_.create({name:this.name,bdColor:this.bdColor,size:this.size,color:this.color,type:this.type??p,fullScreen:this.fullScreen,divArray:this.divArray,divCount:this.divCount,show:this.show,zIndex:this.zIndex,template:this.template,showSpinner:this.showSpinner})},this.bdColor="rgba(51,51,51,0.8)",this.zIndex=99999,this.color="#fff",this.size="large",this.fullScreen=!0,this.name=D,this.template=null,this.showSpinner=!1,this.divArray=[],this.divCount=0,this.show=!1}initObservable(){this.spinnerService.getSpinner(this.name).pipe((0,X.R)(this.ngUnsubscribe)).subscribe(t=>{this.setDefaultOptions(),Object.assign(this.spinner,t),t.show&&this.onInputChange(),this.changeDetector.detectChanges()})}ngOnInit(){this.setDefaultOptions(),this.initObservable()}isSpinnerZone(t){return t===this.elementRef.nativeElement.parentElement||t.parentNode&&this.isSpinnerZone(t.parentNode)}ngOnChanges(t){for(const n in t)if(n){const i=t[n];if(i.isFirstChange())return;typeof i.currentValue<"u"&&i.currentValue!==i.previousValue&&""!==i.currentValue&&(this.spinner[n]=i.currentValue,"showSpinner"===n&&(i.currentValue?this.spinnerService.show(this.spinner.name,this.spinner):this.spinnerService.hide(this.spinner.name)),"name"===n&&this.initObservable())}}getClass(t,n){this.spinner.divCount=ae[t],this.spinner.divArray=Array(this.spinner.divCount).fill(0).map((a,p)=>p);let i="";switch(n.toLowerCase()){case"small":i="la-sm";break;case"medium":i="la-2x";break;case"large":i="la-3x"}return"la-"+t+" "+i}onInputChange(){this.spinner.class=this.getClass(this.spinner.type,this.spinner.size)}ngOnDestroy(){this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()}static#e=this.\u0275fac=function(n){return new(n||o)(e.Y36(j),e.Y36(e.sBO),e.Y36(e.SBq),e.Y36(U,8))};static#t=this.\u0275cmp=e.Xpm({type:o,selectors:[["ngx-spinner"]],viewQuery:function(n,i){if(1&n&&e.Gf(ee,5),2&n){let a;e.iGM(a=e.CRH())&&(i.spinnerDOM=a.first)}},inputs:{bdColor:"bdColor",size:"size",color:"color",type:"type",fullScreen:"fullScreen",name:"name",zIndex:"zIndex",template:"template",showSpinner:"showSpinner",disableAnimation:"disableAnimation"},standalone:!0,features:[e.TTD,e.jDz],ngContentSelectors:le,decls:1,vars:1,consts:[["class","ngx-spinner-overlay",3,"background-color","z-index","position",4,"ngIf"],[1,"ngx-spinner-overlay"],["overlay",""],[3,"class","color",4,"ngIf"],[3,"innerHTML",4,"ngIf"],[1,"loading-text"],[4,"ngFor","ngForOf"],[3,"innerHTML"]],template:function(n,i){1&n&&(e.F$t(),e.YNc(0,ie,6,12,"div",0)),2&n&&e.Q6J("ngIf",i.spinner.show)},dependencies:[re,c.O5,c.ax],styles:[".ngx-spinner-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%}.ngx-spinner-overlay[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(.loading-text){top:50%;left:50%;margin:0;position:absolute;transform:translate(-50%,-50%)}.loading-text[_ngcontent-%COMP%]{position:absolute;top:60%;left:50%;transform:translate(-50%,-60%)}"],data:{animation:[(0,g.X$)("fadeIn",[(0,g.SB)("in",(0,g.oB)({opacity:1})),(0,g.eR)(":enter",[(0,g.oB)({opacity:0}),(0,g.jt)(300)]),(0,g.eR)(":leave",(0,g.jt)(200,(0,g.oB)({opacity:0})))])]},changeDetection:0})}return o})(),ce=(()=>{class o{static forRoot(t){return{ngModule:o,providers:[{provide:U,useValue:t}]}}static#e=this.\u0275fac=function(n){return new(n||o)};static#t=this.\u0275mod=e.oAB({type:o});static#n=this.\u0275inj=e.cJS({imports:[c.ez]})}return o})();var L=l(6760),R=l(707),M=l(3714),H=l(3965),O=l(1230),B=l(4104),E=l(3722);function pe(o,s){1&o&&(e.TgZ(0,"span",2),e._uU(1,"Registrar Alumno"),e.qZA())}function ue(o,s){1&o&&(e.TgZ(0,"small",40),e._uU(1,"Campo obligatorio *"),e.qZA())}function me(o,s){1&o&&(e.TgZ(0,"small",40),e._uU(1,"Campo obligatorio *"),e.qZA())}function de(o,s){1&o&&(e.TgZ(0,"small",40),e._uU(1,"Campo obligatorio *"),e.qZA())}function ge(o,s){1&o&&(e.TgZ(0,"small",40),e._uU(1,"Campo obligatorio *"),e.qZA())}function he(o,s){1&o&&(e.TgZ(0,"small",40),e._uU(1,"Campo obligatorio *"),e.qZA())}function fe(o,s){1&o&&(e.TgZ(0,"small",40),e._uU(1,"Campo obligatorio *"),e.qZA())}function ve(o,s){1&o&&(e.TgZ(0,"small",40),e._uU(1,"Campo obligatorio *"),e.qZA())}function _e(o,s){1&o&&(e.TgZ(0,"small",40),e._uU(1,"Campo obligatorio *"),e.qZA())}function be(o,s){1&o&&(e.TgZ(0,"small",40),e._uU(1,"Formato inv\xe1lido *"),e.qZA())}function Ce(o,s){1&o&&(e.TgZ(0,"small",40),e._uU(1,"Campo obligatorio *"),e.qZA())}function xe(o,s){1&o&&e._UZ(0,"ngx-spinner",41)}function Ae(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"form",3),e.NdJ("ngSubmit",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.saveAlumno())}),e.TgZ(1,"div",4)(2,"div",5)(3,"div",6)(4,"span",7),e._UZ(5,"i",8)(6,"input",9),e.TgZ(7,"label",10),e._uU(8,"C\xf3digo de Estudiante"),e.qZA()(),e.YNc(9,ue,2,0,"small",11),e.qZA(),e.TgZ(10,"div",6)(11,"span",12),e._UZ(12,"p-dropdown",13),e.TgZ(13,"label",14),e._uU(14,"Tipo de documento de identidad"),e.qZA(),e.YNc(15,me,2,0,"small",11),e.qZA()()()(),e.TgZ(16,"div",4)(17,"div",5)(18,"div",6)(19,"span",7),e._UZ(20,"i",8)(21,"input",15),e.TgZ(22,"label",16),e._uU(23,"Numero de Documento"),e.qZA()(),e.YNc(24,de,2,0,"small",11),e.qZA(),e.TgZ(25,"div",6)(26,"span",7),e._UZ(27,"i",8)(28,"input",17),e.TgZ(29,"label",18),e._uU(30,"Nombres"),e.qZA()(),e.YNc(31,ge,2,0,"small",11),e.qZA(),e.TgZ(32,"div",6)(33,"span",7),e._UZ(34,"i",8)(35,"input",19),e.TgZ(36,"label",20),e._uU(37,"Correo"),e.qZA()(),e.YNc(38,he,2,0,"small",11),e.qZA(),e.TgZ(39,"div",6)(40,"span",7),e._UZ(41,"i",8)(42,"input",21),e.TgZ(43,"label",22),e._uU(44,"Direccion"),e.qZA()(),e.YNc(45,fe,2,0,"small",11),e.qZA()()(),e.TgZ(46,"div",23)(47,"div",5)(48,"div",6)(49,"span",7),e._UZ(50,"i",8)(51,"input",24),e.TgZ(52,"label",25),e._uU(53,"Apellidos"),e.qZA()(),e.YNc(54,ve,2,0,"small",11),e.qZA(),e.TgZ(55,"div",6)(56,"span",7),e._UZ(57,"i",8)(58,"input",26),e.TgZ(59,"label",27),e._uU(60,"Nro de Celular"),e.qZA()(),e.YNc(61,_e,2,0,"small",11),e.YNc(62,be,2,0,"small",11),e.qZA()()(),e.TgZ(63,"div",23)(64,"div",5)(65,"div",6)(66,"span",12),e._UZ(67,"p-dropdown",28),e.TgZ(68,"label",29),e._uU(69,"Carrera Profesional"),e.qZA()()(),e.TgZ(70,"div",6)(71,"span",12),e._UZ(72,"p-dropdown",30),e.TgZ(73,"label",31),e._uU(74,"Ciclos acad\xe9micos"),e.qZA()()()()(),e.TgZ(75,"div",23)(76,"div",5)(77,"div",6)(78,"span",12)(79,"p-calendar",32),e.NdJ("onSelect",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.capturarFecha(i))}),e.qZA(),e.TgZ(80,"label",33),e._uU(81,"Fecha de nacimiento"),e.qZA()(),e.YNc(82,Ce,2,0,"small",11),e.qZA()()(),e.TgZ(83,"div",4)(84,"div",5)(85,"div",6),e._UZ(86,"p-toast"),e.TgZ(87,"p-fileUpload",34),e.NdJ("onUpload",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.onUpload(i))})("onSelect",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.onPerfilSelect(i))}),e.qZA()(),e.TgZ(88,"div",6),e._UZ(89,"p-toast"),e.TgZ(90,"p-fileUpload",35),e.NdJ("onUpload",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.onUpload(i))})("onSelect",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.onCarnetSelect(i))}),e.qZA()()()(),e.TgZ(91,"div",36),e._UZ(92,"button",37),e.TgZ(93,"button",38),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.closeModal())}),e.qZA()()(),e.YNc(94,xe,1,0,"ngx-spinner",39)}if(2&o){const t=e.oxw();let n,i,a,p,C,x,A,T,Z,S;e.Q6J("formGroup",t.alumnoForm),e.xp6(9),e.Q6J("ngIf",(null==(n=t.alumnoForm.get("codigo"))?null:n.invalid)&&(null==(n=t.alumnoForm.get("codigo"))?null:n.touched)),e.xp6(3),e.Q6J("autoDisplayFirst",!1)("options",t.tipodocu),e.xp6(3),e.Q6J("ngIf",(null==(i=t.alumnoForm.get("tipoDocumento"))?null:i.invalid)&&(null==(i=t.alumnoForm.get("tipoDocumento"))?null:i.touched)),e.xp6(9),e.Q6J("ngIf",(null==(a=t.alumnoForm.get("numeroDocumento"))?null:a.invalid)&&(null==(a=t.alumnoForm.get("numeroDocumento"))?null:a.touched)),e.xp6(7),e.Q6J("ngIf",(null==(p=t.alumnoForm.get("nombres"))?null:p.invalid)&&(null==(p=t.alumnoForm.get("nombres"))?null:p.touched)),e.xp6(7),e.Q6J("ngIf",(null==(C=t.alumnoForm.get("email"))?null:C.invalid)&&(null==(C=t.alumnoForm.get("email"))?null:C.touched)),e.xp6(7),e.Q6J("ngIf",(null==(x=t.alumnoForm.get("direccion"))?null:x.invalid)&&(null==(x=t.alumnoForm.get("direccion"))?null:x.touched)),e.xp6(9),e.Q6J("ngIf",(null==(A=t.alumnoForm.get("apellidos"))?null:A.invalid)&&(null==(A=t.alumnoForm.get("apellidos"))?null:A.touched)),e.xp6(7),e.Q6J("ngIf",(null==(T=t.alumnoForm.get("nroCelular"))?null:T.invalid)&&(null==(T=t.alumnoForm.get("nroCelular"))?null:T.touched)),e.xp6(1),e.Q6J("ngIf",(null==(Z=t.alumnoForm.get("nroCelular"))?null:Z.hasError("pattern"))&&(null==(Z=t.alumnoForm.get("nroCelular"))?null:Z.touched)),e.xp6(5),e.Q6J("options",t.carrerasList),e.xp6(5),e.Q6J("options",t.ciclosList),e.xp6(7),e.Q6J("showTime",!1)("showSeconds",!1),e.xp6(3),e.Q6J("ngIf",(null==(S=t.alumnoForm.get("fechaNacimiento"))?null:S.invalid)&&(null==(S=t.alumnoForm.get("fechaNacimiento"))?null:S.touched)),e.xp6(12),e.Q6J("ngIf",t.loading)}}let J=(()=>{class o{constructor(t,n,i,a,p,C,x,A,T,Z,S){this.router=t,this.ref=n,this.cdr=i,this.config=a,this.parametroService=p,this.translate=C,this.messageService=x,this.alumnoService=A,this.commonService=T,this.fb=Z,this.spinner=S,this.carrerasList=[],this.ciclosList=[],this.fechanacimiento=new Date,this.calendarOptions={initialView:"dayGridMonth",locale:w.Z},this.loading=!1,this.alumnoForm=this.fb.group({codigo:["",r.kI.required],tipoDocumento:["",r.kI.required],numeroDocumento:["",r.kI.required],nombres:["",r.kI.required],apellidos:["",r.kI.required],email:["",[r.kI.required,r.kI.email]],nroCelular:["",[r.kI.required,r.kI.pattern(/^[0-9]{9}$/)]],carreraId:["",r.kI.required],cicloId:["",r.kI.required],direccion:[""],fechaNacimiento:[this.fechanacimiento,r.kI.required],fotoPerfil:[null],fotoCarnet:[null]})}onGlobalFilter(t,n){t.filterGlobal(n.target.value,"contains")}ngOnInit(){this.tipodocu=[{name:"DNI",value:1,code:"NY"},{name:"PASAPORTE",value:2,code:"RM"}],this.translate?this.translateChange("es"):console.error("TranslateService is not initialized."),this.config.data&&(this.alumno=this.config.data.alumno,this.alumno&&this.alumnoForm.patchValue({codigo:this.alumno.codigo,tipoDocumento:1,numeroDocumento:this.alumno.dni,nombres:this.alumno.nombres,apellidos:this.alumno.apellidos,email:this.alumno.email,nroCelular:this.alumno.celular,carreraId:this.alumno.carrera_id,cicloId:this.alumno.ciclo_id,direccion:this.alumno.direccion,fechaNacimiento:new Date(this.alumno.fecha_nacimiento),fotoPerfil:this.alumno.foto_perfil,fotoCarnet:this.alumno.foto_carnet})),this.getCarrerasDropdown(),this.getCiclosDropdown()}getAge(t){const n=new Date,i=new Date(t);let a=n.getFullYear()-i.getFullYear();const p=n.getMonth()-i.getMonth();return(p<0||0===p&&n.getDate()<i.getDate())&&a--,a}onCarnetSelect(t){this.alumnoForm.patchValue({fotoCarnet:t.files[0]})}onPerfilSelect(t){this.alumnoForm.patchValue({fotoPerfil:t.files[0]})}getCarrerasDropdown(){this.commonService.getCarrerasDropdown().subscribe(t=>{console.log("Carreras",t),this.carrerasList=t.map(n=>({name:n.nombres,value:n.id}))},t=>{console.error("Error obteniendo carreras",t)})}getCiclosDropdown(){this.commonService.getCiclosDropdown().subscribe(t=>{this.ciclosList=t.map(n=>({name:n.tx_nombre,value:n.nu_id_parametro})),console.log("Ciclos",t)},t=>{console.error("Error obteniendo ciclos",t)})}cambiarIdioma(){this.translateService.use("es")}translateChange(t){this.translate?this.translate.use(t):console.error("TranslateService is not initialized.")}onUpload(t){this.messageService.add({severity:"info",summary:"Success",detail:"Archivo cargado correctamente"})}saveAlumno(){if(this.alumnoForm.valid){const t=new FormData;if(t.append("codigo",this.alumnoForm.get("codigo")?.value),t.append("tipoDocumento",this.alumnoForm.get("tipoDocumento")?.value),t.append("numeroDocumento",this.alumnoForm.get("numeroDocumento")?.value),t.append("nombres",this.alumnoForm.get("nombres")?.value),t.append("apellidos",this.alumnoForm.get("apellidos")?.value),t.append("nroCelular",this.alumnoForm.get("nroCelular")?.value),t.append("carreraId",this.alumnoForm.get("carreraId")?.value),t.append("cicloId",this.alumnoForm.get("cicloId")?.value),t.append("email",this.alumnoForm.get("email")?.value),t.append("direccion",this.alumnoForm.get("direccion")?.value),this.alumnoForm.get("fotoCarnet")?.value&&t.append("fotoCarnet",this.alumnoForm.get("fotoCarnet")?.value),this.alumnoForm.get("fotoPerfil")?.value&&t.append("fotoPerfil",this.alumnoForm.get("fotoPerfil")?.value),this.alumno){t.append("id",this.alumno.id),t.append("domain_id",this.alumno.domain_id??"1");const n=this.alumnoForm.get("fechaNacimiento")?.value;if(n instanceof Date){const i=n.toISOString().split("T")[0];t.append("fechaNacimiento",i)}else console.error("Fecha de nacimiento no es una instancia de Date")}else t.append("domain_id","1");this.loading=!0,this.spinner.show(),this.alumnoService.saveAlumno(t).subscribe(n=>{this.loading=!1,this.spinner.hide(),this.ref.close({register:!0}),I().fire({title:"\xa1\xc9xito!",text:"Los Datos se registraron correctamente",icon:"success",confirmButtonText:"Aceptar"}).then(()=>{})},n=>{console.error("Error guardando alumno",n)})}else console.error("Formulario inv\xe1lido")}capturarFecha(t){console.log("Fecha",t);let n=new Date(t),i="";n instanceof Date&&(i=n.toISOString().split("T")[0]),console.log("Fecha",i),this.alumnoForm.patchValue({fechaNacimiento:n})}closeModal(){this.ref.close({register:!1})}static#e=this.\u0275fac=function(n){return new(n||o)(e.Y36(f.F0),e.Y36(u.E7),e.Y36(e.sBO),e.Y36(u.S),e.Y36(h.m),e.Y36(y.sK),e.Y36(v.ez),e.Y36(z),e.Y36($),e.Y36(r.qu),e.Y36(j))};static#t=this.\u0275cmp=e.Xpm({type:o,selectors:[["app-reg-alumno"]],features:[e._Bn([v.ez])],decls:3,vars:0,consts:[["pTemplate","header"],["pTemplate","content"],[1,"text-primary","font-semibold","text-xl"],[3,"formGroup","ngSubmit"],[1,"row","mb-4"],[1,"grid","p-fluid"],[1,"field","md:col-6"],[1,"p-float-label","p-input-icon-left"],[1,"pi","pi-user-edit"],["type","text","id","codigo","pInputText","","formControlName","codigo"],["for","codigo"],["style","color: brown;",4,"ngIf"],[1,"p-float-label"],["inputId","tipoDocumento","formControlName","tipoDocumento","optionLabel","name","optionValue","value",3,"autoDisplayFirst","options"],["for","tipoDocumento"],["type","text","id","numeroDocumento","pInputText","","formControlName","numeroDocumento"],["for","numeroDocumento"],["type","text","id","nombres","pInputText","","formControlName","nombres"],["for","nombres"],["type","text","id","email","pInputText","","formControlName","email"],["for","email"],["type","text","id","direccion","pInputText","","formControlName","direccion"],["for","direccion"],[1,"row"],["type","text","id","apellidos","pInputText","","formControlName","apellidos"],["for","apellidos"],["type","text","id","nroCelular","pInputText","","formControlName","nroCelular"],["for","nroCelular"],["inputId","carreraId","formControlName","carreraId","optionLabel","name","optionValue","value","placeholder","Selecciona una carrera",3,"options"],["for","carreraId"],["inputId","cicloId","formControlName","cicloId","optionLabel","name","optionValue","value","placeholder","Selecciona un ciclo",3,"options"],["for","cicloId"],["inputId","fechaNacimiento","formControlName","fechaNacimiento","dateFormat","dd-mm-yy",3,"showTime","showSeconds","onSelect"],["for","fechaNacimiento"],["mode","basic","chooseLabel","Adjunte foto de Perfil","chooseIcon","pi pi-upload","name","demo[]","url","https://www.primefaces.org/cdn/api/upload.php","accept","image/*",3,"onUpload","onSelect"],["mode","basic","chooseLabel","Adjunte foto tama\xf1o carnet","chooseIcon","pi pi-upload","name","demo[]","url","https://www.primefaces.org/cdn/api/upload.php","accept","image/*",3,"onUpload","onSelect"],[1,"row","mb-5","text-right"],["pButton","","label","Guardar","icon","pi pi-plus","id","btnGuardar","type","submit",1,"p-button-success","mr-2"],["pButton","","label","Cancelar","icon","pi pi-times","id","btnCancelar",1,"p-button-danger",3,"click"],["bdColor","rgba(0,0,0,0.5)","size","large","color","#fff","type","ball-spin",4,"ngIf"],[2,"color","brown"],["bdColor","rgba(0,0,0,0.5)","size","large","color","#fff","type","ball-spin"]],template:function(n,i){1&n&&(e.TgZ(0,"p-panel"),e.YNc(1,pe,2,0,"ng-template",0),e.YNc(2,Ae,95,18,"ng-template",1),e.qZA())},dependencies:[c.O5,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,L.f,R.Hq,v.jx,M.o,H.Lt,O.s,B.FN,E.p,se]})}return o})();var P=l(9552);const Te=["filter"],Ze=["dt1"];function Se(o,s){1&o&&(e.TgZ(0,"span",2),e._uU(1,"Bandeja de Alumno"),e.qZA())}function ye(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"div",12)(1,"div",13)(2,"span",14)(3,"input",15,16),e.NdJ("input",function(i){e.CHM(t),e.oxw();const a=e.MAs(4),p=e.oxw();return e.KtG(p.onGlobalFilter(a,i))}),e.qZA()()(),e.TgZ(5,"div",17)(6,"button",18),e.NdJ("click",function(){e.CHM(t);const i=e.oxw(2);return e.KtG(i.navigateToNuevo())}),e.qZA()()()}}function Ie(o,s){1&o&&(e.TgZ(0,"tr")(1,"th",19)(2,"div",20),e._uU(3," Nombres de Alumno "),e.qZA()(),e.TgZ(4,"th",19)(5,"div",20),e._uU(6," Instituci\xf3n "),e.qZA()(),e.TgZ(7,"th",19)(8,"div",20),e._uU(9," Carrera T\xe9cnica "),e.qZA()(),e.TgZ(10,"th",19)(11,"div",20),e._uU(12," Siglo "),e.qZA()(),e.TgZ(13,"th",19)(14,"div",20),e._uU(15," Acciones "),e.qZA()()())}function Ne(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td")(10,"div",20)(11,"button",21),e.NdJ("click",function(){const a=e.CHM(t).$implicit,p=e.oxw(2);return e.KtG(p.navigateToEditar(a))}),e.qZA(),e.TgZ(12,"button",22),e.NdJ("click",function(){const a=e.CHM(t).$implicit,p=e.oxw(2);return e.KtG(p.eliminarAlumno(a))}),e.qZA()()()()}if(2&o){const t=s.$implicit;e.xp6(2),e.AsE("",t.nombres," ",t.apellidos,""),e.xp6(2),e.Oqu(t.institucion),e.xp6(2),e.Oqu(t.carrera_nombre),e.xp6(2),e.Oqu(t.ciclo_nombre)}}function we(o,s){1&o&&(e.TgZ(0,"tr")(1,"td",23),e._uU(2,"No se encontraron registros"),e.qZA()())}function Fe(o,s){1&o&&(e.TgZ(0,"tr")(1,"td",23),e._uU(2,"Cargando registros. Por favor espere."),e.qZA()())}const De=function(){return["nombres","institucion","carrera_nombre","ciclo_nombre"]};function Ue(o,s){if(1&o&&(e.TgZ(0,"div",3)(1,"div",4)(2,"div",5)(3,"p-table",6,7),e.YNc(5,ye,7,0,"ng-template",8),e.YNc(6,Ie,16,0,"ng-template",0),e.YNc(7,Ne,13,5,"ng-template",9),e.YNc(8,we,3,0,"ng-template",10),e.YNc(9,Fe,3,0,"ng-template",11),e.qZA()()()()),2&o){const t=e.oxw();e.xp6(3),e.Q6J("value",t.instituciones)("rows",10)("loading",t.loading)("rowHover",!0)("paginator",!0)("globalFilterFields",e.DdM(6,De))}}let Re=(()=>{class o{constructor(t,n,i,a){this.dialogService=t,this.maestroService=n,this.alumnoService=i,this.router=a,this.instituciones=[],this.loading=!1}ngOnInit(){console.log("Datos-extraidos-de-bandeja-colegiado-PARA MIEMBRO"),this.cargaInicial()}cargaInicial(){this.loading=!0,this.alumnoService.getAlumnos().subscribe(t=>{this.instituciones=t,this.loading=!1},t=>{this.loading=!1})}eliminarAlumno(t){I().fire({title:"Desea eliminar el alumno?",text:"No podr\xe1 revertir esta acci\xf3n",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"S\xed",cancelButtonText:"No"}).then(n=>{n.isConfirmed&&this.alumnoService.deleteAlumno({domain_id:t.domain_id??1,id:t.id}).subscribe(a=>{I().fire({title:"\xa1\xc9xito!",text:"eliminado correctamente",icon:"success",confirmButtonText:"Aceptar"}).then(()=>{this.cargaInicial()},p=>{this.loading=!1,I().fire({title:"\xa1Error!",text:"Error al eliminar",icon:"error",confirmButtonText:"Aceptar"})})})})}navigateToEditar(t){this.alumnoService.showAlumno({domain_id:t.domain_id??1,id:t.id}).subscribe(i=>{this.ref=this.dialogService.open(J,{data:{alumno:i},width:"60%",styleClass:"custom-dialog-header"}),this.ref.onClose.subscribe(a=>{console.log(a),a&&a.register&&(console.log("Organo-colegaido-sect"),this.cargaInicial()),this.router.routeReuseStrategy.shouldReuseRoute=()=>!1,this.router.onSameUrlNavigation="reload"})},i=>{this.loading=!1})}navigateToNuevo(){this.ref=this.dialogService.open(J,{width:"60%",styleClass:"custom-dialog-header"}),this.ref.onClose.subscribe(t=>{t&&t.register&&this.cargaInicial(),this.router.routeReuseStrategy.shouldReuseRoute=()=>!1,this.router.onSameUrlNavigation="reload"})}onGlobalFilter(t,n){t&&(console.log("Organo-colegaido-sect"),t.filterGlobal(n.target.value,"contains"))}onRowSelect(t){console.log("Organo-colegaido-sect")}onRowUnselect(t){}static#e=this.\u0275fac=function(n){return new(n||o)(e.Y36(u.xA),e.Y36(h.m),e.Y36(z),e.Y36(f.F0))};static#t=this.\u0275cmp=e.Xpm({type:o,selectors:[["app-bandeja-alumno"]],viewQuery:function(n,i){if(1&n&&(e.Gf(Te,5),e.Gf(Ze,5)),2&n){let a;e.iGM(a=e.CRH())&&(i.filter=a.first),e.iGM(a=e.CRH())&&(i.tabledt1=a.first)}},decls:3,vars:0,consts:[["pTemplate","header"],["pTemplate","content"],[1,"text-primary","font-semibold","text-xl"],[1,"row","mb-4"],[1,"grid","p-fluid"],[1,"field","md:col-12"],["styleClass","p-datatable-gridlines","responsiveLayout","scroll",1,"custom-search-input",3,"value","rows","loading","rowHover","paginator","globalFilterFields"],["dt1",""],["pTemplate","caption"],["pTemplate","body"],["pTemplate","emptymessage"],["pTemplate","loadingbody"],[1,"flex","justify-content-between","flex-wrap"],[1,"flex-grow-1","mb-2","mr-2"],[1,"p-input-icon-left","w-full"],["pInputText","","type","text","placeholder","Buscar Alumno",1,"w-full",3,"input"],["filter",""],[1,"mb-2"],["pButton","","label","Nuevo","icon","pi pi-user-plus","id","btnNuevo",1,"p-button-primary","mr-2",2,"border-radius","30px",3,"click"],["scope","col",2,"min-width","10rem"],[1,"flex","justify-content-between","align-items-center"],["pButton","","icon","pi pi-pencil",1,"p-button-info","p-button-sm",3,"click"],["pButton","","icon","pi pi-trash",1,"p-button-danger","p-button-sm",3,"click"],["colspan","8"]],template:function(n,i){1&n&&(e.TgZ(0,"p-panel"),e.YNc(1,Se,2,0,"ng-template",0),e.YNc(2,Ue,10,7,"ng-template",1),e.qZA())},dependencies:[R.Hq,v.jx,P.iA,M.o,O.s]})}return o})(),Me=(()=>{class o{static#e=this.\u0275fac=function(n){return new(n||o)};static#t=this.\u0275mod=e.oAB({type:o});static#n=this.\u0275inj=e.cJS({imports:[f.Bz.forChild([{path:"",component:Re}]),f.Bz]})}return o})();var Oe=l(6804),q=l(4480),G=l(4055),Be=l(6651),Ee=l(7902),Ye=l(6022),Q=l(1494),ze=l(6218),je=l(3259),Le=l(3904),He=l(3530),Je=l(9537);let Pe=(()=>{class o{static#e=this.\u0275fac=function(n){return new(n||o)};static#t=this.\u0275mod=e.oAB({type:o});static#n=this.\u0275inj=e.cJS({providers:[v.ez],imports:[c.ez,Me,r.UX,r.u5,L._8,P.U$,Ye.Xt,R.hJ,Ee.JH,M.j,ze.A,Oe.KZ,q.T,G.q4,H.kW,O.Q,Be.q,B.EV,Q.n,E.O,je.z,B.EV,Q.n,Le.D,E.O,He.S,u.DL,y.aw,q.T,G.q4,Je.Z_,ce]})}return o})()},2538:(Y,b,l)=>{l.d(b,{Z:()=>c});var c={code:"es",week:{dow:1,doy:4},buttonText:{prev:"Ant",next:"Sig",today:"Hoy",year:"A\xf1o",month:"Mes",week:"Semana",day:"D\xeda",list:"Agenda"},buttonHints:{prev:"$0 antes",next:"$0 siguiente",today:r=>"D\xeda"===r?"Hoy":("Semana"===r?"Esta":"Este")+" "+r.toLocaleLowerCase()},viewHint:r=>"Vista "+("Semana"===r?"de la":"del")+" "+r.toLocaleLowerCase(),weekText:"Sm",weekTextLong:"Semana",allDayText:"Todo el d\xeda",moreLinkText:"m\xe1s",moreLinkHint:r=>`Mostrar ${r} eventos m\xe1s`,noEventsText:"No hay eventos para mostrar",navLinkHint:"Ir al $0",closeHint:"Cerrar",timeHint:"La hora",eventHint:"Evento"}},6218:(Y,b,l)=>{l.d(b,{A:()=>v,g:()=>w});var c=l(8926),r=l(6814),f=l(6223);let w=(()=>{class d{el;ngModel;control;cd;autoResize;onResize=new c.vpe;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;constructor(e,u,h,y){this.el=e,this.ngModel=u,this.control=h,this.cd=y}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewChecked(){this.updateState()}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(e){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}resize(e){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(e||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(u){return new(u||d)(c.Y36(c.SBq),c.Y36(f.On,8),c.Y36(f.a5,8),c.Y36(c.sBO))};static \u0275dir=c.lG2({type:d,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(u,h){1&u&&c.NdJ("input",function(m){return h.onInput(m)}),2&u&&c.ekj("p-filled",h.filled)("p-inputtextarea-resizable",h.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}})}return d})(),v=(()=>{class d{static \u0275fac=function(u){return new(u||d)};static \u0275mod=c.oAB({type:d});static \u0275inj=c.cJS({imports:[r.ez]})}return d})()}}]);
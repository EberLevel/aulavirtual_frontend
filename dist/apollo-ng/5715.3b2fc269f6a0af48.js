"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[5715],{5715:(P,C,o)=>{o.r(C),o.d(C,{LoginModule:()=>D});var t=o(6814),f=o(8007),S=o(3519),g=o.n(S),e=o(8926),c=o(3859),w=o(5516),m=o(9862);let M=(()=>{class a{constructor(p){this.http=p,this.baseUrl=`${w.N.API_BASE}`,this.urlparametro=`${w.N.API_BASE}`}loginUser(p){return this.http.post(`${this.baseUrl}login`,p)}static#e=this.\u0275fac=function(i){return new(i||a)(e.LFG(m.eN))};static#t=this.\u0275prov=e.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"})}return a})();var v=o(8672),O=o(707),I=o(3714),h=o(6223),A=o(1111);function T(a,N){1&a&&e._UZ(0,"ngx-spinner",25)}let b=(()=>{class a{constructor(p,i,r,n){this.layoutService=p,this.router=i,this.loginService=r,this.spinner=n,this.loading=!1,this.rememberMe=!1,this.email="",this.password=""}get dark(){return"light"!==this.layoutService.config.colorScheme}ngOnInit(){this.tiporoles=[{name:"Alumno",value:1,code:"NY"},{name:"Administrador",value:2,code:"RM"},{name:"Docente",value:3,code:"LDN"}],this.checkUserIsLogged()&&this.router.navigate(["/pl-virtual"])}checkUserIsLogged(){return!!localStorage.getItem("user")}irAlLogin(){if(this.email.trim()&&this.password.trim()){const p=new FormData;p.append("email",this.email),p.append("password",this.password),this.spinner.show(),this.loading=!0,this.loginService.loginUser(p).subscribe(i=>{try{if(200===i.status){this.spinner.hide(),this.loading=!1;const r=i.user;localStorage.getItem("user")&&localStorage.removeItem("user"),localStorage.setItem("user",JSON.stringify(r)),g().fire({title:"\xa1\xc9xito!",text:"Datos correctos",icon:"success",confirmButtonText:"Aceptar"}).then(()=>{}),this.router.navigate(21!==r.rol_id?["/pl-virtual"]:["/formulario-oi"])}else this.spinner.hide(),this.loading=!1,g().fire({title:"\xa1Error!",text:"Revisa los datos ingresados",icon:"error",confirmButtonText:"Aceptar"})}catch{this.spinner.hide(),this.loading=!1,g().fire({title:"\xa1Error!",text:"Revisa los datos ingresados",icon:"error",confirmButtonText:"Aceptar"})}})}else g().fire({title:"\xa1Error!",text:"Revisa los datos ingresados",icon:"error",confirmButtonText:"Aceptar"})}static#e=this.\u0275fac=function(i){return new(i||a)(e.Y36(c.P),e.Y36(f.F0),e.Y36(M),e.Y36(v.t2))};static#t=this.\u0275cmp=e.Xpm({type:a,selectors:[["ng-component"]],decls:32,vars:9,consts:[["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 1600 800","preserveAspectRatio","none",1,"fixed","left-0","top-0","min-h-screen","min-w-screen"],["width","1600","height","800"],["d","M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"],["d","M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"],["d","M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"],["d","M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"],[1,"px-5","min-h-screen","flex","justify-content-center","align-items-center"],[1,"border-1","surface-border","surface-card","border-round","py-7","px-4","md:px-7","z-1"],[1,"mb-5","text-center"],[1,"text-900","text-xl","font-bold","mb-6"],[1,"row","mb-4"],[1,"row","mb-6"],[1,"grid","p-fluid"],[1,"p-float-label","p-input-icon-left","w-full","mb-4"],[1,"pi","pi-envelope"],["id","email","type","text","pInputText","",1,"w-full","md:w-25rem",3,"ngModel","ngModelChange"],["for","email"],[1,"pi","pi-lock"],["id","password","type","password","pInputText","",1,"w-full","md:w-25rem",3,"ngModel","ngModelChange"],["for","password"],["pButton","","pRipple","","label","Ingresar",1,"w-full","mb-5",3,"click"],[1,"mt-4","text-center"],[1,"text-600","cursor-pointer","hover:text-primary","transition-colors","transition-duration-300"],["bdColor","rgba(0,0,0,0.5)","size","large","color","white","type","ball-spin",4,"ngIf"],[3,"minimal"],["bdColor","rgba(0,0,0,0.5)","size","large","color","white","type","ball-spin"]],template:function(i,r){1&i&&(e.O4$(),e.TgZ(0,"svg",0),e._UZ(1,"rect",1)(2,"path",2)(3,"path",3)(4,"path",4)(5,"path",5),e.qZA(),e.kcU(),e.TgZ(6,"div",6)(7,"div",7)(8,"div",8)(9,"div",9),e._uU(10,"Login"),e.qZA()(),e._UZ(11,"div",10),e.TgZ(12,"div",11)(13,"div",12)(14,"div",13),e._UZ(15,"i",14),e.TgZ(16,"input",15),e.NdJ("ngModelChange",function(s){return r.email=s}),e.qZA(),e.TgZ(17,"label",16),e._uU(18,"Email"),e.qZA()()()(),e.TgZ(19,"div",11)(20,"div",12)(21,"div",13),e._UZ(22,"i",17),e.TgZ(23,"input",18),e.NdJ("ngModelChange",function(s){return r.password=s}),e.qZA(),e.TgZ(24,"label",19),e._uU(25,"Contrase\xf1a"),e.qZA()()()(),e.TgZ(26,"button",20),e.NdJ("click",function(){return r.irAlLogin()}),e.qZA(),e.TgZ(27,"div",21)(28,"a",22),e._uU(29,"T\xe9rminos y condiciones"),e.qZA()()(),e.YNc(30,T,1,0,"ngx-spinner",23),e.qZA(),e._UZ(31,"app-config",24)),2&i&&(e.xp6(1),e.uIk("fill",r.dark?"var(--primary-900)":"var(--primary-500)"),e.xp6(1),e.uIk("fill",r.dark?"var(--primary-800)":"var(--primary-400)"),e.xp6(1),e.uIk("fill",r.dark?"var(--primary-700)":"var(--primary-300)"),e.xp6(1),e.uIk("fill",r.dark?"var(--primary-600)":"var(--primary-200)"),e.xp6(1),e.uIk("fill",r.dark?"var(--primary-500)":"var(--primary-100)"),e.xp6(11),e.Q6J("ngModel",r.email),e.xp6(7),e.Q6J("ngModel",r.password),e.xp6(7),e.Q6J("ngIf",r.loading),e.xp6(1),e.Q6J("minimal",!0))},dependencies:[t.O5,O.Hq,I.o,h.Fj,h.JJ,h.On,A.P,v.Ro],encapsulation:2})}return a})(),x=(()=>{class a{static#e=this.\u0275fac=function(i){return new(i||a)};static#t=this.\u0275mod=e.oAB({type:a});static#n=this.\u0275inj=e.cJS({imports:[f.Bz.forChild([{path:"",component:b}]),f.Bz]})}return a})();var d=o(8057),_=o(1567),y=o(3965);let D=(()=>{class a{static#e=this.\u0275fac=function(i){return new(i||a)};static#t=this.\u0275mod=e.oAB({type:a});static#n=this.\u0275inj=e.cJS({imports:[t.ez,x,O.hJ,I.j,d.nD,h.u5,_.h,y.kW,v.ef]})}return a})()},8672:(P,C,o)=>{o.d(C,{Ro:()=>a,ef:()=>N,t2:()=>_});var t=o(8926),f=o(5619),S=o(8645),g=o(2181),e=o(9773),c=o(6825),w=o(6593),m=o(6814);const M=["overlay"];function v(i,r){1&i&&t._UZ(0,"div")}function O(i,r){if(1&i&&(t.TgZ(0,"div"),t.YNc(1,v,1,0,"div",6),t.qZA()),2&i){const n=t.oxw(2);t.Tol(n.spinner.class),t.Udp("color",n.spinner.color),t.xp6(1),t.Q6J("ngForOf",n.spinner.divArray)}}function I(i,r){if(1&i&&(t._UZ(0,"div",7),t.ALo(1,"safeHtml")),2&i){const n=t.oxw(2);t.Q6J("innerHTML",t.lcZ(1,1,n.template),t.oJD)}}function h(i,r){if(1&i&&(t.TgZ(0,"div",1,2),t.YNc(2,O,2,5,"div",3),t.YNc(3,I,2,3,"div",4),t.TgZ(4,"div",5),t.Hsn(5),t.qZA()()),2&i){const n=t.oxw();t.Udp("background-color",n.spinner.bdColor)("z-index",n.spinner.zIndex)("position",n.spinner.fullScreen?"fixed":"absolute"),t.Q6J("@.disabled",n.disableAnimation)("@fadeIn","in"),t.xp6(2),t.Q6J("ngIf",!n.template),t.xp6(1),t.Q6J("ngIf",n.template),t.xp6(1),t.Udp("z-index",n.spinner.zIndex)}}const A=["*"],T={"ball-8bits":16,"ball-atom":4,"ball-beat":3,"ball-circus":5,"ball-climbing-dot":4,"ball-clip-rotate":1,"ball-clip-rotate-multiple":2,"ball-clip-rotate-pulse":2,"ball-elastic-dots":5,"ball-fall":3,"ball-fussion":4,"ball-grid-beat":9,"ball-grid-pulse":9,"ball-newton-cradle":4,"ball-pulse":3,"ball-pulse-rise":5,"ball-pulse-sync":3,"ball-rotate":1,"ball-running-dots":5,"ball-scale":1,"ball-scale-multiple":3,"ball-scale-pulse":2,"ball-scale-ripple":1,"ball-scale-ripple-multiple":3,"ball-spin":8,"ball-spin-clockwise":8,"ball-spin-clockwise-fade":8,"ball-spin-clockwise-fade-rotating":8,"ball-spin-fade":8,"ball-spin-fade-rotating":8,"ball-spin-rotate":2,"ball-square-clockwise-spin":8,"ball-square-spin":8,"ball-triangle-path":3,"ball-zig-zag":2,"ball-zig-zag-deflect":2,cog:1,"cube-transition":2,fire:3,"line-scale":5,"line-scale-party":5,"line-scale-pulse-out":5,"line-scale-pulse-out-rapid":5,"line-spin-clockwise-fade":8,"line-spin-clockwise-fade-rotating":8,"line-spin-fade":8,"line-spin-fade-rotating":8,pacman:6,"square-jelly-box":2,"square-loader":1,"square-spin":1,timer:1,"triangle-skew-spin":1},x="primary";class d{constructor(r){Object.assign(this,r)}static create(r){return!r?.template&&!r?.type&&console.warn('[ngx-spinner]: Property "type" is missed. Please, provide animation type to <ngx-spinner> component\n        and ensure css is added to angular.json file'),new d(r)}}let _=(()=>{class i{constructor(){this.spinnerObservable=new f.X(null)}getSpinner(n){return this.spinnerObservable.asObservable().pipe((0,g.h)(s=>s&&s.name===n))}show(n=x,s){return new Promise((l,u)=>{setTimeout(()=>{s&&Object.keys(s).length?(s.name=n,this.spinnerObservable.next(new d({...s,show:!0})),l(!0)):(this.spinnerObservable.next(new d({name:n,show:!0})),l(!0))},10)})}hide(n=x,s=10){return new Promise((l,u)=>{setTimeout(()=>{this.spinnerObservable.next(new d({name:n,show:!1})),l(!0)},s)})}static#e=this.\u0275fac=function(s){return new(s||i)};static#t=this.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();const y=new t.OlP("NGX_SPINNER_CONFIG");let D=(()=>{class i{constructor(n){this._sanitizer=n}transform(n){if(n)return this._sanitizer.bypassSecurityTrustHtml(n)}static#e=this.\u0275fac=function(s){return new(s||i)(t.Y36(w.H7,16))};static#t=this.\u0275pipe=t.Yjl({name:"safeHtml",type:i,pure:!0,standalone:!0})}return i})(),a=(()=>{class i{constructor(n,s,l,u){this.spinnerService=n,this.changeDetector=s,this.elementRef=l,this.globalConfig=u,this.disableAnimation=!1,this.spinner=new d,this.ngUnsubscribe=new S.x,this.setDefaultOptions=()=>{const{type:E}=this.globalConfig??{};this.spinner=d.create({name:this.name,bdColor:this.bdColor,size:this.size,color:this.color,type:this.type??E,fullScreen:this.fullScreen,divArray:this.divArray,divCount:this.divCount,show:this.show,zIndex:this.zIndex,template:this.template,showSpinner:this.showSpinner})},this.bdColor="rgba(51,51,51,0.8)",this.zIndex=99999,this.color="#fff",this.size="large",this.fullScreen=!0,this.name=x,this.template=null,this.showSpinner=!1,this.divArray=[],this.divCount=0,this.show=!1}initObservable(){this.spinnerService.getSpinner(this.name).pipe((0,e.R)(this.ngUnsubscribe)).subscribe(n=>{this.setDefaultOptions(),Object.assign(this.spinner,n),n.show&&this.onInputChange(),this.changeDetector.detectChanges()})}ngOnInit(){this.setDefaultOptions(),this.initObservable()}isSpinnerZone(n){return n===this.elementRef.nativeElement.parentElement||n.parentNode&&this.isSpinnerZone(n.parentNode)}ngOnChanges(n){for(const s in n)if(s){const l=n[s];if(l.isFirstChange())return;typeof l.currentValue<"u"&&l.currentValue!==l.previousValue&&""!==l.currentValue&&(this.spinner[s]=l.currentValue,"showSpinner"===s&&(l.currentValue?this.spinnerService.show(this.spinner.name,this.spinner):this.spinnerService.hide(this.spinner.name)),"name"===s&&this.initObservable())}}getClass(n,s){this.spinner.divCount=T[n],this.spinner.divArray=Array(this.spinner.divCount).fill(0).map((u,E)=>E);let l="";switch(s.toLowerCase()){case"small":l="la-sm";break;case"medium":l="la-2x";break;case"large":l="la-3x"}return"la-"+n+" "+l}onInputChange(){this.spinner.class=this.getClass(this.spinner.type,this.spinner.size)}ngOnDestroy(){this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()}static#e=this.\u0275fac=function(s){return new(s||i)(t.Y36(_),t.Y36(t.sBO),t.Y36(t.SBq),t.Y36(y,8))};static#t=this.\u0275cmp=t.Xpm({type:i,selectors:[["ngx-spinner"]],viewQuery:function(s,l){if(1&s&&t.Gf(M,5),2&s){let u;t.iGM(u=t.CRH())&&(l.spinnerDOM=u.first)}},inputs:{bdColor:"bdColor",size:"size",color:"color",type:"type",fullScreen:"fullScreen",name:"name",zIndex:"zIndex",template:"template",showSpinner:"showSpinner",disableAnimation:"disableAnimation"},standalone:!0,features:[t.TTD,t.jDz],ngContentSelectors:A,decls:1,vars:1,consts:[["class","ngx-spinner-overlay",3,"background-color","z-index","position",4,"ngIf"],[1,"ngx-spinner-overlay"],["overlay",""],[3,"class","color",4,"ngIf"],[3,"innerHTML",4,"ngIf"],[1,"loading-text"],[4,"ngFor","ngForOf"],[3,"innerHTML"]],template:function(s,l){1&s&&(t.F$t(),t.YNc(0,h,6,12,"div",0)),2&s&&t.Q6J("ngIf",l.spinner.show)},dependencies:[D,m.O5,m.ax],styles:[".ngx-spinner-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%}.ngx-spinner-overlay[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(.loading-text){top:50%;left:50%;margin:0;position:absolute;transform:translate(-50%,-50%)}.loading-text[_ngcontent-%COMP%]{position:absolute;top:60%;left:50%;transform:translate(-50%,-60%)}"],data:{animation:[(0,c.X$)("fadeIn",[(0,c.SB)("in",(0,c.oB)({opacity:1})),(0,c.eR)(":enter",[(0,c.oB)({opacity:0}),(0,c.jt)(300)]),(0,c.eR)(":leave",(0,c.jt)(200,(0,c.oB)({opacity:0})))])]},changeDetection:0})}return i})(),N=(()=>{class i{static forRoot(n){return{ngModule:i,providers:[{provide:y,useValue:n}]}}static#e=this.\u0275fac=function(s){return new(s||i)};static#t=this.\u0275mod=t.oAB({type:i});static#n=this.\u0275inj=t.cJS({imports:[m.ez]})}return i})()}}]);
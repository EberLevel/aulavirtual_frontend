"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[1410],{1410:(w,v,s)=>{s.r(v),s.d(v,{ListaRolesModule:()=>Ee});var l=s(6814),f=s(8007),C=s(3519),h=s.n(C),e=s(8926),d=s(5219),A=s(3999),m=s(5118),p=s(4067),u=s(1230),g=s(6223),b=s(707),E=s(3714);function k(i,r){1&i&&(e.TgZ(0,"span",2),e._uU(1,"Registrar institutos"),e.qZA())}function V(i,r){if(1&i){const o=e.EpF();e.TgZ(0,"div",3)(1,"div",4)(2,"div",5)(3,"span",6),e._UZ(4,"i",7),e.TgZ(5,"input",8),e.NdJ("ngModelChange",function(n){e.CHM(o);const a=e.oxw();return e.KtG(a.nombre=n)}),e.qZA(),e.TgZ(6,"label",9),e._uU(7,"Nombre del rol"),e.qZA()(),e.TgZ(8,"small",10),e._uU(9,"Campo obligatorio *"),e.qZA()()()(),e.TgZ(10,"div",11)(11,"button",12),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.Guardaruser())}),e.qZA(),e.TgZ(12,"button",13),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.closeModal())}),e.qZA()()}if(2&i){const o=e.oxw();e.xp6(5),e.Q6J("ngModel",o.nombre)}}let M=(()=>{class i{constructor(o,t,n,a,c,_){this.router=o,this.primengConfig=t,this.translate=n,this.ref=a,this.rolService=c,this.config=_,this.visible=!1,this.id=0,this.nombre="",this.config.data?(this.id=this.config.data.id,this.nombre=this.config.data.nombre):(this.id=0,this.nombre="")}Guardaruser(){const o={nombre:this.nombre};this.id>0?this.rolService.actualizarRol(o,this.id).subscribe(t=>{this.closeModal(),h().fire({title:"\xa1\xc9xito!",text:"Los Datos se registraron correctamente",icon:"success",confirmButtonText:"Aceptar"}).then(()=>{this.router.navigate([this.router.url])})},t=>{console.error("Error al guardar el rol",t)}):(this.rolService.guardarRol(o).subscribe(t=>{this.closeModal(),h().fire({title:"\xa1\xc9xito!",text:"Los Datos se registraron correctamente",icon:"success",confirmButtonText:"Aceptar"}).then(()=>{this.router.navigate([this.router.url])})},t=>{console.error("Error al guardar el rol",t)}),h().fire({title:"\xa1\xc9xito!",text:"Los Datos se registraron correctamente",icon:"success",confirmButtonText:"Aceptar"}).then(()=>{}))}closeDialog(){this.visible=!1}closeModal(){this.ref.close({register:!1})}static#e=this.\u0275fac=function(t){return new(t||i)(e.Y36(f.F0),e.Y36(d.b4),e.Y36(A.sK),e.Y36(m.E7),e.Y36(p.m),e.Y36(m.S))};static#o=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-registra-rol"]],decls:3,vars:0,consts:[["pTemplate","header"],["pTemplate","content"],[1,"text-primary","font-semibold","text-xl"],[1,"row"],[1,"grid","p-fluid"],[1,"field","md:col-6"],[1,"p-float-label","p-input-icon-left"],[1,"pi","pi-user-edit"],["type","text","id","director","pInputText","",3,"ngModel","ngModelChange"],["for","director"],[2,"color","brown"],[1,"row","mb-5","text-right"],["pButton","","label","Guardar","icon","pi pi-plus","id","btnGuardar",1,"p-button-success","mr-2",3,"click"],["pButton","","label","Cerrar","icon","pi pi-times","iconPos","right",1,"p-button-close-clean",3,"click"]],template:function(t,n){1&t&&(e.TgZ(0,"p-panel"),e.YNc(1,k,2,0,"ng-template",0),e.YNc(2,V,13,1,"ng-template",1),e.qZA())},dependencies:[u.s,d.jx,g.Fj,g.JJ,g.On,b.Hq,E.o]})}return i})();var S=s(9552),T=s(3965),R=s(375);function U(i,r){if(1&i){const o=e.EpF();e.TgZ(0,"p-dropdown",5),e.NdJ("ngModelChange",function(n){e.CHM(o);const a=e.oxw(2);return e.KtG(a.selectedInstitucion=n)})("onChange",function(n){e.CHM(o);const a=e.oxw(2);return e.KtG(a.onInstitucionChange(n))}),e.qZA()}if(2&i){const o=e.oxw(2);e.Q6J("options",o.instituciones)("ngModel",o.selectedInstitucion)}}function Y(i,r){if(1&i&&(e.TgZ(0,"div",2)(1,"span",3),e._uU(2,"Asignar permiso"),e.qZA(),e.YNc(3,U,1,2,"p-dropdown",4),e.qZA()),2&i){const o=e.oxw();e.xp6(3),e.Q6J("ngIf",!o.domain_id)}}function B(i,r){1&i&&e.GkF(0)}const Z=function(i,r){return{$implicit:i,grupo:r}};function F(i,r){if(1&i&&(e.ynx(0),e.YNc(1,B,1,0,"ng-container",24),e.BQk()),2&i){const o=r.$implicit,t=e.oxw(2).$implicit,n=e.MAs(12);e.xp6(1),e.Q6J("ngTemplateOutlet",n)("ngTemplateOutletContext",e.WLB(2,Z,o,t))}}function J(i,r){if(1&i&&(e.TgZ(0,"div",22),e.YNc(1,F,2,5,"ng-container",23),e.qZA()),2&i){const o=e.oxw().$implicit;e.xp6(1),e.Q6J("ngForOf",o.permisos)}}const O=function(i){return{"rotate-icon":i}};function G(i,r){if(1&i){const o=e.EpF();e.TgZ(0,"button",14),e.NdJ("click",function(){e.CHM(o);const n=e.oxw().$implicit;return e.KtG(n.isExpanded=!n.isExpanded)}),e.O4$(),e.TgZ(1,"svg",15)(2,"g",16)(3,"g"),e._UZ(4,"path",30),e.qZA()()()()}if(2&i){const o=e.oxw().$implicit;e.xp6(1),e.Q6J("ngClass",e.VKq(1,O,o.isExpanded))}}function D(i,r){1&i&&e.GkF(0)}function z(i,r){if(1&i&&(e.ynx(0),e.YNc(1,D,1,0,"ng-container",24),e.BQk()),2&i){const o=r.$implicit,t=e.oxw(2).grupo;e.oxw();const n=e.MAs(12);e.xp6(1),e.Q6J("ngTemplateOutlet",n)("ngTemplateOutletContext",e.WLB(2,Z,o,t))}}function H(i,r){if(1&i&&(e.TgZ(0,"div",31),e.YNc(1,z,2,5,"ng-container",23),e.qZA()),2&i){const o=e.oxw().$implicit;e.xp6(1),e.Q6J("ngForOf",o.hijos)}}function $(i,r){if(1&i){const o=e.EpF();e.TgZ(0,"div",25)(1,"div",26),e.YNc(2,G,5,3,"button",27),e.TgZ(3,"input",18),e.NdJ("ngModelChange",function(n){const c=e.CHM(o).$implicit;return e.KtG(c.seleccionado=n)})("change",function(n){const a=e.CHM(o),c=a.$implicit,_=a.grupo,P=e.oxw(3);return e.KtG(P.onCheckboxChange(c.id,n,_))}),e.qZA(),e.TgZ(4,"span",28),e._uU(5),e.qZA()(),e.YNc(6,H,2,1,"div",29),e.qZA()}if(2&i){const o=r.$implicit;e.xp6(2),e.Q6J("ngIf",o.hijos&&o.hijos.length>0),e.xp6(1),e.Q6J("ngModel",o.seleccionado),e.xp6(2),e.Oqu(o.nombre),e.xp6(1),e.Q6J("ngIf",o.hijos&&o.hijos.length>0&&o.isExpanded)}}function K(i,r){if(1&i){const o=e.EpF();e.TgZ(0,"div",12)(1,"div",13)(2,"button",14),e.NdJ("click",function(){const a=e.CHM(o).$implicit;return e.KtG(a.expanded=!a.expanded)}),e.O4$(),e.TgZ(3,"svg",15)(4,"g",16)(5,"g"),e._UZ(6,"path",17),e.qZA()()()(),e.kcU(),e.TgZ(7,"input",18),e.NdJ("ngModelChange",function(n){const c=e.CHM(o).$implicit;return e.KtG(c.seleccionado=n)})("change",function(){const a=e.CHM(o).$implicit,c=e.oxw(2);return e.KtG(c.seleccionarGrupo(a))}),e.qZA(),e.TgZ(8,"span",19),e._uU(9),e.qZA()(),e.YNc(10,J,2,1,"div",20),e.YNc(11,$,7,4,"ng-template",null,21,e.W1O),e.qZA()}if(2&i){const o=r.$implicit;e.xp6(3),e.Q6J("ngClass",e.VKq(4,O,o.expanded)),e.xp6(4),e.Q6J("ngModel",o.seleccionado),e.xp6(2),e.Oqu(o.nombre),e.xp6(1),e.Q6J("ngIf",o.expanded)}}function Q(i,r){if(1&i){const o=e.EpF();e.TgZ(0,"div",6)(1,"div",7)(2,"div",8),e.YNc(3,K,13,6,"div",9),e.TgZ(4,"div",10)(5,"button",11),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.guardarPermisos())}),e._uU(6," Guardar "),e.qZA()()()()()}if(2&i){const o=e.oxw();e.xp6(3),e.Q6J("ngForOf",o.permisosAgrupados)}}let q=(()=>{class i{constructor(o,t,n,a,c,_,P){this.router=o,this.primengConfig=t,this.translate=n,this.ref=a,this.permisoService=c,this.config=_,this.helpersService=P,this.visible=!1,this.nombre="",this.permisosAgrupados=[],this.instituciones=[],this.permisosSeleccionados=new Set,this.domain_id=this.helpersService.getDominioId(),this.permisoService.getPermisos(this.domain_id).subscribe(x=>{this.permisos=x,this.organizarPermisosPorGrupo()}),this.permisoService.getEmpresasDropdown().subscribe(x=>{this.instituciones=x}),this.idRol=_.data,this.domain_id&&this.permisoService.getRolPermisos(this.idRol,this.domain_id).subscribe(x=>{this.permisosSeleccionados=new Set(x.map(Se=>Se.id)),this.organizarPermisosPorGrupo()})}toggleGrupo(o){o.expanded=!o.expanded}onInstitucionChange(o){this.selectedInstitucion=o.value,this.permisoService.getRolPermisos(this.idRol,this.selectedInstitucion??1).subscribe(t=>{this.permisosSeleccionados=new Set(t.map(n=>n.id)),this.organizarPermisosPorGrupo()})}onCheckboxChange(o,t,n){if(null===o)return void console.warn(`Permiso con ID nulo detectado en el grupo ${n.nombre}`);const a=t.target.checked,c=this.findPermisoById(n.permisos,o);c&&this.togglePermisoSeleccion(c,a),this.verificarSeleccionGrupo(n)}togglePermisoSeleccion(o,t){o.seleccionado=t,o.hijos&&o.hijos.length>0&&o.hijos.forEach(n=>{this.togglePermisoSeleccion(n,t)}),null!==o.id&&(t?this.permisosSeleccionados.add(o.id):this.permisosSeleccionados.delete(o.id))}verificarSeleccionGrupo(o){o.seleccionado=o.permisos.every(t=>this.verificarSeleccionPermiso(t))}verificarSeleccionPermiso(o){return o.hijos&&o.hijos.length>0?o.hijos.every(t=>this.verificarSeleccionPermiso(t)):o.seleccionado}ngOnInit(){this.organizarPermisosPorGrupo()}findPermisoById(o,t){if(null===t)return console.warn("Intento de b\xfasqueda de un permiso con ID nulo"),null;for(const n of o){if(n.id===t)return n;if(n.hijos&&n.hijos.length>0){const a=this.findPermisoById(n.hijos,t);if(a)return a}}return null}toggleGroup(o){o.isExpanded=!o.isExpanded}guardarPermisos(){const o={id:this.idRol,idPermisos:Array.from(this.permisosSeleccionados),domain_id:this.domain_id??this.selectedInstitucion};this.permisoService.guardarRolPermisos(o).subscribe(t=>{this.closeModal(),h().fire({title:"\xa1\xc9xito!",text:"Los Datos se registraron correctamente",icon:"success",confirmButtonText:"Aceptar"}).then(()=>{})},t=>{console.error("Error al guardar el rol",t)})}seleccionarGrupo(o){o.permisos.forEach(t=>{this.togglePermisoSeleccion(t,o.seleccionado),t.hijos&&t.hijos.length>0&&t.hijos.forEach(n=>{this.togglePermisoSeleccion(n,o.seleccionado)})})}organizarPermisosPorGrupo(){const o={Seguridad:{nombre:"Seguridad",id:null,seleccionado:!1,permisos:[{id:null,nombre:"Configuraci\xf3n",seleccionado:!1,hijos:[]},{id:null,nombre:"Roles y Permisos",seleccionado:!1,permisosInternos:[{id:null,nombre:"Crear Rol",seleccionado:!1},{id:null,nombre:"Editar Rol",seleccionado:!1},{id:null,nombre:"Eliminar Rol",seleccionado:!1},{id:null,nombre:"Asignar Permiso",seleccionado:!1},{id:null,nombre:"Ver Roles",seleccionado:!1}],isExpanded:!1},{id:10,nombre:"Usuarios",seleccionado:!1,hijos:[{id:11,nombre:"Nuevo",seleccionado:!1},{id:12,nombre:"Ver",seleccionado:!1},{id:13,nombre:"Editar",seleccionado:!1},{id:14,nombre:"Eliminar",seleccionado:!1}],isExpanded:!1}],isExpanded:!1},EstructuraOrganica:{nombre:"ESTRUCTURA ORG\xc1NICA",id:null,seleccionado:!1,permisos:[{id:null,nombre:"Mantenimientos",seleccionado:!1,hijos:[]},{id:null,nombre:"Instituciones",seleccionado:!1,hijos:[{id:17,nombre:"Nuevo",seleccionado:!1},{id:18,nombre:"Ver",seleccionado:!1},{id:null,nombre:"Editar",seleccionado:!1},{id:null,nombre:"Eliminar",seleccionado:!1},{id:21,nombre:"\xc1REAS",seleccionado:!1,hijos:[{id:22,nombre:"Nuevo",seleccionado:!1},{id:23,nombre:"Ver",seleccionado:!1},{id:24,nombre:"Editar",seleccionado:!1},{id:25,nombre:"Eliminar",seleccionado:!1},{id:26,nombre:"PUESTOS Y PERFILES",seleccionado:!1,hijos:[{id:27,nombre:"Nuevo",seleccionado:!1},{id:28,nombre:"Ver",seleccionado:!1},{id:29,nombre:"Editar",seleccionado:!1},{id:30,nombre:"Eliminar",seleccionado:!1}],isExpanded:!1}],isExpanded:!1}],isExpanded:!1},{id:95,nombre:"Banco de CV",seleccionado:!1,hijos:[{id:96,nombre:"Nuevo",seleccionado:!1},{id:97,nombre:"Ver",seleccionado:!1},{id:98,nombre:"Editar",seleccionado:!1},{id:99,nombre:"Eliminar",seleccionado:!1}],isExpanded:!1},{id:100,nombre:"Bolsa de Trabajo",seleccionado:!1,hijos:[{id:101,nombre:"Nuevo",seleccionado:!1},{id:102,nombre:"Ver",seleccionado:!1},{id:103,nombre:"Editar",seleccionado:!1},{id:104,nombre:"Eliminar",seleccionado:!1}],isExpanded:!1}],isExpanded:!1},AulaVirtual:{nombre:"AULA VIRTUAL",id:null,seleccionado:!1,permisos:[{id:null,nombre:"MANTENIMIENTOS",seleccionado:!1,hijos:[],isExpanded:!1},{id:null,nombre:"CARRERAS T\xc9CNICAS",seleccionado:!1,hijos:[{id:33,nombre:"Nuevo",seleccionado:!1},{id:34,nombre:"Editar",seleccionado:!1},{id:35,nombre:"Ver",seleccionado:!1},{id:36,nombre:"Eliminar",seleccionado:!1},{id:37,nombre:"CURSO",seleccionado:!1,hijos:[{id:38,nombre:"Nuevo",seleccionado:!1},{id:39,nombre:"Editar",seleccionado:!1},{id:40,nombre:"Ver",seleccionado:!1},{id:41,nombre:"Eliminar",seleccionado:!1},{id:42,nombre:"SYLLABUS",seleccionado:!1,hijos:[{id:43,nombre:"Ver",seleccionado:!1}],isExpanded:!1},{id:44,nombre:"ALUMNOS",seleccionado:!1,hijos:[{id:45,nombre:"Ver",seleccionado:!1},{id:46,nombre:"Asignar",seleccionado:!1}],isExpanded:!1},{id:47,nombre:"HORARIOS",seleccionado:!1,hijos:[{id:48,nombre:"Ver",seleccionado:!1},{id:49,nombre:"Programar",seleccionado:!1}],isExpanded:!1},{id:50,nombre:"ASISTENCIA",seleccionado:!1,hijos:[{id:51,nombre:"Ver",seleccionado:!1},{id:52,nombre:"Programar",seleccionado:!1}],isExpanded:!1},{id:53,nombre:"TEMAS",seleccionado:!1,hijos:[{id:54,nombre:"Ver",seleccionado:!1}],isExpanded:!1},{id:55,nombre:"GRUPOS DE EVALUACIONES",seleccionado:!1,hijos:[{id:56,nombre:"Nuevo",seleccionado:!1},{id:57,nombre:"Editar",seleccionado:!1},{id:58,nombre:"Ver",seleccionado:!1},{id:59,nombre:"Eliminar",seleccionado:!1},{id:60,nombre:"EVALUACIONES DE GRUPO",seleccionado:!1,hijos:[{id:61,nombre:"Nuevo",seleccionado:!1},{id:62,nombre:"Editar",seleccionado:!1},{id:63,nombre:"Ver",seleccionado:!1},{id:64,nombre:"Eliminar",seleccionado:!1},{id:65,nombre:"PREGUNTAS",seleccionado:!1,hijos:[{id:66,nombre:"Nuevo",seleccionado:!1},{id:67,nombre:"Editar",seleccionado:!1},{id:68,nombre:"Ver",seleccionado:!1},{id:69,nombre:"Eliminar",seleccionado:!1}],isExpanded:!1}],isExpanded:!1}],isExpanded:!1}],isExpanded:!1}],isExpanded:!1},{id:null,nombre:"ALUMNOS",seleccionado:!1,hijos:[{id:null,nombre:"Datos Personales",seleccionado:!1,hijos:[{id:72,nombre:"Nuevo",seleccionado:!1},{id:73,nombre:"Editar",seleccionado:!1},{id:74,nombre:"Ver",seleccionado:!1},{id:75,nombre:"Eliminar",seleccionado:!1}]},{id:76,nombre:"Documentos de Gesti\xf3n",seleccionado:!1,hijos:[{id:77,nombre:"Nuevo",seleccionado:!1},{id:78,nombre:"Editar",seleccionado:!1},{id:79,nombre:"Ver",seleccionado:!1},{id:80,nombre:"Eliminar",seleccionado:!1}]},{id:81,nombre:"Avance Curricular",seleccionado:!1,hijos:[{id:82,nombre:"Editar",seleccionado:!1},{id:83,nombre:"Ver",seleccionado:!1}]},{id:84,nombre:"Cursos",seleccionado:!1},{id:85,nombre:"Horarios",seleccionado:!1}],isExpanded:!1},{id:null,nombre:"DOCENTES",seleccionado:!1,hijos:[{id:null,nombre:"Datos Personales",seleccionado:!1,hijos:[{id:88,nombre:"Nuevo",seleccionado:!1},{id:89,nombre:"Editar",seleccionado:!1},{id:90,nombre:"Ver",seleccionado:!1},{id:91,nombre:"Eliminar",seleccionado:!1}]},{id:92,nombre:"Horarios",seleccionado:!1,hijos:[{id:93,nombre:"Editar",seleccionado:!1}]},{id:94,nombre:"Cursos",seleccionado:!1}],isExpanded:!1},{id:null,nombre:"CAPACITACIONES",seleccionado:!1,hijos:[{id:33,nombre:"Nuevo",seleccionado:!1},{id:34,nombre:"Editar",seleccionado:!1},{id:35,nombre:"Ver",seleccionado:!1},{id:36,nombre:"Eliminar",seleccionado:!1}],isExpanded:!1}],isExpanded:!1}};this.permisos.forEach(t=>{switch(t.nombre){case"ver_modulo_seguridad":o.Seguridad.id=t.id,o.Seguridad.seleccionado=this.permisosSeleccionados.has(t.id);break;case"ver_seguridad_configuracion":o.Seguridad.permisos[0].id=t.id,o.Seguridad.permisos[0].seleccionado=this.permisosSeleccionados.has(t.id);break;case"roles_crearRol":o.Seguridad.permisos[1].permisosInternos[0].id=t.id,o.Seguridad.permisos[1].permisosInternos[0].seleccionado=this.permisosSeleccionados.has(t.id);break;case"roles_editarRol":o.Seguridad.permisos[1].permisosInternos[1].id=t.id,o.Seguridad.permisos[1].permisosInternos[1].seleccionado=this.permisosSeleccionados.has(t.id);break;case"roles_eliminarRol":o.Seguridad.permisos[1].permisosInternos[2].id=t.id,o.Seguridad.permisos[1].permisosInternos[2].seleccionado=this.permisosSeleccionados.has(t.id);break;case"roles_asignarPermiso":o.Seguridad.permisos[1].permisosInternos[3].id=t.id,o.Seguridad.permisos[1].permisosInternos[3].seleccionado=this.permisosSeleccionados.has(t.id);break;case"ver_seguridad_roles":o.Seguridad.permisos[1].permisosInternos[4].id=t.id,o.Seguridad.permisos[1].permisosInternos[4].seleccionado=this.permisosSeleccionados.has(t.id);break;case"aula_virtual_alumno":o.AulaVirtual.permisos[2].id=t.id,o.AulaVirtual.permisos[2].seleccionado=this.permisosSeleccionados.has(t.id);break;case"aula_virtual_mantenimientos":o.AulaVirtual.permisos[0].id=t.id,o.AulaVirtual.permisos[0].seleccionado=this.permisosSeleccionados.has(t.id);break;case"aula_virtual_capacitaciones":o.AulaVirtual.permisos[4].id=t.id,o.AulaVirtual.permisos[4].seleccionado=this.permisosSeleccionados.has(t.id);break;case"ver_modulo_estructura_organica":o.EstructuraOrganica.id=t.id,o.EstructuraOrganica.seleccionado=this.permisosSeleccionados.has(t.id);break;case"aula_virtual_docente_datos_personales":o.AulaVirtual.permisos[3].hijos[0].id=t.id,o.AulaVirtual.permisos[3].hijos[0].seleccionado=this.permisosSeleccionados.has(t.id);break;case"ver_modulo_aulaVirtual":o.AulaVirtual.id=t.id,o.AulaVirtual.seleccionado=this.permisosSeleccionados.has(t.id);break;case"aula_virtual_carreras":o.AulaVirtual.permisos[1].id=t.id,o.AulaVirtual.permisos[1].seleccionado=this.permisosSeleccionados.has(t.id);break;case"aula_virtual_alumno_datos_personales":o.AulaVirtual.permisos[2].hijos[0].id=t.id,o.AulaVirtual.permisos[2].hijos[0].seleccionado=this.permisosSeleccionados.has(t.id);break;case"aula_virtual_docente":o.AulaVirtual.permisos[3].id=t.id,o.AulaVirtual.permisos[3].seleccionado=this.permisosSeleccionados.has(t.id)}}),this.permisosAgrupados=Object.values(o),this.propagateSelection(this.permisosAgrupados),this.permisosAgrupados.forEach(t=>{this.verificarSeleccionGrupo(t)})}propagateSelection(o){o.forEach(t=>{t.seleccionado&&t.hijos&&t.hijos.length>0&&this.togglePermisoSeleccion(t,!0),t.hijos&&t.hijos.length>0&&this.propagateSelection(t.hijos)})}closeDialog(){this.visible=!1}closeModal(){this.ref.close({register:!1})}static#e=this.\u0275fac=function(t){return new(t||i)(e.Y36(f.F0),e.Y36(d.b4),e.Y36(A.sK),e.Y36(m.E7),e.Y36(p.m),e.Y36(m.S),e.Y36(R.$))};static#o=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-lista-permisos"]],standalone:!0,features:[e.jDz],decls:3,vars:0,consts:[["pTemplate","header"],["pTemplate","content"],[1,"d-flex","justify-content-between"],[1,"text-primary","font-semibold","text-xl"],["optionLabel","name","optionValue","domain_id","placeholder","Seleccione una instituci\xf3n",3,"options","ngModel","ngModelChange","onChange",4,"ngIf"],["optionLabel","name","optionValue","domain_id","placeholder","Seleccione una instituci\xf3n",3,"options","ngModel","ngModelChange","onChange"],[1,"row"],[1,"grid","p-fluid"],[1,"field","md:col-12"],["class","mb-3",4,"ngFor","ngForOf"],[1,"float-rigth"],["pButton","","label","Guardar",1,"p-button-primary","mr-2",2,"color","#ffffff","background","#6366f1","border","1px solid #6366f1","padding","0.75rem 1.25rem","font-size","1rem","transition","background-color 0.2s, color 0.2s,\n                                    border-color 0.2s, box-shadow 0.2s","border-radius","10px","cursor","pointer",3,"click"],[1,"mb-3"],[1,"d-flex","align-items-center","grupo-header"],["type","button",1,"btn","btn-link","p-0","ml-2",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","16","height","16","viewBox","0 0 307.053 307.053",3,"ngClass"],["id","_x34_86._Down"],["d","M302.445,80.796l-11.101-11.103c-6.123-6.131-16.074-6.131-22.209,0L153.67,183.707L37.907,67.959\n                                                c-6.134-6.13-16.08-6.13-22.209,0L4.597,79.06c-6.129,6.133-6.129,16.067,0,22.201l137.83,137.829\n                                                c6.129,6.136,16.067,6.136,22.203,0l137.815-136.096C308.589,96.864,308.589,86.926,302.445,80.796z"],["type","checkbox",1,"checkbox",3,"ngModel","ngModelChange","change"],[1,"font-semibold","text-lg"],["class","grupo-content",4,"ngIf"],["renderPermisos",""],[1,"grupo-content"],[4,"ngFor","ngForOf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"d-flex","flex-column","opcionesCheck"],[1,"d-flex","align-items-center","backgroundPurple"],["type","button","class","btn btn-link p-0 ml-2",3,"click",4,"ngIf"],[1,"ml-2"],["class","pl-3 border-left grupo-content",4,"ngIf"],["d","M302.445,80.796l-11.101-11.103c-6.123-6.131-16.074-6.131-22.209,0L153.67,183.707L37.907,67.959\n                                                            c-6.134-6.13-16.08-6.13-22.209,0L4.597,79.06c-6.129,6.133-6.129,16.067,0,22.201l137.83,137.829\n                                                            c6.129,6.136,16.067,6.136,22.203,0l137.815-136.096C308.589,96.864,308.589,86.926,302.445,80.796z"],[1,"pl-3","border-left","grupo-content"]],template:function(t,n){1&t&&(e.TgZ(0,"p-panel"),e.YNc(1,Y,4,1,"ng-template",0),e.YNc(2,Q,7,1,"ng-template",1),e.qZA())},dependencies:[l.ez,l.mk,l.sg,l.O5,l.tP,u.Q,u.s,d.jx,T.kW,T.Lt,g.u5,g.Wl,g.JJ,g.On,S.U$],styles:['@charset "UTF-8";.grupo-header[_ngcontent-%COMP%]{display:flex;align-items:center;cursor:pointer;margin-bottom:2px;background:#eef2fe;border-radius:7px;padding:5px;gap:5px}.grupo-header[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:21px;margin:0;height:21px}.grupo-content[_ngcontent-%COMP%]{padding-left:20px}.rotate-icon[_ngcontent-%COMP%]{transform:rotate(180deg);transition:transform .3s ease-in-out}.btn-link[_ngcontent-%COMP%]{display:flex;align-items:center;padding:0;border:none;background:none;margin-left:5px;margin-right:5px}.btn-link[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{width:16px;height:16px;fill:#6366f1}.opcionesCheck[_ngcontent-%COMP%]{display:flex;cursor:pointer;margin-bottom:2px;border-radius:7px}.d-flex[_ngcontent-%COMP%]{display:flex}.backgroundPurple[_ngcontent-%COMP%]{background:#eef2fe;margin:2px;padding:3px;border-radius:4px}.checkbox[_ngcontent-%COMP%]{position:relative;width:20px;height:20px;margin:0;cursor:pointer;appearance:none;-webkit-appearance:none;-moz-appearance:none;background-color:#fff;border:2px solid #B0BEC5;border-radius:4px;outline:none;transition:background-color .3s,border-color .3s}.checkbox[_ngcontent-%COMP%]:checked{background-color:#6366f1;border-color:#6366f1}.checkbox[_ngcontent-%COMP%]:checked:after{content:"";position:absolute;top:2px;left:6px;width:4px;height:8px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}input[type=checkbox][_ngcontent-%COMP%]:checked{background-color:#6366f1;border-color:#6366f1}']})}return i})();function W(i,r){1&i&&(e.TgZ(0,"span",2),e._uU(1,"Buscar rol"),e.qZA())}function X(i,r){if(1&i){const o=e.EpF();e.TgZ(0,"div",16)(1,"button",17),e.NdJ("click",function(){e.CHM(o);const n=e.oxw(3);return e.KtG(n.navigateToNuevo(0))}),e.qZA()()}}function ee(i,r){if(1&i&&(e.TgZ(0,"div",11)(1,"div",12)(2,"span",13),e._UZ(3,"input",14),e.qZA()(),e.YNc(4,X,2,0,"div",15),e.qZA()),2&i){const o=e.oxw(2);e.xp6(4),e.Q6J("ngIf",o.tienePermiso("roles_crearRol"))}}function oe(i,r){1&i&&(e.TgZ(0,"tr")(1,"th",18),e._uU(2,"Acciones"),e.qZA(),e.TgZ(3,"th",18),e._uU(4,"ID"),e.qZA(),e.TgZ(5,"th",18),e._uU(6,"Nombre"),e.qZA(),e.TgZ(7,"th",18),e._uU(8,"Fecha"),e.qZA(),e.TgZ(9,"th",18),e._uU(10,"Asignar permisos"),e.qZA()())}const N=function(){return{color:"var(--primary-color)","font-size":"1.5rem"}};function te(i,r){if(1&i){const o=e.EpF();e.TgZ(0,"button",22),e.NdJ("click",function(){e.CHM(o);const n=e.oxw().$implicit,a=e.oxw(2);return e.KtG(a.navigateToNuevo(n.id))}),e._UZ(1,"i",23),e.qZA()}2&i&&(e.xp6(1),e.Akn(e.DdM(2,N)))}function ie(i,r){if(1&i){const o=e.EpF();e.TgZ(0,"button",24),e.NdJ("click",function(){e.CHM(o);const n=e.oxw().$implicit,a=e.oxw(2);return e.KtG(a.eliminar(n.id))}),e._uU(1,"X "),e.qZA()}}function ne(i,r){if(1&i){const o=e.EpF();e.TgZ(0,"button",22),e.NdJ("click",function(){e.CHM(o);const n=e.oxw().$implicit,a=e.oxw(2);return e.KtG(a.listaPermisos(n.id))}),e._UZ(1,"i",23),e.qZA()}2&i&&(e.xp6(1),e.Akn(e.DdM(2,N)))}function se(i,r){if(1&i&&(e.TgZ(0,"tr")(1,"td",19),e.YNc(2,te,2,3,"button",20),e.YNc(3,ie,2,0,"button",21),e.qZA(),e.TgZ(4,"td"),e._uU(5),e.qZA(),e.TgZ(6,"td"),e._uU(7),e.qZA(),e.TgZ(8,"td"),e._uU(9),e.qZA(),e.TgZ(10,"td"),e.YNc(11,ne,2,3,"button",20),e.qZA()()),2&i){const o=r.$implicit,t=e.oxw(2);e.xp6(2),e.Q6J("ngIf",t.tienePermiso("roles_editarRol")),e.xp6(1),e.Q6J("ngIf",t.tienePermiso("roles_eliminarRol")),e.xp6(2),e.Oqu(o.id),e.xp6(2),e.Oqu(o.nombre),e.xp6(2),e.Oqu(o.fecha),e.xp6(2),e.Q6J("ngIf",t.tienePermiso("roles_asignarPermiso"))}}function ae(i,r){1&i&&(e.TgZ(0,"tr")(1,"td",25),e._uU(2,"No se encontraron registros"),e.qZA()())}function re(i,r){1&i&&(e.TgZ(0,"tr")(1,"td",25),e._uU(2," Cargando registros. Por favor espere. "),e.qZA()())}function le(i,r){if(1&i&&(e.TgZ(0,"div",3)(1,"div",4)(2,"div",5)(3,"p-table",6),e.YNc(4,ee,5,1,"ng-template",7),e.YNc(5,oe,11,0,"ng-template",0),e.YNc(6,se,12,6,"ng-template",8),e.YNc(7,ae,3,0,"ng-template",9),e.YNc(8,re,3,0,"ng-template",10),e.qZA()()()()),2&i){const o=e.oxw();e.xp6(3),e.Q6J("value",o.roles)}}let ce=(()=>{class i{constructor(o,t,n,a,c){this.router=o,this.dialogService=t,this.rolService=n,this.permisoService=a,this.helpersService=c,this.roles=[],this.rol=[],this.domain_id=this.helpersService.getDominioId(),this.rolService.getRoles(this.domain_id).subscribe(_=>{console.log("Lista de Roles",_),this.roles=_})}navigateToNuevo(o){o>0?this.rolService.getRol(o).subscribe(t=>{console.log("Lista de Roles",t),this.rol=t,this.ref=this.dialogService.open(M,{width:"60%",styleClass:"custom-dialog-header",data:this.rol}),this.ref.onClose.subscribe(n=>{this.router.routeReuseStrategy.shouldReuseRoute=()=>!1,this.router.onSameUrlNavigation="reload"}),console.log(this.rol)}):(this.ref=this.dialogService.open(M,{width:"60%",styleClass:"custom-dialog-header"}),this.ref.onClose.subscribe(t=>{this.router.routeReuseStrategy.shouldReuseRoute=()=>!1,this.router.onSameUrlNavigation="reload"}))}eliminar(o){h().fire({title:"Eliminar rol",text:"Est\xe1s segurdo de eliminar el rol?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"S\xed, eliminar!"}).then(t=>{t.isConfirmed&&this.rolService.eliminarRol(o).subscribe(n=>{console.log("rol eliminado:",n),this.rolService.getRoles(this.domain_id).subscribe(a=>{console.log("Lista de Roles",a),this.roles=a})},n=>{console.error("Error eliminando ciclo:",n)})})}listaPermisos(o){this.ref=this.dialogService.open(q,{width:"60%",styleClass:"custom-dialog-header",data:o}),this.ref.onClose.subscribe(t=>{this.router.routeReuseStrategy.shouldReuseRoute=()=>!1,this.router.onSameUrlNavigation="reload"})}tienePermiso(o){return this.permisoService.tienePermiso(o)}static#e=this.\u0275fac=function(t){return new(t||i)(e.Y36(f.F0),e.Y36(m.xA),e.Y36(p.m),e.Y36(p.m),e.Y36(R.$))};static#o=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-lista-postulantes"]],decls:4,vars:0,consts:[["pTemplate","header"],["pTemplate","content"],[1,"text-primary","font-semibold","text-xl"],[1,"row"],[1,"grid","p-fluid"],[1,"field","md:col-12"],[1,"w-full","custom-search-input",3,"value"],["pTemplate","caption"],["pTemplate","body"],["pTemplate","emptymessage"],["pTemplate","loadingbody"],[1,"flex","justify-content-between","flex-wrap","flex-wrap"],[1,"flex-grow-1","mb-2","mr-2"],[1,"p-input-icon-left","w-full"],["pInputText","","type","text","placeholder","Buscar miembro",1,"w-full"],["class","mb-2",4,"ngIf"],[1,"mb-2"],["pButton","","label","Nuevo","icon","pi pi-user-plus",1,"p-button-primary","mr-2",2,"border-radius","30px",3,"click"],[2,"min-width","10rem"],[1,"text-center","flex","gap-2"],["style","width: fit-content","pButton","","class","p-button-rounded p-button-text custom-edit-button","title","Editar rol",3,"click",4,"ngIf"],["style","width: fit-content","pButton","","class","p-button-rounded p-button-text custom-edit-button","title","Eliminar rol",3,"click",4,"ngIf"],["pButton","","title","Editar rol",1,"p-button-rounded","p-button-text","custom-edit-button",2,"width","fit-content",3,"click"],["aria-hidden","true",1,"pi","pi-user-edit"],["pButton","","title","Eliminar rol",1,"p-button-rounded","p-button-text","custom-edit-button",2,"width","fit-content",3,"click"],["colspan","6"]],template:function(t,n){1&t&&(e.TgZ(0,"p-panel"),e.YNc(1,W,2,0,"ng-template",0),e.YNc(2,le,9,1,"ng-template",1),e.qZA(),e._UZ(3,"div"))},dependencies:[l.O5,u.s,d.jx,b.Hq,S.iA,E.o],styles:[".selects_content[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.selects_content[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column}.selects_content[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   input[type=search][_ngcontent-%COMP%], .selects_content[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{border:1px solid rgb(136,133,133);border-radius:10px;margin-top:.4rem;width:14.5rem;padding:.8rem 1rem;outline:none}"]})}return i})(),de=(()=>{class i{static#e=this.\u0275fac=function(t){return new(t||i)};static#o=this.\u0275mod=e.oAB({type:i});static#t=this.\u0275inj=e.cJS({imports:[f.Bz.forChild([{path:"",component:ce}]),f.Bz]})}return i})();var me=s(6760),pe=s(6022),ue=s(7902),ge=s(6218),_e=s(6804),fe=s(4480),L=s(4055),he=s(6651),j=s(4104),y=s(1494),I=s(3722),be=s(3259),xe=s(3904),ve=s(6860),Ce=s(3530);let Ee=(()=>{class i{static#e=this.\u0275fac=function(t){return new(t||i)};static#o=this.\u0275mod=e.oAB({type:i});static#t=this.\u0275inj=e.cJS({imports:[l.ez,u.Q,T.kW,de,g.u5,me._8,S.U$,pe.Xt,b.hJ,ue.JH,E.j,ge.A,_e.KZ,fe.T,L.q4,T.kW,he.q,j.EV,y.n,I.O,be.z,j.EV,S.U$,y.n,xe.D,I.O,ve.Z_,Ce.S,m.DL,A.aw,E.j,L.q4]})}return i})()},6218:(w,v,s)=>{s.d(v,{A:()=>e,g:()=>h});var l=s(8926),f=s(6814),C=s(6223);let h=(()=>{class d{el;ngModel;control;cd;autoResize;onResize=new l.vpe;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;constructor(m,p,u,g){this.el=m,this.ngModel=p,this.control=u,this.cd=g}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewChecked(){this.updateState()}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(m){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}resize(m){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(m||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(p){return new(p||d)(l.Y36(l.SBq),l.Y36(C.On,8),l.Y36(C.a5,8),l.Y36(l.sBO))};static \u0275dir=l.lG2({type:d,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(p,u){1&p&&l.NdJ("input",function(b){return u.onInput(b)}),2&p&&l.ekj("p-filled",u.filled)("p-inputtextarea-resizable",u.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}})}return d})(),e=(()=>{class d{static \u0275fac=function(p){return new(p||d)};static \u0275mod=l.oAB({type:d});static \u0275inj=l.cJS({imports:[f.ez]})}return d})()}}]);
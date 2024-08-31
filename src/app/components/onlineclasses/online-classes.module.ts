import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { OnlineClassesRoutingModule } from './online-classes-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogModule } from 'primeng/dynamicdialog';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoadingInterceptorService } from 'src/app/layout/service/loading-interceptor.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TableSelectCursosComponent } from './utils/table-select-cursos/table-select-cursos.component';
import { RegDocumentosAlumnoComponent } from './gestion-info-alumno/dialog/reg-documentos-alumno/reg-documentos-alumno.component';
import { ForoAlumnosComponent } from './alumnos/foro-alumnos/foro-alumnos.component';
import { PanelModule } from 'primeng/panel';
import { EditorModule } from 'primeng/editor';
import { ConfiguracionEmpresaComponent } from './configuracion-empresa/configuracion-empresa.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
//import colorPicker from 'angular2-color-picker';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InformacionAcademicaComponent } from './informacion-academica/informacion-academica.component';
import { AeInformacionAcademicaComponent } from './informacion-academica/ae-informacion-academica/ae-informacion-academica.component';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json')
}


@NgModule({
  declarations: [

    ConfiguracionEmpresaComponent,
    ForoAlumnosComponent
    
  ],
  providers: [DialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: DialogService, useClass: DialogService }
  ],
  imports: [
    ColorPickerModule,
    DropdownModule,
    FileUploadModule,
    CommonModule,
    OnlineClassesRoutingModule,
    CheckboxModule,
    PanelModule,
    FormsModule,
    EditorModule,
    TranslateModule.forRoot({
      loader: {
        //defaultLanguage: 'es',
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },

    }),
    DialogModule,
    ButtonModule,
    DynamicDialogModule
  ],
  bootstrap: [AppComponent]
})
export class OnlineClassesModule {

  constructor() {
    registerLocaleData(localeEs);
  }
}

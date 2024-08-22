import { NgModule, isDevMode } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { TableSelectCursosComponent } from './components/onlineclasses/utils/table-select-cursos/table-select-cursos.component';
import { environment } from './environment/environment.development';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }

@NgModule({
    declarations: [
        AppComponent,


    ],
    imports: [
        CheckboxModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppLayoutModule,
        DialogModule,
        ButtonModule,
        DynamicDialogModule,
        HttpClientModule,
        TableModule,
        CalendarModule,
        ReactiveFormsModule 



    ],
    providers: [
        MessageService,
        DialogService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent],


})
export class AppModule { }

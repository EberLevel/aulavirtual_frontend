import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { GeneralService } from '../components/onlineclasses/service/general.service';
import { HelpersService } from '../helpers.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent {
    timeout: any = null;

    @ViewChild('menuContainer') menuContainer!: ElementRef;
    domain_id: any;
    logoUrl: any;
    constructor(public layoutService: LayoutService, public el: ElementRef,
        private generalService: GeneralService,
        private helpersService: HelpersService,
    ) {


        this.domain_id = this.helpersService.getDominioId();
        this.generalService.getCompany(this.domain_id).subscribe((response: any) => {
            if(localStorage.getItem('company')){
                localStorage.removeItem('company');
            }
            localStorage.setItem('company', JSON.stringify(response.data));
            this.logoUrl = response.data.logo_url;
        });
    }
    



    onMouseEnter() {
        if (!this.layoutService.state.anchored) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.layoutService.state.sidebarActive = true;
           
    
        }
    }

    onMouseLeave() {
        if (!this.layoutService.state.anchored) {
            if (!this.timeout) {
                this.timeout = setTimeout(() => this.layoutService.state.sidebarActive = false, 300);
            }
        }
    }

    anchor() {
        this.layoutService.state.anchored = !this.layoutService.state.anchored;
    }

}

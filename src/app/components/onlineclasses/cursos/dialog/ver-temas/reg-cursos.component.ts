import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { GeneralService } from '../../../service/general.service';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/helpers.service';
import { CommonService } from '../../../service/common.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-reg-cursos',
    templateUrl: './reg-cursos.component.html',
    styleUrls: ['./reg-cursos.component.scss'],
})
export class RegCursosComponent {

}

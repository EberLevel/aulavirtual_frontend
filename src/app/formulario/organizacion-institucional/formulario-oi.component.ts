import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

interface tipogenero {
    name: string;
    value: number | null;
    code: string;
}

interface tipodocumento {
    name:string;
    value:string;
}

interface estadocivil {
    name:string;
    value:string;
}

interface gradoinstruccion {
    name:string;
    value:string;
}

interface profesion {
    name:string;
    value:string;
}

interface ocupacionactual {
    name:string;
    value:string;
}

interface estadoactual {
    name: string;
    value: string;
}

interface nivelcargo {
    name: string;
    value: string;
}

interface puntaje {
    name: string;
    value: string;
}

interface gestion {
    name: string;
    value: string;
}

@Component({
    selector: 'app-formulario-oi',
    templateUrl: './formulario-oi.component.html',
    styleUrls: ['./formulario-oi.component.scss']
})
export class FormularioOiComponent implements OnInit {
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
  
}

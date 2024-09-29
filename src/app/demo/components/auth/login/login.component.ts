import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/components/onlineclasses/service/login.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface tiporol {
    name: string;
    value: number;
    code: string;
}

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loading: boolean = false;
    rememberMe: boolean = false;
    tiporoles!: tiporol[];
    rol: tiporol | undefined;
    identification: string = ''; // Cambiado de 'email' a 'identification'
    password: string = '';

    constructor(private layoutService: LayoutService,
        private router: Router,
        private loginService: LoginService,
        private spinner: NgxSpinnerService
    ) { }

    get dark(): boolean {
        return this.layoutService.config.colorScheme !== 'light';
    }

    ngOnInit() {
        this.tiporoles = [
            { name: 'Alumno', value: 1, code: 'NY' },
            { name: 'Administrador', value: 2, code: 'RM' },
            { name: 'Docente', value: 3, code: 'LDN' },
        ];
        if (this.checkUserIsLogged()) {
            this.router.navigate(['/pl-virtual']);
        }
    }

    checkUserIsLogged() {
        if (localStorage.getItem('user')) {
            return true;
        }
        return false;
    }

    irAlLogin() {
        if (this.identification.trim() && this.password.trim()) {
            const formData = new FormData();

            // Determinar si el valor es un correo electrónico o DNI
            if (this.isEmail(this.identification)) {
                formData.append('email', this.identification);
            } else {
                formData.append('dni', this.identification);
            }
            formData.append('password', this.password);

            this.spinner.show();
            this.loading = true;

            this.loginService.loginUser(formData).subscribe((response: any) => {
                try {
                    if (response.status === 200) {
                        this.spinner.hide();
                        this.loading = false;
                        const user = response.user;
                        if (!localStorage.getItem('user')) {
                            localStorage.setItem('user', JSON.stringify(user));
                        } else {
                            localStorage.removeItem('user');
                            localStorage.setItem('user', JSON.stringify(user));
                        }
                        Swal.fire({
                            title: '¡Éxito!',
                            text: 'Datos correctos',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                        }).then(() => {});
                        
                        this.router.navigate(['/pl-virtual']);

                    } else {
                        this.spinner.hide();
                        this.loading = false;
                        Swal.fire({
                            title: '¡Error!',
                            text: 'Revisa los datos ingresados',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                        });
                    }
                } catch (e) {
                    this.spinner.hide();
                    this.loading = false;
                    Swal.fire({
                        title: '¡Error!',
                        text: 'Revisa los datos ingresados',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                }
            });

        } else {
            Swal.fire({
                title: '¡Error!',
                text: 'Revisa los datos ingresados',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    }

    // Método para verificar si la entrada es un correo electrónico
    isEmail(value: string): boolean {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    }
}

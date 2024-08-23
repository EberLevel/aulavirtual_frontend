import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  formatDate(value: any) {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  constructor(
    private router: Router
  ) { 
    
  }
  getUserData() {
    if (localStorage.getItem('user')) {
      const userData = localStorage.getItem('user');
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
    }
    return null;
  }
  checkIsUserLogged() {
    if (!localStorage.getItem('user')) {
      return false;
    }
    return true;
  }
  getDominioId() {
    if (localStorage.getItem('user')) {
     const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return user.domain_id;
      }
      return null
    }
    return null
  }
  getAlumnoId() {
    if (localStorage.getItem('user')) {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return user.alumno_id;
      }
      return null
    }
    return null
  }
  getDocenteId() {
    if (localStorage.getItem('user')) {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return user.docente_id;
      }
      return null
    }
    return null
  }
  getRolId() {
    if (localStorage.getItem('user')) {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return user.rol_id;
      }
      return 1
    }
    return 1
  }
  isSuperAdmin() {
    if (localStorage.getItem('user')) {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return user.rol_id === 1;
      }
      return false
    }
    return false
  }
  showSuccessMessage(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Correcto',
      text: message,
      showConfirmButton: false,
      timer: 1500
    });
  }
  getUserId(): number {
    const user = this.getUserData();  
    return user ? user.id : 0; 
  }

  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      showConfirmButton: false,
      timer: 1500
    });
  }
  showConfirmDialog(message: string, callback: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }
}

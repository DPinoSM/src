import { Component } from '@angular/core';
import { RolService } from '../../Services/rol.service';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.css']
})
export class ListaRolesComponent {

  roles: any[] = [];
  newRolData: any;
  selectedRol: any; // Propiedad para el rol seleccionado
  private rolesSubscription!: Subscription;

  constructor(private rolService: RolService) {
    this.newRolData = {
      id_rol: '',
      nombre_rol: '',
    };
  }

  ngOnInit(): void {
    this.getRoles();
  }

  // Método para obtener la lista de roles
  getRoles() {
    if (this.rolesSubscription) {
      this.rolesSubscription.unsubscribe();
    }
    this.rolesSubscription = this.rolService.getRoles()
      .pipe(
        catchError(error => {
          console.error('Error al obtener roles:', error);
          return [];
        })
      )
      .subscribe((data: any) => {
        this.roles = data;
      });
  }

  // Método para actualizar un rol existente
  updateRol(id: number, updatedData: any) {
    this.rolService.updateRol(id, updatedData).subscribe((response: any) => {
      if (response.msg) {
        console.log('Mensaje del servidor:', response.msg);
        this.getRoles(); // Actualizar la lista de role
        updatedData.nombre = ''; 
        updatedData.descripcion = '';
      }
    });
  }

}

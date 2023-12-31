import { Component, OnInit } from '@angular/core';
import { RolService } from '../../Services/rol.service';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.css']
})
export class ListaRolesComponent implements OnInit {

  roles: any[] = [];
  newRolData: any;
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
          // Aquí podrías mostrar un mensaje de error al usuario o realizar otras acciones apropiadas
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
        this.getRoles(); // Actualizar la lista de roles
        updatedData.nombre_rol = ''; // Asegúrate de utilizar el mismo nombre de propiedad
      }
    });
  }
}

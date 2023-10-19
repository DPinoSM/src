import { Component, OnInit } from '@angular/core';
import { RolService } from '../../Services/rol.service';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-roles',
  templateUrl: './add-edit-roles.component.html',
  styleUrls: ['./add-edit-roles.component.css']
})
export class AddEditRolesComponent implements OnInit {
  roles: any[] = [];
  newRolData: any;

  private rolesSubscription!: Subscription;

  constructor(private rolService: RolService) {
    this.newRolData = {};
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

  createNewRol(event: Event) {
    event.preventDefault(); // Evita la recarga de la página
  
    if (this.newRolData.nombre_rol.trim() !== '') {
      this.rolService.createRol(this.newRolData).subscribe((response: any) => {
        if (response.msg) {
          console.log('Mensaje del servidor:', response.msg);
          this.getRoles(); // Actualizar la lista de roles
          this.newRolData.nombre_rol = ''; // Restablece el campo después de crear el rol
        }
      });
    } else {
      // Puedes mostrar un mensaje de error al usuario indicando que el nombre del rol es obligatorio.
    }
  }
  
}

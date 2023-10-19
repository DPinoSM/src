import { Component, OnInit, OnDestroy } from '@angular/core';
import { RolService } from '../../Services/rol.service';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-roles',
  templateUrl: './add-edit-roles.component.html',
  styleUrls: ['./add-edit-roles.component.css']
})
export class AddEditRolesComponent{
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

  // Método para crear un nuevo rol
  createNewRol() {
    this.rolService.createRol(this.newRolData).subscribe((response: any) => {
      if (response.msg) {
        console.log('Mensaje del servidor:', response.msg);
        this.getRoles(); // Actualizar la lista de roles
      }
    });
  }


}

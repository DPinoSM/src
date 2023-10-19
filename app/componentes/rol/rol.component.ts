import { Component, OnInit, OnDestroy } from '@angular/core';
import { RolService } from '../../Services/rol.service';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
})
export class RolComponent implements OnInit, OnDestroy {
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

  // Método para cargar los detalles de un rol
  loadRolDetails(id: number) {
    this.rolService.getRolById(id).subscribe((data: any) => {
      if (data) {
        this.selectedRol = data;
      }
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

  // Método para obtener un solo rol por su ID
  getRolById(id: number) {
    this.rolService.getRolById(id).subscribe((data: any) => {
      if (data) {
        console.log('Rol obtenido:', data);
      }
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

  // Método para eliminar un rol por su ID
  deleteRol(id: number) {
    this.rolService.deleteRol(id).subscribe((response: any) => {
      if (response.msg) {
        console.log('Mensaje del servidor:', response.msg);
        this.getRoles(); // Actualizar la lista de roles
      }
    });
  }

  ngOnDestroy(): void {
    if (this.rolesSubscription) {
      this.rolesSubscription.unsubscribe();
    }
  }
}

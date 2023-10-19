import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.component.html',
  styleUrls: ['./crud-usuarios.component.css']
})
export class CrudUsuariosComponent implements OnInit {
  // Variables para almacenar los datos del formulario
  rut_usuario: string = '';
  nombre_usuario: string = '';
  apellido1_usuario: string = '';
  apellido2_usuario: string = '';
  clave_usuario: string = '';
  correo_usuario: string = '';

  // Variable para almacenar la lista de usuarios
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.getUsers();
  }

  // Función para crear un usuario
  createUser() {
    const usuarioData = {
      rut_usuario: this.rut_usuario,
      nombre_usuario: this.nombre_usuario,
      apellido1_usuario: this.apellido1_usuario,
      apellido2_usuario: this.apellido2_usuario,
      clave_usuario: this.clave_usuario,
      correo_usuario: this.correo_usuario,
    };

    this.usuarioService.createUser(usuarioData).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente');
        this.getUsers();
      },
      error: (error) => {
        console.error('Error al crear usuario', error);
      }
    });
  }

  // Función para obtener la lista de usuarios
  getUsers() {
    this.usuarioService.getUsers().subscribe({
      next: (data: any) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error al obtener la lista de usuarios', error);
      }
    });
  }


  // Actualizar un usuario
updateUser(id: string, userData: any) {
  this.usuarioService.updateUser(id, userData).subscribe({
    next: (response) => {
      console.log('Usuario actualizado exitosamente');
      this.getUsers();
    },
    error: (error) => {
      console.error('Error al actualizar usuario', error);
    }
  });
}

// Eliminar un usuario
deleteUser(id: string) {
  this.usuarioService.deleteUser(id).subscribe({
    next: (response) => {
      console.log('Usuario eliminado exitosamente');
      this.getUsers();
    },
    error: (error) => {
      console.error('Error al eliminar usuario', error);
    }
  });
}

// Obtener un usuario por ID
getUserById(id: string) {
  this.usuarioService.getUserById(id).subscribe({
    next: (data: any) => {
      console.log('Usuario obtenido:', data);
    },
    error: (error) => {
      console.error('Error al obtener usuario por ID', error);
    }
  });
}
}

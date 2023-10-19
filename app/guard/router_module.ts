import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from '../componentes/inicio/iniciocomponent';
import { LoginComponent } from '../componentes/login/login.component';
import { AdminComponent } from '../componentes/admin/admin.component';
//import { CrudRolesComponent } from '../Services/crud-roles/crud-roles.component';
import { CrudUsuariosComponent } from '../Services/crud-usuarios/crud-usuarios.component';
import { RolComponent} from '../componentes/rol/rol.component'
import { AddEditRolesComponent } from '../componentes/add-edit-roles/add-edit-roles.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'usuarios', component: CrudUsuariosComponent },
  { path: 'rol', component: RolComponent },
  { path: 'add', component: AddEditRolesComponent},
  { path: 'edit/:id', component: AddEditRolesComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'},
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

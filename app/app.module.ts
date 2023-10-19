import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './guard/router_module';

import { AuthService } from './Services/auth.service';

//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { InicioComponent } from './componentes/inicio/iniciocomponent';
import { CrudUsuariosComponent } from './Services/crud-usuarios/crud-usuarios.component';
import { CrudRolesComponent } from './Services/crud-roles/crud-roles.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ListaRolesComponent } from './componentes/lista-roles/lista-roles.component';
import { AddEditRolesComponent } from './componentes/add-edit-roles/add-edit-roles.component';
import { RolComponent } from './componentes/rol/rol.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    InicioComponent,
    CrudUsuariosComponent,
    CrudRolesComponent,
    NavbarComponent,
    ListaRolesComponent,
    AddEditRolesComponent,
    RolComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

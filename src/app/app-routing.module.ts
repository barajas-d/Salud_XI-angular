import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarCitasComponent } from './componentes/gestion-citas-medicas/buscar-citas/buscar-citas.component';
import { CrearCitasComponent } from './componentes/gestion-citas-medicas/crear-citas/crear-citas.component';
import { ListarCitasComponent } from './componentes/gestion-citas-medicas/listar-citas/listar-citas.component';
import { ListarUsuariosComponent } from './componentes/gestion-usuarios/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './componentes/inicio-sesion/login/login.component';

const routes: Routes = [
  {path: 'buscar-citas', component: BuscarCitasComponent},
  {path: 'listar-citas/:cedulaUsuario', component: ListarCitasComponent},
  {path: 'crear-citas', component: CrearCitasComponent},
  {path: 'listar-usuarios', component: ListarUsuariosComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

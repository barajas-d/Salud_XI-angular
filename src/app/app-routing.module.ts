import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerarAgendasComponent } from './componentes/gestion-agendas/generar-agendas/generar-agendas.component';
import { ListarAgendaComponent } from './componentes/gestion-agendas/listar-agenda/listar-agenda.component';
import { ActualizarCentrosMedicosComponent } from './componentes/gestion-centros-medicos/actualizar-centros-medicos/actualizar-centros-medicos.component';
import { CrearCentrosMedicosComponent } from './componentes/gestion-centros-medicos/crear-centros-medicos/crear-centros-medicos.component';
import { ListarCentrosMedicosComponent } from './componentes/gestion-centros-medicos/listar-centros-medicos/listar-centros-medicos.component';
import { BuscarCitasComponent } from './componentes/gestion-citas-medicas/buscar-citas/buscar-citas.component';
import { CrearCitasComponent } from './componentes/gestion-citas-medicas/crear-citas/crear-citas.component';
import { ListarCitasComponent } from './componentes/gestion-citas-medicas/listar-citas/listar-citas.component';
import { CrearCuotaModeradoraComponent } from './componentes/gestion-cuota-moderadora/crear-cuota-moderadora/crear-cuota-moderadora.component';
import { ListarCuotaModeradoraComponent } from './componentes/gestion-cuota-moderadora/listar-cuota-moderadora/listar-cuota-moderadora.component';
import { ActualizarMedicosComponent } from './componentes/gestion-medicos/actualizar-medicos/actualizar-medicos.component';
import { CrearMedicosComponent } from './componentes/gestion-medicos/crear-medicos/crear-medicos.component';
import { ListarMedicosComponent } from './componentes/gestion-medicos/listar-medicos/listar-medicos.component';
import { CrearTipoCitaEspecialidadComponent } from './componentes/gestion-tipo-cita-especialidad/crear-tipo-cita-especialidad/crear-tipo-cita-especialidad.component';
import { ListarTipoCitaEspecialidadComponent } from './componentes/gestion-tipo-cita-especialidad/listar-tipo-cita-especialidad/listar-tipo-cita-especialidad.component';
import { ActualizarTipoCitasComponent } from './componentes/gestion-tipo-citas/actualizar-tipo-citas/actualizar-tipo-citas.component';
import { CrearTiposCitaComponent } from './componentes/gestion-tipo-citas/crear-tipos-cita/crear-tipos-cita.component';
import { ListarTiposCitaComponent } from './componentes/gestion-tipo-citas/listar-tipos-cita/listar-tipos-cita.component';
import { ActualizarUsuariosComponent } from './componentes/gestion-usuarios/actualizar-usuarios/actualizar-usuarios.component';
import { CrearUsuariosComponent } from './componentes/gestion-usuarios/crear-usuarios/crear-usuarios.component';
import { ListarUsuariosComponent } from './componentes/gestion-usuarios/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './componentes/inicio-sesion/login/login.component';
import { AdministradorComponent } from './componentes/layouts/administrador/administrador.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'buscar-citas', component: BuscarCitasComponent},
  {path: 'listar-citas/:cedulaUsuario', component: ListarCitasComponent},
  {path: 'crear-citas', component: CrearCitasComponent},

  {path: 'listar-usuarios', component: ListarUsuariosComponent},
  {path: 'actualizar-usuarios/:idUsuario', component: ActualizarUsuariosComponent},
  {path: 'crear-usuarios', component: CrearUsuariosComponent},

  {path: 'listar-medicos', component: ListarMedicosComponent},
  {path: 'actualizar-medicos/:cedulaMedico', component: ActualizarMedicosComponent},
  {path: 'crear-medicos', component: CrearMedicosComponent},

  {path: 'listar-centros-medicos', component: ListarCentrosMedicosComponent},
  {path: 'actualizar-centros-medicos/:idCentroMedico', component: ActualizarCentrosMedicosComponent},
  {path: 'crear-centros-medicos', component: CrearCentrosMedicosComponent},

  {path: 'listar-tipo-cita', component: ListarTiposCitaComponent},
  {path: 'actualizar-tipo-cita/:idTipoCita', component: ActualizarTipoCitasComponent},
  {path: 'crear-tipo-cita', component: CrearTiposCitaComponent},

  {path: 'listar-cuotas-moderadoras', component: ListarCuotaModeradoraComponent},
  {path: 'crear-cuotas-moderadoras', component: CrearCuotaModeradoraComponent},

  {path: 'listar-tipo-cita-especialidad', component: ListarTipoCitaEspecialidadComponent},
  {path: 'crear-tipo-cita-especialidad', component: CrearTipoCitaEspecialidadComponent},

  {path: 'generar-agendas', component: GenerarAgendasComponent},
  {path: 'listar-agendas', component: ListarAgendaComponent},

  {path: 'administrador', component: AdministradorComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

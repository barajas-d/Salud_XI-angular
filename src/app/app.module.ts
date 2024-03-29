import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatNativeDateModule } from '@angular/material/core';
/*
 * Componentes
*/
import { LoginComponent } from './componentes/inicio-sesion/login/login.component';
import { BuscarCitasComponent } from './componentes/gestion-citas-medicas/buscar-citas/buscar-citas.component';
import { CrearUsuariosComponent } from './componentes/gestion-usuarios/crear-usuarios/crear-usuarios.component';
import { ListarUsuariosComponent } from './componentes/gestion-usuarios/listar-usuarios/listar-usuarios.component';
import { ListarCitasComponent } from './componentes/gestion-citas-medicas/listar-citas/listar-citas.component';
import { CrearCitasComponent } from './componentes/gestion-citas-medicas/crear-citas/crear-citas.component';
import { ActualizarMedicosComponent } from './componentes/gestion-medicos/actualizar-medicos/actualizar-medicos.component';
import { ActualizarUsuariosComponent } from './componentes/gestion-usuarios/actualizar-usuarios/actualizar-usuarios.component';
import { ActualizarTipoCitasComponent } from './componentes/gestion-tipo-citas/actualizar-tipo-citas/actualizar-tipo-citas.component';
import { ListarMedicosComponent } from './componentes/gestion-medicos/listar-medicos/listar-medicos.component';
import { CrearMedicosComponent } from './componentes/gestion-medicos/crear-medicos/crear-medicos.component';
import { CrearCuotaModeradoraComponent } from './componentes/gestion-cuota-moderadora/crear-cuota-moderadora/crear-cuota-moderadora.component';
import { ListarCuotaModeradoraComponent } from './componentes/gestion-cuota-moderadora/listar-cuota-moderadora/listar-cuota-moderadora.component';
import { ListarTiposCitaComponent } from './componentes/gestion-tipo-citas/listar-tipos-cita/listar-tipos-cita.component';
import { CrearTiposCitaComponent } from './componentes/gestion-tipo-citas/crear-tipos-cita/crear-tipos-cita.component';
import { ListarTipoCitaEspecialidadComponent } from './componentes/gestion-tipo-cita-especialidad/listar-tipo-cita-especialidad/listar-tipo-cita-especialidad.component';
import { CrearTipoCitaEspecialidadComponent } from './componentes/gestion-tipo-cita-especialidad/crear-tipo-cita-especialidad/crear-tipo-cita-especialidad.component';
import { ListarAgendaComponent } from './componentes/gestion-agendas/listar-agenda/listar-agenda.component';
import { GenerarAgendasComponent } from './componentes/gestion-agendas/generar-agendas/generar-agendas.component';
import { AdministradorComponent } from './componentes/layouts/administrador/administrador.component';
import { ListarCentrosMedicosComponent } from './componentes/gestion-centros-medicos/listar-centros-medicos/listar-centros-medicos.component';
import { CrearCentrosMedicosComponent } from './componentes/gestion-centros-medicos/crear-centros-medicos/crear-centros-medicos.component';
import { ActualizarCentrosMedicosComponent } from './componentes/gestion-centros-medicos/actualizar-centros-medicos/actualizar-centros-medicos.component';
import { NavbarCallCenterComponent } from './componentes/layouts/navbar-call-center/navbar-call-center.component';
import { DialogDeleteComponent } from './componentes/layouts/dialog-delete/dialog-delete.component';
/**
 * Angular Material
 */
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { NavbarAdministradorComponent } from './componentes/layouts/navbar-administrador/navbar-administrador.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    BuscarCitasComponent,
    LoginComponent,
    NavbarCallCenterComponent,
    ListarCitasComponent,
    CrearCitasComponent,
    ListarUsuariosComponent,
    CrearUsuariosComponent,
    ListarMedicosComponent,
    CrearMedicosComponent,
    CrearCuotaModeradoraComponent,
    ListarCuotaModeradoraComponent,
    ListarTiposCitaComponent,
    CrearTiposCitaComponent,
    ListarTipoCitaEspecialidadComponent,
    CrearTipoCitaEspecialidadComponent,
    ListarAgendaComponent,
    GenerarAgendasComponent,
    AdministradorComponent,
    ListarCentrosMedicosComponent,
    CrearCentrosMedicosComponent,
    ActualizarCentrosMedicosComponent,
    DialogDeleteComponent,
    ActualizarMedicosComponent,
    ActualizarUsuariosComponent,
    ActualizarTipoCitasComponent,
    NavbarAdministradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

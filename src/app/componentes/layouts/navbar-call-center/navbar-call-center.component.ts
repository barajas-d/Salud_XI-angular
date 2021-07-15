import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-call-center',
  templateUrl: './navbar-call-center.component.html',
  styleUrls: ['./navbar-call-center.component.css']
})
export class NavbarCallCenterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateListarMedicos(){
    this.router.navigate(['listar-medicos']);
  }

  navigateListarCentrosMedicos(){
    this.router.navigate(['listar-centros-medicos']);
  }

  navigateListarTipoCita(){
    this.router.navigate(['listar-tipo-cita']);
  }

  navigateListarUsuarios(){
    this.router.navigate(['listar-usuarios']);
  }

  navigateListarCuotasModeradoras(){
    this.router.navigate(['listar-cuotas-moderadoras']);
  }

  navigateListarEspecialidadesTipoCita(){
    this.router.navigate(['listar-tipo-cita-especialidad']);
  }

  navigateGenerarAgendas(){
    this.router.navigate(['generar-agendas']);
  }

  navigateListarAgendas(){
    this.router.navigate(['listar-agendas']);
  }

  navigateInicio(){
    this.router.navigate(['administrador']);
  }

  navigateCerrarSesion(){
    this.router.navigate(['']);
  }

}

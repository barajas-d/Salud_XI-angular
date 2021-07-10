import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  constructor(private router: Router) { }

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

  ngOnInit(): void {
  }

}

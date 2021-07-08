import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-agenda',
  templateUrl: './listar-agenda.component.html',
  styleUrls: ['./listar-agenda.component.css']
})
export class ListarAgendaComponent implements OnInit {

  cedulaMedico: Number;

  constructor(private rutaActiva: ActivatedRoute) { 
    //Parametros pasados en la ruta
    this.cedulaMedico = this.rutaActiva.snapshot.params.cedulaUsuario;

    this.getCitasByCCMedico();
  }

  getCitasByCCMedico(){
    
  }

  ngOnInit(): void {
  }

}

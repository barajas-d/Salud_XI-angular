import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TipoCitaEspecialidadDto } from 'src/app/modeloDTO/tipo-cita-especialidad-dto';
import { ProxyTipoCitaEspecialidadService } from 'src/app/servicios/proxy-tipo-cita-especialidad.service';

@Component({
  selector: 'app-listar-tipo-cita-especialidad',
  templateUrl: './listar-tipo-cita-especialidad.component.html',
  styleUrls: ['./listar-tipo-cita-especialidad.component.css']
})
export class ListarTipoCitaEspecialidadComponent implements OnInit {

  listaTipoCitaEspecialidad: TipoCitaEspecialidadDto[] = [];

  //Paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['especialidad', 'tipoCita', 'acciones'];

  constructor(private servicioProxyTipoCitaEspecialidad: ProxyTipoCitaEspecialidadService, private router: Router) { 
    this.getTipoCitaEspecialidad(0, this.pageSize);
  }

  getTipoCitaEspecialidad(page: Number, size: Number){
    this.servicioProxyTipoCitaEspecialidad.getTipoCitaEspecialidad(page , size).subscribe(
      result => {
        this.length = result['totalElements'];
        this.listaTipoCitaEspecialidad = result['content'];
      }
    );
  }

  changePage(pageEvent: PageEvent){
    this.getTipoCitaEspecialidad(pageEvent.pageIndex, pageEvent.pageSize);
  }

  navigateCrearTipoCitaEspecialidad(){
    this.router.navigate(['crear-tipo-cita-especialidad']);
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TipoCitaDTO } from 'src/app/modeloDTO/tipo-cita-dto';
import { ProxyTiposCitaService } from 'src/app/servicios/proxy-tipos-cita.service';

@Component({
  selector: 'app-listar-tipos-cita',
  templateUrl: './listar-tipos-cita.component.html',
  styleUrls: ['./listar-tipos-cita.component.css']
})
export class ListarTiposCitaComponent implements OnInit {

  listaTiposCita: TipoCitaDTO[] = [];

  //Paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['nombre', 'duracion', 'acciones'];

  constructor(private servicioProxyTipoCita: ProxyTiposCitaService) { 
    this.getTiposCita(0, this.pageSize);
  }

  getTiposCita(page: Number, size: Number){
    this.servicioProxyTipoCita.getTiposCita(page , size).subscribe(
      result => {
        this.length = result['totalElements'];
        this.listaTiposCita = result['content'];
      }
    );
  }

  changePage(pageEvent: PageEvent){
    this.getTiposCita(pageEvent.pageIndex, pageEvent.pageSize);
  }

  ngOnInit(): void {
  }

}

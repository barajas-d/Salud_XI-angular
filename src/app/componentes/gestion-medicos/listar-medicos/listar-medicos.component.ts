import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MedicoDto } from 'src/app/modeloDTO/medico-dto';
import { ProxyMedicosService } from 'src/app/servicios/proxy-medicos.service';

@Component({
  selector: 'app-listar-medicos',
  templateUrl: './listar-medicos.component.html',
  styleUrls: ['./listar-medicos.component.css']
})
export class ListarMedicosComponent implements OnInit {

  listaMedicos: MedicoDto[] = [];

  //paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['nombre', 'cedula', 'especialidad', 'intensidadHoraria', "centroMedico", 'acciones'];

  constructor(private servicioProxyMedico: ProxyMedicosService) { 
    this.getMedicos(0, this.pageSize);
  }

  getMedicos(page: Number, size: Number){
    this.servicioProxyMedico.getMedicos(page, size).subscribe(
      result => {
        this.length = result['totalElements'];
        this.listaMedicos = result['content'];
      }
    );
  }

  changePage(pageEvent: PageEvent){
    this.getMedicos(pageEvent.pageIndex, pageEvent.pageSize);
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CitaDTO } from 'src/app/modeloDTO/cita-dto';
import { ProxyAgendasService } from 'src/app/servicios/proxy-agendas.service';

@Component({
  selector: 'app-generar-agendas',
  templateUrl: './generar-agendas.component.html',
  styleUrls: ['./generar-agendas.component.css']
})
export class GenerarAgendasComponent implements OnInit {

  listaCitasMedicas: CitaDTO[] = [];

  //indica cuando se esta ejecutando el proceso masivo
  cargando: Boolean = false;

  //Paginacion
  length: Number = 0;
  pageSize: Number = 10;
  pageSizeOptions: Number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['nombre', 'cedula', 'tipoCita', 'tipoContrato', "sintomatologia"];

  constructor(private servicioProxyAgendas: ProxyAgendasService) { 
    this.getCitasSinAgendar(0, this.pageSize);
    this.getCantidadCitasSinAgendar();
  }

  getCitasSinAgendar(page: Number, size: Number){
    this.servicioProxyAgendas.getCitasSinAgendar(page, size).subscribe(
      result => {
        this.listaCitasMedicas = result;
      }
    ); 
  }

  getCantidadCitasSinAgendar(){
    this.servicioProxyAgendas.getCantidadCitasSinAgendar().subscribe(
      result => {
        this.length = result;
      }
    );
  }

  executeProcesoMasivo(){
    this.cargando = true;
    this.servicioProxyAgendas.executeProcesoMasivo().subscribe(
      result => {
        console.log('proceso masivo: ' + result);
        this.getCitasSinAgendar(0, this.pageSize);
        this.getCantidadCitasSinAgendar();
        this.cargando = false;
      }
    )
  }

  changePage(pageEvent: PageEvent){
    this.getCitasSinAgendar(pageEvent.pageIndex, pageEvent.pageSize);
  }

  ngOnInit(): void {
  }

}

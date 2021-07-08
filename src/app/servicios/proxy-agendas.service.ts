import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AgendaDto } from '../modeloDTO/agenda-dto';
import { CitaDTO } from '../modeloDTO/cita-dto';

@Injectable({
  providedIn: 'root'
})
export class ProxyAgendasService {

  private UrlBase = environment.backendUrl + '/agenda';

  constructor(private httpClient: HttpClient) { }

  //Obtener citas agendadas por cedula del medico y dia
  getAgenda(infoAgenda: AgendaDto){
    let json = JSON.stringify(infoAgenda);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<CitaDTO[]>(this.UrlBase, json, {headers: headers});
  }

  //Obtener citas sin agendar con paginacion
  getCitasSinAgendar(inicial: Number, cantidad: Number){
    return this.httpClient.get<CitaDTO[]>(this.UrlBase + '/citasSinAgendar/' + inicial + '/' + cantidad);
  }

  //Obtener cantidad de citas sin agendar
  getCantidadCitasSinAgendar(){
    return this.httpClient.get<Number>(this.UrlBase + '/citasSinAgendar/cantidad');
  }

  //Ejecutar proceso masivo
  executeProcesoMasivo(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.UrlBase + '/agendar', {headers: headers});
  }

}

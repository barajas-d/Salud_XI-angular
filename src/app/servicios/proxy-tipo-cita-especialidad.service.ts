import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EspecialidadDto } from '../modeloDTO/especialidad-dto';
import { TipoCitaDTO } from '../modeloDTO/tipo-cita-dto';
import { TipoCitaEspecialidadDto } from '../modeloDTO/tipo-cita-especialidad-dto';

@Injectable({
  providedIn: 'root'
})
export class ProxyTipoCitaEspecialidadService {

  private UrlBase = environment.backendUrl + '/tipoCitaEspecialidad';

  constructor(private httpClient: HttpClient) { }

  //Crear tipo cita por especialidad
  addTipoCitaEspecialidad(nuevoTipoCitaEspecialidad: TipoCitaEspecialidadDto){
    let json = JSON.stringify(nuevoTipoCitaEspecialidad)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<TipoCitaEspecialidadDto>(this.UrlBase + '/add', json, {headers: headers});
  }

  //Eliminar tipo cita por especialidad
  deleteTipoCitaEspecialidad(idTipoCitaEspecialidad: Number){
    return this.httpClient.delete(this.UrlBase + '/delete/' + idTipoCitaEspecialidad);
  }

  //Obtener lista de tipos citas por especialidad con paginacion
  getTipoCitaEspecialidad(inicial: Number, cantidad: Number){
    return this.httpClient.get<TipoCitaEspecialidadDto[]>(this.UrlBase + '/' + inicial + '/' + cantidad);
  }

  //Obtener tipos de cita
  getAllTiposCita(){
    return this.httpClient.get<TipoCitaDTO[]>(this.UrlBase + '/tiposCita')
  }

  //Obtener especialidad
  getAllEspecialidades(){
    return this.httpClient.get<EspecialidadDto[]>(this.UrlBase + '/especialidades')
  }

}

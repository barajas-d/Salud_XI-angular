import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CentroMedicoDto } from '../modeloDTO/centro-medico-dto';
import { UbicacionesCentroMedicoDTO } from '../modeloDTO/ubicaciones-centro-medico-dto';

@Injectable({
  providedIn: 'root'
})
export class ProxyCentrosMedicosService {

  private UrlBase = environment.backendUrl + '/centrosMedicos';

  constructor(private httpClient: HttpClient) { }

  //obtener centros médicos con paginación
  getCentrosMedicos(inicial: Number, cantidad:Number){
    return this.httpClient.get<CentroMedicoDto[]>(this.UrlBase + '/' + inicial + '/' + cantidad);
  }

  //obtener centro medico por id
  getCentroMedico(idCentroMedico: Number){
    return this.httpClient.get<CentroMedicoDto>(this.UrlBase + '/' + idCentroMedico);
  }

  //crear centro médico
  addCentroMedico(nuevoCentroMedico: CentroMedicoDto){
    let json = JSON.stringify(nuevoCentroMedico);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<Boolean>(this.UrlBase + '/add', json, {headers: headers});
  }

  //actualizar centro médico
  updateCentroMedico(centroMedicoActualizado: CentroMedicoDto){
    let json = JSON.stringify(centroMedicoActualizado)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<Boolean>(this.UrlBase + '/update', json, {headers: headers});
  }

  //eliminar centro médico
  deleteCentroMedico(idCentroMedico: Number){
    return this.httpClient.delete(this.UrlBase + '/delete/' + idCentroMedico);
  }

  //obtener ubicaciones de un centro medico
  getUbicacionesCentroMedico(idCentroMedico: Number, inicial: Number, cantidad:Number){
    return this.httpClient.get<UbicacionesCentroMedicoDTO[]>(this.UrlBase + '/ubicaciones' + '/' + idCentroMedico + '/' + inicial + '/' + cantidad);
  }

  //agregara ubicacion a un centro medico
  addUbicacionCentroMedico(ubicacionCentroMedico: UbicacionesCentroMedicoDTO){
    let json = JSON.stringify(ubicacionCentroMedico);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<CentroMedicoDto>(this.UrlBase + '/ubicacion/add', json, {headers: headers});
  }

  //eliminar ubicacion de un centro medico
  deleteUbicacionCentroMedico(idUbicacionCentroMedico: Number){
    return this.httpClient.delete(this.UrlBase + '/ubicacion/delete/' + idUbicacionCentroMedico);
  }

}

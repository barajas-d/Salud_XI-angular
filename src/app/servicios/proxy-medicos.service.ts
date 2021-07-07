import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CentroMedicoDto } from '../modeloDTO/centro-medico-dto';
import { EspecialidadDto } from '../modeloDTO/especialidad-dto';
import { MedicoDto } from '../modeloDTO/medico-dto';

@Injectable({
  providedIn: 'root'
})
export class ProxyMedicosService {

  private UrlBase = environment.backendUrl + '/medico';

  constructor(private httpClient: HttpClient) { }

  //Crear un médico
  addMedico(nuevoMedico: MedicoDto){
    let json = JSON.stringify(nuevoMedico)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<MedicoDto>(this.UrlBase + '/add', json, {headers: headers});
  }

  //Actualizar un médico
  updateMedico(medicoActualizado: MedicoDto){
    let json = JSON.stringify(medicoActualizado)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<MedicoDto>(this.UrlBase + '/update', json, {headers: headers});
  }

  //Eliminar un médico
  deleteMedico(idMedico: Number){
    return this.httpClient.delete(this.UrlBase + '/delete/' + idMedico);
  }

  //Obtener lista de médicos con paginación
  getMedicos(inicial: Number, cantidad: Number){
    return this.httpClient.get<MedicoDto[]>(this.UrlBase + '/' + inicial + '/' + cantidad);
  }

  //Obtener todas las especialidades para el formulario
  getAllEspecialidades(){
    return this.httpClient.get<EspecialidadDto[]>(this.UrlBase + '/especialidades')
  }

  //Obtener todos los centros medicos para el formulario
  getAllCentrosMedicos(){
    return this.httpClient.get<CentroMedicoDto[]>(this.UrlBase + '/centrosMedicos')
  }

}

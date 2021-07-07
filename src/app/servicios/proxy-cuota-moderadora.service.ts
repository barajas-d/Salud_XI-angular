import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CuotaModeradoraDto } from '../modeloDTO/cuota-moderadora-dto';
import { TipoCitaDTO } from '../modeloDTO/tipo-cita-dto';
import { TipoContratoDto } from '../modeloDTO/tipo-contrato-dto';

@Injectable({
  providedIn: 'root'
})
export class ProxyCuotaModeradoraService {

  private UrlBase = environment.backendUrl + '/cuotaModeradora';

  constructor(private httpClient: HttpClient) { }

  //Crear nueva cuota moderadora
  addCuotaModeradora(cuotaModeradora: CuotaModeradoraDto) {
    let json = JSON.stringify(cuotaModeradora)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<CuotaModeradoraDto>(this.UrlBase + '/add', json, {headers: headers});
  }

  //Actualizar cuota moderadora
  updateCuotaModeradora(cuotaModeradoraActualizada: CuotaModeradoraDto){
    let json = JSON.stringify(cuotaModeradoraActualizada)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<CuotaModeradoraDto>(this.UrlBase + '/update', json, {headers: headers});
  }

  //Eliminar una cuota moderadora
  deleteUsuario(idCuotaModeradora: Number){
    return this.httpClient.delete(this.UrlBase + '/delete/' + idCuotaModeradora);
  }

  //Obtener lista de cuotas moderadoras con paginación
  getUsuarios(inicial: Number, cantidad: Number){
    return this.httpClient.get<CuotaModeradoraDto[]>(this.UrlBase + '/' + inicial + '/' + cantidad);
  }

  //Obtener tipos de cita
  getAllTiposCita(){
    return this.httpClient.get<TipoCitaDTO[]>(this.UrlBase + '/tiposCita');
  }

  //Obtener tipos de contrato
  getAllTiposContrato(){
    return this.httpClient.get<TipoContratoDto[]>(this.UrlBase + '/tiposContrato');
  }
}

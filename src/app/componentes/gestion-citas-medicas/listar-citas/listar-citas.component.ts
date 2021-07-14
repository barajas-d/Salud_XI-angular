import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CentroMedicoDto } from 'src/app/modeloDTO/centro-medico-dto';
import { CitaDTO } from 'src/app/modeloDTO/cita-dto';
import { CuotaModeradoraDto } from 'src/app/modeloDTO/cuota-moderadora-dto';
import { UsuarioDto } from 'src/app/modeloDTO/usuario-dto';
import { ProxyCitasService } from 'src/app/servicios/proxy-citas.service';
import { ProxyCuotaModeradoraService } from 'src/app/servicios/proxy-cuota-moderadora.service';
import { ProxyUsuariosService } from 'src/app/servicios/proxy-usuarios.service';
import { DialogDeleteComponent } from '../../layouts/dialog-delete/dialog-delete.component';


@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent implements OnInit {

  //Mensaje de eliminacion de objetos
  titleDelete = "Eliminar cita médica"
  messageDelete = "Esta a punto de eliminar una cita médica, esta seguro de realizar esta operación";

  listaCitasMedicasUsuario: CitaDTO[] = [];
  //parametros en la ruta
  cedulaUsuario: Number;
  usuario: UsuarioDto = null;
  usuarioCargado: Boolean = false;
  listaCuotasModeradoras: CuotaModeradoraDto[] = [];

  //paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  lastPage = 0;

  //table elements
  displayedColumns: string[] = ['fecha', 'sintomatologia', 'tipoCita', 'medico', 'centroMedico', 'cuotaModeradora' , 'acciones'];

  constructor(private dialog: MatDialog, private router: Router, private rutaActiva: ActivatedRoute, private servicioProxyCuotaModeradora: ProxyCuotaModeradoraService, private servicioProxyCitas: ProxyCitasService, private servicioProxyUsuario: ProxyUsuariosService) { 
    //Parametros pasados en la ruta - cedula del usuario
    this.cedulaUsuario = this.rutaActiva.snapshot.params.cedulaUsuario;
    this.getUsuarioByCC();
    this.getCuotasModeradoras();
    this.getCitasByCCUser(0, this.pageSize);
  }

  ngOnInit(): void {
  }

  getCitasByCCUser(page: Number, size: Number){
    this.servicioProxyCitas.getCitasByCCUser(this.cedulaUsuario, page, size).subscribe(
      result => {
        this.listaCitasMedicasUsuario = result['content'];
        this.length = result['totalElements'];
        this.formatDate();
        if(result == null){
          console.log('usuario no encontrado')
        }
        else if(this.listaCitasMedicasUsuario.length == 0){
          console.log('el médico no tiene citas agendadas a este dia')
        }
      },
      error => {
        this.router.navigate(['buscar-citas']);
      }
    );
  }

  getUsuarioByCC(){
    this.servicioProxyUsuario.getUsuarioByCC(this.cedulaUsuario).subscribe(
      result => {
        this.usuario = result;
        this.usuarioCargado = true;
      }
    );
  }

  formatDate(){
    if(this.listaCitasMedicasUsuario != null){
      this.listaCitasMedicasUsuario.forEach(cita => {
        let nueva = new Date(cita.fecha);
        cita.fecha = nueva;
      });
    }
  }

  getCuotasModeradoras(){
    this.servicioProxyCuotaModeradora.getCuotasModeradoras().subscribe(
      result => {
        this.listaCuotasModeradoras = result;
      }
    );
  }

  getValorCuotaModeradora(idTipoCita: Number, idTipoContrato: Number){
    let valorCuotaModeradora;
    this.listaCuotasModeradoras.forEach(cuotaModeradora => { 
      if(cuotaModeradora.tipoCita.id == idTipoCita && cuotaModeradora.tiposContrato.id == idTipoContrato){
        valorCuotaModeradora = cuotaModeradora.valor;
      } 
    });
    if(valorCuotaModeradora == null){
      return 'No definido';
    }
    return valorCuotaModeradora;
  }

  changePage(pageEvent: PageEvent){
    this.getCitasByCCUser(pageEvent.pageIndex, pageEvent.pageSize);
    this.lastPage = pageEvent.pageIndex;
  }

  deleteCitaMedica(idCitaMedica: Number){
    this.servicioProxyCitas.deleteCita(idCitaMedica).subscribe(
      result => {
        this.getCitasByCCUser(this.lastPage, this.pageSize);
      }
    );
  }

  openDeleteDialog(idCitaMedica: Number){
    let dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        title: this.titleDelete,
        message: this.messageDelete
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true){
          this.deleteCitaMedica(idCitaMedica);
        }
      }
    );
  }

  actualizarCitas(estado: Boolean){
    if(estado){
      this.getCitasByCCUser(this.lastPage, this.pageSize);
    }
  }

  //Metodos para crear el formulario
  getFecha(fecha: Date){
    if(fecha != null){
      if(fecha.toLocaleDateString() == '31/12/1969'){
        return "Sin agendar"
      }
      else{
        return fecha.toLocaleDateString() + ' ' + fecha.toLocaleTimeString()
      }
    }
    else{
      return "Sin agendar"
    }
  }

  getCentroMedico(cita: CitaDTO){
    let medico = cita.medico
    if(medico != null){
      return medico.nombre;
    }
    else{
      return "Sin asignar"
    }
  }

  getMedicoNombre(cita: CitaDTO){
    let medico = cita.medico
    if(medico != null){
      return medico.centroMedico.nombre;
    }
    else{
      return "Sin asignar"
    }
  }

}

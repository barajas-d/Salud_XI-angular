import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CentroMedicoDto } from 'src/app/modeloDTO/centro-medico-dto';
import { UbicacionDto } from 'src/app/modeloDTO/ubicacion-dto';
import { UbicacionesCentroMedicoDTO } from 'src/app/modeloDTO/ubicaciones-centro-medico-dto';
import { ProxyCentrosMedicosService } from 'src/app/servicios/proxy-centros-medicos.service';
import { ProxyUsuariosService } from 'src/app/servicios/proxy-usuarios.service';
import { DialogDeleteComponent } from '../../layouts/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-actualizar-centros-medicos',
  templateUrl: './actualizar-centros-medicos.component.html',
  styleUrls: ['./actualizar-centros-medicos.component.css']
})
export class ActualizarCentrosMedicosComponent{

  listaUbicaciones: UbicacionesCentroMedicoDTO[] = [];
  listaUbicacionesOpciones: UbicacionDto[] = [];
  ubicacionSeleccionada: Number;
  //Mensaje de eliminacion de objetos
  titleDelete = "Eliminar ubicación del centro médico"
  messageDelete = "Esta a punto de eliminar una ubicación registrada a un centro médico, esta seguro de realizar esta operación";

  //paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  lastPage = 0;
  displayedColumns: string[] = ['nombre', 'acciones'];

  //datos del centro médico a actualizar
  idCentroMedico: Number;
  centroMedico: CentroMedicoDto;
  centroMedicoCargado: Boolean = false;

  //formGroup para validar campos del formulario
  formGroup: FormGroup;

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private rutaActiva: ActivatedRoute, private formBuilder: FormBuilder, private servicioProxyCentrosMedicos: ProxyCentrosMedicosService, private router: Router, private servicioProxyUsuarios: ProxyUsuariosService) { 
    //parametro pasado por la ruta - id centro medico
    this.idCentroMedico = this.rutaActiva.snapshot.params.idCentroMedico;
    this.getCentroMedico();
    this.getUbicacionesCentroMedico(0, this.pageSize);
    this.getAllUbicaciones();
    //Validaciones del formulario
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required
      ]),
      ubicacion: new FormControl('', [
        Validators.required
      ])
    });
  }

  updateCentroMedico(){
    let CentroMedicoActualizado = new CentroMedicoDto(this.centroMedico.nombre);
    CentroMedicoActualizado.id = this.idCentroMedico;

    this.servicioProxyCentrosMedicos.updateCentroMedico(CentroMedicoActualizado).subscribe(
      result => {
        if(result == null){
          this.openSnackBar("No se puede actualizar este centro médico", "Aceptar")
        }
        else{
          this.navigateListarCentrosMedicos();
          if(result){
            this.openSnackBar("Centro médico actualizado", "Aceptar")
          }
          else{
            this.openSnackBar("No se encuentra en centro médico", "Aceptar")
          }
        }
      }
    );
  }

  getUbicacionesCentroMedico(page: Number, size: Number){
    this.servicioProxyCentrosMedicos.getUbicacionesCentroMedico(this.idCentroMedico, page, size).subscribe(
      result => {
        
        this.listaUbicaciones = result;
        console.log(this.listaUbicaciones);
        this.length = result['length'];
      }
    );
  }
  
  getCentroMedico(){
    this.servicioProxyCentrosMedicos.getCentroMedico(this.idCentroMedico).subscribe(
      result => {
        this.centroMedico = result;
        this.centroMedicoCargado = true;
      }
    );
  }

  navigateListarCentrosMedicos(){
    this.router.navigate(['listar-centros-medicos']);
  }

  deleteUbicacionCentroMedico(idUbicacionCentroMedicoseleccionado: Number){
    this.servicioProxyCentrosMedicos.deleteUbicacionCentroMedico(idUbicacionCentroMedicoseleccionado).subscribe(
      result => {
        this.getUbicacionesCentroMedico(this.lastPage, this.pageSize);
      }
    );
  }

  openDeleteDialog(medicoSeleccionado: Number){
    let dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        title: this.titleDelete,
        message: this.messageDelete
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true){
          this.openSnackBar("Ubicacion eliminada del centro médico", "Aceptar")
          this.deleteUbicacionCentroMedico(medicoSeleccionado);
        }
      }
    );
  }

  changePage(pageEvent: PageEvent){
    this.getUbicacionesCentroMedico(pageEvent.pageIndex, pageEvent.pageSize);
    this.lastPage = pageEvent.pageIndex;
  }

  getAllUbicaciones(){
    this.servicioProxyUsuarios.getAllubicaciones().subscribe(
      result => {
        this.listaUbicacionesOpciones = result;
      }
    );
  }

  addUbicacionCentroMedico(){
    let ubicacionCentroMedico = new UbicacionesCentroMedicoDTO(this.idCentroMedico, this.ubicacionSeleccionada);
    this.servicioProxyCentrosMedicos.addUbicacionCentroMedico(ubicacionCentroMedico).subscribe(
      result => {
        if(result == null){
          this.openSnackBar("La ubicación ya esta registrada a este centro médico", "Aceptar")
        }
        else{
          this.openSnackBar("Ubicacion añadida al centro médico", "Aceptar")
          this.getUbicacionesCentroMedico(this.lastPage, this.pageSize);
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

}

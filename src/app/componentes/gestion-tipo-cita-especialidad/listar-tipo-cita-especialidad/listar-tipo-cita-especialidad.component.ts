import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TipoCitaEspecialidadDto } from 'src/app/modeloDTO/tipo-cita-especialidad-dto';
import { ProxyTipoCitaEspecialidadService } from 'src/app/servicios/proxy-tipo-cita-especialidad.service';
import { DialogDeleteComponent } from '../../layouts/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-listar-tipo-cita-especialidad',
  templateUrl: './listar-tipo-cita-especialidad.component.html',
  styleUrls: ['./listar-tipo-cita-especialidad.component.css']
})
export class ListarTipoCitaEspecialidadComponent {

  listaTipoCitaEspecialidad: TipoCitaEspecialidadDto[] = [];

  //Mensaje de eliminacion de objetos
  titleDelete = "Eliminar tipo cita por especialidad"
  messageDelete = "Esta a punto de eliminar un parametro, esta seguro de realizar esta operación";

  //Paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  lastPage = 0;

  displayedColumns: string[] = ['especialidad', 'tipoCita', 'acciones'];

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private servicioProxyTipoCitaEspecialidad: ProxyTipoCitaEspecialidadService, private router: Router) { 
    this.getTipoCitaEspecialidad(0, this.pageSize);
  }

  getTipoCitaEspecialidad(page: Number, size: Number){
    this.servicioProxyTipoCitaEspecialidad.getTipoCitaEspecialidad(page , size).subscribe(
      result => {
        this.length = result['totalElements'];
        this.listaTipoCitaEspecialidad = result['content'];
      }
    );
  }

  changePage(pageEvent: PageEvent){
    this.getTipoCitaEspecialidad(pageEvent.pageIndex, pageEvent.pageSize);
    this.lastPage = pageEvent.pageIndex;
  }

  navigateCrearTipoCitaEspecialidad(){
    this.router.navigate(['crear-tipo-cita-especialidad']);
  }

  openDeleteDialog(idParametro: Number){
    let dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        title: this.titleDelete,
        message: this.messageDelete
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true){
          this.deleteParametro(idParametro);
        }
      }
    );
  }

  deleteParametro(idParametro: Number){
    this.servicioProxyTipoCitaEspecialidad.deleteTipoCitaEspecialidad(idParametro).subscribe(
      result => {
        if(result == null){
          this.openSnackBar("No se puede eliminar el parametro", "Aceptar")
        }
        else{
          this.openSnackBar("Parametro eliminado correctamente", "Aceptar")
          this.getTipoCitaEspecialidad(this.lastPage, this.pageSize);
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

}

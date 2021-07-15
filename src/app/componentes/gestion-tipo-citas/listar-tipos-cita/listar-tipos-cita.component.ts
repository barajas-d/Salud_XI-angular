import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TipoCitaDTO } from 'src/app/modeloDTO/tipo-cita-dto';
import { ProxyTiposCitaService } from 'src/app/servicios/proxy-tipos-cita.service';
import { DialogDeleteComponent } from '../../layouts/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-listar-tipos-cita',
  templateUrl: './listar-tipos-cita.component.html',
  styleUrls: ['./listar-tipos-cita.component.css']
})
export class ListarTiposCitaComponent {

  listaTiposCita: TipoCitaDTO[] = [];

  //Mensaje de eliminacion de objetos
  titleDelete = "Eliminar tipo de cita"
  messageDelete = "Esta a punto de eliminar un tipo de cita, esta seguro de realizar esta operación, se eliminaran todas las citas de este tipo";

  //Paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  lastPage = 0;

  displayedColumns: string[] = ['nombre', 'duracion', 'acciones'];

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private servicioProxyTipoCita: ProxyTiposCitaService, private router: Router) { 
    this.getTiposCita(0, this.pageSize);
  }

  getTiposCita(page: Number, size: Number){
    this.servicioProxyTipoCita.getTiposCita(page , size).subscribe(
      result => {
        this.length = result['totalElements'];
        this.listaTiposCita = result['content'];
      }
    );
  }

  changePage(pageEvent: PageEvent){
    this.getTiposCita(pageEvent.pageIndex, pageEvent.pageSize);
    this.lastPage = pageEvent.pageIndex;
  }

  navigateCrearTipoCita(){
    this.router.navigate(['crear-tipo-cita']);
  }

  navigateActualizarTipoCita(idTipoCita: Number){
    this.router.navigate(['actualizar-tipo-cita/' + idTipoCita]);
  }

  openDeleteDialog(idTipoCita: Number){
    let dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        title: this.titleDelete,
        message: this.messageDelete
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true){
          this.deleteTipoCita(idTipoCita);    
        }
      }
    );
  }

  deleteTipoCita(idTipoCita: Number){
    this.servicioProxyTipoCita.deleteTipoCita(idTipoCita).subscribe(
      result => {
        if(null){
          this.openSnackBar("El tipo de cita no puede ser eliminado", "Aceptar")
        }
        else{
          this.openSnackBar("Se elimino el tipo de cita correctamente", "Aceptar")
          this.getTiposCita(this.lastPage, this.pageSize);
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

}

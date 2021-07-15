import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioDto } from 'src/app/modeloDTO/usuario-dto';
import { ProxyUsuariosService } from 'src/app/servicios/proxy-usuarios.service';
import { DialogDeleteComponent } from '../../layouts/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})

export class ListarUsuariosComponent {

  listaUsuarios: UsuarioDto[] = [];

  //Mensaje de eliminacion de objetos
  titleDelete = "Eliminar usuario"
  messageDelete = "Esta a punto de eliminar un usuario, esta seguro de realizar esta operación, se eliminaran todas las citas que el usuario haya creado";

  //Paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  lastPage = 0;

  displayedColumns: string[] = ['nombre', 'cedula', 'correo', 'tipoContrato', "ubicacion", 'acciones'];

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private servicioProxyUsuario: ProxyUsuariosService, private router: Router) {
    this.getUsuarios(0, this.pageSize);
  }

  getUsuarios(page: Number, size: Number){
    this.servicioProxyUsuario.getUsuarios(page, size).subscribe(
      result => {
        this.length = result['totalElements'];
        this.listaUsuarios = result['content'];
      }
    );
  }

  changePage(pageEvent: PageEvent){
    this.getUsuarios(pageEvent.pageIndex, pageEvent.pageSize);
    this.lastPage = pageEvent.pageIndex;
  }

  navigateCrearUsuario(){
    this.router.navigate(['crear-usuarios']);
  }

  navigateActualizarUsuario(idUsuario: Number){
    this.router.navigate(['actualizar-usuarios/' + idUsuario]);
  }

  deleteUsuario(idUsuarioSeleccionado: Number){
    this.servicioProxyUsuario.deleteUsuario(idUsuarioSeleccionado).subscribe(
      result => {
        if(result == null){
          this.openSnackBar("No es posible eliminar el usuario", "Aceptar")
        }
        else{
          this.openSnackBar("Usuario eliminado correctamente", "Aceptar")
          this.getUsuarios(this.lastPage, this.pageSize);
        }
      }
    );
  }

  openDeleteDialog(idUsuarioSeleccionado: Number){
    let dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        title: this.titleDelete,
        message: this.messageDelete
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true){
          this.deleteUsuario(idUsuarioSeleccionado);  
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

}

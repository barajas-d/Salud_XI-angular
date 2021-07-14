import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CentroMedicoDto } from 'src/app/modeloDTO/centro-medico-dto';
import { ProxyCentrosMedicosService } from 'src/app/servicios/proxy-centros-medicos.service';
import { DialogDeleteComponent } from '../../layouts/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-listar-centros-medicos',
  templateUrl: './listar-centros-medicos.component.html',
  styleUrls: ['./listar-centros-medicos.component.css']
})
export class ListarCentrosMedicosComponent implements OnInit {

  listaCentrosMedicos: CentroMedicoDto[] = []; 

  //Mensaje de eliminacion de objetos
  titleDelete = "Eliminar centro médico"
  messageDelete = "Esta a punto de eliminar un centro médico, esta seguro de realizar esta operación";

  //paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  lastPage = 0;

  displayedColumns: string[] = ['nombre', 'acciones'];

  constructor(private dialog: MatDialog, private servicioProxyCentroMedico: ProxyCentrosMedicosService, private router: Router) { 
    this.getCentrosMedicos(0, this.pageSize);
  }

  getCentrosMedicos(page: Number, size: Number){
    this.servicioProxyCentroMedico.getCentrosMedicos(page, size).subscribe(
      result => {
        this.length = result['totalElements'];
        this.listaCentrosMedicos = result['content'];
      }
    );
  }

  updateCentrosMedico(idCentroMedico: Number){
    this.router.navigate(['actualizar-centros-medicos/' + idCentroMedico]);
  }

  changePage(pageEvent: PageEvent){
    this.getCentrosMedicos(pageEvent.pageIndex, pageEvent.pageSize);
    this.lastPage = pageEvent.pageIndex;
  }

  navigateCrearCentroMedico(){
    this.router.navigate(['crear-centros-medicos']);
  }

  deleteCentroMedico(medicoSeleccionado: Number){
    this.servicioProxyCentroMedico.deleteCentroMedico(medicoSeleccionado).subscribe(
      result =>{
        console.log(result);
        this.getCentrosMedicos(this.lastPage, this.pageSize);
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
          this.deleteCentroMedico(medicoSeleccionado)    
          console.log('medico eliminado')    
        }
      }
    );
  }

  ngOnInit(): void {
  }

}

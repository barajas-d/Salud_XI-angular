import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MedicoDto } from 'src/app/modeloDTO/medico-dto';
import { ProxyMedicosService } from 'src/app/servicios/proxy-medicos.service';
import { DialogDeleteComponent } from '../../layouts/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-listar-medicos',
  templateUrl: './listar-medicos.component.html',
  styleUrls: ['./listar-medicos.component.css']
})
export class ListarMedicosComponent implements OnInit {

  listaMedicos: MedicoDto[] = [];

  //Mensaje de eliminacion de objetos
  titleDelete = "Eliminar médico"
  messageDelete = "Esta a punto de eliminar un médico, esta seguro de realizar esta operación";

  //paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  lastPage = 0;

  displayedColumns: string[] = ['nombre', 'cedula', 'especialidad', 'intensidadHoraria', "centroMedico", 'acciones'];

  constructor(private dialog: MatDialog, private servicioProxyMedico: ProxyMedicosService, private router: Router) { 
    this.getMedicos(0, this.pageSize);
  }

  getMedicos(page: Number, size: Number){
    this.servicioProxyMedico.getMedicos(page, size).subscribe(
      result => {
        this.length = result['totalElements'];
        this.listaMedicos = result['content'];
      }
    );
  }

  updateMedico(cedulaMedico: Number){
    this.router.navigate(['actualizar-medicos/' + cedulaMedico]);
  }

  changePage(pageEvent: PageEvent){
    this.getMedicos(pageEvent.pageIndex, pageEvent.pageSize);
    this.lastPage = pageEvent.pageIndex;
  }

  navigateCrearMedico(){
    this.router.navigate(['crear-medicos']);
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
          this.deleteMedico(medicoSeleccionado)    
          console.log('medico eliminado')    
        }
      }
    );
  }

  deleteMedico(medicoSeleccionado: Number){
    this.servicioProxyMedico.deleteMedico(medicoSeleccionado).subscribe(
      result =>{
        console.log(result);
        this.getMedicos(this.lastPage, this.pageSize);
      }
    );
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CuotaModeradoraDto } from 'src/app/modeloDTO/cuota-moderadora-dto';
import { TipoCitaDTO } from 'src/app/modeloDTO/tipo-cita-dto';
import { TipoContratoDto } from 'src/app/modeloDTO/tipo-contrato-dto';
import { ProxyCuotaModeradoraService } from 'src/app/servicios/proxy-cuota-moderadora.service';
import { DialogDeleteComponent } from '../../layouts/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-listar-cuota-moderadora',
  templateUrl: './listar-cuota-moderadora.component.html',
  styleUrls: ['./listar-cuota-moderadora.component.css']
})
export class ListarCuotaModeradoraComponent implements OnInit {

  listaCuotasModeradoras: CuotaModeradoraDto[] = [];
  
  //Mensaje de eliminacion de objetos
  titleDelete = "Eliminar parametro cuota moderadora"
  messageDelete = "Esta a punto de eliminar parametro de cuota moderadora, esta seguro de realizar esta operación";

  //Paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  lastPage = 0;
  
  displayedColumns: string[] = ['tipoCita', 'tiposContrato', 'valor', 'acciones'];

  constructor(private dialog: MatDialog, private servicioProxyCuotaModeradora: ProxyCuotaModeradoraService, private router: Router) { 
    this.getCuotasModeradoras(0, this.pageSize);
  }

  getCuotasModeradoras(page: Number, size: Number){
    this.servicioProxyCuotaModeradora.getUsuarios(page , size).subscribe(
      result => {
        this.length = result['totalElements'];
        this.listaCuotasModeradoras = result['content'];
      }
    );
  }

  changePage(pageEvent: PageEvent){
    this.getCuotasModeradoras(pageEvent.pageIndex, pageEvent.pageSize);
    this.lastPage = pageEvent.pageIndex;
  }

  navigateCrearCuotaModeradora(){
    this.router.navigate(['crear-cuotas-moderadoras']);
  }

  openDeleteDialog(idCuotaModeradora: Number){
    let dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        title: this.titleDelete,
        message: this.messageDelete
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true){
          this.deleteCuotaModeradora(idCuotaModeradora);
          console.log('cuota moderadora eliminada');
        }
      }
    );
  }

  deleteCuotaModeradora(idCuotaModeradora: Number){
    this.servicioProxyCuotaModeradora.deleteCuotaModeradora(idCuotaModeradora).subscribe(
      result => {
        this.getCuotasModeradoras(this.lastPage, this.pageSize);
      }
    );
  }

  ngOnInit(): void {
  }

}

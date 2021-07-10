import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CuotaModeradoraDto } from 'src/app/modeloDTO/cuota-moderadora-dto';
import { TipoCitaDTO } from 'src/app/modeloDTO/tipo-cita-dto';
import { TipoContratoDto } from 'src/app/modeloDTO/tipo-contrato-dto';
import { ProxyCuotaModeradoraService } from 'src/app/servicios/proxy-cuota-moderadora.service';

@Component({
  selector: 'app-listar-cuota-moderadora',
  templateUrl: './listar-cuota-moderadora.component.html',
  styleUrls: ['./listar-cuota-moderadora.component.css']
})
export class ListarCuotaModeradoraComponent implements OnInit {

  listaCuotasModeradoras: CuotaModeradoraDto[] = [];
  
  //Paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  
  displayedColumns: string[] = ['tipoCita', 'tiposContrato', 'valor', 'acciones'];

  constructor(private servicioProxyCuotaModeradora: ProxyCuotaModeradoraService, private router: Router) { 
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
  }

  navigateCrearCuotaModeradora(){
    this.router.navigate(['crear-cuotas-moderadoras']);
  }

  ngOnInit(): void {
  }

}

import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaDTO } from 'src/app/ModeloDTO/cita-dto';
import { ProxyCitasService } from 'src/app/servicios/proxy-citas.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  listaCitasMedicasUsuario: CitaDTO[];
  //parametros en la ruta
  cedulaUsuario: Number;

  constructor(private router: Router, private rutaActiva: ActivatedRoute, private servicioProxyCitas: ProxyCitasService) { 
    this.cedulaUsuario = this.rutaActiva.snapshot.params.cedulaUsuario;
    this.getCitasByCCUser();
  }

  ngOnInit(): void {
  }

  getCitasByCCUser(){
    this.servicioProxyCitas.getCitasByCCUser(this.cedulaUsuario).subscribe(
      result => {
        this.listaCitasMedicasUsuario = result;
      },
      error => {
        this.router.navigate(['buscar-citas']);
      }
    );
  }
}

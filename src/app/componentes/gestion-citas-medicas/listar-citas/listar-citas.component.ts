import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaDTO } from 'src/app/ModeloDTO/cita-dto';
import { ProxyCitasService } from 'src/app/servicios/proxy-citas.service';


@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent implements OnInit {

  listaCitasMedicasUsuario: CitaDTO[];
  loadCitasStatus = false;
  //parametros en la ruta
  cedulaUsuario: Number;

  //table elements
  displayedColumns: string[] = ['fecha', 'tipoCita', 'usuario', 'sintomatologia'];

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
        this.loadCitasStatus = true;
        console.log(result);
      },
      error => {
        this.router.navigate(['buscar-citas']);
      }
    );
  }
}

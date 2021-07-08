import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaDTO } from 'src/app/modeloDTO/cita-dto';
import { ProxyCitasService } from 'src/app/servicios/proxy-citas.service';


@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent implements OnInit {

  listaCitasMedicasUsuario: CitaDTO[];
  //parametros en la ruta
  cedulaUsuario: Number;

  //table elements
  displayedColumns: string[] = ['fecha', 'tipoCita', 'usuario', 'sintomatologia'];

  constructor(private router: Router, private rutaActiva: ActivatedRoute, private servicioProxyCitas: ProxyCitasService) { 
    //Parametros pasados en la ruta
    this.cedulaUsuario = this.rutaActiva.snapshot.params.cedulaUsuario;
    
    this.getCitasByCCUser();
  }

  ngOnInit(): void {
  }

  getCitasByCCUser(){
    this.servicioProxyCitas.getCitasByCCUser(this.cedulaUsuario).subscribe(
      result => {
        this.listaCitasMedicasUsuario = result;
        console.log(result);
      },
      error => {
        this.router.navigate(['buscar-citas']);
      }
    );
  }
}

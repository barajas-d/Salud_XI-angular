import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UsuarioDto } from 'src/app/modeloDTO/usuario-dto';
import { ProxyUsuariosService } from 'src/app/servicios/proxy-usuarios.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})

export class ListarUsuariosComponent implements OnInit {

  listaUsuarios: UsuarioDto[] = [];
  
  //Paginacion
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['nombre', 'cedula', 'correo', 'tipoContrato', "ubicacion", 'acciones'];

  constructor(private servicioProxyUsuario: ProxyUsuariosService, private router: Router) {
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
  }

  navigateCrearUsuario(){
    this.router.navigate(['crear-usuarios']);
  }

  ngOnInit(): void {
  }


}

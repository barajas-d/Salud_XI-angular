import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-administrador',
  templateUrl: './navbar-administrador.component.html',
  styleUrls: ['./navbar-administrador.component.css']
})
export class NavbarAdministradorComponent {

  constructor(private router: Router) { }

  navigateBuscarCitas(){
    this.router.navigate(['buscar-citas']);
  }

  navigateInicio(){
    this.router.navigate(['']);
  }
  
}

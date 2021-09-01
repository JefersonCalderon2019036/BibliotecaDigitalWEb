import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.module';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  ModeloUsuario: Usuario;
  ListaDeUsuariosAsc: any;
  opcionSeleccionado: any;
  bloquedeverdatos: any;
  ListaDeUsuarioDes: any;
  bloquededatos2: any;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.ModeloUsuario = new Usuario("","",0,"","","","","","",0);
   }

  ngOnInit(): void {
    this.opcionSeleccionado = 1
    this.capturar()
    this.getUsuariosAscendentes()
  }

  getUsuariosAscendentes(){
    this.bloquedeverdatos = false
    this.bloquededatos2 = true
    this._usuarioService.getUsuariosAdminASC().subscribe(
      res => {
        this.ListaDeUsuariosAsc = res
      }
    )
  }

  getUsuariosDescendentes(){
    this.bloquedeverdatos = true
    this.bloquededatos2 = false
    this._usuarioService.getUsuariosAdminDESC().subscribe(
      res => {
        this.ListaDeUsuarioDes = res
      }
    )
  }

  capturar(){
    if(this.opcionSeleccionado == 1){
      this.getUsuariosAscendentes()
    }else{
      this.getUsuariosDescendentes()
    }
  }
}

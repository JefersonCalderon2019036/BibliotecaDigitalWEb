import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.scss'],
  providers: [UsuarioService]
})
export class MiperfilComponent implements OnInit {
  id: any;
  MiPerfilDatos: any;

  constructor(
    public _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.id = this._usuarioService.getIdUser();
   }

  ngOnInit(): void {
    this.MiPerfil(this.id)
  }

  MiPerfil(id: any){
    this._usuarioService.getBuscarUnUsuarioId(id).subscribe(
      res =>{
        this.MiPerfilDatos = res
      }, error => {
        console.log(<any>error)
      }
    )
  }
}

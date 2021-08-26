import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.module';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  public ModeloUsuario: Usuario;
  public token: any;
  identidad: any;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
    ) {
      this.ModeloUsuario = new Usuario("","",0,"","","","","","",0);
    }

  ngOnInit(): void {
  }

  getToken() {
    this._usuarioService.login(this.ModeloUsuario).subscribe(
      (response) => {
        this.token = response.token;
        console.log("Bienvenido")
        console.log(this.token)
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
  
  cancelar(){
    Swal.fire({
      title: 'Estas seguro que quiere cancelar la operación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Cancelar!',
          'Exelete su operación fu cancelada',
          'success'
        )
        this._router.navigate(['/inicio'])
      }
    })
  }
}

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
  public identidad: any;

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
        this.identidad = response.usuariosEncontrado;
        localStorage.setItem('token', this.token);
        localStorage.setItem('username', this.identidad.usuario)
        localStorage.setItem('rol', this.identidad.rol)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: "Bienvenido",
          showConfirmButton: false,
          timer: 2000
        })
        this._router.navigate(['/principal'])
      },
      (error) => {
        console.log(<any>error);
        let textoalaer = <any>error.error.mensaje
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: textoalaer,
          showConfirmButton: false,
          timer: 3000
        })
      }
    );
  }
  
  cancelar(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No tienes una cuenta, comunicate con un administrador para poder crearte una cuenta',
    })
  }
}

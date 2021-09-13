import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menudenavegacion',
  templateUrl: './menudenavegacion.component.html',
  styleUrls: ['./menudenavegacion.component.scss'],
  providers: [UsuarioService]
})
export class MenudenavegacionComponent implements OnInit {
  token: any;
  rol: any;
  username: any;
  verificaciondeltoken: any;
  verificaciondeltoken2: any;
  verificacionbloqueorol: any;


  constructor(
    public _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
    this.rol = this._usuarioService.getRol();
    this.username = this._usuarioService.getusername();
   }

  ngOnInit(): void {
    this.VerificacionDelToken()
    this.VerificaciondelRol()
  }

  VerificacionDelToken(){
    if(this.token != null){
      if("" != this.rol){
        this.verificaciondeltoken = true;
        this.verificaciondeltoken2 = false;
      }else{
        this.verificaciondeltoken = false;
        this.verificaciondeltoken2 = true;
      }
    }else{
      this.verificaciondeltoken = false;
      this.verificaciondeltoken2 = true;
    }
  }

  VerificaciondelRol(){
    if(this.rol == "admin"){
      this.verificacionbloqueorol = true;
    }else{
      this.verificacionbloqueorol = false;
    }
  }

  Cerrarsesion(){
    localStorage.setItem('token',"" );
    localStorage.setItem('username', "")
    localStorage.setItem('rol', "")
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Que tenga un buen día',
      showConfirmButton: false,
      timer: 1500
    })
    this._router.navigate(['/inicio']);
  }
}

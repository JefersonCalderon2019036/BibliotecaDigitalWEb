import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prestamos } from 'src/app/modelos/prestamos.module';
import { PrestamoServicio } from 'src/app/servicios/prestamos.servicios';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.scss'],
  providers: [UsuarioService, PrestamoServicio]
})
export class MiperfilComponent implements OnInit {
  id: any;
  MiPerfilDatos: any;
  bloqueoporrol: any;
  bloqueoporrol2: any;
  MisPrestamosDatos: any;
  bloqueprestamos: any;

  constructor(
    public _usuarioService: UsuarioService,
    public _PrestamoServicio: PrestamoServicio,
    private _router: Router
  ) {
    this.id = this._usuarioService.getIdUser();
   }

  ngOnInit(): void {
    this.MiPerfil(this.id)
    this.MisPrestamos(this.id)
  }

  MiPerfil(id: any){
    this._usuarioService.getBuscarUnUsuarioId(id).subscribe(
      res =>{
        this.MiPerfilDatos = res
        if(this.MiPerfilDatos.rol = "admin"){
          this.bloqueoporrol = true
          this.bloqueoporrol2 = false
        }else{
          this.bloqueoporrol = false
          this.bloqueoporrol2 = true
        }
        
      }, error => {
        let textoerror = <any>error.mensaje
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: textoerror,
          showConfirmButton: false,
          timer: 2000
        })
      }
    )
  }

  MisPrestamos(id: any){
    this._PrestamoServicio.getObtenerPrestamosPorUsuario(id).subscribe(
      res => {
        this.bloqueprestamos = true
        this.MisPrestamosDatos = res
      }, error => {
        console.log(<any>error)
        this.bloqueprestamos = false
        let textoerror = <any>error.error.mensaje
          Swal.fire({
            icon: 'error',
            title: 'Oops... '+textoerror,
            text: textoerror
          })
      }
    )
  }

  VerMasPrestamo(id: any){
    this._router.navigate(['/detallesprestamos',id])
  }
}

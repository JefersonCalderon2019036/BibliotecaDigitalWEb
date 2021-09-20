import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prestamos } from 'src/app/modelos/prestamos.module';
import { PrestamoServicio } from 'src/app/servicios/prestamos.servicios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detallesprestamos',
  templateUrl: './detallesprestamos.component.html',
  styleUrls: ['./detallesprestamos.component.scss'],
  providers: [PrestamoServicio]
})
export class DetallesprestamosComponent implements OnInit {
  idrutadocumento: any;
  detallesprestamo: any;
  bloquesinfechadeentrega: any;
  ModeloPrestamos: Prestamos;
  carnet: any;
  bloqueo: any;

  constructor(
    public _PrestamoServicio: PrestamoServicio,
    private _router: Router,
    public _activatedRoute: ActivatedRoute
  ) { 
    this.ModeloPrestamos = new Prestamos("","","","","","","","","","","")
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idrutadocumento = dataRuta.get('idprestamo');
    });
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.carnet = dataRuta.get('carnet');
    });
    this.GetUnSoloPrestamo(this.idrutadocumento)
  }

  GetUnSoloPrestamo(id: any){
    this._PrestamoServicio.getUnSoloPrestamo(id).subscribe(
      res =>{
        this.detallesprestamo = res
        if(this.detallesprestamo.iduser == this.carnet){
          if(this.detallesprestamo.estado == "prestado"){
            this.bloqueo = true
          }else{
            this.bloqueo = false
          }
        }else{
          this.bloqueo = false
        }
        if(this.detallesprestamo.fechadeentrega == ""){
          this.bloquesinfechadeentrega = false
        }else{
          this.bloquesinfechadeentrega = true
        }
      }, error => {
        console.log(<any>error)
      }
    )
  }

  PutDeVolverLibro(){
    this.ModeloPrestamos.iduser = this.detallesprestamo.iduser
    this.ModeloPrestamos.idlibro = this.detallesprestamo.idlibro
    this._PrestamoServicio.PutDevolverLibro(this.ModeloPrestamos).subscribe(
      res =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El libro con el nombre de: '+res.nombre+' del autor: '+res.autor+' se a devuelto correctamente',
          showConfirmButton: false,
          timer: 2000
        })
        this.GetUnSoloPrestamo(this.idrutadocumento)
      }, error => {
        let textoerror = <any>error.error.mensaje
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: textoerror,
        })
      }
    )
  }
}

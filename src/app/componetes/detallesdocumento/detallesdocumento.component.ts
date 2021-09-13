import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosServices } from 'src/app/servicios/libros.services';
import { PrestamoServicio } from 'src/app/servicios/prestamos.servicios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detallesdocumento',
  templateUrl: './detallesdocumento.component.html',
  styleUrls: ['./detallesdocumento.component.scss'],
  providers: [LibrosServices,PrestamoServicio]
})
export class DetallesdocumentoComponent implements OnInit {
  idrutadocumento: any;
  LibroEncontrado: any;
  bloqueportipo: any;
  bloqueoprestamo: any;
  bloqueoprestamo2: any;

  constructor(
    private _PrestamoServicio: PrestamoServicio,
    private _LibrosServices: LibrosServices,
    private _router: Router,
    public _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idrutadocumento = dataRuta.get('iddocumento');
    });
    this.getSoloUnDocumento(this.idrutadocumento);
    this.getBloqueoDeBotones(this.idrutadocumento)
  }

  getSoloUnDocumento(id: any){
    this._LibrosServices.getSoloUnDocumento(id).subscribe(
      res => {
        this.LibroEncontrado = res
        if(this.LibroEncontrado.tipo == "Revistas"){
          this.bloqueportipo = true
        }else{
          this.bloqueportipo = false
        }
      }
    )
  }

  getBloqueoDeBotones(id: any){
    this._PrestamoServicio.getObtenerPrestamosPorUsuarioylibro(id).subscribe(
      res => {
        this.bloqueoprestamo = false;
        this.bloqueoprestamo2 = true;
      }, error => {
        this.bloqueoprestamo = true;
        this.bloqueoprestamo2 = false;
      }
    )
  }

  putPrestar(){
    this._PrestamoServicio.putPrestarLibros(this.idrutadocumento).subscribe(
      res=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Este libro fue prestado',
          showConfirmButton: false,
          timer: 1500
        })
        this.getBloqueoDeBotones(this.idrutadocumento)
      }
    )
  }
}

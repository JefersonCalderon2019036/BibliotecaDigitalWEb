import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoServicio } from 'src/app/servicios/prestamos.servicios';

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

  constructor(
    public _PrestamoServicio: PrestamoServicio,
    private _router: Router,
    public _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idrutadocumento = dataRuta.get('idprestamo');
    });
    this.GetUnSoloPrestamo(this.idrutadocumento)
  }

  GetUnSoloPrestamo(id: any){
    this._PrestamoServicio.getUnSoloPrestamo(id).subscribe(
      res =>{
        this.detallesprestamo = res
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
}

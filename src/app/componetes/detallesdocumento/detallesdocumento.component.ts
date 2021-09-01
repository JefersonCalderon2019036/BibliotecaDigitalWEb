import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosServices } from 'src/app/servicios/libros.services';

@Component({
  selector: 'app-detallesdocumento',
  templateUrl: './detallesdocumento.component.html',
  styleUrls: ['./detallesdocumento.component.scss'],
  providers: [LibrosServices]
})
export class DetallesdocumentoComponent implements OnInit {
  idrutadocumento: any;
  LibroEncontrado: any;
  bloqueportipo: any;

  constructor(
    private _LibrosServices: LibrosServices,
    private _router: Router,
    public _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idrutadocumento = dataRuta.get('iddocumento');
    });
    this.getSoloUnDocumento(this.idrutadocumento);
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
}

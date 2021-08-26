import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario.module';
import { GLOBALSERVICIOS } from './globalservicios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: String;
  public token: any;
  public Encabezado = new HttpHeaders().set('Content-Type','application/json')

  constructor(public _http: HttpClient) { 
    this.url = GLOBALSERVICIOS.url;
  }
  //funcion para logearse
  login(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    return this._http.post(this.url + 'login', params, {headers: this.Encabezado});
  }

  
}

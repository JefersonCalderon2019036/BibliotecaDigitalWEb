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
  public identidad: any;
  public Encabezado = new HttpHeaders().set('Content-Type','application/json')
  public EncabezadoToken = this.Encabezado.set('Authorization', this.getToken());

  constructor(public _http: HttpClient) { 
    this.url = GLOBALSERVICIOS.url;
  }
  
  //funcion para Iniciar sesión
  login(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    return this._http.post(this.url + 'login', params, {headers: this.Encabezado});
  }

  //funcion para obtener el token
  getToken(){
    var token2 = localStorage.getItem('token');
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }
    return this.token;
  }

  //funcion para obtener el rol
  getRol(){
    var identidad2 = localStorage.getItem('rol');
    if(identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad = null;
    }
    return this.identidad;
  }

  //funcion para obtener el username
  getusername(){
    var identidad2 = localStorage.getItem('username');
    if(identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad = null;
    }
    return this.identidad;
  }
}

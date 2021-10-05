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

  //funcion para agregar un usuario como admin
  postAgregarUnUsuario(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    return this._http.post(this.url+"CrearUnUsuarioComoAdmin/"+this.getIdUser(), params, {headers: this.EncabezadoToken})
  }

  //funcion para eliminar un solo usuarios
  deleteEliminarUsuariosComoAdmin(id: any): Observable<any>{
    return this._http.delete(this.url+"EliminarUsuariosComoAdmin/"+this.getIdUser()+"/"+id, {headers: this.EncabezadoToken})
  }

  //funcion para traer solo un usuario
  getBuscarUnUsuarioId(id: any): Observable<any>{
    return this._http.get(this.url+"BuscarUnUsuarioId/"+id, {headers: this.EncabezadoToken})
  }

  //funcion para obtener todos los usuarios
  getUsuariosAdminASC(): Observable<any>{
    return this._http.get(this.url+"ListarTodosLosUsuariosAscendente/"+this.getIdUser(),{headers: this.EncabezadoToken})
  }

  //funcion para obtener todos los usuarios
  getUsuariosAdminDESC(): Observable<any>{
    return this._http.get(this.url+"ListarTodosLosUsuariosDescendente/"+this.getIdUser(),{headers: this.EncabezadoToken})
  }

  //funcion para obtener un usuario por su carnet
  getBusquedaDeUsuarioPorCarnet(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    return this._http.put(this.url+"BuscarUnUsuarioPorCarnet/"+this.getIdUser(),params, {headers: this.EncabezadoToken})
  }

  //funcion para editar el usuario como administrador
  putEditarUnUsuarioComoAdministrado(usuario: Usuario, id: any): Observable<any>{
    let params = JSON.stringify(usuario);
    return this._http.put(this.url+"EditarUsuarioComoAdmin/"+this.getIdUser()+"/"+id,params, {headers: this.EncabezadoToken})
  }

  //funcion para ver el usuario con mas prestaciones
  getObtenerLosUsuairosConMasPrestaciones():Observable<any>{
    return this._http.get(this.url+"ObtenerLosUsuairosConMasPrestaciones", {headers: this.EncabezadoToken})
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

  //funcion para obtener el username
  getIdUser(){
    var identidad2 = localStorage.getItem('iduser');
    if(identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad = null;
    }
    return this.identidad;
  }
}

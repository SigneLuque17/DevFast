import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../model/usuario';
import { CrearCuentaComponent } from '../components/crear-cuenta/crear-cuenta.component';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  selectedUsuario: Usuario;


  readonly URL_API = 'http://localhost:3000/api/registrarse'
  usuarios: Usuario[];


  constructor( private http:HttpClient) { //encargado de hacer las peticiones del lado del cliente, asincronas
    this.selectedUsuario = new Usuario();
  }

  getPlanes()  {
    return this.http.get(this.URL_API);
  }

  getUser(id: String){
    return this.http.get(this.URL_API+'/show/'+id);
  }

  createUser(usuario: any){
    return this.http.post(this.URL_API + '/create', usuario);
  }

  editUser(idUsuario: String, usuario: any){
    return this.http.put(this.URL_API + '/edit/'+idUsuario, usuario);
  }

  deleteUser(_id: string){
    return this.http.delete(this.URL_API + '/delete' + `${_id}`)
  }

}

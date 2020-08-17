import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Snippets } from '../model/snippets';
import { CrearCuentaComponent } from '../components/crear-cuenta/crear-cuenta.component';


@Injectable({
  providedIn: 'root'
})
export class SnippetService {

    selectedSnippets: Snippets;


  readonly URL_API = 'http://localhost:3000/api/snippet'
  snippets: Snippets[];


  constructor( private http:HttpClient) { //encargado de hacer las peticiones del lado del cliente, asincronas
    this.selectedSnippets = new Snippets();
  }

//   getPlanes()  {
//     return this.http.get(this.URL_API);
//   }

  getSnippet(idUsuario: String, idSnippet:String){
    return this.http.post(this.URL_API+'/show-snippet', {id_usuario: idUsuario, id_snippet:idSnippet});
  }

  createSnippet(idUsuario: String, snippet:any){
    return this.http.post(this.URL_API + '/create-snippet', {id_usuario: idUsuario, snippet:snippet});
  }
  editSnippet(idUsuario: String, idSnippet:String, snippetUpdated:any){
    return this.http.put(this.URL_API + '/edit-snippet/' + idUsuario + '/' + idSnippet, snippetUpdated);
  }

  deleteSnippet(idUsuario: String, idSnippet:String){
    return this.http.delete(this.URL_API + '/delete-snippet/' + idUsuario + '/' + idSnippet)
  }

}

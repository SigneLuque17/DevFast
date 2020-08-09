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

  getSnippet(id: String){
    return this.http.get(this.URL_API+'/show/'+id);
  }

  createSnippet(snippet: any){
    return this.http.post(this.URL_API + '/create', snippet);
  }

  editSnippet(snippet: Snippets){
    return this.http.put(this.URL_API + '/edit/' + `${snippet._id}`, snippet);
  }

  deleteSnippet(_id: string){
    return this.http.delete(this.URL_API + '/delete' + `${_id}`)
  }

}

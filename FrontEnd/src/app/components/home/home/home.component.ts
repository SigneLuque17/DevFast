import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { CarpetaService } from '../../../service/carpeta.service';
import { ProyectoService } from '../../../service/proyecto.service';
import { SnippetService } from '../../../service/snippet.service';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { saveAs } from 'file-saver';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('closeAddExpenseModal1') closeAddExpenseModal1: ElementRef;
  @ViewChild('closeAddExpenseModal2') closeAddExpenseModal2: ElementRef;

                                                        //reutiizar componente
  // FileSaver : saveAs;
  carpetas = [];
  snippets = [];
  proyectos = [];
  idUsuario:any = JSON.parse(sessionStorage.getItem("id"));
  //gestion de datos de proyecto
  proyecto;
  //gestion datos de snippet
  snippet;
  nombreSnippet;
  ultimaMod;
  codigoSnippet = '';
  lenguaje;
  extension;
  //ids
  idProyecto;
  idSnippet;
  idCarpeta;
  tipoArchivo: any = "";
  //modales
  modalEditar;
  modalEliminar;
  modalSnippet;
  showModalEditar: boolean = false;
  showModalEliminar: boolean = false;
  showModalSnippet: boolean = false;
  //formulario
  cambiarNombre:FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required])
  });

  constructor(private _carpetaService:CarpetaService,private _proyectoService:ProyectoService,private _snippetService:SnippetService, private _router: Router) { 
  this.idUsuario = JSON.parse(sessionStorage.getItem("id"));

    this._carpetaService.getArchivos( this.idUsuario )
      .subscribe( (res:any) => {
        this.carpetas = res.carpetas;
        this.snippets = res.snippets;
        this.proyectos = res.proyectos;
      } );

  }

  ngOnInit(): void {

  }

  verCarpeta(nombre:string, id:String){
    console.log(id);
    this._router.navigate(['/folder', nombre, id]);
  }

  verProyecto(nombre:string, id:String){
    console.log(id);
    if(this.idCarpeta===undefined){
      this.idCarpeta ="";
    }
    this._router.navigate(['/develop',this.idCarpeta, nombre, id]);
  }

  showModalEdit(id, tipoArchivo){
    console.log(id);
    
    this.showModalEditar = true;
    switch (tipoArchivo) {
      case "carpeta":
                      this.idCarpeta=id;
        break;
      case "proyecto":
                      this.idProyecto=id;
                      this._proyectoService.getProject(this.idUsuario, id)
                        .subscribe( (res:any) => {
                          this.proyecto = res.project;
                        });
        break;
      case "snippet":
                      this.idSnippet=id;
                      this._snippetService.getSnippet(this.idUsuario, id)
                        .subscribe( (res:any) => {
                          this.snippet = res.snippet;
                        });
      break;

      default:
        break;
    }
    this.tipoArchivo = tipoArchivo;
  }

  showModalDelete(id, tipoArchivo){
    console.log(id);
    this.showModalEliminar = true;
    switch (tipoArchivo) {
      case "carpeta":
                      this.idCarpeta=id;
        break;
      case "proyecto":
                      this.idProyecto=id;
        break;
      case "snippet":
                      this.idSnippet=id;
      break;

      default:
        break;
    }
    this.tipoArchivo = tipoArchivo;

  }
  
  showModalModifySnippet(id){
    console.log(id);
    this.idSnippet=id;

    let snippet = this.snippets.find( snippet => snippet._id === id );
    this.snippet = snippet;

    this.nombreSnippet = snippet.nombre_snippet;
    this.ultimaMod = snippet.ultima_modificacion;
    this.codigoSnippet = snippet.codigo;
    this.lenguaje = snippet.lenguaje;
    this.extension = snippet.extension;
    this.showModalSnippet = true;
    
  }

  editarNombre(){
    
      switch (this.tipoArchivo) {
        case "carpeta":
                        let carpeta = {
                          nombre_carpeta: this.cambiarNombre.get('nombre').value
                        }
                        console.log(carpeta);
                        
                        this._carpetaService.editCarpeta(this.idUsuario, this.idCarpeta, carpeta)
                        .subscribe( (res:any) => {
                          console.log(res.status);
                          this.carpetas = res.carpetas;                            

                        });

                        this.closeAddExpenseModal.nativeElement.click();
                        this.showModalEditar=false;
                        this.cambiarNombre.reset();
          break;
        case "proyecto":
                        let proyecto = {
                          nombre_proyecto: this.cambiarNombre.get('nombre').value,
                          ultima_modificacion: this.proyecto.ultima_modificacion,
                          codigo_HTML: this.proyecto.codigo_HTML,
                          codigo_CSS: this.proyecto.codigo_CSS,
                          codigo_JS: this.proyecto.codigo_JS
                        }
                        console.log(proyecto);
                        
                        this._proyectoService.editProject(this.idUsuario, this.idProyecto, proyecto)
                          .subscribe( (res:any) => {
                            console.log(res.status);
                            this.proyectos = res.proyectos;                            
                        });
             
                        this.closeAddExpenseModal.nativeElement.click();
                        this.showModalEditar=false;
                        this.cambiarNombre.reset();
          break;
        case "snippet":
                      let snippet = {
                        nombre_snippet: this.cambiarNombre.get('nombre').value,
                        ultima_modificacion: this.snippet.ultima_modificacion,
                        codigo: this.snippet.codigo
                      }
                      console.log(snippet);
                      
                      this._snippetService.editSnippet(this.idUsuario, this.idSnippet, snippet)
                        .subscribe( (res:any) => {
                          console.log(res.status);
                          this.snippets = res.snippets;                            

                      });
            
                      this.closeAddExpenseModal.nativeElement.click();
                      this.showModalEditar=false;
                      this.cambiarNombre.reset();
        break;
      
        default:
          break;
      }


    
  }

  eliminar(){
      switch (this.tipoArchivo) { //me tiene que redirigir a la carpeta padre
        case "carpeta":
                      this._carpetaService.deleteCarpeta(this.idUsuario, this.idCarpeta)
                      .subscribe( (res:any) => {
                        console.log(res.status);
                        this.carpetas = res.carpetas;
                      });
                      this.closeAddExpenseModal1.nativeElement.click();
                      this.showModalEliminar=false;
          break;
        case "proyecto":
                      this._proyectoService.deleteProject(this.idUsuario, this.idProyecto)
                      .subscribe( (res:any) => {
                        console.log(res.status);
                        this.proyectos = res.proyectos;

                      });
                      this.closeAddExpenseModal1.nativeElement.click();
                      this.showModalEliminar=false;
          break;
        case "snippet":
                      this._snippetService.deleteSnippet(this.idUsuario, this.idSnippet)
                      .subscribe( (res:any) => {
                        console.log(res.status);
                        this.snippets = res.snippets;

                      });
                      this.closeAddExpenseModal1.nativeElement.click();
                      this.showModalEliminar=false;
          break;

        default:
          break;
      } 
  }

  guardarCodigoSnippet(){
    console.log(this.idSnippet);
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    this.ultimaMod=myFormattedDate;

    let datos = {
      "nombre_snippet": this.nombreSnippet,
      "ultima_modificacion": myFormattedDate,
      "codigo": this.codigoSnippet,
      "lenguaje": this.lenguaje,
      "extension": this.extension
    }

    this._snippetService.editSnippet(this.idUsuario, this.idSnippet, datos )
      .subscribe( (res:any) => {
        console.log(res);
        let snippet = this.snippets.find( snippet => snippet._id === this.idSnippet );
        let index = this.snippets.indexOf(snippet)
        this.snippets.splice(index, 1, res.snippet)
        this.closeAddExpenseModal2.nativeElement.click();

        this.showModalSnippet = false;
      });
    
  }

  actualizaCodigo(event){
        this.codigoSnippet = event;
        console.log(event);

  }

  actualizaElemento(event){
    console.log(event);
    
    switch (event.tipo) {
      case 'proyecto':
        this.proyectos.push(event.proyecto);
        break;
      case 'carpeta':
        this.carpetas.push(event.carpeta);
        break;
      case 'snippet':
        this.snippets.push(event.snippet);
        break;
    
      default:
        break;
    }
  }

  lenguajeSnippet(lenguaje){
    this.lenguaje = lenguaje;
    switch (lenguaje) {
      case "csharp":
                        this.extension="cs"  
        break;

      case "java":
                        this.extension="java"
        break;
      
      case "javascript":
                        this.extension="js"
        break;

      case "php":
                        this.extension="php"
        break;

      case "python":
                        this.extension="py"
        break;

      case "sql":
                        this.extension="sql"
        break;

      case "typescript":
                        this.extension="ts"
        break;
    
      default:
        break;
    }

  }

  download(tipo_archivo, id){

  switch (tipo_archivo) {
    case "proyecto":
                        this._proyectoService.getProject(this.idUsuario, id)
                        .subscribe( (data:any) => {
                          let proyecto = data.project;
                          let urlPage = this.getGeneratedPageURL({
                            html: proyecto.codigo_HTML,
                            css: proyecto.codigo_CSS,
                            js: proyecto.codigo_JS
                          });
                          console.log(urlPage);
                          
                          saveAs(urlPage, proyecto.nombre_proyecto + ".html");
                          console.log("descargar proyecto");
                        });
      break;
    case "snippet":
                        console.log("descargar snippet");
                        this._snippetService.getSnippet(this.idUsuario, id)
                          .subscribe((data:any)=>{
                            let snippet = data.snippet;
                            let urlSnippet = this.getGeneratedSnippetURL({codigo:snippet.codigo, lenguaje:this.lenguaje});
                            saveAs(urlSnippet, snippet.nombre_snippet + '.' +snippet.extension);
                            
                          })
      break;

    default:
      break;
  }

    
  }

  getGeneratedPageURL = ({ html, css, js }) => {
    const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type })
      return URL.createObjectURL(blob)
    }
  
    const cssURL = getBlobURL(css, 'text/css')
    const jsURL = getBlobURL(js, 'text/javascript')
    
    const source = `
      <html>
        <head>
          <style>
            ${css || ''}
          </style>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          </head>
          <body style="background-color: unset;">
          ${html || ''}
          </body>
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
          <script>
            ${js || ''}
          </script>

          </html>
    `
    console.log(js);
    
  
    return getBlobURL(source, 'text/html')
  }

  getGeneratedSnippetURL = ({ lenguaje, codigo }) => {
    const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type })
      return URL.createObjectURL(blob)
    }

    const source = codigo; 
  
    return getBlobURL(source, lenguaje)
  }

  
}

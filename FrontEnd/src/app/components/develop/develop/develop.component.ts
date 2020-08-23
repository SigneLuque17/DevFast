import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { EditorComponent} from '../../editor/editor.component'
import { ProyectoService } from '../../../service/proyecto.service';
import { SnippetService } from '../../../service/snippet.service';
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';





@Component({
  selector: 'app-develop',
  templateUrl: './develop.component.html',
  styleUrls: ['./develop.component.css']
})
export class DevelopComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('closeAddExpenseModal2') closeAddExpenseModal2: ElementRef;

  //lenguajes
  javascript = 'javascript';
  html = 'html';
  css = 'css';
  //gestion de datos de proyecto
  proyecto;
  nombreProyecto;
  idUsuario:any = JSON.parse(sessionStorage.getItem("id"));
  idCarpeta;
  codeNewHTML;
  codeNewCSS;
  codeNewJS;
  ultimaMod;
  //iframe
  url;

  modal;
  showModal: boolean = false; //cambiar nombre proyecto
  showModalSnippet: boolean = false;

  cambiarNombre:FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required])
  });

  formularioSnippet:FormGroup = new FormGroup({
    nombre_snippet: new FormControl('', [Validators.required])
  });
 

  constructor(private _proyectoService:ProyectoService, private activatedRoute: ActivatedRoute, private _snippetService: SnippetService) {
    this.activatedRoute.params.subscribe(params => {
    console.log(params['id']);
    this.nombreProyecto = params['nombre'];
    this.idCarpeta = params['id_carpeta'];
    this._proyectoService.getProject(this.idUsuario, params['id'])
      .subscribe( (res:any) => {
        this.proyecto = res.project;
        this.nombreProyecto = this.proyecto.nombre_proyecto
        this.ultimaMod = this.proyecto.ultima_modificacion
        this.codeNewHTML = this.proyecto.codigo_HTML;
        this.codeNewCSS = this.proyecto.codigo_CSS;
        this.codeNewJS = this.proyecto.codigo_JS;

        this.actualizaPantalla();  

      });
   });

  }

  ngOnInit(): void {
  }


  actualizaCodigo(languaje, event){
    switch (languaje) {
      case 'html':
        this.codeNewHTML = event;
        console.log('html',event);
        
        break;
      case 'css':
        this.codeNewCSS = event;
        console.log('css',event);
      
        break;
      case 'js':
        this.codeNewJS = event;
        console.log('js',event);
      
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
          ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          </head>
          <body style="background-color: unset;">
          ${html || ''}
          </body>
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
          ${js && `<script src="${jsURL}"></script>`}
          </html>
    `
    console.log(js);
    
  
    return getBlobURL(source, 'text/html')
  }
  
  actualizaPantalla(){
    this.url = this.getGeneratedPageURL({
      html: this.codeNewHTML,
      css: this.codeNewCSS,
      js: this.codeNewJS
    });
  }

  guardarCodigo(){
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    this.ultimaMod=myFormattedDate;

    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.nombreProyecto = params['nombre'];
      let proyecto = {
        nombre_proyecto: this.nombreProyecto,
        ultima_modificacion: myFormattedDate,
        codigo_HTML: this.codeNewHTML,
        codigo_CSS: this.codeNewCSS,
        codigo_JS: this.codeNewJS
      }
      this._proyectoService.editProject(this.idUsuario, params['id'], proyecto)
        .subscribe( (res:any) => {
          console.log(res);
          
          this.proyecto = res.project;
        });
     });

     this.actualizaPantalla();
  }

  showModalCreate(){
    this.showModal = true;
  }
  editarNombreProyecto(){
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.nombreProyecto = this.cambiarNombre.get('nombre').value;
      let proyecto = {
        nombre_proyecto: this.nombreProyecto,
        ultima_modificacion: this.ultimaMod,
        codigo_HTML: this.codeNewHTML,
        codigo_CSS: this.codeNewCSS,
        codigo_JS: this.codeNewJS

      }
      console.log(this.nombreProyecto);
      
      this._proyectoService.editProject(this.idUsuario, params['id'], proyecto)
        .subscribe( (res:any) => {
          console.log(res);
          
          this.proyecto = res.project;
        });
     });
     this.closeAddExpenseModal.nativeElement.click();
     this.showModal=false;
     this.cambiarNombre.reset();
  }

  createSnippet(){
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id_carpeta']);
      if(params['id_carpeta']==undefined){
        this.idCarpeta = "";
      } else {
      this.idCarpeta = params['id_carpeta'];
      }
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'longDate');
    const myFormattedDate2 = pipe.transform(now, 'short');
    // this.fechaCreado=myFormattedDate;


    if (this.formularioSnippet.get('nombre_snippet').valid) {
      let datos = {
        'nombre_snippet':this.formularioSnippet.get("nombre_snippet").value,
        'fecha_creacion':myFormattedDate,
        'ultima_modificacion':myFormattedDate2,
        'codigo':this.codeNewJS,
        'carpeta_padre':this.idCarpeta,
        'lenguaje': "javascript",
        'extension': "js"
      }

      this._snippetService.createSnippet(this.idUsuario, datos)
          .subscribe((res:any) => {
            console.log(res.status);

            this.closeAddExpenseModal2.nativeElement.click();
            this.showModalSnippet=false;
          });
         
    }
  });
  }

  regresar(){
    window.history.back();
  }
  

}

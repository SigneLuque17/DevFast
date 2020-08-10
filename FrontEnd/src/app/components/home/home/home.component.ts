import { Component, OnInit } from '@angular/core';
import { CarpetaService } from '../../../service/carpeta.service';
import { Router } from "@angular/router";




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
                                                        //reutiizar componente
  carpetas = [];
  snippets = [];
  proyectos = [];
  idUsuario:any;

  constructor(private _carpetaService:CarpetaService, private _router: Router) { 
  this.idUsuario = JSON.parse(localStorage.getItem("id"));

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
    this._router.navigate(['/develop', nombre, id]);
  }

}

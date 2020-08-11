import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ProyectoService } from '../../../service/proyecto.service';
import { CarpetaService } from '../../../service/carpeta.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('closeAddExpenseModal2') closeAddExpenseModal2: ElementRef;


  idUsuario:any = JSON.parse(localStorage.getItem("id"));
  idCarpetaPadre:any = "";
  fechaCreado;

  showModalProyecto: boolean = false;
  showModalCarpeta: boolean = false;

  formularioProyecto:FormGroup = new FormGroup({
    nombre_proyecto: new FormControl('', [Validators.required])
  });

  formularioCarpeta:FormGroup = new FormGroup({
    nombre_carpeta: new FormControl('', [Validators.required])
  });

  constructor(private _proyectoService: ProyectoService, private _carpetaService: CarpetaService, private activatedRoute: ActivatedRoute) { 
  this.idUsuario = JSON.parse(localStorage.getItem("id"));

  }

  ngOnInit(): void {
  }

  showModalCreateProject(){
    this.showModalProyecto = true;
  }

  showModalCreateFolder(){
    this.showModalCarpeta = true;
  }
  createProject(){
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      if(params['id']==undefined){
        this.idCarpetaPadre = "";
      } else {
      this.idCarpetaPadre = params['id'];
      }
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'longDate');
    const myFormattedDate2 = pipe.transform(now, 'short');

    this.fechaCreado=myFormattedDate;

    if (this.formularioProyecto.get('nombre_proyecto').valid) {
      let datos = {
        'nombre_proyecto':this.formularioProyecto.get("nombre_proyecto").value,
        'fecha_creacion':myFormattedDate,
        'carpeta_padre':this.idCarpetaPadre,
        'ultima_modificacion':myFormattedDate2,
        'codigo_HTML':"",
        'codigo_CSS':"",
        'codigo_JS':""

      }

      this._proyectoService.createProject(this.idUsuario, datos)
          .subscribe((res:any) => {
            console.log(res);
            // this.idUsuario = res.id;

            this.closeAddExpenseModal.nativeElement.click();
            this.showModalProyecto=false;
          });
    }
  });

  }

  createFolder(){
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      if(params['id']==undefined){
        this.idCarpetaPadre = "";
      } else {
      this.idCarpetaPadre = params['id'];
      }
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'longDate');
    this.fechaCreado=myFormattedDate;

    if (this.formularioCarpeta.get('nombre_carpeta').valid) {
      let datos = {
        'nombre_carpeta':this.formularioCarpeta.get("nombre_carpeta").value,
        'fecha_creacion':myFormattedDate,
        'carpeta_padre':this.idCarpetaPadre
      }

      this._carpetaService.createCarpeta(this.idUsuario, datos)
          .subscribe((res:any) => {
            console.log(res);
            this.idCarpetaPadre = res.carpeta_padre;

            this.closeAddExpenseModal2.nativeElement.click();
            this.showModalCarpeta=false;
          });
         
    }
  });
  }
}

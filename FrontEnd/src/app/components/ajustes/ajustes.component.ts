import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from "../../service/usuario.service";
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { Options, ImageResult } from "ngx-image2dataurl";
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('closeAddExpenseModal2') closeAddExpenseModal2: ElementRef;

  idUsuario:any = JSON.parse(sessionStorage.getItem("id"));
  correo:any = JSON.parse(sessionStorage.getItem("correo"));
  nombreUsuario;
  idPlan;
  nombrePlan;
  planes: any = [];
  planSelected:string ='';
  cantidadProyectos;
  cantidadSnippets;
  perfil;
  contrasena;
  //modales
  modalPass;  //id
  modalPlan;  //id
  showModalPass: boolean = false;
  showModalPlan: boolean = false;
//validacion contraseña anterior
  valido:boolean=false;
//imagen 
imageChangedEvent: any = '';
  croppedImage: any = '';
  fileInput: Array <File>;
  firstImage:any = 'assets/profile.png';
  src: string;
  options: Options = {
    resize: {
      maxHeight: 1697,
      maxWidth: 1200
    },
    allowedExtensions: ['JPG', 'PNG']
  }
  images: any = [];
  imagenSeleccionada:boolean=false;
  //formulario
  cambiarContrasena:FormGroup = new FormGroup({
    oldPassword: new FormControl('' , [Validators.required, Validators.maxLength(20), Validators.minLength(8)]),
    newPassword: new FormControl({value:'', disabled: !this.valido} , [Validators.required, Validators.maxLength(20), Validators.minLength(8)]),
    confirmNewPassword: new FormControl({value:'', disabled: !this.valido}, [Validators.required, Validators.maxLength(20), Validators.minLength(8)]),

  });


  constructor(private _usuarioService: UsuarioService) { 
    this._usuarioService.getUser(this.correo)
        .subscribe((res:any) => {
          this.nombreUsuario=res.user.nombre;
          this.nombrePlan=res.plan.tipo_plan;
          this.idPlan=res.plan._id;
          this.contrasena = res.user.contrasena;
          this.cantidadProyectos=res.user.proyectos.length;
          this.cantidadSnippets=res.user.snippets.length;

          if (res.user.perfil==="") {
            this.src = "assets/profile.png"
          } else{
            this.src=res.user.perfil;
          }
          
    });
  }

  ngOnInit(): void {
  }

  showModalCambiarPass(){
  this.showModalPass = true;
  }

  showModalCambiarPlan(){
    this.showModalPlan = true;
    this._usuarioService.getPlanes().subscribe(res =>{
      this.planes = res;
      console.log(this.planes);
    });
  }
  validarAnteriorContrasena(){
    if (this.cambiarContrasena.get('oldPassword').value===this.contrasena) {
      console.log("contraseña verificada");
      this.cambiarContrasena.controls['newPassword'].enable();
      this.cambiarContrasena.controls['confirmNewPassword'].enable();
      this.valido = true;
    } else {
      console.log("contraseña incorrecta");
      this.cambiarContrasena.controls['newPassword'].disable();
      this.cambiarContrasena.controls['confirmNewPassword'].disable();
      this.valido = false;
    }
  }

  cambiarPassword(){
    if (this.cambiarContrasena.get('oldPassword').valid &&
    this.cambiarContrasena.get('newPassword').valid &&
    this.cambiarContrasena.get('confirmNewPassword').valid 
    ){ 
        if (this.cambiarContrasena.get('newPassword').value===this.cambiarContrasena.get('confirmNewPassword').value) {
          console.log('válido');

          var usuario = {
            "nombre": this.nombreUsuario,
            "contrasena": this.cambiarContrasena.get('confirmNewPassword').value,
            "perfil": this.perfil,
            "plan": this.idPlan
          };
          console.log(usuario);
      
          this._usuarioService.editUser(this.idUsuario, usuario)
              .subscribe((res:any) => {
                console.log(res.status);
                
                this.closeAddExpenseModal2.nativeElement.click();
                this.modalPlan=false;
          });

          this.closeAddExpenseModal.nativeElement.click();
          this.showModalPass=false;
          this.cambiarContrasena.reset();

        }else{
          console.log("las contraseñas no coinciden");
        }
    }
    
  }

  validation(campo){
    return this.cambiarContrasena.get(campo).invalid && this.cambiarContrasena.get(campo).touched;
  }

  tipoPlan(tipo){
    console.log(tipo);
    this.planSelected = tipo;
  }

  cambiarPlan(){
  var usuario = {
      "nombre": this.nombreUsuario,
      "contrasena": this.contrasena,
      "perfil": this.perfil,
      "plan": this.planSelected
  };
    console.log(usuario);

    this._usuarioService.editUser(this.idUsuario, usuario)
        .subscribe((res:any) => {
          console.log(res.status);
          this.nombrePlan= res.plan.tipo_plan;
          
          this.closeAddExpenseModal2.nativeElement.click();
          this.modalPlan=false;
    });
    
  }

  cambiarPerfil(){      //no me guarda la imagen
    let allForm = new FormData();
    if (this.images.length > 0){
      let file =  this.images[0];
      // for (const file of  this.images) {
        allForm.append("files", file.file);
        allForm.append('img', 'assets/perfil/'+file.file.name);
        allForm.set('perfil', 'assets/perfil/'+file.file.name);
        allForm.set('nombre',  this.nombreUsuario);
        allForm.set('contrasena',this.contrasena );
        allForm.set('plan', this.idPlan);
        // let usuario = {
        //   'perfil': 'assets/perfil/'+file.file.name,
        //   'nombre': this.nombreUsuario,
        //   'contrasena':this.contrasena,
        //   'plan':this.idPlan
        //   }
        
        this._usuarioService.editUser(this.idUsuario, allForm)
            .subscribe((res:any) => {
              console.log(res.status);
              this.src='assets/perfil/'+file.file.name;
              console.log(this.src);
              
              // this.firstImage=res.usuario.perfil;
              this.imagenSeleccionada=false;

        });
        // console.log((this.src).toString());
        

      }      
    // }
  }

  onLoadImg( e ){
    this.imageChangedEvent = e;
    console.log(e);
    this.fileInput = e.target.files;

    const reader = new FileReader();
    reader.onload = e => this.firstImage = reader.result;

    reader.readAsDataURL(this.fileInput[0]);
    this.imageCropped(  this.imageChangedEvent);
  }

  selected(imageResult:ImageResult) {
    this.images = [];
    if (imageResult.error) alert(imageResult.error);
    this.images.push(imageResult);
    console.log(this.images);

    this.src = imageResult.resized && imageResult.resized.dataURL || imageResult.dataURL;
    this.imagenSeleccionada=true;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      console.log('fuera JOH');

  }
  imageLoaded() {
      // show cropper
      console.log('imageLoaded');

  }
  cropperReady() {
    console.log('cropperReady');
      // cropper ready
  }
  loadImageFailed() {
    console.log('loadImageFailed');
      // show message
  }


}

import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { UsuarioService } from "../../../service/usuario.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  idUsuario:any;
  invalido:boolean=false;

  formularioLogin:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(8)])
  });
  constructor(private _usuarioService: UsuarioService, private _router: Router) { }

  ngOnInit(): void {
  }

  login(){
    if (this.formularioLogin.get('email').valid &&
    this.formularioLogin.get('password').valid 
    ){
      const correo = this.formularioLogin.get('email').value;
      this._usuarioService.getUser(correo)
          .subscribe((res:any) => {
            console.log(res.idUsuario);
            this.idUsuario = res.idUsuario;

            if ( this.formularioLogin.get('password').value === res.user.contrasena) {
              console.log('válido');
              
              this._router.navigate(['/home']);
             
              sessionStorage.setItem("id", JSON.stringify(this.idUsuario));
              sessionStorage.setItem("correo", JSON.stringify(correo));
              this.invalido=false;
            } else{
              console.log("contraseña incorrecta");
              this.invalido = true;
            }
          });     
     }
    
    
  }

  validation(campo){
    return this.formularioLogin.get(campo).invalid && this.formularioLogin.get(campo).touched;
  }

  
  
}

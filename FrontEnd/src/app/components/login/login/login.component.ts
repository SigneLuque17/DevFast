import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { UsuarioService } from "../../../service/usuario.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  idUsuario:any;

  formularioLogin:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i)]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.formularioLogin.value);
    const correo = this.formularioLogin.get('email').value;
    
    this._usuarioService.getUser(correo)
        .subscribe((res:any) => {
          console.log(res.idUsuario);
          this.idUsuario = res.idUsuario;
          localStorage.setItem("id", JSON.stringify(this.idUsuario));
        });
    
  }

  validation(campo){
    return this.formularioLogin.get(campo).invalid && this.formularioLogin.get(campo).touched;
  }
}

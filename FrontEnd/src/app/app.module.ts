import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


//MODULOS
import { MonacoEditorModule } from 'ngx-monaco-editor';
//COMPONENTES
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { LandingPageComponent } from './components/landing/landing-page/landing-page.component';
import { SnippetComponent } from './components/snippet/snippet/snippet.component';
import { HomeComponent } from './components/home/home/home.component';
import { DevelopComponent } from './components/develop/develop/develop.component';
import { LoginComponent } from './components/login/login/login.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { EditorComponent } from './components/editor/editor.component';
import { PlanesComponent } from './components/planes/planes.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { FolderComponent } from './components/folder/folder.component';



//FORMULARIOS
import { LoginFormularioComponent } from './components/login-formulario/login-formulario.component';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';

//RUTAS
import { APP_ROUTING } from "./app.router";




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    SnippetComponent,
    HomeComponent,
    DevelopComponent,
    LoginComponent,
    AjustesComponent,
    FooterComponent,
    LoginFormularioComponent,
    CrearCuentaComponent,
    EditorComponent,
    PlanesComponent,
    FolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    APP_ROUTING,
    MonacoEditorModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

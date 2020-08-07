import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LandingPageComponent } from './components/landing/landing-page/landing-page.component';
import { SnippetComponent } from './components/snippet/snippet/snippet.component';
import { HomeComponent } from './components/home/home/home.component';
import { DevelopComponent } from './components/develop/develop/develop.component';
import { LoginComponent } from './components/login/login/login.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { LoginFormularioComponent } from './components/login-formulario/login-formulario.component';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';
import { PlanesComponent } from './components/planes/planes.component';
import { FolderComponent } from './components/folder/folder.component';



const routes: Routes = [
    { path: '', component: LandingPageComponent },     //raiz debe ser el landing
    { path: 'home', component: HomeComponent },
    { path: 'landing', component: LandingPageComponent },
    { path: 'snippet', component: SnippetComponent },
    { path: 'develop', component: DevelopComponent },
    { path: 'login', component: LoginComponent },
    { path: 'ajustes', component: AjustesComponent},
    { path: 'iniciarSesion', component: LoginFormularioComponent },
    { path: 'registrarse', component: CrearCuentaComponent},
    { path: 'planes', component: PlanesComponent},
    { path: 'folder', component: FolderComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'landing' }
];

export const APP_ROUTING = RouterModule.forRoot(routes);


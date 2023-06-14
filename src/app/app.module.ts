import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UtilisateurCreateComponent } from './utilisateur-create/utilisateur-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { TacheCreateComponent } from './tache-create/tache-create.component';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { TacheListComponent } from './tache-list/tache-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path:'/',component:AppComponent},
  {path:'/Liste_Utilisateur',component:UtilisateurListComponent},
  {path:'/Creer_Utilisateur',component:UtilisateurCreateComponent},
  {path:'/Liste_Tache',component:TacheListComponent},
  {path:'/Creer_Tache',component:TacheCreateComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    UtilisateurCreateComponent,
    TacheCreateComponent,
    UtilisateurListComponent,
    TacheListComponent,
    NavBarComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

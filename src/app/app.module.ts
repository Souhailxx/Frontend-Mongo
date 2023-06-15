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
import { AuthentificationComponent } from './authentification/authentification.component';
import { HomeComponent } from './home/home.component';
import { ChartComponent } from './chart/chart.component';



const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Liste_Utilisateur',component:UtilisateurListComponent},
  {path:'Creer_Utilisateur',component:UtilisateurCreateComponent},
  {path:'Liste_Tache',component:TacheListComponent},
  {path:'Creer_Tache',component:TacheCreateComponent},
  {path :'authentification',component:AuthentificationComponent},
  {path:'Charts',component:ChartComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    UtilisateurCreateComponent,
    TacheCreateComponent,
    UtilisateurListComponent,
    TacheListComponent,
    NavBarComponent,
    AuthentificationComponent,
    HomeComponent,
    ChartComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),

    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }

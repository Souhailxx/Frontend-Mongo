import {Component} from '@angular/core';

import {UtilisateurService} from "../service/utilisateur.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Utilisateur} from "../model/Utilisateur";

@Component({
  selector: 'app-utilisateur-create',
  templateUrl: './utilisateur-create.component.html',
  styleUrls: ['./utilisateur-create.component.css']
})
export class UtilisateurCreateComponent {

  utilisateur: Utilisateur = {
    nomUtilisateur: '',
    motDePasse: ''
  };
  passwordVisible = false;
  constructor(private utilisateurService: UtilisateurService) {
  }

  onSubmit() {
    //Attribue un un Id

    this.utilisateurService.addUtilisateur(this.utilisateur).subscribe(
      response => {
        // Handle successful response
        console.log('Utilisateur a été ajouter avec succes:', response);
        // Reset the form
        this.utilisateur = {
          nomUtilisateur: '',
          motDePasse: ''
        };
      },
      error => {
        // Handle error
        console.error('Error creating utilisateur:', error);
      }
    );


  }

}

import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../service/utilisateur.service";
import {Utilisateur} from "../model/Utilisateur";

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.css']
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs!: Utilisateur[];

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.getAllUtilisateurs();
  }

  getAllUtilisateurs() {
    this.utilisateurService.getAllUtilisateurs()
      .subscribe(utilisateurs => {
        this.utilisateurs = utilisateurs;
      });
  }

  deleteUtilisateur(nomUtilisateur: string) {
    this.utilisateurService.deleteUtilisateurByNomUtilisateur(nomUtilisateur)
      .subscribe(() => {
        // Remove the deleted utilisateur from the list
        this.utilisateurs = this.utilisateurs.filter(u => u.nomUtilisateur !== nomUtilisateur);
      });
  }
}

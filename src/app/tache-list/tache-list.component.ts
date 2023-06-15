import { Component, OnInit } from '@angular/core';
import { Tache } from "../model/Tache";
import { TacheService } from "../service/tache.service";
import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-tache-list',
  templateUrl: './tache-list.component.html',
  styleUrls: ['./tache-list.component.css']
})
export class TacheListComponent implements OnInit {
  taches: Tache[] = [];
  filteredTaches: Tache[] = [];
  searchTerm: string = '';

  constructor(private tacheService: TacheService, private authService: AuthService) { }

  ngOnInit() {
    this.loadTaches(this.authService.idUtilisateurConnecte);
  }

  loadTaches(idUtilisateur: string) {
    this.tacheService.getTachesByUtilisateur(idUtilisateur).subscribe(
      (taches: Tache[]) => {
        this.taches = taches;
        this.applySearchFilter();
      },
      (error) => {
        console.log('Une erreur s\'est produite lors du chargement des tâches :', error);
      }
    );
  }

  updateTache(tache: Tache) {
    this.tacheService.updateStatutTache(tache.titre, tache.estTerminee).subscribe(
      () => {
        console.log('La tâche a été mise à jour avec succès.');
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la mise à jour de la tâche :', error);
      }
    );
  }

  deleteTache(tache: Tache) {
    this.tacheService.deleteTachebyTitre(tache.titre).subscribe(
      () => {
        console.log('La tâche a été supprimée avec succès.');
        this.loadTaches(this.authService.idUtilisateurConnecte); // Recharger la liste des tâches après la suppression
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la suppression de la tâche :', error);
      }
    );
  }

  applySearchFilter() {
    if (this.searchTerm) {
      const searchTermLowerCase = this.searchTerm.toLowerCase();
      this.filteredTaches = this.taches.filter(tache => tache.titre.toLowerCase().includes(searchTermLowerCase));
    } else {
      this.filteredTaches = this.taches;
    }
  }

  sortTasksByDate() {
    this.filteredTaches.sort((a, b) => {
      const dateA = new Date(a.dateEcheance).getTime();
      const dateB = new Date(b.dateEcheance).getTime();
      return dateA - dateB;
    });
  }
}

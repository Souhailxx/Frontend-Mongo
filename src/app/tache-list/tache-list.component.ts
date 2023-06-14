import {Component, OnInit} from '@angular/core';
import {Tache} from "../model/Tache";
import {TacheService} from "../service/tache.service";

@Component({
  selector: 'app-tache-list',
  templateUrl: './tache-list.component.html',
  styleUrls: ['./tache-list.component.css']
})
export class TacheListComponent implements OnInit {
  taches: Tache[] = [];

  constructor(private tacheService: TacheService) { }

  ngOnInit() {
    this.loadTaches();
  }

  loadTaches() {
    this.tacheService.getAllTachesByUtilisateur('1').subscribe(
      (taches: Tache[]) => {
        this.taches = taches;
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
        this.loadTaches(); // Recharger la liste des tâches après la suppression
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la suppression de la tâche :', error);
      }
    );
  }
}


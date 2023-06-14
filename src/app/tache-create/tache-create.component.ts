import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TacheService} from '../service/tache.service';
import {Tache} from "../model/Tache";

@Component({
  selector: 'app-tache-create',
  templateUrl: './tache-create.component.html',
  styleUrls: ['./tache-create.component.css']
})
export class TacheCreateComponent implements OnInit {
  tacheForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tacheService: TacheService,
  ) { }

  ngOnInit() {
    this.createTacheForm();
  }

  createTacheForm() {
    this.tacheForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      dateEcheance: ['', Validators.required],
      estTerminee: [false],
      idUtilisateur: [''] // Vous devrez peut-être récupérer l'ID de l'utilisateur actuel ici
    });
  }

  onSubmit() {
    if (this.tacheForm.invalid) {
      return;
    }

    const tache: Tache = this.tacheForm.value;

    this.tacheService.addTache(tache).subscribe(
      (response) => {
        // La tâche a été ajoutée avec succès
        // Réinitialiser le formulaire ou effectuer toute autre action nécessaire
        this.tacheForm.reset();
      },
      (error) => {
        // Une erreur s'est produite lors de l'ajout de la tâche
        // Gérer l'erreur de manière appropriée
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Utilisateur } from "../model/Utilisateur";
import { UtilisateurService } from "../service/utilisateur.service";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  loginForm!: FormGroup;
  successMessage: boolean = false;
  errorMessage: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private utilisateurService: UtilisateurService
  ) {}

  utilisateurExistant: Utilisateur[] = [];

  ngOnInit() {
    this.createLoginForm();
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (utilisateurs: Utilisateur[]) => {
        this.utilisateurExistant = utilisateurs;
      },
      (error) => {
        console.error('Error retrieving existing utilisateurs:', error);
        // Handle the error as needed
      }
    );
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      nomUtilisateur: ['', Validators.required],
      motDePasse: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const utilisateur: Utilisateur = this.loginForm.value;
    const existingUtilisateur = this.utilisateurExistant.find(
      (existingUser) => existingUser.nomUtilisateur === utilisateur.nomUtilisateur
    );

    if (existingUtilisateur && existingUtilisateur.motDePasse === utilisateur.motDePasse) {
      // Username and password match
      this.authService.nomUtilisateurConnecte = utilisateur.nomUtilisateur;
      this.utilisateurService.findUtilisateurID(this.authService.nomUtilisateurConnecte).subscribe(
        (response: any) => {
          const utilisateurID: string = response.id;
          this.authService.idUtilisateurConnecte = utilisateurID;
          console.log('success')
          this.loginForm.reset();
          this.successMessage = true; // Display success message
          this.errorMessage = false; // Hide error message
        },
        (error) => {
          console.error('Error retrieving utilisateur ID:', error);
          // Handle the error as needed
        }
      );
    } else {
      console.log('Incorrect')
      this.loginForm.reset();
      this.successMessage = false; // Hide success message
      this.errorMessage = true; // Display error message
    }
  }
}

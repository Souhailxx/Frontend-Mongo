import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../model/Utilisateur";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/utilisateur/all`);
  }

  getUtilisateurById(id: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/utilisateur/${id}`);
  }

  getUtilisateurByNomUtilisateur(nomUtilisateur: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/utilisateur/nom/${nomUtilisateur}`);
  }

  addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.apiUrl}/utilisateur/add`, utilisateur);
  }

  deleteUtilisateurById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/utilisateur/delete/${id}`);
  }

  deleteUtilisateurByNomUtilisateur(nomUtilisateur: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/utilisateur/delete/nom/${nomUtilisateur}`);
  }

  findUtilisateurID(nomUtilisateur: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/utilisateur/id/${nomUtilisateur}`);
  }
}

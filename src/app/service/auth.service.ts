import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Utilisateur} from "../model/Utilisateur";
import {Tache} from "../model/Tache";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private authToken!: string;

  connected : boolean = false
  nomUtilisateurConnecte!:string
  idUtilisateurConnecte!:string

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<void> {
    const credentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`
    });

    return this.http.get<void>(`${this.apiUrl}/login`, {headers}).pipe(
      tap(() => {
        // Stocker le jeton d'authentification
        this.authToken = credentials;
      })
    );
  }

  getTachesUtilisateur(): Observable<Tache[]> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${this.authToken}`
    });

    return this.http.get<Tache[]>(`${this.apiUrl}/taches/utilisateur`, {headers});
  }
}

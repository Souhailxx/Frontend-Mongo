import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tache} from "../model/Tache";

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http :HttpClient) { }

  getAllTachesByUtilisateur(id: string): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/taches/${id}/all`);
  }

  addTache(tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(`${this.apiUrl}/taches/add`, tache);
  }

/*  deleteTache(idTache: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/taches/delete/${idTache}`);
  }*/
  updateStatutTache(id: string, estTerminee: boolean): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/taches/${id}/statut?estTerminee=${estTerminee}`, {});
  }

  deleteTachebyTitre(titre: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/taches/delete/titre/${titre}`);
  }
}

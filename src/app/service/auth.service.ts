import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  register(utilisateur: any) {
    return this.http.post(`${this.apiUrl}/utilsateur/add`, utilisateur);
  }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    // Perform any necessary cleanup or additional API calls for logout
    // Remove the session/token from local storage or cookie
  }
}

import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



  getProfile(userId : string): Observable<any> {
    return this.http.get(API_URL + 'profile/' + userId, this.httpOptions);
  }




  // Future development - user service for fetching user-specific data, e.g. profile info, user settings, etc.

  // getDeshboard(): Observable<any> {
  //   return this.http.get(API_URL + 'user', { responseType: 'text' });
  // }

  // getUnit(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text' });
  // }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }
}

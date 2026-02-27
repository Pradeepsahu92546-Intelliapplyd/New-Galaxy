import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Fetch user profile details accounting user no role requuire beasuse user-profile & account owner user owner himself
  getProfile(): Observable<any> {
    //  mock
    const mockUser = {
      fname: 'vijay',
      uname: 'vijay test',
      email: 'vijayxavier1234@gmail.com',
      phone: '8310301923',
      utype: 'individual',
      acc_type: 'standard',
      lst_login: '2025-07-07T06:29:32.397825Z',
      acc_created: '2025-05-29T09:47:12.780699Z',
      lname: 'test',
      dob: '1999-03-12',
      pic: '',
      loc: null,
    };

    // Simulate a successful response (200 OK)
    return of({
      status: 200,
      message: 'Login successful',
      data: mockUser,
      meta: {
        requestId: 'redomid-12345',
        timestamp: new Date().toISOString(),
      },
    }).pipe(delay(10)); // simulate network delay

    // real API integration
    // const url = `${this.baseUrl}/v1/users/profile/`;
    // return this.http.get(API_URL + 'profile/' + userId, this.httpOptions);
  }

  // Update basic profile information & add a mock for it
  updateProfileBasic(data: {
    fname: string;
    lname: string;
    dob: string;
  }): Observable<any> {
// Mock response 
    return of({
      status: 200,
      message: 'Profile updated successfully',
      data: data,
      meta: {
        requestId: 'redomid-12345',
        timestamp: new Date().toISOString(),
      },
    }).pipe(delay(10)); // simulate network delay


    // real api
    //  return this.http.put(`${API_URL}/api/v1/users/profile/`, data);
  }

  // Update phone information
  updateProfilePhone(data: {
    phone: string;
    countryCode: string;
  }): Observable<any> {

    // mock response
    return of({
      status: 200,
      message: 'Phone updated successfully',
      data: data,
      meta: {
        requestId: 'redomid-12345',
        timestamp: new Date().toISOString(),
      },
    }).pipe(delay(10)); // simulate network delay

    // real api
    // return this.http.put(`${API_URL}/profile/phone`, data);
  }

  /**
   * Upload profile image using FormData.  
   */
  uploadProfileImage(formData: FormData): Observable<any> {
    // mock behaviour
    return of({ status: 200, message: 'Upload successful' }).pipe(delay(10));
    // real API call:
    // return this.http.post(API_URL + '/v1/users/update-pic/', formData);
  }
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

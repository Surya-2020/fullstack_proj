import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonalInfo } from './personal-info';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private getUrl = 'http://localhost:8081/api/v1/getData';
  private postUrl = 'http://localhost:8081/api/v1/addInfo';
  constructor(private http: HttpClient) {}

  getAllPersonalInfo(): Observable<PersonalInfo[]> {
    return this.http.get<PersonalInfo[]>(this.getUrl);
  }

  getAllPersonalInfo2() {
    return this.http.get(this.getUrl);
  }

  addPersonalInfo(personalInfo: PersonalInfo): Observable<string> {
    return this.http.post<string>(this.postUrl, personalInfo, {
      responseType: 'text' as 'json',
    });
  }
}

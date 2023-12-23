import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Assignment } from '../../models/assignment/assignment';
import { Record } from '../../models/record/record';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MongoService {
  private readonly ROOT_URL: string;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:5000';
  }

  public get(uri: string): Observable<Assignment[] | Record[]> {
    return this.http.get<Assignment[] | Record[]>(`${this.ROOT_URL}/${uri}`);
  }
  public post(uri: string, assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(`${this.ROOT_URL}/${uri}`, assignment);
  }
  public delete(uri: string, title: string) {
    const encodedTitle = encodeURIComponent(title);
    return this.http.delete(`${this.ROOT_URL}/${uri}/${encodedTitle}`);
  }
  public patch(uri: string, oldValue: string, newValue: string, property: string) {
    return this.http.patch(`${this.ROOT_URL}/${uri}/${property}/${oldValue}`, {newValue: newValue});
  }
}

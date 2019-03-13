import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesCompleteService {

  constructor(private http: HttpClient) {}

  public getCities(): Observable<any> {
    return this.http.get('../../assets/cities.json').pipe(
      catchError(err => throwError(('Getting cities error!'))),
      map(response => response)
    );
  }
}

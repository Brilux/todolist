import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesCompleteService {

  constructor(private http: HttpClient) {
  }

  getCities(): Observable<any> {
    return this.http.get('../../assets/cities.json').pipe(
      map(response => {
        if (!response) {
          throw new Error('Getting cities error!');
        } else {
          return response;
        }
      }),
    );
  }
}

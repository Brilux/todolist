import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  apiKey = 'e38fa7171a76cd46d84400b96b366241';
  url = 'http://api.openweathermap.org/data/2.5/weather?';

  constructor(private http: HttpClient) {}


  public searchWeatherDataByCity(cityName: string): Observable<any> {
    return this.http.get(`${this.url}q=${cityName}&APPID=${this.apiKey}&units=metric`).pipe(
      map(response => {
        if (!response) {
          throw new Error('Getting weather error!');
        } else {
          return response;
        }
      }),
    );
  }

  public searchWeatherDataByCoord(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.url}lat=${lat}&lon=${lon}&APPID=${this.apiKey}&units=metric`).pipe(
      map(response => {
        if (!response) {
          throw new Error('Getting weather error!');
        } else {
          return response;
        }
      }),
    );
  }

}


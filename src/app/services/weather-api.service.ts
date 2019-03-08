import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class WeatherApiService {

  apiKey = 'e38fa7171a76cd46d84400b96b366241';
  url = 'http://api.openweathermap.org/data/2.5/weather?';

  constructor(private http: HttpClient) {}


  public searchWeatherDataByCity(cityName: string): Observable<object> {
    return this.http.get(`${this.url}q=${cityName}&APPID=${this.apiKey}&units=metric`).pipe(
      catchError(err => throwError(('Getting weather error!'))),
      map(response => response)
    );
  }

  public searchWeatherDataByCoord(lat: number, lon: number): Observable<object> {
    return this.http.get(`${this.url}lat=${lat}&lon=${lon}&APPID=${this.apiKey}&units=metric`).pipe(
      catchError(err => throwError(('Getting weather error!'))),
      map(response => response)
    );
  }
}


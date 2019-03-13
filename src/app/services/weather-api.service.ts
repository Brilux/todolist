import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { WeatherModel } from '../models/weather.model';


@Injectable({
  providedIn: 'root'
})

export class WeatherApiService {

  private apiKey = 'e38fa7171a76cd46d84400b96b366241';
  private url = 'http://api.openweathermap.org/data/2.5/weather?';

  constructor(private http: HttpClient) {}


  public searchWeatherDataByCity(cityName: string): Observable<WeatherModel> {
    return this.http.get(`${this.url}q=${cityName}&APPID=${this.apiKey}&units=metric`).pipe(
      map(response => new WeatherModel(response)),
      catchError(err => throwError(('Getting weather error!')))
    );
  }

  public searchWeatherDataByCoord(lat: number, lon: number): Observable<WeatherModel> {
    return this.http.get(`${this.url}lat=${lat}&lon=${lon}&APPID=${this.apiKey}&units=metric`).pipe(
      map(response => new WeatherModel(response)),
      catchError(err => throwError(('Getting weather error!')))
    );
  }
}


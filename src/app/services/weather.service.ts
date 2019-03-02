import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { WeatherModel } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherInfo = new BehaviorSubject<WeatherModel>(new WeatherModel());

  changeWeatherInfo(project: WeatherModel) {
    this.weatherInfo.next(project);
  }

  getWeatherInfoSubscription(): Observable<WeatherModel> {
    return this.weatherInfo.asObservable();
  }
}

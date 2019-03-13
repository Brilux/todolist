import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { WeatherModel } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherInfo = new BehaviorSubject<WeatherModel>(new WeatherModel());

  public changeWeatherInfo(project: WeatherModel) {
    this.weatherInfo.next(project);
  }

  public getWeatherInfoSubscription(): Observable<WeatherModel> {
    return this.weatherInfo.asObservable();
  }
}

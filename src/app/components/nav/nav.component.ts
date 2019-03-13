import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../../services/weather-api.service';
import { WeatherService } from '../../services/weather.service';
import { WeatherModel } from '../../models/weather.model';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public city: string;
  public temp: string;
  public toggle: boolean;
  private defaultCity = 'Cherkasy';

  constructor(private weatherApiService: WeatherApiService,
              private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather();
    this.weatherService.getWeatherInfoSubscription().subscribe(weatherInfo => {
      this.city = weatherInfo.city;
      this.temp = weatherInfo.getTemperature;
    });
  }

  private newWeatherInfo(newWeather) {
    this.weatherService.changeWeatherInfo(newWeather);
  }

  private updateWeatherInfo(response) {
    this.newWeatherInfo(response);
    localStorage.setItem('weather', JSON.stringify(response));
  }

  public takeWeatherCity(city: string): void {
    this.weatherApiService.searchWeatherDataByCity(city).subscribe(response => this.updateWeatherInfo(response));
  }

  private takeWeatherCoord(lat: number, lon: number): void {
    this.weatherApiService.searchWeatherDataByCoord(lat, lon).subscribe(response => this.updateWeatherInfo(response));
  }

  private error(err): void {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    this.takeWeatherCity(this.defaultCity);
  }

  private getWeather() {
    if (localStorage.getItem('weather')) {
      const localResponse = new WeatherModel(JSON.parse(localStorage.getItem('weather')));
      this.newWeatherInfo(localResponse);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const coordinates = position.coords;
        this.takeWeatherCoord(coordinates.latitude, coordinates.longitude);
      }, this.error.bind(this));
    }
  }
}

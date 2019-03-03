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

  city: string;
  temp: number;
  toggle: boolean;

  constructor(private weatherApiService: WeatherApiService, private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.getWeather();
    this.weatherService.getWeatherInfoSubscription().subscribe(weatherInfo => {
      this.city = weatherInfo.city;
      this.temp = weatherInfo.temperature;
    });
  }

  private newWeatherInfo(response) {
    const newWeatherInfo = new WeatherModel();
    newWeatherInfo.city = response.name;
    newWeatherInfo.temperature = response.main.temp.toFixed();
    this.weatherService.changeWeatherInfo(newWeatherInfo);
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
    this.takeWeatherCity('Cherkasy');
  }

  private getWeather() {
    if (localStorage.getItem('weather') != null) {
      const localResponse = JSON.parse(localStorage.getItem('weather'));
      this.newWeatherInfo(localResponse);
    } else {
      navigator.geolocation.getCurrentPosition((pos) => {
        const crd = pos.coords;
        this.takeWeatherCoord(crd.latitude, crd.longitude);
      }, this.error.bind(this));
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private weatherService: WeatherService) {
  }

  city: string;
  temp: number;
  toggle: boolean;

  public takeWeatherCity(city: string): void {
    this.weatherService.searchWeatherDataByCity(city).subscribe(response => {
      this.city = response.name;
      this.temp = response.main.temp.toFixed();
      localStorage.setItem('weather', JSON.stringify(response));
    });
  }

  private takeWeatherCoord(lat: number, lon: number): void {
    this.weatherService.searchWeatherDataByCoord(lat, lon).subscribe(response => {
      this.city = response.name;
      this.temp = response.main.temp.toFixed();
      localStorage.setItem('weather', JSON.stringify(response));
    });
  }

  private error(err): void {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    this.takeWeatherCity('Cherkasy');
  }

  public getWeather() {
    if (localStorage.getItem('weather') != null) {
      const localResponse = JSON.parse(localStorage.getItem('weather'));
      this.city = localResponse.name;
      this.temp = localResponse.main.temp.toFixed();
    } else {
      navigator.geolocation.getCurrentPosition((pos) => {
        const crd = pos.coords;
        this.takeWeatherCoord(crd.latitude, crd.longitude);
      }, this.error.bind(this));
    }
  }

  public updateWeather() {
    const localResponse = JSON.parse(localStorage.getItem('weather'));
    this.city = localResponse.name;
    this.temp = localResponse.main.temp.toFixed();
  }

  ngOnInit() {
    this.getWeather();
  }
}

import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {


  constructor(private weatherService: WeatherService) {
  }

  city: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  icon: string;
  weatherMain: string;
  weatherDesc: string;
  cityToggle: boolean;

  public cityForm: FormGroup = new FormGroup({
    city: new FormControl(null, Validators.required),
  });

  private saveCity(): void {
    this.city = this.cityForm.value.city;
    this.takeWeatherCity(this.city);
  }

  public takeWeatherCity(city: string): void {
    this.weatherService.searchWeatherDataByCity(city).subscribe(response => {
      this.city = response.name;
      this.temp = response.main.temp.toFixed();
      this.tempMin = Math.floor(response.main.temp_min);
      this.tempMax = Math.ceil(response.main.temp_max);
      this.weatherMain = response.weather[0].main;
      this.weatherDesc = response.weather[0].description;
      this.icon = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`;
      localStorage.setItem('weather', JSON.stringify(response));
    });
  }

  ngOnInit() {
    if (localStorage.getItem('weather') != null) {
      const localResponse = JSON.parse(localStorage.getItem('weather'));
      this.city = localResponse.name;
      this.temp = localResponse.main.temp.toFixed();
      this.tempMin = Math.floor(localResponse.main.temp_min);
      this.tempMax = Math.ceil(localResponse.main.temp_max);
      this.weatherMain = localResponse.weather[0].main;
      this.weatherDesc = localResponse.weather[0].description;
      this.icon = `http://openweathermap.org/img/w/${localResponse.weather[0].icon}.png`;
    } else {
      this.takeWeatherCity('Cherkasy');
    }
  }
}

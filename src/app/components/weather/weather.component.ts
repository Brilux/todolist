import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../../services/weather-api.service';
import { FormControl } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { WeatherModel } from '../../models/weather.model';
import { Observable } from 'rxjs';
import { CityModel } from '../../models/city.model';
import { filter, map, startWith } from 'rxjs/operators';
import { CitiesCompleteService } from '../../services/cities-complete.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  city: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  icon: string;
  weatherMain: string;
  weatherDesc: string;
  cityToggle: boolean;

  cityInput = new FormControl('', this.emptyValidator);

  filteredCities: Observable<CityModel[]>;

  cities: CityModel[];

  constructor(private weatherApiService: WeatherApiService,
              private weatherService: WeatherService,
              private citiesCompleteService: CitiesCompleteService) {
    this.filteredCities = this.cityInput.valueChanges
      .pipe(
        startWith(''),
        map(city => city ? this.cityFilter(city) : null),
      );
  }

  ngOnInit() {
    this.citiesCompleteService.getCities().subscribe(city => this.cities = city);
    if (localStorage.getItem('weather') != null) {
      const localResponse = JSON.parse(localStorage.getItem('weather'));
      this.createWidget(localResponse);
    }
  }

  private emptyValidator(control: FormControl) {
    if ((control.value || '').trim().length === 0) {
      return {
        'empty': true
      };
    } else if (control.value.length <= 2) {
      return {
        'short': true
      };
    }
  }

  private cityFilter(city: string): CityModel[] {
    const filterCity = city.toLowerCase();
    return this.cities.filter(filteredCities => filteredCities.name.toLowerCase().indexOf(filterCity) === 0);
  }

  public saveCity(): void {
    this.city = this.cityInput.value;
    this.takeWeatherCity(this.city);
    // this.cityInput.reset();
  }

  private takeWeatherCity(city: string): void {
    this.weatherApiService.searchWeatherDataByCity(city).subscribe(response => {
      this.createWidget(response);
      localStorage.setItem('weather', JSON.stringify(response));
    });
  }

  private newWeatherInfo(response) {
    const newWeatherInfo = new WeatherModel();
    newWeatherInfo.city = response.name;
    newWeatherInfo.temperature = response.main.temp.toFixed();
    this.weatherService.changeWeatherInfo(newWeatherInfo);
  }

  private createWidget(response) {
    this.city = response.name;
    this.temp = response.main.temp.toFixed();
    this.tempMin = Math.floor(response.main.temp_min);
    this.tempMax = Math.ceil(response.main.temp_max);
    this.weatherMain = response.weather[0].main;
    this.weatherDesc = response.weather[0].description;
    this.icon = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`;
    this.newWeatherInfo(response);
  }
}

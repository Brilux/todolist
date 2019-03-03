import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../../services/weather-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { WeatherModel } from '../../models/weather.model';
import { Observable } from 'rxjs';
import { CityModel } from '../../models/city.model';
import { map, startWith } from 'rxjs/operators';
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

  cityForm: FormGroup = new FormGroup({
    city: new FormControl(null, Validators.required),
  });

  filteredCities: Observable<CityModel[]>;

  cities: CityModel[];

  constructor(private weatherApiService: WeatherApiService, private weatherService: WeatherService,
              private citiesCompleteService: CitiesCompleteService) {
    this.filteredCities = this.cityForm.get('city').valueChanges
      .pipe(
        startWith(''),
        map(city => city ? this.cityFilter(city) : this.cities.slice())
      );
  }

  ngOnInit() {
    this.citiesCompleteService.getCities().subscribe(city => this.cities = city);
    if (localStorage.getItem('weather') != null) {
      const localResponse = JSON.parse(localStorage.getItem('weather'));
      this.createWidget(localResponse);
    } else {
      this.takeWeatherCity('Cherkasy');
    }
  }

  private cityFilter(city: string): CityModel[] {
    const filterCity = city.toLowerCase();
    return this.cities.filter(filteredCities => filteredCities.name.toLowerCase().indexOf(filterCity) === 0);
  }

  public saveCity(): void {
    this.city = this.cityForm.value.city;
    this.takeWeatherCity(this.city);
    this.cityForm.reset();
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

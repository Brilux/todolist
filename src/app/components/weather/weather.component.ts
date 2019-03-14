import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../../services/weather-api.service';
import { FormControl } from '@angular/forms';
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

  public weather: WeatherModel = new WeatherModel();

  public cityInput = new FormControl('', this.emptyValidator);

  public filteredCities: Observable<CityModel[]>;

  public cities: CityModel[];

  constructor(private weatherApiService: WeatherApiService,
              private weatherService: WeatherService,
              private citiesCompleteService: CitiesCompleteService) {
    this.filteredCities = this.cityInput.valueChanges
      .pipe(
        startWith(''),
        map(city => city ? this.cityFilter(city) : null)
      );
  }

  ngOnInit() {
    this.citiesCompleteService.getCities().subscribe(city => this.cities = city);
    if (localStorage.getItem('weather')) {
      const localResponse = new WeatherModel(JSON.parse(localStorage.getItem('weather')));
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
    return this.cities.filter(filteredCities => filteredCities.name.toLowerCase().indexOf(filterCity) === 0).slice(0, 50);
  }

  public saveCity(): void {
    this.weather.city = this.cityInput.value;
    this.takeWeatherCity(this.weather.city);
    this.cityInput.reset();
  }

  private takeWeatherCity(city: string): void {
    this.weatherApiService.searchWeatherDataByCity(city).subscribe(newWeather => {
      this.createWidget(newWeather);
      localStorage.setItem('weather', JSON.stringify(newWeather));
    });
  }

  private createWidget(newWeather: WeatherModel) {
    this.weather = newWeather;
    this.newWeatherInfo(newWeather);
  }

  private newWeatherInfo(newWeather: WeatherModel) {
    const newWeatherInfo = new WeatherModel(newWeather);
    this.weatherService.changeWeatherInfo(newWeatherInfo);
  }
}

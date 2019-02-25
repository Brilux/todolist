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
  temp: string;
  cityToggle: boolean;
  coordToggle: boolean;
  lat: number;
  lon: number;

  public cityForm: FormGroup = new FormGroup({
    city: new FormControl(null, Validators.required),
  });

  public coordForm: FormGroup = new FormGroup({
    lat: new FormControl(null, Validators.required),
    lon: new FormControl(null, Validators.required),
  });


  public toggleCity(): void {
    if (this.coordToggle === true) {
      this.coordToggle = !this.coordToggle;
      this.cityToggle = !this.cityToggle;
    } else {
      this.cityToggle = !this.cityToggle;
    }
  }

  public toggleLocation(): void {
    if (this.cityToggle === true) {
      this.cityToggle = !this.cityToggle;
      this.coordToggle = !this.coordToggle;
    } else {
      this.coordToggle = !this.coordToggle;
    }
  }

  private saveCity(): void {
    this.city = this.cityForm.value.city;
    this.takeWeatherCity(this.city);
  }

  private saveCoord(): void {
    this.lat = this.coordForm.value.lat;
    this.lon = this.coordForm.value.lon;
    this.takeWeatherCoord(this.lat, this.lon);
  }

  private takeWeatherCity(city: string): void {
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
      localStorage.setItem('coord', JSON.stringify([lat, lon]));
    });
  }

  private error(err): void {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      localStorage.setItem('coord', JSON.stringify([crd.latitude, crd.longitude]));
    }, this.error.bind(this));
    if (localStorage.getItem('weather') != null || localStorage.getItem('coord') != null) {
      const localResponse = JSON.parse(localStorage.getItem('weather'));
      this.city = localResponse.name;
      this.temp = localResponse.main.temp.toFixed();
    } else {
      this.takeWeatherCity('Cherkasy');
    }
  }
}

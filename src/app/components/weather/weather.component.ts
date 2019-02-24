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


  toggleCity() {
    if (this.coordToggle === true) {
      this.coordToggle = !this.coordToggle;
      this.cityToggle = !this.cityToggle;
    } else {
      this.cityToggle = !this.cityToggle;
    }
  }

  toggleLocation() {
    if (this.cityToggle === true) {
      this.cityToggle = !this.cityToggle;
      this.coordToggle = !this.coordToggle;
    } else {
      this.coordToggle = !this.coordToggle;
    }
  }

  private saveCity() {
    this.city = this.cityForm.value.city;
    this.takeWeatherCity(this.city);
  }

  private saveCoord() {
    this.lat = this.coordForm.value.lat;
    this.lon = this.coordForm.value.lon;
    this.takeWeatherCoord(this.lat, this.lon);
  }

  public takeWeatherCity(city) {
    this.weatherService.searchWeatherDataByCity(city).subscribe(response => {
      this.city = response.name;
      this.temp = response.main.temp.toFixed();
      localStorage.setItem('weather', JSON.stringify(response));
      console.log(response);
    });
  }

  public takeWeatherCoord(lat, lon) {
    this.weatherService.searchWeatherDataByCoord(lat, lon).subscribe(response => {
      this.city = response.name;
      this.temp = response.main.temp.toFixed();
      localStorage.setItem('weather', JSON.stringify(response));
      localStorage.setItem('coord', JSON.stringify([lat, lon]));
      console.log(response);
    });
  }

  private error(err) {
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

import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
  locationToggle: boolean;

  public cityForm: FormGroup = new FormGroup({
    task: new FormControl(null, Validators.required),
  });

  public coordForm: FormGroup = new FormGroup({
    lat: new FormControl(null, Validators.required),
    lon: new FormControl(null, Validators.required),
  });

  toggleCity() {
    if (this.locationToggle === true) {
      this.locationToggle = !this.locationToggle;
      this.cityToggle = !this.cityToggle;
    } else {
      this.cityToggle = !this.cityToggle;
    }
  }

  toggleLocation() {
    if (this.cityToggle === true) {
      this.cityToggle = !this.cityToggle;
      this.locationToggle = !this.locationToggle;
    } else {
      this.locationToggle = !this.locationToggle;
    }
  }

  private save() {
    let a = {
      city: this.city
    };

  }

  public takeWeather() {
    this.weatherService.searchWeatherData('Cherkasy').subscribe(response => {
      this.city = response.name;
      this.temp = response.main.temp.toFixed();
      localStorage.setItem('weather', JSON.stringify(response));
      console.log(response);
    });
  }

  public success(pos) {
    const crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  public error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(this.success, this.error);
    if (localStorage.getItem('weather') != null) {
      const localResponse = JSON.parse(localStorage.getItem('weather'));
      this.city = localResponse.name;
      this.temp = localResponse.main.temp.toFixed();
    } else {
      this.takeWeather();
    }
  }

}

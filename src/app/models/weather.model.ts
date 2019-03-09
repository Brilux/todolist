export class WeatherModel {
  city: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  icon: string;
  weatherMain: string;
  weatherDesc: string;

  constructor(data?: WeatherModel | any) {
    if (data) {
      this.city = data.city || data.name;
      this.temperature = data.temperature || data.main.temp;
      this.tempMin = data.tempMin || data.main.temp_min;
      this.tempMax = data.tempMax || data.main.temp_max;
      this.icon = data.icon || data.weather[0].icon;
      this.weatherMain = data.weatherMain || data.weather[0].main;
      this.weatherDesc = data.weatherDesc || data.weather[0].description;
    }
  }

  get getTemperature(): string {
    return this.temperature.toFixed();
  }

  get getTempMin(): number {
    return Math.floor(this.tempMin);
  }

  get getTempMax(): number {
    return Math.ceil(this.tempMax);
  }

  get getIcon(): string {
    return `http://openweathermap.org/img/w/${this.icon}.png`;
  }
}

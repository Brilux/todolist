export class WeatherModel {
  city: string;
  temperature: number;

  constructor(data?: WeatherModel) {
    if (data) {
      this.city = data.city;
      this.temperature = data.temperature;
    }
  }
}

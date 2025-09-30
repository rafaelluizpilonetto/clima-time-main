import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpenWeatherService } from '../service/open-weather.service';
import { weatherResponse } from '../models/weather-responde.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.scss']
})
export class ClimaComponent  {

  navegaodr = inject(Router);
  openWeatherService = inject(OpenWeatherService);
  dadosClima = toSignal<weatherResponse | null>(this.openWeatherService.buscarInfoClimaCidadeAtual());
  constructor() { }

  navegarParaTelaTelaPesquisa() {
    this.navegaodr.navigate(['pesquisa']);
  }
}

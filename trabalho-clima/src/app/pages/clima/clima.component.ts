import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpenWeatherService } from '../service/open-weather.service';
import { weatherResponse } from '../models/weather-responde.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { catchError, of } from 'rxjs';
import { DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.scss'],
  standalone: true,
  imports: [DecimalPipe, TitleCasePipe] 
})
export class ClimaComponent  {

  navegaodr = inject(Router);
  openWeatherService = inject(OpenWeatherService);
  dadosClima = toSignal<weatherResponse | null>(
    this.openWeatherService.buscarInfoClimaCidadeAtual()
  .pipe(
    catchError(err => {
      console.log('Erro ao buscar dados do clima:', err);
      return of(null);
    })
  ),
  { initialValue: null }

);




  constructor() { }

  navegarParaTelaTelaPesquisa() {
    this.navegaodr.navigate(['pesquisa']);
  }
}

import { ApiServiceProvider } from './../api-service/api-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agendamento } from '../../modelos/agendamento';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgentamentosServiceProvider {

  private _uriApi: string;

  constructor(private _http: HttpClient, private _api : ApiServiceProvider) {
    this._uriApi = this._api.URL_API;
  }

  agenda(agendamento: Agendamento) {
    return this._http
      .post(this._uriApi + "/agendamento/agenda", agendamento)
      .do(() => agendamento.enviado = true)
      .catch((erro) => Observable.of(new Error("Erro ao realizar agendamento.")));
  }

}
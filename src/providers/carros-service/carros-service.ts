import { ApiServiceProvider } from './../api-service/api-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Carro } from '../../modelos/carro';

@Injectable()
export class CarrosServiceProvider {

  private _uriApi: string;

  constructor(
    private _http: HttpClient,
    private _api: ApiServiceProvider) {

    this._uriApi = this._api.URL_API;
  }

  public lista() {
    return this._http.get<Carro[]>(`${this._uriApi}/carro/listaTodos`);
  }
}
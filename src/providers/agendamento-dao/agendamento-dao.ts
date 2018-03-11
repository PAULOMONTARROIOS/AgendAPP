import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Agendamento } from '../../modelos/agendamento';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) {
  }

  private geraChave(agendamento: Agendamento): string {
    return agendamento.emailCliente + agendamento.data.substr(0, 10);
  }

  salva(agendamento: Agendamento) {
    let chave = this.geraChave(agendamento);
    let promisse = this._storage.set(chave, agendamento);
    return Observable.fromPromise(promisse);
  }

  ehDuplicado(agendamento: Agendamento) {
    let chave = this.geraChave(agendamento);
    let promise = this._storage
      .get(chave)
      .then((dado) => {
        dado ? true : false;
      });
    return Observable.fromPromise(promise);
  }

  listaTodos() : Observable<Array<Agendamento>>{
    let agendamentos : Agendamento[] = [];

    let promise = this._storage.forEach((agendamento : Agendamento)=>{
      agendamentos.push(agendamento);
    }).then(()=> agendamentos);

    return Observable.fromPromise(promise);

  }

}

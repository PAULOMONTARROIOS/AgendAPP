import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Agendamento } from '../../modelos/agendamento';
import { AgentamentosServiceProvider } from '../../providers/agentamentos-service/agentamentos-service';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {

  agendamentos: Agendamento[];
  private _alerta;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _agendamentosService: AgentamentosServiceProvider,
    private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this._agendamentoDao.listaTodos()
      .subscribe((agendamentos: Agendamento[]) => {

        this.agendamentos = agendamentos;
        console.log(this.agendamentos);
      });
  }

  reenvia(agendamento: Agendamento) {
    
    this._alerta = this._alertCtrl.create({
      title: "Aviso",
      buttons: [
        {
          text: "Ok"
        }
      ]
    });

    let message = '';
    
    this._agendamentosService.agenda(agendamento)
      .mergeMap(
      (valor) => {
        
        let observabel = this._agendamentoDao.salva(agendamento)
        if (valor instanceof Error) {
          throw valor;
        }
        return observabel;
      }
      )
      .finally(() => {
        this._alerta.setSubTitle(message);
        this._alerta.present();
      })
      .subscribe(
      () => {
        message = "Reenvio concluído com sucesso !";
      },
      (erro: Error) => {
        message = erro.message;
      }
      )
  }

}

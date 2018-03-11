import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { Carro } from './../../modelos/carro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgentamentosServiceProvider } from '../../providers/agentamentos-service/agentamentos-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Alert } from 'ionic-angular/components/alert/alert';
import { HomePage } from '../home/home';
import { Agendamento } from '../../modelos/agendamento';

import { Vibration } from '@ionic-native/vibration';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  providers: [
    AgentamentosServiceProvider,
    AgendamentoDaoProvider
  ]
})
export class CadastroPage {

  public carroSelecionado: Carro;
  public precoTotal: number;

  public nome: string;
  public endereco: string;
  public email: string;
  public data: string = new Date().toISOString();

  private _alerta: Alert;

  constructor(public navCtrl: NavController,
    private _alertCtrl: AlertController,
    public navParams: NavParams,
    private _agendamentosService: AgentamentosServiceProvider,
    private _agendamentoDao : AgendamentoDaoProvider,
    private _vibration : Vibration,
    private _datePicker : DatePicker
  ) {
    this.carroSelecionado = this.navParams.get("carroSelecionado");
    this.precoTotal = this.navParams.get("precoTotal");
  }

  selecionaData(){
    this._datePicker.show({
      date : new Date(),
      mode: 'date'
    }).then(data => this.data = data.toISOString());
  }

  agenda() {

    if (!this.nome || !this.email || !this.endereco) {

      this._vibration.vibrate(1000);

      this._alertCtrl.create({
        title: "Algo está inconsistênte.",
        subTitle: "Verifique o preenchimento dos dados.",
        buttons: [{
          text: "Ok"
        }]
      }).present();

      return;
    }

    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carroSelecionado.nome,
      precoTotal: this.precoTotal,
      data: this.data,
      confirmado: false,
      enviado: false
    };

    this._alerta = this._alertCtrl.create({
      title: "Aviso",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });

    let message = '';

    this._agendamentoDao.ehDuplicado(agendamento).mergeMap((duplicado)=>{
      if(duplicado){
        throw new Error("Agendamento já existe !");
      }
      return this._agendamentosService.agenda(agendamento)
    }).mergeMap(
        (valor)=> {
          
          let observabel = this._agendamentoDao.salva(agendamento)
          if(valor instanceof Error){
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
        message = "Agendamento concluído com sucesso !";
      },
      (erro : Error) => {
        message = erro.message;
      }
      )
  }




}
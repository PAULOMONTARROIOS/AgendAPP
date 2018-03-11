import { EscolhaPage } from './../escolha/escolha';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Carro } from '../../modelos/carro';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavLifeCycles } from '../../utils/ionic/nav/nav-lifecycles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CarrosServiceProvider]
})
export class HomePage implements NavLifeCycles {

  public carros: Carro[];

  constructor(
    public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _carrosService: CarrosServiceProvider
  ) {
  }

  ionViewDidLoad() {

    let loading = this._loadingCtrl.create({
      content: "Aguarde..."
    });

    loading.present();

    this._carrosService.lista()
      .subscribe(
        (resposta: Array<Carro>) => {
          this.carros = resposta;
          loading.dismiss();
        },
        (erro: HttpErrorResponse) => {
          loading.dismiss();
          this._alertCtrl.create({
            title: "Erro na API",
            subTitle: "Não consegui conectar à API",
            buttons: [{ text: "Ok" }]
          }).present();
        });
  }

  selecionaCarro(carro) {
    this.navCtrl.push(EscolhaPage.name, {
      carroSelecionado: carro
    });
  }

}

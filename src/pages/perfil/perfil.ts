import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular/util/util';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider,
    private _camera : Camera
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  get usuarioLogado(){
    return this._usuariosService.obtemUsuarioLogado();
  }

  get avatar(){
    return this._usuariosService.obtemAvatar();
  }

  tiraFoto(){
    this._camera.getPicture({
      destinationType : this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum : true,
      correctOrientation : true
    }).then(uri =>{ 
      uri = normalizeURL(uri);
      this._usuariosService.salvaAvatar(uri);

    }).catch(
      err => console.log(err)
    );
  }

}

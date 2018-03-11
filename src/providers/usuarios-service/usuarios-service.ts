import { ApiServiceProvider } from './../api-service/api-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Usuario } from '../../modelos/usuario';

const CHAVE = "Avatar-usuario";

@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado: Usuario;
  private _uriAPi : string;

  constructor(private _http: HttpClient, private _api: ApiServiceProvider) {
    this._uriAPi = _api.URL_API;
  }

  efetuaLogin(email, senha) {
    return this._http.post<Usuario>(`${this._uriAPi}/login`, { email, senha })
      .do((usuario: Usuario) => { this._usuarioLogado = usuario });
  }

  public obtemUsuarioLogado() {
    return this._usuarioLogado;
  }

  salvaAvatar(avatar){
    localStorage.setItem(CHAVE,avatar);
  }

  obtemAvatar(){
    return localStorage.getItem(CHAVE) ? localStorage.getItem(CHAVE) : "assets/img/avatar-profile.jpg" ;
  }
}

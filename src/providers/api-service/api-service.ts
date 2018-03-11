
import { Injectable } from '@angular/core';

@Injectable()
export class ApiServiceProvider {

  private _url_Api : string = "http://192.168.15.5:8080/api";
  
  get URL_API(){
    return this._url_Api;
  }

}

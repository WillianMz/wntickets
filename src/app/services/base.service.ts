import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  protected getHeaderJson(){
    return {
      headers: new HttpHeaders({'content-Type':'application/json'})
    };
  }

  protected extractData(response: any){
    return response || {};
  }

  protected serviceError(response: Response | any){
    console.log(response);
    return throwError(response);
  }

}

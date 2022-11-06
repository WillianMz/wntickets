import { LoaderService } from './../services/loader.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor{

    constructor(private spinner: NgxSpinnerService){}

    /* 
        Esse interceptor mudará o valor do Subject para true quando uma solicitação for iniciada (para mostrar o carregador) 
        e alterará o valor do Subject para false (para ocultar o carregador) quando a solicitação for concluída.
        O legal do finalize é que ele chama nossa função de retorno de chamada nas respostas de sucesso e erro.
        Dessa forma, podemos ter certeza de que nosso aplicativo não terminará com um carregador giratório ininterrupto.
    */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
   
        return next.handle(request).pipe(
              finalize(() => this.spinner.hide()),
        );
     }
}
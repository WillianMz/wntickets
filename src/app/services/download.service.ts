import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const ENDERECO_API: string = `${environment.api}/files`;

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(
    private http: HttpClient
  ) { }

  download(arquivo: string){
    let headers = new HttpHeaders();
    headers = headers.set('Accept','application/pdf');
    return this.http.get(`${arquivo}`, { headers: headers, responseType:'blob'});
  }

  handleFile(res: any, fileName: string) {
/*     const file = new Blob([res, {
      type: res.type
    }]);

    const blob = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName; */
    let url = window.URL.createObjectURL(res);
    let a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}

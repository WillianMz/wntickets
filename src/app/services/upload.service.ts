import { Observable } from 'rxjs';
import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const ENDERECO_API: string = `${environment.api}/upload`;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public imagem(file: File): Observable<any> {
    /* console.log(image);
    return this.http.post(`${ENDERECO_API}/image`, image); */
    /* const formData = new FormData();
    formData.append('file', image, image.name); */

    console.log('aqui');
    const formData: FormData = new FormData();
    console.log(file.name);
    console.log(file);
    formData.append('image', file);

    return this.http.post(`${ENDERECO_API}/image`, file);
  }

  public file(file: FormData) {
    return this.http.post(`${ENDERECO_API}/image`, file);
  }
}

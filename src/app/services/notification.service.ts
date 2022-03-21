import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr: ToastrService
  ) { }


  public showSuccess(message: string, title?: string){
    this.toastr.success(message, title, {
      closeButton: true,
      progressBar: true
    });
  }

  public showError(message: string, title?: string){
    this.toastr.error(message, title, {
      closeButton: true,
      progressBar: true
    });
  }

  public showInfo(message: string, title?: string){
    this.toastr.info(message, title, {
      closeButton: true,
      progressBar: true
    });
  }

  public showWarning(message: string, title?: string){
    this.toastr.warning(message, title, {
      closeButton: true,
      progressBar: true
    });
  }

}

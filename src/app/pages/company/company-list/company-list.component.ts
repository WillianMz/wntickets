import { Icompany } from './../../../models/icompany';
import { CompanyService } from './../../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Icompany[];
  success: string;
  message: string;
  pag : number = 1 ;
  contador : number = 7;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  newCompany(){
    this.router.navigate(['/companies/new']);
  }

  edit(idCompany: string) {
    this.router.navigate([`/companies/${idCompany}/edit`]);
  }

  ativar(company: Icompany){
    if(confirm('Ativar empresa?') == true){
      this.activate(company);
    }
  }

  delete(company: Icompany){
    if(confirm('Desativar empresa?') == true){
      this.activate(company);
    }
  }

  listAll() {
    /* this.companyService.getAll().subscribe(
      (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        this.companies = response['dados'];
      }
    ) */

    this.companyService.getAll().subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        this.companies = response['dados'];
      },
      error: (error) => {
        this.showError(error, 'Ocorreu um erro');
      }
    })

  }

  private activate(company: Icompany){
    const id = company.id ;

    if(id){
      this.companyService.activate(id).subscribe(
        (response) => {
          this.success = response['sucesso'];
          this.message = response['mensagem'];
          console.log(this.message);
          this.showSuccess(this.message);
          this.listAll();
        }
      );
    }
  }

  private showSuccess(message: string, title?: string ) {
    this.toastr.success(message, title, {
      closeButton: true,
      timeOut: 3000,
      progressBar: true
    });
  }

  private showError(message: string, title?: string ) {
    this.toastr.error(message, title, {
      closeButton: true,
      timeOut: 3000,
      progressBar: true
    });
  }

}

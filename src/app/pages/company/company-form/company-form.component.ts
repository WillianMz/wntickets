import { CompanyService } from './../../../services/company.service';
import { Icompany } from './../../../models/icompany';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  titlePage: string;
  companyId: number;
  company: Icompany;
  companyForm: FormGroup;
  success: string;
  message: string;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {
    let company = {
      nome: '',
      fantasia: '',
      cnpj: '',
      email: '',
      ativa: true,
      nickname: ''
    };
    this.startForm(company);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.companyId = parseInt(id);
      this.loadCompany(this.companyId);
      this.titlePage = 'Editar empresa';
    }
    else{
      this.titlePage = 'Nova empresa';
    }
  }

  return(){
    this.router.navigate(['/companies']);
  }

  save() {
    const newCompany: Icompany = {...this.companyForm.value, id: this.companyId }
    console.log(newCompany);

    this.companyService.save(newCompany).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        console.log(this.success);
        console.log(this.message);
        this.return();
      },
      error: (error) => {
        console.log(error);
        alert(error);
      }
    }
    )
  }

  startForm(company: Icompany){
    this.companyForm = new FormGroup({
      razaoSocial: new FormControl(company.razaoSocial, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)
      ]),
      nomeFantasia: new FormControl(company.nomeFantasia, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)
      ]),
      cnpj: new FormControl(company.cnpj,[
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14)
      ]),
      email: new FormControl(company.email, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150)
      ]),
      ativa: new FormControl(company.ativa, [
        Validators.required
      ]),
      nickname: new FormControl(company.nickname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ])
    });
  }

  private loadCompany(idCompany: number) {
    this.companyService.getById(idCompany).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        this.company = response['dados'];
        this.startForm(this.company);
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  get razaoSocial() {
    return this.companyForm.get('razaoSocial');
  }

  get nomeFantasia() {
    return this.companyForm.get('nomeFantasia');
  }

  get email() {
    return this.companyForm.get('email');
  }

  get cnpj(){
    return this.companyForm.get('cnpj');
  }

  get nickname() {
    return this.companyForm.get('nickname');
  }

}

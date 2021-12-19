import { Icompany } from './../../../models/icompany';
import { Router } from '@angular/router';
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
  companyForm: FormGroup;

  constructor(
    private router: Router
  ) {
    let company = {
      nome: '',
      fantasia: '',
      cnpj: '',
      email: '',
      ativa: true
    };
    this.startForm(company);
  }

  ngOnInit(): void {
    this.titlePage = 'Nova empresa';
  }

  return(){
    this.router.navigate(['/companies']);
  }

  save() {
    const newCompany: Icompany = {...this.companyForm.value, id: this.companyId }
    console.log(newCompany);
  }

  startForm(company: Icompany){
    this.companyForm = new FormGroup({
      razaoSocial: new FormControl(company.nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)
      ]),
      nomeFantasia: new FormControl(company.fantasia, [
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
      ])
    });
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

}

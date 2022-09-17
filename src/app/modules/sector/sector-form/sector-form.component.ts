import { SetorModel } from './../../../models/sector/setorModel';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErroServidor } from 'src/app/models/erroServidor';
import { SectorService } from 'src/app/services/sector.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.css']
})
export class SectorFormComponent implements OnInit {

  @Input() sectorID: number;
  @Input() navbarVisible: boolean;
  @Input() titleFormVisible: boolean;

  //titleForm: string = 'SetorForm';
  tituloPagina: string = 'Detalhes do laboratório';
  sector: SetorModel;
  sectorForm: FormGroup;
  message: string;
  success: boolean;
  erros: ErroServidor[];
  setor: SetorModel;
  boolTitulo: boolean = true;
  boolAviso: boolean = false;

  constructor(
    private sectorService: SectorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {

    //PARA INICIAR O FORMULARIO
    const sector = {nome:'', ativo: true

    }

    this.start(sector);
    
    }

  ngOnInit(): void {
    this.configurarForm();
  }

  //#region GETS

    //GETS
    get nome() {
      return this.sectorForm.get('nome');
    }

    get ativo() {
      return this.sectorForm.get('ativo');
    }

    //#region

  //CONFIGURA A APARENCIA DA PAGINA A SER EXIBIDA AO USUARIO
  private configurarForm(){
    //pega o id na URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.tituloPagina = 'Editando laboratório';
      this.sectorID = parseInt(id);
      this.carregarDados(this.sectorID);
    }
    else{
      this.tituloPagina = 'Novo laboratório'
    }
  }

  //VERIFICAR OS TAMANHOS DOS CAMPOS -> VER NO BANCO DE DADOS
  private start(sector: SetorModel){
    this.sectorForm = new FormGroup({
      nome: new FormControl(sector.nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      ativo: new FormControl(sector.ativo)
    });
  }

  //CARREGA OBJETO E PREENCHE OS DADOS NA TELA
  private carregarDados(id: number){
    this.sectorService.getById(id).subscribe({
      next: (response) => {
        this.setor = response;
        
        if(this.setor != null){
          this.start(this.setor);
        }
        else{
          //MELHORAR AQUI
          this.showError('Não foi possível obter os dados do setor');
        }
      }
    });
  }

  salvar(){
    if(this.sectorID){
      let sector: SetorModel;
      sector = {
        //CRIA UM NOVO OBJETO COM OS CAMPOS NECESSARIOS PARA MANDAR PARA O BACKEND
        id: this.sectorID,
        nome:this.nome?.value,
        ativo: this.ativo?.value
      };

      console.log(sector);
      this.editarSetor(sector);
    }
    else {
      //CRIA UM NOVO OBJETO COM OS CAMPOS NECESSARIOS PARA MANDAR PARA O BACKEND
      let sector: SetorModel;
      sector = {
        nome:this.nome?.value, 
      };
      console.log(sector);
      //SALVAR
      this.novoSetor(sector);
    }
  }
  
  private novoSetor(sector: SetorModel){
    this.sectorService.adicionar(sector).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          this.router.navigate(['/labs']);
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
  }

  private editarSetor(sector: SetorModel){
    this.sectorService.editar(sector).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          this.router.navigate(['/labs']);
          console.log('1');
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
          console.log('2');
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
  }

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

}
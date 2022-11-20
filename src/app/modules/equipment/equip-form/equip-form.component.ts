import { EquipamentoAnexo } from './../../../models/equipment/equipamentoAnexo.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SetorResponse } from './../../../models/sector/setorResponse.model';
import { TipoEquipamentoResponse } from './../../../models/equipment/tipoEquipamentoResponse.model';
import { EquipamentoResponse } from './../../../models/equipment/equipamentoResponse.model';
import { EquipamentoRequest } from './../../../models/equipment/equipamentoRequest.model';
import { SectorService } from './../../../services/sector.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErroServidor } from 'src/app/models/erroServidor';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { DownloadService } from 'src/app/services/download.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-equip-form',
  templateUrl: './equip-form.component.html',
  styleUrls: ['./equip-form.component.css']
})
export class EquipFormComponent implements OnInit {

  tituloPagina: string;
  equipForm: FormGroup;
  sucesso: boolean;
  mensagem: string;  
  equipamento: EquipamentoResponse;
  anexos: EquipamentoAnexo[];
  setores: SetorResponse[];
  tipos: TipoEquipamentoResponse[];
  equipamentoId: number;
  anexoForm: any;
  anexoNome: string;
  urlAnexo: string;
  urlAnexos: EquipamentoAnexo[];
  acaoAtual: string;
  permitirAnexarArquivo: boolean;

  //campos visiveis
  boolTitulo: boolean = true;
  boolAviso: boolean = false;
  boolAtivo: boolean = true;
  boolTipo: boolean = true;
  boolSetor: boolean = true;
  boolCod: boolean = true;
  boolNumSerie: boolean = true;
  boolNome: boolean = true;
  boolDescricao: boolean = true;
  boolFabricante: boolean = true;
  boolMarca: boolean = true;
  boolModelo: boolean = true;
  boolAnoFab: boolean = true;
  boolDtCompra: boolean = true;
  boolValor: boolean = true;
  boolAnotacao: boolean = true;
  boolMotivoBaixa: boolean = true;
  boolFornecedor: boolean = false;
  boolHistorico: boolean = false;

  /* message: string;
  success: boolean */;
  erros: ErroServidor[];

  constructor(
    private equipamentoService: EquipamentoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sectorService: SectorService,
    private notification: NotificationService,
    private downloadService: DownloadService,
    private uploadService: UploadService
  ) {

    //PARA INICIAR O FORMULARIO
    const novoEquipamento = new EquipamentoResponse();
    novoEquipamento.ativo = true;
    novoEquipamento.garantiaContratual = 0;
    novoEquipamento.garantiaExtendida = 0;
    this.validarFormulario(novoEquipamento);
  }


  ngOnInit(): void {
    this.obterSetores(true);
    this.obterTipos(true);
    this.configurarForm();

    const path = this.activatedRoute.snapshot.routeConfig?.path;
    if(path?.includes('edit')){
      this.acaoAtual = 'editar';
    }
  
    if(path?.includes('view')){
      this.acaoAtual = 'visualizar';
    }
    
    if(path?.includes('new')){
      this.acaoAtual = 'novo';
    }

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.equipamentoId = parseInt(id);
      this.carregarEquipamento(this.equipamentoId);
    }
    else{
      this.configurarForm();
    }
  }

//#region GETS

  //GETS
  get ativo() {
    return this.equipForm.get('ativo');
  }

  get codInterno() {
    return this.equipForm.get('codInterno');
  }

  get tipo() {
    return this.equipForm.get('tipo');
  }

  get setor() {
    return this.equipForm.get('setor');
  }

  get nome() {
    return this.equipForm.get('nome');
  }

  get descricao() {
    return this.equipForm.get('descricao');
  }

  get fabricante() {
    return this.equipForm.get('fabricante');
  }

  get marca() {
    return this.equipForm.get('marca');
  }

  get modelo() {
    return this.equipForm.get('modelo');
  }

  get numSerial() {
    return this.equipForm.get('numSerial');
  }

  get anoFabricacao() {
    return this.equipForm.get('anoFabricacao');
  }

  get fornecedor(){
    return this.equipForm.get('fornecedor');
  }

  get notaFiscal(){
    return this.equipForm.get('notaFiscal');
  }

  get chaveNFe(){
    return this.equipForm.get('chaveNFe');
  }
  
  get dtCompra() {
    return this.equipForm.get('dtCompra');
  }

  get dtRecebimento(){
    return this.equipForm.get('dtRecebimento');
  }

  get garantiaExt(){
    return this.equipForm.get('garantiaExtendida');
  }

  get garantiaContratual(){
    return this.equipForm.get('garantiaContratual');
  }

  get validadeGarantia(){
    return this.equipForm.get('validadeGarantia');
  }

  get valorCompra() {
    return this.equipForm.get('valorCompra');
  }

  get anotacoes() {
    return this.equipForm.get('anotacoes');
  }

  get foto(){
    return this.equipForm.get('foto');
  }

  get motivoBaixa() {
    return this.equipForm.get('motivoBaixa');
  }

  //#region

  salvar(){
    const equipamento = new EquipamentoRequest();
    equipamento.id = this.equipamentoId;
    equipamento.ativo = this.ativo?.value;
    equipamento.codInterno = this.codInterno?.value;
    equipamento.tipoId = this.tipo?.value;
    equipamento.setorId = this.setor?.value;
    equipamento.nome = this.nome?.value;
    equipamento.descricao = this.descricao?.value;
    equipamento.fabricante = this.fabricante?.value;
    equipamento.marca = this.marca?.value;
    equipamento.modelo = this.modelo?.value;
    equipamento.numSerial = this.numSerial?.value;
    equipamento.anoFabricacao = this.anoFabricacao?.value;
    equipamento.fornecedorId = this.fornecedor?.value;
    equipamento.notaFiscal = this.notaFiscal?.value;
    equipamento.chaveNFe = this.chaveNFe?.value;
    equipamento.dtCompra = this.dtCompra?.value;
    equipamento.dtRecebimento = this.dtRecebimento?.value;
    equipamento.garantiaExtendida = this.garantiaExt?.value;
    equipamento.garantiaContratual = this.garantiaContratual?.value;
    equipamento.valorCompra = this.valorCompra?.value;
    equipamento.anotacoes = this.anotacoes?.value;
    equipamento.foto = this.foto?.value;

    this.equipamentoService.salvar(equipamento).subscribe({
      next: (response) => {
        this.sucesso = response['sucesso'];
        this.mensagem = response['mensagem'];

        if(this.sucesso){
          this.notification.showSuccess(this.mensagem);
          this.router.navigate(['/equipment']);
        }
        else{
          this.notification.showWarning(this.mensagem);
          this.erros = response['objeto'];
        }
      },
      error: () => {
        this.notification.showError('Erro ao salvar equipamento');
      }
    })
  }

  public download(url: string, nome: string){
    this.downloadService.download(url).subscribe({
      next: (response) => {
        this.downloadService.handleFile(response, nome);
      }
    });
  }

  public anexarArquivo(file: any){
    if(this.acaoAtual == 'editar'){
      this.anexoForm = file[0];
      this.anexoNome = file[0].name;
      this.fazerUpload();
    }
  }

  private fazerUpload(){
    let formdata = new FormData();
    formdata.append('file', this.anexoForm, this.anexoNome);
    this.uploadService.arquivo(formdata).subscribe({
      next: (response) => {
        if(response){
          this.mensagem = response['mensagem'];
          this.sucesso = response['sucesso'];
          if(this.sucesso){
            this.urlAnexo = response['objeto'];
            console.log(this.urlAnexo);
            this.adicionarAnexo();
          }
        }
      },
      error: () => {
        this.notification.showError('Não foi possível fazer o upload do anexo');
      }
    });
  }

  public adicionarAnexo(){
    const anexo = new EquipamentoAnexo();
    anexo.equipamentoId = this.equipamentoId
    anexo.url = this.urlAnexo;
    anexo.descricao = this.anexoNome;

    this.equipamentoService.adicionarAnexo(anexo).subscribe({
      next: (response) =>{
        this.mensagem = response['mensagem'];
        this.sucesso = response['sucesso'];
        if(this.sucesso){
          this.notification.showSuccess(this.mensagem);
          this.carregarEquipamento(this.equipamentoId);
        }
        else{
          this.notification.showInfo(this.mensagem);
        }
      },
      error: () => {
        this.notification.showError('Não foi possível adicionar o anexo!');
      }
    });
  }

  public removerAnexo(id: number ){
    this.equipamentoService.removerAnexo(id).subscribe({
      next: (response) => {
        if(response){
          this.mensagem = response['mensagem'];
          this.sucesso = response['sucesso'];
          if(this.sucesso){
            this.notification.showSuccess(this.mensagem);
            this.carregarEquipamento(this.equipamentoId);
          }
          else{
            this.notification.showInfo(this.mensagem);
          }
        }
        else{
          this.notification.showWarning('Tente novamente!');
        }
      },
      error: () => {
        this.notification.showError('Ocorreu um erro!');
      }
    });
  }

  //CONFIGURA A APARENCIA DA PAGINA A SER EXIBIDA AO USUARIO
  private configurarForm(){
    //pega o id na URL
    //const id = this.activatedRoute.snapshot.paramMap.get('id');
    /* if(id){
      this.tituloPagina = 'Editando equipamento';
      this.equipamentoId = parseInt(id);
      this.carregarEquipamento(this.equipamentoId);
    }
    else{
      this.tituloPagina = 'Novo equipamento'
      this.boolMotivoBaixa = false
    } */

    if(this.acaoAtual == 'novo'){
      this.tituloPagina = 'Novo equipamento';
      this.permitirAnexarArquivo = false;
    }

    if(this.acaoAtual == 'editar'){
      this.tituloPagina = 'Editando equipamento';
      this.permitirAnexarArquivo = true;
    }

    if(this.acaoAtual == 'visualizar'){
      this.tituloPagina = 'Detalhes do equipamento';
      this.permitirAnexarArquivo = false;
    }

  }

  private obterSetores(ativo: boolean){
    this.sectorService.getAll(ativo).subscribe({
      next: (response) => {
        if(response) {
          this.setores = response;
        }
        else{
          this.setores = [];
          this.notification.showWarning('Nenhum setor encontrado!');
        }
      },
      error: () => {
        this.notification.showError('Erro ao consultar setores');
      }
    })
  }

  private obterTipos(ativo: boolean){
    this.equipamentoService.getTipos(ativo).subscribe({
      next: (response) => {
        if(response){
          this.tipos = response;
        }
        else{
          this.tipos = [];
          this.notification.showWarning('Nenhum tipo de equipamento encontrado!');
        }
      },
      error: () => {
        this.notification.showError('Erro ao consultar tipos de equipamentos');
      }
    });
  }

  private carregarEquipamento(id: number){
    this.equipamentoService.getById(id).subscribe({
      next: (response) => {
        if(response){
          this.equipamento = response;
          this.anexos = this.equipamento?.anexos!;
          this.validarFormulario(this.equipamento);
          this.configurarForm();
        }
        else{
          this.notification.showWarning('Equipamento não encontrado');
        }
      },
      error: () => {
        this.notification.showError('Erro ao carregar dados do equipamento');
      }
    });
  }

  private validarFormulario(equip: EquipamentoResponse){
    this.equipForm = new FormGroup({
      ativo: new FormControl(equip.ativo),
      codInterno: new FormControl(equip.codInterno, [ 
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ]),
      tipo: new FormControl(equip.tipo?.id, [Validators.required]),
      setor: new FormControl(equip.setor?.id, [Validators.required]),
      nome: new FormControl(equip.nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      descricao: new FormControl(equip.descricao, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      fabricante: new FormControl(equip.fabricante, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      marca: new FormControl(equip.marca, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      modelo: new FormControl(equip.modelo, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      numSerial: new FormControl(equip.numSerial, [
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      anoFabricacao: new FormControl(equip.anoFabricacao, [
        Validators.minLength(4),
        Validators.maxLength(4)
      ]),
      fornecedor: new FormControl(equip.fornecedorId),
      notaFiscal: new FormControl(equip.notaFiscal, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000)
      ]),
      chaveNFe: new FormControl(equip.chaveNotaFiscal, [
        Validators.minLength(44),
        Validators.maxLength(44)
      ]),
      dtCompra: new FormControl(equip.dtCompra, [
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      dtRecebimento: new FormControl(equip.dtRecebimento,[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      garantiaExtendida: new FormControl(equip.garantiaExtendida),
      garantiaContratual: new FormControl(equip.garantiaContratual),
      validadeGarantia: new FormControl({value: equip.validadeGarantia, disabled: true}),
      valorCompra: new FormControl(equip.valorCompra),
      anotacoes: new  FormControl(equip.anotacoes),
      motivoBaixa: new FormControl(equip.motivoBaixa)
    });
  }
}

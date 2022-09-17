import { NovoEquipamentoModel } from './../../../models/equipment/novoEquipamentoModel';
import { TipoEquiModel } from './../../../models/equipment/tipoEquipModel';
import { SectorService } from './../../../services/sector.service';
import { SetorModel } from './../../../models/sector/setorModel';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EquipamentoModel } from 'src/app/models/equipment/equipamentoModel';
import { ErroServidor } from 'src/app/models/erroServidor';
import { EquipamentoService } from 'src/app/services/equipamento.service';

@Component({
  selector: 'app-equip-form',
  templateUrl: './equip-form.component.html',
  styleUrls: ['./equip-form.component.css']
})
export class EquipFormComponent implements OnInit {

  @Input() equipID: number;
  @Input() navbarVisible: boolean;
  @Input() titleFormVisible: boolean;

  tituloPagina: string = 'Detalhes do Equipamento';
  equip: EquipamentoModel;
  equipForm: FormGroup;
  message: string;
  success: boolean;
  erros: ErroServidor[];
  equipamento: EquipamentoModel;
  setores: SetorModel[];
  tipos: TipoEquiModel[];
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

  constructor(
    private equipamentoService: EquipamentoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sectorService: SectorService
  ) {

    //PARA INICIAR O FORMULARIO
    const tipo = {id: 1, descricao: ''};
    const setor = {id: 1, nome: ""};
    const equip = {ativo: true, codInterno: '', tipo: tipo, setor: setor, nome:'', descricao:'', fabricante:'',
      marca: '', modelo:'', numSerial:'', anoFabricacao:'', dtCompra: '', valorCompra:'',anotacoes:''
    }

    this.start(equip);
  }


  ngOnInit(): void {
    this.listarTipos();
    this.listarSetores();
    this.configurarForm();
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

  get dtCompra() {
    return this.equipForm.get('dtCompra');
  }

  get valorCompra() {
    return this.equipForm.get('valorCompra');
  }

  get anotacoes() {
    return this.equipForm.get('anotacoes');
  }

  get motivoBaixa() {
    return this.equipForm.get('motivoBaixa');
  }

  //#region

  //OBTER SETORES
  private listarSetores(){
    this.sectorService.getAll().subscribe({
      next: (response) => {
        if(response != null){
          this.setores = response;
          
        }
        else{
          this.setores = [];
          this.showError('Não foi possível carregar os laboratórios');
        }
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  //OBTER TIPOS DE EQUIPAMENTOS
  private listarTipos(){
    this.equipamentoService.getTipos(true).subscribe({
      next: (response) => {
        if(response != null){
          this.tipos = response;
        }
        else{
          this.tipos = [];
          this.showError('Não foi possível obter os tipos de equipamentos');
        }
      }
    })
  }

  //CONFIGURA A APARENCIA DA PAGINA A SER EXIBIDA AO USUARIO
  private configurarForm(){
    //pega o id na URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.tituloPagina = 'Editando equipamento';
      this.equipID = parseInt(id);
      this.carregarDados(this.equipID);
    }
    else{
      this.tituloPagina = 'Novo equipamento'
      this.boolMotivoBaixa = false
    }
  }

  //VERIFICAR OS TAMANHOS DOS CAMPOS -> VER NO BANCO DE DADOS
  private start(equip: EquipamentoModel){
    this.equipForm = new FormGroup({
      //id: new FormControl(equip.id),
      ativo: new FormControl(equip.ativo),
      codInterno: new FormControl(equip.codInterno, [ 
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
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
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      anoFabricacao: new FormControl(equip.anoFabricacao, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ]),
      dtCompra: new FormControl(equip.dtCompra, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      valorCompra: new FormControl(equip.valorCompra, [Validators.required]),
      anotacoes: new  FormControl(equip.anotacoes, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      motivoBaixa: new FormControl(equip.motivoBaixa, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ])
    });
  }

  //CARREGA OBJETO E PREENCHE OS DADOS NA TELA
  private carregarDados(id: number){
    this.equipamentoService.getById(id).subscribe({
      next: (response) => {
        this.equipamento = response;
        
        if(this.equipamento != null){
          this.start(this.equipamento);
        }
        else{
          //MELHORAR AQUI
          this.showError('Não foi possível obter os dados do equipamento');
        }
      }
    });
  }

  salvar(){
    if(this.equipID){
      let equip: EquipamentoModel;
      equip = {
        //CRIA UM NOVO OBJETO COM OS CAMPOS NECESSARIOS PARA MANDAR PARA O BACKEND
        id: this.equipID,
        ativo: this.ativo?.value,
        codInterno: this.codInterno?.value,
        tipoId: this.tipo?.value,
        setorId:this.setor?.value,
        nome:this.nome?.value,
        descricao: this.descricao?.value,
        fabricante: this.fabricante?.value,
        marca: this.marca?.value,
        modelo:this.modelo?.value,
        numSerial: this.numSerial?.value,
        anoFabricacao: this.anoFabricacao?.value,
        dtCompra: this.dtCompra?.value,
        valorCompra: this.valorCompra?.value,
        anotacoes:this.anotacoes?.value
      };

      console.log(equip);
      this.editarEquipamento(equip);
    }
    else {
      //CRIA UM NOVO OBJETO COM OS CAMPOS NECESSARIOS PARA MANDAR PARA O BACKEND
      let equip: EquipamentoModel;
      equip = {
        codInterno: this.codInterno?.value,
        tipoId: this.tipo?.value,
        setorId:this.setor?.value,
        nome:this.nome?.value,
        descricao: this.descricao?.value,
        fabricante: this.fabricante?.value,
        marca: this.marca?.value,
        modelo:this.modelo?.value,
        numSerial: this.numSerial?.value,
        anoFabricacao: this.anoFabricacao?.value,
        dtCompra: this.dtCompra?.value,
        valorCompra: this.valorCompra?.value,
        anotacoes:this.anotacoes?.value        
      };
      console.log(equip);
      //SALVAR
      this.novoEquipamento(equip);
    }
  }

  private novoEquipamento(equip: EquipamentoModel){
    this.equipamentoService.adicionar(equip).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          this.router.navigate(['/equipment']);
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

  private editarEquipamento(equip: EquipamentoModel){
    this.equipamentoService.editar(equip).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          this.router.navigate(['/equipment']);
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


  //REMOVER
  /* startForm(iequip: EquipamentoModel) {
    this.equipForm = new FormGroup({
      nome: new FormControl(iequip.nome, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)]),
      ativo: new FormControl(iequip.ativo, []),
      codInterno: new FormControl(iequip.codInterno, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)]),
      tipoId: new FormControl(iequip.tipoId, []),
      tipoDescricao: new FormControl(iequip.tipoDescricao, []),
      setorId: new FormControl([iequip.setorId]),
      setorNome: new FormControl([[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)]]),
      descricao: new FormControl(iequip.descricao, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)]),
      fabricante: new FormControl(iequip.fabricante, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)]),
      marca: new FormControl(iequip.marca, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)]),
      modelo: new FormControl(iequip.modelo, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)]),
      numSerial: new FormControl(iequip.numSerial, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)]),
      anoFabricacao: new FormControl(iequip.anoFabricacao, []),
      dtCompra: new FormControl(iequip.dtCompra, [
        Validators.required]),
      valorCompra: new FormControl(iequip.valorCompra, [
        Validators.required]),
      anotacoes: new FormControl(iequip.anotacoes, []),
      foto: new FormControl(iequip.foto, []),
      motivoBaixa: new FormControl(iequip.motivoBaixa, [])
    });
    console.log();
  } */

  /* save(){
    const equip = {...this.equipForm.value, id: this.equipID};
    console.log(equip);
    this.equipamentoService.save(equip).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        this.showSuccess(this.message);
        this.router.navigate(['/equipment']);
      },
      error: (response) => {
        console.log(response);
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.showError(this.message, 'Ocorreu um erro!');
        console.log(this.success);
        console.log(this.message);
        console.log(this.erros);
      }
    });
  } */

}

import { LoginService } from './../../../services/login.service';
import { TipoEquipamentoResponse } from './../../../models/equipment/tipoEquipamentoResponse.model';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErroServidor } from 'src/app/models/erroServidor';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { NotificationService } from 'src/app/services/notification.service';
import { VerificarPermissoes } from 'src/app/functions/verificarPermissoes';

@Component({
  selector: 'app-equip-tipo-list',
  templateUrl: './equip-tipo-list.component.html',
  styleUrls: ['./equip-tipo-list.component.css']
})
export class EquipTipoListComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  tituloDaPagina: string = 'Tipos de equipamentos';
  tiposDeEquipamentos: TipoEquipamentoResponse[];
  tipoEquipamento: TipoEquipamentoResponse;
  tipoEquipamentoId: number;
  public configuration: Config;
  public columns: Columns[];

  constructor(
    private equipamentoService: EquipamentoService,
    private router: Router,
    private notification: NotificationService,
    private spinner: NgxSpinnerService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.configGrid();
    this.listarTiposDeEquipamentos(true);
  }

  private configGrid(){
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.selectRow = true;
    this.configuration.rows = 10;
    //colunas
    this.columns = [
      { key: 'id', title: 'Código' },
      { key: 'descricao', title: 'Descrição' },
      { key: 'controlarNumSerialString', title:'Controla Nº Serial'},
      { key: 'ativoString', title:'Status'},
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false }
    ];
  }

  public verificarPermissao(roleFuncionalidade: string[]): boolean{
    const usuarioLogado = this.loginService.usuarioLogado();
    const role = usuarioLogado?.perfil;
    return VerificarPermissoes.temPermissao(roleFuncionalidade, role!);
  }

  public adicionar(){
    this.router.navigate(['equipment/tipo/new']);
  }

  public editar(id: string){
    this.router.navigate([`equipment/tipo/${id}/edit`]);
  }

  public equipamentos(id: string){
    this.router.navigate(['equipment'], {queryParams: { tipo: id}});
  }

  public listarTiposDeEquipamentos(ativo: boolean){
    this.spinner.show();
    this.equipamentoService.getTipos(ativo).subscribe({
      next: (response) => {
        this.tiposDeEquipamentos = response.map(item => {
          return {
            ...item,
            controlarNumSerialString: item.controlarNumSerial ? 'Sim' : 'Não',
            ativoString: item.ativo ? 'Ativo' : 'Inativo'
          }
        });
        this.spinner.hide();
      },
      error: (response) => {
        this.notification.showError('Erro ao consultar tipos de equipamentos');
        console.error(response);
        this.spinner.hide();
      }
    });
  }
}

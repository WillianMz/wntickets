import { SetorResponse } from './../sector/setorResponse.model';
import { TipoEquiModel } from './tipoEquipModel';
export class EquipamentoModel {
    public id?: number;
    public ativo?: boolean;
    public codInterno?: string;
    public tipo?: TipoEquiModel;
    public setor?: SetorResponse;
    public nome?: string;
    public descricao?: string;
    public fabricante?: string;
    public marca?: string;
    public modelo?: string;
    public numSerial?: string;
    public anoFabricacao?: string;
    public dtCompra?: string;
    public valorCompra?: string;
    public anotacoes?: string;    
    public motivoBaixa?: string;


    //REMOVER -> falta ajustar a API
    public setorId?: SetorResponse[];
    public setorNome?: string;
    public tipoId?: number;
    public tipoDescricao?: string;
    public foto?: string;
  }
  
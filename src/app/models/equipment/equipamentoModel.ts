import { TipoEquiModel } from './tipoEquipModel';
import { SetorModel } from './../sector/setorModel';
export class EquipamentoModel {
    public id?: number;
    public ativo?: boolean;
    public codInterno?: string;
    public tipo?: TipoEquiModel;
    public setor?: SetorModel;
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


    //REMOVER
    public setorId?: SetorModel[];
    public setorNome?: string;
    public tipoId?: number;
    public tipoDescricao?: string;
    public foto?: string;
  }
  
import { TipoEquipamentoResponse } from './tipoEquipamentoResponse.model';
import { SetorResponse } from './../sector/setorResponse.model';

export class EquipamentoResponse {
    public id?: number;
    public ativo?: boolean;
    public codInterno?: string;
    public tipo?: TipoEquipamentoResponse;
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
    public foto?: string;
    public motivoBaixa?: string;
}
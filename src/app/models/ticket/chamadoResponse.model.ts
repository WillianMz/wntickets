import { OperadorResponse } from './operadorResponse.model';
import { SetorResponse } from './../sector/setorResponse.model';
import { CriadorResponse } from './criadorResponse.model';

export class ChamadoResponse {
    public id?: number;
    public dataAbertura: string;
    public tipo?: TipoEnum;
    public criador: CriadorResponse;
    public setor: SetorResponse;
    public assunto: string;
    public descricao: string;
    public status?: StatusEnum;
    public prioridade?: PrioridadeEnum;
    public dataFechamento?: string;
    public solucao?: string;
    public operador?: OperadorResponse;
}

export enum StatusEnum {
    Novo = 1,
    Pendente = 2,
    EmAtendimento = 3,
    Finalizado = 4,
    Cancelado = 5,
    Fechado = 6,
    Reaberto = 7
}

export enum TipoEnum {
    Publico = 1,
    Interno = 2
}

export enum PrioridadeEnum {
    Baixa = 0,
    Normal = 1,
    Alta = 2,
    Urgente = 3
}
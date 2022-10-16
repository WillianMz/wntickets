import { OperadorResponse } from './operadorResponse.model';
import { SetorResponse } from './../sector/setorResponse.model';
import { CriadorResponse } from './criadorResponse.model';

export class ChamadoResponse {
    public id?: number;
    public dataAbertura: string;
    public tipo?: string;
    public criador: CriadorResponse;
    public setor: SetorResponse;
    public assunto: string;
    public descricao: string;
    public status?: StatusEnum;
    public prioridade?: string;
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
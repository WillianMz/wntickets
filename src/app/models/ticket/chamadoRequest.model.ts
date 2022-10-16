import { SetorResponse } from "../sector/setorResponse.model";
import { OperadorResponse } from "./operadorResponse.model";

export class ChamadoRequest {
  public ticketId?: number;
  public equipamentoId?: number;
  public setorId?: SetorResponse;
  public tipoId?: number;
  public prioridade?: number;
  public assunto: string;
  public descricao: string;
  public operadorId?: OperadorResponse;
}
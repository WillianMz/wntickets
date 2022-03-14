export class TicketModel {
  public id ?: number;
  public criadorId?: number;
  public criador?: string;
  public sectorId?: number;
  public setor?: string;
  public categoriaId?: number;
  public categoria?: string;
  public dataAbertura?: string;
  public assunto?: string;
  public descricao?: string;
  public statusAtual?: string;
  public prioridadeAtual?: string;
  public dataFechamento?: string;
  public solucao?: string;
  public comentarios?: any[];
  public anexos?: any[];
}

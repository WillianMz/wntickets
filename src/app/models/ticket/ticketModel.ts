export class TicketModel {
  Id ?: number;
  Criador?: string;
  Setor?: string;
  Categoria?: string;
  DataAbertura?: string;
  Assunto?: string;
  Descricao?: string;
  StatusAtual?: string;
  PrioridadeAtual?: string;
  DataFechamento?: string;
  Solucao?: string;
  Comentarios?: any[];
  Anexos?: any[];
}

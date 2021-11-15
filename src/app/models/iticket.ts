export interface Iticket {
  id?: number;
  dataAbertura?: Date;
  assunto?: string;
  descricao?: string;
  statusAtual?: string;
  prioridadeAtual?: string;
  dataFechamento?: string;
  solucao?: string;
  tempo?: number;
}

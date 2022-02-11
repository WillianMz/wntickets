import { Isector } from 'src/app/models/isector';
export interface Icategory {
  id?: number;
  nome?: string;
  ativa?: boolean;
  sectorID: number;
  img?: string;
  sector?: Isector;
}

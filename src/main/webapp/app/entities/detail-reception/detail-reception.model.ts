import { IReception } from 'app/entities/reception/reception.model';

export interface IDetailReception {
  id?: number;
  caracteristique?: string | null;
  quantiteArticle?: number | null;
  numeroSerie?: string | null;
  status?: number | null;
  reception?: IReception | null;
}

export class DetailReception implements IDetailReception {
  constructor(
    public id?: number,
    public caracteristique?: string | null,
    public quantiteArticle?: number | null,
    public numeroSerie?: string | null,
    public status?: number | null,
    public reception?: IReception | null
  ) {}
}

export function getDetailReceptionIdentifier(detailReception: IDetailReception): number | undefined {
  return detailReception.id;
}

import dayjs from 'dayjs/esm';
import { IReception } from 'app/entities/reception/reception.model';

export interface IFournisseur {
  id?: number;
  nom?: string | null;
  prenom?: string | null;
  telehone?: string | null;
  adresse?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updateAt?: dayjs.Dayjs | null;
  receptions?: IReception[] | null;
}

export class Fournisseur implements IFournisseur {
  constructor(
    public id?: number,
    public nom?: string | null,
    public prenom?: string | null,
    public telehone?: string | null,
    public adresse?: string | null,
    public createdAt?: dayjs.Dayjs | null,
    public updateAt?: dayjs.Dayjs | null,
    public receptions?: IReception[] | null
  ) {}
}

export function getFournisseurIdentifier(fournisseur: IFournisseur): number | undefined {
  return fournisseur.id;
}

import dayjs from 'dayjs/esm';
import { IDetailReception } from 'app/entities/detail-reception/detail-reception.model';
import { IArticle } from 'app/entities/article/article.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { IFournisseur } from 'app/entities/fournisseur/fournisseur.model';

export interface IReception {
  id?: number;
  numContrat?: string | null;
  caracteristique?: string | null;
  quantiteArticle?: number | null;
  numeroSerie?: string | null;
  status?: number | null;
  dateContrat?: dayjs.Dayjs | null;
  dateReception?: dayjs.Dayjs | null;
  createdAt?: dayjs.Dayjs | null;
  updateAt?: dayjs.Dayjs | null;
  detailReceptions?: IDetailReception[] | null;
  articles?: IArticle[] | null;
  employee?: IEmployee | null;
  fournisseur?: IFournisseur | null;
}

export class Reception implements IReception {
  constructor(
    public id?: number,
    public numContrat?: string | null,
    public caracteristique?: string | null,
    public quantiteArticle?: number | null,
    public numeroSerie?: string | null,
    public status?: number | null,
    public dateContrat?: dayjs.Dayjs | null,
    public dateReception?: dayjs.Dayjs | null,
    public createdAt?: dayjs.Dayjs | null,
    public updateAt?: dayjs.Dayjs | null,
    public detailReceptions?: IDetailReception[] | null,
    public articles?: IArticle[] | null,
    public employee?: IEmployee | null,
    public fournisseur?: IFournisseur | null
  ) {}
}

export function getReceptionIdentifier(reception: IReception): number | undefined {
  return reception.id;
}

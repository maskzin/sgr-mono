import dayjs from 'dayjs/esm';
import { IArticle } from 'app/entities/article/article.model';
import { IEmployee } from 'app/entities/employee/employee.model';

export interface IAffectation {
  id?: number;
  dateAffectation?: dayjs.Dayjs | null;
  quantite?: number | null;
  nom?: string | null;
  prenom?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updateAt?: dayjs.Dayjs | null;
  article?: IArticle | null;
  employee?: IEmployee | null;
}

export class Affectation implements IAffectation {
  constructor(
    public id?: number,
    public dateAffectation?: dayjs.Dayjs | null,
    public quantite?: number | null,
    public nom?: string | null,
    public prenom?: string | null,
    public createdAt?: dayjs.Dayjs | null,
    public updateAt?: dayjs.Dayjs | null,
    public article?: IArticle | null,
    public employee?: IEmployee | null
  ) {}
}

export function getAffectationIdentifier(affectation: IAffectation): number | undefined {
  return affectation.id;
}

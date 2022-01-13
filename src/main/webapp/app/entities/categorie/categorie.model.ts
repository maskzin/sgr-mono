import dayjs from 'dayjs/esm';
import { IArticle } from 'app/entities/article/article.model';

export interface ICategorie {
  id?: number;
  nom?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updateAt?: dayjs.Dayjs | null;
  articles?: IArticle[] | null;
}

export class Categorie implements ICategorie {
  constructor(
    public id?: number,
    public nom?: string | null,
    public createdAt?: dayjs.Dayjs | null,
    public updateAt?: dayjs.Dayjs | null,
    public articles?: IArticle[] | null
  ) {}
}

export function getCategorieIdentifier(categorie: ICategorie): number | undefined {
  return categorie.id;
}

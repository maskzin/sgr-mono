import dayjs from 'dayjs/esm';
import { IAffectation } from 'app/entities/affectation/affectation.model';
import { ICategorie } from 'app/entities/categorie/categorie.model';
import { IReception } from 'app/entities/reception/reception.model';

export interface IArticle {
  id?: number;
  libelleArticle?: string | null;
  stock?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updateAt?: dayjs.Dayjs | null;
  affectation?: IAffectation | null;
  categorie?: ICategorie | null;
  receptions?: IReception[] | null;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public libelleArticle?: string | null,
    public stock?: string | null,
    public createdAt?: dayjs.Dayjs | null,
    public updateAt?: dayjs.Dayjs | null,
    public affectation?: IAffectation | null,
    public categorie?: ICategorie | null,
    public receptions?: IReception[] | null
  ) {}
}

export function getArticleIdentifier(article: IArticle): number | undefined {
  return article.id;
}

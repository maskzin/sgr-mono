import dayjs from 'dayjs/esm';
import { IAffectation } from 'app/entities/affectation/affectation.model';
import { IReception } from 'app/entities/reception/reception.model';
import { IDivision } from 'app/entities/division/division.model';

export interface IEmployee {
  id?: number;
  nom?: string | null;
  prenom?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updateAt?: dayjs.Dayjs | null;
  affectations?: IAffectation[] | null;
  receptions?: IReception[] | null;
  division?: IDivision | null;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public nom?: string | null,
    public prenom?: string | null,
    public createdAt?: dayjs.Dayjs | null,
    public updateAt?: dayjs.Dayjs | null,
    public affectations?: IAffectation[] | null,
    public receptions?: IReception[] | null,
    public division?: IDivision | null
  ) {}
}

export function getEmployeeIdentifier(employee: IEmployee): number | undefined {
  return employee.id;
}

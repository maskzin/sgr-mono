import dayjs from 'dayjs/esm';
import { IEmployee } from 'app/entities/employee/employee.model';

export interface IDivision {
  id?: number;
  nom?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updateAt?: dayjs.Dayjs | null;
  employees?: IEmployee[] | null;
}

export class Division implements IDivision {
  constructor(
    public id?: number,
    public nom?: string | null,
    public createdAt?: dayjs.Dayjs | null,
    public updateAt?: dayjs.Dayjs | null,
    public employees?: IEmployee[] | null
  ) {}
}

export function getDivisionIdentifier(division: IDivision): number | undefined {
  return division.id;
}

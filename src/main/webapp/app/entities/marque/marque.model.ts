export interface IMarque {
  id?: number;
  libelle?: string | null;
}

export class Marque implements IMarque {
  constructor(public id?: number, public libelle?: string | null) {}
}

export function getMarqueIdentifier(marque: IMarque): number | undefined {
  return marque.id;
}

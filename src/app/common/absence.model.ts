export class AbsenceModel {
  public id: number;
  public approved = false;

  constructor(
    public employeeName: string, // todo max. 100
    public dateStart: number,
    public dateEnd: number,
    public reason: Reason,
    public comment?: string, // todo max. 500
    ) {}
}

export enum Reason {
  'Holiday',
  'Paid leave',
  'Non paid leave',
  'Business Travel',
  'Home office'
}

import {User} from './user.model';

export class AbsenceModel {
  public id: number;
  public approved = false;

  constructor(
    public employee: User,
    public dateStart?: Date,
    public dateEnd?: Date,
    public reason?: Reason,
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

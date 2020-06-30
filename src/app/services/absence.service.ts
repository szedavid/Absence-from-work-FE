import {Injectable} from '@angular/core';
import {AbsenceModel} from '../common/absence.model';
import {absences, loggedInUser} from '../common/static-data';
import {Observable, Subject} from 'rxjs';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  subject = new Subject<any>();

  constructor() {
    // backend emulation - initiating static data (setting unique id-s)
    let id = 1;
    absences.forEach(absenceData => {
      absenceData.id = id++;
      if (absenceData.id % 2 === 0) {
        absenceData.approved = true;
      }
    });
  }

  private sendMessageUpdate(){
    this.subject.next();
  }

  getMessageUpdate(): Observable<any> {
    return this.subject.asObservable();
  }

  // emulating login, so every user can only access his/her own absence entries
  getUser() {
    return loggedInUser;
  }

  getAbsencesForCurrentUser(yearSelected: number, monthSelected: number): Observable<AbsenceModel[]> {
    let retVal: AbsenceModel[];

    // filter by id
    retVal = absences.filter(absence => absence.employee.id === loggedInUser.id);

    // filter by intervall if set
    retVal = retVal.filter(absence => {
      const dStart = new Date(absence.dateStart);
      const dEnd = new Date(absence.dateEnd);
      return (this.checkStart(yearSelected, monthSelected, dStart.getFullYear(), dStart.getMonth())
        && this.checkEnd(yearSelected, monthSelected, dEnd.getFullYear(), dEnd.getMonth()));
    });

    return of(retVal);
  }

  checkStart(yearSelected: number, monthSelected: number, yearStart: number, monthStart: number): boolean {
    console.log('checkStart: yearSelected:' + yearSelected + ', monthSelected:' + monthSelected + ', yearStart:' + yearStart + ', monthStart:' + monthStart);
    return (yearSelected > yearStart || (yearSelected === yearStart && monthSelected >= monthStart));
  }

  checkEnd(yearSelected: number, monthSelected: number, yearEnd: number, monthEnd: number): boolean {
    return (yearSelected < yearEnd || (yearSelected === yearEnd && monthSelected <= monthEnd));
  }

  deleteAbsence(absence: AbsenceModel) {
    const index = absences.indexOf(absence);
    if (index > -1) {
      absences.splice(index, 1);
      this.sendMessageUpdate();
    }
  }

  addOrUpdateAbsence(absence: AbsenceModel) {
    console.log('addOrUpdateAbsence: ');
    console.log(absence);
    if (!absence.id){
      console.log('create');
      absence.id = Math.floor(Math.random() * 100000) + 1000;
      absences.push(absence);
    } else {
      console.log('update');
      const index = absences.indexOf(absence);
      if (index > -1) {
        absences.splice(index, 1, absence);
      } else {
        console.error('Update failed - absence not found: ' + absence);
      }
    }
    this.sendMessageUpdate();
  }
}

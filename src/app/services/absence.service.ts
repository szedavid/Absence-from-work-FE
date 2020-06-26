import {Injectable} from '@angular/core';
import {AbsenceModel} from '../common/absence.model';
import {absenceList, loggedInUser} from '../common/static-data';
import {Observable} from 'rxjs';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor() {
    // backend emulation - initiating static data (setting unique id-s)
    let id = 1;
    absenceList.forEach(absenceData => {
      absenceData.id = id++;
      if (absenceData.id % 2 === 0){
        absenceData.approved = true;
      }
    });
  }

  // emulating login, so every user can only access his/her own absence entries
  getUser() {
    return loggedInUser;
  }

  getAbsencesForCurrentUser(year: number, month: number): Observable<AbsenceModel[]> {
    let retVal: AbsenceModel[];
    retVal = absenceList.filter(absence => absence.employee.id === loggedInUser.id);
    // if (year || month){
    //   if (year){
    //     retVal = retVal.filter(absence => absence.dateStart === loggedInUser.id);
    //     // todo date end
    //   }
    //   // todo month
    // }
    return of(retVal);
  }
}

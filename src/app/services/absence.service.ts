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
    });
  }

  getUser() {
    return loggedInUser;
  }

  getAbsencesForUser(id: number): Observable<AbsenceModel[]> {
    // todo id filter
    return of(absenceList.filter(absence => absence.employee.id === id));
  }
}
